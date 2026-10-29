# US Legal Requirements for In-Store Conversation Recording and Store Video Analytics (SaySo)

> Research notes as of 28 Oct 2026. Not legal advice. Sources are mostly law-firm alerts and secondary summaries gathered through web search. Primary statute and docket text was generally NOT verified, so check anything load-bearing with counsel. Where something comes from the researcher's background knowledge and was not checked this session, it is marked **[unverified]**.

## 1. Wiretap / eavesdropping law: one-party vs all-party consent, and in-store conversations

### Takeaway
Federal law (ECPA/Wiretap Act) is one-party consent and covers audio only, not silent video. About 11 to 13 states need consent from every party for at least some recordings, California above all. California's Penal Code 632 protects in-person "confidential communications" judged by an objective "not being overheard or recorded" test. That test depends on the facts, so ordinary shop-floor talk may fall outside it, but sensitive sales conversations (finance, health, fitting rooms, high-value purchases) may not. Recording customers without notice in all-party states is the single biggest legal risk for SaySo.

### Cited Findings
- The federal Wiretap Act bars intentional interception without at least one party's consent. It applies to audio recordings, not video-only recordings. — [National Law Review / Ogletree, "New Surveillance Tools in Retail Stores Pose Legal Risks" (19 Mar 2026)](https://natlawreview.com/article/new-surveillance-tools-retail-stores-pose-legal-risks)
- The same Ogletree article lists all-party consent states for audio as California, Delaware, Florida, Illinois, Maryland, Massachusetts, Michigan, Montana, New Hampshire, Pennsylvania and Washington. Other states are one-party. — [NLR/Ogletree 2026](https://natlawreview.com/article/new-surveillance-tools-retail-stores-pose-legal-risks)
- Nuances from the RCFP recording guide and secondary sources:
  - Michigan is all-party "at least for recordings made by a third party" who is not in the conversation.
  - Oregon requires all-party consent (or notice) for in-person conversations, though phone calls are one-party.
  - Nevada's statute reads as one-party, but the state Supreme Court has read it as all-party for phone calls.
  - Connecticut is all-party for telephone calls but one-party for in-person conversations.
  - Delaware's statutes conflict, so the conservative reading is all-party.
  - RCFP advises assuming the more restrictive law applies and getting consent from everyone. — [RCFP Reporter's Recording Guide intro](https://www.rcfp.org/introduction-to-reporters-recording-guide/); [Brass Transcripts 2026 state guide (secondary)](https://brasstranscripts.com/blog/state-by-state-recording-laws-2026-guide)
  - Note: one search summary of RCFP also lumped Missouri with Oregon. Missouri is generally treated as one-party, so treat that as a likely summarisation error.
- *Flanagan v. Flanagan* (Cal. 2002) sets the test for a "confidential communication" under Cal. Penal Code 632: a party has an objectively reasonable expectation that the conversation is not being overheard or recorded. 632(c) excludes communications where parties may reasonably expect to be overheard or recorded. 632(a) covers in-person as well as telephone conversations. — [Flanagan v. Flanagan, 27 Cal.4th 766 (SCOCAL)](https://scocal.stanford.edu/opinion/flanagan-v-flanagan-32179)
- Whether an expectation of privacy is reasonable is "generally a question of fact." *Kight v. CashCall* held that CIPA applies even when the unannounced listener works for the same company as the known participant. — [Mendell v. Am. Med. Response excerpt citing Kight (via Alexi)](https://www.alexi.com/matters/issues/what-is-the-test-for-a-conversation-to-qualify-as-confidential-under-se); [Kight v. CashCall (vLex)](https://case-law.vlex.com/vid/kight-v-cashcall-inc-888600938)
- Retail guidance: recording employee-customer interactions without express consent from both parties in an all-party state can violate wiretap law. Common fixes are turning audio off or posting clear notice. One firm suggests a clear verbal notice plus a red-light indicator can support implied consent if the person keeps talking. — [Fox Rothschild Privacy Compliance blog, Oct 2025](https://dataprivacy.foxrothschild.com/2025/10/articles/general-privacy-data-security-news-developments/smile-youre-on-camera-meets-gdpr-and-u-s-privacy-law-in-the-retail-context/)
- Video without audio is generally allowed in aisles, parking lots, entrances and checkouts. It is not allowed where people expect privacy, such as bathrooms and dressing rooms, and some states expressly ban hidden cameras in private areas. — [NLR/Ogletree 2026](https://natlawreview.com/article/new-surveillance-tools-retail-stores-pose-legal-risks)
- California SB 690 (CIPA reform), signed 30 Sep 2026:
  - It removes the private right of action under 637.2 for pen-register/trap-and-trace (638.51) claims arising from websites and apps, retroactive to actions filed in the prior two years.
  - The broad "commercial business purpose" exemption in the original draft was dropped from the final bill.
  - Claims for recording confidential communications without all-party consent remain, as do ECPA and common-law claims. SB 690 therefore gives no relief for in-store audio. — [WilmerHale, "CIPA Reform Signed Into Law" (6 Oct 2026)](https://www.wilmerhale.com/en/insights/blogs/wilmerhale-privacy-and-cybersecurity-law/20261006-cipa-reform-signed-into-law); [NLR on the July 2026 amendment dropping the exemption](https://natlawreview.com/article/senate-bill-690-amended-california-scales-back-its-proposed-cipa-overhaul)
  - Conflict: a Parker Poe alert dated 31 Aug 2026 describes the bill as containing a commercial-business-purpose exemption. It predates signing and is probably out of date. — [Parker Poe](https://www.parkerpoe.com/news/2026/08/california-legislature-approves-senate-bill-690-narrowing-certain)

### Inferences
- **One-party states.** The salesperson is a party to the conversation. The employer (the retailer) can likely supply one-party consent through employee consent under the federal Wiretap Act and in one-party states, provided the recording is not made for a criminal or tortious purpose. That makes one-party states the lowest-risk launch markets. Examples include New York, Texas, Georgia, Ohio, Arizona, Colorado, North Carolina and New Jersey; verify each.
- **All-party states (CA, FL, IL, MD, MA, MT, NH, PA, WA, etc.).** Here SaySo needs customer notice and arguably consent. Prominent entrance signage plus a visible recording indicator on the badge does two things: it weakens a customer's "objectively reasonable expectation" of not being recorded (the Flanagan test), and it supports an implied-consent argument. Neither is guaranteed to work. Florida (Fla. Stat. 934) and Illinois (720 ILCS 5/14) are also historically aggressive; their exact in-person tests were not verified here.
- **Retail verticals.** Store-floor chat in a busy store is a weaker "confidential communication" case than a quiet conversation about financing, medical devices (pharmacy, optical, hearing aids) or a fitting-room consult. SaySo should flag high-sensitivity verticals and zones, and consider turning recording off in them.
- **What "staff-only mode" does and does not fix.** Under CIPA 632 the offence covers "eavesdrop upon *or* record". A device that captures the customer's voice into a buffer, even for seconds, before deleting it could still be argued to "eavesdrop" with an electronic device, or to "intercept" (acquire contents) under ECPA. Staff-only mode therefore greatly reduces damages exposure, evidentiary harm and the harm narrative, but it probably does **not** remove the need for notice in all-party states. It is strongest if the customer audio is never transcribed, never stored and never leaves the device.

### Gaps
- No case was found deciding whether a retail shop-floor conversation is "confidential" under 632. The answer is fact-specific.
- I did not check primary statute text for Florida, Illinois (post-2014 eavesdropping amendment), Maryland, Massachusetts (which bans "secret" recording, so notice may cure it), Pennsylvania or Washington on in-person conversations and on whether notice alone suffices.
- No case was found applying wiretap law to a wearable audio badge for retail staff in the US.

## 2. Recent class actions, and vendor liability as a "third-party eavesdropper" (CIPA capability test)

### Takeaway
The biggest risk to SaySo as a vendor is being treated as a separate eavesdropper rather than as the retailer's tool. *Ambriz v. Google* (N.D. Cal., Feb 2025) adopted the "capability" test: a vendor is a third party if it *could* use the data for its own purposes, for example model training permitted by its terms. The court also said business-to-business agreements do not stand in for consumer consent. The same theory is driving the Otter.ai consolidated litigation and the contact-centre AI suits (Patagonia/Talkdesk, Navy Federal/Verint).

### Cited Findings
- *Ambriz v. Google* (N.D. Cal., 10 Feb 2025) denied Google's motion to dismiss. The case concerned Google Cloud Contact Center AI used by Verizon, Home Depot and others.
  - The court applied the "capability test" from *Javier v. Assurance IQ*: the plaintiff need only allege the vendor *could* use the data for its own benefit. Under the competing "extension test", actual use is required.
  - Google's terms allowing AI training on customer data (with client approval) were enough to show capability.
  - The court said B2B agreements alone are not enough; consumers must also consent. — [ZwillGen](https://www.zwillgen.com/privacy/federal-judge-allows-google-customer-service-ai-class-action-to-proceed/); [Goodwin, Feb 2025](https://www.goodwinlaw.com/en/insights/publications/2025/02/alerts-practices-dpc-ftec-ai-voice-products-subject-to-california-invasion-of-privacy-claims); [Pearl Cohen](https://www.pearlcohen.com/google-may-be-unlawfully-eavesdropping-with-ai-according-to-federal-court/)
- *Brewer v. Otter.ai*, filed Aug 2025 in N.D. Cal.:
  - Claims under ECPA, CIPA 631 and 632, intrusion upon seclusion and conversion. The alleged harms are recording non-subscriber meeting participants and using the recordings to train ML models. By default, Otter allegedly sought consent only from the host.
  - Consolidated as *In re Otter.AI Privacy Litigation*, No. 5:25-cv-06911-EKL, on 22 Oct 2025, with a consolidated complaint filed 5 Dec 2025.
  - Status is conflicting: one source says the core wiretap and biometric claims survived; another lists a motion-to-dismiss hearing for 20 May 2026. Check the docket. — [IAPP](https://iapp.org/news/a/dressing-old-laws-in-class-action-suits-applying-anti-wiretapping-laws-to-ai-transcription-services); [NPR affiliate (CT Public), Aug 2025](https://www.ctpublic.org/2025-08-15/class-action-suit-claims-otter-ai-secretly-records-private-work-conversations); [BuildBetter blog 2026 (secondary)](https://blog.buildbetter.ai/ai-notetaker-lawsuits-2026-how-to-record-meetings-legally/)
- *Cruz v. Fireflies.AI Corp.* (BIPA class action, Illinois, Dec 2025), No. 3:25-cv-03399, against an AI notetaker. — [BuildBetter blog (secondary)](https://blog.buildbetter.ai/ai-notetaker-lawsuits-2026-how-to-record-meetings-legally/)
- Patagonia (filed 11 Jul 2024, a CIPA putative class action): the plaintiff alleges customer-service calls were "intercepted, listened to, recorded and used" by an undisclosed third party, Talkdesk, which also used them to train its AI. Talkdesk was not named as a defendant. — [The Record](https://therecord.media/patagonia-sued-privacy-invasion-california); [No Jitter](https://www.nojitter.com/contact-center-customer-experience/why-recent-ai-linked-lawsuits-will-impact-your-contact-center)
- *Paulino v. Navy Federal Credit Union & Verint* (2024, California): the putative class covers Californians on calls run through Verint Real-Time Agent Assist or Speech Analytics without consent. — [No Jitter](https://www.nojitter.com/contact-center-customer-experience/why-recent-ai-linked-lawsuits-will-impact-your-contact-center)
- CIPA statutory damages are $5,000 per violation under Cal. Penal Code 637.2. **[unverified this session; widely cited]**

### Inferences
- **Contract and architecture design should defeat the "capability" theory.** SaySo should:
  - Contractually prohibit itself from using customer data for its own purposes, including model training, product improvement on raw audio, and resale.
  - Make that prohibition technically real: on-device or in-store deletion of customer voice, tenant-isolated storage, and no training on retailer data without separate written opt-in.
  - Make sure no clause in its terms or privacy policy says otherwise. Ambriz turned on Google's own terms.
  - Act as a strict "service provider/processor".
- **Staff-only mode directly lowers this specific risk.** If customer audio never reaches SaySo's servers, SaySo never "acquires" customer content, which undercuts the vendor-eavesdropper theory. Salesperson audio is still collected, which is an employee-consent question (section 5).
- **Consent cannot be outsourced to the retailer contract.** Ambriz says B2B agreements do not substitute for consent from the person recorded. That supports customer-facing notice and indicator lights.

### Gaps
- Status after Feb 2025 of Ambriz (class certification, summary judgment) and of the Patagonia and Navy Federal cases was not found.
- No suit was found against Gong specifically. No reliable information was gathered this session on Amazon/Ring audio litigation or FTC action. From background knowledge, the FTC's 2023 Ring order concerned employee access to customer video and lax security, and Ring disabled default audio recording on some devices. **[unverified]**
- No case was found involving an in-person (non-telephone) AI-recorder vendor in a retail store.

## 3. Biometric laws: BIPA, Texas CUBI, Washington, Colorado

### Takeaway
BIPA (Illinois) is the highest-exposure biometric law because it has a private right of action. Its statutory damages are $1,000 per negligent violation and $5,000 per intentional or reckless violation. Since the 2024 amendment, damages are counted per person rather than per scan, and the Seventh Circuit held in April 2026 that this applies retroactively. Voiceprints and face geometry are covered, but "voiceprint" is undefined. Courts are split on whether AI voice processing creates one: *Carpenter* (drive-thru ordering AI) said no; *Delgado v. Meta* (2026) said the claim could proceed. Person tracking without face geometry (re-ID by clothing or body shape) is probably outside BIPA, but retail camera BIPA suits such as *Target* survive dismissal on plausible allegations alone.

### Cited Findings
- BIPA amendment (2024): when an entity collects the same biometric from the same person by the same method more than once, that counts as a single violation. This overturned *Cothron v. White Castle*. In *Clay v. Union Pacific Railroad* (7th Cir., 1 Apr 2026), the court held the amendment procedural and retroactive to pending cases. — [Inside Privacy (Covington)](https://www.insideprivacy.com/data-privacy/seventh-circuit-holds-that-bipa-amendment-applies-retroactively/); [Paul Hastings](https://www.paulhastings.com/insights/ph-privacy/7th-circuit-confirms-bipa-amendment-has-retroactive-application); [Polsinelli](https://www.polsinelli.com/publications/bipa-amendment-limiting-damages-applies-retroactively)
- BIPA requires informed written consent before a private company collects, stores, uses or discloses biometric data, plus publicly available retention and destruction policies. — [Home Depot coverage (AOL)](https://www.aol.com/home-depot-hit-lawsuit-over-182126614.html); [Luthe v. Walmart complaint (Milberg, 2022)](https://milberg.com/wp-content/uploads/sites/2/2022/09/COMPLAINT-Class-Action-Luthe.pdf)
- **Retail camera BIPA suits:**
  - *Arnold v. Target* (N.D. Ill., filed May 2024): the motion to dismiss was denied in Nov 2024 even though Target denies using facial recognition. Plaintiffs only need plausible allegations at that stage. — [JURIST](https://www.jurist.org/news/2024/11/federal-court-allows-illegal-data-collection-claims-against-target-to-move-forward); [MediaPost](https://www.mediapost.com/publications/article/401367/target-must-face-privacy-claims-over-alleged-facia.html)
  - *Luthe v. Walmart* (2022): alleges collection of shoppers' biometric data without notice or consent. Its outcome was not found. — [Complaint PDF](https://milberg.com/wp-content/uploads/sites/2/2022/09/COMPLAINT-Class-Action-Luthe.pdf)
  - Home Depot and Lowe's (2019 suits over in-store face scanning) and a later Home Depot self-checkout camera suit. — [AOL](https://www.aol.com/home-depot-hit-lawsuit-over-182126614.html)
- **Voiceprints:**
  - BIPA lists voiceprints but never defines them. Commentary says *Carpenter* held that the high-level characteristics used by an order-taking drive-thru AI were not a voiceprint.
  - In *Delgado v. Meta* (N.D. Cal., 2026), the court denied dismissal. Meta argued it held only audio and created no speaker-identification representation; the court found a triable dispute, with reasoning commentators summarise as "BIPA applies if it could." — [Barnes & Thornburg on Delgado v. Meta](https://laborandemployment.btlaw.com/post/102n7n1/the-voiceprint-you-didnt-mean-to-create-what-delgado-v-meta-means-for-employer); [Biometric Update, Aug 2026](https://www.biometricupdate.com/202608/meta-loses-bid-to-end-bipa-voiceprint-suit-as-case-moves-forward); [Frost Brown Todd/Gibbons on Carpenter](https://fbtgibbons.com/state-privacy-laws-poised-to-fight-unauthorized-voice-cloning/)
  - A BIPA voiceprint complaint against ElevenLabs was filed May 2026 (allegations only). — [Loevy complaint PDF](https://www.loevy.com/wp-content/uploads/2026/05/Eleven-Labs-BIPA-Complaint.pdf)
- **Other state biometric laws:**
  - California, Illinois, Texas and Washington restrict biometric collection without notice and consent. — [NLR/Ogletree 2026](https://natlawreview.com/article/new-surveillance-tools-retail-stores-pose-legal-risks)
  - Colorado HB24-1130, effective 1 Jul 2025, adds biometric rules to the Colorado Privacy Act. It has no private right of action (Attorney General enforcement only) and applies to employers. Employers may use biometrics for timekeeping and security; other uses need employee consent, which cannot be a condition of employment. — [Hunton](https://www.hunton.com/privacy-and-cybersecurity-law-blog/new-colorado-law-imposes-heightened-requirements-for-the-collection-and-processing-of-biometric-data); [Venable](https://www.venable.com/insights/publications/2024/06/colorado-amends-state-privacy-law-to-include)
- **[unverified]** Texas CUBI (Bus. & Com. Code 503.001) is enforced only by the Attorney General, at up to $25,000 per violation. The Texas AG settled CUBI claims with Meta (about $1.4B, July 2024) and Google (about $1.375B, May 2025). Washington's RCW 19.375 has no private right of action, but the My Health My Data Act (2023) has one and covers biometric data. None of this was verified in this session's searches.

### Inferences
- **Speaker diarization alone is lower risk.** Separating "speaker A vs B" within one recording, without a stored template linked to a person, is closer to *Carpenter*.
- **Enrolment-based voice matching is higher risk.** Enrolling the salesperson's voice so the device can keep "staff only" audio creates a stored voice template tied to an identified employee, which is plausibly a "voiceprint". BIPA consent from employees is then needed in Illinois: a written release, a published retention schedule, and no sale or profit. Colorado employee-consent rules and Texas CUBI notice and consent also apply. The good news is that this is a small, controllable population (employees) who can sign consent at onboarding. Retention and destruction schedules for the templates are needed.
- **The customer's voice must never be templated.** Staff-only mode that works by "is this the enrolled staff voice? keep; otherwise discard" processes customer audio but never creates a customer template. That is defensible but not risk-free under the *Delgado* "could" reasoning. Avoid persisting any customer embeddings.
- **Person tracking.** Re-ID by appearance, gait or body shape without facial geometry is probably not a "scan of face geometry". But body-shape or gait templates could be argued to be biometric under broader definitions (Colorado, CCPA "biometric information" includes gait patterns **[CCPA definition unverified this session]**). Use ephemeral track IDs, no cross-visit re-identification, and no face crops stored, and document this in a public statement. *Arnold v. Target* shows that even a denial can be met with a suit that survives to discovery, so clear public documentation matters.
- Damages are now per person rather than per scan, which caps the catastrophic scenario. Per-person exposure across thousands of Illinois shoppers is still material: $1k–$5k × class size.

### Gaps
- The *Carpenter* opinion, its court and its defendant (assumed McDonald's) were not verified from primary sources.
- No ruling was found on whether person re-identification without faces counts as a biometric identifier under BIPA.
- Pending 2026 state biometric bills were not surveyed.

## 4. State consumer privacy laws (CCPA/CPRA incl. employees and ADMT; other states) and notice at collection

### Takeaway
CCPA/CPRA covers both customers and employees, and requires notice at or before collection. For a physical store, that means signage, which the CCPA regulations expressly contemplate for offline collection **[unverified this session]**. The CPPA's ADMT, risk-assessment and cybersecurity-audit regulations were approved on 23 Sep 2025. ADMT obligations start in 2027, and risk assessments for existing processing are due by 31 Dec 2027. SaySo's coaching analytics on salespeople could become "ADMT for significant decisions" if used for discipline or pay.

### Cited Findings
- CPPA board finalised the ADMT, risk-assessment and cybersecurity-audit regulations on 24 Jul 2025, and OAL approved them on 23 Sep 2025.
  - Timeline: ADMT obligations in 2027; risk assessments for existing processing by 31 Dec 2027 with summaries from April 2028; audits phased from 2028. Sources differ on whether the general effective date is 1 Jan 2026 or 1 Jan 2027.
  - ADMT used for significant decisions requires a pre-use notice, access/explanation and generally an opt-out or human appeal.
  - Employment decisions are covered: hiring, promotion and other employment decisions. — [Morgan Lewis, Aug 2025](https://www.morganlewis.com/pubs/2025/08/cppa-board-finalizes-new-rules-on-admt-cybersecurity-audits-and-risk-assessments); [Mondaq (final approval)](https://www.mondaq.com/unitedstates/data-protection/1687344/california-privacy-regulations-on-admt-cybersecurity-audits-and-risk-assessments-receive-final-approval); [WGA HR summary](https://www.wga.com/news/updated-cppa-regulations-impacting-hr-compliance/)
- US state privacy laws require notice to individuals that personal information is collected, even without recording. Regulators expect data minimisation, less invasive alternatives and purpose-limited retention. — [Fox Rothschild, Oct 2025](https://dataprivacy.foxrothschild.com/2025/10/articles/general-privacy-data-security-news-developments/smile-youre-on-camera-meets-gdpr-and-u-s-privacy-law-in-the-retail-context/)
- Notice to customers and employees can be given through posted signs, onboarding paperwork and handbooks. Posting conspicuous recording disclaimers may reduce liability even where not strictly required. — [NLR/Ogletree 2026](https://natlawreview.com/article/new-surveillance-tools-retail-stores-pose-legal-risks)

### Inferences
- **SaySo's CCPA role.** SaySo should be a CCPA "service provider", with the required contract terms: no selling or sharing, no use outside the business purpose, no combining with other data, and audit rights. Those terms also support the Ambriz-defence posture.
- **Other state laws.** Most non-California comprehensive laws (Virginia, Texas TDPSA, Colorado and others) exclude employee data, so their main relevance is customers. Voice and video used to identify a person would generally be "sensitive data" (biometric), requiring opt-in consent in those states. If customer audio is discarded and video is not used for identification, sensitive-data triggers may be avoided.
- **Risk assessments.** Recording employees and analysing their performance is likely processing that requires a CCPA risk assessment, due by end of 2027 for existing processing. SaySo should provide retailers with a template risk assessment as part of the sales kit.

### Gaps
- Exact CCPA regulation text on offline notice at collection (11 CCR 7012) and the definition of "significant decision" for workplace performance monitoring were not verified.
- No specific enforcement action against a retailer for in-store signage failures was found.

## 5. Employee monitoring laws and labour (NLRB)

### Takeaway
New York (Civ. Rights Law 52-c), Delaware and Connecticut require written notice and/or acknowledgment of electronic monitoring. Connecticut's law was rewritten effective 1 Oct 2026. The NLRB General Counsel memo GC 23-02, which targeted "omnipresent surveillance" of workers, was rescinded in February 2025. Federal labour-law pressure is therefore lower for now, though Section 7 surveillance doctrine still exists and union retail workforces will resist.

### Cited Findings
- **New York Civil Rights Law 52-c** (effective May 2022): private employers must give written notice before monitoring phone, email or internet use, and obtain acknowledgment. Penalties are $500 for a first violation, $1,000 for a second and $3,000 for each later one. — [MoFo](https://www.mofo.com/resources/insights/211115-new-york-enacts-employee-monitoring-notification-law); [Akin Gump](https://akingump.com/en/insights/blogs/ag-data-dive/new-york-will-soon-require-employers-to-disclose-employee-monitoring)
- **Delaware 19 Del. C. 705:** notice either daily (electronic) or one-time prior notice; $100 civil penalty per violation. — [MoFo](https://www.mofo.com/resources/insights/211115-new-york-enacts-employee-monitoring-notification-law)
- **Connecticut** Public Act 26-73 (SB 472), signed 4 Jun 2026, replaces 31-48d effective 1 Oct 2026 and updates the notice requirements. The specific new terms were not retrieved. A 2026 article lists California, Delaware, Maine, New Jersey and New York as having notice, acknowledgment or consent rules. — [National Law Review](https://natlawreview.com/article/deadline-imminent-connecticuts-expanded-electronic-monitoring-law); [Akerman](https://www.akerman.com/en/perspectives/hr-def-the-boss-is-watching-but-many-states-impose-requirements-for-surveillance-at-work.html)
- **NLRB:** GC 23-02 (Abruzzo, Oct 2022) directed Regions to challenge "omnipresent surveillance and other algorithmic-management tools". Acting GC William Cowen's GC 25-05 (14 Feb 2025) rescinded it along with other Abruzzo memos. — [Kilpatrick Townsend](https://ktslaw.com/insights/alert/2025/2/reshaping-federal-labor-policy-acting-nlrb-general-counsel-rescinds-numerous-biden-era-guidance-memos); [Ogletree](https://ogletree.com/insights-resources/blog-posts/rescinded-guidance-unpacking-nlrb-acting-general-counsel-cowens-policy-overhaul); [Holland & Knight](https://www.hklaw.com/en/insights/publications/2025/03/acting-national-labor-relations-board-general-counsel-rescinds)

### Inferences
- **Employee consent and notice flow.** Every deployment needs written notice and acknowledgment at onboarding: NY 52-c, the Delaware and Connecticut notices, BIPA releases in Illinois and CCPA employee notice in California. This flow also supplies the employee's one-party consent for wiretap purposes. SaySo should ship a consent kit.
- **Audio of employees in all-party states.** Employees talk with each other on the shop floor, and those conversations are captured too. Staff-only mode keeps all staff voices, so co-worker conversations need every employee's consent. That works if all store staff sign. The badge should mute in break rooms and restrooms and when off-shift.
- **Labour risk.** Rescinding GC 23-02 lowers enforcement priority but does not change the NLRA. Recording that captures union talk, or retaliation built on badge data, remains an unfair-labour-practice risk, and a future GC could revive the policy. Design should include a mute button, no recording on breaks, and no use of audio for discipline without human review. Unionised retailers (UFCW, RWDSU) are likely to bargain over it.
- **California employers.** They face CCPA employee rights (access, deletion), the ADMT rules if outputs drive discipline or pay, and Labor Code 435, which bans audio and video recording in restrooms, locker rooms and changing rooms **[Labor Code 435 unverified this session]**.

### Gaps
- Primary text of the Connecticut 2026 Act was not checked.
- Pending 2026 bills were not surveyed: California AB 1221 / "No Robo Bosses"-type workplace surveillance bills, Massachusetts FAIR Act, and others **[existence/status unverified]**.
- No state law was found specifically restricting audio in workplace video systems beyond general wiretap rules. This was not searched in depth.

## 6. CCTV analytics with audio; FTC Section 5 enforcement

### Takeaway
Adding audio to CCTV turns a mostly lawful video practice into a wiretap problem, so SaySo's CCTV module should stay video-only. The FTC's Rite Aid action (Dec 2023) is the template for AI surveillance enforcement against retailers. Rite Aid got a five-year ban on facial recognition for surveillance, had to delete biometric data and get vendors to delete it, and must run a monitoring programme for any other biometric system. The case was driven by inaccuracy and disparate false positives that staff acted on.

### Cited Findings
- The FTC's order against Rite Aid includes:
  - A five-year ban on facial recognition for surveillance.
  - Deletion of FRT biometric data.
  - Notice to third parties (vendors), who must delete biometric data received from Rite Aid.
  - A comprehensive protocol for any other automated biometric system.
- The FTC alleged thousands of false-positive matches, concentrated in plurality-Black, -Asian and -Latino areas, with employees acting on "match alerts" sent to their phones. Rite Aid had an earlier 2010 order requiring vendor vetting and contractual safeguards. — [Mayer Brown, Dec 2023](https://mayerbrown.com/de/insights/publications/2023/12/more-than-a-ban-on-facial-recognition-use-the-us--ftcs-rite-aid-action-and-proposed-stipulated-order); [Covington Inside Privacy](https://www.insideprivacy.com/artificial-intelligence/rite-aid-settles-ftc-allegations-regarding-use-of-facial-recognition-technology/); [FTC](https://www.ftc.gov/node/82185); [NLR](https://natlawreview.com/article/ftc-bans-rite-aid-using-ai-facial-recognition-without-reasonable-safeguards)
- The FTC Act bars unfair or deceptive practices, including practices likely to cause substantial injury that consumers cannot reasonably avoid. In 2024 the court-entered settlement barred the pharmacy retailer from using facial recognition for five years. — [NLR/Ogletree 2026](https://natlawreview.com/article/new-surveillance-tools-retail-stores-pose-legal-risks)

### Inferences
- **Lessons from Rite Aid for SaySo** (retailer as operator, vendor indirectly):
  - Test accuracy and bias of walkout and person-tracking models.
  - Never send automated "suspect" alerts that staff act on without human review. Walkout detection that flags individuals as shoplifters is the Rite Aid fact pattern.
  - Train staff, keep logs, and set data retention limits.
  - Vendor contracts should require deletion on termination.
- **Product claims.** Marketing statements such as "no face recognition" or "customer voice deleted in seconds" become FTC-enforceable promises. They must be technically true and auditable.
- **FTC priorities.** The FTC under the current administration has de-emphasised some Biden-era AI rulemaking. Section 5 deception claims remain a live risk, and state AGs (Texas, California) are active. **[current FTC posture not researched this session]**

### Gaps
- State-specific rules on audio-enabled CCTV and the exact wording state laws require for signage were not researched beyond the general wiretap framework.
- FTC 2025–2026 AI or surveillance actions after Rite Aid were not searched.

## 7. Practical compliance, rollout strategy, and whether "staff-only mode" materially reduces risk

### Takeaway
The safest path is to launch the audio product in one-party-consent states, with employee written notice and consent and customer-facing signage plus a visible indicator. Make SaySo a strict service provider with no secondary use of data, so the Ambriz "capability" theory has nothing to grab. Treat California, Illinois, Florida, Pennsylvania, Washington, Massachusetts and Maryland as later launches needing counsel sign-off. Staff-only mode is a meaningful but partial mitigation: it strongly reduces vendor-eavesdropper, retention and biometric exposure for customers, but probably does not remove the need for customer notice in all-party states.

### Cited Findings
- Mitigations cited in retail guidance: disable audio or post clear notice; verbal notice plus a red-light indicator supports implied consent; minimise collection, consider less invasive options, and limit retention. — [Fox Rothschild 2025](https://dataprivacy.foxrothschild.com/2025/10/articles/general-privacy-data-security-news-developments/smile-youre-on-camera-meets-gdpr-and-u-s-privacy-law-in-the-retail-context/)
- Review policies against state audio and video laws. Multistate retailers face added complexity. Conspicuous recording disclaimers may reduce liability. — [NLR/Ogletree 2026](https://natlawreview.com/article/new-surveillance-tools-retail-stores-pose-legal-risks)
- Consent from the business customer does not substitute for consent from the person recorded, and the vendor's own terms allowing data use can create third-party liability. — [ZwillGen on Ambriz](https://www.zwillgen.com/privacy/federal-judge-allows-google-customer-service-ai-class-action-to-proceed/)
- AI notetaker suits rest on recording non-consenting participants and training on their data. — [IAPP](https://iapp.org/news/a/dressing-old-laws-in-class-action-suits-applying-anti-wiretapping-laws-to-ai-transcription-services)

### Inferences
These are design and contract recommendations synthesised by the researcher.

1. **Rollout order**
   - Phase 1: one-party states, verified state by state. Examples: New York (watch 52-c employee notice), New Jersey, Texas (watch CUBI if voice templates are used), Georgia, Ohio, Arizona, Colorado (watch HB24-1130 employee biometrics), North Carolina, Virginia.
   - Avoid Illinois early because of BIPA private actions for voice templates and eavesdropping law.
   - Avoid California early because of CIPA's $5k per violation and the Ambriz forum.
2. **Customer notice**
   - Signage at the entrance and at the point of interaction, for example: "Staff wear audio devices for training and quality. Customer voices are automatically deleted and never stored."
   - A visible LED on the badge.
   - Optional verbal script in all-party states: "Just so you know, my badge records my side of the conversation for training; yours isn't kept. OK?"
   - An easy opt-out: the salesperson taps mute.
3. **Employee side**
   - Written notice and acknowledgment covering NY 52-c, Delaware and Connecticut.
   - A BIPA-style written release plus public retention schedule for any voice enrolment template, used everywhere for uniformity.
   - Mute for breaks; auto-off in restrooms and fitting rooms (geofence); no covert listening.
   - No automated discipline: human review, aligned with CCPA ADMT opt-out and appeal.
4. **Staff-only mode engineering**
   - Process on-device or in-store only; never transmit or store customer audio, transcripts or embeddings.
   - Delete within a fixed short buffer and log the deletion.
   - Third-party audit of the claim through SOC 2 Type II, with the processing-integrity criterion covering the deletion control.
   - Without this, the "eavesdrop" and "capability" arguments remain.
5. **Contracts (DPA / service-provider terms)**
   - SaySo processes only on the retailer's instructions; no training on customer data and no sale or sharing; CCPA service-provider clauses.
   - Deletion on termination; sub-processor list; breach notice.
   - The retailer is responsible for signage and employee consent, backed by a SaySo-supplied kit.
   - Indemnity allocation and caps, plus cyber and E&O insurance. Retailers will likely require SOC 2 Type II and a privacy and security questionnaire before signing.
6. **CCTV module**
   - Video-only, never audio.
   - No facial recognition and no cross-visit re-ID templates; ephemeral track IDs.
   - Aggregate wait-time metrics.
   - Walkout alerts go to human review, framed as "possible unpaid item" and not identity, to avoid the Rite Aid pattern.
   - Publish a short "how our analytics work" statement for the retailer's privacy notice.
7. **Retention**
   - Salesperson audio and transcripts kept for a short default (for example 30–90 days), with derived metrics kept longer.
   - Written retention schedule, which BIPA requires if templates exist.
8. **Does staff-only mode materially reduce risk?**
   - Yes for: vendor third-party eavesdropper liability (SaySo never possesses customer content), customer BIPA voiceprint risk, data-breach and retention harm, damages narrative, and FTC "unfair" analysis.
   - Only partially for: all-party-state wiretap and eavesdrop liability, because capture and processing may itself be "eavesdropping" or "interception". Notice is still needed.
   - No for: employee-side obligations, which remain fully in place.

### Gaps
- No court has ruled on transient, on-device "capture-then-discard" processing under CIPA 632 or ECPA. This is a genuine open question for counsel.
- No published SOC 2 or retailer-procurement benchmark for audio-AI vendors was found this session.
- No verified one-party state list from primary statutes was compiled; use RCFP state chapters.
