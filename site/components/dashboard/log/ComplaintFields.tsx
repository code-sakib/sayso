"use client";

import type { Complaint } from "../../../engine/types";
import { SelectField, type Option } from "../../ui/SelectField";
import { TimeField } from "../../ui/TimeField";

type Member = { id: string; name: string };

const KINDS: Option<Complaint["kind"]>[] = [
  { value: "conduct", label: "How they behaved" },
  { value: "promise", label: "What they promised" },
];

export const blankComplaint = (team: Member[]): Complaint => ({ time: "", repId: team[0]?.id ?? "", kind: "conduct", claim: "" });

/** Complaints the manager heard today, each to be checked against the badge audio. */
export function ComplaintFields({ team, complaints, onChange }: { team: Member[]; complaints: Complaint[]; onChange: (next: Complaint[]) => void }) {
  const set = (i: number, patch: Partial<Complaint>) => onChange(complaints.map((c, j) => (j === i ? { ...c, ...patch } : c)));
  const people = team.map((m) => ({ value: m.id, label: m.name }));
  return (
    <div className="log-complaints">
      {complaints.map((c, i) => (
        <fieldset key={i} className="log-complaint">
          <legend className="sr-only">Complaint {i + 1}</legend>
          <TimeField label="Time" value={c.time} onChange={(time) => set(i, { time })} />
          <SelectField label="About" value={c.repId} options={people} onChange={(repId) => set(i, { repId })} />
          <SelectField label="Type" value={c.kind} options={KINDS} onChange={(kind) => set(i, { kind })} />
          <label className="ui-field log-complaint-claim">
            <span className="ui-label">What the customer said</span>
            <textarea className="ui-textarea" rows={2} value={c.claim} maxLength={600} placeholder="e.g. He told me the warranty was two years." onChange={(e) => set(i, { claim: e.target.value })} />
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
