"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarIcon, ChevronLeft, ChevronRight } from "../Icons";
import { addDays, dateLabel, firstOfMonth, monthGrid, monthOf, monthTitle, shiftMonth } from "./dates";
import { usePopover } from "./usePopover";

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];
const KEY_STEPS: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };

type Props = { label: string; value: string; onChange: (date: string) => void; max?: string; today: string; disabled?: boolean };

/** A date button that opens an iOS-style month calendar. Arrow keys move the day, Enter picks it. */
export function DateField({ label, value, onChange, max, today, disabled }: Props) {
  const pop = usePopover();
  const [view, setView] = useState(() => monthOf(value || today));
  const [focusDate, setFocusDate] = useState(value || today);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pop.isOpen) return;
    setView(monthOf(value || today));
    setFocusDate(value || today);
  }, [pop.isOpen, value, today]);

  useEffect(() => {
    if (pop.isOpen) gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${focusDate}"]`)?.focus({ preventScroll: true });
  }, [pop.isOpen, focusDate, view]);

  const isAllowed = (date: string) => !max || date <= max;
  const pick = (date: string) => {
    if (!isAllowed(date)) return;
    onChange(date);
    pop.close();
  };

  function onGridKey(e: React.KeyboardEvent) {
    const step = KEY_STEPS[e.key];
    if (step === undefined) return;
    e.preventDefault();
    const next = addDays(focusDate, step);
    setFocusDate(next);
    setView(monthOf(next));
  }

  const next = shiftMonth(view.year, view.month, 1);
  const canGoForward = !max || firstOfMonth(next.year, next.month) <= max;
  return (
    <div className="ui-field" ref={pop.rootRef}>
      <span className="ui-label">{label}</span>
      <button type="button" ref={pop.triggerRef} className="ui-control" onClick={pop.toggle} disabled={disabled} aria-haspopup="dialog" aria-expanded={pop.isOpen} aria-label={`${label}: ${value ? dateLabel(value) : "not set"}`}>
        <span>{value ? dateLabel(value) : "Pick a day"}</span>
        <CalendarIcon />
      </button>
      {pop.isOpen && (
        <div className="ui-pop ui-calendar" role="dialog" aria-label={`Pick ${label.toLowerCase()}`}>
          <div className="ui-calendar-head">
            <b>{monthTitle(view.year, view.month)}</b>
            <span>
              <button type="button" className="ui-icon-btn" aria-label="Previous month" onClick={() => setView(shiftMonth(view.year, view.month, -1))}><ChevronLeft /></button>
              <button type="button" className="ui-icon-btn" aria-label="Next month" disabled={!canGoForward} onClick={() => setView(shiftMonth(view.year, view.month, 1))}><ChevronRight /></button>
            </span>
          </div>
          <div className="ui-calendar-grid" ref={gridRef} role="grid" onKeyDown={onGridKey}>
            {WEEKDAYS.map((d, i) => <span key={i} className="ui-weekday" aria-hidden="true">{d}</span>)}
            {monthGrid(view.year, view.month).map((d) => {
              const classes = ["ui-day", !d.inMonth && "is-outside", d.date === value && "is-selected", d.date === today && "is-today"].filter(Boolean).join(" ");
              return (
                <button
                  key={d.date}
                  type="button"
                  data-date={d.date}
                  className={classes}
                  tabIndex={d.date === focusDate ? 0 : -1}
                  disabled={!isAllowed(d.date)}
                  aria-label={dateLabel(d.date)}
                  aria-pressed={d.date === value}
                  onClick={() => pick(d.date)}
                >
                  {d.day}
                </button>
              );
            })}
          </div>
          <button type="button" className="ui-pop-foot" disabled={!isAllowed(today)} onClick={() => pick(today)}>Today</button>
        </div>
      )}
    </div>
  );
}
