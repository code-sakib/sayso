import type { Waypoint } from "../routes";
import { STORE } from "../shell";
import type { Walker } from "../people";
import { OFF_LEFT, OFF_RIGHT, STAND_OFF, at, back, enter, front, leave, shoppers, staffWalkers, stop, type StaffPaths } from "../routing";
import { AISLES, FIXTURES, LOUNGE, PROMO } from "./layout";

const corridor = (x: number): Waypoint => ({ x, z: AISLES.corridorZ });
const backWalk = (x: number): Waypoint => ({ x, z: AISLES.backZ });
const frontWalk = (x: number): Waypoint => ({ x, z: AISLES.frontZ });
const [AISLE_L, AISLE_M, AISLE_R] = AISLES.x;
const WALL_STAND = -STORE.halfD + 1.7;
const SIDE_STAND = -STORE.halfW + 2.8;

const { phoneA, phoneB, tablets, laptops, watches, cameras, counter, speakers } = FIXTURES;
const PAY_X = counter.x - counter.w / 2 - STAND_OFF;
const pay = (dz: number): Waypoint => stop({ x: PAY_X, z: counter.z + dz }, 5, [counter.x, counter.z + dz]);
const TV_SPOT = { x: LOUNGE.x + 2.6, z: LOUNGE.z };

const SHOPPER_PATHS: Waypoint[][] = [
  // Buys a phone
  [...enter(OFF_LEFT), corridor(AISLE_M), at(front(phoneB, 0.5), 7, phoneB), corridor(AISLE_R), frontWalk(AISLE_R), pay(0.8), ...leave(OFF_RIGHT)],
  // Watches the TV wall
  [
    ...enter(OFF_RIGHT),
    corridor(AISLE_M),
    backWalk(AISLE_M),
    stop({ x: -5, z: WALL_STAND }, 6, [-5, -STORE.halfD]),
    stop({ x: -11, z: WALL_STAND }, 5, [-11, -STORE.halfD]),
    backWalk(AISLE_L),
    corridor(AISLE_L),
    corridor(AISLE_M),
    ...leave(OFF_LEFT),
  ],
  // Laptops, then washing machines
  [
    ...enter(OFF_LEFT),
    frontWalk(AISLE_M),
    at(front(laptops, 0.6), 6, laptops),
    { x: SIDE_STAND, z: 4.5 },
    stop({ x: SIDE_STAND, z: -3 }, 5, [-STORE.halfW, -3]),
    { x: SIDE_STAND, z: 4.6 },
    { x: -5, z: 5.2 },
    ...leave(OFF_RIGHT),
  ],
  // Waits at the phone table, nobody comes, walks out
  [...enter(OFF_RIGHT), corridor(AISLE_M), corridor(AISLE_L), at(front(phoneA, 0.5), 10, phoneA), corridor(AISLE_L), corridor(AISLE_M), ...leave(OFF_LEFT)],
  // Headphones, speakers, pays
  [
    ...enter(OFF_LEFT),
    frontWalk(AISLE_R),
    corridor(AISLE_R),
    backWalk(AISLE_R),
    stop({ x: 8.4, z: WALL_STAND }, 6, [8.4, -STORE.halfD]),
    backWalk(AISLE_R),
    stop({ x: speakers.x - speakers.w / 2 - STAND_OFF, z: speakers.z }, 4, [speakers.x, speakers.z]),
    corridor(AISLE_R),
    frontWalk(AISLE_R),
    pay(-0.8),
    ...leave(OFF_LEFT),
  ],
  // Tablets and smartwatches
  [
    ...enter(OFF_RIGHT),
    corridor(AISLE_M),
    at(front(tablets), 5, tablets),
    corridor(AISLE_M),
    at(back(watches, 0.6), 5, watches),
    { x: AISLE_M, z: back(watches).z },
    ...leave(OFF_RIGHT),
  ],
  // Tries the gaming lounge
  [
    ...enter(OFF_LEFT),
    frontWalk(AISLE_R),
    { x: LOUNGE.x - 3.6, z: LOUNGE.z + 1.8 },
    stop({ x: LOUNGE.x, z: LOUNGE.z + 1.8 }, 7, [TV_SPOT.x, TV_SPOT.z]),
    { x: LOUNGE.x - 3.6, z: LOUNGE.z + 1.8 },
    frontWalk(AISLE_R),
    ...leave(OFF_RIGHT),
  ],
  // Looks at the new-launch stand by the door
  [...enter(OFF_RIGHT), stop({ x: PROMO.x + PROMO.r + 0.6, z: PROMO.z }, 6, [PROMO.x, PROMO.z]), ...leave(OFF_LEFT)],
];

type Role = "mobiles" | "tv" | "laptops" | "appliances" | "cashier";

/** Where each role works; every electronics branch staffs the same floor plan. */
const ROLE_PATHS: Record<Role, StaffPaths[string]> = {
  mobiles: {
    speed: 1.1,
    points: [
      at(back(phoneB, 0.4), 7, phoneB, "Showing phones"),
      at(back(phoneA, 0.6), 6, phoneA, "Helping a customer"),
      { ...back(phoneB, 0.4), label: "Walking to Mobiles" },
    ],
  },
  tv: {
    speed: 1.0,
    points: [
      stop({ x: -12, z: WALL_STAND + 0.9 }, 6, [-12, -STORE.halfD], "Demoing a 65-inch TV"),
      stop({ x: -6.5, z: WALL_STAND + 0.9 }, 6, [-6.5, -STORE.halfD], "Comparing TV models"),
      stop({ x: -3.4, z: WALL_STAND + 0.9 }, 5, [-3.4, -STORE.halfD], "Setting up a soundbar demo"),
      { x: -12, z: WALL_STAND + 0.9, label: "Walking to the TV wall" },
    ],
  },
  laptops: {
    speed: 1.0,
    points: [
      at(back(laptops, 0.5), 7, laptops, "Explaining laptop specs"),
      at(back(cameras, -0.4), 5, cameras, "Restocking cameras"),
      { ...back(laptops, 0.5), label: "Walking to Laptops" },
    ],
  },
  appliances: {
    speed: 0.95,
    points: [
      stop({ x: SIDE_STAND + 0.9, z: -7.8 }, 7, [-STORE.halfW, -7.8], "Showing refrigerators"),
      stop({ x: SIDE_STAND + 0.9, z: -3 }, 6, [-STORE.halfW, -3], "Explaining washer modes"),
      stop({ x: SIDE_STAND + 0.9, z: 3.9 }, 4, [-STORE.halfW, 3.9], "Checking AC stock"),
      { x: SIDE_STAND + 0.9, z: -7.8, label: "Walking to Appliances" },
    ],
  },
  cashier: {
    speed: 0.8,
    points: [
      stop({ x: counter.x + 1.1, z: counter.z - 0.8 }, 8, [counter.x, counter.z - 0.8], "Ringing up a sale"),
      stop({ x: counter.x + 1.1, z: counter.z + 0.8 }, 8, [counter.x, counter.z + 0.8], "Printing a receipt"),
      { x: counter.x + 1.1, z: counter.z - 0.8, label: "At the register" },
    ],
  },
};

/** Everyone in one electronics branch: its team (role → staff id) plus shoppers. */
export function electronicsPeople(branch: string, team: Record<Role, string>, seed: number): Walker[] {
  const paths: StaffPaths = Object.fromEntries(Object.entries(team).map(([role, id]) => [id, ROLE_PATHS[role as Role]]));
  return [...staffWalkers(branch, paths), ...shoppers(branch, SHOPPER_PATHS, 2, 1.25, seed)];
}
