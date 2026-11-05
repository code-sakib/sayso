"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Entry } from "../../../engine/types";
import { createEntry, fetchEntry, startProcessing } from "../log/api";
import { EntryProgress } from "../log/EntryProgress";

const POLL_MS = 1500;

/** Runs the same visit through the Meta models again, live, then reloads the report. */
export function RerunButton({ entry }: { entry: Entry }) {
  const router = useRouter();
  const [runId, setRunId] = useState<string | null>(null);
  const [live, setLive] = useState<Entry | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [includeCustomer, setIncludeCustomer] = useState(false);

  async function rerun() {
    setError(null);
    try {
      const { id } = await createEntry(entry.store, {
        date: entry.date, videoStartsAt: "", sales: entry.sales, complaints: entry.complaints,
        window: entry.window, badgeWornBy: entry.badgeWornBy, place: entry.place, includeCustomer,
      });
      await startProcessing(id);
      setRunId(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't start the run.");
    }
  }

  useEffect(() => {
    if (!runId) return;
    let isStopped = false;
    const tick = async () => {
      try {
        const next = await fetchEntry(runId);
        if (isStopped) return;
        setLive(next);
        if (next.status === "done") { router.refresh(); return; }
        if (next.status === "failed") return;
      } catch (err) {
        if (!isStopped) setError(err instanceof Error ? err.message : "Lost track of the run.");
      }
      if (!isStopped) setTimeout(tick, POLL_MS);
    };
    void tick();
    return () => { isStopped = true; };
  }, [runId, router]);

  const isRunning = live !== null && live.status !== "done" && live.status !== "failed";
  return (
    <div className="rerun">
      <div className="rerun-voice">
        <label className="rerun-switch">
          <input type="checkbox" role="switch" checked={includeCustomer} onChange={(e) => setIncludeCustomer(e.target.checked)} disabled={isRunning} />
          <span className="rerun-track" aria-hidden="true" />
          <b>Include the customer&apos;s voice</b>
        </label>
        <p className="muted">
          Off by default: the report only uses what staff said, and the customer&apos;s lines are dropped. A customer&apos;s voice
          is kept only when they agree to it. On the badge, the rep will press the button twice after the customer says yes,
          and those minutes are kept with both sides. On this page the switch stands in for that double press.
        </p>
      </div>
      <button className="btn btn-primary btn-sm" onClick={rerun} disabled={isRunning}>
        {isRunning ? "Running on Meta models…" : "Run the report again, live"}
      </button>
      {error && <p className="log-error" role="alert">{error}</p>}
      {live && <EntryProgress entry={live} onRetry={rerun} />}
    </div>
  );
}
