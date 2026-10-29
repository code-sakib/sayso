# SaySo: Full Plan

Everything decided so far: product, hardware, privacy design, market, competitors, costs, pricing, law, risks, Meta model usage, hackathon plan and next steps.

Last updated: 28 Oct 2026 · Builder: Mohd Sakib (solo, Mumbai) · US$1 = ₹86

Detailed sources: `research/reports/SaySo retail market and costs.md` · Business page: https://claude.ai/artifact/DVGgJZgAN16kTQvBjgEZLn · 3D badge: https://claude.ai/artifact/Umxc6zniVN3zJKFJrVXNtY

---

## 1. The idea in one paragraph

SaySo is a small wearable badge for retail salespeople. It listens to how staff talk to customers on the shop floor. Meta AI turns that into a short daily coaching report: what went well, what lost the sale, and what to say next time. The store's existing CCTV (or a phone video) is analysed with SAM 3.1 to catch customers who walked out or waited too long. **Video shows which customer walked out. Audio explains why.** The output is a short coaching report, not a dashboard.

### Why this exists

The idea comes from real visits. At an iPlanet (Apple reseller) store, staff were dismissive ("abhi toh iPhone ka price 1 lakh hogya hai"), and at a Lenskart store the service was rude. Both times the customer walked out and the store owner never found out why. Owners see footfall and sales, but they never hear the conversation in between.

---

## 2. Product versions

| Version | What it is | When |
|---|---|---|
| **v1 (hackathon / pilot)** | Wearable audio badge on each salesperson + store CCTV or phone video uploaded and analysed. Output: coaching report per salesperson and walkout list per day. | Now (demo by 4 Nov 2026) |
| **v2 (future)** | One ceiling camera with a microphone array. Meta SAM Audio separates voices by position; SAM 3.1 tracks people. No badges needed. | After pilots |
| Considered and dropped | Counter devices at each table (4–5 per store) | Far-field audio is unreliable, and salespeople move around |
| Future form factor | Ray-Ban Meta glasses on staff | Mention in the pitch only |

### Privacy modes (new decision)

| Mode | What is kept | Default? |
|---|---|---|
| **Staff-only mode** | Only the salesperson's voice. Customer voice is filtered out and deleted within seconds, never stored or uploaded. | **Yes, the default** |
| Full-conversation mode | Both voices, for stores that collect customer consent | Optional setting |
| Strict mode | Salesperson asks before each conversation | Switch on if regulators require it |

How staff-only mode works:
1. **On the badge:** a loudness (near-field) gate. The wearer is about 20 cm from the mic, the customer about 1 m away, so the wearer is much louder. Keep only loud, close speech.
2. **On the in-store box:** Meta SAM Audio (or a voice-match against a 30-second enrolment sample) isolates the badge wearer and drops every other voice.
3. **Only salesperson audio leaves the store.**

Open question: is coaching still useful without the customer's side? Test with 5 mock conversations, run each both ways through Muse Spark, and compare the reports.

---

## 3. Hardware (badge v1)

| Part | Purpose | Where to buy |
|---|---|---|
| Seeed XIAO ESP32S3 **Sense** | Brain + PDM microphone + microSD slot (camera not used) | Online, from a Pune seller |
| microSD card (8–32 GB) | Stores audio offline; uploads in batches | Lamington Road |
| 3.7 V LiPo **1000 mAh** | Lasts a full shift (500 mAh is marginal) | Lamington Road |
| 6×6 mm push button | Start/stop recording · wired D1 → GND, internal pull-up | Lamington Road |
| Red 5 mm LED + 220 Ω resistor | Privacy light: on while recording · wired D2 | Lamington Road |
| Slide switch (optional) | Hard power off, on the battery + line | Lamington Road |
| 3D-printed round case, 56 mm × 15 mm | Badge body | Local 3D-print shop |
| Magnetic badge back / pin | Attaches to shirt without holes | Lamington Road / online |

Design notes:
- Recording to SD and uploading in batches roughly doubles battery life compared with Wi-Fi left on all day (estimate).
- Estimated current draw is 45–80 mA.
- Cost at scale: ESP32-S3 module $3.44–3.71. Whole badge lands at about **₹2,150–3,450**.
- A production injection mould costs about **$8–15K (₹6.9–12.9 lakh)**. Use 3D-printed or CNC cases until about 1,000 units.
- Video edge box for stores: NVIDIA Jetson Orin Nano ($249 list, ₹30K+ in India).

---

## 4. Market

| Level | Stores | Yearly revenue at ₹19K/store/month |
|---|---|---|
| TAM: all organized stores | ~5,00,000 | Not meaningful, mostly poor fit |
| **SAM: high-ticket chains** | **12,000–20,000** | **₹274–456 crore** |
| SOM: years 1–3 | 300–1,000 | ₹6.8–22.8 crore |

