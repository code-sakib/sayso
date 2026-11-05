// Numbers for one branch, read by the overlay.

import { nearestBranch, type BranchId } from "../branches";
import { profilesIn } from "../staff";
import { CAMERA_FOCUS } from "../selection";

/** The branch the camera is looking at. */
export const readCurrentBranchId = () => nearestBranch(CAMERA_FOCUS.x, CAMERA_FOCUS.z).id;

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
