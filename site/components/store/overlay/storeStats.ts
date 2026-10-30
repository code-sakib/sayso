// Live numbers for one branch, read from the 3D scene by the overlay.

import { BRANCHES, nearestBranch, type BranchId } from "../branches";
import { LIVE_POSITIONS } from "../people";
import { STORE } from "../shell";
import { profilesIn } from "../staff";
import { CAMERA_FOCUS } from "../selection";

/** The branch the camera is looking at. */
export const readCurrentBranchId = () => nearestBranch(CAMERA_FOCUS.x, CAMERA_FOCUS.z).id;

/** Shoppers inside a branch right now (not the ones still on the sidewalk). */
export function countShoppersInside(id: BranchId) {
  let n = 0;
  LIVE_POSITIONS.get(id)?.forEach((p, key) => {
    if (key.includes("-shopper-") && Math.abs(p.x) < STORE.halfW && Math.abs(p.z) < STORE.halfD) n += 1;
  });
  return n;
}

/** Shoppers inside every branch, as one comparable string so React only re-renders on change. */
export const readAllInside = () => BRANCHES.map((b) => countShoppersInside(b.id)).join(",");

export function teamSummary(id: BranchId) {
  const team = profilesIn(id);
  const sum = (pick: (t: (typeof team)[number]["today"]) => number) => team.reduce((n, p) => n + pick(p.today), 0);
  return {
    team,
    recording: team.filter((p) => p.badge.recording).length,
    served: sum((t) => t.customers),
    sales: sum((t) => t.sales),
    walkouts: sum((t) => t.walkouts),
  };
}
