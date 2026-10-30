// How a person looks, shared by the 3D figure and the cartoon avatar on the profile card.

export type HairStyle = "short" | "long" | "bun" | "curly" | "bald";

export type Look = {
  skin: string;
  hair: string;
  hairStyle: HairStyle;
  shirt: string;
  pants: string;
};

export const SKINS = ["#F3CFB3", "#E8B896", "#D9A47A", "#C68E62", "#A8724E", "#8D5A3B", "#6B4128"];
export const HAIRS = ["#2A211C", "#5A3B24", "#C9A15A", "#8B4A2B", "#1F1A17", "#A8A29E", "#E2C27A"];
export const STYLES: HairStyle[] = ["short", "long", "curly", "bun", "short", "long", "bald"];
export const SHIRTS = ["#3B82F6", "#E98E41", "#8B5CF6", "#F2C14E", "#EF7A85", "#64748B", "#14B8A6", "#F9FAFB", "#DC6B4A", "#0EA5E9"];
export const PANTS = ["#2D3440", "#3B4A6B", "#5B4636", "#1F2937", "#6B7280"];

const pick = <T,>(list: readonly T[], i: number) => list[i % list.length];

/** A varied but repeatable look for the n-th shopper. */
export const shopperLook = (n: number): Look => ({
  skin: pick(SKINS, n * 3 + 1),
  hair: pick(HAIRS, n * 5 + 2),
  hairStyle: pick(STYLES, n * 2 + 1),
  shirt: pick(SHIRTS, n * 3 + 1),
  pants: pick(PANTS, n),
});
