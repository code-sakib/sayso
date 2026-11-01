// Scripted demo conversations between a rep and a customer. Coordinates are local to the branch
// (see ../shell.ts); times are seconds after the customer reaches the rep. Names and numbers are
// made up.

import type { BranchId } from "../branches";

export type Speaker = "rep" | "customer";
export type CaseLine = { at: number; who: Speaker; text: string };
type Spot = { x: number; z: number };

export type StoreCase = {
  id: string;
  title: string;
  /** walkout and sale coach the rep; complaint is a customer blaming the rep, checked against the recording. */
  outcome: "walkout" | "sale" | "complaint";
  branch: BranchId;
  repId: string;
  section: string;
  /** Where the customer stops, and where the rep stands to talk to them. */
  customerSpot: Spot;
  repSpot: Spot;
  /** Walkway point the customer passes on the way in and out (keeps them off the tables). */
  via: Spot;
  lines: CaseLine[];
  summary: {
    /** Complaints only: what the customer accused the rep of. */
    claim?: string;
    happened: string;
    moment: string;
    tryInstead: string;
    facts: [string, string][];
  };
};

/** Walker id of the scripted customer in a demo case. */
export const CASE_CUSTOMER_ID = "case-customer";

/** How long a line stays up as a speech bubble. */
export const LINE_SECONDS = 3.4;
/** Extra pause after the last line before the customer leaves. */
export const AFTER_TALK = 1.6;

