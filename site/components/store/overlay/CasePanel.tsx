"use client";

import { useEffect, useState } from "react";
import { branchById } from "../branches";
import { profileById } from "../staff";
import { pin, sendCamera } from "../selection";
import { followAnchor } from "../pins";
import { CASES, caseById, lineAt, talkSeconds, type CaseLine, type Speaker, type StoreCase } from "../cases/cases";
import { holdAt, playCase, stopCase } from "../cases/playback";
import { CASE_CUSTOMER_ID } from "../cases/CaseCustomer";
import { useCaseClock } from "../cases/useCaseClock";

/** The two rows of the case picker: coaching the rep, and checking a complaint against the rep. */
const CASE_ROWS = [
  { label: "Coach the rep", cases: CASES.filter((c) => c.outcome !== "complaint") },
  { label: "Check a complaint", cases: CASES.filter((c) => c.outcome === "complaint") },
];

const DOT: Record<StoreCase["outcome"], string> = { walkout: "is-rec", sale: "is-good", complaint: "is-info" };

const DONE_STATUS: Record<StoreCase["outcome"], string> = {
  walkout: "Customer walked out",
  sale: "Customer bought",
  complaint: "Checked against the recording",
};

/** How long the result stays up before the case closes (paused while the pointer is over it). */
const CLOSE_AFTER_MS = 5000;
/** Skipping holds the clock just before the talk ends, so rep and customer stay face to face. */
const HOLD_BEFORE_END = 0.05;

const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/** Closes the case and flies back to the starting view. */
function finish() {
  stopCase();
  sendCamera({ kind: "home" });
}

function start(c: StoreCase) {
  pin(null);
  playCase(c.id);
  sendCamera({ kind: "spot", branch: c.branch, x: (c.customerSpot.x + c.repSpot.x) / 2, z: (c.customerSpot.z + c.repSpot.z) / 2 });
}

/** Which part of the case we are in, from the case clock. */
function phaseOf(elapsed: number, arriveAfter: number, c: StoreCase, isHeld: boolean) {
  if (isHeld) return "done" as const;
  if (arriveAfter === 0 || elapsed < arriveAfter) return "arriving" as const;
  if (elapsed < arriveAfter + talkSeconds(c)) return "talking" as const;
  return "done" as const;
}

function Transcript({ c, talkTime }: { c: StoreCase; talkTime: number }) {
  const names: Record<Speaker, string | undefined> = {
    rep: profileById(c.repId)?.name.split(" ")[0],
    senior: c.senior && profileById(c.senior.id)?.name.split(" ")[0],
    customer: "Customer",
  };
  const current = lineAt(c, talkTime);
  const said = c.lines.filter((l) => talkTime >= l.at);
  if (said.length === 0) return <p className="case-wait">The badge is listening…</p>;
  return (
    <ol className="case-lines">
      {said.map((l: CaseLine) => (
        <li key={l.at} className={`is-${l.who}${l === current ? " is-now" : ""}`}>
          <span className="case-who">{names[l.who]}</span>
          {l.who === "customer" ? <span className="case-removed">Voice removed on the badge</span> : <span>{l.text}</span>}
        </li>
      ))}
    </ol>
  );
}

