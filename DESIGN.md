# SaySo design language

Borrowed from Yavisa (same author): warm, quiet, minimal. White cards on a warm off-white page, one deep-green accent, small mono labels. Nothing shouts except the red recording dot.

All tokens and components live in [`web/static/sayso.css`](web/static/sayso.css). Open [`web/preview.html`](web/preview.html) to see every piece.

## Colour

The site is **light-only** for now. The dark values below are kept in the CSS for later; they only apply if `<html data-theme="dark">` is set, and no page sets it.

| Token | Light | Dark (later) | Use |
|---|---|---|---|
| `--bg` | `#FAFAF9` | `#0E0F0E` | Page background |
| `--surface` | `#FFFFFF` | `#171917` | Cards, header |
| `--surface-2` | `#F5F5F4` | `#1F221F` | Icon tiles, hover fills |
| `--ink` | `#0A0A0A` | `#F2F2EF` | Headings, body text |
| `--ink-muted` | `#6B7280` | `#9CA3AF` | Secondary text |
| `--ink-faint` | `#9CA3AF` | `#6B7280` | Mono labels, IDs |
| `--border` | `#E5E7EB` | `#2A2E2A` | Card and input borders |
| `--border-soft` | `#F1F1EE` | `#222522` | Dividers, progress track |
| `--primary` | `#1B5E42` | `#3FA57A` | Brand accent: primary buttons, links, selected states |
| `--primary-hover` | `#164D36` | `#4DB98A` | Primary hover |
| `--dark` | `#0F172A` | `#F2F2EF` | Secondary call to action (dark button) |
| `--rec` | `#DC2626` | `#F87171` | **Recording only**: badge LED, "recording" state, walkouts |

Status dots (always with a text label, never colour alone):

| Token | Colour | Meaning in SaySo |
|---|---|---|
| `--good` | `#22C55E` | Good moment, sale made |
| `--warn` | `#E98E41` | Missed moment, long wait |
| `--rec` | `#DC2626` | Walkout, recording |
| `--info` | `#3B82F6` | Neutral event (customer entered) |
| `--idle` | `#9CA3AF` | Not started |

Rule: green is the brand, red is the recorder. Red never decorates; it only means "recording" or "customer lost".

## Type

| Role | Font | Size / weight |
|---|---|---|
| Display (hero) | Inter | 56px / 700, tracking −0.03em, line-height 1.05 |
| H2 | Inter | 36px / 600, tracking −0.02em |
| H3 (card title) | Inter | 17px / 700 |
| Body | Inter | 16px / 400, line-height 1.6 |
| Small | Inter | 13–14px |
| Eyebrow / label | JetBrains Mono | 11–12px / 500, uppercase, tracking 0.14em, `--ink-faint` |
| Numbers, timestamps, IDs | JetBrains Mono | tabular figures |

Hero pattern: a black line, then a second line in `--primary` ("Your customers walk out. / Now you'll know why.").

## Shape and space

| Thing | Value |
|---|---|
| Card radius | 16px |
| Button / input radius | 8px |
| Icon tile radius | 12px |
| Card border | 1px `--border` |
| Card shadow | `0 1px 2px rgba(0,0,0,0.04)` (barely there) |
| Page width | 1100px max, 32px side padding (16px on phones) |
| Spacing scale | 4 · 8 · 12 · 16 · 20 · 24 · 32 · 48 · 64 · 96 |
| Button heights | 36 (sm) · 44 (md) · 52 (lg) |

## Components

| Component | Class | Notes |
|---|---|---|
| Header | `.nav` | White, hairline bottom border, 64px tall, sticky |
| Logo | `.logo` | Round badge mark with a red dot + lowercase "sayso" wordmark |
| Buttons | `.btn` + `.btn-primary` / `.btn-dark` / `.btn-secondary` / `.btn-ghost`, sizes `.btn-sm` / `.btn-lg` | Press scales to 0.98 |
| Pill | `.pill` | Small announcement chip with a dot and a mono version tag |
| Eyebrow | `.eyebrow` | Mono uppercase section label ("HOW IT WORKS") |
| Card | `.card` | The base surface for everything |
| Step card | `.step` | "01 /" mono number + icon tile + title + text |
| Stat card | `.stat` | Label, mono sublabel, big number (from the Yavisa dashboard) |
| Status badge | `.status` + `.is-good` / `.is-warn` / `.is-rec` / `.is-info` | Dot + label |
| Moment row | `.moment` | Timestamp, status, quote, "try instead" line: the core of the coaching report |
| Progress bar | `.progress` | 5px, soft track |
| Upload zone | `.upload` | Dashed border, turns green on hover / drag |
| Choice toggle | `.choice` | Bordered option, green inset bar when selected |
| Input | `.input` | 44px, 8px radius |
| Badge playground | `.badge-sim` | Round badge with a red LED that pulses while recording |

## Motion

Small and calm: cards fade up 20px on scroll, buttons press to 0.98, the recording LED pulses. Everything respects `prefers-reduced-motion`.

## Not a dashboard

The look borrows Yavisa's dashboard (stat cards, status dots, list cards), but every SaySo page reads as a **coaching report**: what happened, why it mattered, what to say next time. No charts-for-the-sake-of-charts.
