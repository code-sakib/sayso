# SaySo US Unit Costs (cost-per-store and go-to-market inputs)

Research date: 2026-10-28. All prices USD. "EST" marks my own estimate or arithmetic, not a sourced number. Many figures come from secondary or vendor blogs and are flagged that way; primary vendor pricing pages were fetched where possible (Deepgram, OpenAI, Modal, Seeed).

Reference US usage scenario used in the inferences (EST, adjust in model): 8 badges per store, 9 h shifts, about 4 h/day of speech per badge after silence cutting, 30 days open. That gives 8 x 4 x 30 = **960 speech-hours per store per month**. The India baseline was 5 x 3 x 26 = 390 h.

## 1. Speech-to-text prices per audio hour (English/Spanish, diarization) and self-hosting

### Takeaway
Batch English/Spanish ASR with diarization now costs about $0.17-$0.36 per audio hour from the cheap API vendors (AssemblyAI, Deepgram, OpenAI, Google dynamic batch). Meta's $0.18/h is in that band. AWS Transcribe costs about $1.44/h, 5-8x more. Self-hosted Whisper-class models on Modal GPUs probably run a few cents per audio hour of compute (EST), but you then pay for engineering time and run diarization yourself.

### Cited Findings
- **Deepgram (official page, no effective date shown):** Pre-recorded Nova-3 Monolingual is $0.0043/min PAYG and $0.0036/min Growth. Pre-recorded Nova-3 Multilingual (covers EN/ES code-switching) is $0.0052/min PAYG and $0.0043/min Growth. Pre-recorded Whisper Large is $0.0048/min. Diarization is **included** for pre-recorded and +$0.0020/min for streaming. Streaming rates are labelled "limited-time promotional". New accounts get $200 free credit. — [Deepgram pricing](https://deepgram.com/pricing); free credit from [Activepieces](https://www.activepieces.com/blog/deepgram-pricing-2026-per-minute-rates-and-add-ons)
  - Per hour, that is $0.26/h (mono PAYG), $0.31/h (multilingual PAYG) and $0.26/h (multilingual Growth). Other blogs quote $0.0059-$0.0092/min, probably older snapshots. — [Soniox vs Deepgram](https://soniox.com/pricing/stt/soniox-vs-deepgram)
- **AssemblyAI (official pricing reference):** Async Universal-3.5 Pro is $0.21/h and Universal-2 is $0.15/h. Async diarization adds $0.02/h (standard) or $0.065/h (experimental tier for many speakers or noisy audio). Streaming diarization adds $0.12/h. — [AssemblyAI pricing.md](https://www.assemblyai.com/pricing.md)
  - A Q1 2026 snapshot shows a 22% cut to the flagship price at the Universal-3 Pro rebrand. — [PricingSaaS diff](https://pricingsaas.com/companies/assemblyai/diffs/2026Q1)
- **OpenAI (official page):** Whisper is $0.006/min, gpt-4o-transcribe $0.006/min, gpt-4o-mini-transcribe $0.003/min and **gpt-4o-transcribe-diarize $0.006/min ($0.36/h)**. — [OpenAI API pricing](https://developers.openai.com/api/docs/pricing)
- **AWS Transcribe batch (secondary source):** Tiered at $0.024/min for 0-250K min/month ($1.44/h), $0.015 for 250K-1M, $0.0102 for 1M-5M and $0.0078 above 5M. One source gave $0.006/min, which looks like an error. — [convertaudiototext](https://convertaudiototext.com/blog/speech-to-text-api-pricing-2026)
- **Google Cloud Speech-to-Text V2:** Standard is $0.016/min ($0.96/h) for the first 500K min/month. Chirp **dynamic batch** recognition is $0.003/min ($0.18/h). — [Google STT pricing](https://cloud.google.com/speech-to-text/pricing)
- **Modal GPU (official page):** T4 $0.59/h, L4 $0.80/h, A10 $1.10/h, L40S $1.95/h, A100-40GB $2.10/h, A100-80GB $2.50/h, H100 $3.95/h, all billed per second. CPU is about $0.047 per physical core-hour. Starter plan includes $30/month free compute and Team plan $100/month. A startup credits program exists but the page gives no amount. — [Modal pricing](https://modal.com/pricing)

### Inferences
- EST cost for 960 speech-hours per store per month:
  - AssemblyAI U-2 + diarization ($0.17/h): about **$163**
  - Meta Muse Voice Transcribe ($0.18/h): about $173
  - Google Chirp dynamic batch ($0.18/h): about $173 (diarization support not verified)
  - OpenAI mini-transcribe ($0.18/h): about $173, with no diarization
  - AssemblyAI U-3.5 Pro + diarization ($0.23/h): about $221
  - Deepgram Nova-3 Multilingual PAYG ($0.31/h): about $300
  - OpenAI gpt-4o-transcribe-diarize ($0.36/h): about $346
  - AWS Transcribe tier 1 ($1.44/h): about $1,382
  - India baseline at 390 h and $0.18/h: about $70
- EST self-hosting: faster-whisper large-v3 on an L4 commonly runs tens of times faster than real time. If it achieves 30-60x, compute is about $0.013-$0.027 per audio hour ($13-$26 per store per month), before diarization (pyannote), idle and cold-start overhead, and engineering time. This throughput is not sourced; benchmark it.
- Batch processing of recorded audio is enough for coaching, so streaming premiums can be ignored.

### Gaps
- Meta Muse Voice Transcribe: I did not verify US availability, diarization support or Spanish quality.
- No sourced Whisper/Omnilingual throughput (x real-time) on Modal or Lambda GPUs. Lambda Cloud prices were not retrieved.
- Spanish/English code-switching accuracy (WER) by vendor was not researched.
- AWS and Google figures were not confirmed on their own pricing pages.

## 2. LLM analysis cost alternatives

### Takeaway
Cheap 2026 models (gpt-5-nano, gpt-4.1-nano, Gemini Flash-Lite, DeepSeek V4 Flash) cost $0.05-$0.14 per million input tokens. That makes transcript analysis about $1-$5 per store per month, against roughly $20 on Muse Spark. LLM cost is small next to ASR.

### Cited Findings
- **OpenAI (official page):** gpt-5-nano is $0.05 in / $0.40 out per 1M tokens; gpt-5-mini $0.25 / $2.00; gpt-4.1-nano $0.10 / $0.40; gpt-4.1-mini $0.40 / $1.60. The Batch API halves each rate. — [OpenAI API pricing](https://developers.openai.com/api/docs/pricing)
- **Gemini 2.5 Flash-Lite:** $0.10/1M text input, $0.50/1M audio input and $0.40/1M output at GA (July 2025). I did not confirm that these are still current. — [Simon Willison](https://simonwillison.net/2025/Jul/22/gemini-25-flash-lite); [MorphLLM Gemini pricing](https://www.morphllm.com/gemini-api-pricing)
- **DeepSeek:** First-party API now serves deepseek-v4-flash at $0.14/1M input (cache miss) and $0.28/1M output. The legacy deepseek-chat alias was deprecated on 2026-07-24. US enterprise buyers may object to a China-hosted API. — [MorphLLM DeepSeek](https://www.morphllm.com/deepseek-api)
- **Meta Muse Spark:** $1.25/$4.25 per 1M tokens (given in the brief, not re-verified).

### Inferences
- EST token volume: about 150 words/min of speech is about 9K words, or about 12K tokens, per speech-hour. At 960 h that is about 11.5M input tokens per store per month. Assume output is 10% of input (1.15M).
  - Muse Spark: about $19.3/store/month
  - gpt-5-mini: about $5.2
  - gpt-4.1-nano: about $1.6
  - gpt-5-nano: about $1.0; with Batch API about $0.5
- A two-tier design keeps LLM cost below 5% of ASR cost: a nano model for tagging/scoring and a mid model only for the weekly coaching summary.

### Gaps
- Prompt and system-token overhead per call, and the quality of nano models on Spanish sales coaching, were not tested.

## 3. Hardware: US landed BOM, tariffs and lithium shipping

### Takeaway
The XIAO ESP32S3 Sense retails at $13.90. Chinese-origin electronics now carry Section 301 duties of 7.5-25% by list, plus a new 12.5% Section 301 layer from 24 Jul 2026. Non-EV Li-ion batteries rose to 25% under Section 301 on 1 Jan 2026. The IEEPA "reciprocal" and fentanyl tariffs were struck down on 20 Feb 2026, and refunds are under way. The Jetson Orin Nano Super is now **$399, not $249**.

### Cited Findings
- **XIAO ESP32S3 Sense:** $13.90 on Seeed's store. The page lists 1 pc, 3 pcs and Tape & Reel options with no tier pricing; bulk is by quote. The Pi Hut sells it at £13.50. — [Seeed product page](https://www.seeedstudio.com/XIAO-ESP32S3-Sense-p-5639.html); [The Pi Hut](https://thepihut.com/products/seeed-studio-xiao-esp32s3-sense)
- **Jetson Orin Nano Super Dev Kit:** NVIDIA raised it from $249 to $399 in July 2026 with no announcement. Other Jetson price increases reached up to 101%. — [CNX Software](https://www.cnx-software.com/2026/07/22/nvidia-increases-the-price-of-jetson-modules-and-devkits-by-up-to-101/); [HWBusters](https://hwbusters.com/news/nvidia-jetson-prices-jump-up-to-101-the-249-orin-nano-super-is-now-399/); [JetsonHacks Aug 2026](https://jetsonhacks.com/2026/08/26/jetsonhacks-august-2026-newsletter/)
- **IEEPA tariffs voided:** The Supreme Court struck down the IEEPA fentanyl and reciprocal tariffs on 20 Feb 2026, and CBP is refunding them. — [Gatewaylines](https://gatewaylines.com/press-releases/complete-guide-to-section-301-china-tariffs-in-2026); [Wipfli on refunds](https://www.wipfli.com/insights/articles/ieepa-tariff-refunds-the-recent-cit-ruling-and-section-122-updates)
- **Section 122 bridge:** A temporary global surcharge of 10% (some sources say it was raised to 15%) applied from 24 Feb 2026 and expired on 24 Jul 2026. — [Wipfli](https://www.wipfli.com/insights/articles/section-122-tariffs-10-now-15-may-be-next); [UHY](https://uhy-us.com/insights/news/2026/february/voided-tariffs-replaced-with-section-122-tariffs-rates-broadly-applied-at-15)
- **New 12.5% Section 301 duty on China:** In effect from 24 Jul 2026 under heading 9903.05.31, stacking on other duties. This is secondary-source reporting. — [Airlift USA](https://airliftusa.com/tariff-updates/china); [Portless](https://www.portless.com/blogs/section-301-tariffs-china)
- **Existing Section 301 lists remain:** Lists 1-3 at 25% and List 4A at 7.5%. USTR's 7 Oct 2026 notice kept the 2018 actions unchanged. 178 exclusions expire on 9 Nov 2026 unless extended. — [HTSBase](https://htsbase.com/blog/section-301-china-tariffs-2026); [Suan Supply](https://suansupply.com/news/section-301-tariffs-china-continue-2026/); [Gatewaylines](https://gatewaylines.com/press-releases/complete-guide-to-section-301-china-tariffs-in-2026)
- **Batteries and chips (2024 four-year review):** Non-EV Li-ion batteries went from 7.5% to 25% on 1 Jan 2026. Semiconductors (HTS 8541/8542) went to 50% on 1 Jan 2025. — [Mayer Brown](https://www.mayerbrown.com/en/insights/publications/2024/05/ustr-finalizes-4year-review-of-section-301-tariffs-on-imports-from-china-increasing-tariffs-on-clean-energy-supply-chains)
- **Consumer electronics:** List 4B (phones, laptops) was never activated. — [stcatzlee tariff blog](https://tariffschart.stcatzlee.workers.dev/blog/section-301-china-tariffs-2026)
- **Lithium shipping:** "UN3481 Lithium ion batteries packed with (or contained in) equipment" requires batteries to be fully enclosed in non-metallic inner packaging. 49 CFR 173.185(c) sets the small-battery exceptions. PHMSA allows the UN3481 name for domestic ground shipments. — [J.J. Keller](https://jjkellercompliancenetwork.com/institute/shipping-lithium-batteries-by-ground); [PHMSA interpretation](https://www.phmsa.dot.gov/sites/phmsa.dot.gov/files/legacy/interpretations/Interpretations/2011/110056.pdf)

### Inferences
- EST landed badge BOM at prototype quantity: XIAO $13.90; 1000 mAh LiPo about $3-5; microSD 32 GB about $4-6; button, LED and passives about $1; printed case about $3-8 (in-house at volume, about $1-2 injection-molded once a mold costing about $3-10K exists). Total is roughly **$25-35** before duty and freight. At 1K-10K units with a custom PCB (ESP32-S3 module + PDM mic + charger) instead of the XIAO, EST **$12-20** before duty. These component prices are unsourced estimates; get quotes from Seeed Fusion, JLCPCB and others.
- EST duty stack on China-origin assembled badge: MFN (often 0-2.6% for 8517/8543 lines) + Section 301 list rate (0-25% depending on HTS) + 12.5% new Section 301. That is about **12.5-40%**. A loose Li-ion battery could see 3.4% MFN + 25% + 12.5%, about 41%. Classification decides this; get a customs broker ruling.
- Mitigation: final assembly outside China (Vietnam, India, Mexico) avoids the China-specific Section 301 layers. The Section 122 global surcharge has lapsed.
- At $399 the Jetson edge box makes cloud SAM (about $0.20 per 1K frames) relatively more attractive for low-frame-rate sampling.

### Gaps
- No sourced US bulk prices for the XIAO, the LiPo cell or the microSD card.
- Exact HTS classification and duty rate for the badge were not determined.
- FedEx/UPS/USPS carrier-specific lithium rules were not retrieved. USPS Pub 52 permits ground shipping of small lithium batteries inside or packed with equipment with conditions; verify directly.

## 4. US certification: FCC, battery safety, UN38.3

### Takeaway
With a pre-certified radio module, the XIAO's or Espressif's own modular grant covers the radio. Expect **$2.5K-$10K and 3-6 weeks** for host-device FCC work. A custom RF design is $8K-$30K. Battery: UN38.3 is required to ship (typically supplied by the cell vendor; own testing $1.5K-$7K). UL 2054 / IEC 62133 is not legally mandatory, but retailers' procurement and insurers often ask for it, at $6K-$20K and 6-12 weeks.

### Cited Findings
- **Pre-certified module path:** Host unintentional-emissions testing (Part 15B) is $1,500-$3,000, TCB processing $500-$1,500 and documentation $500-$1,000, a total of $2,500-$5,500. — [MarkReady FCC cost](https://markready.pages.dev/guides/fcc-certification-cost)
  - A broader estimate for IoT with a pre-certified module is $3K-$10K over 3-6 weeks. — [Hubble guide](https://hubble.com/community/guides/how-using-a-pre-certified-wireless-module-simplifies-your-fcc-path/)
- **Custom RF / intentional radiator:** $8K-$20K+ in one source and $15K-$30K for multi-radio designs. Intentional-radiator testing alone is $10K-$30K+. — [MarkReady](https://markready.pages.dev/learn/fcc-certification-cost); [Compliance Testing](https://compliancetesting.com/fcc-certification-faqs/fcc-certification-cost/)
- **FCC fees and SAR:** The FCC grantee code is about $40. Body-worn devices may need SAR evaluation, which affects lab quotes. — [MarkReady](https://markready.pages.dev/guides/fcc-certification-cost)
- **Battery certifications (vendor blog):** UN38.3 $5K-7K over 4-6 weeks, IEC 62133 $6K-10K over 6-8 weeks, UL $15K-20K over 10-12 weeks. — [Ufine Battery](https://www.ufinebattery.com/blog/essential-guide-to-battery-certification-types-costs-timeframes-and-standards)
- **UL 2054 (older Avnet quote):** $20,000 per model, plus about $850 per quarterly factory audit and about $1,500/yr file fee. Requires the cell to be UL 1642 listed. Same document lists UN38.3 at $1,500 per model. — [Avnet/EBM PDF](https://www.rgbautomatyka.pl/de/p/file/960/55444.50000__EBM_PAPST_88_3_4.pdf)
- A change of supplier can trigger UN38.3 retest. — [Alibaba seller guide](https://seller.alibaba.com/blogs/2026/southeast-asia/battery-industry/lithium-battery-export-certification-guide-ul-ce-un383-alibaba-b2b)

### Inferences
- EST cheapest compliant path: buy a LiPo cell that already has UN38.3, IEC 62133 and UL 1642 documents from the supplier (cost about $0 extra), then run FCC 15B host testing with the ESP32-S3 modular grant. One-time certification budget is about **$5K-$15K**. Add $15K-$25K if a retailer requires end-product UL 62368-1 or UL 2054 listing.
- The XIAO's grant conditions and body-worn RF exposure rules need checking; a SAR or MPE exemption is likely at low Wi-Fi power but is not confirmed.

### Gaps
- No quote for UL 62368-1 (audio/IT equipment safety) on the finished badge.
- I did not confirm that the XIAO ESP32S3 Sense holds an FCC modular grant usable by a host product (Seeed lists FCC certification; verify the FCC ID).

## 5. Cloud storage, US hosting, SOC 2, insurance

### Takeaway
SOC 2 Type II is the big fixed cost. Budget **$30K-$110K in year one, 6-12 months**, with a Type I as a bridge. Cyber plus tech E&O for a seed startup is about **$3K-$7K/yr**, rising to $10K+ when enterprise contracts demand higher limits. Raw storage is cheap if audio is deleted after transcription.

### Cited Findings
- **SOC 2 cost:** A first Type II for a 10-200 person startup is $30K-$110K all-in (platform, auditor, internal labour, remediation, pentest). The audit fee itself is only 30-40% of total spend. Year one usually falls in the $25K-$80K range. — [Scrut](https://www.scrut.io/soc-2/cost-of-soc-2-audit); [Petronella](https://petronellatech.com/blog/soc-2-compliance-cost-in-2026-what-startups-actually-pay); [GetAgency](https://blog.getagency.com/articles/soc-2-audit-cost-for-startups)
- **SOC 2 timeline:** Type II takes 6-12 months end to end. The observation window is at least 3 months, and many enterprise buyers want 6. Type I takes 3-6 months, with auditor fees quoted at $5K-$15K (one source) or $15K-$50K (others). — [Beancount SOC 2 guide](https://beancount.io/blog/2026/05/11/soc-2-type-ii-saas-startups-trust-services-criteria-audit-cost-six-month-observation-window-first-examination-guide); [Wolfia](https://wolfia.com/blog/soc-2-compliance-requirements-complete-guide)
- **Insurance medians (Vouch):** Tech E&O $3,700/yr and cyber $2,900/yr. — [Vouch](https://www.vouch.us/blog/start-up-insurance-costs-how-much-to-pay)
- **Insurance averages (TechInsurance):** For SaaS, E&O is $1,094/yr ($1M/$1M limits, $2,500 deductible) and cyber $1,837/yr. — [TechInsurance](https://www.techinsurance.com/technology-business-insurance/saas-companies/cost)
- **Insurance ranges:** Early-stage cyber is $1.8K-$5K/yr, rising to $10K-$12K as customer contracts demand more coverage. — [Corgi](https://corgi.insure/blog/startup-insurance-cost-by-stage)

### Inferences
- EST storage: Opus audio at 16 kbps is about 7.2 MB per hour. 960 h is about 7 GB per store per month. At S3 Standard's roughly $0.023/GB-month list price, retaining 3 months costs well under $1 per store per month. The S3 price is from memory and was not verified this session. Video thumbnails and frames would dominate if retained.
- EST US hosting (API, DB, queue) for the first 50-100 stores: a few hundred to about $1-2K per month in total. This is not sourced.
- Audio of employees and customers is sensitive data. Expect buyers to require SOC 2, DPA terms and higher cyber limits ($2-5M).

### Gaps
- Vanta or Drata platform list prices were not retrieved (they are typically quote-based).
- Official S3 and Glacier prices were not fetched.

## 6. Go-to-market costs: CAC, sales salaries, field visits, gross margin

### Takeaway
Plan for a US SDR at about **$55-60K base / $80-88K OTE** and a mid-market AE at about **$160-220K OTE**. Benchmarked CAC payback is 8-12 months for SMB deals (<$15K ACV) and 14-18 months for mid-market. A store truck roll costs $150-$500 direct and about $1,000 fully loaded. Samsara, the best public hardware-enabled SaaS comp, runs at about 77% gross margin.

### Cited Findings
- **SDR pay:** Median base $55-60K and OTE $80K (Bridge Group 2025) to $88K (RepVue, Oct 2026). — [Bitscale](https://bitscale.ai/blogs/sdr-salary)
- **AE pay:** SaaS AE median OTE about $195K at roughly a 50/50 split. Mid-market is $160-220K and enterprise $230-270K+. The 2024 median was $190K at 53:47. — [Optymyze](https://optymyze.com/blog/sales-compensation-benchmarks/); [Everstage](https://everstage.com/sales-compensation/sales-compensation-statistics)
- **CAC payback:** The KeyBanc/Sapphire 2025 survey (16th edition, Nov 2025) reports renewed growth. By segment (Benchmarkit 2025 via secondary source), SMB under $15K ACV is 8-12 months, mid-market 14-18 months and enterprise over $100K ACV 18-24+ months. — [Sapphire/KeyBanc survey](https://info.sapphireventures.com/2025-keybanc-capital-markets-sapphire-ventures-saas-survey); [ScaleXP](https://www.scalexp.com/blog/saas-benchmarks-cac-payback/)
- **Truck roll:** $150-$500 direct per visit (vendor rule of thumb) and about $1,000+ fully loaded (TSIA, cited secondhand). Fiber operators run $150-$300 per roll. Aquant 2025 puts the median avoidable dispatch rate at 14%. — [Smarty](https://www.smarty.com/articles/truck-roll-costs); [Blitzz](https://blitzz.co/blog/the-real-cost-of-a-truck-roll-and-how-to-avoid-it); [Ventavid](https://www.ventavid.com/blog/reduce-truck-rolls)
- **Samsara gross margin:** About 76.6-76.9% (TTM, quarter to Oct 2025), up from about 71% in 2022. 3-5 year contracts amortize the hardware. — [AlphaQuery](https://www.alphaquery.com/stock/IOT/fundamentals/quarterly/gross-margin); [Macrotrends](https://macrotrends.net/stocks/charts/IOT/samsara/gross-margin); [CFO Dive](https://www.cfodive.com/news/how-samsara-achieves-high-margins-despite-hardware-costs/616498/)

### Inferences
- EST fully loaded rep cost (pay plus about 20-25% benefits, payroll tax and tools): about $100-110K/yr for an SDR and $200-250K for an AE.
- EST install visit: SaySo badges ship by mail, but a first on-site setup (Wi-Fi, charging dock, camera hookup, staff consent briefing) costs about $300-$600 per store using a contractor or field-services marketplace. Shift this to remote onboarding where possible.
- EST target: 65-75% blended gross margin once hardware is amortized over 24-36 months, in line with the Samsara comp.

### Gaps
- No sourced blended CAC in dollars for retail-tech SaaS. Verkada and Toast gross margins were not retrieved.
- Field-services marketplace rates (e.g. Field Nation, WorkMarket hourly) were not retrieved.

## 7. US retail SaaS pricing benchmarks (per store / seat per month)

### Takeaway
US frontline workforce tools charge about **$25-$150 per location per month**. Sales conversation-intelligence tools (Gong) charge about **$100-$200 per seat per month** plus platform fees. That brackets SaySo between workforce-tool prices (per store) and Gong-like prices (per seat).

### Cited Findings
- **Homebase (per location/month):** Basic $0, Essentials $24 annual / $30 monthly, Plus $56 / $70, All-in-One $96 / $120. Payroll adds a $39-49 base fee plus $6 per employee. — [Capterra Homebase](https://capterra.com/p/153076/Homebase/pricing/); [Homebase vs 7shifts](https://www.joinhomebase.com/compare/homebase-vs-7shifts)
- **7shifts (per location/month, after 2025 rename):** Essentials $44.99, Pro $89.99, Premium $149.99. Older listings show $34.99, $76.99 and $150. — [Turnozo](https://turnozo.com/blog/turnozo-vs-homebase-vs-7shifts); [Beancount guide](https://beancount.io/blog/2026/10/03/homebase-vs-7shifts-vs-when-i-work-scheduling-software-2026-guide)
- **Gong (third-party estimates; Gong does not publish prices):** About $1,200-$2,400 per seat per year, plus a $5K-$50K/yr platform fee and about $7.5K onboarding. The median contract is about $55K/yr. — [coworker.ai](https://coworker.ai/blog/gong-pricing); [RaftLabs](https://www.raftlabs.com/blog/gong-pricing); [SpotSaaS](https://www.spotsaas.com/blog/gong-pricing)

### Inferences
- EST pricing anchor: $30-$60 per badge per month (or $250-$500 per store per month for 8 badges) would sit far below Gong per seat and above per-location workforce tools.
- EST cost per store at 960 h: about $163-$221 ASR + $1-20 LLM + about $25-50 for amortized badges (8 badges at about $100-150 each over 24-36 months) + cloud vision or edge box. At $400/store/month, gross margin is about 45-55%, which is below the SaaS target. Margin rises substantially with self-hosted ASR (about $15-30/month) or speech-only recording windows.

### Gaps
- Square for Retail, Lightspeed and Shopify POS per-location prices were not retrieved.
- No prices found for retail-specific sales coaching tools (e.g. retail clienteling or frontline coaching apps).
