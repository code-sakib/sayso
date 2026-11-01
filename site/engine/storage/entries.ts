// Owner entries, one JSON file each under data/entries/. Updates replace the whole record.

import { randomUUID } from "node:crypto";
import { STEP_LABELS, type Complaint, type Entry, type Step, type StepId } from "../types.ts";
import { dataPath, isSafeName, readJson, writeJson } from "./files.ts";

const STEP_ORDER: StepId[] = ["prepare", "transcribe", "track", "timeline", "report"];

const freshSteps = (): Step[] => STEP_ORDER.map((id) => ({ id, label: STEP_LABELS[id], status: "waiting" }));

const entryFile = (id: string) => dataPath("entries", `${id}.json`);

export type NewEntry = { store: string; date: string; videoStartsAt: string; sales: number; complaints: Complaint[] };

export async function createEntry(input: NewEntry): Promise<Entry> {
  const now = new Date().toISOString();
  const entry: Entry = {
    id: randomUUID().replaceAll("-", "").slice(0, 16),
    ...input,
    video: null,
    status: "draft",
    steps: freshSteps(),
    createdAt: now,
    updatedAt: now,
  };
  await writeJson(entryFile(entry.id), entry);
  return entry;
}

export const getEntry = (id: string) => (isSafeName(id) ? readJson<Entry>(entryFile(id)) : Promise.resolve(null));

// Shared through globalThis because each API route is bundled on its own
const queues: Map<string, Promise<unknown>> = ((globalThis as { __saysoQueues?: Map<string, Promise<unknown>> }).__saysoQueues ??= new Map());

/** Apply `change` to the stored entry and save the result. Writes for one entry are queued so none is lost. */
export function updateEntry(id: string, change: (e: Entry) => Entry): Promise<Entry> {
  const next = (queues.get(id) ?? Promise.resolve()).then(async () => {
    const current = await getEntry(id);
    if (!current) throw new Error(`No entry ${id}`);
    const updated = { ...change(current), updatedAt: new Date().toISOString() };
    await writeJson(entryFile(id), updated);
    return updated;
  });
  queues.set(id, next.catch(() => undefined));
  return next;
}

export const withStep = (e: Entry, id: StepId, status: Step["status"], detail?: string): Entry => ({
  ...e,
  steps: e.steps.map((s) => (s.id === id ? { ...s, status, detail } : s)),
});

/** A fresh run: every step back to waiting. */
export const resetSteps = (e: Entry): Entry => ({ ...e, steps: freshSteps(), error: undefined });

/** Where an entry's camera file and working files live. */
export const entryDir = (id: string, ...rest: string[]) => dataPath("entries", id, ...rest);
