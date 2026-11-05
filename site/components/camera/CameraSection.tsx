"use client";

import dynamic from "next/dynamic";
import { useInView, useMedia } from "../store/useView";

const CameraViewer = dynamic(() => import("./CameraViewer"), { ssr: false });

const FEATURES = [
  { title: "Sound and video in one device", text: "Records the floor's conversations and what customers do, on one clock. No badge to charge or hand out." },
  { title: "Every report you have today", text: "Sales coaching, complaints checked against the recording, and notes for each rep, from the same Meta models." },
  { title: "Sees the whole visit", text: "Who walked in, what they picked up, how long they waited, and whether they bought or walked out." },
  { title: "Customer voices off by default", text: "Kept only when the customer agrees, same as the badge." },
];

/** What comes after the badge: one store camera that hears and sees, shown in 3D next to what it will do. */
export function CameraSection() {
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <section className="section badge-section" id="camera" aria-labelledby="camera-title">
      <header className="container camera-head">
        <h2 className="h2">Future aspiration</h2>
      </header>
      <div className="container badge-grid">
        <div className="badge-showcase" ref={ref}>
          <div className="badge-showcase-stage">
            <CameraViewer active={inView} still={reduced} />
          </div>
          <span className="hero-device-hint">Drag to turn</span>
        </div>
        <div className="badge-info">
          <span className="eyebrow">SaySo camera</span>
          <h3 className="h2" id="camera-title">One camera that hears and sees the whole floor.</h3>
          <p className="lead">The next SaySo device records audio and video together, so a store gets every report without a badge on each rep.</p>
          <ul className="camera-features">
            {FEATURES.map((f) => (
              <li key={f.title}><b>{f.title}</b><span>{f.text}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
