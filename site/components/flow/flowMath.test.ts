import { test } from "node:test";
import assert from "node:assert/strict";
import { activeStep, filePhase, scrollProgress, waveBars } from "./flowMath.ts";

test("progress is 0 before the section and 1 at its end", () => {
  assert.equal(scrollProgress(900, 2700, 900), 0);
  assert.equal(scrollProgress(-1800, 2700, 900), 1);
});

test("files have not moved at the start and have all dropped by the time the machine works", () => {
  // Arrange
  const start = filePhase(0, 0);
  const working = filePhase(0.7, 5);

  // Assert
  assert.deepEqual([start.lift, start.drop], [0, 0]);
  assert.deepEqual([working.lift, working.drop], [1, 1]);
});

test("the machine walks through its steps and finishes", () => {
  assert.equal(activeStep(0.5, 4), 0);
  assert.equal(activeStep(0.7, 4), 1);
  assert.equal(activeStep(1, 4), 4);
});

test("waveform lanes take turns and stay in range", () => {
  // Act
  const bars = waveBars(24);

  // Assert
  assert.equal(bars.length, 24);
  for (const b of bars) {
    assert.ok(b.staff >= 0.15 && b.staff <= 1 && b.customer >= 0.15 && b.customer <= 1);
    assert.ok(b.staff === 0.15 || b.customer === 0.15, "only one lane talks at a time");
  }
  assert.equal(bars[0].customer, 0.15);
  assert.equal(bars[6].staff, 0.15);
});
