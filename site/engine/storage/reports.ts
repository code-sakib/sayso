// Reports the engine wrote, saved under data/reports/<store>/<date>.json. They sit alongside the
// demo week: a saved day replaces a demo day with the same date.

import { readdir } from "node:fs/promises";
import type { DayReport } from "../../components/dashboard/reports/types.ts";
import { dataPath, isSafeName, readJson, writeJson } from "./files.ts";

const DATE = /^\d{4}-\d{2}-\d{2}$/;

export const saveReport = (store: string, report: DayReport) => writeJson(dataPath("reports", store, `${report.date}.json`), report);

export const savedReport = (store: string, date: string) =>
  isSafeName(store) && DATE.test(date) ? readJson<DayReport>(dataPath("reports", store, `${date}.json`)) : Promise.resolve(null);

export async function savedReports(store: string): Promise<DayReport[]> {
  if (!isSafeName(store)) return [];
  let names: string[];
  try {
    names = await readdir(dataPath("reports", store));
  } catch {
    return [];
  }
  const reports = await Promise.all(names.filter((n) => DATE.test(n.replace(/\.json$/, ""))).map((n) => readJson<DayReport>(dataPath("reports", store, n))));
  return reports.filter((r): r is DayReport => r !== null);
}

/** Demo days plus saved days, a saved day winning on the same date. */
export const mergeDays = (demo: DayReport[], saved: DayReport[]) => [
  ...demo.filter((d) => !saved.some((s) => s.date === d.date)),
  ...saved,
];
