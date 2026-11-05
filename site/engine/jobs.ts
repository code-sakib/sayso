// Runs an entry through the pipeline in the background of the web server and records progress
// on the entry, so the log page can poll it. One run per entry at a time.

import { rm } from "node:fs/promises";
import path from "node:path";
import { branchById } from "../components/store/branches";
import { FIELD_TEST_REP, profilesIn } from "../components/store/staff";
import { probeSeconds, toSamVideo, toSpeechChunks } from "./media/ffmpeg.ts";
import { MetaApiError } from "./meta/client.ts";
import { deleteUpload, segmentVideo, uploadVideo } from "./meta/segment.ts";
import { writeReport } from "./meta/spark.ts";
import { transcribeWav } from "./meta/transcribe.ts";
import { runPipeline } from "./pipeline.ts";
import { badgeRecordings } from "./storage/badgeAudio.ts";
import { entryDir, resetSteps, updateEntry, withStep } from "./storage/entries.ts";
import { saveReport } from "./storage/reports.ts";
import { saveTrace, type ModelCall } from "./storage/trace.ts";
import { MODELS } from "./config.ts";
import type { Entry } from "./types.ts";

// Each API route is bundled on its own, so the set lives on globalThis to be shared between them
const running: Set<string> = ((globalThis as { __saysoRunning?: Set<string> }).__saysoRunning ??= new Set());

export const isRunning = (id: string) => running.has(id);

/** Start processing. Returns false if this entry is already running. */
export function startEntry(entry: Entry): boolean {
  if (running.has(entry.id)) return false;
  running.add(entry.id);
  void runEntry(entry).finally(() => running.delete(entry.id));
  return true;
}

async function runEntry(entry: Entry) {
  const branch = branchById(entry.store);
  const workDir = entryDir(entry.id, "work");
  const started = await updateEntry(entry.id, (e) => ({ ...resetSteps(e), status: "processing" }));
  const calls: ModelCall[] = [];
  const timed = async <T>(work: () => Promise<T>): Promise<[T, number]> => {
    const t0 = Date.now();
    const value = await work();
    return [value, Date.now() - t0];
  };
  try {
    await runPipeline(
      {
        entry: started,
        storeName: branch?.street ?? entry.store,
        storeKind: branch?.kind ?? "Store",
        // A field-test visit is to a real store, so the demo team doesn't apply there
        team: entry.place ? [FIELD_TEST_REP] : profilesIn(entry.store).map((p) => ({ id: p.id, name: p.name, section: p.section })),
        videoFile: entryDir(entry.id, "camera"),
        workDir,
      },
      {
        recordings: badgeRecordings,
        speechChunks: toSpeechChunks,
        samVideo: toSamVideo,
        probeSeconds,
        transcribe: async (wav) => {
          const [turns, ms] = await timed(() => transcribeWav(wav));
          calls.push({ kind: "transcribe", model: MODELS.transcribe, file: path.basename(wav), ms, turns });
          return turns;
        },
        uploadVideo,
        segmentVideo: async (fileId, concept) => {
          const [frames, ms] = await timed(() => segmentVideo(fileId, concept));
          calls.push({ kind: "segment", model: MODELS.segment, concept, ms, frames: frames.length });
          return frames;
        },
        deleteUpload,
        writeReport: async (prompt) => {
          const [output, ms] = await timed(() => writeReport(prompt));
          calls.push({ kind: "report", model: MODELS.report, ms, prompt, output });
          return output;
        },
        saveReport,
        step: async (id, status, detail) => void (await updateEntry(entry.id, (e) => withStep(e, id, status, detail))),
      },
    );
    await updateEntry(entry.id, (e) => ({ ...e, status: "done", video: null }));
    // The report is written, so the raw footage goes; a failed run keeps it for a retry
    await rm(entryDir(entry.id, "camera"), { force: true });
  } catch (err) {
    console.error(`[engine] entry ${entry.id} failed`, err instanceof MetaApiError ? `${err.status} ${err.detail ?? ""}` : err);
    const message = err instanceof Error ? err.message : "Something went wrong while processing.";
    await updateEntry(entry.id, (e) => ({
      ...e,
      status: "failed",
      error: message,
      // Steps that never started are skipped, not left waiting
      steps: e.steps.map((s) => (s.status === "waiting" || s.status === "running" ? { ...s, status: s.status === "running" ? "failed" : "skipped" } : s)),
    }));
  } finally {
    await saveTrace({ entryId: entry.id, store: entry.store, date: entry.date, startedAt: started.updatedAt, calls }).catch((err) => console.error("[engine] trace not saved", err));
    // Working copies (WAV chunks, the small video) are only needed during the run
    await rm(workDir, { recursive: true, force: true });
  }
}
