"use client";

import { Building } from "./Building";
import { Person } from "./Person";
import type { Branch as BranchData, BranchId } from "./branches";
import type { Walker } from "./people";
import { Fixtures as ElectronicsFixtures } from "./electronics/fixtures";
import { electronicsPeople } from "./electronics/crowd";
import { FashionFixtures } from "./fashion/Fixtures";
import { FASHION_PEOPLE } from "./fashion/crowd";

const PEOPLE: Record<BranchId, Walker[]> = {
  electronics: electronicsPeople("electronics", { mobiles: "jake", tv: "priya", laptops: "marcus", appliances: "emily", cashier: "daniel" }, 0),
  harbor: electronicsPeople("harbor", { mobiles: "ryan", tv: "hannah", laptops: "arjun", appliances: "kevin", cashier: "jasmine" }, 40),
  fashion: FASHION_PEOPLE,
};

/** One shop: shell, fixtures and everyone inside, placed at its spot in the city. */
export function Branch({ branch }: { branch: BranchData }) {
  return (
    <group position={[branch.x, 0, branch.z]}>
      <Building branch={branch} />
      {branch.kind === "Clothing" ? <FashionFixtures /> : <ElectronicsFixtures branchId={branch.id} />}
      {PEOPLE[branch.id].map((w) => <Person key={w.id} walker={w} />)}
    </group>
  );
}
