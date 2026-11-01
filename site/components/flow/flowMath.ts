// Scroll timeline for the "files into the machine" section. Pure maths, no imports, so it can be
// unit tested directly. p runs from 0 (section top at the bottom of the screen) to 1 (section end).

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

/** How far the section has been scrolled through. */
export const scrollProgress = (top: number, height: number, viewport: number) => clamp01((viewport - top) / height);

const LIFT_START = 0.04; // files leave the badges and the camera
const LIFT_SPAN = 0.28; // ...and land in their slots as the section reaches the top
const DROP_START = 0.42; // then drop into the machine one after another
const DROP_SPAN = 0.16;
const DROP_STAGGER = 0.022;
export const WORK_START = 0.62; // the machine works through its steps
const WORK_SPAN = 0.28;
export const DONE_AT = 0.9;

/** 0..1 for the flight from badge to slot, and from slot into the machine, for file i. */
export function filePhase(p: number, i: number) {
  return {
    lift: ease(clamp01((p - LIFT_START - i * 0.01) / LIFT_SPAN)),
    drop: ease(clamp01((p - DROP_START - i * DROP_STAGGER) / DROP_SPAN)),
  };
}

/** 0..1 through the machine's work. */
export const workProgress = (p: number) => clamp01((p - WORK_START) / WORK_SPAN);

/** Which step (0-based) the machine is on, or `steps` when every step is done. */
export const activeStep = (p: number, steps: number) => Math.min(steps, Math.floor(workProgress(p) * steps));

/**
 * Bar heights (0.15..1) for the two waveform lanes: staff and customer take turns talking, so
 * when one lane is loud the other is near silent. Deterministic, so server and browser agree.
 */
export function waveBars(count: number) {
  const TURN = 6; // bars per turn of talking
  return Array.from({ length: count }, (_, i) => {
    // Rounded so the server and the browser print the same numbers
    const loud = Math.round((0.35 + 0.65 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6))) * 100) / 100;
    const quiet = 0.15;
    const isStaffTurn = Math.floor(i / TURN) % 2 === 0;
    return { staff: isStaffTurn ? loud : quiet, customer: isStaffTurn ? quiet : loud };
  });
}
