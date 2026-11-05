// A record of every Meta model call in one run, for the dashboard's developer view: which model,
// what went in, what came back and how long it took. Saved next to the entry.

import { readdir } from "node:fs/promises";
import type { SparkReport } from "../report/schema.ts";
import type { SpeechTurn } from "../timeline/conversations.ts";
import type { Entry } from "../types.ts";
import { dataPath, isSafeName, readJson, writeJson } from "./files.ts";
import { entryDir } from "./entries.ts";

export type TranscribeCall = { kind: "transcribe"; model: string; file: string; ms: number; turns: SpeechTurn[] };
export type SegmentCall = { kind: "segment"; model: string; concept: string; ms: number; frames: number };
export type ReportCall = { kind: "report"; model: string; ms: number; prompt: string; output: SparkReport };
export type ModelCall = TranscribeCall | SegmentCall | ReportCall;

export type Trace = { entryId: string; store: string; date: string; startedAt: string; calls: ModelCall[] };

const traceFile = (entryId: string) => entryDir(entryId, "trace.json");

export const saveTrace = (trace: Trace) => writeJson(traceFile(trace.entryId), trace);

/** The newest finished run for a store and day, with its trace, if there is one. */
export async function latestRun(store: string, date: string): Promise<{ entry: Entry; trace: Trace | null } | null> {
  if (!isSafeName(store)) return null;
  let names: string[];
  try {
    names = await readdir(dataPath("entries"));
  } catch {
    return null;
  }
  const entries = await Promise.all(names.filter((n) => n.endsWith(".json")).map((n) => readJson<Entry>(dataPath("entries", n))));
  const runs = entries
    .filter((e): e is Entry => e !== null && e.store === store && e.date === date && e.status === "done")
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const entry = runs[0];
  return entry ? { entry, trace: await readJson<Trace>(traceFile(entry.id)) } : null;
}
