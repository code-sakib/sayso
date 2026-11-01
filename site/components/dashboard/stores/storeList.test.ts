import { test } from "node:test";
import assert from "node:assert/strict";
import { addStore, removeStore, storeId, validateStore, type OwnerStore } from "./storeList.ts";

const demo: OwnerStore = { id: "electronics", name: "Main St", kind: "Electronics", badges: 5, accent: "#1B5E42", isDemo: true };

test("makes a url-safe id and avoids ids already taken", () => {
  assert.equal(storeId("Park Ave Mall!", []), "park-ave-mall");
  assert.equal(storeId("Main St", ["main-st"]), "main-st-2");
  assert.equal(storeId("  ***  ", []), "store");
});

test("rejects an empty, too long, duplicate name or bad badge count", () => {
  const ok = { name: "Park Ave", kind: "Clothing" as const, badges: 4 };
  assert.equal(validateStore(ok, [demo]), null);
  assert.match(validateStore({ ...ok, name: "  " }, [demo]) ?? "", /name/);
  assert.match(validateStore({ ...ok, name: "x".repeat(41) }, [demo]) ?? "", /40/);
  assert.match(validateStore({ ...ok, name: "main st" }, [demo]) ?? "", /already/);
  assert.match(validateStore({ ...ok, badges: 0 }, [demo]) ?? "", /Badges/);
  assert.match(validateStore({ ...ok, badges: 2.5 }, [demo]) ?? "", /Badges/);
});

test("adds a store without changing the original list", () => {
  // Arrange
  const list = [demo];

  // Act
  const next = addStore(list, { name: " Park Ave ", kind: "Clothing", badges: 3 });

  // Assert
  assert.equal(list.length, 1);
  assert.deepEqual(next[1], { id: "park-ave", name: "Park Ave", kind: "Clothing", badges: 3, accent: "#7C3AED", isDemo: false });
});

test("removes a store by id", () => {
  assert.deepEqual(removeStore([demo], "electronics"), []);
  assert.deepEqual(removeStore([demo], "nope"), [demo]);
});
