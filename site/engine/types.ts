// Shapes shared by the engine, its API routes and the log-entry page. Type-only, so the browser
// can import it too.

import type { DisputeKind } from "../components/dashboard/reports/types.ts";

/** A complaint the manager logged today, to be checked against the badge audio. */
export type Complaint = { time: string; repId: string; kind: DisputeKind; claim: string };

export type StepId = "prepare" | "transcribe" | "track" | "timeline" | "report";
export type StepStatus = "waiting" | "running" | "done" | "failed" | "skipped";
export type Step = { id: StepId; label: string; status: StepStatus; detail?: string };

export type EntryStatus = "draft" | "processing" | "done" | "failed";

/** One day's entry from the owner: the camera file, the till's sales count and any complaints. */
export type Entry = {
  id: string;
  store: string;
  /** ISO date of the day being logged. */
  date: string;
  /** Store clock time at the first frame of the camera file, "18:30" or "18:30:15". */
  videoStartsAt: string;
  sales: number;
  complaints: Complaint[];
  video: { name: string; bytes: number } | null;
  status: EntryStatus;
  steps: Step[];
  error?: string;
  createdAt: string;
  updatedAt: string;
};

/** A badge file the server already has for a day. */
export type BadgeRecording = {
  badgeId: string;
  repId: string;
  /** Store clock time the badge started recording, seconds since midnight. */
  startSec: number;
  durationSec: number;
  file: string;
};

/** Every API route answers in this envelope. */
export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string };

export const STEP_LABELS: Record<StepId, string> = {
  prepare: "Get the badge audio and camera file ready",
  transcribe: "Write down what each rep said",
  track: "Find customers in the camera file",
  timeline: "Line up voices and video on one clock",
  report: "Write the coaching report",
};
