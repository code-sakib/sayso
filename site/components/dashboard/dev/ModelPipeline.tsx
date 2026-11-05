import type { Entry, StepId } from "../../../engine/types";
import type { Trace } from "../../../engine/storage/trace";

/** The Meta model behind each engine step; steps with no model run on the server itself. */
const STEP_MODEL: Record<StepId, string | null> = {
  prepare: null,
  transcribe: "Muse Voice Transcribe",
  track: "SAM 3.1",
  timeline: null,
  report: "Muse Spark",
};

/** What each step does, shown behind the info icon. */
const STEP_INFO: Record<StepId, string> = {
  prepare: "The server gathers the day's badge recordings (one WAV per minute, sent over the store Wi-Fi) and keeps only the ones inside the visit's time window.",
  transcribe: "Each minute of badge audio goes to Muse Voice Transcribe. It returns who spoke when (Speaker A, B…) and what they said, in Hindi, English or a mix.",
  track: "When a camera file is logged, the server cuts the video into short clips around each conversation's timestamps from the badge recordings. SAM 3.1 finds and follows each customer through those clips, so the report can say what they did at that moment: picked up a product, waited, went to the till or walked out.",
  timeline: "The server lines everything up on one clock: badge transcripts minute by minute, plus customer movements from the camera when there is one. Lines close together become one conversation.",
  report: "Muse Spark reads the conversations and writes the owner's report: what won or lost a sale, complaints checked against what was really said, and one coaching note per rep. It finds the issues itself; nothing about the visit is fed to it.",
};

const seconds = (ms: number) => `${(ms / 1000).toFixed(1)} s`;

/** How tonight's report was made: each step, the Meta model it used, and what came out. */
export function ModelPipeline({ entry, trace }: { entry: Entry; trace: Trace | null }) {
  const msFor = (kind: "transcribe" | "segment" | "report") =>
    trace?.calls.filter((c) => c.kind === kind).reduce((n, c) => n + c.ms, 0) ?? 0;
  const callsFor = (kind: "transcribe" | "segment" | "report") => trace?.calls.filter((c) => c.kind === kind).length ?? 0;
  const timing: Partial<Record<StepId, string>> = {
    transcribe: callsFor("transcribe") ? `${callsFor("transcribe")} calls · ${seconds(msFor("transcribe"))}` : undefined,
    track: callsFor("segment") ? `${callsFor("segment")} calls · ${seconds(msFor("segment"))}` : undefined,
    report: callsFor("report") ? `${callsFor("report")} call · ${seconds(msFor("report"))}` : undefined,
  };
  return (
    <section className="pipe" aria-labelledby="pipe-title">
      <h2 id="pipe-title" className="pipe-title">How this report was made</h2>
      <ol className="pipe-steps">
        {entry.steps.map((s) => (
          <li key={s.id} className={`pipe-step is-${s.status}`}>
            <span className="pipe-model">{STEP_MODEL[s.id] ? <><span className="pipe-meta">Meta</span> {STEP_MODEL[s.id]}</> : "SaySo server"}</span>
            <details className="pipe-info">
              <summary aria-label={`How this step works: ${s.label}`}>i</summary>
              <p>{STEP_INFO[s.id]}</p>
            </details>
            <span className="pipe-label">{s.label}</span>
            {s.detail && <span className="pipe-detail">{s.detail}</span>}
            {timing[s.id] && <span className="pipe-time mono">{timing[s.id]}</span>}
          </li>
        ))}
      </ol>
    </section>
  );
}
