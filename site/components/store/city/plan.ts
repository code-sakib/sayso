// City street plan around the three branches. Each row of shops faces its own avenue (see
// ROWS in ../branches.ts); cross streets run between them.

import { ROWS } from "../branches";
import { STREET } from "../shell";

export const CITY = { minX: -150, maxX: 150, minZ: -110, maxZ: 60 } as const;

type Span = readonly [number, number];
const shift = ([a, b]: Span, dz: number): Span => [a + dz, b + dz];

/** One avenue per row of shops: shop-side sidewalk, road and the sidewalk opposite. */
export const AVENUES = ROWS.map((z) => ({
  rowZ: z,
  sidewalk: shift(STREET.sidewalk, z),
  road: shift(STREET.road, z),
  carLanes: shift(STREET.carLanes, z),
  farSidewalk: [STREET.road[1] + z, STREET.road[1] + z + 3.2] as Span,
}));

const BACK_ROW = ROWS[ROWS.length - 1];
/** Service street behind the back row of shops. */
export const BACK_STREET = { road: [BACK_ROW - 21.8, BACK_ROW - 13.8] as Span, sidewalk: [BACK_ROW - 13.8, BACK_ROW - 11.4] as Span };

/** Cross streets run from the back street to the main avenue. */
export const CROSS = { xs: [-110, -30, 30, 108], width: STREET.crossWidth, from: BACK_STREET.road[0], to: AVENUES[0].road[0] } as const;

export const PARK = { z0: AVENUES[0].farSidewalk[1], z1: AVENUES[0].farSidewalk[1] + 20 } as const;
