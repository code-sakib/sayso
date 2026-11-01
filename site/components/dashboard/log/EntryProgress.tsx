"use client";

import Link from "next/link";
import type { Entry, StepStatus } from "../../../engine/types";

const DOT: Record<StepStatus, string> = {
  waiting: "is-idle",
  running: "is-info live",
  done: "is-good",
  failed: "is-rec",
  skipped: "is-idle",
};

/** Each engine step as it runs, then a link to the finished report. */
export function EntryProgress({ entry, onRetry }: { entry: Entry; onRetry: () => void }) {
  return (
    <section className="log-card" aria-live="polite">
      <header className="log-card-head">
        <span className="log-step">3</span>
        <div>
          <h2>{entry.status === "done" ? "Report ready" : entry.status === "failed" ? "Processing stopped" : "Processing with Meta AI"}</h2>
          <p className="muted">SAM 3.1 finds customers in the video, Muse Voice Transcribe writes down the reps' words, and Muse Spark puts them together.</p>
        </div>
      </header>
      <ol className="log-steps">
        {entry.steps.map((s) => (
          <li key={s.id} className={`is-${s.status}`}>
            <span className={`dot ${DOT[s.status]}`} />
            <span className="log-steps-label">{s.label}</span>
            {s.detail && <span className="log-steps-detail">{s.detail}</span>}
          </li>
        ))}
      </ol>
      {entry.status === "failed" && (
        <div className="log-failed">
          <p className="log-error" role="alert">{entry.error ?? "Something went wrong."}</p>
          {entry.video && <button className="btn btn-secondary btn-sm" onClick={onRetry}>Try again</button>}
        </div>
      )}
      {entry.status === "done" && (
        <Link href={`/dashboard/${entry.store}/${entry.date}`} className="btn btn-primary">Read the report →</Link>
      )}
    </section>
  );
}
