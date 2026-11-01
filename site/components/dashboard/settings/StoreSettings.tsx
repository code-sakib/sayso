"use client";

import { useState } from "react";
import { StoreLogo } from "../../store/overlay/StoreLogo";
import { addOwnerStore, removeOwnerStore, restoreDemoStores, useOwner } from "../stores/ownerStores";
import { BADGES_MAX, NAME_MAX, validateStore, type StoreKind } from "../stores/storeList";

const KINDS: StoreKind[] = ["Electronics", "Clothing"];
const DEMO_COUNT = 3;

function AddStoreForm() {
  const { stores } = useOwner();
  const [name, setName] = useState("");
  const [kind, setKind] = useState<StoreKind>("Electronics");
  const [badges, setBadges] = useState("4");
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const input = { name, kind, badges: Number(badges) };
    const problem = validateStore(input, stores);
    setError(problem);
    if (problem) return;
    addOwnerStore(input);
    setName("");
    setBadges("4");
  }

  return (
    <form className="set-add" onSubmit={submit} noValidate>
      <label>
        <span>Store name</span>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Park Ave" maxLength={NAME_MAX} />
      </label>
      <label>
        <span>Type</span>
        <select value={kind} onChange={(e) => setKind(e.target.value as StoreKind)}>
          {KINDS.map((k) => <option key={k}>{k}</option>)}
        </select>
      </label>
      <label className="set-add-badges">
        <span>Badges</span>
        <input type="number" min={1} max={BADGES_MAX} value={badges} onChange={(e) => setBadges(e.target.value)} />
      </label>
      <button className="btn btn-primary btn-sm" type="submit">Add store</button>
      {error && <p className="set-error" role="alert">{error}</p>}
    </form>
  );
}

/** Add or remove the stores this owner runs. */
export function StoreSettings() {
  const { stores } = useOwner();
  const [confirming, setConfirming] = useState<string | null>(null);
  const isMissingDemo = stores.filter((s) => s.isDemo).length < DEMO_COUNT;
  return (
    <section className="set-card">
      <header className="set-card-head">
        <h2>Stores</h2>
        <p className="muted">Add a store when its badges arrive. Removing a store stops its reports.</p>
      </header>
      <ul className="set-stores">
        {stores.map((s) => (
          <li key={s.id}>
            <StoreLogo branch={s} size={32} />
            <span className="set-store-text">
              <b>{s.name}</b>
              <span className="muted">{s.kind} · {s.badges} badges{s.isDemo ? " · sample reports" : " · no reports yet"}</span>
            </span>
            {confirming === s.id ? (
              <span className="set-confirm">
                <button className="btn btn-ghost btn-sm" onClick={() => setConfirming(null)}>Keep</button>
                <button className="btn btn-sm set-danger" onClick={() => { removeOwnerStore(s.id); setConfirming(null); }}>Remove</button>
              </span>
            ) : (
              <button className="btn btn-secondary btn-sm" onClick={() => setConfirming(s.id)}>Remove</button>
            )}
          </li>
        ))}
        {stores.length === 0 && <li className="muted">No stores yet. Add one below.</li>}
      </ul>
      <AddStoreForm />
      {isMissingDemo && (
        <button className="set-link" onClick={restoreDemoStores}>Bring back the demo stores</button>
      )}
    </section>
  );
}
