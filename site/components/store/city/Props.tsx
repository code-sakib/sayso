"use client";

// Small reusable city pieces: ground strips, roads, trees, lamps and buildings.

import { Block, Cylinder, Slab, type Vec3 } from "../primitives";
import { C } from "../palette";

export function Flat({ size, position, color }: { size: [number, number]; position: Vec3; color: string }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.9} />
    </mesh>
  );
}

/** A strip of ground from a to b across, spanning x0..x1 (along: "x") or z0..z1 (along: "z"). */
export function Strip({ along, across, from, to, color, y = -0.02 }: { along: "x" | "z"; across: readonly [number, number]; from: number; to: number; color: string; y?: number }) {
  const len = to - from;
  const mid = (from + to) / 2;
  const w = across[1] - across[0];
  const c = (across[0] + across[1]) / 2;
  return along === "x"
    ? <Flat size={[len, w]} position={[mid, y, c]} color={color} />
    : <Flat size={[w, len]} position={[c, y, mid]} color={color} />;
}

/** A straight road with a dashed centre line. */
export function Road({ along, across, from, to, y = -0.06 }: { along: "x" | "z"; across: readonly [number, number]; from: number; to: number; y?: number }) {
  const center = (across[0] + across[1]) / 2;
  const dashes = Math.floor((to - from) / 4);
  return (
    <group>
      <Strip along={along} across={across} from={from} to={to} color={C.road} y={y} />
      {Array.from({ length: dashes }, (_, i) => {
        const t = from + i * 4 + 2;
        return along === "x"
          ? <Flat key={i} size={[1.8, 0.14]} position={[t, y + 0.01, center]} color={C.roadLine} />
          : <Flat key={i} size={[0.14, 1.8]} position={[center, y + 0.01, t]} color={C.roadLine} />;
      })}
    </group>
  );
}

export function Zebra({ x, z0, z1 }: { x: number; z0: number; z1: number }) {
  const n = Math.floor((z1 - z0) / 0.9);
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <Flat key={i} size={[3, 0.45]} position={[x, -0.045, z0 + 0.45 + i * 0.9]} color={C.roadLine} />
      ))}
    </>
  );
}

export function Tree({ x, z, scale = 1 }: { x: number; z: number; scale?: number }) {
  return (
    <group position={[x, 0, z]} scale={scale}>
      <Cylinder args={[0.13, 0.17, 2.2, 8]} position={[0, 1.1, 0]} color="#8B6B4A" />
      <mesh position={[0, 3.0, 0]} castShadow>
        <sphereGeometry args={[1.2, 14, 12]} />
        <meshStandardMaterial color="#6DB38A" roughness={0.85} />
      </mesh>
    </group>
  );
}

export function Lamp({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <Cylinder args={[0.06, 0.08, 4.2, 10]} position={[0, 2.1, 0]} color="#6B7280" />
      <Block size={[0.9, 0.1, 0.24]} position={[0, 4.2, 0.35]} rotation={[0, Math.PI / 2, 0]} color="#6B7280" radius={0.04} />
    </group>
  );
}

export function Bench({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <Block size={[2.2, 0.12, 0.6]} position={[0, 0.48, 0]} color={C.wood} radius={0.04} />
      <Block size={[0.12, 0.45, 0.5]} position={[-0.9, 0.22, 0]} color={C.metal} radius={0.03} />
      <Block size={[0.12, 0.45, 0.5]} position={[0.9, 0.22, 0]} color={C.metal} radius={0.03} />
    </group>
  );
}

function Window({ position, size }: { position: Vec3; size: [number, number] }) {
  return (
    <mesh position={position}>
      <planeGeometry args={size} />
      <meshStandardMaterial color={C.window} roughness={0.2} />
    </mesh>
  );
}

export type TowerSpec = { x: number; z: number; w: number; d: number; h: number; color: string };

/** Office block with rows of windows on the side facing the viewer (+z). */
export function Tower({ x, z, w, d, h, color }: TowerSpec) {
  const floors = Math.max(1, Math.floor((h - 1) / 3));
  const cols = Math.max(2, Math.floor(w / 2.4));
  return (
    <group position={[x, 0, z]}>
      <Block size={[w, h, d]} position={[0, h / 2, 0]} color={color} radius={0.15} />
      <Slab size={[w + 0.2, 0.3, d + 0.2]} position={[0, h + 0.15, 0]} color={C.kerb} />
      {Array.from({ length: floors * cols }, (_, i) => {
        const f = i % floors;
        const c = Math.floor(i / floors);
        return <Window key={i} size={[w / cols - 0.8, 1.6]} position={[-w / 2 + (w / cols) * (c + 0.5), 2.2 + f * 3, d / 2 + 0.01]} />;
      })}
    </group>
  );
}

/** Low neighbourhood shop with a striped awning, so the main shops stand out. */
export function LowShop({ x, z, w, d, color, awning }: { x: number; z: number; w: number; d: number; color: string; awning: string }) {
  const h = 4.2;
  return (
    <group position={[x, 0, z]}>
      <Block size={[w, h, d]} position={[0, h / 2, 0]} color={color} radius={0.12} />
      <Slab size={[w - 1.2, 1.8, 0.05]} position={[0, 1.5, d / 2 + 0.01]} color={C.window} />
      <Block size={[w - 0.6, 0.18, 1.3]} position={[0, 3.1, d / 2 + 0.6]} rotation={[0.25, 0, 0]} color={awning} radius={0.05} />
    </group>
  );
}

export function ParkedCar({ x, z, color }: { x: number; z: number; color: string }) {
  return (
    <group position={[x, 0, z]} rotation={[0, Math.PI / 2, 0]}>
      <Block size={[4.2, 0.8, 1.9]} position={[0, 0.65, 0]} color={color} radius={0.25} />
      <Block size={[2.3, 0.66, 1.7]} position={[-0.2, 1.33, 0]} color={color} radius={0.25} />
      <Slab size={[2.32, 0.42, 1.72]} position={[-0.2, 1.34, 0]} color={C.window} />
    </group>
  );
}
