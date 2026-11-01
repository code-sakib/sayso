import Link from "next/link";
import { notFound } from "next/navigation";
import { BRANCHES, branchById } from "@/components/store/branches";
import { WEEKS, reportFor, weekFor } from "@/components/dashboard/reports";
import { dayLabel, neighbours } from "@/components/dashboard/reports/week";
import { StatTiles } from "@/components/dashboard/StatTiles";
import { MomentCard } from "@/components/dashboard/MomentCard";
import { DisputeCard } from "@/components/dashboard/DisputeCard";
import { RepNotes } from "@/components/dashboard/RepNotes";
import { ArrowLeft } from "@/components/Icons";

export const generateStaticParams = () =>
  BRANCHES.flatMap((b) => WEEKS[b.id].map((d) => ({ store: b.id, day: d.date })));

/** One day's report for one store. */
export default async function DayReportPage({ params }: { params: Promise<{ store: string; day: string }> }) {
  const { store, day } = await params;
  const branch = branchById(store);
  const report = reportFor(store, day);
  if (!branch || !report) notFound();
  const { weekday, short } = dayLabel(report.date);
  const { older, newer } = neighbours(weekFor(store) ?? [], report.date);
  return (
    <div className="dash-page">
      <Link href={`/dashboard/${store}`} className="dash-back"><ArrowLeft /> This week</Link>
      <header className="dash-page-head">
        <span className="eyebrow">{branch.street} · {weekday}, {short}</span>
        <h1>{report.headline}</h1>
        <p className="lead">{report.summary}</p>
      </header>
      <StatTiles counts={report} />

      <div className="day-cols">
        <section className="day-col" aria-labelledby="col-coaching">
          <header className="day-col-head">
            <h2 id="col-coaching">Sales coaching <span className="day-col-count">{report.moments.length}</span></h2>
            <p className="muted">Conversations that won or lost a sale, and what to say next time.</p>
          </header>
          {report.moments.map((m) => <MomentCard key={m.time} moment={m} />)}
        </section>
        <section className="day-col is-disputes" aria-labelledby="col-disputes">
          <header className="day-col-head">
            <h2 id="col-disputes">Complaints checked <span className="day-col-count">{report.disputes.length}</span></h2>
            <p className="muted">When a customer blames a rep, the badge shows what was really said.</p>
          </header>
          {report.disputes.map((d) => <DisputeCard key={d.time} dispute={d} />)}
          {report.disputes.length === 0 && (
            <p className="day-col-empty">No complaints about the team today.</p>
          )}
        </section>
      </div>

      <h2 className="dash-section-title">Coaching notes for the team</h2>
      <RepNotes notes={report.notes} />

      <nav className="dash-pager" aria-label="Other days">
        {older ? <Link href={`/dashboard/${store}/${older.date}`} className="btn btn-secondary btn-sm"><ArrowLeft /> {dayLabel(older.date).weekday}</Link> : <span />}
        {newer && <Link href={`/dashboard/${store}/${newer.date}`} className="btn btn-secondary btn-sm">{dayLabel(newer.date).weekday} →</Link>}
      </nav>
      <p className="dash-note">Customer voices are removed on the badge. Quotes are the staff side only; customer turns show what the camera saw.</p>
    </div>
  );
}
