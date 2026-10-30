"use client";

import { BRANCHES } from "../branches";
import { sendCamera } from "../selection";
import { StoreLogo } from "./StoreLogo";
import { useLive } from "./useLive";
import { readAllInside, readCurrentBranchId, teamSummary } from "./storeStats";

/** Bottom-right list of every store; tap one to fly there. */
export function StoreList() {
  const current = useLive(readCurrentBranchId);
  const inside = useLive(readAllInside).split(",");
  return (
    <nav className="ov-card ov-stores" aria-label="Your stores">
      <span className="eyebrow">Your stores</span>
      {BRANCHES.map((b, i) => {
        const t = teamSummary(b.id);
        return (
          <button
            key={b.id}
            className={`ov-store${b.id === current ? " is-on" : ""}`}
            aria-current={b.id === current}
            onClick={() => sendCamera({ kind: "branch", id: b.id })}
          >
            <StoreLogo branch={b} />
            <span className="ov-store-text">
              <b>{b.street} <span className="muted">· {b.kind}</span></b>
              <span>{inside[i]} inside · {t.recording}/{t.team.length} badges · {t.walkouts} walkouts</span>
            </span>
          </button>
        );
      })}
    </nav>
  );
}
