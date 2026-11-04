# SaySo

**Why did that customer walk out?** SaySo tells Indian store owners, and coaches their salespeople, using Meta's AI models.

A small badge on the salesperson records their side of the conversation. The store's existing CCTV catches the moment a customer waits too long or walks out. Muse Spark joins the two by time and writes a short coaching note:

> *4:12 PM: a customer asked about EMI. Rahul said "wait" and went to another customer. She left at 4:16. Next time say: "Give me one minute, here's the EMI sheet."*

Built solo for the **Meta Global AI Developer Hackathon** (Indie track, theme: *Build for Your World*), 26 Oct – 4 Nov 2026. All work in this repository was created during the hackathon.

## How it works

| Step | What happens | Meta model |
|---|---|---|
| 1. Record | The badge (XIAO ESP32-S3 Sense in a 3D-printed case) records 1-minute pieces while its red light is on and uploads each one over Wi-Fi | — |
| 2. Transcribe | Hindi, English and Hinglish speech to text, with a label for each speaker | Muse Voice Transcribe |
| 3. Staff-only | The badge sits on the salesperson's chest, so the voice heard most is theirs. Every other voice is dropped before anything else sees it | — (uses the speaker labels from step 2) |
| 4. Watch | The store's camera video: when each customer came in, how long they waited, when they left | SAM 3.1 |
| 5. Coach | Lines up what was said with what happened, and writes the coaching report | Muse Spark |

Every model SaySo calls at runtime is a Meta model, through one Meta Model API key. The engine is in
[`site/engine/`](site/engine): [`pipeline.ts`](site/engine/pipeline.ts) runs the steps, and
[`meta/`](site/engine/meta) holds the Meta API calls.

## Run it yourself

You need **Node.js 22+**, **ffmpeg** on your PATH (`brew install ffmpeg` on macOS), and a **Meta Model API key**.

```bash
git clone https://github.com/code-sakib/sayso.git
cd sayso/site
npm ci
cp .env.example .env.local   # then open .env.local and paste your key after MODEL_API_KEY=
npm run dev                  # http://localhost:3100
```

- **Add your Meta key:** put it in `site/.env.local` as `MODEL_API_KEY=...`. That file is git-ignored; never commit it.
- **See it working:** open http://localhost:3100/dashboard. The sample stores have finished coaching reports.
  Add a store visit (a recording, plus camera video if you have it) to run it through the Meta models yourself.
- **Without the badge:** `npm run seed:badges` plays a day of badge uploads (it speaks the lines with
  macOS `say`). Set `SAYSO_BADGE_TOKEN` in `.env.local` first.
- **Tests:** `npm test` and `npm run typecheck`.
- **Hosting (optional):** `modal deploy deploy/modal_app.py` runs the same server on [Modal](https://modal.com).
  It reads `MODEL_API_KEY` and `SAYSO_BADGE_TOKEN` from a Modal secret named `sayso-secrets`.
- **The badge:** flashing steps and wiring are in [`firmware/`](firmware) and [`docs/hardware.md`](docs/hardware.md).
  Copy `firmware/badge/secrets.example.h` to `secrets.h` and fill in your Wi-Fi, server address and badge token.

## Privacy by design

- **Staff-only:** only the salesperson's voice is kept. Customers' voices are dropped before the coaching step.
- **The badge has no camera.** The Sense board's camera module is unplugged; video comes from the store's existing CCTV.
- **A red light shows when it records**, and a sign at the door tells customers.
- **Raw recordings are never committed to this repo.**

## Repository layout

| Folder | Contents |
|---|---|
| `site/` | Website, owner dashboard and the SaySo engine (Next.js) |
| `firmware/` | Badge firmware (Arduino, XIAO ESP32-S3 Sense) |
| `hardware/`, `design/` | Printable badge case and the 3D badge design |
| `deploy/` | Modal hosting |
| `logo/` | Logo files |
| `docs/` | Hackathon rules, hardware notes |
| `research/`, `SaySo-plan.md` | Market, cost and legal research, and the full plan |

## Status

Working end to end: the badge records and uploads over Wi-Fi, and the engine turns a day's audio and video
into a coaching report with Meta's models. It has been field-tested in real stores.

Field-test alerts (Telegram messages when a badge starts, uploads and stops) live on the
[`demo/telegram-alerts`](https://github.com/code-sakib/sayso/tree/demo/telegram-alerts) branch. They are a testing tool, kept out of the product on purpose.

## Licence

[MIT](LICENSE)
