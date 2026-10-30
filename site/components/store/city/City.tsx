"use client";

import { Slab } from "../primitives";
import { Plant } from "../Building";
import { BRANCHES, ROWS } from "../branches";
import { DOOR, STORE } from "../shell";
import { C } from "../palette";
import { AVENUES, BACK_STREET, CITY, CROSS, PARK } from "./plan";
import { Bench, Flat, Lamp, LowShop, ParkedCar, Road, Strip, Tower, Tree, Zebra, type TowerSpec } from "./Props";
import { Traffic } from "./Vehicles";

const WIDTH = CITY.maxX - CITY.minX;
const TOWER_COLORS = ["#F4F2EE", "#E9EEF2", "#EFE9E1", "#E6ECE8"];
const BACK_ROW = ROWS[ROWS.length - 1];

function Streets() {
  return (
    <group>
      <Flat size={[WIDTH, CITY.maxZ - CITY.minZ]} position={[0, -0.15, (CITY.minZ + CITY.maxZ) / 2]} color={C.ground} />
      {AVENUES.map((av) => (
        <group key={av.rowZ}>
          <Strip along="x" across={av.sidewalk} from={CITY.minX} to={CITY.maxX} color={C.sidewalk} />
          <Slab size={[WIDTH, 0.12, 0.2]} position={[0, -0.03, av.sidewalk[1]]} color={C.kerb} />
          <Road along="x" across={av.road} from={CITY.minX} to={CITY.maxX} />
          <Strip along="x" across={av.farSidewalk} from={CITY.minX} to={CITY.maxX} color={C.sidewalk} />
        </group>
      ))}
      <Strip along="x" across={BACK_STREET.sidewalk} from={CITY.minX} to={CITY.maxX} color={C.sidewalk} />
      <Road along="x" across={BACK_STREET.road} from={CITY.minX} to={CITY.maxX} />
      {CROSS.xs.map((x) => (
        <group key={x}>
          {/* Sidewalks sit under the road, so the asphalt shows between them */}
          <Strip along="z" across={[x - CROSS.width / 2 - 2.5, x + CROSS.width / 2 + 2.5]} from={CROSS.from} to={CROSS.to} color={C.sidewalk} y={-0.1} />
          <Road along="z" across={[x - CROSS.width / 2, x + CROSS.width / 2]} from={CROSS.from} to={CROSS.to} y={-0.07} />
        </group>
      ))}
      {/* A crossing in front of every shop door */}
      {BRANCHES.map((b) => {
        const av = AVENUES.find((a) => a.rowZ === b.z) ?? AVENUES[0];
        return <Zebra key={b.id} x={b.x + DOOR.x} z0={av.road[0]} z1={av.road[1]} />;
      })}
    </group>
  );
}

const tower = (x: number, z: number, w: number, d: number, h: number, i: number): TowerSpec => ({
  x, z, w, d, h, color: TOWER_COLORS[i % TOWER_COLORS.length],
});

const TOWERS: TowerSpec[] = [
  // The block between the two back shops, right behind Main St
  tower(-15, BACK_ROW, 12, 16, 12, 0),
  tower(0, BACK_ROW - 1, 12, 16, 18, 1),
  tower(15, BACK_ROW, 12, 16, 15, 2),
  // Skyline behind the back street
  ...Array.from({ length: 18 }, (_, i) => tower(CITY.minX + 10 + i * 16.5, BACK_STREET.road[0] - 11 - (i % 2) * 2, 13, 18, 10 + ((i * 7) % 5) * 3.5, i)),
  // Edges of town
  tower(-130, BACK_ROW, 20, 20, 16, 3),
  tower(128, BACK_ROW, 20, 20, 14, 1),
  tower(-131, 0, 22, 18, 11, 2),
  tower(130, 0, 22, 18, 12, 0),
  tower(90, 0, 18, 16, 8, 3),
];

