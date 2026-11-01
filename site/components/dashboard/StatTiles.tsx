import { money } from "./kinds";
import { conversion } from "./reports/week";

type Counts = { customers: number; conversations: number; sales: number; walkouts: number; lostValue: number };

/** The headline numbers for a day or a week. */
export function StatTiles({ counts }: { counts: Counts }) {
  const tiles = [
    { label: "Customers", value: counts.customers, sub: `${counts.conversations} talked to staff` },
    { label: "Sales", value: counts.sales, sub: `${conversion(counts)}% of customers bought` },
    { label: "Walkouts", value: counts.walkouts, sub: "Left after talking to staff", isBad: counts.walkouts > 0 },
    { label: "Lost to walkouts", value: money(counts.lostValue), sub: "From what they were looking at", isBad: counts.lostValue > 0 },
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
