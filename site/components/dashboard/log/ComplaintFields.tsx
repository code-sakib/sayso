"use client";

import type { Complaint } from "../../../engine/types";

type Member = { id: string; name: string };

export const blankComplaint = (team: Member[]): Complaint => ({ time: "", repId: team[0]?.id ?? "", kind: "conduct", claim: "" });

/** Complaints the manager heard today, each to be checked against the badge audio. */
export function ComplaintFields({ team, complaints, onChange }: { team: Member[]; complaints: Complaint[]; onChange: (next: Complaint[]) => void }) {
  const set = (i: number, patch: Partial<Complaint>) => onChange(complaints.map((c, j) => (j === i ? { ...c, ...patch } : c)));
  return (
    <div className="log-complaints">
      {complaints.map((c, i) => (
        <fieldset key={i} className="log-complaint">
          <legend className="sr-only">Complaint {i + 1}</legend>
          <label>
            <span>Time</span>
            <input type="time" value={c.time} onChange={(e) => set(i, { time: e.target.value })} required />
          </label>
          <label>
            <span>About</span>
            <select value={c.repId} onChange={(e) => set(i, { repId: e.target.value })}>
              {team.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </label>
          <label>
            <span>Type</span>
            <select value={c.kind} onChange={(e) => set(i, { kind: e.target.value as Complaint["kind"] })}>
              <option value="conduct">How they behaved</option>
              <option value="promise">What they promised</option>
            </select>
          </label>
          <label className="log-complaint-claim">
            <span>What the customer said</span>
            <textarea rows={2} value={c.claim} maxLength={600} placeholder="e.g. He told me the warranty was two years." onChange={(e) => set(i, { claim: e.target.value })} />
          </label>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => onChange(complaints.filter((_, j) => j !== i))}>Remove</button>
        </fieldset>
      ))}
      <button type="button" className="set-link" onClick={() => onChange([...complaints, blankComplaint(team)])}>
        + Add a complaint
      </button>
    </div>
  );
}
