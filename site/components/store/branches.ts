// The three demo branches, spread over the city in a loose triangle. Pure data (no components)
// so any module can import it without cycles.

import { C } from "./palette";
import { FASHION_COLORS } from "./fashion/layout";

export type BranchId = "fashion" | "electronics" | "harbor";

export type Branch = {
  id: BranchId;
  street: string;
  kind: "Electronics" | "Clothing";
  /** Centre of the branch in city coordinates. Its street runs along x in front of it (+z). */
  x: number;
  z: number;
  accent: string;
  floor: string;
  floorTile: string;
};

/** Streets the shops face, as z offsets: the main avenue and the one behind it. */
export const ROWS = [0, -50] as const;

export const BRANCHES: Branch[] = [
  { id: "fashion", street: "Mission St", kind: "Clothing", x: -64, z: ROWS[1], accent: FASHION_COLORS.accent, floor: FASHION_COLORS.floor, floorTile: FASHION_COLORS.floorTile },
  { id: "electronics", street: "Main St", kind: "Electronics", x: 0, z: ROWS[0], accent: C.brand, floor: C.floor, floorTile: C.floorTile },
  { id: "harbor", street: "Harbor Blvd", kind: "Electronics", x: 60, z: ROWS[1], accent: "#1F5F8B", floor: C.floor, floorTile: C.floorTile },
];

export const MAIN_BRANCH = BRANCHES[1];

export const branchById = (id: string) => BRANCHES.find((b) => b.id === id);

/** The branch whose centre is closest to a point on the map. */
export const nearestBranch = (x: number, z: number) =>
  BRANCHES.reduce((best, b) => (Math.hypot(b.x - x, b.z - z) < Math.hypot(best.x - x, best.z - z) ? b : best), BRANCHES[0]);
