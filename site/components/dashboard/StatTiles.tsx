import { conversion } from "./reports/week";

type Counts = { customers: number; conversations: number; sales: number; walkouts: number; lostValue: number };

/** The headline numbers for a day or a week. `improvements` counts the coaching moments that were not a win. */
export function StatTiles({ counts, improvements }: { counts: Counts; improvements: number }) {
  const tiles = [
    { label: "Customers", value: counts.customers, sub: `${counts.conversations} talked to staff` },
    { label: "Sales", value: counts.sales, sub: `${conversion(counts)}% of customers bought` },
    { label: "Walkouts", value: counts.walkouts, sub: "Left after talking to staff", isBad: counts.walkouts > 0 },
    { label: "Improvements needed", value: improvements, sub: improvements === 1 ? "Moment to coach in the report" : "Moments to coach in the reports" },
  ];
  return (
    <dl className="dash-stats">
      {tiles.map((t) => (
        <div key={t.label} className="dash-stat">
          <dt>{t.label}</dt>
          <dd className={t.isBad ? "is-bad" : undefined}>{t.value}</dd>
          <span>{t.sub}</span>
        </div>
      ))}
    </dl>
  );
}