Indian retail overall was about $952B in 2024 and is heading to about $1.6T by 2030. Organized retail is growing faster than the total.

SaySo fits stores where the salesperson's words decide the sale: high ticket, long conversations, several staff.

| Rank | Segment | Example chains (stores) | Why |
|---|---|---|---|
| 1 | **Jewellery** | Titan 824 · Kalyan 524 (+150 planned) · CaratLane ~369 | Biggest tickets, long advice-led sales |
| 2 | **Electronics / Apple partners** | Reliance Digital ~1,100 · Croma 550+ · Aptronix 70 | Avg phone ≈ ₹24K; small chains decide fast |
| 3 | Eyewear | Lenskart ~2,067 · Titan Eye+ 840 | Standard processes, tech-friendly |
| 4 | Car / two-wheeler showrooms | Not counted | Huge ticket, but each dealer is a separate buyer |
| 5 | Premium apparel | Westside 301 | Lower ticket |

Missing data: no independent Indian walk-in conversion rate exists. The only figure, 12–18%, comes from a vendor. The pilot must produce SaySo's own baseline.

---

## 5. Competitors

### In the hackathon
About 1,000 builders are on the Discord. In about 886 substantial posts, nobody records in-store salesperson–customer conversations. The closest projects are a dealership CRM, a shop chat back-office, shelf counting and shelf recognition. Hardware projects are rare.

### In the real market

| Company | What | Where | Price | Overlap |
|---|---|---|---|---|
| **Borentis** | Hinglish in-store audio coaching, scores 0–100, says "video-ready" | India (Gurgaon) | Not published | **Direct threat (audio)** |
| Vera AI | Retail-floor recorder, no cameras | LatAm / Europe | Not published | Audio |
| tolqAI | In-person recording, Arabic | Gulf | $79/user (~₹6,800) | Audio |
| Rilla | In-person sales coaching (~$757M valuation) | US | $199–349/rep | Audio |
| Siro | App-based in-person recording ($50M Series B) | US | $149–249/rep | Audio |
| Wobot.ai | AI checklists on CCTV | India | $40/location (~₹3,400) | Video |
| Agrex.ai | CCTV queue / footfall / theft | India | ₹800–1,200/camera | Video |
| IndoAI | Footfall analytics incl. hardware | India | ₹8–14K/store | Video |
| Staqu | Edge CCTV analytics | India | Not published | Video |
| Convin | Phone-call analytics | India | ~₹3,600–4,300/user | Price anchor |

**SaySo's edge:** nobody joins audio and video. The extra edge from staff-only mode is "we never keep your customers' voices". Borentis's "video-ready" label shows the gap may not stay open for long, so speed matters.

---

## 6. Running cost

Assumptions: a store has 5 badges and 2 cameras. Each badge records 7 h/day for 26 days (182 h). Silence-cutting leaves about 3 h of speech a day (78 h/month).

| Per badge / month | ₹ |
|---|---|
| Speech-to-text (Muse Voice Transcribe, $0.18/h × 78 h) | 1,205 |
| AI analysis (Muse Spark) | 225 |
| Hardware (spread over 24 months) | 125 |
| Storage | 13 |
| **Total** | **≈ 1,570** |

| Per store / month | ₹ | Share |
|---|---|---|
| Speech-to-text | 6,025 | ~66–71% |
| AI analysis | 1,125 | ~12–13% |
| Jetson edge box (over 36 mo) | 600–860 | ~7–10% |
| Badge hardware | 625 | ~7% |
| Internet (if no Wi-Fi) | 0–450 | 0–5% |
| Storage | 65 | <1% |
| **Total** | **≈ 8,450–9,150** | |

Staff-only mode should cut speech-to-text further, because only one voice gets transcribed. Measure this in the pilot.

### Scenarios

| Setup | Cost / store / month | vs ₹19K price |
|---|---|---|
| Lean (own speech-to-text + cheap model) | ₹1,850–3,900 | Very profitable |
| **Default** (silence cut, Meta API, edge video) | **₹8,450–9,150** | ~52–56% margin |
| No silence-cutting | ₹16,900–17,600 | ~10% margin, trap |
| Sarvam speech-to-text | ₹20,000–20,700 | Loss |
| SAM 3.1 on every frame | +₹44,500 | Big loss |

### Cash before first invoice
- Per store: **₹32–47K** (5 badges plus the edge box).
- A 100-store rollout ties up ₹32–47 lakh.
- Indian buyers pay in 60–120 days.
- Not included: charging docks, install visits, lost badges, support, audits.

