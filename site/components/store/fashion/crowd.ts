import type { Waypoint } from "../routes";
import type { Walker } from "../people";
import { OFF_LEFT, OFF_RIGHT, STAND_OFF, at, back, enter, front, leave, shoppers, staffWalkers, stop, type StaffPaths } from "../routing";
import { ACCESSORIES, AISLES, COUNTER, DENIM_TABLE, FITTING, FOLD_TABLE, RAILS, ROUND_R, ROUND_RACKS, SHOE_WALL, SUNGLASS_SPINNER } from "./layout";

const BRANCH = "fashion";

const corridor = (x: number): Waypoint => ({ x, z: AISLES.corridorZ });
const backWalk = (x: number): Waypoint => ({ x, z: AISLES.backZ });
const [AISLE_L, AISLE_M, AISLE_R] = AISLES.x;
const PAY_X = COUNTER.x - COUNTER.w / 2 - STAND_OFF;
const pay = (dz: number): Waypoint => stop({ x: PAY_X, z: COUNTER.z + dz }, 5, [COUNTER.x, COUNTER.z + dz]);
const FIT_DOOR_X = FITTING.x + FITTING.w / 2 + 0.7;
const SHOE_STAND_X = SHOE_WALL.x + 1.4;
const roundSpot = (i: number, side: number) => ({ x: ROUND_RACKS[i].x + side * (ROUND_R + 0.5), z: ROUND_RACKS[i].z });

const SHOPPER_PATHS: Waypoint[][] = [
  // Womenswear, fitting room, pays
  [
    ...enter(OFF_LEFT),
    corridor(AISLE_M),
    at(front(RAILS.womenB, 0.4), 6, RAILS.womenB),
    corridor(AISLE_L),
    backWalk(AISLE_L),
    { x: FIT_DOOR_X, z: AISLES.backZ },
    stop({ x: FIT_DOOR_X, z: FITTING.zs[0] }, 8, [FITTING.x, FITTING.zs[0]]),
    { x: FIT_DOOR_X, z: AISLES.backZ },
    backWalk(AISLE_L),
    corridor(AISLE_L),
    corridor(AISLE_R),
    { x: AISLE_R, z: 5.6 },
    pay(0.8),
    ...leave(OFF_RIGHT),
  ],
  // Menswear, asks for a size, nobody helps, walks out
  [...enter(OFF_RIGHT), corridor(AISLE_R), at(front(RAILS.menB, -0.5), 9, RAILS.menB), corridor(AISLE_R), ...leave(OFF_LEFT)],
  // Round rack and folded tees
  [
    ...enter(OFF_LEFT),
    stop(roundSpot(1, 1), 5, [ROUND_RACKS[1].x, ROUND_RACKS[1].z]),
    { x: 3.4, z: 4.1 },
    at(front(FOLD_TABLE, 0.6), 5, FOLD_TABLE),
    ...leave(OFF_LEFT),
  ],
  // Shoes
  [
    ...enter(OFF_RIGHT),
    { x: -7, z: 6.6 },
    stop({ x: SHOE_STAND_X, z: 6 }, 6, [SHOE_WALL.x, 6]),
    stop({ x: SHOE_STAND_X, z: 1.6 }, 4, [SHOE_WALL.x, 1.6]),
    { x: -7, z: 6.6 },
    corridor(AISLE_R),
    { x: AISLE_R, z: 3.6 },
    pay(-0.8),
    ...leave(OFF_RIGHT),
  ],
  // Menswear rail from the back
  [
    ...enter(OFF_LEFT),
    corridor(AISLE_M),
    backWalk(AISLE_M),
    at(back(RAILS.menA, 0.4), 6, RAILS.menA),
    backWalk(AISLE_M),
    corridor(AISLE_M),
    ...leave(OFF_RIGHT),
  ],
  // Accessories: bag table, sunglasses, then pays
  [
    ...enter(OFF_RIGHT),
    { x: 6.6, z: 3.6 },
    at(front(ACCESSORIES, 0.4), 6, ACCESSORIES),
    { x: 11.6, z: 3.0 },
    stop({ x: SUNGLASS_SPINNER.x, z: SUNGLASS_SPINNER.z + 0.95 }, 5, [SUNGLASS_SPINNER.x, SUNGLASS_SPINNER.z]),
    { x: 11.4, z: 3.2 },
    pay(-0.8),
    ...leave(OFF_LEFT),
  ],
  // Denim table
  [
    ...enter(OFF_LEFT),
    corridor(AISLE_L),
    stop({ x: DENIM_TABLE.x + DENIM_TABLE.r + 0.6, z: DENIM_TABLE.z + 0.4 }, 6, [DENIM_TABLE.x, DENIM_TABLE.z]),
    corridor(AISLE_L),
    corridor(AISLE_M),
    ...leave(OFF_RIGHT),
  ],
  // Left round rack
  [...enter(OFF_RIGHT), corridor(AISLE_M), stop(roundSpot(0, 1), 6, [ROUND_RACKS[0].x, ROUND_RACKS[0].z]), corridor(AISLE_M), ...leave(OFF_LEFT)],
];

