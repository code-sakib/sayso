// Helpers shared by the engine's API routes: the response envelope, input checks, a per-visitor
// limit on model runs, and the badge's upload token.

import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { profilesIn } from "../components/store/staff";
import { RUNS_PER_HOUR, badgeToken } from "./config.ts";
import { parseClock } from "./timeline/clock.ts";
import type { ApiResult } from "./types.ts";

export const ok = <T>(data: T, status = 200) => NextResponse.json<ApiResult<T>>({ ok: true, data }, { status });
export const fail = (status: number, error: string) => NextResponse.json<ApiResult<never>>({ ok: false, error }, { status });

const clock = z.string().refine((s) => parseClock(s) !== null, "Use a time like 18:30");
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use a date like 2026-11-02");

/** What the log page sends to create an entry. Reps must belong to the store. */
export const entryInput = (store: string) => {
  const team = new Set(profilesIn(store).map((p) => p.id));
  return z.strictObject({
    date: isoDate,
    videoStartsAt: z.union([clock, z.literal("")]),
    window: z.strictObject({ from: clock, to: clock }).optional(),
    badgeWornBy: z.enum(["rep", "shopper"]).optional(),
    includeCustomer: z.boolean().optional(),
    place: z.string().trim().min(2).max(80).optional(),
    sales: z.number().int().min(0).max(10_000),
    complaints: z.array(z.strictObject({
      time: clock,
      repId: z.string().refine((id) => team.has(id), "Pick someone from this store"),
      kind: z.enum(["conduct", "promise"]),
      claim: z.string().trim().min(5, "Say what the customer claimed").max(600),
    })).max(10),
  });
};

/** The first problem in a failed parse, for a short error message. */
export const firstIssue = (error: z.ZodError) => {
  const issue = error.issues[0];
  return issue ? `${issue.path.join(".") || "input"}: ${issue.message}` : "Invalid input";
};

const runs: Map<string, number[]> = ((globalThis as { __saysoRuns?: Map<string, number[]> }).__saysoRuns ??= new Map());
const HOUR_MS = 60 * 60 * 1000;

/** True if this visitor may start another run now; records the run if so. */
export function allowRun(visitor: string, now = Date.now()): boolean {
  const recent = (runs.get(visitor) ?? []).filter((t) => now - t < HOUR_MS);
  if (recent.length >= RUNS_PER_HOUR) {
    runs.set(visitor, recent);
    return false;
  }
  runs.set(visitor, [...recent, now]);
  return true;
}

export const visitorOf = (req: Request) => req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";

/** Badges send `Authorization: Bearer <SAYSO_BADGE_TOKEN>`. */
export function isBadgeAuthorised(req: Request): boolean {
  const expected = badgeToken();
  const given = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!expected || given.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(given), Buffer.from(expected));
}
