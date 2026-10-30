// Electronics branch floor plan, in metres (local to the branch; see ../shell.ts).

const ROW_1 = -3.6;
const ROW_2 = 2.6;
const COLS = [-8.5, -3, 2.5] as const;
const TABLE = { w: 3.6, d: 1.3 };

type Box = { x: number; z: number; w: number; d: number };

export const FIXTURES = {
  phoneA: { x: COLS[0], z: ROW_1, ...TABLE },
  phoneB: { x: COLS[1], z: ROW_1, ...TABLE },
  tablets: { x: COLS[2], z: ROW_1, ...TABLE },
  laptops: { x: COLS[0], z: ROW_2, ...TABLE },
  watches: { x: COLS[1], z: ROW_2, ...TABLE },
  cameras: { x: COLS[2], z: ROW_2, ...TABLE },
  speakers: { x: 10.8, z: -4.4, w: 2.8, d: 1.3 },
  counter: { x: 12.6, z: 7.2, w: 1.2, d: 4.2 },
} satisfies Record<string, Box>;

/** Walkways: a corridor between the two rows of tables, one behind them, one in front. */
export const AISLES = { corridorZ: -0.5, backZ: -7.2, frontZ: 6.2, x: [-5.75, -0.25, 6.2] } as const;

export const TV_WALL = { x0: -14.6, x1: -1.6 } as const;
export const SHELF_WALL = { x0: 1.6, x1: 14.6 } as const;
export const APPLIANCES = { fridges: [-8.7, -6.9], washers: [-4.6, -3.0, -1.4], acs: [2.2, 5.4] } as const;
export const LOUNGE = { x: 10.6, z: 0.6, w: 6, d: 4.4 } as const;
export const PROMO = { x: -9.5, z: 7.4, r: 1.5 } as const;
