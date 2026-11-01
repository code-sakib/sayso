// The owner's list of stores, as pure functions over plain data. Persisted by ownerStores.ts.

export type StoreKind = "Electronics" | "Clothing";

export type OwnerStore = {
  id: string;
  name: string;
  kind: StoreKind;
  badges: number;
  accent: string;
  /** One of the three demo stores that come with reports. */
  isDemo: boolean;
};

export type NewStore = { name: string; kind: StoreKind; badges: number };

export const NAME_MAX = 40;
export const BADGES_MAX = 50;
const ACCENTS = ["#7C3AED", "#B45309", "#0F766E", "#BE185D", "#4338CA", "#15803D"];

/** A URL-safe id from the store name, made unique against the existing ids. */
export function storeId(name: string, taken: string[]) {
  const base = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "store";
  let id = base;
  for (let n = 2; taken.includes(id); n++) id = `${base}-${n}`;
  return id;
}

/** Why a new store can't be added, or null when it can. */
export function validateStore(input: NewStore, list: OwnerStore[]): string | null {
  const name = input.name.trim();
  if (!name) return "Give the store a name.";
  if (name.length > NAME_MAX) return `Keep the name under ${NAME_MAX} characters.`;
  if (list.some((s) => s.name.toLowerCase() === name.toLowerCase())) return "You already have a store with that name.";
  if (!Number.isInteger(input.badges) || input.badges < 1 || input.badges > BADGES_MAX) return `Badges must be a whole number from 1 to ${BADGES_MAX}.`;
  return null;
}

/** A new list with the store added at the end. Call validateStore first. */
export function addStore(list: OwnerStore[], input: NewStore): OwnerStore[] {
  const store: OwnerStore = {
    id: storeId(input.name, list.map((s) => s.id)),
    name: input.name.trim(),
    kind: input.kind,
    badges: input.badges,
    accent: ACCENTS[list.filter((s) => !s.isDemo).length % ACCENTS.length],
    isDemo: false,
  };
  return [...list, store];
}

export const removeStore = (list: OwnerStore[], id: string) => list.filter((s) => s.id !== id);