function ComplaintSummary({ c }: { c: StoreCase }) {
  const { summary } = c;
  return (
    <div className="case-summary">
      <div className="case-claim"><span className="who">The complaint</span>{summary.claim}</div>
      <div className="moment-quote"><span className="who">The badge recorded</span>{summary.moment}</div>
      <p>{summary.happened}</p>
      <span className="case-verdict"><span className="dot is-good" />Rep was right</span>
      <div className="try-instead"><b>What happened next:</b> {summary.tryInstead}</div>
      <dl className="case-facts">
        {summary.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>
    </div>
  );
}

function Summary({ c }: { c: StoreCase }) {
  const { summary } = c;
  if (c.outcome === "complaint") return <ComplaintSummary c={c} />;
  return (
    <div className="case-summary">
      <p>{summary.happened}</p>
      <div className="moment-quote"><span className="who">The moment</span>{summary.moment}</div>
      <div className="try-instead"><b>{c.outcome === "sale" ? "Keep doing:" : "Try instead:"}</b> {summary.tryInstead}</div>
      <dl className="case-facts">
        {summary.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>
    </div>
  );
}

function CaseCard({ c, elapsed, arriveAfter, isHeld }: { c: StoreCase; elapsed: number; arriveAfter: number; isHeld: boolean }) {
  const rep = profileById(c.repId);
  const branch = branchById(c.branch);
  const phase = phaseOf(elapsed, arriveAfter, c, isHeld);
  const talkTime = isHeld ? talkSeconds(c) : Math.max(0, elapsed - arriveAfter);
  const [isHovered, setHovered] = useState(false);
  const isDone = phase === "done";

  useEffect(() => {
    if (!isDone || isHovered) return;
    const timer = window.setTimeout(finish, CLOSE_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, [isDone, isHovered]);

  const status = {
    arriving: "Customer walking in",
    talking: `Talking · ${clock(talkTime)}`,
    done: DONE_STATUS[c.outcome],
  }[phase];
  return (
    <div className="ov-card case-card" onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      <div className="case-head">
        <div>
          <span className="eyebrow">{branch?.street} · {c.section}</span>
          <b>{c.title}</b>
        </div>
        <button className="case-close" aria-label="Close case" onClick={finish}>×</button>
      </div>
      <div className="case-status">
        <span className={`dot ${isDone ? DOT[c.outcome] : "is-rec live"}`} />
        {status}
        <span className="case-rep">{rep?.name} · badge {rep?.badge.id}</span>
      </div>
      {phase !== "arriving" && <Transcript c={c} talkTime={talkTime} />}
      {isDone ? (
        <>
          <Summary c={c} />
          <div className="case-actions">
            <button className="btn btn-secondary btn-sm" onClick={() => start(c)}>Replay</button>
            <span className="case-closing">{isHovered ? "Staying open" : "Closing in 5 s"}</span>
          </div>
        </>
      ) : (
        <button className="btn btn-ghost btn-sm case-skip" disabled={arriveAfter === 0} onClick={() => holdAt(arriveAfter + talkSeconds(c) - HOLD_BEFORE_END)}>
          Skip
        </button>
      )}
    </div>
  );
}

/** Speech bubbles over the rep, the customer and any senior rep while they talk. */
function SpeechBubbles({ c, talkTime, isTalking }: { c: StoreCase; talkTime: number; isTalking: boolean }) {
  const line = isTalking ? lineAt(c, talkTime) : undefined;
  return (
    <div className="pin-layer" aria-hidden="true">
      {(c.senior ? (["rep", "senior", "customer"] as const) : (["rep", "customer"] as const)).map((who) => {
        const id = `speech-${who === "rep" ? c.repId : who === "senior" ? c.senior?.id : CASE_CUSTOMER_ID}`;
        const text = line?.who === who ? line.text : null;
        return (
          <div key={who} ref={followAnchor(id)} className={`speech is-${who}${text ? " is-on" : ""}`}>
            {text}
          </div>
        );
      })}
    </div>
  );
}

/** Top right of the store: demo conversations you can play, with what the badge caught. */
export function CasePanel() {
  const { playback, elapsed } = useCaseClock();
  const c = caseById(playback.id);
  const isTalking = c ? phaseOf(elapsed, playback.arriveAfter, c, playback.heldAt !== null) === "talking" : false;
  return (
    <>
      {c && <SpeechBubbles c={c} talkTime={Math.max(0, elapsed - playback.arriveAfter)} isTalking={isTalking} />}
      <div className="ov-cases">
        <nav className="ov-card case-chips" aria-label="Demo cases">
          <span className="eyebrow">Play a case</span>
          {CASE_ROWS.map((row) => (
            <div key={row.label} className="case-row" role="group" aria-label={row.label}>
              <span className="case-row-label">{row.label}</span>
              {row.cases.map((k) => (
                <button key={k.id} className={k.id === playback.id ? "is-on" : undefined} onClick={() => start(k)}>
                  <span className={`dot ${DOT[k.outcome]}`} />
                  {k.title}
                </button>
              ))}
            </div>
          ))}
        </nav>
        {c && <CaseCard key={playback.seq} c={c} elapsed={elapsed} arriveAfter={playback.arriveAfter} isHeld={playback.heldAt !== null} />}
      </div>
    </>
  );
}
