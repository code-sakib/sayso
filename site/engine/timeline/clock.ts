// Store wall-clock time as seconds since midnight. Badge and camera both report local store time,
// so no time zones are involved.

const CLOCK = /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/;

/** "18:42" or "18:42:05" to seconds since midnight, or null if it isn't a clock time. */
export function parseClock(text: string): number | null {
  const m = CLOCK.exec(text.trim());
  if (!m) return null;
  return Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3] ?? 0);
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Seconds since midnight to "18:42". */
export function formatClock(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  return `${pad(Math.floor(s / 3600) % 24)}:${pad(Math.floor((s % 3600) / 60))}`;
}

/** Seconds since midnight to "184205", used in file names. */
export const compactClock = (seconds: number) => {
  const s = Math.max(0, Math.floor(seconds));
  return `${pad(Math.floor(s / 3600) % 24)}${pad(Math.floor((s % 3600) / 60))}${pad(s % 60)}`;
};

/** Seconds into a conversation as "0:14" or "12:03". */
export function formatOffset(seconds: number): string {
  const s = Math.max(0, Math.round(seconds));
  return `${Math.floor(s / 60)}:${pad(s % 60)}`;
}

/** Whole minutes, at least 1, for labels like "6 min". */
export const minutes = (seconds: number) => Math.max(1, Math.round(seconds / 60));
