# SaySo Unit Costs: Cost per Badge and per Store

Exchange rate used throughout: **US$1 = ₹86** (middle of the ₹84–88 range). Prices are as found in 2026 searches (today is 28 Oct 2026). Lines marked **[EST]** are my own arithmetic or assumptions and have no source. Everything else has an inline source. Several prices come from third-party aggregators rather than the vendor's own page; those are flagged.

---

## 1. Hardware BOM at 1k–10k units, plus retail prices of comparable wearables

### Takeaway
The only sourced component prices are the ESP32-S3 module (about $3.4–3.7 at reel quantity) and a MEMS mic (about $0.45). Everything else in the BOM is an estimate. A reasonable working figure is **$12–18 BOM and $25–40 landed per badge including dock [EST]**. Injection-mould tooling is $1–3k for a prototype tool and $8–15k+ for a production single-cavity steel tool. Comparable AI pendants retail for $49–179 and usually carry a subscription.

### Cited Findings
- **ESP32-S3-WROOM-1-N16R8 module** (16 MB flash, 8 MB PSRAM; LCSC C2913202): about $5.2–6.4 at qty 1 and **$3.44–3.71 at 1,300+** (snapshots vary). A full reel is 650 pcs — [LCSC](https://www.lcsc.com/product-detail/C2913202.html)
- The external-antenna variant ESP32-S3-WROOM-1U-N16R8 (C3013946) is about $3.89 at 1,300+ — [LCSC](https://www.lcsc.com/product-image/C3013946.html)
- **MEMS microphone**: the MSM261DGT003 MEMS mic (LCSC C48227730) is listed from $0.4535. I found no LCSC price for the ICS-43434 or the MSM261S4030H0 I2S parts. An eBay retail listing for the MSM261S4030H0R shows $6.82, which is not representative of volume pricing — [LCSC](https://www.lcsc.com/product-image/C48227730.html); [eBay](https://www.ebay.de/itm/405878840037)
- **Injection-mould tooling (China)**: about $1,000–3,000 for a prototype single-cavity mould and $5,000–15,000+ for production multi-cavity tooling — [dev.to / China sourcing](https://dev.to/china-sourcing-agents/injection-mold-tooling-costs-for-electronics-enclosures-16dl)
- Tooling by cavity count: single-cavity $8–15k, 4-cavity $15–28k, 8-cavity $28–50k. Per-part cost for a 50 g ABS part on a 4-cavity tool is **$0.18–0.35 at 10k pcs** and $0.09–0.16 at 100k. An $8,000 mould adds about $8/unit at 1,000 units and $0.16/unit at 50,000 (vendor-authored source) — [CoreLMould](https://cm-astro-landingpage.pages.dev/en/blog/injection-molding-costs-china-comparison)
- Expect 2–3 sample rounds (T1/T2/T3) before sign-off. The same source recommends 3D-printed or CNC enclosures for pilots — [CoreLMould](https://cm-astro-landingpage.pages.dev/en/blog/injection-molding-costs-china-comparison)
- **Comparable retail devices**:
  - Omi pendant: $179 list, $129 promotional. Free plan includes 300 cloud minutes/month — [Layer3 Labs](https://www.layer3labs.io/guides/omi-ai-review). Another source lists it at $89 — [TechCrunch](https://techcrunch.com/2025/11/21/the-hottest-ai-wearables-and-gadgets-you-can-buy-right-now)
  - Plaud NotePin: about $159–169, with 300 free minutes/month and an $8.33/month Pro plan — [Plaud blog](https://www.plaud.ai/blogs/articles/9-life-changing-ai-wearable-devices-in-2026); [Layer3 Labs](https://www.layer3labs.io/guides/best-ai-wearable-pendants-2026)
  - Limitless Pendant: $99 with 10 h/month of AI features, or $29/month for unlimited. Listed as discontinued — [Plaud blog](https://www.plaud.ai/blogs/articles/9-life-changing-ai-wearable-devices-in-2026)
  - Bee: $49.99 clip-on, acquired by Amazon, $19/month app — [Plaud blog](https://www.plaud.ai/blogs/articles/9-life-changing-ai-wearable-devices-in-2026); [allmind.ai](https://allmind.ai/news/05b840201dbba2d8373c38272d18a4874251e2c3b7f9ddc0567e0e2040e441b5)

### Inferences
- **[EST] Per-badge BOM at 1k–10k units.** Only the ESP32-S3 and mic prices are sourced; every other line is a typical market estimate.

  | Item | Estimate |
  |---|---|
  | ESP32-S3 module | $3.5 (sourced) |
  | MEMS mic | $0.5–1.5 |
  | 500–1000 mAh LiPo with protection | $1.5–3 |
  | Charger IC and LDO/buck | $0.3–0.8 |
  | microSD slot + 8–32 GB card, or SPI NOR/NAND flash | $1.5–4 |
  | PCB plus passives, LED, button | $1–2 |
  | SMT assembly and test | $1.5–3 |
  | Injection-moulded case | $0.2–0.5, plus tooling amortisation $0.5–8 depending on volume |
  | Magnet/clip mount | $0.3–1 |
  | Packaging | $0.5 |

  - BOM subtotal: about **$12–18**.
  - Charging dock (multi-bay pogo-pin or USB hub): about **$5–15 per badge-slot**.
  - Landed cost per badge incl. dock share, freight and Indian import duty: **about $25–40 (₹2,150–3,450)**.
- **[EST] Onboard storage.** A 16 MB-flash module cannot buffer a day of audio. At 16 kbps Opus, 7 h is about 50 MB (see §5), so a microSD card or a larger NAND chip is needed if Wi-Fi is unavailable for hours.
- **[EST] Amortisation.** Over 24 months, a $35 landed badge costs about **$1.5/badge-month (₹125)**.
- Retail AI pendants sell at $49–179 plus $8–29/month subscriptions. This suggests their cloud costs are sizeable and offloaded to subscriptions.

### Gaps
- I found no public teardown or BOM for Omi, Plaud, Limitless or Bee.
- No sourced prices for: the LiPo cell (e.g. 802535/103040), the charger IC (TP4056/BQ24074), microSD, JLCPCB assembly, or a magnet mount. Get LCSC/JLCPCB quotes.

---

## 2. Speech-to-text cost per audio hour (Hindi/Hinglish), incl. diarization

### Takeaway
**Meta Muse Voice Transcribe costs $0.18/audio-hour.** It supports Hindi and four other Indian languages and does multi-speaker detection, making it the cheapest sourced option and native to the hackathon stack. Commercial alternatives run $0.18–0.52/h. Sarvam is India-specialised: ₹30/h, or ₹45/h (about $0.52) with diarization. Cutting silence with voice-activity detection (VAD) before transcription is the biggest cost lever.

### Cited Findings
- **Meta Muse Voice Transcribe**: **$0.18 per hour of audio**, metered per whole second. Streaming and batch cost the same. Limits are 256 concurrent streams and 16,000 streams/hour — [Meta Model API pricing](https://dev.meta.ai/docs/pricing-rate-limits)
  - Reported elsewhere as "$3 per 1,000 minutes" (same rate). Trained on 70+ languages, 25 validated, including Hindi, Tamil, Telugu, Kannada and Malayalam (one list also has Bengali and Marathi). Real-time speaker detection handles 20+ speakers — [ETV Bharat](https://www.etvbharat.com/en/technology/muse-voice-transcribe-meta-ai-now-supports-real-time-multilingual-speech-to-text-with-20-plus-speakers-enn26090201991); [Morung Express/IANS](https://morungexpress.com/meta-launches-muse-voice-transcribe-with-native-support-for-five-indian-languages); [Gigazine](https://gigazine.net/gsc_news/en/20260902-meta-muse-voice-transcribe)
- **Sarvam AI STT**: **₹30/hour**, billed per second. **₹45/hour with diarization**. Translation is ₹30/h, or ₹45/h with diarization. New plans get ₹1,000 of free credit. The results did not confirm which model (Saarika/Saaras) these rates apply to — [Sarvam docs pricing](https://docs.sarvam.ai/api-reference-docs/pricing). Enterprise rates are not public — [smallest.ai](https://smallest.ai/blog/sarvam-ai-speech-to-text-pricing)
- **Deepgram Nova-3 Multilingual**:
  - Pre-recorded: $0.0052/min ($0.31/h) pay-as-you-go, or $0.0043/min on the Growth tier — [Activepieces](https://www.activepieces.com/blog/deepgram-pricing-2026-per-minute-rates-and-add-ons.md)
  - Streaming: $0.0092/min regular — [Soniox comparison](https://soniox.com/pricing/stt/soniox-vs-deepgram)
  - Diarization add-on: about **$0.002/min ($0.12/h)** — [Soniox](https://soniox.com/pricing/stt/soniox-vs-deepgram)
  - All three figures are from third parties, not Deepgram's page.
- **OpenAI** (aggregator and news figures, not OpenAI's page):
  - gpt-4o-transcribe: $0.006/min ($0.36/h) — [Neowin](https://www.neowin.net/news/openai-announces-next-generation-audio-models-to-power-voice-agents/)
  - gpt-4o-mini-transcribe: $0.003/min ($0.18/h) — [CostGoat](https://costgoat.com/pricing/openai-transcription)
  - gpt-4o-transcribe-diarize: $0.006/min ($0.36/h) — [CostGoat](https://costgoat.com/pricing/openai-transcription)
- **ElevenLabs Scribe v2**: **$0.22/h** base, plus $0.07/h for entity detection and $0.05/h for keyterm prompting. A reseller lists $0.29/h — [Puter developer guide](https://developer.puter.com/tutorials/elevenlabs-api-pricing/); [AIML API](https://aimlapi.com/models/elevenlabs-scribe-v2)
- **AssemblyAI Universal-3.5 Pro**: **$0.21/h** pre-recorded. This is a vendor comparison page, which also claims better code-switching than Scribe — [AssemblyAI](https://www.assemblyai.com/compare/scribe-v2-vs-assemblyai)
- **Google Cloud STT V2**:
  - Standard: $0.016/min ($0.96/h)
  - Dynamic Batch: $0.003–0.004/min ($0.18–0.24/h)
  - Chirp is said to be included at the standard rate.
  - Third-party figures, and Chirp 3 batch pricing is unverified — [dasha.ai](https://dasha.ai/blog/speech-to-text-pricing); [Google pricing page](https://cloud.google.com/speech-to-text/pricing/)
- **Azure AI Speech**: batch about $0.18/h, real-time about $1/h, fast transcription $0.006/min ($0.36/h). Aggregator figures — [speechtext.ai](https://speechtext.ai/tutorials/which-speech-to-text-api-offers-the-best-value-for); [developersdigest](https://www.developersdigest.tech/models/speech/speech-to-text)
- **Self-hosting on Modal** (GPU price per hour): T4 $0.59, L4 $0.80, A10 $1.10, L40S $1.95, A100-80GB $2.50, H100 $3.95. Billed per second. Free compute is $30/month on Starter and $100/month on Team, and startups can apply for credits — [Modal pricing](https://modal.com/pricing)

### Inferences
- **Cost per audio-hour including diarization:**

  | Provider | $/h | ₹/h |
  |---|---|---|
  | Muse Voice Transcribe | 0.18 | 15.5 |
  | gpt-4o-mini-transcribe (no diarization) | 0.18 | — |
  | Azure batch | ~0.18 | — |
  | AssemblyAI | 0.21 | — |
  | ElevenLabs | 0.22 | — |
  | gpt-4o-transcribe-diarize | 0.36 | — |
  | Deepgram + diarization | ~0.43 | — |
  | Sarvam + diarization | 0.52 | 45 |

- **[EST] Self-hosted Whisper-large-v3-turbo or Meta Omnilingual ASR on a Modal L4 ($0.80/h).** If it runs at roughly 30–100× real time with batching, the cost is about **$0.008–0.03 per audio-hour**. That is 6–20× cheaper than APIs, but diarization (e.g. pyannote) and engineering effort come on top. The real-time factor is assumed, not sourced.
- **[EST] Volume per badge.** 7 h/day × 26 working days = **182 recorded hours/badge-month**.
  - If transcribed unfiltered at $0.18/h: **$32.8 (₹2,820)**.
  - With on-device or server VAD keeping about 40% (≈3 h/day speech, ≈78 h/month): **$14 (₹1,200)**.
  - The same 78 h on Sarvam with diarization is $41 (₹3,510).
  - VAD is the most important cost lever.

### Gaps
- No independent Hindi/Hinglish word-error-rate (WER) comparison was found for these vendors' price points; accuracy versus price needs a pilot benchmark.
- Deepgram's Hindi-specific model pricing is not confirmed from Deepgram's own page.
- Official OpenAI per-minute diarize pricing is not confirmed.

---

## 3. LLM analysis cost per hour of conversation

### Takeaway
Once transcribed, LLM analysis is cheap. Using Muse Spark (standard) on an hour of continuous speech costs about **$0.03/h [EST]**. Contributor mode, Gemini Flash-Lite or GPT-4o-mini are about 10× cheaper still. **Per badge-month, LLM cost is about $1–3 with Muse Spark [EST].**

### Cited Findings
- **Meta Model API, per 1M tokens (input / output / cached input)**:
  - `muse-spark-1.1/1.2/1.3`: **$1.25 / $4.25 / $0.15**
  - `muse-spark-1.2/1.3-contributor`: **$0.10 / $0.20 / $0.002**. Contributor mode is a discount in exchange for letting Meta use your content for training.
  - `muse-wonder-1.0`: $4 / $20
  - No long-context premium. Web-search grounding costs $2.50 per 1,000 queries.
  - Rate limits: 3,000 RPM / 4M TPM for standard models and 150 RPM / 3M TPM for contributor models.
  - Source: [Meta Model API pricing](https://dev.meta.ai/docs/pricing-rate-limits). Launch coverage of the $1.25/$4.25 pricing — [AI Weekly](https://aiweekly.co/alerts/meta-prices-muse-spark-11-api-at-125425-per-m-tokens)
- **Other models** (aggregator figures, unverified against official pages):
  - GPT-4o mini: $0.15 / $0.60
  - Claude Haiku 4.5: $1.00 / $5.00
  - Gemini 2.5 Flash-Lite: listed at $0.04 / $0.15 by one June 2026 guide
  - Gemini 3.1 Flash-Lite: $0.25 / $1.50
  - Sources: [dev.to pricing trends](https://dev.to/benchwright/llm-api-pricing-trends-q2-2026-who-got-cheaper-who-got-expensive-8hh); [modelcompare.dev](https://modelcompare.dev/compare/google-gemini-2-5-flash-vs-anthropic-claude-haiku-4-5)
  - Another source gives Haiku at $0.80/$4.00, which conflicts. The same results say OpenAI's lineup has moved to the GPT-5.4 family — [vortenza](https://www.vortenza.com/guides/gpt4o-vs-claude-vs-gemini-cost-2026)
- I could not retrieve Groq pricing for Llama models: the groq.com/pricing page returned no rates.

### Inferences
- **[EST] Token volume.** Continuous conversational speech runs about 130–160 words/min, so 8–10k words per hour of speech. Hinglish in Devanagari tokenises at roughly 2–3+ tokens/word; romanised text runs about 1.3–1.5. Assume about **15–20k input tokens per speech-hour**, plus a ~2k-token system prompt and about 2k output tokens (summary, tags, coaching JSON).
- **[EST] Cost per speech-hour (20k input + 2k output):**

  | Model | $/speech-hour |
  |---|---|
  | Muse Spark | 0.034 (₹2.9) |
  | Muse Spark contributor | 0.0024 |
  | GPT-4o-mini | 0.0042 |
  | Gemini 2.5 Flash-Lite (at $0.04/$0.15) | 0.0011 |
  | Claude Haiku 4.5 | 0.030 |

- **[EST] Per badge-month** at about 78 speech-hours (3 h/day × 26 days): Muse Spark is about **$2.6 (₹225)**; contributor mode is about $0.2. Prompt caching ($0.15/M cached) further cuts the repeated system prompt.
- Contributor mode sends customer conversations to Meta for training. That is likely unacceptable under India's DPDP Act and retailer contracts, so budget for standard mode.

### Gaps
- No sourced figure for words/hour of retail shop-floor speech or for Hindi/Hinglish tokens per word on Muse Spark's tokenizer.
- Groq, Together, Fireworks and Baseten Llama prices were not retrieved.

---

## 4. Video analytics cost per camera per month

### Takeaway
Do not run SAM 3.1 per frame on the Meta API for continuous monitoring. At **$0.20 per 1,000 frames**, 1 fps for 12 h/day is about **$260/camera-month [EST]**. Use a lightweight YOLO-class detector and tracker instead, either batched on a shared cloud GPU (about **$2–10/camera-month [EST]**) or on an in-store **Jetson Orin Nano Super ($249 US list)**, which amortises to about $7/store-month. Reserve SAM 3.1 for sampled walk-out events.

### Cited Findings
- **SAM 3.1 on the Meta Model API**: video segmentation is **$0.20 per 1,000 frames** with a 50-frame minimum per request. Image segmentation is $2.50 per 1,000 images — [Meta Model API pricing](https://dev.meta.ai/docs/pricing-rate-limits)
- **Modal GPU prices**: T4 $0.59/h, L4 $0.80/h, A10 $1.10/h. CPU is about $0.047/core-hour and memory $0.008/GiB-hour — [Modal pricing](https://modal.com/pricing)
- **NVIDIA Jetson Orin Nano Super Developer Kit**: **$249** US. The original Orin Nano kit was $499 — [ThinkRobotics review](https://thinkrobotics.com/blogs/product-reviews-buying-guides/nvidia-jetson-orin-nano-super-developer-kit-review-is-it-the-best-edge-ai-board-in-2025)
  - Indian retailer ThinkRobotics shows a possible listing at ₹29,999 sale / ₹32,999 regular (not clearly tied to this product) — [ThinkRobotics](https://thinkrobotics.com)
  - A Made-in-India deployment kit starts at ₹47,050 — [ThinkRobotics](https://thinkrobotics.com/blogs/product-reviews-buying-guides/nvidia-jetson-orin-super-nano-deployment-kit-made-in-india-everything-in-one-box-ready-to-deploy)

### Inferences
- **[EST] SAM 3.1 API.** 1 fps × 12 h × 30 days = 1.296M frames, so **$259/camera-month**. At 0.2 fps it is about $52. Not viable for always-on use.
- **[EST] Cloud YOLO.** A T4 running YOLOv8n/YOLO11n can process hundreds of frames/s, so one GPU can serve dozens to 100+ cameras at 1–2 fps. That puts GPU cost at about **$2–10/camera-month** if well-batched across stores; a dedicated always-on T4 per camera would be about $212. Cloud mode also needs frame upload. At 1 fps with ~50 KB JPEGs, that is about 2.2 GB/day, or about **65 GB/camera-month** of upstream bandwidth.
- **[EST] Edge.** A Jetson Orin Nano Super ($249, ≈₹21.4k at list; ₹30k+ at Indian retail) can handle 2+ RTSP streams in-store and sends only event metadata. Over 36 months that is **$7–10/store-month** plus about 15 W of power. Given store uplinks, this is the preferred option for 1–2 cameras.

### Gaps
- No sourced YOLO throughput benchmark on a T4/L4.
- No official NVIDIA India price.
- Edge power cost per store and RTSP/ONVIF compatibility of typical Indian CCTV NVRs are not researched.

---

## 5. Cloud storage and bandwidth

### Takeaway
Audio is small. At 16–24 kbps Opus it is about **7–11 MB/hour**, so about **1.3–2 GB/badge-month**. On Cloudflare R2 ($0.015/GB-month, free egress), even 6-month retention costs **under $0.20/badge-month [EST]**.

### Cited Findings
- **Cloudflare R2**: standard storage $0.015/GB-month; infrequent access $0.01/GB-month with a 30-day minimum. Class A operations $4.50/M, Class B $0.36/M. **Zero egress fees**. Free tier is 10 GB, 1M Class A and 10M Class B per month (third-party summary) — [Filebase](https://filebase.com/blog/cloudflare-r2-pricing-costs-savings-and-alternatives-in-2026/)
- **AWS S3 Mumbai (ap-south-1)**, indicative INR from a reseller:
  - S3 Standard about ₹2.1/GB-month (~$0.024)
  - Standard-IA about ₹1.15
  - Glacier Flexible about ₹0.36
  - Deep Archive about ₹0.16
  - Internet egress free for the first 100 GB/month, then about ₹8–9/GB
  - Source: [PrecisionTech](https://precisiontech.in/cloud/amazon-aws-cloud/aws-pricing/aws-pricing-in-mumbai/)

### Inferences
- **[EST] Audio size per hour.** 16 kbps mono Opus = 7.2 MB/h; 24 kbps = 10.8 MB/h; 32 kbps = 14.4 MB/h. MP3 at 64 kbps = 28.8 MB/h. Raw 16 kHz 16-bit PCM = 115 MB/h, so on-device compression matters both for Wi-Fi airtime and for battery.
- **[EST] Monthly volume.** 182 h × 7.2–10.8 MB = **1.3–2.0 GB/badge-month**.
  - R2 storage of one month's audio: about $0.02–0.03.
  - Rolling 6-month retention: about $0.12–0.18/badge-month.
  - Transcripts and JSON are negligible (<10 MB/month).
- Under the DPDP Act, India-region storage (AWS/GCS Mumbai at about $0.024–0.025/GB) may be preferred. That is still under $0.30/badge-month.

### Gaps
- Official AWS/GCS India per-GB prices were not fetched directly; the S3 figures are from a reseller.
- Cloudflare's own pricing page was not fetched.

---

## 6. Connectivity

### Takeaway
Use store Wi-Fi by default, at zero marginal cost. If the store has no reliable Wi-Fi, **one shared 4G/5G hotspot per store** on a Jio prepaid data pack is enough: about ₹359 for 50 GB/30 days, roughly $4.2. That covers about 5 badges of audio (≈10 GB) but **not** cloud-side CCTV video upload (≈65 GB per camera). Per-badge cellular modules are unnecessary.

### Cited Findings
- **Jio data-only packs (2026)** range from ₹11 to ₹359. **₹359 gives 50 GB for 30 days**; ₹19 gives 1 GB for 1 day — [Gizbot](https://www.gizbot.com/telecom/features/jio-data-only-plans-2026-full-lists-from-rs-11-to-rs-359-122905.html)
- **Jio postpaid** starts at ₹349 + 18% GST — [91mobiles](https://www.91mobiles.com/hub/jio-postpaid-plans-2026-price-india-offers-benefits/)

### Inferences
- **[EST] Hotspot cost.** A 4G MiFi router (≈₹1,500–2,500 one-time) plus a ₹359–449/month data pack comes to about **₹400–500/store-month ($5–6)** for audio only.
- **[EST] Per-badge cellular.** An LTE Cat-1 module would add about $5–8 BOM per badge, more battery drain, and a SIM per badge. Not recommended.

### Gaps
- Jio/Airtel IoT/M2M SIM pricing is enterprise-only and was not found.

---

## 7. Battery life: ESP32-S3 continuous recording plus Wi-Fi upload

### Takeaway
The datasheet currents suggest an average draw of about **45–80 mA** with continuous recording and periodic batched Wi-Fi uploads **[EST]**. A **1000 mAh** cell should comfortably cover an 8-hour shift (about 11–19 h estimated). A 500 mAh cell is marginal (about 5–9 h). Batch uploads rather than streaming continuously, and charge the badges in the dock overnight.

### Cited Findings
- **ESP32-S3 currents** (datasheet values as reproduced by a third party):
  - Wi-Fi TX peak 310 mA (802.11b, +19.5 dBm); 200 mA (802.11n MCS7)
  - RX 63–68 mA
  - Modem sleep about 20–32 mA, depending on CPU frequency
  - Light sleep about 750 µA; deep sleep about 20 µA
  - Source: [Deneyap ESP32-S3 power table](https://docs.deneyapkart.org/en/Cards/Deneyap-Kart-v2/Power-Consumption-esp32-s3)
- A forum user measured 50–150 mA in "modem sleep" while connected to Wi-Fi. An Espressif engineer replied that the ~20 mA figure is measured on the chip in test mode — [esp32.com forum](https://esp32.com/viewtopic.php?p=9940)

### Inferences
- **[EST] Average-current budget:**
  - CPU at 80–160 MHz with I2S DMA and on-device Opus encoding: 30–50 mA (modem sleep plus PSRAM)
  - MEMS mic: about 0.5–1.5 mA
  - SD card writes: about 5–15 mA average
  - Wi-Fi: uploading ~10 MB/h in bursts of a few minutes per hour at 100–250 mA adds about 5–15 mA averaged
  - Total: **about 45–80 mA**
- **[EST] Runtime** at 85% usable capacity: 1000 mAh gives 10.6–18.9 h; 500 mAh gives 5.3–9.4 h; 800 mAh gives 8.5–15 h.
- **[EST]** Keeping Wi-Fi associated continuously (≈100 mA+) would roughly halve runtime. Record to SD and upload at intervals, or at the end of the day on the dock.

### Gaps
- No measured current for an ESP32-S3 doing I2S capture plus Opus encoding.
- No specific MEMS mic datasheet current was retrieved.
- Pilot hardware should be measured with a power profiler (e.g. Nordic PPK2).

---

## Summary cost model (all figures [EST], derived from the cited prices above)

Assumptions:
- 1 store = 5 badges + 2 CCTV cameras
- 7 h/day recording, 26 working days
- VAD keeps about 3 h/day of speech (78 h/badge-month)
- Meta stack: Muse Voice Transcribe plus Muse Spark standard
- US$1 = ₹86

**Per badge-month:**

| Line item | USD | INR | Basis |
|---|---|---|---|
| STT (Muse Voice Transcribe, 78 h × $0.18) | 14.0 | 1,205 | Meta pricing |
| LLM analysis (Muse Spark, 78 h × ~$0.034) | 2.6 | 225 | Meta pricing + token estimate |
| Storage (R2, 6-month rolling) | 0.15 | 13 | R2 $0.015/GB |
| Hardware amortisation ($35 landed / 24 mo) | 1.5 | 125 | BOM estimate |
| **Total per badge** | **≈18.3** | **≈1,570** | |
| Sensitivity: no VAD (182 h STT) | ≈38 | ≈3,250 | |
| Sensitivity: Sarvam + diarization instead of Muse (78 h) | ≈45 | ≈3,880 | |
| Sensitivity: self-hosted Whisper on Modal | ≈5–6 | ≈450–520 | excludes engineering |

**Per store-month (5 badges + 2 cameras):**

| Line item | USD | INR |
|---|---|---|
| 5 badges | 91 | 7,850 |
| Video: Jetson Orin Nano Super edge box ($249–350 / 36 mo) | 7–10 | 600–860 |
| Video alternative: batched cloud YOLO (2 × $2–10) | 4–20 | — |
| Connectivity (store Wi-Fi; or 4G hotspot ≈ ₹450) | 0–5 | 0–450 |
| **Total** | **≈$100–110** | **≈₹8,500–9,500** |

Notes:
- STT dominates the variable cost.
- Avoid SAM 3.1 per-frame API calls for continuous video: at about $259/camera-month it would roughly triple the store cost.
