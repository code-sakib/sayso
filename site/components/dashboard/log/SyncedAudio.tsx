"use client";

import { useEffect, useState } from "react";
import { formatClock } from "../../../engine/timeline/clock";
import { fetchRecordings, type SyncedRecording } from "./api";

type Member = { id: string; name: string };

const length = (sec: number) => (sec < 60 ? `${Math.round(sec)} s` : `${Math.round(sec / 60)} min`);

/** The badge audio the server already has for the day. Nothing to upload: badges send it over Wi-Fi. */
export function SyncedAudio({ store, date, team, onCount }: { store: string; date: string; team: Member[]; onCount: (n: number) => void }) {
  const [state, setState] = useState<{ list: SyncedRecording[] | null; error: string | null }>({ list: null, error: null });

  useEffect(() => {
    let isCurrent = true;
    setState({ list: null, error: null });
    fetchRecordings(store, date)
      .then((list) => {
        if (!isCurrent) return;
        setState({ list, error: null });
        onCount(list.length);
      })
      .catch((err: Error) => isCurrent && setState({ list: null, error: err.message }));
    return () => { isCurrent = false; };
  }, [store, date, onCount]);

  const name = (id: string) => team.find((m) => m.id === id)?.name ?? id;
  const { list, error } = state;
  return (
    <section className="log-card">
      <header className="log-card-head">
        <span className="log-step">1</span>
        <div>
          <h2>Badge audio</h2>
          <p className="muted">Badges upload over the store Wi-Fi, so this is already here. Only staff voices are kept.</p>
        </div>
      </header>
      {error && <p className="log-error" role="alert">{error}</p>}
      {!error && list === null && <p className="muted log-loading">Checking the server…</p>}
      {list?.length === 0 && (
        <p className="log-empty">No badge audio for this day yet. You can still log the camera file; the report will only cover what the camera saw.</p>
      )}
      {list && list.length > 0 && (
        <ul className="log-audio">
          {list.map((r) => (
            <li key={`${r.badgeId}-${r.startSec}`}>
              <span className="dot is-good" />
              <span className="mono">{r.badgeId}</span>
              <b>{name(r.repId)}</b>
              <span className="muted">from {formatClock(r.startSec)} · {length(r.durationSec)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
