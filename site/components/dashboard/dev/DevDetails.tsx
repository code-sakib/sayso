import type { BadgeRecording, Entry } from "../../../engine/types";
import type { Trace, TranscribeCall } from "../../../engine/storage/trace";
import { wearerOf } from "../../../engine/timeline/conversations";
import { formatClock } from "../../../engine/timeline/clock";

const seconds = (ms: number) => `${(ms / 1000).toFixed(1)} s`;
const mmss = (ms: number) => `${Math.floor(ms / 60000)}:${String(Math.floor((ms % 60000) / 1000)).padStart(2, "0")}`;

/** The badge file a transcription call was cut from: "SB-01_214457-000.wav" → "SB-01_214457". */
const recordingOf = (call: TranscribeCall) => call.file.replace(/-\d{3}\.wav$/, "");
const nameOf = (r: BadgeRecording) => r.file.split("/").pop()!.replace(/\.\w+$/, "");

function Recording({ store, date, rec, call, wornBy }: { store: string; date: string; rec: BadgeRecording; call?: TranscribeCall; wornBy: "rep" | "shopper" }) {
  const name = nameOf(rec);
  const wearer = call ? wearerOf(call.turns) : null;
  // A field test keeps every voice and lets Muse Spark tell shopper from staff
  const isKept = (speaker?: string) => wornBy === "shopper" || wearer === null || speaker === wearer;
  return (
    <li className="dev-rec">
      <div className="dev-rec-head">
        <b className="mono">{name}.wav</b>
        <span className="muted">{formatClock(rec.startSec)} · {Math.round(rec.durationSec)} s</span>
        {call && <span className="dev-chip">Muse Voice Transcribe · {seconds(call.ms)} · {call.turns.length} lines</span>}
      </div>
      <audio controls preload="metadata" src={`/api/stores/${store}/audio/${date}/${name}`} />
      {call && (
        <ol className="dev-turns">
          {call.turns.map((t, i) => (
            <li key={i} className={isKept(t.speaker) ? "is-kept" : "is-dropped"}>
              <span className="mono dev-turn-at">{mmss(t.startMs)}</span>
              <span className="dev-turn-who">Speaker {t.speaker ?? "?"}{wornBy === "rep" && t.speaker === wearer ? " · wearer" : ""}</span>
              <span className="dev-turn-text">{t.text}</span>
            </li>
          ))}
        </ol>
      )}
    </li>
  );
}

/** Everything under the hood: each recording with its transcript, then Muse Spark's brief and answer. */
export function DevDetails({ store, date, entry, trace, recordings }: { store: string; date: string; entry: Entry; trace: Trace | null; recordings: BadgeRecording[] }) {
  const wornBy = entry.badgeWornBy ?? "rep";
  const calls = new Map((trace?.calls.filter((c): c is TranscribeCall => c.kind === "transcribe") ?? []).map((c) => [recordingOf(c), c]));
  const used = recordings.filter((r) => calls.has(nameOf(r)));
  const report = trace?.calls.find((c) => c.kind === "report");
  return (
    <section className="dev" aria-labelledby="dev-title">
      <h2 id="dev-title" className="dash-section-title">Under the hood</h2>
      <p className="muted">
        Every Meta model call in this run. Muse Voice Transcribe writes each line and labels who spoke it. {wornBy === "shopper"
          ? "On this field test a shopper wore the badge and agreed to be recorded, so every voice goes to Muse Spark, which works out from what was said who is the shopper and who are staff."
          : "The wearer is the voice heard most, so only their lines are kept. Struck-through lines never reach the report."}
      </p>

      <h3 className="dev-h">1 · Badge audio → Muse Voice Transcribe <span className="muted">({used.length} files)</span></h3>
      <ol className="dev-recs">
        {used.map((r) => <Recording key={r.file} store={store} date={date} rec={r} call={calls.get(nameOf(r))} wornBy={wornBy} />)}
      </ol>

      <h3 className="dev-h">2 · Camera video → SAM 3.1</h3>
      <p className="muted">{entry.video || entry.videoStartsAt ? "Customers found in the camera file are listed in the brief below." : "No camera file for this visit, so SAM 3.1 was skipped and the report uses the audio alone."}</p>

      <h3 className="dev-h">3 · Conversations → Muse Spark {report && <span className="dev-chip">{report.model} · {seconds(report.ms)}</span>}</h3>
      {report ? (
        <>
          <details className="dev-block"><summary>The brief Muse Spark received</summary><pre>{report.prompt}</pre></details>
          <details className="dev-block"><summary>Muse Spark&apos;s answer (structured JSON)</summary><pre>{JSON.stringify(report.output, null, 2)}</pre></details>
        </>
      ) : <p className="muted">No report call recorded for this run.</p>}
    </section>
  );
}
