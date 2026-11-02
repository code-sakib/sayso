"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, UpDownIcon } from "../Icons";
import { usePopover } from "./usePopover";

export type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = { label: string; value: T; options: Option<T>[]; onChange: (v: T) => void; disabled?: boolean };

/** A macOS-style pop-up button: a menu with a check on the current choice. Arrow keys and Enter work. */
export function SelectField<T extends string>({ label, value, options, onChange, disabled }: Props<T>) {
  const pop = usePopover();
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const current = options.find((o) => o.value === value);

  useEffect(() => {
    if (!pop.isOpen) return;
    setActive(Math.max(0, options.findIndex((o) => o.value === value)));
    listRef.current?.focus({ preventScroll: true });
  }, [pop.isOpen, options, value]);

  const choose = (i: number) => {
    onChange(options[i].value);
    pop.close();
  };

  function onKey(e: React.KeyboardEvent) {
    const moves: Record<string, number> = { ArrowDown: 1, ArrowUp: -1 };
    if (e.key in moves) {
      e.preventDefault();
      setActive((i) => Math.min(options.length - 1, Math.max(0, i + moves[e.key])));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(active);
    } else if (e.key === "Tab") {
      pop.close(false);
    }
  }

  const listId = `${label.replace(/\W+/g, "-").toLowerCase()}-menu`;
  return (
    <div className="ui-field" ref={pop.rootRef}>
      <span className="ui-label">{label}</span>
      <button
        type="button"
        ref={pop.triggerRef}
        className="ui-control"
        onClick={pop.toggle}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            pop.open();
          }
        }}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={pop.isOpen}
        aria-label={`${label}: ${current?.label ?? "not set"}`}
      >
        <span>{current?.label ?? "Choose"}</span>
        <UpDownIcon />
      </button>
      {pop.isOpen && (
        <ul
          ref={listRef}
          id={listId}
          className="ui-pop ui-menu"
          role="listbox"
          tabIndex={-1}
          aria-label={label}
          aria-activedescendant={`${listId}-${active}`}
          onKeyDown={onKey}
        >
          {options.map((o, i) => (
            <li
              key={o.value}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={o.value === value}
              className={i === active ? "is-active" : undefined}
              onPointerEnter={() => setActive(i)}
              onClick={() => choose(i)}
            >
              <span className="ui-menu-check">{o.value === value && <CheckIcon />}</span>
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
