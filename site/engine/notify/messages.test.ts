import { test } from "node:test";
import assert from "node:assert/strict";
import { arrivedMessage, eventMessage, storeClockNow } from "./messages.ts";

test("started message names the wearer and the time", () => {
  const text = eventMessage({ event: "started" }, "SB-01", "Jake Miller", 18 * 3600 + 40 * 60);
  assert.equal(text, "🔴 Recording started · Jake Miller (SB-01) · 18:40");
});

test("stopped message says how many minutes reached the server", () => {
  const text = eventMessage({ event: "stopped", uploaded: 23 }, "SB-01", "Jake Miller", 19 * 3600 + 5 * 60);
  assert.equal(text, "⚪ Recording stopped · Jake Miller (SB-01) · 19:05 · 23 min sent");
});

test("stopped message leaves out minutes when the badge sent none", () => {
  const text = eventMessage({ event: "stopped" }, "SB-01", "Jake Miller", 19 * 3600);
  assert.equal(text, "⚪ Recording stopped · Jake Miller (SB-01) · 19:00");
});

test("arrived message gives the piece's start time and length", () => {
  const text = arrivedMessage({ badgeId: "SB-01", repId: "jake", startSec: 18 * 3600 + 41 * 60 + 5, durationSec: 60, file: "x.wav" }, "Jake Miller");
  assert.equal(text, "🎙️ Recording arrived · Jake Miller (SB-01) · 18:41 · 1 min");
});

test("store clock reads a moment in India time", () => {
  // 13:10 UTC is 18:40 in India
  assert.equal(storeClockNow(new Date("2026-11-04T13:10:00Z")), 18 * 3600 + 40 * 60);
});
