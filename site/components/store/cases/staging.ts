// Where a rep should stand while their demo case plays. Pure maths, read by Person each frame.

import { CASE_CUSTOMER_ID, caseById, talkSeconds } from "./cases";
import { caseElapsed, getPlayback } from "./playback";
import type { Zone } from "./step";

export { keepOut, stepToward, type Step, type Zone } from "./step";

/** Metres kept clear around a demo conversation, so nobody walks between rep and customer. */
const KEEP_CLEAR = 1.8;
/** Seconds for the clear circle to open, so people already inside drift out instead of jumping. */
const CLEAR_OPENS = 1.2;

export type Stage = { x: number; z: number; faceX: number; faceZ: number };

/** The spot the rep holds while their case plays; null once the customer has gone. */
export function stageFor(walkerId: string): Stage | null {
  const p = getPlayback();
  const c = caseById(p.id);
  if (!c || c.repId !== walkerId) return null;
  const holdUntil = p.arriveAfter > 0 ? p.arriveAfter + talkSeconds(c) : Infinity;
  if (caseElapsed() > holdUntil) return null;
  return { ...c.repSpot, faceX: c.customerSpot.x, faceZ: c.customerSpot.z };
}

/** The circle other people in the branch walk around while a demo conversation plays there. */
export function talkZone(branch: string, walkerId: string): Zone | null {
  const p = getPlayback();
  const c = caseById(p.id);
  if (!c || c.branch !== branch || walkerId === c.repId || walkerId === CASE_CUSTOMER_ID) return null;
  const elapsed = caseElapsed();
  const holdUntil = p.arriveAfter > 0 ? p.arriveAfter + talkSeconds(c) : Infinity;
  if (elapsed > holdUntil) return null;
  return {
    x: (c.customerSpot.x + c.repSpot.x) / 2,
    z: (c.customerSpot.z + c.repSpot.z) / 2,
    r: KEEP_CLEAR * Math.min(1, elapsed / CLEAR_OPENS),
  };
}
