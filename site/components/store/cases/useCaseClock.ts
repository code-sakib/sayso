"use client";

import { useEffect, useState } from "react";
import { caseElapsed, usePlayback } from "./playback";

const TICK_MS = 100;

/** Seconds since the playing case started, refreshed ten times a second while one plays. */
export function useCaseClock() {
  const playback = usePlayback();
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (!playback.id) return;
    setElapsed(caseElapsed());
    const timer = window.setInterval(() => setElapsed(caseElapsed()), TICK_MS);
    return () => window.clearInterval(timer);
  }, [playback.id, playback.seq]);
  return { playback, elapsed };
}
