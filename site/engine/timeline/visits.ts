// SAM frames to customer visits. SAM is asked twice: once for every person, once for people
// dressed like staff. A person track that sits on a staff box most of the time is a rep; the rest
// are customers. For each customer we keep only what a camera can honestly say: when they came
// and went, where they stood, how long they stood still, and how long a rep was beside them.

import { MIN_VISIT_SECONDS } from "../config.ts";
import type { Box, Frame } from "../meta/samParse.ts";

export type Spot = "left" | "middle" | "right";

export type Visit = {
  id: string;
  startSec: number;
  endSec: number;
  /** The third of the frame they spent most time in. */
  spot: Spot;
  /** Longest stretch without moving more than a small step. */
  longestStillSec: number;
  /** Time with a rep standing close by. */
  withStaffSec: number;
};

export type CameraSummary = { visits: Visit[]; staffSeen: number };

/** Overlap needed for a person box to count as the same body as a staff box. */
const SAME_BODY_IOU = 0.5;
/** Share of a track's frames on staff boxes that makes it a rep. */
const STAFF_SHARE = 0.5;
/** Centres closer than this share of the frame width are "beside" each other. */
const BESIDE = 0.18;
/** Moving less than this share of the frame width between frames counts as standing still. */
const STILL_STEP = 0.03;

export function iou(a: Box, b: Box): number {
  const w = Math.max(0, Math.min(a.x2, b.x2) - Math.max(a.x1, b.x1));
  const h = Math.max(0, Math.min(a.y2, b.y2) - Math.max(a.y1, b.y1));
  const inter = w * h;
  const area = (r: Box) => Math.max(0, r.x2 - r.x1) * Math.max(0, r.y2 - r.y1);
  const union = area(a) + area(b) - inter;
  return union === 0 ? 0 : inter / union;
}

const centreX = (b: Box) => (b.x1 + b.x2) / 2;
const centreY = (b: Box) => (b.y1 + b.y2) / 2;

type Sighting = { frame: number; box: Box; frameW: number; isStaffBody: boolean; nearStaff: boolean };

function sightingsById(people: Frame[], staff: Frame[]): Map<number, Sighting[]> {
  const staffByFrame = new Map(staff.map((f) => [f.index, f.objects.map((o) => o.box)]));
  const tracks = new Map<number, Sighting[]>();
  for (const frame of people) {
    const staffBoxes = staffByFrame.get(frame.index) ?? [];
    for (const o of frame.objects) {
      const width = o.frameW || Math.max(o.box.x2, 1);
      const isStaffBody = staffBoxes.some((s) => iou(s, o.box) >= SAME_BODY_IOU);
      const nearStaff = !isStaffBody && staffBoxes.some((s) =>
        Math.hypot(centreX(s) - centreX(o.box), centreY(s) - centreY(o.box)) < BESIDE * width);
      const prev = tracks.get(o.id) ?? [];
      tracks.set(o.id, [...prev, { frame: frame.index, box: o.box, frameW: width, isStaffBody, nearStaff }]);
    }
  }
  return tracks;
}

function spotOf(seen: Sighting[]): Spot {
  const counts = { left: 0, middle: 0, right: 0 };
  for (const s of seen) {
    const share = centreX(s.box) / s.frameW;
    const spot: Spot = share < 1 / 3 ? "left" : share < 2 / 3 ? "middle" : "right";
    counts[spot] += 1;
  }
  return (Object.keys(counts) as Spot[]).reduce((a, b) => (counts[b] > counts[a] ? b : a));
}

function longestStillFrames(seen: Sighting[]): number {
  let best = 0;
  let run = 0;
  for (let i = 1; i < seen.length; i++) {
    const a = seen[i - 1];
    const b = seen[i];
    const step = Math.hypot(centreX(a.box) - centreX(b.box), centreY(a.box) - centreY(b.box)) / b.frameW;
    run = step < STILL_STEP && b.frame - a.frame === 1 ? run + 1 : 0;
    best = Math.max(best, run);
  }
  return best;
}

/**
 * Customer visits from the two SAM passes.
 * @param startSec store clock time of frame 0
 * @param fps frames a second of the video SAM saw
 */
export function summariseCamera(people: Frame[], staff: Frame[], startSec: number, fps: number, minVisitSec = MIN_VISIT_SECONDS): CameraSummary {
  const tracks = [...sightingsById(people, staff).entries()];
  const isStaff = ([, seen]: [number, Sighting[]]) => seen.filter((s) => s.isStaffBody).length / seen.length >= STAFF_SHARE;
  const at = (frame: number) => startSec + frame / fps;
  const visits = tracks
    .filter((t) => !isStaff(t))
    .map(([id, seen]) => ({ id, seen }))
    .filter(({ seen }) => (seen.at(-1)!.frame - seen[0].frame + 1) / fps >= minVisitSec)
    .sort((a, b) => a.seen[0].frame - b.seen[0].frame)
    .map(({ seen }, i): Visit => ({
      id: `v${i + 1}`,
      startSec: at(seen[0].frame),
      endSec: at(seen.at(-1)!.frame + 1),
      spot: spotOf(seen),
      longestStillSec: longestStillFrames(seen) / fps,
      withStaffSec: seen.filter((s) => s.nearStaff).length / fps,
    }));
  return { visits, staffSeen: tracks.filter(isStaff).length };
}
