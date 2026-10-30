import { AISLES, FIXTURES, LOUNGE, PROMO, SHELF_WALL, TV_WALL } from "./layout";
import { STORE } from "../shell";

export type Section = {
  id: string;
  label: string;
  /** Where the floating section label sits. */
  pin: [number, number, number];
};

const { phoneA, phoneB, laptops, counter } = FIXTURES;
const tvMid = (TV_WALL.x0 + TV_WALL.x1) / 2;
const shelfMid = (SHELF_WALL.x0 + SHELF_WALL.x1) / 2;

export const SECTIONS: Section[] = [
  { id: "mobiles", label: "Mobiles", pin: [(phoneA.x + phoneB.x) / 2, 2.6, phoneA.z] },
  { id: "tv", label: "TV & Home theater", pin: [tvMid, 5.4, -STORE.halfD] },
  { id: "laptops", label: "Laptops", pin: [laptops.x, 2.5, laptops.z] },
  { id: "appliances", label: "Appliances", pin: [-STORE.halfW + 0.6, 3.8, -5] },
  { id: "audio", label: "Audio", pin: [shelfMid, 4.6, -STORE.halfD + 0.4] },
  { id: "gaming", label: "Gaming", pin: [LOUNGE.x + 2.4, 3.2, LOUNGE.z] },
  { id: "billing", label: "Checkout", pin: [counter.x, 2.6, counter.z + 1.4] },
  { id: "launch", label: "New launch", pin: [PROMO.x, 3.6, PROMO.z] },
];
