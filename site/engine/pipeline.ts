// The SaySo engine: one day's badge audio and camera file in, one coaching report out.
//
//   badge audio ─► WAV chunks ─► Muse Voice Transcribe ─► wearer's voice only ─► conversations ┐
//                                                                                               ├─► Muse Spark ─► checked report
//   camera file ─► 2 fps MP4 ─► SAM 3.1 ("person" + staff look) ─► customer visits ────────────┘
//
// Every outside call comes in through `deps`, so the whole run can be tested with fakes.

import path from "node:path";
import { mkdir } from "node:fs/promises";
import type { DayReport } from "../components/dashboard/reports/types.ts";
import { MAX_VIDEO_SECONDS, STAFF_LOOK, VIDEO_FPS } from "./config.ts";
import type { Frame } from "./meta/samParse.ts";
import { assembleReport } from "./report/assemble.ts";
import { buildReportPrompt, type TeamMember } from "./report/prompt.ts";
import type { SparkReport } from "./report/schema.ts";
import { parseClock } from "./timeline/clock.ts";
import { buildConversations, type BadgeTranscript, type SpeechTurn } from "./timeline/conversations.ts";
import { summariseCamera } from "./timeline/visits.ts";
import type { BadgeRecording, Entry, Step, StepId } from "./types.ts";

export type EngineDeps = {
  recordings: (store: string, date: string) => Promise<BadgeRecording[]>;
  speechChunks: (audio: string, outDir: string) => Promise<{ file: string; offsetSec: number }[]>;
  samVideo: (input: string, output: string) => Promise<void>;
  probeSeconds: (file: string) => Promise<number | null>;
  transcribe: (wav: string) => Promise<SpeechTurn[]>;
  uploadVideo: (file: string) => Promise<string>;
  segmentVideo: (fileId: string, concept: string) => Promise<Frame[]>;
  deleteUpload: (fileId: string) => Promise<void>;
  writeReport: (prompt: string) => Promise<SparkReport>;
  saveReport: (store: string, report: DayReport) => Promise<void>;
  /** Record a step's progress on the entry. */
  step: (id: StepId, status: Step["status"], detail?: string) => Promise<void>;
};

export type RunContext = {
  entry: Entry;
  storeName: string;
  storeKind: string;
  team: TeamMember[];
  /** The camera file as uploaded. */
  videoFile: string;
  /** Scratch folder for this run. */
  workDir: string;
};

/** How many transcription calls run at once. */
const TRANSCRIBE_CONCURRENCY = 3;

async function mapLimited<T, R>(items: T[], limit: number, fn: (item: T, i: number) => Promise<R>, onDone?: (done: number) => void): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  let done = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i], i);
      onDone?.(++done);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

/** Run `work` as one step: marked running, then done with its detail, or failed with the error. */
async function stepRun<T>(deps: EngineDeps, id: StepId, work: () => Promise<{ value: T; detail: string }>): Promise<T> {
  await deps.step(id, "running");
  try {
    const { value, detail } = await work();
    await deps.step(id, "done", detail);
    return value;
  } catch (err) {
    await deps.step(id, "failed", err instanceof Error ? err.message : String(err));
    throw err;
  }
}

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

export async function runPipeline(ctx: RunContext, deps: EngineDeps): Promise<DayReport> {
  const { entry } = ctx;
  const videoStart = parseClock(entry.videoStartsAt);
  if (videoStart === null) throw new Error("The camera start time isn't a clock time.");
  const audioDir = path.join(ctx.workDir, "audio");
  const samFile = path.join(ctx.workDir, "sam.mp4");

  const prepared = await stepRun(deps, "prepare", async () => {
    await mkdir(audioDir, { recursive: true });
    const recordings = await deps.recordings(entry.store, entry.date);
    const videoSeconds = await deps.probeSeconds(ctx.videoFile);
    if (videoSeconds === null) throw new Error("The camera file couldn't be read.");
    if (videoSeconds > MAX_VIDEO_SECONDS) throw new Error(`The camera file is longer than ${MAX_VIDEO_SECONDS / 60} minutes. Trim it and try again.`);
    const [chunks] = await Promise.all([
      Promise.all(recordings.map(async (r) => ({ recording: r, chunks: await deps.speechChunks(r.file, audioDir) }))),
      deps.samVideo(ctx.videoFile, samFile),
    ]);
    return {
      value: { chunks, videoSeconds },
      detail: `${plural(recordings.length, "badge file")} · ${Math.round(videoSeconds)} s of video`,
    };
  });

  const transcripts = await stepRun(deps, "transcribe", async () => {
    const jobs = prepared.chunks.flatMap(({ recording, chunks }) => chunks.map((c) => ({ recording, ...c })));
    if (jobs.length === 0) return { value: [] as BadgeTranscript[], detail: "No badge audio for this day yet" };
    const turns = await mapLimited(jobs, TRANSCRIBE_CONCURRENCY, (j) => deps.transcribe(j.file),
      (done) => void deps.step("transcribe", "running", `${done} of ${jobs.length} parts`));
    const value = jobs.map((j, i): BadgeTranscript => ({
      repId: j.recording.repId,
      badgeId: j.recording.badgeId,
      startSec: j.recording.startSec + j.offsetSec,
      turns: turns[i],
    }));
    return { value, detail: `${plural(turns.flat().length, "line")} from ${plural(prepared.chunks.length, "badge file")}` };
  });

  const frames = await stepRun(deps, "track", async () => {
    const fileId = await deps.uploadVideo(samFile);
    try {
      const staffLook = STAFF_LOOK[entry.store] ?? "person wearing a staff uniform";
      const [people, staff] = await Promise.all([deps.segmentVideo(fileId, "person"), deps.segmentVideo(fileId, staffLook)]);
      return { value: { people, staff }, detail: `${plural(people.length, "frame")} read` };
    } finally {
      await deps.deleteUpload(fileId);
    }
  });

  const timeline = await stepRun(deps, "timeline", async () => {
    const conversations = buildConversations(transcripts);
    const camera = summariseCamera(frames.people, frames.staff, videoStart, VIDEO_FPS);
    return {
      value: { conversations, camera },
      detail: `${plural(conversations.length, "conversation")} · ${plural(camera.visits.length, "customer")} · ${plural(camera.staffSeen, "rep")} on camera`,
    };
  });

  return stepRun(deps, "report", async () => {
    const common = { date: entry.date, sales: entry.sales, team: ctx.team, complaints: entry.complaints, ...timeline };
    const prompt = buildReportPrompt({
      ...common,
      storeName: ctx.storeName,
      storeKind: ctx.storeKind,
      cameraFrom: videoStart,
      cameraTo: videoStart + prepared.videoSeconds,
    });
    const report = assembleReport(await deps.writeReport(prompt), common);
    await deps.saveReport(entry.store, report);
    return { value: report, detail: `${plural(report.moments.length, "moment")} · ${plural(report.disputes.length, "complaint")} checked` };
  });
}
