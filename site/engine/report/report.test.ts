import { test } from "node:test";
import assert from "node:assert/strict";
import { assembleReport, groundQuote } from "./assemble.ts";
import { buildReportPrompt } from "./prompt.ts";
import { SparkReport, sparkResponseFormat } from "./schema.ts";
import type { Conversation } from "../timeline/conversations.ts";
import type { Complaint } from "../types.ts";

const T = 18 * 3600;
const jake: Conversation = {
  id: "c1", repId: "jake", badgeId: "SB-01", startSec: T, endSec: T + 60,
  lines: [
    { atSec: T, endSec: T + 4, text: "Hey, that's the new one." },
    { atSec: T + 14, endSec: T + 20, text: "Honestly it's all on the website, man." },
  ],
};
const team = [{ id: "jake", name: "Jake Miller", section: "Mobiles" }, { id: "priya", name: "Priya Nair", section: "TV" }];
const camera = { visits: [{ id: "v1", startSec: T - 10, endSec: T + 70, spot: "left" as const, longestStillSec: 30, withStaffSec: 40 }], staffSeen: 1 };
const complaints: Complaint[] = [
  { time: "19:10", repId: "jake", kind: "conduct", claim: "He was rude to me." },
  { time: "19:30", repId: "priya", kind: "promise", claim: "She promised free delivery." },
];

const spark = (over: Partial<SparkReport> = {}): SparkReport => ({
  headline: "One phone buyer was sent to the website.",
  summary: "A quiet evening.",
  walkouts: 3,
  lostValue: 900,
  moments: [
    {
      conversationId: "c1", kind: "walkout", title: "Sent to the website", customer: "A student with a cracked phone.",
      quote: "it's all on the website", cameraNotes: [{ at: "0:50", text: "Puts the phone down and leaves." }],
      happened: "Jake pointed to the website.", tryInstead: "\"It's $37 a month.\"",
    },
    { conversationId: "c99", kind: "save", title: "Made up", customer: "", quote: "", cameraNotes: [], happened: "", tryInstead: "" },
  ],
  disputes: [{ complaintIndex: 0, conversationId: "c1", title: "\"He was rude\"", finding: "He was polite.", verdict: "cleared", outcome: "Thank the customer." }],
  notes: [{ repId: "jake", note: "Learn the plans." }, { repId: "ghost", note: "Not on the team." }],
  customerSpeakers: [],
  ...over,
});

const input = { date: "2026-11-02", sales: 4, team, conversations: [jake], camera, complaints };

test("builds the report from real conversations and drops ones the model made up", () => {
  const report = assembleReport(spark(), input);
  assert.equal(report.moments.length, 1);
  const [m] = report.moments;
  assert.equal(m.time, "18:00");
  assert.equal(m.repId, "jake");
  assert.deepEqual(m.transcript.map((l) => [l.at, l.who]), [["0:00", "rep"], ["0:14", "rep"], ["0:50", "customer"]]);
  assert.deepEqual(report.notes.map((n) => n.repId), ["jake"]);
});

test("counts customers from the camera and never more walkouts than customers", () => {
  const report = assembleReport(spark(), input);
  assert.equal(report.customers, 1);
  assert.equal(report.conversations, 1);
  assert.equal(report.walkouts, 1);
});

test("gives every logged complaint exactly one verdict, unclear when nothing was checked", () => {
  const report = assembleReport(spark(), input);
  assert.deepEqual(report.disputes.map((d) => [d.repId, d.verdict, d.transcript.length > 0]), [
    ["jake", "cleared", true],
    ["priya", "unclear", false],
  ]);
  assert.equal(report.disputes[0].claim, "He was rude to me.");
});

test("a verdict without a matching recording becomes unclear", () => {
  const report = assembleReport(spark({ disputes: [{ complaintIndex: 0, conversationId: null, title: "x", finding: "y", verdict: "cleared", outcome: "z" }] }), input);
  assert.equal(report.disputes[0].verdict, "unclear");
  assert.equal(report.disputes[0].transcript.length, 0);
});

test("keeps a quote the rep really said and swaps one they didn't for their closest line", () => {
  assert.equal(groundQuote("it's all on the website", jake), "it's all on the website");
  assert.equal(groundQuote("honestly its all on the website man", jake), "Honestly it's all on the website, man.");
  assert.equal(groundQuote("The website has everything you need", jake), "Honestly it's all on the website, man.");
});

test("the prompt carries the rep's words, the camera and the complaints, and no customer speech", () => {
  const prompt = buildReportPrompt({ storeName: "Main St", storeKind: "Electronics", ...input, cameraFrom: T - 60, cameraTo: T + 600 });
  assert.match(prompt, /0:14 rep: Honestly it's all on the website, man\./);
  assert.match(prompt, /v1 · in 17:59/);
  assert.match(prompt, /\[1\] 19:30 · about Priya Nair/);
  assert.doesNotMatch(prompt, /customer:/);
});

test("the structured-output schema accepts a valid reply and rejects extra fields", () => {
  assert.equal(sparkResponseFormat().json_schema.strict, true);
  assert.ok(SparkReport.safeParse(spark()).success);
  assert.equal(SparkReport.safeParse({ ...spark(), extra: 1 }).success, false);
});
