// What the Telegram alerts say. The badge reports when it starts and stops recording, and the
// server reports each piece that arrives, so the wearer can check from their phone that all is well.

import { STORE_TIME_ZONE } from "../config.ts";
import { formatClock, minutes } from "../timeline/clock.ts";
import type { BadgeRecording } from "../types.ts";

export type BadgeEvent = { event: "started" } | { event: "stopped"; uploaded?: number };

const who = (badgeId: string, repName: string) => `${repName} (${badgeId})`;

/** The store's wall-clock time right now, as seconds since midnight. */
export function storeClockNow(now = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: STORE_TIME_ZONE, hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
  }).formatToParts(now);
  const part = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return part("hour") * 3600 + part("minute") * 60 + part("second");
}

export function eventMessage(e: BadgeEvent, badgeId: string, repName: string, clockSec: number): string {
  const head = `${who(badgeId, repName)} · ${formatClock(clockSec)}`;
  if (e.event === "started") return `🔴 Recording started · ${head}`;
  const sent = e.uploaded ? ` · ${e.uploaded} min sent` : "";
  return `⚪ Recording stopped · ${head}${sent}`;
}

export const arrivedMessage = (rec: BadgeRecording, repName: string) =>
  `🎙️ Recording arrived · ${who(rec.badgeId, repName)} · ${formatClock(rec.startSec)} · ${minutes(rec.durationSec)} min`;
