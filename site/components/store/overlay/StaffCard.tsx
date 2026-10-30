"use client";

import { useCallback } from "react";
import { LIVE_ACTIVITY } from "../people";
import { branchById } from "../branches";
import { Avatar } from "./Avatar";
import { profileById, type StaffProfile } from "../staff";
import { activeId, pin, useSelection } from "../selection";
import { useLive } from "./useLive";

const STARS = 5;

function Stars({ rating }: { rating: number }) {
  return (
    <span className="ov-stars" aria-label={`${rating} out of ${STARS}`}>
      {Array.from({ length: STARS }, (_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="ov-star">
            <span style={{ width: `${fill * 100}%` }}>★</span>★
          </span>
        );
      })}
    </span>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="ov-row">
      <span className="muted">{label}</span>
      <span>{children}</span>
    </div>
  );
}

function Body({ p, isPinned }: { p: StaffProfile; isPinned: boolean }) {
  const readActivity = useCallback(() => LIVE_ACTIVITY.get(p.id), [p.id]);
  const activity = useLive(readActivity);
  const conversion = Math.round((p.today.sales / Math.max(1, p.today.customers)) * 100);
  const branch = branchById(p.branch);
  const batteryClass = p.badge.battery < 30 ? "is-rec" : p.badge.battery < 60 ? "is-warn" : "is-good";

  return (
    <>
      <div className="ov-head">
        <Avatar look={p.look} glasses={p.glasses} beard={p.beard} tint={`${branch?.accent ?? "#1B5E42"}22`} />
        <div className="ov-who">
          <strong>{p.name}</strong>
          <span className="small muted">{p.role} · {p.section}</span>
          <span className="eyebrow ov-kicker">{branch ? `${branch.street} · ${branch.kind}` : "Staff"}</span>
        </div>
        {isPinned && (
          <button className="ov-close" onClick={() => pin(null)} aria-label="Close profile">×</button>
        )}
      </div>

      <div className="ov-now">
        {p.badge.recording
          ? <span className="status is-rec"><span className="dot is-rec live" />Recording</span>
          : <span className="status"><span className="dot is-idle" />Badge paused</span>}
        <span className="small muted">{activity?.label ?? "On the floor"}</span>
      </div>

      <div className="ov-rating">
        <Stars rating={p.rating} />
        <span className="mono">{p.rating.toFixed(1)}</span>
        <span className="small muted">coaching score</span>
      </div>

      <div className="ov-trio">
        <div><span className="mono ov-num">{p.today.customers}</span><span className="ov-label">Customers</span></div>
        <div><span className="mono ov-num">{conversion}%</span><span className="ov-label">Bought</span></div>
        <div><span className={`mono ov-num${p.today.walkouts > 2 ? " is-bad" : ""}`}>{p.today.walkouts}</span><span className="ov-label">Walkouts</span></div>
      </div>

      <div className="ov-rows">
        <Row label="Badge">{p.badge.id}</Row>
        <Row label="Battery">
          <span className="ov-battery"><span className={batteryClass} style={{ width: `${p.badge.battery}%` }} /></span>
          <span className="mono">{p.badge.battery}%</span>
        </Row>
        <Row label="Talk time today"><span className="mono">{p.badge.talkTime}</span></Row>
        <Row label="Speaks">{p.languages.join(" · ")}</Row>
      </div>

      <div className="try-instead"><b>Coaching:</b> {p.coaching}</div>
    </>
  );
}

export function StaffCard() {
  const id = useSelection(activeId);
  const isPinned = useSelection((s) => s.pinned !== null);
  const profile = id ? profileById(id) : undefined;
  if (!profile) return null;
  return (
    // A hover-only card lets the mouse pass through, so it never steals the hover that opened it.
    <aside className={`ov-card ov-staff${isPinned ? "" : " is-preview"}`} aria-live="polite">
      <Body p={profile} isPinned={isPinned} />
    </aside>
  );
}
