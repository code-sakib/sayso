"use client";

import { sendCamera } from "../selection";

const ZOOM_STEP = 0.75;

export function ZoomControls() {
  return (
    <div className="ov-zoom" role="group" aria-label="Camera">
      <button onClick={() => sendCamera({ kind: "zoom", factor: ZOOM_STEP })} aria-label="Zoom in">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
      </button>
      <button onClick={() => sendCamera({ kind: "zoom", factor: 1 / ZOOM_STEP })} aria-label="Zoom out">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14" /></svg>
      </button>
      <button onClick={() => sendCamera({ kind: "home" })} aria-label="Back to the Main St store">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11l8-7 8 7v9H4z" /><path d="M10 20v-5h4v5" /></svg>
      </button>
    </div>
  );
}
