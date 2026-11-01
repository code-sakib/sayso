// Which demo case is playing, shared between the 3D scene and the HTML overlay.

import { useSyncExternalStore } from "react";

type Playback = {
  id: string | null;
  startedAt: number;
  seq: number;
  arriveAfter: number;
  endsAfter: number;
  /** Set when the case was skipped: the clock stays here so both people keep standing face to face. */
  heldAt: number | null;
};

let state: Playback = { id: null, startedAt: 0, seq: 0, arriveAfter: 0, endsAfter: 0, heldAt: null };
const listeners = new Set<() => void>();

function set(next: Playback) {
  state = next;
  listeners.forEach((l) => l());
}

export const getPlayback = () => state;

/** Starts a case. The 3D customer reports its timings once its route is built (see setTimings). */
export function playCase(id: string) {
  set({ id, startedAt: performance.now(), seq: state.seq + 1, arriveAfter: 0, endsAfter: 0, heldAt: null });
}

export function setTimings(seq: number, arriveAfter: number, endsAfter: number) {
  if (seq !== state.seq) return;
  set({ ...state, arriveAfter, endsAfter });
}

export const stopCase = () => set({ ...state, id: null });

/** Skips to the result and holds the clock at `seconds`, so the people stay where they are then. */
export function holdAt(seconds: number) {
  if (!state.id) return;
  set({ ...state, heldAt: seconds });
}

/** Seconds since the case started. */
export const caseElapsed = () => state.heldAt ?? (performance.now() - state.startedAt) / 1000;

export function usePlayback() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    getPlayback,
    getPlayback,
  );
}
