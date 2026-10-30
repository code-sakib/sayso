"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { Block, Slab, type Vec3 } from "../primitives";
import { C } from "../palette";
import { AVENUES, BACK_STREET, CITY, CROSS } from "./plan";

type VehicleKind = "car" | "taxi" | "bus" | "van";
type VehicleSpec = { kind: VehicleKind; along: "x" | "z"; lane: number; dir: 1 | -1; speed: number; start: number; color?: string; from?: number; to?: number };

const CAR_COLORS = ["#F9FAFB", "#94A3B8", "#3B82F6", "#DC6B4A", "#1F2937", "#B91C1C"];

function Wheels({ xs, z, r = 0.32 }: { xs: number[]; z: number; r?: number }) {
  return (
    <>
      {xs.flatMap((x) => [z, -z].map((wz) => (
        <mesh key={`${x}${wz}`} position={[x, r, wz]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[r, r, 0.2, 16]} />
          <meshStandardMaterial color="#1F2328" roughness={0.8} />
        </mesh>
      )))}
    </>
  );
}

function VehicleBody({ kind, color }: { kind: VehicleKind; color: string }) {
  if (kind === "bus") {
    return (
      <group>
        <Block size={[10, 2.6, 2.4]} position={[0, 1.65, 0]} color="#2F6FD1" radius={0.3} />
        <Slab size={[9.4, 0.9, 2.42]} position={[0, 2.1, 0]} color={C.window} />
        <Slab size={[10.02, 0.3, 2.42]} position={[0, 0.65, 0]} color="#F9FAFB" />
        <Wheels xs={[-3.4, 3.4]} z={1.05} r={0.45} />
      </group>
    );
  }
  if (kind === "van") {
    return (
      <group>
        <Block size={[4.6, 2.1, 2]} position={[0, 1.4, 0]} color={color} radius={0.25} />
        <Slab size={[1.0, 0.7, 2.02]} position={[1.8, 1.9, 0]} color={C.window} />
        <Wheels xs={[-1.5, 1.5]} z={0.88} />
      </group>
    );
  }
  const body = kind === "taxi" ? "#F5C518" : color;
  return (
    <group>
      <Block size={[4.2, 0.8, 1.9]} position={[0, 0.75, 0]} color={body} radius={0.25} />
      <Block size={[2.3, 0.7, 1.7]} position={[-0.2, 1.45, 0]} color={body} radius={0.25} />
      <Slab size={[2.32, 0.46, 1.72]} position={[-0.2, 1.46, 0]} color={C.window} />
      {kind === "taxi" && <Block size={[0.6, 0.2, 0.3]} position={[-0.2, 1.9, 0]} color="#FFFFFF" radius={0.05} />}
      <Wheels xs={[-1.35, 1.35]} z={0.86} />
    </group>
  );
}

/** Traffic in both directions on every avenue: [kind, start x, colour index] per lane. */
const AVENUE_TRAFFIC: [VehicleKind, number, number][][] = [
  [["car", -110, 0], ["taxi", -40, 0], ["bus", 30, 0], ["car", 95, 2]],
  [["car", 110, 3], ["van", 50, 0], ["taxi", -10, 0], ["car", -80, 1]],
];

const BACK_LANES = [BACK_STREET.road[0] + 2, BACK_STREET.road[1] - 2];

const VEHICLES: VehicleSpec[] = [
  ...AVENUES.flatMap((av, a) =>
    AVENUE_TRAFFIC.flatMap((lane, l) =>
      lane
        .filter((_, i) => a === 0 || i % 2 === 0)
        .map(([kind, start, ci]): VehicleSpec => ({
          kind,
          along: "x",
          lane: av.carLanes[l],
          dir: l === 0 ? 1 : -1,
          speed: kind === "bus" ? 4.5 : 5.5 + ((start + a * 7) % 3) * 0.4,
          start: start + a * 23,
          color: CAR_COLORS[ci],
        })),
    ),
  ),
  { kind: "car", along: "x", lane: BACK_LANES[0], dir: -1, speed: 5, start: 20, color: CAR_COLORS[4] },
  { kind: "van", along: "x", lane: BACK_LANES[1], dir: 1, speed: 4.5, start: -60, color: "#E5E7EB" },
  ...CROSS.xs.map((x, i): VehicleSpec => ({
    kind: i % 2 ? "taxi" : "car",
    along: "z",
    lane: x + (i % 2 ? 1.7 : -1.7),
    dir: i % 2 ? 1 : -1,
    speed: 4.5,
    start: CROSS.from + 20 * i,
    color: CAR_COLORS[(i + 2) % CAR_COLORS.length],
    from: CROSS.from,
    to: CROSS.to - 3,
  })),
];

function Vehicle({ spec }: { spec: VehicleSpec }) {
  const ref = useRef<Group>(null);
  const from = spec.from ?? CITY.minX;
  const to = spec.to ?? CITY.maxX;
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const span = to - from;
    const raw = spec.start - from + spec.dir * spec.speed * clock.elapsedTime;
    const t = (((raw % span) + span) % span) + from;
    if (spec.along === "x") ref.current.position.x = t;
    else ref.current.position.z = t;
  });
  const heading = spec.along === "x" ? (spec.dir === 1 ? 0 : Math.PI) : spec.dir === 1 ? -Math.PI / 2 : Math.PI / 2;
  const pos: Vec3 = spec.along === "x" ? [spec.start, 0, spec.lane] : [spec.lane, 0, spec.start];
  return (
    <group ref={ref} position={pos} rotation={[0, heading, 0]}>
      <VehicleBody kind={spec.kind} color={spec.color ?? CAR_COLORS[0]} />
    </group>
  );
}

export function Traffic() {
  return <>{VEHICLES.map((v, i) => <Vehicle key={i} spec={v} />)}</>;
}
