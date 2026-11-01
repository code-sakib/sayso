import { weekFor } from "../dashboard/reports";
import { newestFirst, dayLabel, conversion } from "../dashboard/reports/week";
import { KIND, money } from "../dashboard/kinds";
import { profileById } from "../store/staff";

/** Pages behind the front one; only their edges show. */
const BACK_PAGES = 3;
const MOMENTS_SHOWN = 2;
const NOTES_SHOWN = 3;

const firstName = (repId: string) => profileById(repId)?.name.split(" ")[0] ?? repId;

/** The finished report, as a stack of printed pages: the front page in full, more pages beneath. */
export function ReportStack({ branchId, street }: { branchId: string; street: string }) {
  const week = weekFor(branchId);
  if (!week) return null;
  const day = newestFirst(week)[0];
  const { weekday, short } = dayLabel(day.date);
  const totalPages = BACK_PAGES + 1;
  return (
    <div className="report-stack" aria-label={`${street} report for ${weekday}`}>
      {Array.from({ length: BACK_PAGES }, (_, i) => (
        <div key={i} className="report-page is-back" style={{ "--i": BACK_PAGES - i } as React.CSSProperties} aria-hidden="true" />
      ))}
      <span className="report-waiting" aria-hidden="true">The report prints here after closing</span>
      <article className="report-page is-front">
        <header className="report-top">
          <span className="eyebrow">Daily report · {street}</span>
          <span className="mono">{weekday} {short}</span>
        </header>
        <h3>{day.headline}</h3>
        <dl className="report-stats">
          <div><dt>Customers</dt><dd>{day.customers}</dd></div>
          <div><dt>Bought</dt><dd>{conversion(day)}%</dd></div>
          <div><dt>Walkouts</dt><dd className="is-bad">{day.walkouts}</dd></div>
          <div><dt>Lost</dt><dd className="is-bad">{money(day.lostValue)}</dd></div>
        </dl>
        <ul className="report-moments">
          {day.moments.slice(0, MOMENTS_SHOWN).map((m) => (
            <li key={m.time}>
              <span className="report-moment-head">
                <span className={`dot ${KIND[m.kind].dot}`} />
                <b>{KIND[m.kind].label}</b>
                <span className="mono">{m.time} · {firstName(m.repId)}</span>
              </span>
              <q>{m.quote}</q>
              <span className="report-try"><b>{m.kind === "save" ? "Keep doing" : "Try instead"}:</b> {m.tryInstead}</span>
            </li>
          ))}
        </ul>
        <div className="report-notes">
          <span className="eyebrow">Notes for the morning huddle</span>
          {day.notes.slice(0, NOTES_SHOWN).map((n) => (
            <p key={n.repId}><b>{firstName(n.repId)}</b> {n.note}</p>
          ))}
        </div>
        <footer className="report-foot">
          <span>Customer voices removed on the badge</span>
          <span className="mono">1 / {totalPages}</span>
        </footer>
      </article>
    </div>
  );
}
