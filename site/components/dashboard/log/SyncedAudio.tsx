"use client";

import { useEffect } from "react";
import { fetchRecordings } from "./api";

type Member = { id: string; name: string };

/** The badge audio the server already has for the day. Nothing to upload: badges send it over Wi-Fi. */
export function SyncedAudio({ store, date, onCount }: { store: string; date: string; team: Member[]; onCount: (n: number) => void }) {
  // Still counted so the submit bar can say how many files the report will use
  useEffect(() => {
    let isCurrent = true;
    fetchRecordings(store, date)
      .then((list) => isCurrent && onCount(list.length))
      .catch(() => isCurrent && onCount(0));
    return () => { isCurrent = false; };
  }, [store, date, onCount]);

  return (
    <section className="log-card">
      <header className="log-card-head">
        <span className="log-step">1</span>
        <div>
          <h2>Badge audio</h2>
          <p className="muted">Badges upload over the store Wi-Fi, so there is nothing to add here. The report picks up the day's recordings itself.</p>
        </div>
      </header>
    </section>
  );
}
