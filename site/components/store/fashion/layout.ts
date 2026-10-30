// Clothing branch floor plan, in metres (local to the branch; see ../shell.ts).

type Box = { x: number; z: number; w: number; d: number };

const RAIL = { w: 3.6, d: 0.7 };

/** Straight clothes rails in two rows; shoppers browse from either side. */
export const RAILS = {
  womenA: { x: -8.5, z: -4, ...RAIL },
  womenB: { x: -3, z: -4, ...RAIL },
  menA: { x: 2.5, z: -4, ...RAIL },
  menB: { x: 8, z: -4, ...RAIL },
} satisfies Record<string, Box>;

export const ROUND_RACKS = [{ x: -8.5, z: 2.4 }, { x: 2.5, z: 2.4 }] as const;
export const ROUND_R = 1.1;
export const FOLD_TABLE = { x: -3, z: 2.4, w: 2.8, d: 1.4 } as const;

export const AISLES = { corridorZ: -0.8, backZ: -7.4, x: [-5.75, -0.25, 5.25] } as const;

/** Fitting rooms along the left wall, curtains facing into the shop. */
export const FITTING = { x: -14.6, zs: [-8.6, -6.6, -4.6], w: 2.4, d: 1.9 } as const;
export const SHOE_WALL = { x: -15.6, z0: 0, z1: 8 } as const;
export const COUNTER = { x: 12.6, z: 5.6, w: 1.2, d: 3.8 } as const;
/** Accessories corner: a table of bags, hats and belts, a sunglasses spinner and a hat tree. */
export const ACCESSORIES = { x: 9.2, z: 1.8, w: 3, d: 1.3 } as const;
export const SUNGLASS_SPINNER = { x: 13.6, z: -1.6, r: 0.45 } as const;
export const HAT_TREE = { x: 14.3, z: 1.6 } as const;
/** Round denim table between the fitting rooms and the shoe wall. */
export const DENIM_TABLE = { x: -11.8, z: -1.4, r: 0.85 } as const;

export const MANNEQUINS = [
  { x: -9.5, z: 9.3 }, { x: -8, z: 9.6 }, { x: -6.5, z: 9.3 },
  { x: 6, z: 9.3 }, { x: 7.5, z: 9.6 }, { x: 9, z: 9.3 },
] as const;

export const FASHION_COLORS = {
  accent: "#B4533A",
  oak: "#D9B98F",
  floor: "#EDE3D3",
  floorTile: "#E4D7C3",
  rail: "#9CA3AF",
} as const;

export const CLOTHES = ["#F4EDE4", "#1F2937", "#B4533A", "#7C9CBF", "#E9C46A", "#8BA888", "#D98E73", "#4B5563", "#F2B5C4", "#3B5B7A"];

/** Labels for the section pins placed in Fixtures.tsx. */
export const FASHION_SECTIONS = [
  { id: "fashion-section-women", label: "Womenswear" },
  { id: "fashion-section-men", label: "Menswear" },
  { id: "fashion-section-fitting", label: "Fitting rooms" },
  { id: "fashion-section-shoes", label: "Shoes" },
  { id: "fashion-section-accessories", label: "Accessories" },
  { id: "fashion-section-denim", label: "Denim" },
  { id: "fashion-section-checkout", label: "Checkout" },
];
