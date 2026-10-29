# SaySo Can Earn 50% Margins, Barely

SaySo has a real but narrow business case. Its first market is roughly **12,000–20,000 high-ticket chain stores** (jewellery, electronics, eyewear, then car showrooms), not India's 500,000 organized stores. The cost worry is justified. On the default Meta stack, one store with 5 badges and 2 cameras costs about **₹8,500–9,500 a month to run**, and speech-to-text alone is about two-thirds of that. If silence is not cut out before transcription, the cost doubles to about **₹17,000**. At the ₹8,000–14,000 per store that Indian CCTV-AI vendors charge, SaySo would lose money or break even. The fix is a two-part price, **₹4,000 per store plus ₹3,000 per badge per month**. That comes to ₹19,000 for a typical 5-badge store, gives about **52–56% gross margin today**, and rises to **about 80–90%** if SaySo runs its own speech-to-text model. SaySo is also not alone. The earlier informal scan of the hackathon Discord found no direct competitor, but the research shows a real Indian one: **Borentis, based in Gurgaon, already sells Hinglish in-store sales-conversation coaching** to jewellery, auto and electronics retailers. SaySo's clear gap is that nobody, Borentis included, joins wearable audio to CCTV walk-out detection. On the legal side, recording customers' voices needs their consent under the DPDP Act, and the Act's core duties apply from about **13 May 2027**. SaySo should be built to that standard from day one.

All rupee figures use **US$1 = ₹86**. Lines marked "estimate" are arithmetic built on the sourced prices, not published numbers.

## SaySo's first market is about 15,000 high-ticket stores, not 500,000

