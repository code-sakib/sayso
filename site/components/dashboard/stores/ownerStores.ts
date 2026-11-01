"use client";

// The owner's stores and settings, kept in this browser (a demo has no accounts yet).

import { useSyncExternalStore } from "react";
import { BRANCHES } from "../../store/branches";
import { profilesIn } from "../../store/staff";
import { addStore, removeStore, type NewStore, type OwnerStore } from "./storeList";

export type OwnerSettings = {
  reportTime: string;
  sendNotesToStaff: boolean;
  walkoutAlerts: boolean;
};

type OwnerState = { stores: OwnerStore[]; settings: OwnerSettings };

const KEY = "sayso-owner-v1";
export const REPORT_TIMES = ["21:00", "22:00", "23:00", "07:00"] as const;

const DEMO_STORES: OwnerStore[] = BRANCHES.map((b) => ({
  id: b.id, name: b.street, kind: b.kind, badges: profilesIn(b.id).length, accent: b.accent, isDemo: true,
}));

const DEFAULTS: OwnerState = {
  stores: DEMO_STORES,
  settings: { reportTime: "22:00", sendNotesToStaff: true, walkoutAlerts: false },
};

let state: OwnerState | null = null;
const listeners = new Set<() => void>();

function load(): OwnerState {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULTS;
    const saved = JSON.parse(raw) as Partial<OwnerState>;
    return {
      stores: Array.isArray(saved.stores) ? saved.stores : DEFAULTS.stores,
      settings: { ...DEFAULTS.settings, ...saved.settings },
    };
  } catch {
    return DEFAULTS;
  }
}

const current = () => (state ??= load());

function save(next: OwnerState) {
  state = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Private windows can block storage; the change still holds until the page reloads.
  }
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useOwner() {
  return useSyncExternalStore(subscribe, current, () => DEFAULTS);
}

export const addOwnerStore = (input: NewStore) => save({ ...current(), stores: addStore(current().stores, input) });
export const removeOwnerStore = (id: string) => save({ ...current(), stores: removeStore(current().stores, id) });
export const restoreDemoStores = () =>
  save({ ...current(), stores: [...DEMO_STORES, ...current().stores.filter((s) => !s.isDemo)] });
export const updateSettings = (patch: Partial<OwnerSettings>) =>
  save({ ...current(), settings: { ...current().settings, ...patch } });