### Cost levers (ranked)
1. **Cut silence on the badge:** saves ~₹8,400/store.
2. **Self-host speech-to-text** (Omnilingual ASR on a Modal L4 at $0.80/h): saves ~₹5,000–5,800.
3. Transcribe only customer conversations, or staff-only mode: saves ~₹2,000–2,400.
4. Cheaper analysis model: saves ~₹1,000.
5. Keep video on the edge box and run SAM only on walkout clips: avoids ~₹44,500.

Avoid Meta's "contributor" pricing (about 10× cheaper). It lets Meta train on the data, which clashes with DPDP rules and retailer contracts.

---

## 7. Pricing

**₹4,000 per store + ₹3,000 per badge, per month.** A typical 5-badge store pays ₹19,000.

| Store | Badges | Price | Margin today | Margin, lean |
|---|---|---|---|---|
| Eyewear | 3 | ₹13,000 | 54–59% | 78–90% |
| Electronics | 5 | ₹19,000 | 52–56% | 79–90% |
| Jewellery showroom | 10 | ₹34,000 | 50–52% | 81–91% |
| Pilot (50% off) | 5 | ₹9,500 | 4–11% | 59–81% |

| Term | Value |
|---|---|
| Setup fee | ₹10,000 / store (install, dock, signage, training) |
| Pilot | 50% off for 4–8 weeks, 3–10 stores, converting to annual |
| Billing | Annual, prepaid where possible |
| Anchors | Wobot ~₹3,400/store · IndoAI ₹8–14K/store · Convin ~₹3,600–4,300/user · tolqAI ~₹6,800/user |

### The buyer's view
- ₹19K is 25–32% of a 5-person store's frontline salaries (associates earn ₹10–15K a month), so sell **extra sales**, not saved hours.
- Electronics: about **8 extra phone sales a month** (2 a week) pays for SaySo, assuming a 10% retailer margin on a ₹24K phone.
- Jewellery: one ring can cover a month.
- Staff turnover is 66–71% a year, so classroom training keeps walking out the door. Always-on coaching stays.

### Plan
1. Launch on the Meta API for speed.
2. Move speech-to-text in-house once volume justifies it, taking margins from about 50% to 80%+.

---

## 8. Law and privacy (DPDP Act 2023)

### Timeline

| Date | Event |
|---|---|
| 13 Nov 2025 | DPDP Rules notified |
| Now (Oct 2026) | Old SPDI Rules 2011 still apply |
| **~13 May 2027** | Core duties start: notice, consent, security, breach reporting |

### Roles
The retailer is the **Data Fiduciary** (responsible). SaySo is the **Data Processor**.

### How stores handle CCTV today
- Most stores just put up a "You are under CCTV surveillance" sign and take no consent.
- Asking every customer individually isn't practical, so after 2027 the expected route is a detailed entry notice, possibly backed by Section 7(a) "voluntarily provided" data. This is untested.
- Some states require CCTV in certain shops by law.

### Our view on consent
- Asking every customer, call-centre style, isn't practical. The likely end state is a **door notice: "By entering you accept…"**. Call centres already work this way ("this call may be recorded").
- Weak spots of door-notice consent under DPDP: it needs a "clear affirmative action" and has to be "unconditional".
- Staff-only mode largely sidesteps both, because customer voice is never stored.

### Who is recorded

| Who | Basis | What to do |
|---|---|---|
| Staff | Employment purpose (s.7(i)) | HR policy; purpose is coaching, not punishment; no break rooms |
| Customers, audio | Avoided by staff-only mode; consent if full mode is on | Door notice, LED, mute on request |
| Customers, CCTV | Entry notice | Sign naming security **and analytics** (a new purpose), retention period, QR link; blur faces; process in-store |

### Built in from day one
- Red LED while recording, and a staff mute button.
- Customer voice deleted within seconds (staff-only mode).
- Raw salesperson audio deleted 24–72 h after transcription; names, phone numbers and amounts stripped.
- Only events (walkouts, waits) leave the store from video.
- Encryption, access control, access logs kept 1 year+.
- Breach reported to the retailer within hours (the retailer has 72 h).
- Data processing agreement in place; hosting in the Mumbai region.

**Penalties:** up to ₹250 crore for weak security, ₹200 crore for not reporting a breach.

**Before the first paid pilot:** get a one-hour opinion from an Indian privacy lawyer on door-notice consent and on staff-only mode.

---

## 9. Problems and risks

| Risk | Level | What we do |
|---|---|---|
| Customer consent / signage ruled not enough | High → **Medium with staff-only mode** | Staff-only default, legal opinion, measure opt-outs |
| Cost guesses wrong (speech hours, Hinglish accuracy) | High | Measure in the first pilot before quoting prices |
| Borentis, Rilla, Siro | Med-high | Lead with audio + video and "no customer voice kept"; sign one anchor chain fast |
| Slow sales, cash drain (3–9 month cycles) | Med-high | Setup fee, annual prepay, small fast-deciding chains |
| ROI not proven | Medium | Pilot with control stores; publish own numbers |
| Coaching weaker without customer side | Medium | Test 5 mock conversations both ways |
| Staff pushback | Medium | Coaching framing, staff can see their own scores, rewards |
| Battery / Wi-Fi / loud stores | Medium | 1000 mAh cell, SD batching, measure power before ordering a mould |
| Solo builder, 1 week to deadline | High (hackathon) | Cut scope: one badge, one recorded video, one report |

