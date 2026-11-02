"use client";

import { useEffect, useRef } from "react";
import { ClockIcon } from "../Icons";
import { formatTime, from12, parseTime, timeLabel, to12, type Clock } from "./dates";
import { usePopover } from "./usePopover";

/** Height of one wheel row, in px. Matches .ui-wheel-item in CSS. */
const ROW = 34;
/** Wait for a scroll to stop before reading where the wheel landed. */
const SETTLE_MS = 120;

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
const HOURS = range(1, 12);
const SIXTY = range(0, 59);

type WheelProps<T> = { label: string; items: T[]; value: T; show: (v: T) => string; onChange: (v: T) => void };

/** One iOS-style wheel: scrolls with snap, the middle row is the value, arrow keys step it. */
function Wheel<T>({ label, items, value, show, onChange }: WheelProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const index = Math.max(0, items.indexOf(value));

  useEffect(() => {
    const el = ref.current;
    if (el && Math.round(el.scrollTop / ROW) !== index) el.scrollTo({ top: index * ROW });
  }, [index]);

  const onScroll = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const el = ref.current;
      if (!el) return;
      const landed = Math.min(items.length - 1, Math.max(0, Math.round(el.scrollTop / ROW)));
      if (landed !== index) onChange(items[landed]);
    }, SETTLE_MS);
  };

  const step = (by: number) => {
    const next = Math.min(items.length - 1, Math.max(0, index + by));
    ref.current?.scrollTo({ top: next * ROW, behavior: "smooth" });
    onChange(items[next]);
  };

  return (
    <div
      ref={ref}
      className="ui-wheel"
      role="spinbutton"
      tabIndex={0}
      aria-label={label}
      aria-valuetext={show(value)}
      onScroll={onScroll}
      onKeyDown={(e) => {
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          e.preventDefault();
          step(e.key === "ArrowUp" ? -1 : 1);
        }
      }}
    >
      {items.map((item, i) => (
        <button
          key={i}
          type="button"
          tabIndex={-1}
          className={`ui-wheel-item${i === index ? " is-current" : ""}`}
          onClick={() => step(i - index)}
        >
          {show(item)}
        </button>
      ))}
    </div>
  );
}

type Props = { label: string; value: string; onChange: (time: string) => void; withSeconds?: boolean; disabled?: boolean };

const nowClock = (): Clock => {
  const d = new Date();
  return { hour: d.getHours(), minute: d.getMinutes(), second: 0 };
};

/** A time button that opens iOS-style wheels: hour, minute, (second), AM/PM. */
export function TimeField({ label, value, onChange, withSeconds = false, disabled }: Props) {
  const pop = usePopover();
  const clock: Clock = parseTime(value) ?? nowClock();
  const { hour12, isPm } = to12(clock.hour);
  const set = (patch: Partial<Clock>) => onChange(formatTime({ ...clock, ...patch }, withSeconds));
  const two = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="ui-field" ref={pop.rootRef}>
      <span className="ui-label">{label}</span>
      <button
        type="button"
        ref={pop.triggerRef}
        className="ui-control"
        onClick={() => {
          // Opening an empty field shows (and picks) the default time, like iOS
          if (!value) onChange(formatTime(clock, withSeconds));
          pop.toggle();
        }}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={pop.isOpen}
        aria-label={`${label}: ${value ? timeLabel(value, withSeconds) : "not set"}`}
      >
        <span className={value ? undefined : "ui-placeholder"}>{value ? timeLabel(value, withSeconds) : "Pick a time"}</span>
        <ClockIcon />
      </button>
      {pop.isOpen && (
        <div className="ui-pop ui-time" role="dialog" aria-label={`Pick ${label.toLowerCase()}`}>
          <div className="ui-wheels">
            <span className="ui-wheels-band" aria-hidden="true" />
            <Wheel label="Hour" items={HOURS} value={hour12} show={String} onChange={(h) => set({ hour: from12(h, isPm) })} />
            <Wheel label="Minute" items={SIXTY} value={clock.minute} show={two} onChange={(minute) => set({ minute })} />
            {withSeconds && <Wheel label="Second" items={SIXTY} value={clock.second} show={two} onChange={(second) => set({ second })} />}
            <Wheel label="AM or PM" items={[false, true]} value={isPm} show={(pm) => (pm ? "PM" : "AM")} onChange={(pm) => set({ hour: from12(hour12, pm) })} />
          </div>
          <button type="button" className="ui-pop-foot" onClick={() => pop.close()}>Done</button>
        </div>
      )}
    </div>
  );
}
