import { test } from "node:test";
import assert from "node:assert/strict";
import { snapTarget } from "./snap.ts";

const STORES = [
  { id: "left", x: -64, z: -50 },
  { id: "middle", x: 0, z: 0 },
  { id: "right", x: 60, z: -50 },
];

test("a short drag stays at the current store", () => {
  // Arrange
  const start = { x: 0, z: 1 };
  // Act
  const pick = snapTarget(STORES, start, { x: 1, z: 1.5 });
  // Assert
  assert.equal(pick.id, "middle");
});

test("a flick towards the back right goes to the right store", () => {
  const pick = snapTarget(STORES, { x: 0, z: 1 }, { x: 3, z: -1 });
  assert.equal(pick.id, "right");
});

test("a flick towards the back left goes to the left store", () => {
  const pick = snapTarget(STORES, { x: 0, z: 1 }, { x: -3, z: -2 });
  assert.equal(pick.id, "left");
});

test("from the right store, dragging left crosses to the left store", () => {
  const pick = snapTarget(STORES, { x: 60, z: -48 }, { x: 55, z: -48 });
  assert.equal(pick.id, "left");
});

test("dragging away from every store returns to the current one", () => {
  const pick = snapTarget(STORES, { x: 0, z: 1 }, { x: 0, z: 6 });
  assert.equal(pick.id, "middle");
});
