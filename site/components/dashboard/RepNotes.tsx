import { repCardById } from "../store/staff";
import type { RepNote } from "./reports/types";
import { initials } from "./kinds";

/** One line of coaching per rep, sent to their phone the next morning. */
export function RepNotes({ notes }: { notes: RepNote[] }) {
  return (
    <ul className="rep-notes">
      {notes.map((n) => {
        const rep = repCardById(n.repId);
        return (
          <li key={n.repId}>
            <span className="dash-avatar is-soft">{initials(rep?.name ?? n.repId)}</span>
            <span>
              <b>{rep?.name ?? n.repId}</b>
              <span className="muted"> · {rep?.role}</span>
              <p>{n.note}</p>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
