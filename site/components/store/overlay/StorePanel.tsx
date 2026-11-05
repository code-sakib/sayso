"use client";

import { useState } from "react";
import { branchById } from "../branches";
import { LIVE_ACTIVITY } from "../people";
import type { StaffProfile } from "../staff";
import { pin } from "../selection";
import { StoreLogo } from "./StoreLogo";
import { useLive } from "./useLive";
import { readCurrentBranchId, teamSummary } from "./storeStats";

type Tab = "staff" | "badges";

const readActivities = () => JSON.stringify([...LIVE_ACTIVITY].map(([id, a]) => [id, a.label ?? ""]));

function Chevron() {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>;
}

function Meter({ value, max, tone = "good" }: { value: number; max: number; tone?: "good" | "warn" | "rec" }) {
  return (
    <span className="ov-meter">
      <span className="ov-battery"><span className={`is-${tone}`} style={{ width: `${Math.round((value / Math.max(1, max)) * 100)}%` }} /></span>
      <span className="mono small">{value}/{max}</span>
    </span>
  );
}

function StaffRows({ team }: { team: StaffProfile[] }) {
  const activities = new Map<string, string>(JSON.parse(useLive(readActivities)));
  return team.map((p) => (
    <button key={p.id} className="ov-line" onClick={() => pin(p.id)}>
      <span className="ov-line-who"><b>{p.name.split(" ")[0]}</b><span>{p.section}</span></span>
      <span className="ov-line-what"><span className={`dot ${p.badge.recording ? "is-info" : "is-idle"}`} />{activities.get(p.id) || "On the floor"}</span>
      <span className={`ov-pill ${p.badge.recording ? "is-good" : ""}`}>{p.badge.recording ? "Recording" : "Paused"}</span>
      <Meter value={p.today.sales} max={p.today.customers} tone={p.today.walkouts > 2 ? "warn" : "good"} />
      <Chevron />
    </button>
  ));
}

function BadgeRows({ team }: { team: StaffProfile[] }) {
  return team.map((p) => {
    const tone = p.badge.battery < 30 ? "rec" : p.badge.battery < 60 ? "warn" : "good";
    return (
      <button key={p.id} className="ov-line" onClick={() => pin(p.id)}>
        <span className="ov-line-who"><b>{p.badge.id}</b><span>{p.name}</span></span>
        <span className="ov-line-what mono">{p.badge.talkTime} talk</span>
        <span className={`ov-pill ${p.badge.recording ? "is-good" : ""}`}>{p.badge.recording ? "Recording" : "Paused"}</span>
        <span className="ov-meter">
          <span className="ov-battery"><span className={`is-${tone}`} style={{ width: `${p.badge.battery}%` }} /></span>
          <span className="mono small">{p.badge.battery}%</span>
        </span>
        <Chevron />
      </button>
    );
  });
}

/** Top-left panel: the team and badges of whichever store the camera is looking at. Rows open when you tap a tab. */
export function StorePanel() {
  const [tab, setTab] = useState<Tab>("staff");
  const [isOpen, setOpen] = useState(false);
  const branch = branchById(useLive(readCurrentBranchId));
  if (!branch) return null;
  const t = teamSummary(branch.id);
  const tabs: [Tab, string, string][] = [
    ["staff", "Staff", String(t.team.length)],
    ["badges", "Badges", `${t.recording}/${t.team.length}`],
  ];
  // Tapping the open tab again closes the rows
  const choose = (id: Tab) => {
    setOpen(!(isOpen && tab === id));
    setTab(id);
  };
  return (
    <div className={`ov-card ov-panel${isOpen ? " is-open" : ""}`}>
      <div className="ov-panel-head">
        <StoreLogo branch={branch} />
        <span className="ov-panel-store"><b>{branch.street}</b><span><span className="dot is-rec live" />{branch.kind} · live</span></span>
      </div>
      <div className="ov-tabs" role="tablist" aria-label="Store data">
        {tabs.map(([id, label, count]) => (
          <button key={id} role="tab" aria-selected={isOpen && tab === id} className={isOpen && tab === id ? "is-on" : undefined} onClick={() => choose(id)}>
            <span className="mono">{count}</span>{label}
          </button>
        ))}
      </div>
      {isOpen && (
        <div className="ov-lines" role="tabpanel">
          {tab === "staff" && <StaffRows team={t.team} />}
          {tab === "badges" && <BadgeRows team={t.team} />}
        </div>
      )}
    </div>
  );
}