---

## 10. How SaySo uses Meta AI

| Meta offering | What it does in SaySo | Status | Cost |
|---|---|---|---|
| **Muse Voice Transcribe** | Speech-to-text for Hinglish/Hindi with speaker separation | **Using (v1)** | $0.18 / audio-hour |
| **Muse Spark** | Reads transcripts → coaching report (good moments, lost-sale reasons, next-time lines), scores per salesperson | **Using (v1)** | $1.25 / $4.25 per M tokens (standard pricing, **not** contributor) |
| **SAM 3.1** | Tracks customers in CCTV/phone video → walkouts and wait times | **Using (v1)**, only on sampled frames or walkout clips | $0.20 / 1,000 frames |
| **SAM Audio** | Isolates the salesperson's voice and deletes the customer's (staff-only mode) | **Using (v1 demo)**; core of v2 | Self-host on Modal |
| **Omnilingual ASR** | Self-hosted speech-to-text to cut cost by ~80% | **Later** (after pilot volume) | Modal L4 ~$0.80/h |
| Ray-Ban Meta glasses | Future staff form factor | **Pitch only** | — |

| Non-Meta piece | Role |
|---|---|
| Modal (GPU) | Hosts SAM Audio / Omnilingual (workspace `sakibshaikh1507`, $30/month free, spend cap $30) |
| XIAO ESP32S3 Sense | Badge hardware |
| Jetson Orin Nano | In-store video box (pilot stage) |
| Whisper | **Dropped:** use Meta models instead |
| Sarvam | **Dropped:** 2.3× more expensive |

---

## 11. Hackathon

| Item | Detail |
|---|---|
| Event | Meta Global AI Developer Hackathon (Meta + Cerebral Valley) |
| Track | Indie |
| Theme | Build for Your World (Stage 1 is only a pass/fail theme check) |
| Submission | **4 Nov 2026, 9:00 PM ET** |
| Live finals | 9 Nov 2026 |
| Rubric | Impact 30% · Use of Meta AI 25% · Technical depth 20% · Demo 25% |
| Avoid | "Dashboard as main feature" (banned list), so the output is a coaching report |
| Credits | Meta API (INR billing, spend alerts are email-only) · Modal ($30 cap) · Baseten / Fireworks forms |

### Demo script (~2 min)
1. **Story (15 s):** the iPlanet walkout.
2. **Badge on a shirt (10 s):** press the button, the red LED comes on.
3. **Mock sale recorded (30 s).**
4. **Privacy moment (20 s):** play the raw clip, then the clip after SAM Audio has removed the customer's voice.
5. **Video (20 s):** SAM 3.1 marks a customer who waited and walked out.
6. **Report (20 s):** Muse Spark coaching report linking the walkout to what was said.
7. **Numbers (10 s):** "₹1,570 per badge per month, falling to ~₹400; Hinglish test score X/25."

### What makes it stronger
- A Hinglish test set with a reported score (e.g. "21/25 correct").
- Quotes from 2–3 Mumbai store owners or staff, ideally an Apple partner and a jeweller.
- A price quote from a store owner ("I'd pay ₹X").

---

## 12. Next steps

### This week (hackathon)
- [ ] Order parts: XIAO ESP32S3 Sense from Pune; the rest from Lamington Road.
- [ ] Firmware: button start/stop, LED, record to SD, Wi-Fi upload.
- [ ] Loudness gate on the badge (staff-only filter, step 1).
- [ ] Pipeline: upload → SAM Audio (isolate wearer) → Muse Voice Transcribe → Muse Spark report.
- [ ] SAM 3.1 on a short phone video of a mock store (walkout + wait).
- [ ] Hinglish test set (25 clips) and score.
- [ ] Record 5 mock conversations; compare staff-only vs full reports.
- [ ] Talk to 2–3 Mumbai store owners.
- [ ] Print the case and record the demo video.

### After the hackathon
- [ ] One-hour privacy-lawyer opinion.
- [ ] Paid pilot: 4–8 weeks, 3–10 stores, 50% off, small jewellery or Apple-partner chain.
- [ ] Measure three numbers: **speech-hours per badge**, **customer opt-out rate**, **conversion change vs control stores**.
- [ ] Move speech-to-text to self-hosted Omnilingual once volume justifies it.
- [ ] Check Borentis's real price.
