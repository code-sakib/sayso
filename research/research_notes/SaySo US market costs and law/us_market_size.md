# SaySo US Market Size and Segment Fit (in-store sales-conversation coaching + CCTV walkout analytics)

Research date: 2026-10-28. All figures US-only. The year of each figure is given in brackets. Anything marked **[ESTIMATE]** is my calculation or assumption, not a sourced number. Research was capped at about 25 tool calls. The Census API needs a key, so County Business Patterns establishment counts by NAICS could not be pulled; those are listed as gaps.

## 1. US retail sales total and number of retail establishments

### Takeaway
US retail (NAICS 44-45) was about $7.0T in 2022 (latest Census annual total found). Retail and food services grew 3.7% in 2025. NRF counts about 4.6M retail "establishments" supporting 55M jobs (2022 data), but that is a broad NRF definition, not a Census CBP count.

### Cited Findings
- US retail sales (NAICS 44-45) were $7,041.0B in 2022, up 8.0% from 2021 (Census Annual Retail Trade Survey, released Jan 2024) — [Census ARTS press release](https://census.gov/newsroom/press-releases/2024/annual-retail-trade-survey.html)
- Total 2025 retail and food services sales rose 3.7% (±0.4%) from 2024 (Census advance estimate). December 2025 advance sales were $735.0B, flat month over month — [Census retail sales](https://www.census.gov/retail/sales.html); republished by [trade.gov.tr](https://trade.gov.tr/news/u-s-retail-sales-unchanged-mom-in-december-2025)
- NRF's narrower "core" retail measure: $5.29T in 2024 (excludes autos, gas and restaurants; a different definition from Census 44-45) — cited via [grabon.com aggregator](https://grabon.com/blog/retail-statistics/) (secondary; verify at nrf.com)
- NRF/PwC: retail supports 55M jobs across more than 4.6M establishments. That is 32.2M direct and 22.8M indirect/induced jobs, about 26% of US employment (2022 data, published 2024) — [Vision Monday on NRF report](https://visionmonday.com/business/research-and-stats/article/the-retail-industry-supports-55-million-full-and-parttime-jobs-nrf-report-says/); [NRF State of Retail 2024](https://nrf.com/blog/highlights-nrfs-2024-state-retail-consumer)
- Census County Business Patterns (2022 release, June 2024) gives establishment counts, employment and payroll for about 1,000 NAICS industries — [Census CBP press release](https://census.gov/newsroom/press-releases/2024/county-business-patterns.html). Jewelry retail is NAICS 458310 under 2022 NAICS (was 448310) — [World of Taxonomy](https://www.worldoftaxonomy.com/codes/naics_2022/458310)

### Inferences
- The 4.6M NRF "establishments" figure is far above Census CBP employer-establishment counts. It likely includes nonemployer and retail-adjacent units. Do not use it as the count of physical stores with salespeople. For a TAM headline, use the salesperson seat count (section 3) instead.
- **[ESTIMATE]** 2025 retail and food services is about $8.4–8.5T. Census reports roughly $8.1–8.2T for 2024, and that 2024 figure is from my memory, not verified in this session. Confirm at census.gov/retail before citing.

### Gaps
- Census CBP 2022/2023 employer-establishment counts for NAICS 44-45 and for sub-codes: furniture 449110, electronics/appliance 449210, jewelry 458310, optical goods 456130, car dealers 441110, home centers 444110, floor covering 449121. The Census API returned "Missing Key", so these were not retrieved. Get them from data.census.gov (CBP table CB2200CBP) with a free API key. This is the single most important gap for store-count TAM.
- No Census annual (ARTS) 2023 or 2024 dollar total was retrieved.

## 2. Store counts for high-ticket, advice-led segments

### Takeaway
The largest sourced store pools are franchised car dealers (16,990), jewelry retailers (about 17,100), Top-50 optical (about 16,500 locations) and mattress (2,300+ Mattress Firm, 500+ Mattress Warehouse). Concentrated chains such as Signet (2,238 US), Mattress Firm and Best Buy (926 US) are enterprise targets. Independents are the long tail.

### Cited Findings
**Car dealerships**
- 16,990 franchised light-vehicle dealers (full-year 2025). The mid-year 2025 report had 16,972 — [NADA Data](https://www.nada.org/NADAdata); [NADA Data PDF](https://www.nada.org/media/4694)
- Dealership employment was 1.13M in 2024, the highest since 2019. The typical store has 65 employees. Average weekly earnings were $1,897 and the median was $1,463 (2024) — [CBT News on NADA Data](https://www.cbtnews.com/franchised-dealership-employment-hits-pre-pandemic-levels-in-2024-nada-reports/)
- Cox Automotive 2025 Car Buyer Journey: total buying time was just under 14 hours (about 20 minutes less than 2024). New buyers spent about 30 fewer minutes at the dealership. New-buyer dealership satisfaction was 81% — [Digital Dealer on Cox study](https://digitaldealer.com/news/efficiency-digital-tools-and-ai-drive-car-buyer-satisfaction-to-record-highs-cox-automotive-study-finds/169157/)
- 63% of buyers say an omnichannel blend is ideal, but about half still complete the whole purchase in person (Cox data) — [Cox Deal Central](https://www.coxautoinc.com/deal-central/resources/deal-central-insider-july-2026/)

**Jewelry**
- Signet Jewelers had 2,238 US locations and 91 in Canada (2,329 North America; 2,582 total) as of Jan 31, 2026. Brands include Kay, Zales, Jared, Banter/Piercing Pagoda and Diamonds Direct — [Signet FY2026 10-K](https://www.sec.gov/Archives/edgar/data/832988/000083298826000055/sig-20260131.htm)
- North America went from 2,379 to 2,329 stores in FY2026 (14 openings, 64 closures). About 100 closures are planned in FY2027 — [AlphaStreet](https://news.alphastreet.com/signet-jewelers-fiscal-2026-deep-dive-navigating-consumer-headwinds-with-brand-restructuring/); [Zacks via MetaTrader](https://www.metatrader.com/fr/news/1403633-sig-stock-gains-14-after-q4-earnings-beat-fy27-view-signals)
- The Jewelers Board of Trade listed 17,124 jewelry retailers at the end of 2024, a net decline of 753 versus Q4 2023 — [IDEX Online / Israeli Diamond](https://en.israelidiamond.co.il/news/retail-and-jewelry/usa-jewelry-businesses-decline/)
- Statista (from Signet data) shows about 17,600 jewelry stores in 2023 — [Statista](https://statista.com/statistics/1074786/number-of-jewelry-stores-in-the-us)
- Conflicting counts: IBISWorld shows 74,245 "businesses" (2025) and Oberlo shows 61,892 (2023). Both use broader NAICS business definitions that include nonemployers and online sellers — [IBISWorld](https://www.ibisworld.com/united-states/number-of-businesses/jewelry-stores/1075/); [Oberlo](https://oberlo.com/statistics/how-many-jewelry-stores-are-there-in-the-united-states). Use about 17,000 for physical storefronts.
- **[ESTIMATE]** Independent jewelers are about 17,100 minus about 2,200 Signet minus other chains, roughly 13,000–14,000 storefronts.

**Mattress**
- Mattress Firm operates more than 2,300 stores. Tempur Sealy closed its $5B acquisition in early 2025 and renamed itself Somnigroup International — [Wikipedia](https://en.wikipedia.org/wiki/Mattress_Firm); [Retail Dive](https://www.retaildive.com/news/tempur-sealy-mattress-firm-merger-deal-somnigroup/739404)
- As an FTC divestiture, 73 Mattress Firm stores and Sleep Outfitters (103 stores) went to Mattress Warehouse, which now has more than 500 US stores (2025) — [VMSD](https://vmsd.com/mattress-warehouse-buys-176-stores/amp/); [Interior Daily](https://www.interiordaily.com/article/9729185/mattress-warehouse-reshapes-us-market-with-bold-acquisition-drive/)

**Consumer electronics and wireless**
- Best Buy had 926 domestic stores (886 Best Buy, 18 Outlet, 20 Pacific Sales, 2 Yardbird) and 1,068 in total as of Jan 31, 2026 — [Best Buy FY2026 10-K](https://www.sec.gov/Archives/edgar/data/764478/000076447826000009/bby-20260131.htm)
- Best Buy plans its first net domestic store growth in more than a decade (about 6 new US stores) — [Retail TouchPoints](https://www.retailtouchpoints.com/?p=619392)
- Verizon is moving stores to franchise operators. It sold 179, is selling about 300 more, and will own about 1,000 company stores afterwards. Six companies operate most franchised stores — [Fox (syndicated)](https://www.fox7austin.com/news/verizon-sell-nearly-300-stores-cut-500-jobs-restructuring.amp)

**Optical/eyewear**
- The Vision Monday Top 50 US optical retailers had about $20.97B in sales across 16,471 locations (2024 data, 2025 list). The 2024 list (2023 data) had $20.1B across 16,369 locations — [Vision Monday Top 50](https://mobile.visionmonday.com/business/article/vms-2024-top-50-us-optical-retailers); [VM chart PDF](https://mobile.visionmonday.com/CMSDocuments/2024/06/vmtop50retailers_chart_2024.pdf)
- Vision Source had 2,994 practices. Luxottica Retail had 2,185 storefronts, Visionworks 773 and Pearle Vision 510 (2023) — [Vision Monday top-10 snapshot](https://visionmonday.com/business/article/snapshots-of-opticals-10-largest-us-retail-players-2024)

### Inferences
- **[ESTIMATE]** The core "words-decide-the-sale" store universe has about 75,000–100,000 US storefronts. It breaks down as: car dealers about 17k; jewelry about 17k; optical at least 16.5k (Top 50 only, with independents on top); mattress about 5k (Mattress Firm 2.3k, Mattress Warehouse 0.5k, Sleep Number about 0.6k by memory, plus independents); furniture showrooms about 15–25k (unverified, needs CBP); wireless carrier and authorized dealer stores about 15–20k (unverified, by memory); and specialty electronics and appliance about 3–5k. Only car dealers, jewelry, optical Top 50 and the named chains are sourced. The others need CBP verification.
- Car dealers have the most salespeople per location and the highest ticket. Jewelry and mattress have the clearest single-salesperson closing dynamic and the chain consolidation (Signet, Somnigroup) that makes enterprise pilots possible.
- Optical is a weaker fit than in India. A large share of US optical is optometrist-led (Vision Source), so the selling conversation is partly clinical and has HIPAA sensitivity.

### Gaps
- Not found: Ashley HomeStore, RH gallery and Rooms To Go store counts; total furniture store count; AT&T and T-Mobile store and authorized-retailer counts; appliance specialty (e.g., independent appliance dealers and AVB/BrandSource members); luxury apparel; kitchen, flooring and HVAC showrooms; cosmetics counters; bridal salons. Searches ran out of budget. Get these from 10-Ks (RH, Ashley is private) and from CBP.
- NADA does not publish salespeople per dealership in the sources found.

## 3. US retail salespersons: headcount, wages, commission, turnover

### Takeaway
There are about 4.0M retail salespersons (2025) with a median wage of about $16–18/hour depending on segment, and 550,600 openings per year. Car dealership staff earn far more (median about $1,463/week in 2024), so the value of a better-converting rep is highest there.

### Cited Findings
- Retail salespersons: 3,998,100 jobs; parts salespersons: 273,300; retail sales workers combined: 4,271,400 (2025 Employment Projections base). Projected change 2025–35 is 0% (−14,000). There are about 550,600 openings per year, mostly from replacing workers who leave — [BLS OOH Retail Sales Workers](https://www.bls.gov/ooh/sales/retail-sales-workers.htm)
- Median hourly wages for retail salespersons by industry (May 2025): building material $17.82; furniture, home furnishings, electronics and appliance $17.45; misc. retail $16.61; general merchandise $16.58; clothing, accessories, shoe and jewelry $16.43 — [BLS OOH](https://www.bls.gov/ooh/sales/retail-sales-workers.htm)
- An earlier OOH version gave a retail salesperson median of $16.62/hour (May 2024). OEWS May 2023 shows about 3.68M employed (wage survey basis, excluding self-employed), a median of $16.19 and a mean of $17.64 — [BLS OEWS 41-2031 (May 2023)](https://www.bls.gov/oes/2023/May/oes412031.htm)
- OEWS wage data include sales commissions and production bonuses. BLS publishes no commission rates — [BLS OOH](https://www.bls.gov/ooh/sales/retail-sales-workers.htm)
- Franchised dealerships: 1.13M employees, average weekly earnings $1,897, median $1,463 (2024) — [CBT News / NADA](https://www.cbtnews.com/franchised-dealership-employment-hits-pre-pandemic-levels-in-2024-nada-reports/)
- JOLTS: economy-wide quits were 38.0M in 2025 (60.6% of separations). Retail quits rose by 87,000 in Dec 2025 and fell by 69,000 to 418,000 in Jan 2026 (monthly level) — [BLS JOLTS Mar 2026 release](https://www.bls.gov/news.release/archives/jolts_03132026.htm); [FRED Quits: Retail Trade](https://fred.stlouisfed.org/data/JTS4400QUL)

### Inferences
- **[ESTIMATE]** Retail monthly quits of about 420–500k on a base of about 15.5M retail jobs is roughly 3% a month, or about 35–45% a year from quits alone, before layoffs and discharges. That supports the "constant new-hire ramp" pain point, which is where automated coaching earns its keep. Verify against JOLTS annual table 16.
- Commission structures are not in official data. Industry convention (unsourced here) is that car salespeople are mostly commission or a flat per car, jewelry and mattress use hourly plus commission or spiffs, and big-box electronics is mostly hourly. Treat this as hypothesis.

### Gaps
- Sales workers by industry (OEWS industry-specific tables for NAICS 441, 449, 458): the BLS pages fetched did not render the tables. Retrieve from data.bls.gov/oes.
- No credible annual retail turnover-rate figure was retrieved. The often-quoted "60%+" was not verified.

## 4. In-store conversion rates and average ticket by segment

### Takeaway
Credible public benchmarks are scarce and mostly come from vendor (traffic-counter) data. Furniture showroom close rates are about 39–40% with a ticket of about $2,271 (Q1 2026). Mattress average ticket was about $1,881 (Q4 2022). Car dealer close rates were not found from Cox or NADA.

### Cited Findings
- Furniture showroom conversion was 39.5% (up about 2% YoY) and the average ticket $2,271 (Q1 2026, Trakwell vendor benchmark) — [Trakwell Q1 2026](https://trakwell.ai/how-does-your-store-compare-to-q1/)
- Mattress average ticket rose about 11% quarter over quarter in Q1 2026. Daily opportunities were up 31% YoY (Trakwell) — [Trakwell](https://trakwell.ai/how-does-your-store-compare-to-q1/)
- Trakwell says 60–80% of furniture shoppers and 30–50% of mattress shoppers leave without buying (vendor claim) — [Trakwell](https://trakwell.ai/?p=2603)
- Q4 2022: mattress average ticket was $1,881, and furniture salespeople converted 40% of opportunities (DoorCounts benchmark) — [DoorCounts PDF](https://www.doorcounts.com/wp-content/uploads/2023/09/DC-Q4-2022-Retail-Traffic-Benchmark.pdf)
- Online mattress conversion is about 0.5–1.0%, far below in-store — [Grips Intelligence](https://gripsintelligence.com/insights/industries/furniture/mattresses-and-sleep)

### Inferences
- The 60–80% walkout share in furniture and mattress is exactly what SaySo's CCTV walkout detection measures. Vendors already sell "close rate per salesperson" dashboards (Trakwell, DoorCounts), so US buyers in these segments understand the metric. They are also existing competitors.
- **[ESTIMATE]** Value math: a mattress store with 8 opportunities a day at a 40% close rate and $1,900 ticket that gains +2 points of conversion adds about 0.16 sales a day, which is about $300/day or roughly $100k/year in revenue per store. Hypothetical, for pricing logic only.

### Gaps
- No ShopperTrak, Sensormatic or RetailNext conversion-by-segment numbers were found (they are mostly paywalled).
- No credible jewelry close rate or average ticket was found (Signet 10-K ATV was not extracted).
- No car dealership showroom close rate from Cox or NADA was found.

## 5. Training spend per employee and willingness to pay

### Takeaway
The average US organization spends about $1,254–1,283 per employee per year on learning (ATD). Retail typically spends well below that average, so a $50–100/month seat price would equal or exceed typical retail training budgets per frontline rep. The ROI case has to come from conversion lift, not training budget.

### Cited Findings
- ATD 2024 State of the Industry (2023 data): $1,283 per employee, 17.4 formal learning hours (down from 20.7 in 2022), $123 per learning hour used — [ATD press release](https://www.td.org/content/press-release/atd-research-l-and-d-professionals-are-optimistic-about-td-s-value-within-organizations)
- ATD 2025 report (2024 data): $1,254 direct spend per employee, 13.7 formal learning hours — [ATD blog, 2025 SOIR](https://www.td.org/content/atd-blog/benchmarks-and-trends-from-the-2025-state-of-the-industry-report)
- Conflicting third-party claim of "40 hours/employee" attributed to ATD 2024; not reliable — [trainingcost.pages.dev](https://trainingcost.pages.dev/benchmarks)

### Inferences
- **[ESTIMATE]** Pricing anchors: ATD spend of about $1,250 a year is about $105 a month per employee across all industries. Retail frontline spend is plausibly a fraction of that. Sell to the store P&L (conversion and ticket) rather than to the L&D budget.

### Gaps
- No retail-specific training spend (Training Industry or ATD industry breakdown) was found.
- No survey data on willingness to pay for conversation-intelligence or sales coaching in physical retail was found. Comparable software prices (e.g., Gong-style tools, Trakwell, DoorCounts) were not researched.

## 6. Trends: labour, store experience, closures and openings 2024–2026

### Takeaway
Store count is shrinking slightly but stabilising. There were 9,197 closures in 2025 (+12% YoY) and openings fell 11%. Closures in H1 2026 are down 44% YoY. Chains in target segments are consolidating (Signet closing about 100, Verizon franchising, Mattress Firm/Somnigroup) while Best Buy resumes net openings.

### Cited Findings
- Coresight tracked 9,197 US store closures in 2025 (+12% vs 2024); openings fell 11%. Its forecast is up to 8,228 closures in 2026 — [ABC News 4 / Coresight](https://abcnews4.com/news/nation-world/this-year-saw-12-more-store-closures-but-2026-looking-better-for-retail-coresight-research-consumers); [Coresight 2025 review](https://coresight.com/downloads/us-store-tracker-extra-store-openings-and-closures-2025-review-and-2026-outlook/)
- Mid-2026: 3,321 closures (−44.1% vs 5,941 at mid-2025) and 3,215 openings, the lowest mid-year opening count since 2020 — [Retail TouchPoints](https://www.retailtouchpoints.com/?p=621322)
- Retail salesperson employment is projected flat (0%) for 2025–35 — [BLS OOH](https://www.bls.gov/ooh/sales/retail-sales-workers.htm)
- Signet plans about 100 closures in FY2027 — [Zacks via MetaTrader](https://www.metatrader.com/fr/news/1403633-sig-stock-gains-14-after-q4-earnings-beat-fy27-view-signals)

### Inferences
- Flat headcount, high churn and fewer but larger stores mean each remaining rep must convert more. That favours productivity and coaching tools.

### Gaps
- No credible 2025–26 "retail labour shortage" quantification was found. The Cox/NADA data show dealer employment at a post-2019 high, which argues against a shortage in autos.

## TAM / SAM / SOM model (ALL [ESTIMATE] — built from the cited inputs above plus stated assumptions)

Pricing assumption (hypothetical, not sourced): **$60 per badge per month** for the coaching seat, plus a **$150 per store per month** CCTV walkout module.

| Layer | Definition | Units | Calc | Annual $ |
|---|---|---|---|---|
| TAM (seats) | All US retail salespersons (BLS 2025: 3.998M) + parts salespersons (0.273M) | ~4.27M seats | 4.27M × $60 × 12 | **~$3.1B** |
| SAM (stores) | High-ticket advice-led storefronts: car dealers 17.0k + jewelry 17.1k + optical 16.5k + mattress ~5k + furniture ~20k* + wireless ~15k* + electronics/appliance ~4k* ≈ **~95k stores** | ~95k stores × ~6 sales staff* ≈ 570k seats | 570k × $60 × 12 + 95k × $150 × 12 | **~$410M + ~$171M ≈ $0.58B** |
| SOM (3–5 yr) | 1–2% of SAM stores: about 1,000–2,000 stores, e.g., one mid-size jewelry or mattress chain plus independent dealer groups | 1–2k stores | ~1.5k × (6 × $60 + $150) × 12 | **~$9M ARR** (range $6–12M) |

\* Unverified store counts and staff-per-store assumptions, marked as estimates in section 2. Car dealers likely have about 10+ salespeople each (part of NADA's 65 employees per store; staffing split not sourced), so dealers alone could be about 170k seats, or about $120M/yr of the SAM.

Segment fit ranking (judgement, based on ticket size, conversation length, commission and chain concentration):
1. **Jewelry** (about 17k stores; Signet's 2,238 is one enterprise buyer; long consultative bridal sales; commissioned)
2. **Mattress** (about 5k stores, highly consolidated under Somnigroup/Mattress Firm and Mattress Warehouse; ticket about $1.9k; 30–50% walkouts; commissioned)
3. **Franchised car dealers** (16,990; highest ticket and largest staff; however, a crowded incumbent vendor ecosystem of CRM and phone-call analytics; state two-party recording consent is a consideration, covered in a separate legal note)
4. **Furniture showrooms** (about 39.5% close, about $2.3k ticket; Ashley, RH and Rooms To Go counts unverified)
5. **Wireless carrier franchise operators** (consolidating dealer groups running hundreds of stores each; ticket includes multi-year contracts)
6. Optical (clinical/HIPAA overlay), big-box electronics (hourly, low conversation depth), cosmetics and bridal: lower priority or unresearched.