Indian retail is huge, but most of it is out of reach. Total retail was about **US$952 billion in 2024**, heading to about US$1.6 trillion by 2030 ([IBEF](https://www.ibef.org/uploads/industry/Infrographics/large/Retail-Infographic-November-2025.pdf)). The organized share is poorly measured. Deloitte-RAI sees organized retail reaching **US$230 billion by 2030** ([IBEF/Deloitte-RAI](https://www.ibef.org/news/organised-retail-set-to-reach-rs-20-08-590-crore-us-230-billion-by-2030-deloitte-rai-report)). Redseer says organized players will pass **35% (over US$600 billion)** by 2030 ([IBEF/Redseer](https://www.ibef.org/news/india-s-retail-market-to-hit-rs-1-37-28-000-crore-us-1-6-trillion-by-2030-led-by-smaller-players)). The two use different definitions, so neither should go in a pitch deck without its definition. The useful signal is that organized retail is growing faster than retail overall.

SaySo only helps where a salesperson's words decide the sale. That rules out self-service formats like Zudio. It points to chains where tickets are high, customers stay a long time and staff are many. Jewellery and electronics have the longest in-store dwell times, and value fashion has twice the abandonment rate of premium ([Apparel Resources/Enalytix](https://apparelresources.com/business-news/retail/indias-fashion-retail-landscape-shifts-beyond-metros-says-report/)). The named chains in these segments are large and still opening stores.

| Segment | Example chains and store counts | Why it fits | Rank |
|---|---|---|---|
| Jewellery | Titan jewellery brands **824** ([Titan Q4 FY26](https://nsearchives.nseindia.com/corporate/TITAN_07042026221524_Q4update202526.pdf)); Kalyan **524**, with about **150 more planned in FY27** ([Kalyan Q1 FY27](https://nsearchives.nseindia.com/corporate/KALYANKJIL_04082026170914_Q1_IP.pdf)); CaratLane about **369** ([Outlook Business](https://www.outlookbusiness.com/corporate/caratlane-eyes-retail-expansion-with-40-new-stores-in-fy27)) | Highest ticket, long advice-led sales, many staff | 1 |
| Electronics and Apple partners | Reliance Digital about **1,100** ([Retail4Growth](https://www.retail4growth.com/news/croma-to-open-around-a-dozen-stores-this-year-1498)); Croma **550+** ([Wikipedia](https://en.wikipedia.org/wiki/Crom%C4%81)); Aptronix **70** ([Retail4Growth](https://www.retail4growth.com/viewpoints/aptronix-puts-customer-experience-at-the-heart-of-its-retail-strategy-1370)) | Phone average price about **US$282 (≈₹24,000)** ([IDC via iConnect007](https://iconnect007.com/article/148817/india-smartphone-market-flat-at-152-million-units-in-2025-with-2026-volumes-expected-to-fall/148814/ein)); small Apple-partner chains decide fast | 2 |
| Eyewear | Lenskart about **2,067 India stores** ([Inc42](https://inc42.com/features/eye-on-global-horizons-can-lenskart-win-on-affordability-card)); Titan Eye+ **840** | Lower ticket, but standard processes and a tech-friendly culture | 3 |
| Car and two-wheeler showrooms | Store count not found | Very high ticket, but each dealer is a separate buyer | 4 |
| Premium apparel | Westside **301** ([Upstox](https://upstox.com/news/market-news/earnings/trent-q1-results-net-profit-rises-26-to-532-crore-ebitda-margin-expands-by-210-basis-points/article-198234/)) | Lower ticket per sale | 5 |

Adding up the named chains gives about 7,500–8,500 stores. Unnamed chains such as Vijay Sales, Malabar and brand-exclusive phone stores plausibly take the reachable pool to 12,000–20,000 (estimate). The table below turns that into revenue at the price recommended later in this report (about ₹19,000 per store per month).

| Level | Stores | Basis | Yearly revenue at ₹19,000/store/month (estimate) |
|---|---|---|---|
| Everything (TAM) | ~500,000 | RAI member stores, 2021 ([Wikipedia: RAI](https://en.wikipedia.org/wiki/Retailers_Association_of_India)) | Not meaningful: most are poor fits |
| Reachable (SAM) | 12,000–20,000 | Named high-ticket chains plus similar | **₹274–456 crore (US$32–53M)** |
| First 1–3 years (SOM) | 300–1,000 | 2–5 chains in jewellery, electronics, eyewear | **₹6.8–22.8 crore (US$0.8–2.7M)** |

The SAM is a solid niche, not a giant market. It is smaller than the estimated yearly revenue of the US company Rilla alone. SaySo only grows past it by adding car dealerships, expanding abroad, or getting cheap enough for mid-ticket retail.

One hard number is missing. No independent study gives Indian walk-in conversion rates. The only figure, 12–18%, comes from a vendor that sells footfall analytics ([Agrex AI](https://www.agrexai.com/footfall-analytics-india-2026-guide/)). Pilots will have to produce SaySo's own baseline.

## Borentis already sells Hinglish in-store coaching in India

The earlier Discord scan was right that no hackathon entrant builds SaySo. The wider market is different. Recording and AI-scoring face-to-face sales talk is now a funded category. **Rilla** raised a Series B at about **US$757 million** post-money and is estimated at about **US$70 million in yearly recurring revenue** ([Sacra](https://sacra.com/c/rilla)). **Siro** raised a **US$50 million Series B** ([Pulse2](https://pulse2.com/siro-50-million-series-b-raised-for-bringing-ai-to-in-person-sales/)). Both mostly serve US home-services and car-dealer field sales.

The Indian threat is **Borentis** of Gurgaon. It records in-store sales conversations offline in Hinglish, Hindi and regional languages. It scores each advisor 0–100, shares top performers' conversations, and sends WhatsApp follow-ups. It targets electronics, jewellery and auto, which are SaySo's own top segments, and describes itself as "audio-first (video-ready)" ([Borentis](https://borentis.com/learn/best-ai-in-store-sales-coaching-tools-india/)). No customers, funding or price were found. Borentis's comparison page also claims that phone-call tools like Convin and Salesken cannot capture floor conversations offline. That claim comes from a competitor and is unverified.

| Company | What it does | Where | Price found | Overlap with SaySo |
|---|---|---|---|---|
| **Borentis** | Hinglish in-store audio coaching, offline | India (Gurgaon) | Not published | **Direct (audio half)** |
| Vera AI | Retail-floor recording device, 50+ scoring criteria, needs "no cameras" ([Vera](https://www.heyvera.ai/)) | LatAm/Europe | Not published | Audio half |
| tolqAI | In-person recording for stores and showrooms, Arabic | Gulf | **$79/user/month (≈₹6,800)** ([tolqAI](https://tolqai.com/pricing)) | Audio half |
| Rilla | In-person sales recording and coaching | US | $199–349/rep/month, $1.5–5K setup (third-party) ([SalesAsk](https://www.salesask.com/alternatives/rilla/rilla-pricing-guide-2026)) | Audio half |
| Siro | App-based in-person recording, dealerships | US | $149–249/rep/month (third-party) ([SalesAsk](https://www.salesask.com/blog-posts/siro-pricing-guide-2026-costs-plans-better-alternatives)) | Audio half |
| Wobot.ai | AI checklists on existing CCTV | India | **$40/location/month (≈₹3,400)** for up to 4 cameras ([Wobot](https://wobot.ai/pricing)) | Video half |
| Agrex.ai | CCTV theft, queue and footfall analytics | India | **₹800–1,200/camera/month** ([Agrex](https://www.agrexai.com/what-is-retail-video-analytics/)) | Video half |
| IndoAI | Footfall analytics, hardware included | India | **₹8,000–14,000/store/month** ([IndoAI](https://indo.ai/content/indoai-footfall-analytics-blog.html)) | Video half |
| Staqu | CCTV video analytics on edge boxes | India | Not published ([Staqu](https://www.staqu.com/how-the-retail-industry-is-using-video-analytics-to-extract-data-from-cctv-streams/)) | Video half |
| Convin | Phone-call conversation analytics | India | **~$42–50/user/month (≈₹3,600–4,300)** ([HubSpot](https://ecosystem.hubspot.com/marketplace/apps/convin-353510)) | Price anchor only |

Two points stand out. First, audio vendors and CCTV vendors are separate companies. No one found links "this customer walked out" on video to "this is what the salesperson said" on audio. That link is SaySo's real edge, though Borentis's "video-ready" label shows it may not stay unique for long. Second, US prices of $150–350 per rep do not transfer to India. The usable Indian anchors are **₹3,600–6,800 per salesperson** for audio and **₹3,400–14,000 per store** for video.

## Speech-to-text eats two-thirds of the ₹8,500–9,500 store bill

The costs below assume a typical store with **5 badges and 2 CCTV cameras**. Each badge records 7 hours a day for 26 days, which is 182 hours a month. Voice-activity detection (VAD) trims each badge's recording to about 3 hours of real speech a day, or 78 hours a month. The stack is Meta's Muse Voice Transcribe for speech-to-text and Muse Spark for analysis. All lines are estimates built from the sourced unit prices.

**Cost per badge per month**

| Item | Unit price | Monthly cost |
|---|---|---|
| Speech-to-text (78 h) | **$0.18/audio-hour**, Hindi supported, speaker separation included ([Meta pricing](https://dev.meta.ai/docs/pricing-rate-limits)) | **₹1,205** |
| AI analysis (78 h, ~22k tokens per hour) | Muse Spark **$1.25 / $4.25** per million input/output tokens ([Meta pricing](https://dev.meta.ai/docs/pricing-rate-limits)) | ₹225 |
| Storage (6 months of audio, ~1.3–2 GB/month) | **$0.015/GB-month**, no download fees ([Filebase on R2](https://filebase.com/blog/cloudflare-r2-pricing-costs-savings-and-alternatives-in-2026/)) | ₹13 |
| Badge hardware (₹2,150–3,450 landed, spread over 24 months) | ESP32-S3 module **$3.44–3.71** ([LCSC](https://www.lcsc.com/product-detail/C2913202.html)); the rest of the parts list is estimated | ₹125 |
| **Total per badge** | | **≈₹1,570** |

**Cost per store per month (5 badges, 2 cameras)**

| Item | Monthly cost | Share |
|---|---|---|
| Speech-to-text (5 badges) | ₹6,025 | **~66–71%** |
| AI analysis (5 badges) | ₹1,125 | ~12–13% |
| Badge hardware (5 badges) | ₹625 | ~7% |
| Video: in-store Jetson Orin Nano box (**$249** list ([ThinkRobotics](https://thinkrobotics.com/blogs/product-reviews-buying-guides/nvidia-jetson-orin-nano-super-developer-kit-review-is-it-the-best-edge-ai-board-in-2025)), spread over 36 months) | ₹600–860 | ~7–10% |
| Internet (store Wi-Fi is free; a Jio pack is **₹359 for 50 GB** ([Gizbot](https://www.gizbot.com/telecom/features/jio-data-only-plans-2026-full-lists-from-rs-11-to-rs-359-122905.html))) | ₹0–450 | 0–5% |
| Storage (5 badges) | ₹65 | <1% |
| **Total** | **≈₹8,450–9,150** | |

A few setup choices decide whether the cost is fine or ruinous.

| Scenario | Cost per store per month | Compared with the default |
|---|---|---|
| **No silence-cutting** (transcribe all 182 h per badge) | **≈₹16,900–17,600** | About 2× |
| **Sarvam speech-to-text with speaker separation** (₹45/hour ([Sarvam](https://docs.sarvam.ai/api-reference-docs/pricing))) | **≈₹20,000–20,700** | About 2.3× |
| **SAM 3.1 on every video frame** at **$0.20 per 1,000 frames** ([Meta pricing](https://dev.meta.ai/docs/pricing-rate-limits)) | About +₹44,500 (≈$259 per camera) | About 6× |
| **Default** (silence-cutting, Muse stack, edge video) | **≈₹8,450–9,150** | Baseline |
| **Lean** (self-hosted speech-to-text, cheap analysis model) | **≈₹1,850–3,900** | About 0.2–0.45× |

The cost model leaves some things out, so the real figure will be higher. It does not include the charging dock (about $5–15 per badge slot, estimated), installation visits, replacing lost or broken badges, customer support, security audits, or the engineering time a self-hosted model needs. There is also a one-time cost for a production injection mould for the badge case, about **$8,000–15,000 (₹6.9–12.9 lakh)** ([CoreLMould](https://cm-astro-landingpage.pages.dev/en/blog/injection-molding-costs-china-comparison)). Before about 1,000 units, 3D-printed or CNC cases are the cheaper route.

SaySo also pays cash up front. Five badges (₹10,750–17,250) plus an edge box (₹21,400 at US list, **₹30,000+ at Indian retail**) come to about **₹32,000–47,000 per store** before the first invoice. Indian buyers commonly pay in **60–120 days** ([eChai Ventures](https://echai.ventures/startingup/selling-enterprise/how-do-i-sell-into-a-big-indian-corporate-or-bank-when-they-expect-vendors-to-be-large-established-and-often-to-pay-for-access)). A 100-store rollout therefore ties up roughly ₹32–47 lakh in hardware.

## Five levers cut the store cost by half to four-fifths

Because speech-to-text dominates the bill, the levers that matter most all reduce how many hours are transcribed or how much each hour costs. Ranked by impact:

| Lever | What changes | Saving per store per month (estimate) | Trade-off |
|---|---|---|---|
| 1. Cut silence on the badge | Transcribe ~78 of 182 recorded hours | **~₹8,400** (versus no cutting) | Must catch quiet speech in a noisy store |
| 2. Self-host speech-to-text (Whisper or Meta Omnilingual on a rented GPU, **L4 at $0.80/hour** ([Modal](https://modal.com/pricing))) | ~$0.008–0.03 per audio hour instead of $0.18 | **~₹5,000–5,800** | Speaker separation and engineering on top; Hinglish accuracy untested |
| 3. Transcribe only customer conversations | Skip staff-to-staff chatter; e.g. 2 h/day instead of 3 | ~₹2,000–2,400 | Needs reliable "customer present" detection |
| 4. Cheaper analysis model (GPT-4o-mini at **$0.15 / $0.60** ([dev.to](https://dev.to/benchwright/llm-api-pricing-trends-q2-2026-who-got-cheaper-who-got-expensive-8hh))) | About ₹28 instead of ₹225 per badge | ~₹1,000 | Coaching quality must be checked |
| 5. Edge video, never per-frame SAM | Small YOLO-class detector in-store; SAM only on sampled walk-out clips | Avoids ~₹44,500 | Needs compatible store CCTV recorders |

One tempting lever should be avoided. Meta's "contributor" pricing is about 10× cheaper for analysis because Meta may train on the data ([Meta pricing](https://dev.meta.ai/docs/pricing-rate-limits)). Handing customers' recorded conversations to a model trainer would clash with the DPDP purpose rules and with retailers' contracts, so the budget should assume standard pricing. Hardware choices also affect running cost. Estimated battery draw of 45–80 mA means a **1,000 mAh** cell covers a shift and a 500 mAh cell does not. Recording to an SD card and uploading in batches should roughly double battery life compared with keeping Wi-Fi on all day, an estimate from datasheet currents ([Deneyap ESP32-S3 power data](https://docs.deneyapkart.org/en/Cards/Deneyap-Kart-v2/Power-Consumption-esp32-s3)).

## Charge ₹4,000 per store plus ₹3,000 per badge

Indian retail software is cheap. POS and CRM tools cost about **₹1,000–5,000 per outlet or user per month** ([Fitgap: Ginesys](https://us.fitgap.com/products/ginesys-pos); [SaaSTrac: Reelo](https://saastrac.com/?p=113073)). A flat ₹10,000 per store would barely cover SaySo's default costs and would lose money at jewellery-sized headcounts. Pricing per store plus per badge fixes both problems. The store fee covers video and the dashboard, and the badge fee tracks the main cost, so a 10-badge jewellery showroom pays for its own speech-to-text.

| Price part | Recommended | Market anchor |
|---|---|---|
| Store fee (video, walk-out alerts, dashboard) | **₹4,000/store/month** | Wobot ≈₹3,400/location; IndoAI ₹8,000–14,000/store |
| Badge fee (recording, transcripts, coaching) | **₹3,000/badge/month** | Convin ≈₹3,600–4,300/user; tolqAI ≈₹6,800/user |
| One-time setup | **₹10,000/store** (install, dock, signage, staff training) | Rilla/Siro charge $1,500–5,000; Indian vendors bill setup separately |
| Paid pilot | **50% off for 4–8 weeks, 3–10 stores**, converting to an annual contract | "Small paid pilot" with a budget owner ([eChai Ventures](https://echai.ventures/startingup/selling-enterprise/how-do-i-sell-into-a-big-indian-corporate-or-bank-when-they-expect-vendors-to-be-large-established-and-often-to-pay-for-access)) |
| Billing | Annual, paid in advance where possible | Common in India (Reelo, Zoho) |

**Margin math (gross margin = (price − running cost) ÷ price)**

| Store type | Badges | Monthly price | Default cost | Default margin | Lean cost | Lean margin |
|---|---|---|---|---|---|---|
| Eyewear | 3 | ₹13,000 | ₹5,310–6,020 | **54–59%** | ₹1,350–2,870 | **78–90%** |
| Electronics (typical) | 5 | ₹19,000 | ₹8,450–9,160 | **52–56%** | ₹1,850–3,910 | **79–90%** |
| Jewellery showroom | 10 | ₹34,000 | ₹16,300–17,010 | **50–52%** | ₹3,100–6,510 | **81–91%** |
| Pilot (5 badges, 50% off) | 5 | ₹9,500 | ₹8,450–9,160 | **4–11%** | ₹1,850–3,910 | 59–81% |
| No silence-cutting (warning case) | 5 | ₹19,000 | ₹16,900–17,600 | **7–11%** | n/a | n/a |

Default cost uses ₹1,570 per badge plus ₹600–1,310 per store for video and internet. Lean cost uses ₹250–520 per badge.

The default stack gives about 50% margin, which is workable for a start but thin for a software business that also funds hardware and field support. The lean stack reaches the 80%+ range investors expect. So the plan should be to launch on the Meta API for speed, then move speech-to-text in-house once volume justifies the engineering. Pilots are roughly break-even by design, so they are a sales cost, not a profit source.

The buyer's side of the math is harder. Entry-level associates earn about **₹10,000–15,000 a month** ([AmbitionBox](https://ambitionbox.com/profile/retail-store-associate-salary)). A ₹19,000 bill for a 5-person store is therefore roughly **25–32% of its frontline payroll**. That is why SaySo has to sell revenue gained, not hours saved. In an electronics store, ₹19,000 is less than the price of one average phone (≈₹24,000). If the retailer keeps about 10% of the sale price as margin (an assumption), SaySo pays for itself with about 8 extra phone sales a month, or 2 a week. Jewellery clears the bar faster. Titan reports that jewellery growth now comes from **bigger tickets more than more buyers** ([Upstox](https://upstox.com/news/market-news/stocks/titan-senco-gold-in-spotlight-on-strong-q4-updates-akshaya-tritiya-tailwinds-ahead/article-192162/)), so each lost walk-in costs more every quarter. Attrition supports the pitch too. Consumer-durables staff turn over at **66–71% a year** ([BusinessWorld/TeamLease](https://businessworld.in/article/employee-attrition-remains-big-challenge-in-concumer-durable-market-521776)), so classroom training keeps walking out the door, while always-on coaching does not.

## Customer audio needs consent, and DPDP duties apply from May 2027

India's DPDP Rules were notified on **13 November 2025** and phase in over 18 months. The core duties (notice, consent, security, breach reporting, retention) apply from about **13 May 2027**. Until then the older SPDI Rules 2011 still apply ([Storyboard18](https://www.storyboard18.com/digital/breaking-govt-notifies-final-dpdp-rules-sets-staggered-rollout-with-key-obligations-for-data-fiduciaries-84201.htm); [Mondaq](https://www.mondaq.com/india/privacy-protection/1708830/dpdp-act-compliance-mandate)). SaySo would sign its first annual contracts inside this window, so contracts written now must already meet the 2027 rules.

The roles are simple. The retailer runs the store, so it is the **Data Fiduciary** (the party responsible). SaySo is its **Data Processor**. Both CCTV and voice recordings are personal data, and every step, from recording to sending files to a vendor, counts as processing ([MediaNama](https://www.medianama.com/dpdp)). Employees and customers are treated very differently.

| Person | Legal basis | What SaySo must do |
|---|---|---|
| **Employees** | "Employment purposes" legitimate use (s.7(i)); it does not cover every kind of monitoring ([Bar & Bench](https://www.barandbench.com/view-point/navigating-legitimate-use-exemption-employee-data-digital-personal-data-protection-act-2023)) | Written policy in the HR handbook; state the purpose as coaching, not discipline; no recording in break areas or restrooms |
| **Customers** | **Consent** (no legitimate-use route fits store coaching) | Entry signage plus a spoken consent line; stop recording if the customer declines |
| **Customers on CCTV** | Individual consent is "not feasible"; entry-point notices are the practical route ([MediaNama](https://www.medianama.com/dpdp)) | Signage with purpose, operator, retention period and a QR link ([StudioMatrx](https://www.studiomatrx.org/guides/cctv-signage-india)); blur faces |

Customer audio is the biggest legal risk. Signage gives notice, but whether a sign counts as valid consent is untested in Indian law. Indian courts have also been hostile to secret recordings. The Chhattisgarh High Court held that recording a call without the other person's knowledge violates the right to privacy ([TaxGuru](https://taxguru.in/corporate-law/secret-phone-call-recording-violates-privacy-chhattisgarh-hc.html)). Penalties go up to **₹250 crore for weak security** and **₹200 crore for failing to report a breach** ([Konfirmity](https://www.konfirmity.com/blog/dpdp-penalties)).

| Requirement | Practical design |
|---|---|
| Plain-language standalone notice ([Mondaq](https://www.mondaq.com/india/data-protection/1706890/a-closer-look-at-the-dpdp-rules-2025)) | Store signage plus QR-linked notice listing data, purposes and how to withdraw |
| Visible, non-covert recording | Badge LED while recording; staff mute button; a script such as "this chat may be recorded for training, okay?" |
| Data minimisation | Delete raw audio within 24–72 hours of transcription; strip names, phone numbers and amounts from transcripts |
| Video | Process on the in-store box; send only events (walk-outs, wait times) to the cloud; blurred footage is no longer personal data ([MediaNama](https://www.medianama.com/dpdp)) |
| Security | Encryption, access controls, **access logs kept at least 1 year** |
| Breach reporting | Notify the retailer within hours so it can meet the Board's **72-hour** detailed-report deadline |
| Contracts | A data processing agreement naming the retailer as fiduciary and SaySo as processor |
| Hosting | India region (AWS/GCS Mumbai); not mandatory, but cheap insurance against future transfer limits on large chains |

Two legal questions remain open. Voiceprints may count as "sensitive personal data" under the SPDI Rules, which would require **written** consent during the transition. No Indian ruling covers wearable audio recorders in shops specifically. A formal opinion from an Indian privacy firm before the first paid pilot is cheap compared with the downside.

## Six risks could break the business case

| Risk | Why it matters | How bad | What to do |
|---|---|---|---|
| **Customer-consent friction** | If many customers decline or signage is ruled insufficient, the audio half loses data or becomes unlawful | High | Get a legal opinion; measure opt-out rates in pilots; keep video-only walk-out analytics as a fallback |
| **Cost assumptions are unproven** | The 3 h/day speech figure, token counts and Hinglish accuracy are all estimates; no independent Hindi/Hinglish accuracy test exists at these prices | High | Benchmark accuracy and real speech-hours in the first pilot before quoting a price |
| **Borentis and funded US players** | Borentis already targets the same segments; Rilla and Siro have the capital to enter India | Medium-high | Lead with audio-plus-video walk-out diagnosis, which no one sells; sign one anchor chain fast |
| **Slow sales and cash drain** | 3–9 month sales cycles ([eChai](https://echai.ventures/startingup/selling-enterprise)), 60–120 day payments, and ₹32–47K hardware per store up front | Medium-high | Setup fee, annual prepay, start in small Apple-partner or jewellery chains that decide fast |
| **ROI is unproven** | Every uplift figure found is a vendor claim: Rilla's 40% close-rate lift ([Komo](https://komo.ai/directory/rilla)), Agrex's 32% at Bata ([Agrex](https://www.agrexai.com/what-is-retail-video-analytics/)) | Medium | Run pilots with control stores and publish SaySo's own before/after numbers |
| **Staff pushback and hardware** | Staff may resent being recorded; battery and Wi-Fi behaviour are not yet measured; Indian SaaS rollouts overrun timelines by **57%** on average ([Financial Express/Zoho-IDC](https://www.magzter.com/nl/stories/newspaper/Financial-Express-Pune/75-OF-INDIAN-BUSINESSES-GRAPPLE-WITH-SAAS-ROLLOUT-DELAYS)) | Medium | Position as coaching with staff-visible scores and rewards; measure power with a profiler before ordering a production mould |

Several inputs are thin and should be checked before any investor deck: staff-per-store numbers (assumed, not sourced), the current organized-retail share, segment ticket sizes for jewellery and cars, and the price Borentis actually charges.

## Conclusion

The cost surprise is real, but it comes almost entirely from one line, speech-to-text, and that line responds to engineering. The most important decision is not the price. It is cutting silence on the badge and later moving transcription in-house, which together move SaySo from a roughly 10% margin trap to an 80%+ software business. Pricing per badge, not per store, then keeps large jewellery showrooms profitable instead of loss-making.

The strategic picture has also changed since the Discord scan. SaySo is not first to Hinglish in-store audio, because Borentis is there. SaySo's defensible story is narrower and stronger: video shows which customers walked out, and audio explains why. The next step should be a paid 4–8 week pilot in a small jewellery or Apple-partner chain, designed to produce three numbers no one has published: real speech-hours per badge, customer opt-out rate, and conversion change against control stores. Those three numbers will settle the business case more than any further desk research.
