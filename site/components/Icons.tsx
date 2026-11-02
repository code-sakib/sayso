const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ArrowRight() {
  return (
    <svg className="icon" viewBox="0 0 24 24" {...stroke}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" {...stroke}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function LinesIcon() {
  return (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M4 5h16M4 12h10M4 19h7" />
    </svg>
  );
}

export function DragIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" {...stroke}>
      <path d="M5 9l-3 3 3 3M19 9l3 3-3 3M2 12h20" />
    </svg>
  );
}

export function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke} strokeWidth={1.8}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" {...stroke}>
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function ArrowLeft() {
  return (
    <svg className="icon" viewBox="0 0 24 24" {...stroke}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke} strokeWidth={1.8}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke} strokeWidth={1.8}>
      <path d="M3 11l9-7 9 7M5 10v10h5v-6h4v6h5V10" />
    </svg>
  );
}

export function TeamIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke} strokeWidth={1.8}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6" />
    </svg>
  );
}

export function BadgeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke} strokeWidth={1.8}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="9" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke} strokeWidth={1.8}>
      <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="10" cy="17" r="2" />
    </svg>
  );
}

export function ChevronLeft() {
  return (
    <svg className="icon" viewBox="0 0 24 24" {...stroke}>
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

export function ChevronRight() {
  return (
    <svg className="icon" viewBox="0 0 24 24" {...stroke}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

/** The small up-and-down chevrons on a macOS pop-up button. */
export function UpDownIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" {...stroke} strokeWidth={2.2}>
      <path d="M8 9l4-4 4 4M8 15l4 4 4-4" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" {...stroke} strokeWidth={2.4}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function FilmIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" {...stroke} strokeWidth={1.8}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M10 9.5v5l4.5-2.5z" />
    </svg>
  );
}
