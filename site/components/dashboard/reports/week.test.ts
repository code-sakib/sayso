import { test } from "node:test";
import assert from "node:assert/strict";
import { conversion, dayLabel, neighbours, newestFirst, weekTotals } from "./week.ts";
import type { DayReport } from "./types";

const day = (date: string, sales: number, walkouts: number): DayReport => ({
  date, headline: "", summary: "", customers: 10, conversations: 8, sales, walkouts, lostValue: walkouts * 100, moments: [], notes: [],
});

test("adds up the week", () => {
  // Arrange
  const days = [day("2026-10-29", 4, 1), day("2026-10-30", 6, 2)];

  // Act
  const totals = weekTotals(days);

  // Assert
  assert.deepEqual(totals, { customers: 20, conversations: 16, sales: 10, walkouts: 3, lostValue: 300 });
});

test("sorts newest first without changing the input", () => {
  // Arrange
  const days = [day("2026-10-28", 1, 0), day("2026-10-30", 1, 0), day("2026-10-29", 1, 0)];

  // Act
  const sorted = newestFirst(days);

  // Assert
  assert.deepEqual(sorted.map((d) => d.date), ["2026-10-30", "2026-10-29", "2026-10-28"]);
  assert.equal(days[0].date, "2026-10-28");
});

test("finds the days either side, and null at the ends", () => {
  // Arrange
  const days = [day("2026-10-30", 1, 0), day("2026-10-28", 1, 0), day("2026-10-29", 1, 0)];

  // Act
  const middle = neighbours(days, "2026-10-29");
  const last = neighbours(days, "2026-10-30");
  const missing = neighbours(days, "2026-01-01");

  // Assert
  assert.equal(middle.older?.date, "2026-10-28");
  assert.equal(middle.newer?.date, "2026-10-30");
  assert.equal(last.newer, null);
  assert.deepEqual(missing, { older: null, newer: null });
});

test("conversion is a whole percentage and safe on an empty day", () => {
  assert.equal(conversion({ customers: 3, sales: 1 }), 33);
  assert.equal(conversion({ customers: 0, sales: 0 }), 0);
});

test("labels a date by weekday and short date", () => {
  assert.deepEqual(dayLabel("2026-10-30"), { weekday: "Friday", short: "30 Oct" });
});
