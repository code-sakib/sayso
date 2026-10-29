# SaySo

**Why did that customer walk out?** SaySo tells Indian store owners, and coaches their salespeople, using Meta's AI models.

A small badge on the salesperson records their side of the conversation. The store's existing CCTV catches the moment a customer waits too long or walks out. Muse Spark joins the two by time and writes a short coaching note:

> *4:12 PM: a customer asked about EMI. Rahul said "wait" and went to another customer. She left at 4:16. Next time say: "Give me one minute, here's the EMI sheet."*

Built solo for the **Meta Global AI Developer Hackathon** (Indie track, theme: *Build for Your World*), 26 Oct – 4 Nov 2026. All work in this repository was created during the hackathon.

## How it works

| Step | What happens | Meta model |
|---|---|---|
| 1. Record | Badge (XIAO ESP32-S3 Sense) records audio to microSD while the red light is on | — |
| 2. Staff-only | The customer's voice is removed; only the salesperson's voice is kept | SAM Audio |
| 3. Transcribe | Hindi, English and Hinglish speech to text | Muse Voice Transcribe |
| 4. Watch | Store video: when a customer entered, how long they waited, when they left | SAM 3.1 |
| 5. Coach | Matches what was said to what happened and writes the coaching note | Muse Spark |

## Privacy by design

- **Staff-only mode is the default.** Customer voices are removed before transcription.
- **The badge has no camera.** The Sense board's camera module is unplugged; video comes from the store's existing CCTV.
- **A red light shows when it records**, and a sign at the door tells customers.
- Demo recordings use only mock conversations with people who agreed to be recorded. Raw recordings are never committed to this repo.

## Repository layout

| Folder | Contents |
|---|---|
| `SaySo-plan.md` | Full plan: idea, hardware, market, pricing, law, Meta AI usage, demo script |
| `docs/` | Hackathon rules and notes |
| `design/` | 3D badge design |
| `research/` | India and US market, cost and legal research |
| `firmware/` | Badge firmware *(coming)* |
| `pipeline/` | Audio + video → coaching report *(coming)* |

## Status

Work in progress. Hardware ordered 28 Oct 2026; firmware and pipeline in progress.

## Licence

[MIT](LICENSE)
