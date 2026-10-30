// Shared geometry: every branch uses the same shop shell with its own street in front.
// Coordinates are metres, local to a branch (x across, z back → street).

export const STORE = { halfW: 16, halfD: 11, wallH: 4.6 } as const;

export const DOOR = { x: -0.25, width: 3.6 } as const;

export const STREET = {
  sidewalk: [11.4, 15.2] as const,
  road: [15.2, 23.2] as const,
  carLanes: [17.2, 21.2] as const,
  /** Shoppers walk this line to and from the door. */
  walkLane: 12.8,
  /** People just passing by. */
  passLanes: [13.8, 14.6] as const,
  crossWidth: 7,
  /** Where shoppers appear and vanish on the sidewalk (inside the branch's own block). */
  spawnX: 21,
} as const;
