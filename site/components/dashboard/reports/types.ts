// The owner's daily reports: one per store per day, written after closing. Demo data, made up.

export type MomentKind = "walkout" | "save" | "wait";

/**
 * One turn of a conversation. The rep's turns are what they said. The customer's voice is
 * removed on the badge, so their turns hold only what the camera saw them do.
 */
export type Line = { at: string; who: "rep" | "customer"; text: string };

/** One sales conversation worth the owner's attention, picked out of the day. */
export type Moment = {
  time: string;
  repId: string;
  kind: MomentKind;
  title: string;
  /** Who walked up and what they were after. */
  customer: string;
  /** What the rep said at the turning point. */
  quote: string;
  transcript: Line[];
  happened: string;
  tryInstead: string;
};

export type DisputeKind = "conduct" | "promise";

/** cleared: the recording backs the rep. honoured: the rep did say it, so the store made it right. unclear: nothing on the recording either way. */
export type Verdict = "cleared" | "honoured" | "unclear";

/** A customer complaint about a rep, checked against what the badge actually recorded. */
export type Dispute = {
  /** When the complaint was raised. */
  time: string;
  repId: string;
  kind: DisputeKind;
  title: string;
  /** What the customer said had happened, as the manager logged it. */
  claim: string;
  /** Which recording was pulled to check it. */
  recording: string;
  transcript: Line[];
  finding: string;
  verdict: Verdict;
  outcome: string;
};

export type RepNote = { repId: string; note: string };

export type DayReport = {
  /** ISO date, also used in the URL. */
  date: string;
  headline: string;
  summary: string;
  customers: number;
  conversations: number;
  sales: number;
  walkouts: number;
  /** Sales lost to walkouts, in dollars, from what the customer was looking at. */
  lostValue: number;
  moments: Moment[];
  disputes: Dispute[];
  notes: RepNote[];
};
