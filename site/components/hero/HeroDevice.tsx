"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useInView, useMedia } from "../store/useView";

const BadgeViewer = dynamic(() => import("./BadgeViewer"), { ssr: false });

/** The badge in 3D on the right of the hero. Drag to turn it; tap it to start or stop recording. */
export function HeroDevice() {
  const [isRecording, setRecording] = useState(true);
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div className="hero-device" ref={ref}>
      <div className="hero-device-stage">
        <BadgeViewer isRecording={isRecording} onPress={() => setRecording(!isRecording)} active={inView} still={reduced} />
      </div>
      <div className="float-chip a">
        <span className={`dot ${isRecording ? "is-rec" : "is-idle"}`} />
        <span><span className="eyebrow">Badge</span>{isRecording ? "Light on · recording" : "Light off · stopped"}</span>
      </div>
      <div className="float-chip b">
        <span><span className="eyebrow">SaySo badge</span>Ø56 mm · magnet clip</span>
      </div>
      <span className="hero-device-hint">Drag to turn · tap to {isRecording ? "stop" : "record"}</span>
    </div>
  );
}
