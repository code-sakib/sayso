"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useInView, useMedia } from "../store/useView";
import { BADGE_FEATURES, BADGE_SPECS } from "./badgeSpecs";

const BadgeViewer = dynamic(() => import("../hero/BadgeViewer"), { ssr: false });

/** The badge up close: turning in 3D next to its size, battery and what it does. */
export function BadgeSection() {
  const [isRecording, setRecording] = useState(true);
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <section className="section badge-section" id="badge" aria-labelledby="badge-title">
      <div className="container badge-grid">
        <div className="badge-showcase" ref={ref}>
          <div className="badge-showcase-stage">
            <BadgeViewer isRecording={isRecording} onPress={() => setRecording(!isRecording)} active={inView} still={reduced} />
          </div>
          <span className="hero-device-hint">Drag to turn · tap to {isRecording ? "stop" : "record"}</span>
        </div>
        <div className="badge-info">
          <span className="eyebrow">The badge</span>
          <h2 className="h2" id="badge-title">Small enough to forget. Clear about when it listens.</h2>
          <p className="lead">It clips on with a magnet, records only the person wearing it, and hands over the day after closing.</p>
          <dl className="badge-specs">
            {BADGE_SPECS.map((s) => (
              <div key={s.label} className="badge-spec">
                <dt className="eyebrow">{s.label}</dt>
                <dd>
                  <b className="mono">{s.value}</b>
                  <span>{s.detail}</span>
                </dd>
              </div>
            ))}
          </dl>
          <ul className="badge-features">
            {BADGE_FEATURES.map((f) => (
              <li key={f.title}>
                <b>{f.title}</b>
                <span>{f.text}</span>
              </li>
            ))}
          </ul>
          <p className="badge-note">Prototype targets. Final numbers may change.</p>
        </div>
      </div>
    </section>
  );
}
