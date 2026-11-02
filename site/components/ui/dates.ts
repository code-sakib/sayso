// Calendar and clock helpers for the Apple-style fields. Dates are "2026-11-02" and times are
// "18:40" or "18:40:05", the same strings the native inputs used, worked out in UTC so a date never
// shifts with the viewer's time zone.

export type Day = { date: string; day: number; inMonth: boolean };

const pad = (n: number) => String(n).padStart(2, "0");
const iso = (d: Date) => `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
const utc = (date: string) => new Date(`${date}T00:00:00Z`);

/** The 6 weeks shown for a month, Monday first, padded with days from the months either side. */
export function monthGrid(year: number, month: number): Day[] {
  const first = new Date(Date.UTC(year, month, 1));
  const lead = (first.getUTCDay() + 6) % 7;
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(Date.UTC(year, month, 1 - lead + i));
    return { date: iso(d), day: d.getUTCDate(), inMonth: d.getUTCMonth() === month };
  });
}

/** Year and month (0–11) of a date, moved by `by` months. */
export function shiftMonth(year: number, month: number, by: number) {
  const d = new Date(Date.UTC(year, month + by, 1));
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() };
}

/** "2026-11-01" for November 2026 (month is 0–11). */
export const firstOfMonth = (year: number, month: number) => `${year}-${pad(month + 1)}-01`;

export const monthOf = (date: string) => {
  const d = utc(date);
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() };
};

/** The date `by` days away, for arrow-key moves in the calendar. */
export const addDays = (date: string, by: number) => {
  const d = utc(date);
  d.setUTCDate(d.getUTCDate() + by);
  return iso(d);
};

export const monthTitle = (year: number, month: number) =>
  new Date(Date.UTC(year, month, 1)).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

/** "Mon, 2 Nov 2026". */
export const dateLabel = (date: string) =>
  utc(date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export type Clock = { hour: number; minute: number; second: number };

export function parseTime(text: string): Clock | null {
  const m = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(text);
  if (!m) return null;
  const [hour, minute, second] = [Number(m[1]), Number(m[2]), Number(m[3] ?? 0)];
  return hour < 24 && minute < 60 && second < 60 ? { hour, minute, second } : null;
}

/** Back to "18:40" or "18:40:05". */
export const formatTime = (c: Clock, withSeconds: boolean) =>
  `${pad(c.hour)}:${pad(c.minute)}${withSeconds ? `:${pad(c.second)}` : ""}`;

/** 12-hour parts, as the wheels show them. */
export const to12 = (hour: number) => ({ hour12: hour % 12 === 0 ? 12 : hour % 12, isPm: hour >= 12 });
export const from12 = (hour12: number, isPm: boolean) => (hour12 % 12) + (isPm ? 12 : 0);

/** "6:40 PM" or "6:40:05 PM". */
export function timeLabel(text: string, withSeconds: boolean): string {
  const c = parseTime(text);
  if (!c) return "";
  const { hour12, isPm } = to12(c.hour);
  return `${hour12}:${pad(c.minute)}${withSeconds ? `:${pad(c.second)}` : ""} ${isPm ? "PM" : "AM"}`;
}
