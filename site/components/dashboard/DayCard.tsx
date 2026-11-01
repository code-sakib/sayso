import Link from "next/link";
import type { DayReport } from "./reports/types";
import { conversion, dayLabel } from "./reports/week";
import { KIND } from "./kinds";

/** One day of the week: what happened, at a glance. Opens that day's report. */
export function DayCard({ storeId, day, isLatest }: { storeId: string; day: DayReport; isLatest: boolean }) {
  const { weekday, short } = dayLabel(day.date);
  return (
    <Link href={`/dashboard/${storeId}/${day.date}`} className="day-card">
      <div className="day-card-top">
        <span className="day-card-date">
          <b>{weekday}</b>
          <span>{short}</span>
        </span>
        {isLatest && <span className="day-card-tag">Latest</span>}
      </div>
      <p className="day-card-headline">{day.headline}</p>
      <ul className="day-card-moments" aria-label="Moments">
        {day.moments.map((m) => (
          <li key={m.time}>
            <span className={`dot ${KIND[m.kind].dot}`} />
            {KIND[m.kind].label} · {m.time}
          </li>
        ))}
        {day.disputes.map((d) => (
          <li key={`d${d.time}`} className="is-dispute">
            <span className="dot is-info" />
            Complaint · {d.time}
          </li>
        ))}
      </ul>
      <dl className="day-card-stats">
        <div><dt>Sales</dt><dd>{day.sales}</dd></div>
        <div><dt>Walkouts</dt><dd className={day.walkouts > 0 ? "is-bad" : undefined}>{day.walkouts}</dd></div>
        <div><dt>Bought</dt><dd>{conversion(day)}%</dd></div>
      </dl>
      <span className="day-card-open">Read the report →</span>
    </Link>
  );
}