const LOW_SHOPS = [
  { x: -96, z: BACK_ROW, w: 16, d: 14, color: "#F3EEE6", awning: "#C2410C" },
  { x: -40, z: BACK_ROW + 2, w: 10, d: 12, color: "#EAF0EC", awning: "#0F766E" },
  { x: 39, z: BACK_ROW + 2, w: 8, d: 12, color: "#F1ECF4", awning: "#7C3AED" },
  { x: 91, z: BACK_ROW, w: 22, d: 14, color: "#F4F2EE", awning: "#B91C1C" },
  { x: -88, z: 0, w: 20, d: 14, color: "#EFE9E1", awning: "#1D4ED8" },
  { x: 45, z: 0, w: 18, d: 14, color: "#F3EEE6", awning: "#B45309" },
  { x: 68, z: 0, w: 16, d: 14, color: "#E9EEF2", awning: "#15803D" },
];

const PARKING = { x0: -76, x1: -38, z0: -7, z1: 8 } as const;
const PARKED_COLORS = ["#94A3B8", "#F9FAFB", "#3B82F6", "#1F2937", "#DC6B4A", "#F5C518"];

function ParkingLot() {
  const { x0, x1, z0, z1 } = PARKING;
  const bays = 12;
  const bay = (x1 - x0) / bays;
  return (
    <group>
      <Flat size={[x1 - x0, z1 - z0]} position={[(x0 + x1) / 2, -0.04, (z0 + z1) / 2]} color={C.road} />
      {Array.from({ length: bays + 1 }, (_, i) => (
        <Flat key={i} size={[0.12, 5]} position={[x0 + i * bay, -0.035, z0 + 2.5]} color={C.roadLine} />
      ))}
      {[0, 2, 3, 6, 8, 9, 11].map((i, k) => (
        <ParkedCar key={i} x={x0 + bay * (i + 0.5)} z={z0 + 2.5} color={PARKED_COLORS[k % PARKED_COLORS.length]} />
      ))}
    </group>
  );
}

function Park() {
  return (
    <group>
      <Strip along="x" across={[PARK.z0, PARK.z1]} from={CITY.minX} to={CITY.maxX} color={C.grass} y={-0.03} />
      {Array.from({ length: 24 }, (_, i) => (
        <Tree key={i} x={CITY.minX + 8 + i * 12 + (i % 2) * 3} z={PARK.z0 + 4 + (i % 3) * 5} scale={0.9 + (i % 3) * 0.2} />
      ))}
      {[-40, -12, 18, 46].map((x) => <Bench key={x} x={x} z={PARK.z0 + 1.6} />)}
    </group>
  );
}

/** Trees and lamps along each shop-side sidewalk, clear of doors and cross streets. */
function StreetFurniture() {
  return (
    <group>
      {AVENUES.map((av) => {
        const doors = BRANCHES.filter((b) => b.z === av.rowZ).map((b) => b.x + DOOR.x);
        const spots = Array.from({ length: 29 }, (_, i) => CITY.minX + 6 + i * 10).filter(
          (x) => doors.every((d) => Math.abs(x - d) > 5) && CROSS.xs.every((c) => Math.abs(x - c) > 6),
        );
        return spots.map((x, i) =>
          i % 2 === 0 ? <Tree key={`${av.rowZ}${x}`} x={x} z={av.sidewalk[1] - 0.6} /> : <Lamp key={`${av.rowZ}${x}`} x={x} z={av.sidewalk[1] - 0.6} />,
        );
      })}
      {BRANCHES.flatMap((b) => [-1, 1].map((s) => (
        <Plant key={`${b.id}${s}`} position={[b.x + DOOR.x + s * 3.2, 0, b.z + STORE.halfD + 1]} scale={1.2} />
      )))}
      {/* Green strip behind Main St and beside it */}
      {[-21, -15, -9, -3, 3, 9, 15, 21].map((x) => <Tree key={`b${x}`} x={x} z={-18} scale={0.9} />)}
      {[-21, 21].flatMap((x) => [-6, 4].map((z) => <Tree key={`s${x}${z}`} x={x} z={z} />))}
      {[-8, 8].map((x) => <Bench key={x} x={x} z={-15.5} />)}
    </group>
  );
}

export function City() {
  return (
    <group>
      <Streets />
      {TOWERS.map((t, i) => <Tower key={i} {...t} />)}
      {LOW_SHOPS.map((s) => <LowShop key={`${s.x}${s.z}`} {...s} />)}
      <ParkingLot />
      <Park />
      <StreetFurniture />
      <Traffic />
    </group>
  );
}