const STAFF_PATHS: StaffPaths = {
  chloe: {
    speed: 1.0,
    points: [
      at(back(RAILS.womenA, 0.3), 7, RAILS.womenA, "Styling an outfit"),
      at(back(RAILS.womenB, -0.3), 6, RAILS.womenB, "Pulling sizes"),
      { ...back(RAILS.womenA, 0.3), label: "Walking to Womenswear" },
    ],
  },
  tyler: {
    speed: 1.0,
    points: [
      at(back(RAILS.menB, 0.3), 7, RAILS.menB, "Folding shirts"),
      { x: AISLE_R + 6, z: AISLES.backZ, label: "Heading to the stockroom" },
      stop({ x: 13.5, z: AISLES.backZ }, 6, [16, AISLES.backZ], "Checking the stockroom"),
      { x: AISLE_R + 6, z: AISLES.backZ },
      { ...back(RAILS.menB, 0.3), label: "Back to Menswear" },
    ],
  },
  maya: {
    speed: 0.9,
    points: [
      stop({ x: FIT_DOOR_X + 0.9, z: FITTING.zs[1] }, 8, [FITTING.x, FITTING.zs[1]], "Checking on a fitting room"),
      stop({ x: FIT_DOOR_X + 0.9, z: FITTING.zs[2] }, 6, [FITTING.x, FITTING.zs[2]], "Bringing another size"),
      { x: FIT_DOOR_X + 0.9, z: FITTING.zs[1], label: "At the fitting rooms" },
    ],
  },
  ava: {
    speed: 0.9,
    points: [
      at(back(ACCESSORIES, -0.3), 7, ACCESSORIES, "Matching a bag to an outfit"),
      stop({ x: SUNGLASS_SPINNER.x - 0.9, z: SUNGLASS_SPINNER.z }, 6, [SUNGLASS_SPINNER.x, SUNGLASS_SPINNER.z], "Helping with sunglasses"),
      { ...back(ACCESSORIES, -0.3), label: "Back to Accessories" },
    ],
  },
  luis: {
    speed: 0.8,
    points: [
      stop({ x: COUNTER.x + 1.1, z: COUNTER.z - 0.8 }, 8, [COUNTER.x, COUNTER.z - 0.8], "Ringing up a sale"),
      stop({ x: COUNTER.x + 1.1, z: COUNTER.z + 0.8 }, 8, [COUNTER.x, COUNTER.z + 0.8], "Folding a purchase"),
      { x: COUNTER.x + 1.1, z: COUNTER.z - 0.8, label: "At the register" },
    ],
  },
};

export const FASHION_PEOPLE: Walker[] = [
  ...staffWalkers(BRANCH, STAFF_PATHS),
  ...shoppers(BRANCH, SHOPPER_PATHS, 2, 1.15, 80),
];
