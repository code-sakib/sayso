// Browser calls to the engine's API routes, unwrapped from the { ok, data | error } envelope.

import type { ApiResult, Complaint, Entry } from "../../../engine/types";

export type SyncedRecording = { badgeId: string; repId: string; startSec: number; durationSec: number };
export type NewEntryBody = {
  date: string;
  videoStartsAt: string;
  sales: number;
  complaints: Complaint[];
  window?: { from: string; to: string };
  badgeWornBy?: "rep" | "shopper";
  includeCustomer?: boolean;
  place?: string;
};

async function call<T>(url: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, init);
  } catch {
    throw new Error("Couldn't reach the server. Check your connection.");
  }
  const body = (await res.json().catch(() => null)) as ApiResult<T> | null;
  if (!body) throw new Error(`The server answered ${res.status} with nothing readable.`);
  if (!body.ok) throw new Error(body.error);
  return body.data;
}

export const fetchRecordings = (store: string, date: string) =>
  call<SyncedRecording[]>(`/api/stores/${encodeURIComponent(store)}/recordings?date=${date}`);

export const createEntry = (store: string, body: NewEntryBody) =>
  call<{ id: string }>(`/api/stores/${encodeURIComponent(store)}/entries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

export const fetchEntry = (id: string) => call<Entry>(`/api/entries/${id}`);

export const startProcessing = (id: string) => call<{ id: string }>(`/api/entries/${id}/process`, { method: "POST" });

/** PUT the camera file with upload progress (fetch can't report it). */
export function uploadVideo(id: string, file: File, onProgress: (share: number) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `/api/entries/${id}/video`);
    xhr.setRequestHeader("Content-Type", file.type || "video/mp4");
    xhr.setRequestHeader("X-File-Name", encodeURIComponent(file.name));
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress(e.loaded / e.total);
    xhr.onerror = () => reject(new Error("The upload stopped. Check your connection and try again."));
    xhr.onload = () => {
      try {
        const body = JSON.parse(xhr.responseText) as ApiResult<unknown>;
        return body.ok ? resolve() : reject(new Error(body.error));
      } catch {
        reject(new Error(`The upload failed (${xhr.status}).`));
      }
    };
    xhr.send(file);
  });
}