export const CASES: StoreCase[] = [
  {
    id: "rude-line",
    title: "Brushed off",
    outcome: "walkout",
    branch: "electronics",
    repId: "jake",
    section: "Mobiles",
    customerSpot: { x: -3, z: -2.4 },
    repSpot: { x: -1.9, z: -2.4 },
    via: { x: -0.25, z: -0.5 },
    lines: [
      { at: 0.4, who: "customer", text: "Hi, does this phone come on a monthly plan?" },
      { at: 4, who: "rep", text: "It's all on the website, man." },
      { at: 7.6, who: "customer", text: "Could you just walk me through it?" },
      { at: 11.2, who: "rep", text: "Kinda busy. Give me a minute." },
    ],
    summary: {
      happened: "The customer asked about a monthly plan. Jake pointed them to the website and turned away. They left 40 seconds later without buying.",
      moment: "“It's all on the website, man.”",
      tryInstead: "“Sure. It's $37 a month over 24 months. Want me to show you the two plans side by side?”",
      facts: [["Talk time", "0:52"], ["Camera", "Walked out 0:40 after"], ["Lost sale", "Phone · $899"]],
    },
  },
  {
    id: "long-wait",
    title: "Left waiting",
    outcome: "walkout",
    branch: "harbor",
    repId: "arjun",
    section: "Laptops",
    customerSpot: { x: -8.5, z: 3.8 },
    repSpot: { x: -6.2, z: 4.4 },
    via: { x: -5.75, z: 5.4 },
    lines: [
      { at: 0.4, who: "customer", text: "Excuse me, can I ask about this laptop?" },
      { at: 4, who: "rep", text: "Yeah, one sec. Just finishing something." },
      { at: 10, who: "customer", text: "Hello? Still waiting here." },
      { at: 13.6, who: "rep", text: "Almost done, two more minutes." },
    ],
    summary: {
      happened: "The customer asked for help at Laptops. Arjun was finishing a demo and kept them waiting. They left after almost 4 minutes.",
      moment: "“Almost done, two more minutes.”",
      tryInstead: "“Hi! I'm with someone. Here's the spec sheet, and I'll be with you in two minutes.”",
      facts: [["Waited", "3 min 50 s"], ["Camera", "Walked out at Laptops"], ["Lost sale", "Laptop · $1,199"]],
    },
  },
  {
    id: "good-save",
    title: "Good save",
    outcome: "sale",
    branch: "fashion",
    repId: "chloe",
    section: "Womenswear",
    customerSpot: { x: -8.5, z: -2.9 },
    repSpot: { x: -7.3, z: -2.6 },
    via: { x: -6, z: 5 },
    lines: [
      { at: 0.4, who: "customer", text: "Do you have this dress in a medium?" },
      { at: 4, who: "rep", text: "We do! Is it for something special?" },
      { at: 7.6, who: "customer", text: "A wedding next weekend." },
      { at: 11.2, who: "rep", text: "Then try it with this belt. Fitting rooms are right there." },
      { at: 14.8, who: "customer", text: "Perfect, I'll take both." },
    ],
    summary: {
      happened: "Chloe asked what the dress was for, then suggested a belt to go with it. The customer bought both.",
      moment: "“Is it for something special?”",
      tryInstead: "Keep doing this. Asking about the occasion led to an add-on sale. Share the line with the team.",
      facts: [["Talk time", "1:05"], ["Camera", "Went to checkout"], ["Sale", "Dress + belt · $184"]],
    },
  },
  {
    id: "warranty-claim",
    title: "\"You promised two years\"",
    outcome: "complaint",
    branch: "electronics",
    repId: "marcus",
    section: "Laptops",
    customerSpot: { x: -8.5, z: 3.8 },
    repSpot: { x: -6.2, z: 4.4 },
    via: { x: -5.75, z: 5.4 },
    lines: [
      { at: 0.4, who: "customer", text: "This laptop died! You told me two years of warranty!" },
      { at: 4, who: "rep", text: "I'm sorry it broke. Let me pull up your purchase." },
      { at: 7.6, who: "customer", text: "Don't act like you don't remember. You promised!" },
      { at: 11.2, who: "rep", text: "I hear you. The manager can check exactly what we said." },
      { at: 14.8, who: "customer", text: "Fine. Go check it then." },
    ],
    summary: {
      claim: "The customer said Marcus promised two years of warranty when they bought the laptop 13 months ago, and wanted a free repair.",
      happened: "The badge recording from the sale shows Marcus said one year, offered the two-year plan for $89, and the customer said no. He never promised two years.",
      moment: "“It comes with one year from the maker. If you want two, that's our plan, $89.”",
      tryInstead: "The manager played Marcus's lines at the desk and the customer remembered. They paid for the repair at cost. Nothing goes on Marcus's record.",
      facts: [["Recording", "Sep 28 · 6 min"], ["Verdict", "Rep was right"], ["Saved", "$240 repair"]],
    },
  },
  {
    id: "rude-claim",
    title: "\"He was rude to me\"",
    outcome: "complaint",
    branch: "harbor",
    repId: "ryan",
    section: "Mobiles",
    customerSpot: { x: -3, z: -2.4 },
    repSpot: { x: -1.9, z: -2.4 },
    via: { x: -0.25, z: -0.5 },
    lines: [
      { at: 0.4, who: "customer", text: "You were rude to me this morning! You swore at me!" },
      { at: 4, who: "rep", text: "I'm really sorry you feel that way. I'd never swear at a customer." },
      { at: 7.6, who: "customer", text: "Don't lie to me. I want your manager. Now!" },
      { at: 11.2, who: "rep", text: "Of course. She'll be right over, and she can check the recording with you." },
    ],
    summary: {
      claim: "The customer told the manager Ryan swore at them and was rude about the phone price that morning.",
      happened: "The recording from 11:20 shows Ryan was polite the whole time. He told them the price, offered the monthly plan and said goodbye. No swearing, no raised voice. He stayed calm again just now while being shouted at.",
      moment: "“It's $899, or $37 a month on the plan. Happy to show you both.”",
      tryInstead: "Complaint closed with no action against Ryan. The manager thanked him for staying calm.",
      facts: [["Recording", "Today 11:20 · 3 min"], ["Verdict", "Rep was right"], ["Rep's tone", "Calm throughout"]],
    },
  },
];

export const caseById = (id: string | null) => CASES.find((c) => c.id === id);

/** Seconds of talking, from the customer's arrival to the end of the last line. */
export const talkSeconds = (c: StoreCase) => (c.lines[c.lines.length - 1]?.at ?? 0) + LINE_SECONDS + AFTER_TALK;

/** The line being spoken `t` seconds after the customer arrived, if any. */
export function lineAt(c: StoreCase, t: number): CaseLine | undefined {
  const current = [...c.lines].reverse().find((l) => t >= l.at);
  return current && t < current.at + LINE_SECONDS ? current : undefined;
}
