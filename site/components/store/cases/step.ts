// Walking a person straight to a spot. Pure maths, no imports, so it can be unit tested directly.

export type Step = { x: number; z: number; heading: number; moving: boolean };

/** Walks from (x, z) towards a target at `speed`; on arrival turns to face (faceX, faceZ) if given. */
export function stepToward(
  from: { x: number; z: number },
  to: { x: number; z: number; faceX?: number; faceZ?: number },
  speed: number,
  delta: number,
): Step {
  const dx = to.x - from.x;
  const dz = to.z - from.z;
  const dist = Math.hypot(dx, dz);
  const reach = speed * delta;
  if (dist <= Math.max(reach, 0.03)) {
    const heading = to.faceX !== undefined && to.faceZ !== undefined ? Math.atan2(to.faceX - to.x, to.faceZ - to.z) : Math.atan2(dx, dz);
    return { x: to.x, z: to.z, heading, moving: false };
  }
  return { x: from.x + (dx / dist) * reach, z: from.z + (dz / dist) * reach, heading: Math.atan2(dx, dz), moving: true };
}

export type Zone = { x: number; z: number; r: number };

/** Moves a point that falls inside the circle out to its edge, so passers-by walk around it. */
export function keepOut(p: { x: number; z: number }, zone: Zone): { x: number; z: number } {
  const dx = p.x - zone.x;
  const dz = p.z - zone.z;
  const dist = Math.hypot(dx, dz);
  if (dist >= zone.r) return p;
  // Dead centre has no direction to push in; send it towards the street.
  if (dist === 0) return { x: zone.x, z: zone.z + zone.r };
  return { x: zone.x + (dx / dist) * zone.r, z: zone.z + (dz / dist) * zone.r };
}
