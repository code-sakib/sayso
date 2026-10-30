// Tiny shared state between the 3D scene and the HTML overlay (no extra library needed).

import { useSyncExternalStore } from "react";

/** Where the camera is looking, written by the camera rig each frame and read by the overlay. */
export const CAMERA_FOCUS = { x: 0, z: 0 };

/**
 * The store camera's pose and canvas size, written by the camera rig each frame. The hero backdrop
 * copies it so the hero shows the part of town just above the store view.
 */
export const CAMERA_VIEW = {
  isSet: false,
  position: [0, 0, 0] as [number, number, number],
  quaternion: [0, 0, 0, 1] as [number, number, number, number],
  height: 0,
};

export type CameraCommand =
  | { kind: "zoom"; factor: number }
  | { kind: "home" }
  | { kind: "branch"; id: string };

type State = {
  hovered: string | null;
  /** Clicked person: their card stays open until closed. */
  pinned: string | null;
  command: (CameraCommand & { seq: number }) | null;
};

let state: State = { hovered: null, pinned: null, command: null };
const listeners = new Set<() => void>();

function set(patch: Partial<State>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const getSelection = () => state;

export function useSelection<T>(pick: (s: State) => T): T {
  return useSyncExternalStore(subscribe, () => pick(state), () => pick(state));
}

export const hover = (id: string | null) => set({ hovered: id });
export const pin = (id: string | null) => set({ pinned: id });
export const sendCamera = (command: CameraCommand) => set({ command: { ...command, seq: (state.command?.seq ?? 0) + 1 } });

/** The person whose card is showing: a pinned one wins over a hovered one. */
export const activeId = (s: State) => s.pinned ?? s.hovered;
