import { test } from "node:test";
import assert from "node:assert/strict";
import { STAFF_PROFILES } from "../../store/staff.ts";
import { HARBOR_WEEK } from "./harbor.ts";
import { MAIN_ST_WEEK } from "./mainSt.ts";
import { MISSION_ST_WEEK } from "./missionSt.ts";
import type { DayReport } from "./types.ts";

const WEEKS: [string, DayReport[]][] = [
  ["electronics", MAIN_ST_WEEK],
  ["harbor", HARBOR_WEEK],
  ["fashion", MISSION_ST_WEEK],
];

for (const [branch, week] of WEEKS) {
  const team = new Set(STAFF_PROFILES.filter((p) => p.branch === branch).map((p) => p.id));

  test(`every ${branch} moment and complaint names a rep from that store`, () => {
    const repIds = week.flatMap((d) => [...d.moments, ...d.disputes, ...d.notes].map((x) => x.repId));
    for (const id of repIds) assert.ok(team.has(id), `${id} is not on the ${branch} team`);
  });

  test(`every ${branch} moment carries a conversation`, () => {
    for (const m of week.flatMap((d) => d.moments)) assert.ok(m.transcript.length > 0, `${m.title} has no transcript`);
  });

  test(`only ${branch} complaints marked unclear may lack a recording`, () => {
    for (const d of week.flatMap((day) => day.disputes)) {
      assert.equal(d.transcript.length === 0, d.verdict === "unclear", d.title);
    }
  });
}
