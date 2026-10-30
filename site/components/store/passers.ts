// People walking along each avenue's shop-side sidewalk, in city coordinates.

import { buildRoute } from "./routes";
import { shopperLook } from "./look";
import { STREET } from "./shell";
import { ROWS } from "./branches";
import type { Walker } from "./people";

const END = 140;
const PER_LANE = 8;

export const PASSERS: Walker[] = ROWS.flatMap((rowZ, row) =>
  STREET.passLanes.flatMap((laneZ, lane) => {
    const dir = lane === 0 ? 1 : -1;
    const z = rowZ + laneZ;
    return Array.from({ length: PER_LANE }, (_, k): Walker => {
      const route = buildRoute([{ x: -END * dir, z }, { x: END * dir, z }], 1.2 + (k % 3) * 0.1);
      return {
        id: `passer-${row}-${lane}-${k}`,
        branch: "street",
        route,
        offset: (route.total * (k + row * 0.37)) / PER_LANE,
        look: shopperLook(200 + row * 31 + lane * 13 + k * 3),
        fadeEnds: true,
      };
    });
  }),
);
