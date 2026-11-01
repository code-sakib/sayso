"use client";

import Link from "next/link";
import { useOwner } from "./stores/ownerStores";

const WHAT = {
  reports: "Reports start the night after the badges' first day in the store.",
  team: "Staff appear here once a badge is assigned to them.",
  badges: "Badges appear here once they are paired with the store.",
};

/** Pages for a store the owner added themselves: nothing recorded yet, or not found at all. */
export function AddedStore({ id, what }: { id: string; what: keyof typeof WHAT }) {
  const { stores } = useOwner();
  const store = stores.find((s) => s.id === id);
  if (!store) {
    return (
      <div className="dash-empty">
        <h1>Store not found</h1>
        <p className="muted">It may have been removed in Settings.</p>
        <Link href="/dashboard/settings" className="btn btn-secondary btn-sm">Open settings</Link>
      </div>
    );
  }
  return (
    <div className="dash-page">
      <header className="dash-page-head">
        <span className="eyebrow">{store.name} · {store.kind}</span>
        <h1>Nothing here yet</h1>
      </header>
      <div className="dash-empty">
        <p>{WHAT[what]}</p>
        <p className="muted">{store.badges} badges ordered for this store.</p>
      </div>
    </div>
  );
}
