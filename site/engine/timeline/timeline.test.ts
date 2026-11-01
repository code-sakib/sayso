import { test } from "node:test";
import assert from "node:assert/strict";
import { formatClock, formatOffset, parseClock } from "./clock.ts";
import { buildConversations, keepWearer } from "./conversations.ts";
import { iou, summariseCamera } from "./visits.ts";
import type { Frame } from "../meta/samParse.ts";

test("reads store clock times with and without seconds", () => {
  assert.equal(parseClock("18:42"), 18 * 3600 + 42 * 60);
  assert.equal(parseClock("09:05:30"), 9 * 3600 + 5 * 60 + 30);
  assert.equal(parseClock("25:00"), null);
  assert.equal(parseClock("6pm"), null);
});

test("formats clock times and conversation offsets", () => {
  assert.equal(formatClock(18 * 3600 + 42 * 60 + 59), "18:42");
  assert.equal(formatOffset(74), "1:14");
  assert.equal(formatOffset(0), "0:00");
});

test("keeps only the voice heard most when a badge picks up a second speaker", () => {
  const turns = [
    { startMs: 0, endMs: 6000, text: "Welcome in", speaker: "A" },
    { startMs: 6000, endMs: 7000, text: "How much is it", speaker: "B" },
    { startMs: 7000, endMs: 12000, text: "It's thirty seven a month", speaker: "A" },
  ];
  assert.deepEqual(keepWearer(turns).map((t) => t.text), ["Welcome in", "It's thirty seven a month"]);
});

test("keeps every turn when the transcript has no speaker labels", () => {
  const turns = [{ startMs: 0, endMs: 1000, text: "Hi" }];
  assert.equal(keepWearer(turns).length, 1);
});

test("splits a rep's day into conversations at long silences and puts them on the store clock", () => {
  const start = parseClock("18:40")!;
  const convs = buildConversations([
    {
      repId: "jake", badgeId: "SB-01", startSec: start,
      turns: [
        { startMs: 0, endMs: 4000, text: "Hey, that's the new one." },
        { startMs: 10_000, endMs: 14_000, text: "It's all on the website." },
        { startMs: 200_000, endMs: 203_000, text: "Hi there, need a hand?" },
      ],
    },
    { repId: "priya", badgeId: "SB-02", startSec: start + 60, turns: [{ startMs: 0, endMs: 3000, text: "How far is the sofa?" }] },
  ]);
  assert.deepEqual(convs.map((c) => [c.id, c.repId, formatClock(c.startSec), c.lines.length]), [
    ["c1", "jake", "18:40", 2],
    ["c2", "priya", "18:41", 1],
    ["c3", "jake", "18:43", 1],
  ]);
});

test("measures box overlap", () => {
  const a = { x1: 0, y1: 0, x2: 10, y2: 10 };
  assert.equal(iou(a, a), 1);
  assert.equal(iou(a, { x1: 20, y1: 20, x2: 30, y2: 30 }), 0);
});

const box = (x: number) => ({ x1: x, y1: 100, x2: x + 40, y2: 300 });
const frames = (n: number, objects: (i: number) => Frame["objects"]): Frame[] =>
  Array.from({ length: n }, (_, i) => ({ index: i, objects: objects(i) }));

test("tells staff from customers and times each customer's visit", () => {
  // Person 1 is the rep (also found by the staff prompt); person 2 stands still on the left beside them
  const people = frames(20, () => [
    { id: 1, box: box(100), frameW: 640, frameH: 360 },
    { id: 2, box: box(150), frameW: 640, frameH: 360 },
  ]);
  const staff = frames(20, () => [{ id: 9, box: box(100), frameW: 640, frameH: 360 }]);
  const summary = summariseCamera(people, staff, parseClock("18:00")!, 2);
  assert.equal(summary.staffSeen, 1);
  assert.equal(summary.visits.length, 1);
  const [v] = summary.visits;
  assert.equal(v.endSec - v.startSec, 10);
  assert.equal(v.spot, "left");
  assert.equal(v.withStaffSec, 10);
  assert.ok(v.longestStillSec >= 9);
});

test("ignores people who only pass through", () => {
  const people = frames(4, (i) => [{ id: 3, box: box(i * 150), frameW: 640, frameH: 360 }]);
  assert.equal(summariseCamera(people, [], 0, 2).visits.length, 0);
});
