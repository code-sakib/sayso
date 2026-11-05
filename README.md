# SaySo

**Why did that customer walk out?** SaySo tells Indian store owners, and coaches their salespeople, using Meta's AI models.

A small badge on the salesperson records their side of the conversation. The store's existing CCTV catches the moment a customer waits too long or walks out. Muse Spark joins the two by time and writes a short coaching note:

> *4:12 PM: a customer asked about EMI. Rahul said "wait" and went to another customer. She left at 4:16. Next time say: "Give me one minute, here's the EMI sheet."*

Built solo for the **Meta Global AI Developer Hackathon** (Indie track, theme: *Build for Your World*), 26 Oct – 4 Nov 2026. All work in this repository was created during the hackathon.

## For judges: try it in two minutes

No setup needed. Everything below runs on the live site, on Meta's models.

1. **Open the live site:** https://sakibshaikh1507--sayso.ap-south.modal.run
2. **Read a real report:** go to the field-test day,
   https://sakibshaikh1507--sayso.ap-south.modal.run/dashboard/electronics/2026-11-04.
   It comes from 12 minutes of real badge audio, recorded with consent on a store visit on 4 Nov 2026 (Hindi and English mixed).
   Muse Spark found on its own that the staff kept answering an English-speaking shopper in Hindi. Nothing about the visit is written into the prompt.
3. **Switch to Inspect mode** (the toggle under the title). You see every Meta model call:
   - each 1-minute recording, with a player and its Muse Voice Transcribe output
   - the exact prompt sent to Muse Spark, and its raw reply
   - the time each model took
   The **ⓘ** icon on each step of "How this report was made" explains what that step does.
4. **Run it again, live:** in Inspect mode, press **Run the report again, live**. The same recordings go back through
   Muse Voice Transcribe and Muse Spark (about 2 to 3 minutes). Use the **Include the customer's voice** switch to choose:
   - **Off (the default):** Spark works out which speaker is the shopper, and their lines are dropped from the report.
   - **On:** every voice is kept, as if the customer had agreed.
5. **Download the report** as a PDF with the button under the coaching notes.
6. **The other stores** (Main St, Harbor Blvd, Mission St) are sample data that show a full week. The home page's 3D store plays sample cases.

To run it on your own machine instead, see [Run it yourself](#run-it-yourself).

## How it works

| Step | What happens | Meta model |
|---|---|---|
| 1. Record | The badge (XIAO ESP32-S3 Sense in a 3D-printed case) records 1-minute pieces while its red light is on and uploads each one over Wi-Fi | — |
| 2. Transcribe | Hindi, English and Hinglish speech to text, with a label for each speaker | Muse Voice Transcribe |
| 3. Staff-only | Customer voices are dropped by default. When a rep wears the badge, the voice heard most is theirs and the others are dropped. On the field test, Muse Spark picks out the shopper's lines and the engine removes them. They are kept only if the customer agrees | Muse Spark (speaker labels from step 2) |
| 4. Watch (optional) | If the owner adds their CCTV file: when each customer came in, how long they waited, when they left. Skipped when there is no video, as on the field test | SAM 3.1 |
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
  The 4 Nov field-test recordings live only on the hosted server (they are real voices, so they are not in this repo). Use the live site above for those.
  Add a store visit (a recording, plus camera video if you have it) to run it through the Meta models yourself.
- **Without the badge:** `npm run seed:badges` plays a day of badge uploads (it speaks the lines with
  macOS `say`). Set `SAYSO_BADGE_TOKEN` in `.env.local` first.
- **Tests:** `npm test` and `npm run typecheck`.
- **Hosting (optional):** `modal deploy deploy/modal_app.py` runs the same server on [Modal](https://modal.com).
  It reads `MODEL_API_KEY` and `SAYSO_BADGE_TOKEN` from a Modal secret named `sayso-secrets`.
- **The badge:** flashing steps and wiring are in [`firmware/`](firmware) and [`docs/hardware.md`](docs/hardware.md).
  Copy `firmware/badge/secrets.example.h` to `secrets.h` and fill in your Wi-Fi, server address and badge token.

## Privacy by design

- **Customer voices off by default:** only staff lines reach the report unless the customer agrees. Today the website switch stands in for that consent; next, the rep will press the badge button twice after the customer says yes.
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

**Next:** a SaySo camera that records audio and video in one device, so a store gets every report without a badge on each rep. It is shown at the end of the home page.

Field-test alerts (Telegram messages when a badge starts, uploads and stops) live on the
[`demo/telegram-alerts`](https://github.com/code-sakib/sayso/tree/demo/telegram-alerts) branch. They are a testing tool, kept out of the product on purpose.

## Licence

[MIT](LICENSE)
