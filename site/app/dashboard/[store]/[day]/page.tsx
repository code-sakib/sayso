import Link from "next/link";
import { notFound } from "next/navigation";
import { branchById } from "@/components/store/branches";
import { reportFor, weekFor } from "@/components/dashboard/reports";
import { dayLabel, neighbours } from "@/components/dashboard/reports/week";
import { StatTiles } from "@/components/dashboard/StatTiles";
import { MomentCard } from "@/components/dashboard/MomentCard";
import { DisputeCard } from "@/components/dashboard/DisputeCard";
import { RepNotes } from "@/components/dashboard/RepNotes";
import { ArrowLeft } from "@/components/Icons";
import { mergeDays, savedReport, savedReports } from "@/engine/storage/reports";
import { latestRun } from "@/engine/storage/trace";
import { badgeRecordings } from "@/engine/storage/badgeAudio";
import { ModelPipeline } from "@/components/dashboard/dev/ModelPipeline";
import { DevDetails } from "@/components/dashboard/dev/DevDetails";
import { RerunButton } from "@/components/dashboard/dev/RerunButton";
import { DownloadReport } from "@/components/dashboard/DownloadReport";

// Reports written by the engine appear without a rebuild
export const dynamic = "force-dynamic";

/** One day's report for one store. */
export default async function DayReportPage({ params, searchParams }: { params: Promise<{ store: string; day: string }>; searchParams: Promise<{ view?: string }> }) {
  const { store, day } = await params;
  const isDev = (await searchParams).view === "inspect";
  const run = await latestRun(store, day);
  const recordings = run && isDev ? await badgeRecordings(store, day) : [];
  const isAudioOnly = run !== null && !run.entry.video && run.entry.videoStartsAt === "";
  const branch = branchById(store);
  const report = (await savedReport(store, day)) ?? reportFor(store, day);
  if (!branch || !report) notFound();
  const { weekday, short } = dayLabel(report.date);
  const { older, newer } = neighbours(mergeDays(weekFor(store) ?? [], await savedReports(store)), report.date);
  return (
    <div className="dash-page">
      <Link href={`/dashboard/${store}`} className="dash-back"><ArrowLeft /> This week</Link>
      <header className="dash-page-head">
        <span className="eyebrow">{run?.entry.place ?? branch.street} · {weekday}, {short}</span>
        <h1>{report.headline}</h1>
        {run && (
          <nav className="view-toggle" aria-label="View">
            <Link href={`/dashboard/${store}/${day}?view=inspect`} className={isDev ? "is-on" : undefined} aria-current={isDev}>
              <b>Inspect mode</b><span>Every Meta model call</span>
            </Link>
            <Link href={`/dashboard/${store}/${day}`} className={isDev ? undefined : "is-on"} aria-current={!isDev}>
              <b>Owner view</b><span>The report</span>
            </Link>
          </nav>
        )}
        <p className="lead">{report.summary}</p>
      </header>
      {/* Customer counts come from the camera, so an audio-only visit has none to show */}
      {!isAudioOnly && <StatTiles counts={report} improvements={report.moments.filter((m) => m.kind !== "save").length} />}
      {run && <ModelPipeline entry={run.entry} trace={run.trace} />}
      {run && isDev && isAudioOnly && <RerunButton entry={run.entry} />}

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
      <DownloadReport />

      {run && isDev && <DevDetails store={store} date={day} entry={run.entry} trace={run.trace} recordings={recordings} />}

      <nav className="dash-pager" aria-label="Other days">
        {older ? <Link href={`/dashboard/${store}/${older.date}`} className="btn btn-secondary btn-sm"><ArrowLeft /> {dayLabel(older.date).weekday}</Link> : <span />}
        {newer && <Link href={`/dashboard/${store}/${newer.date}`} className="btn btn-secondary btn-sm">{dayLabel(newer.date).weekday} →</Link>}
      </nav>
      <p className="dash-note">Customer voices are removed on the badge. Quotes are the staff side only; customer turns show what the camera saw.</p>
    </div>
  );
}
