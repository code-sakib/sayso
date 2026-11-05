// Spark's reply plus the day's evidence to the DayReport the dashboard shows. Everything the
// model points at is checked here: unknown conversations and reps are dropped, quotes must be
// words the rep really said, and every logged complaint ends up with exactly one verdict.

import type { DayReport, Dispute, Line, Moment, RepNote } from "../../components/dashboard/reports/types.ts";
import type { Conversation } from "../timeline/conversations.ts";
import { formatClock, formatOffset, minutes } from "../timeline/clock.ts";
import type { CameraSummary } from "../timeline/visits.ts";
import type { Complaint } from "../types.ts";
import type { TeamMember } from "./prompt.ts";
import type { SparkDispute, SparkMoment, SparkReport } from "./schema.ts";

export type AssembleInput = {
  date: string;
  sales: number;
  team: TeamMember[];
  conversations: Conversation[];
  camera: CameraSummary;
  complaints: Complaint[];
  /** False drops the lines Spark marked as the shopper's from every transcript. */
  includeCustomer?: boolean;
};

const normalise = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
const words = (s: string) => new Set(normalise(s).split(" ").filter(Boolean));

/**
 * The rep's own words for a quote: the exact text if it appears in one of their lines, the whole
 * line if it matches once case and punctuation are ignored, otherwise their closest line.
 */
export function groundQuote(quote: string, conversation: Conversation): string {
  const wantedText = normalise(quote);
  const exact = conversation.lines.find((l) => l.text.includes(quote.trim()));
  if (wantedText && exact) return quote.trim();
  const loose = conversation.lines.find((l) => normalise(l.text).includes(wantedText));
  if (wantedText && loose) return loose.text;
  const wanted = words(quote);
  const overlap = (text: string) => [...words(text)].filter((w) => wanted.has(w)).length;
  return conversation.lines.reduce((best, l) => (overlap(l.text) > overlap(best.text) ? l : best)).text;
}

const offsetSeconds = (at: string) => {
  const m = /^(\d+):([0-5]\d)$/.exec(at.trim());
  return m ? Number(m[1]) * 60 + Number(m[2]) : Number.POSITIVE_INFINITY;
};

/** The rep's real lines, with the camera notes slotted in by time. */
function transcriptFor(conversation: Conversation, notes: SparkMoment["cameraNotes"]): Line[] {
  const rep = conversation.lines.map((l) => ({ sec: l.atSec - conversation.startSec, who: "rep" as const, text: l.text, speaker: l.speaker }));
  const seen = notes.map((n) => ({ sec: offsetSeconds(n.at), who: "customer" as const, text: n.text.trim() })).filter((n) => n.text);
  return [...rep, ...seen]
    .sort((a, b) => a.sec - b.sec)
    .map((l) => ({
      at: Number.isFinite(l.sec) ? formatOffset(l.sec) : formatOffset(conversation.endSec - conversation.startSec),
      who: l.who,
      text: l.text,
      ...("speaker" in l && l.speaker ? { speaker: l.speaker } : {}),
    }));
}

const recordingLabel = (c: Conversation, team: Map<string, TeamMember>, date: string) => {
  const day = new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  return `${team.get(c.repId)?.section ?? "Floor"} · ${day}, ${formatClock(c.startSec)} · ${minutes(c.endSec - c.startSec)} min`;
};

function toMoments(spark: SparkMoment[], byId: Map<string, Conversation>): Moment[] {
  const used = new Set<string>();
  return spark.flatMap((m): Moment[] => {
    const c = byId.get(m.conversationId);
    if (!c || used.has(c.id)) return [];
    used.add(c.id);
    return [{
      time: formatClock(c.startSec),
      repId: c.repId,
      kind: m.kind,
      title: m.title,
      customer: m.customer,
      quote: groundQuote(m.quote, c),
      transcript: transcriptFor(c, m.cameraNotes),
      happened: m.happened,
      tryInstead: m.tryInstead,
    }];
  });
}

const unmatched = (complaint: Complaint): Dispute => ({
  time: complaint.time,
  repId: complaint.repId,
  kind: complaint.kind,
  title: "Complaint not checked",
  claim: complaint.claim,
  recording: "No matching recording",
  transcript: [],
  finding: "No conversation on the badge matched this complaint, so the recording can't settle it.",
  verdict: "unclear",
  outcome: "Talk to the rep and the customer directly.",
});

function toDisputes(spark: SparkDispute[], input: AssembleInput, byId: Map<string, Conversation>, team: Map<string, TeamMember>): Dispute[] {
  return input.complaints.map((complaint, i) => {
    const d = spark.find((s) => s.complaintIndex === i);
    if (!d) return unmatched(complaint);
    const c = d.conversationId ? byId.get(d.conversationId) : undefined;
    const settled = c && d.verdict !== "unclear";
    return {
      time: complaint.time,
      repId: complaint.repId,
      kind: complaint.kind,
      title: d.title,
      claim: complaint.claim,
      recording: c ? recordingLabel(c, team, input.date) : "No matching recording",
      // A verdict needs the recording behind it; without one the complaint stays open
      transcript: settled ? transcriptFor(c, []) : [],
      finding: d.finding,
      verdict: settled ? d.verdict : "unclear",
      outcome: d.outcome,
    };
  });
}

function toNotes(spark: SparkReport["notes"], team: Map<string, TeamMember>): RepNote[] {
  const seen = new Set<string>();
  return spark.filter((n) => team.has(n.repId) && !seen.has(n.repId) && seen.add(n.repId) && n.note.trim());
}

/** The conversations with the shopper's lines taken out; a conversation left with no staff lines is dropped. */
function withoutCustomer(conversations: Conversation[], speakers: string[]): Conversation[] {
  const drop = new Set(speakers.map((s) => s.trim()));
  return conversations
    .map((c) => ({ ...c, lines: c.lines.filter((l) => !l.speaker || !drop.has(l.speaker)) }))
    .filter((c) => c.lines.length > 0);
}

export function assembleReport(spark: SparkReport, input: AssembleInput): DayReport {
  const conversations = input.includeCustomer === false ? withoutCustomer(input.conversations, spark.customerSpeakers) : input.conversations;
  const byId = new Map(conversations.map((c) => [c.id, c]));
  const team = new Map(input.team.map((m) => [m.id, m]));
  const customers = input.camera.visits.length;
  return {
    date: input.date,
    headline: spark.headline.trim(),
    summary: spark.summary.trim(),
    customers,
    conversations: input.conversations.length,
    sales: input.sales,
    walkouts: Math.min(Math.max(0, spark.walkouts), customers),
    lostValue: Math.max(0, spark.lostValue),
    moments: toMoments(spark.moments, byId),
    disputes: toDisputes(spark.disputes, input, byId, team),
    notes: toNotes(spark.notes, team),
  };
}
