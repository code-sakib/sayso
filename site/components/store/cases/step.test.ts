import { test } from "node:test";
import assert from "node:assert/strict";
import { keepOut, stepToward } from "./step.ts";

test("moves towards the target by speed × time", () => {
  // Arrange
  const from = { x: 0, z: 0 };
  const to = { x: 10, z: 0 };

  // Act
  const step = stepToward(from, to, 2, 0.5);

  // Assert
  assert.equal(step.x, 1);
  assert.equal(step.z, 0);
  assert.equal(step.moving, true);
});

test("stops on the target and faces the given point", () => {
  // Arrange
  const from = { x: 0.01, z: 0 };
  const to = { x: 0, z: 0, faceX: 0, faceZ: 5 };

  // Act
  const step = stepToward(from, to, 2, 0.5);

  // Assert
  assert.deepEqual([step.x, step.z, step.moving], [0, 0, false]);
  assert.equal(step.heading, 0);
});

test("leaves a point outside the keep-clear circle where it is", () => {
  // Arrange
  const zone = { x: 0, z: 0, r: 2 };

  // Act
  const out = keepOut({ x: 3, z: 0 }, zone);

  // Assert
  assert.deepEqual(out, { x: 3, z: 0 });
});

test("pushes a point inside the keep-clear circle out to its edge", () => {
  // Arrange
  const zone = { x: 1, z: 1, r: 2 };

  // Act
  const out = keepOut({ x: 1, z: 1.5 }, zone);

  // Assert
  assert.equal(out.x, 1);
  assert.equal(out.z, 3);
});
