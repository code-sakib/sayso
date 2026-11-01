import type { RefObject } from "react";
import { waveBars } from "./flowMath";

export const STEPS = [
  { title: "Remove customer voices", model: "SAM Audio" },
  { title: "Write down what the rep said", model: "Muse Voice Transcribe" },
  { title: "Spot walkouts and long waits", model: "SAM 3.1" },
  { title: "Write a coaching note", model: "Muse Spark" },
];

const BARS = waveBars(56);

/**
 * The pipeline the files drop into. useFlowScroll sets --work (0..1), data-step and the step
 * classes as you scroll; the customer lane goes flat once SAM Audio has run.
 */
export function FlowMachine({ boxRef, fileCount }: { boxRef: RefObject<HTMLDivElement | null>; fileCount: number }) {
  return (
    <div className="flow-machine" ref={boxRef} data-step="0">
      <div className="flow-machine-head">
        <span className="flow-machine-light" />
        <b>SaySo pipeline</b>
        <span className="mono">{fileCount} files in</span>
      </div>

      <div className="flow-wave" aria-hidden="true">
        <div className="flow-lane is-staff">
          <span className="flow-lane-label">Staff</span>
          <div className="flow-bars">{BARS.map((b, i) => <i key={i} style={{ "--h": b.staff } as React.CSSProperties} />)}</div>
        </div>
        <div className="flow-lane is-customer">
          <span className="flow-lane-label">Customer <em>removed</em></span>
          <div className="flow-bars">{BARS.map((b, i) => <i key={i} style={{ "--h": b.customer } as React.CSSProperties} />)}</div>
        </div>
        <span className="flow-scan" />
      </div>

      <div className="flow-pipe">
        <span className="flow-track"><span /></span>
        <ol className="flow-steps">
        {STEPS.map((s, i) => (
            <li key={s.title} data-i={i}>
              <span className="flow-step-mark" />
              <b>{s.title}</b>
              <span className="flow-model">{s.model}</span>
            </li>
        ))}
        </ol>
      </div>
    </div>
  );
}
