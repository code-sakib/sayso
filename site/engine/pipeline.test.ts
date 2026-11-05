import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { runPipeline, type EngineDeps } from "./pipeline.ts";
import type { Frame } from "./meta/samParse.ts";
import type { SparkReport } from "./report/schema.ts";
import type { Entry, StepId } from "./types.ts";

const entry: Entry = {
  id: "abc", store: "electronics", date: "2026-11-02", videoStartsAt: "18:39:30", sales: 2,
  complaints: [{ time: "19:00", repId: "jake", kind: "conduct", claim: "He ignored me." }],
  video: { name: "cam.mp4", bytes: 10 }, status: "processing", steps: [], createdAt: "", updatedAt: "",
};

const person = (id: number, x: number) => ({ id, box: { x1: x, y1: 50, x2: x + 40, y2: 250 }, frameW: 640, frameH: 360 });
const frames = (objects: Frame["objects"]): Frame[] => Array.from({ length: 30 }, (_, index) => ({ index, objects }));

const sparkReply: SparkReport = {
  headline: "Jake sent a buyer to the website.", summary: "Short evening.", walkouts: 1, lostValue: 800,
  moments: [{ conversationId: "c1", kind: "walkout", title: "Sent away", customer: "A student.", quote: "check the website", cameraNotes: [], happened: "x", tryInstead: "y" }],
  disputes: [{ complaintIndex: 0, conversationId: "c1", title: "Ignored?", finding: "He answered at once.", verdict: "cleared", outcome: "Thank them." }],
  notes: [{ repId: "jake", note: "Learn the plans." }],
  customerSpeakers: [],
};

function fakes() {
  const steps: [StepId, string][] = [];
  const calls = { prompt: "", deleted: [] as string[], saved: 0 };
  const deps: EngineDeps = {
    recordings: async () => [{ badgeId: "SB-01", repId: "jake", startSec: 18 * 3600 + 40 * 60, durationSec: 30, file: "/badge.wav" }],
    speechChunks: async () => [{ file: "/badge-000.wav", offsetSec: 0 }],
    samVideo: async () => {},
    probeSeconds: async () => 15,
    transcribe: async () => [
      { startMs: 0, endMs: 3000, text: "Hi, need a hand?", speaker: "A" },
      { startMs: 3000, endMs: 4000, text: "Customer words that slipped through", speaker: "B" },
      { startMs: 8000, endMs: 12000, text: "You can check the website for plans.", speaker: "A" },
    ],
    uploadVideo: async () => "file-1",
    segmentVideo: async (_id, concept) => (concept === "person" ? frames([person(1, 100), person(2, 150)]) : frames([person(7, 100)])),
    deleteUpload: async (id) => void calls.deleted.push(id),
    writeReport: async (prompt) => ((calls.prompt = prompt), sparkReply),
    saveReport: async () => void calls.saved++,
    step: async (id, status) => void steps.push([id, status]),
  };
  return { deps, steps, calls };
}

const context = async () => ({
  entry, storeName: "Main St", storeKind: "Electronics",
  team: [{ id: "jake", name: "Jake Miller", section: "Mobiles" }],
  videoFile: "/cam.mp4", workDir: await mkdtemp(path.join(tmpdir(), "sayso-")),
});

test("runs audio and video through to a saved report", async () => {
  const { deps, steps, calls } = fakes();
  const report = await runPipeline(await context(), deps);
  assert.equal(report.customers, 1);
  assert.equal(report.conversations, 1);
  assert.equal(report.moments[0].quote, "check the website");
  assert.equal(report.disputes[0].verdict, "cleared");
  assert.equal(calls.saved, 1);
  assert.deepEqual(calls.deleted, ["file-1"]);
  assert.deepEqual(steps.filter(([, s]) => s === "done").map(([id]) => id), ["prepare", "transcribe", "track", "timeline", "report"]);
});

test("customer speech the badge picked up never reaches Muse Spark", async () => {
  const { deps, calls } = fakes();
  await runPipeline(await context(), deps);
  assert.match(calls.prompt, /Hi, need a hand\?/);
  assert.doesNotMatch(calls.prompt, /slipped through/);
});

test("a camera file over the limit fails the first step and spends nothing", async () => {
  const { deps, steps } = fakes();
  let spent = false;
  await assert.rejects(
    runPipeline(await context(), { ...deps, probeSeconds: async () => 99_999, transcribe: async () => ((spent = true), []) }),
    /longer than 30 minutes/,
  );
  assert.equal(spent, false);
  assert.deepEqual(steps.at(-1), ["prepare", "failed"]);
});

test("the SAM upload is deleted even when tracking fails", async () => {
  const { deps, calls } = fakes();
  await assert.rejects(runPipeline(await context(), { ...deps, segmentVideo: async () => { throw new Error("SAM down"); } }), /SAM down/);
  assert.deepEqual(calls.deleted, ["file-1"]);
});
