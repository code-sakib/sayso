// The brief Muse Spark gets: the team, the day's numbers, every conversation in the rep's own
// words, every customer the camera saw, and the complaints to check. Pure text building, no I/O.

import type { Conversation } from "../timeline/conversations.ts";
import type { CameraSummary } from "../timeline/visits.ts";
import { formatClock, formatOffset } from "../timeline/clock.ts";
import type { Complaint } from "../types.ts";

export type TeamMember = { id: string; name: string; section: string };

export type ReportInput = {
  storeName: string;
  storeKind: string;
  date: string;
  team: TeamMember[];
  sales: number;
  conversations: Conversation[];
  camera: CameraSummary;
  /** Store clock span the camera file covers; null when there was no camera file. */
  cameraFrom: number | null;
  cameraTo: number | null;
  /** A shopper wore the badge on a field test, so the lines are the store staff talking to them. */
  shopperWore?: boolean;
  /** Field test: false when the shopper's voice must stay out of the report. */
  includeCustomer?: boolean;
  complaints: Complaint[];
};

export const SYSTEM_PROMPT = `You are SaySo, a retail sales coach. You write the nightly report a store owner reads after closing.

Privacy rules, always:
- The badge keeps only the rep's voice. Customers' words are never recorded. Never write or guess what a customer said.
- What a customer did comes only from the camera list: when they came, where they stood, how long they stood still, how long a rep was beside them.

How to write:
- Plain, warm, specific. Short sentences. No jargon, no scores. Titles in sentence case.
- Pick the 2 to 5 conversations most worth the owner's time: sales lost to something the rep said (walkout), long waits with no rep (wait), and great handling worth copying (save).
- A walkout is a customer who left without buying after a conversation went wrong, or after waiting with no rep. Count walkouts only from the evidence.
- "quote" must be copied exactly from one of the rep's lines in that conversation.
- "cameraNotes" are times within that conversation, like 0:40, and describe the customer's actions only.
- "tryInstead" gives the exact words to say next time, in quotes. For a save, say what to keep doing.
- One dispute per logged complaint, using its complaintIndex. Read the conversation it points to.
  cleared: the recording shows the rep did not do what was claimed.
  honoured: the recording shows the rep did say or do it, so the store should make it right.
  unclear: no conversation matches, so the recording can't settle it. Use conversationId null.
- One note for each rep who had a conversation today: one thing to keep, or one thing to change.

Also watch for, in any store:
- Language: if staff keep answering in a different language from the one the customer is using, call it out. Customers should be served in their own language.
- Side talk: staff talking, joking or calling out to each other in front of a waiting customer, instead of serving them.`;

const conversationBlock = (c: Conversation, team: Map<string, TeamMember>) => {
  const rep = team.get(c.repId);
  const lines = c.lines.map((l) => `  ${formatOffset(l.atSec - c.startSec)} ${l.speaker ? `[${l.speaker}]` : "rep"}: ${l.text}`).join("\n");
  return `${c.id} · ${formatClock(c.startSec)}–${formatClock(c.endSec)} · ${rep?.name ?? c.repId} (${c.repId}, ${rep?.section ?? "floor"})\n${lines}`;
};

const visitLine = (v: CameraSummary["visits"][number]) =>
  `${v.id} · in ${formatClock(v.startSec)}, out ${formatClock(v.endSec)} (${Math.round(v.endSec - v.startSec)} s) · stood ${v.spot} of frame · still for up to ${Math.round(v.longestStillSec)} s · rep beside them ${Math.round(v.withStaffSec)} s`;

/** The user message for one day. */
export function buildReportPrompt(input: ReportInput): string {
  const team = new Map(input.team.map((m) => [m.id, m]));
  const complaints = input.complaints.length === 0
    ? "None."
    : input.complaints.map((c, i) => `[${i}] ${c.time} · about ${team.get(c.repId)?.name ?? c.repId} (${c.repId}) · ${c.kind === "conduct" ? "how they behaved" : "what they promised"}: ${c.claim}`).join("\n");
  return [
    `Store: ${input.storeName} (${input.storeKind}). Day: ${input.date}.`,
    `Team: ${input.team.map((m) => `${m.name} (${m.id}, ${m.section})`).join("; ")}.`,
    `Sales rung up at the till today: ${input.sales}.`,
    ...(input.shopperWore && input.includeCustomer === false
      ? ["FIELD TEST, CUSTOMER VOICE OFF: a shopper wore the badge on a store visit. Lines are marked [file time/speaker]; speaker letters restart in each one-minute file. Work out which speaker labels are the shopper and list every one in customerSpeakers. Those lines are removed from the report after you reply, so judge the staff only from what the staff said: never quote, paraphrase or describe the shopper's words anywhere in the report. Refer to the staff as the rep named in the team list. A \"quote\" must be a staff line, copied exactly."]
      : input.shopperWore
      ? ["FIELD TEST: a shopper wore the badge on a store visit and agreed to be recorded, so every voice is kept and you may quote the shopper. Lines are marked [file time/speaker]; speaker letters restart in each one-minute file. Work out from what was said which speaker is the shopper and which are staff (staff may also talk to each other). Refer to the staff as the rep named in the team list. Coach the staff on how they treated this shopper. A \"quote\" must still be a staff line, copied exactly. Leave customerSpeakers empty."]
      : []),
    "",
    `CONVERSATIONS (badge audio, rep's voice only, clock times):`,
    input.conversations.length ? input.conversations.map((c) => conversationBlock(c, team)).join("\n\n") : "None recorded.",
    "",
    ...(input.cameraFrom === null || input.cameraTo === null
      ? ["CAMERA: no camera file today. Judge only from the conversations; don't invent customer actions."]
      : [
        `CAMERA (${formatClock(input.cameraFrom)}–${formatClock(input.cameraTo)}, ${input.camera.visits.length} customers, ${input.camera.staffSeen} staff seen):`,
        input.camera.visits.length ? input.camera.visits.map(visitLine).join("\n") : "No customers seen.",
      ]),
    "",
    "COMPLAINTS LOGGED BY THE MANAGER:",
    complaints,
    "",
    "Match customers to conversations by time. Write the report.",
  ].join("\n");
}
