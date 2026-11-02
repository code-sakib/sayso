"use client";

import { useCallback, useEffect, useState } from "react";
import type { Complaint, Entry } from "../../../engine/types";
import { ComplaintFields } from "./ComplaintFields";
import { EntryProgress } from "./EntryProgress";
import { SyncedAudio } from "./SyncedAudio";
import { VideoPreview } from "./VideoPreview";
import { DateField } from "../../ui/DateField";
import { FileField } from "../../ui/FileField";
import { StepperField } from "../../ui/StepperField";
import { TimeField } from "../../ui/TimeField";
import { createEntry, fetchEntry, startProcessing, uploadVideo } from "./api";

type Member = { id: string; name: string };

/** How often the page asks the server how processing is going. */
const POLL_MS = 2000;
const VIDEO_ACCEPT = "video/mp4,video/quicktime,.mp4,.mov";

const pad = (n: number) => String(n).padStart(2, "0");
const localDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const localTime = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

/** A phone stamps the file when recording stops, so the start is that minus the clip's length. */
function guessStart(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    const url = URL.createObjectURL(file);
    const done = (value: string | null) => { URL.revokeObjectURL(url); resolve(value); };
    video.preload = "metadata";
    video.onloadedmetadata = () => done(Number.isFinite(video.duration) ? localTime(new Date(file.lastModified - video.duration * 1000)) : null);
    video.onerror = () => done(null);
    video.src = url;
  });
}

function problemWith(file: File | null, startsAt: string, sales: string, complaints: Complaint[]): string | null {
  if (!file) return "Choose the camera file.";
  if (!startsAt) return "Say what time the camera file starts.";
  if (sales === "" || !Number.isInteger(Number(sales)) || Number(sales) < 0) return "Enter today's sales from the till (0 or more).";
  const bad = complaints.findIndex((c) => !c.time || c.claim.trim().length < 5);
  return bad === -1 ? null : `Complaint ${bad + 1} needs a time and what the customer said.`;
}

type Phase = { name: "form" } | { name: "uploading"; share: number } | { name: "tracking"; entryId: string };

/** Log a day: badge audio is already on the server; the owner adds the camera file, sales and complaints. */
export function LogEntry({ store, storeName, team }: { store: string; storeName: string; team: Member[] }) {
  const [date, setDate] = useState(() => localDate(new Date()));
  const [file, setFile] = useState<File | null>(null);
  const [startsAt, setStartsAt] = useState("");
  const [sales, setSales] = useState("");
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [audioCount, setAudioCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>({ name: "form" });
  const [entry, setEntry] = useState<Entry | null>(null);
  // Bumped on a retry so polling starts again for the same entry
  const [run, setRun] = useState(0);

  const onCount = useCallback((n: number) => setAudioCount(n), []);

  async function pickFile(next: File | null) {
    setFile(next);
    if (next) setStartsAt((await guessStart(next)) ?? "");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const problem = problemWith(file, startsAt, sales, complaints);
    setError(problem);
    if (problem || !file) return;
    try {
      setPhase({ name: "uploading", share: 0 });
      const { id } = await createEntry(store, { date, videoStartsAt: startsAt, sales: Number(sales), complaints });
      await uploadVideo(id, file, (share) => setPhase({ name: "uploading", share }));
      await startProcessing(id);
      setPhase({ name: "tracking", entryId: id });
    } catch (err) {
      setError((err as Error).message);
      setPhase({ name: "form" });
    }
  }

  const trackingId = phase.name === "tracking" ? phase.entryId : null;
  useEffect(() => {
    if (!trackingId) return;
    let isCurrent = true;
    let timer: ReturnType<typeof setTimeout>;
    const poll = async () => {
      try {
        const next = await fetchEntry(trackingId);
        if (!isCurrent) return;
        setEntry(next);
        if (next.status === "processing" || next.status === "draft") timer = setTimeout(poll, POLL_MS);
      } catch (err) {
        if (isCurrent) setError((err as Error).message);
      }
    };
    void poll();
    return () => { isCurrent = false; clearTimeout(timer); };
  }, [trackingId, run]);

  async function retry() {
    if (!trackingId) return;
    setError(null);
    try {
      await startProcessing(trackingId);
      setRun((n) => n + 1);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  const isBusy = phase.name !== "form";
  const today = localDate(new Date());
  const uploadShare = phase.name === "uploading" ? phase.share : phase.name === "tracking" ? 1 : null;
  return (
    <div className="log">
      <SyncedAudio store={store} date={date} team={team} onCount={onCount} />

      <form className="log-card" onSubmit={submit} noValidate aria-disabled={isBusy}>
        <header className="log-card-head">
          <span className="log-step">2</span>
          <div>
            <h2>Camera file and the day's numbers</h2>
            <p className="muted">Export a clip from the store camera or record on a phone. MP4 or MOV, up to 30 minutes.</p>
          </div>
        </header>
        <fieldset className="log-fields" disabled={isBusy}>
          <DateField label="Day" value={date} onChange={setDate} today={today} max={today} />
          <FileField label="Camera file" accept={VIDEO_ACCEPT} file={file} onChange={(f) => void pickFile(f)} hint="MP4 or MOV, or drop it here" progress={uploadShare} />
          <TimeField label="Camera clock at the start" value={startsAt} onChange={setStartsAt} withSeconds />
          <StepperField label="Sales from the till" value={sales} onChange={setSales} placeholder="e.g. 12" />
        </fieldset>
        {file && <VideoPreview file={file} />}
        <div className="log-sub">
          <h3>Complaints today <span className="muted">(optional)</span></h3>
          <p className="muted">If a customer blamed someone on the team, note it here. SaySo checks it against what their badge recorded.</p>
          <fieldset className="log-fields-plain" disabled={isBusy}>
            <ComplaintFields team={team} complaints={complaints} onChange={setComplaints} />
          </fieldset>
        </div>
        {error && <p className="log-error" role="alert">{error}</p>}
        <div className="log-actions">
          <button className="btn btn-primary" type="submit" disabled={isBusy}>
            {phase.name === "uploading" ? `Uploading… ${Math.round(phase.share * 100)}%` : phase.name === "tracking" ? "Uploaded" : "Upload and make the report"}
          </button>
          <span className="muted">{storeName} · {audioCount} badge {audioCount === 1 ? "file" : "files"} ready</span>
        </div>
      </form>

      {entry && <EntryProgress entry={entry} onRetry={() => void retry()} />}
    </div>
  );
}
