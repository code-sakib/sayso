// Pure helpers over a store's week of reports.

import type { DayReport } from "./types";

export type WeekTotals = { customers: number; conversations: number; sales: number; walkouts: number; lostValue: number };

export function weekTotals(days: DayReport[]): WeekTotals {
  return days.reduce<WeekTotals>(
    (t, d) => ({
      customers: t.customers + d.customers,
      conversations: t.conversations + d.conversations,
      sales: t.sales + d.sales,
      walkouts: t.walkouts + d.walkouts,
      lostValue: t.lostValue + d.lostValue,
    }),
    { customers: 0, conversations: 0, sales: 0, walkouts: 0, lostValue: 0 },
  );
}

/** Newest day first, without changing the input. */
export const newestFirst = (days: DayReport[]) => [...days].sort((a, b) => b.date.localeCompare(a.date));

/** The days either side of `date` (older and newer), or null at the ends of the week. */
export function neighbours(days: DayReport[], date: string) {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const i = sorted.findIndex((d) => d.date === date);
  if (i === -1) return { older: null, newer: null };
  return { older: sorted[i - 1] ?? null, newer: sorted[i + 1] ?? null };
}

/** Share of customers who bought, as a whole percentage. */
export const conversion = (d: Pick<DayReport, "customers" | "sales">) =>
  d.customers === 0 ? 0 : Math.round((d.sales / d.customers) * 100);

/** "Friday" and "30 Oct" for an ISO date, fixed to UTC so server and browser agree. */
export function dayLabel(date: string) {
  const d = new Date(`${date}T12:00:00Z`);
  return {
    weekday: d.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" }),
    short: d.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" }),
  };
}
