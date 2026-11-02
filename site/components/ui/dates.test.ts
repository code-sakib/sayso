import { test } from "node:test";
import assert from "node:assert/strict";
import { addDays, dateLabel, formatTime, from12, monthGrid, parseTime, shiftMonth, timeLabel, to12 } from "./dates.ts";

test("lays out a month as six Monday-first weeks", () => {
  const grid = monthGrid(2026, 10); // November 2026 starts on a Sunday
  assert.equal(grid.length, 42);
  assert.deepEqual(grid[0], { date: "2026-10-26", day: 26, inMonth: false });
  assert.deepEqual(grid[6], { date: "2026-11-01", day: 1, inMonth: true });
  assert.equal(grid.filter((d) => d.inMonth).length, 30);
});

test("moves across months and years", () => {
  assert.deepEqual(shiftMonth(2026, 11, 1), { year: 2027, month: 0 });
  assert.deepEqual(shiftMonth(2026, 0, -1), { year: 2025, month: 11 });
  assert.equal(addDays("2026-02-28", 1), "2026-03-01");
  assert.equal(addDays("2026-03-01", -7), "2026-02-22");
});

test("labels dates like Apple's pickers", () => {
  assert.equal(dateLabel("2026-11-02"), "Mon, 2 Nov 2026");
});

test("reads and writes clock times", () => {
  assert.deepEqual(parseTime("18:40:05"), { hour: 18, minute: 40, second: 5 });
  assert.deepEqual(parseTime("9:05"), { hour: 9, minute: 5, second: 0 });
  assert.equal(parseTime("24:00"), null);
  assert.equal(formatTime({ hour: 6, minute: 5, second: 9 }, true), "06:05:09");
  assert.equal(formatTime({ hour: 6, minute: 5, second: 9 }, false), "06:05");
});

test("converts between 24-hour and 12-hour clocks, midnight and noon included", () => {
  assert.deepEqual(to12(0), { hour12: 12, isPm: false });
  assert.deepEqual(to12(12), { hour12: 12, isPm: true });
  assert.deepEqual(to12(18), { hour12: 6, isPm: true });
  assert.equal(from12(12, false), 0);
  assert.equal(from12(12, true), 12);
  assert.equal(from12(6, true), 18);
  assert.equal(timeLabel("18:40:05", true), "6:40:05 PM");
  assert.equal(timeLabel("00:15", false), "12:15 AM");
});
