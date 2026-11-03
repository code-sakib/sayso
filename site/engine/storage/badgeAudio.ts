// Badge recordings on the server. A badge uploads each file when it reaches Wi-Fi; it lands under
// data/badges/<store>/<date>/ with a small JSON card saying whose badge it is and when it started.

import { readdir, rm } from "node:fs/promises";
import { MAX_BADGE_UPLOAD_BYTES } from "../config.ts";
import { probeSeconds } from "../media/ffmpeg.ts";
import { compactClock, parseClock } from "../timeline/clock.ts";
import type { BadgeRecording } from "../types.ts";
import { STAFF_PROFILES } from "../../components/store/staff.ts";
import { dataPath, readJson, saveBody, writeJson } from "./files.ts";

const AUDIO_TYPES: Record<string, string> = {
  "audio/wav": "wav",
  "audio/x-wav": "wav",
  "audio/wave": "wav",
  "audio/mpeg": "mp3",
  "audio/mp4": "m4a",
  "audio/x-m4a": "m4a",
};

const STARTED_AT = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})$/;

export class BadgeUploadError extends Error {
  readonly status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

/** The rep and store a badge belongs to. */
export const badgeOwner = (badgeId: string) => {
  const rep = STAFF_PROFILES.find((p) => p.badge.id === badgeId);
  return rep ? { repId: rep.id, repName: rep.name, store: rep.branch } : null;
};

/**
 * Save one upload from a badge.
 * @param startedAt store-local time the badge started this file, "2026-11-02T18:40:05"
 */
export async function saveBadgeRecording(badgeId: string, startedAt: string, contentType: string, body: ReadableStream<Uint8Array>): Promise<BadgeRecording> {
  const owner = badgeOwner(badgeId);
  if (!owner) throw new BadgeUploadError("This badge isn't paired with anyone.", 404);
  const m = STARTED_AT.exec(startedAt);
  const startSec = m ? parseClock(m[2]) : null;
  if (!m || startSec === null) throw new BadgeUploadError("startedAt must look like 2026-11-02T18:40:05.", 400);
  const ext = AUDIO_TYPES[contentType.split(";")[0].trim().toLowerCase()];
  if (!ext) throw new BadgeUploadError("Send WAV, MP3 or M4A audio.", 415);

  const name = `${badgeId}_${compactClock(startSec)}`;
  const file = dataPath("badges", owner.store, m[1], `${name}.${ext}`);
  await saveBody(body, file, MAX_BADGE_UPLOAD_BYTES);
  const durationSec = await probeSeconds(file);
  if (durationSec === null) {
    await rm(file, { force: true });
    throw new BadgeUploadError("The audio couldn't be read.", 422);
  }
  const recording: BadgeRecording = { badgeId, repId: owner.repId, startSec, durationSec, file };
  await writeJson(dataPath("badges", owner.store, m[1], `${name}.json`), recording);
  return recording;
}

/** Every badge file the server has for a store and day, in start order. */
export async function badgeRecordings(store: string, date: string): Promise<BadgeRecording[]> {
  let names: string[];
  try {
    names = await readdir(dataPath("badges", store, date));
  } catch {
    return [];
  }
  const cards = await Promise.all(names.filter((n) => n.endsWith(".json")).map((n) => readJson<BadgeRecording>(dataPath("badges", store, date, n))));
  return cards.filter((c): c is BadgeRecording => c !== null).sort((a, b) => a.startSec - b.startSec);
}
