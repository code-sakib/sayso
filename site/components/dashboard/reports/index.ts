// Every store's week of reports, looked up by branch id.

import type { BranchId } from "../../store/branches";
import type { DayReport } from "./types";
import { HARBOR_WEEK } from "./harbor";
import { MAIN_ST_WEEK } from "./mainSt";
import { MISSION_ST_WEEK } from "./missionSt";

export const WEEKS: Record<BranchId, DayReport[]> = {
  electronics: MAIN_ST_WEEK,
  harbor: HARBOR_WEEK,
  fashion: MISSION_ST_WEEK,
};

export const weekFor = (branchId: string): DayReport[] | undefined => WEEKS[branchId as BranchId];

export const reportFor = (branchId: string, date: string) => weekFor(branchId)?.find((d) => d.date === date);

export type { DayReport, Dispute, Line, Moment, MomentKind, RepNote, Verdict } from "./types";
