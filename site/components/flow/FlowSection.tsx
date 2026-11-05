"use client";

import { useMemo, useRef } from "react";
import { branchById } from "../store/branches";
import { useLive } from "../store/overlay/useLive";
import { readCurrentBranchId } from "../store/overlay/storeStats";
import { useMedia } from "../store/useView";
import { HeroBackdrop } from "../store/HeroBackdrop";
import { filesFor, type FlowFile } from "./flowFiles";
import { useFlowScroll } from "./useFlowScroll";
import { FlowMachine, STEPS } from "./FlowMachine";
import { ReportStack } from "./ReportStack";

function FileIcon({ kind }: { kind: FlowFile["kind"] }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {kind === "audio" ? (
        <path d="M3 12h2M7 8v8M11 5v14M15 9v6M19 11v2" />
      ) : (
        <>
          <rect x="3" y="6" width="13" height="12" rx="2" />
          <path d="M16 10l5-3v10l-5-3z" />
        </>
      )}
    </svg>
  );
}

function FileChip({ file }: { file: FlowFile }) {
  return (
    <>
      <span className={`flow-file-icon is-${file.kind}`}><FileIcon kind={file.kind} /></span>
      <span className="flow-file-text"><b>{file.name}</b><span>{file.detail}</span></span>
    </>
  );
}

/**
 * Below the store: as you scroll, every badge and the store camera hand over the day's files,
 * which drop into the processing machine and come out as coaching notes.
 */
export function FlowSection() {
  const branch = branchById(useLive(readCurrentBranchId));
  const branchId = branch?.id ?? "electronics";
  const files = useMemo(() => filesFor(branchId), [branchId]);
  const sources = useMemo(() => files.map((f) => f.from), [files]);
  const isStill = useMedia("(prefers-reduced-motion: reduce)");

  const section = useRef<HTMLElement>(null);
  const fileEls = useRef<(HTMLDivElement | null)[]>([]);
  const slotEls = useRef<(HTMLDivElement | null)[]>([]);
  const machine = useRef<HTMLDivElement>(null);
  useFlowScroll({ section, files: fileEls, slots: slotEls, machine }, sources, STEPS.length, isStill);

  return (
    <section id="flow" className="flow" ref={section} aria-labelledby="flow-title">
      <div className="flow-stage">
        {/* The town carries on below the store */}
        <HeroBackdrop placement="below" />
        <div className="container flow-inner">
          <div className="flow-left">
            <header className="flow-head">
              <span className="eyebrow">After closing · {branch?.street ?? "Main St"}</span>
              <h2 className="h2" id="flow-title">Every badge hands over its day. Your CCTV can join too.</h2>
            </header>
            <div className="flow-slots">
              {files.map((f, i) => (
                <div key={f.key} className="flow-slot" ref={(el) => { slotEls.current[i] = el; }}>
                  <FileChip file={f} />
                </div>
              ))}
            </div>
            <FlowMachine boxRef={machine} fileCount={files.length} />
          </div>
          <div className="flow-right">
            <ReportStack branchId={branchId} street={branch?.street ?? "Main St"} />
          </div>
        </div>
      </div>
      {/* Flying copies of the files (fixed to the screen, moved by useFlowScroll) */}
      <div className="flow-flying" aria-hidden="true">
        {files.map((f, i) => (
          <div key={f.key} className="flow-file" ref={(el) => { fileEls.current[i] = el; }}>
            <FileChip file={f} />
          </div>
        ))}
      </div>
    </section>
  );
}
