import { BRANCHES, branchById } from "@/components/store/branches";
import { weekFor } from "@/components/dashboard/reports";
import { newestFirst, weekTotals } from "@/components/dashboard/reports/week";
import { DayCard } from "@/components/dashboard/DayCard";
import { StatTiles } from "@/components/dashboard/StatTiles";
import { AddedStore } from "@/components/dashboard/AddedStore";

export const generateStaticParams = () => BRANCHES.map((b) => ({ store: b.id }));

/** A store's week: the totals, then one card per day. */
export default async function StoreWeek({ params }: { params: Promise<{ store: string }> }) {
  const { store } = await params;
  const branch = branchById(store);
  const week = weekFor(store);
  if (!branch || !week) return <AddedStore id={store} what="reports" />;
  const days = newestFirst(week);
  return (
    <div className="dash-page">
      <header className="dash-page-head">
        <span className="eyebrow">{branch.street} · {branch.kind}</span>
        <h1>This week</h1>
        <p className="muted">A report is written after closing every day. Open a day to see what happened.</p>
      </header>
      <StatTiles counts={weekTotals(week)} />
      <h2 className="dash-section-title">Every day</h2>
      <div className="day-grid">
        {days.map((d, i) => <DayCard key={d.date} storeId={store} day={d} isLatest={i === 0} />)}
      </div>
    </div>
  );
}
