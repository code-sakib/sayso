// Route-building helpers shared by every branch's crowd file.

import { buildRoute, type Waypoint } from "./routes";
import { DOOR, STORE, STREET } from "./shell";
import { shopperLook } from "./look";
import { profileById } from "./staff";
import type { Walker } from "./people";

export type Box = { x: number; z: number; d: number; w?: number };

export const STAND_OFF = 0.55;

export const OFF_LEFT: Waypoint = { x: -STREET.spawnX, z: STREET.walkLane };
export const OFF_RIGHT: Waypoint = { x: STREET.spawnX, z: STREET.walkLane };
const DOOR_OUT: Waypoint = { x: DOOR.x, z: STREET.walkLane };
export const DOOR_IN: Waypoint = { x: DOOR.x, z: STORE.halfD - 1.6 };

export const enter = (from: Waypoint): Waypoint[] => [from, DOOR_OUT, DOOR_IN];
export const leave = (to: Waypoint): Waypoint[] => [DOOR_IN, DOOR_OUT, to];

/** Standing spot on the street side (+z) or the back side (−z) of a table or case. */
export const front = (f: Box, dx = 0) => ({ x: f.x + dx, z: f.z + f.d / 2 + STAND_OFF });
export const back = (f: Box, dx = 0) => ({ x: f.x + dx, z: f.z - f.d / 2 - STAND_OFF });

export const stop = (spot: { x: number; z: number }, wait: number, face: [number, number], label?: string): Waypoint => ({
  ...spot,
  wait,
  face,
  label,
});

/** Stand at a table and face it. */
export const at = (spot: { x: number; z: number }, wait: number, f: Box, label?: string) =>
  stop(spot, wait, [spot.x, f.z], label);

/** Shoppers: `perPath` people spread out along each path, each with their own look. */
export function shoppers(branch: string, paths: Waypoint[][], perPath: number, speed: number, seed = 0): Walker[] {
  return paths.flatMap((points, p) =>
    Array.from({ length: perPath }, (_, k) => {
      const route = buildRoute(points, speed + ((p + k) % 3) * 0.12);
      const n = seed + p * perPath + k;
      return {
        id: `${branch}-shopper-${n}`,
        branch,
        route,
        offset: (route.total * k) / perPath + p * 3.1,
        look: shopperLook(n),
        fadeEnds: true,
      };
    }),
  );
}

export type StaffPaths = Record<string, { points: Waypoint[]; speed: number }>;

/** Turns a branch's staff paths into walkers dressed from their profiles. */
export function staffWalkers(branch: string, paths: StaffPaths): Walker[] {
  return Object.entries(paths).map(([id, s], i) => {
    const profile = profileById(id);
    if (!profile) throw new Error(`No staff profile for "${id}"`);
    return { id, branch, route: buildRoute(s.points, s.speed), offset: i * 2.3, look: profile.look, profileId: id };
  });
}
