// Everyone walking around the city, plus live state the HTML overlay and the doors read.

import type { Route } from "./routes";
import type { Look } from "./look";

export type Walker = {
  id: string;
  /** Which branch's coordinates the route is in ("street" = city coordinates). */
  branch: string;
  route: Route;
  offset: number;
  look: Look;
  /** Staff wear the SaySo badge and can be hovered for their profile (see staff.ts). */
  profileId?: string;
  /** Grow in / shrink out at the ends of the route instead of popping. */
  fadeEnds?: boolean;
};

/** Live floor positions per branch, written every frame by each walker. */
export const LIVE_POSITIONS = new Map<string, Map<string, { x: number; z: number }>>();
/** What each staff member is doing right now (from the route's waypoint labels). */
export const LIVE_ACTIVITY = new Map<string, { label?: string; moving: boolean }>();

export function setLivePosition(branch: string, id: string, x: number, z: number) {
  let map = LIVE_POSITIONS.get(branch);
  if (!map) {
    map = new Map();
    LIVE_POSITIONS.set(branch, map);
  }
  map.set(id, { x, z });
}
