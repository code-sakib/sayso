import { test } from "node:test";
import assert from "node:assert/strict";
import { buildRoute, sampleRoute } from "./routes.ts";

test("total time is walking distance over speed plus waits", () => {
  const route = buildRoute([{ x: 0, z: 0 }, { x: 4, z: 0, wait: 2 }, { x: 4, z: 3 }], 2);
  assert.equal(route.total, 2 + 2 + 1.5);
});

test("walks in a straight line between points", () => {
  const route = buildRoute([{ x: 0, z: 0 }, { x: 4, z: 0 }], 1);
  const s = sampleRoute(route, 1);
  assert.deepEqual([s.x, s.z, s.moving], [1, 0, true]);
  assert.equal(s.heading, Math.PI / 2);
});

test("stands still and faces the target while waiting", () => {
  const route = buildRoute([{ x: 0, z: 0 }, { x: 2, z: 0, wait: 5, face: [2, -3] }, { x: 2, z: 2 }], 1);
  const s = sampleRoute(route, 4);
  assert.deepEqual([s.x, s.z, s.moving], [2, 0, false]);
  assert.equal(s.heading, Math.PI);
});

test("reports the label of the point being walked to or stood at", () => {
  const route = buildRoute([{ x: 0, z: 0 }, { x: 2, z: 0, wait: 3, label: "Helping a customer" }, { x: 4, z: 0 }], 1);
  assert.equal(sampleRoute(route, 1).label, "Helping a customer");
  assert.equal(sampleRoute(route, 3).label, "Helping a customer");
  assert.equal(sampleRoute(route, 5.5).label, undefined);
});

test("loops forever and handles negative time", () => {
  const route = buildRoute([{ x: 0, z: 0 }, { x: 0, z: 10 }], 1);
  assert.equal(sampleRoute(route, 13).z, 3);
  assert.equal(sampleRoute(route, -2).z, 8);
});

test("rejects routes that cannot be walked", () => {
  assert.throws(() => buildRoute([{ x: 0, z: 0 }], 1));
  assert.throws(() => buildRoute([{ x: 0, z: 0 }, { x: 1, z: 1 }], 0));
});
