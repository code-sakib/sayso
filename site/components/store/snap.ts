// Picks which store a drag should fly to. Pure maths so it can be unit tested.

type Spot = { x: number; z: number };

/** A drag shorter than this (metres) stays at the current store. */
export const SNAP_MIN = 1.5;
/** How closely a store must line up with the drag direction to be picked (cosine). */
const SNAP_CONE = 0.3;

const nearest = <T extends Spot>(spots: readonly T[], p: Spot) =>
  spots.reduce((best, s) => (Math.hypot(s.x - p.x, s.z - p.z) < Math.hypot(best.x - p.x, best.z - p.z) ? s : best), spots[0]);

/** The store best lined up with the drag from `start` to `end`, or the store the drag began at. */
export function snapTarget<T extends Spot>(spots: readonly T[], start: Spot, end: Spot): T {
  const from = nearest(spots, start);
  const dx = end.x - start.x;
  const dz = end.z - start.z;
  const len = Math.hypot(dx, dz);
  if (len < SNAP_MIN) return from;
  let best = from;
  let bestScore = SNAP_CONE;
  for (const s of spots) {
    if (s === from) continue;
    const sx = s.x - from.x;
    const sz = s.z - from.z;
    const score = (dx * sx + dz * sz) / (len * Math.hypot(sx, sz));
    if (score > bestScore) {
      best = s;
      bestScore = score;
    }
  }
  return best;
}
