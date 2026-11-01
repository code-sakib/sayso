"use client";

import { useEffect, type RefObject } from "react";
import { DONE_AT, WORK_START, activeStep, filePhase, scrollProgress, workProgress } from "./flowMath";

const ARC = 70; // pixels the files rise before falling into their slots
const FADE_IN = 0.15;

type Rect = { x: number; y: number; w: number };

const center = (el: Element): Rect => {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width };
};

/** Where a file starts: the badge or camera label in the 3D store, if it is on screen. */
function startOf(labelId: string, slot: Rect): Rect {
  const label = document.querySelector<HTMLElement>(`[data-pin="${labelId}"]`);
  if (label && label.style.visibility !== "hidden") {
    const r = label.getBoundingClientRect();
    if (r.bottom > 0 && r.top < window.innerHeight) return { x: r.left + r.width / 2, y: r.top, w: slot.w };
  }
  return { x: slot.x, y: slot.y - window.innerHeight * 0.6, w: slot.w };
}

type Parts = {
  section: RefObject<HTMLElement | null>;
  files: RefObject<(HTMLDivElement | null)[]>;
  slots: RefObject<(HTMLDivElement | null)[]>;
  machine: RefObject<HTMLDivElement | null>;
};

/**
 * Drives the section from the scroll position, writing styles directly (no React renders per
 * frame): files lift off the badges, land in their slots, drop into the machine, which then works.
 */
export function useFlowScroll({ section, files, slots, machine }: Parts, sources: string[], steps: number, isStill: boolean) {
  useEffect(() => {
    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      const sec = section.current;
      const box = machine.current;
      if (!sec || !box) return;
      const r = sec.getBoundingClientRect();
      if (r.top > window.innerHeight * 1.5 || r.bottom < 0) return;
      const p = isStill ? 1 : scrollProgress(r.top, r.height, window.innerHeight);
      const mouth = center(box);
      mouth.y -= box.getBoundingClientRect().height / 2 - 20;

      files.current.forEach((el, i) => {
        const slotEl = slots.current[i];
        if (!el || !slotEl) return;
        const slot = center(slotEl);
        const { lift, drop } = filePhase(p, i);
        const from = startOf(sources[i], slot);
        let x = from.x + (slot.x - from.x) * lift;
        let y = from.y + (slot.y - from.y) * lift - Math.sin(lift * Math.PI) * ARC;
        x += (mouth.x - x) * drop;
        y += (mouth.y - y) * drop;
        const scale = 1 - drop * 0.6;
        el.style.width = `${slot.w}px`;
        el.style.transform = `translate(${x - slot.w / 2}px, ${y - 24}px) scale(${scale})`;
        el.style.opacity = String(p <= 0.03 || drop >= 1 ? 0 : Math.min(1, lift / FADE_IN) * (1 - drop ** 3));
      });

      const step = activeStep(p, steps);
      const isWorking = p >= WORK_START;
      box.style.setProperty("--work", String(workProgress(p)));
      box.dataset.step = String(isWorking ? step : 0);
      box.querySelectorAll("li").forEach((li, i) => {
        li.classList.toggle("is-done", i < step);
        li.classList.toggle("is-now", isWorking && i === step);
      });
      sec.classList.toggle("is-working", isWorking);
      sec.classList.toggle("is-done", p >= DONE_AT);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [section, files, slots, machine, sources, steps, isStill]);
}
