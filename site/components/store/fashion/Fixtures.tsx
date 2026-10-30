"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { Block, Cylinder, Slab, type Vec3 } from "../primitives";
import { PinAnchor } from "../pins";
import { STORE } from "../shell";
import { AccessoryCorner } from "./Accessories";
import { ACCESSORIES, CLOTHES, COUNTER, DENIM_TABLE, FASHION_COLORS as F, FITTING, FOLD_TABLE, MANNEQUINS, RAILS, ROUND_R, ROUND_RACKS, SHOE_WALL } from "./layout";

const RAIL_H = 1.75;
const cloth = (i: number) => CLOTHES[i % CLOTHES.length];

/** A shirt or dress on a hanger; `sway` makes a few of them move as if just touched. */
function Garment({ position, color, long, sway }: { position: Vec3; color: string; long?: boolean; sway?: number }) {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (ref.current && sway !== undefined) ref.current.rotation.x = Math.sin(clock.elapsedTime * 2.2 + sway) * 0.08;
  });
  const h = long ? 1.05 : 0.75;
  return (
    <group ref={ref} position={position}>
      <mesh position={[0, -0.04, 0]} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.03, 0.006, 4, 8, Math.PI * 1.5]} />
        <meshStandardMaterial color="#6B7280" />
      </mesh>
      <Block size={[0.06, h, 0.5]} position={[0, -h / 2 - 0.08, 0]} color={color} radius={0.025} shadow={false} />
    </group>
  );
}

function Rail({ x, z, w }: { x: number; z: number; w: number }) {
  const count = 14;
  const gap = (w - 0.4) / (count - 1);
  return (
    <group position={[x, 0, z]}>
      {[-w / 2, w / 2].map((dx) => (
        <group key={dx}>
          <Cylinder args={[0.03, 0.03, RAIL_H, 10]} position={[dx, RAIL_H / 2, 0]} color={F.rail} />
          <Block size={[0.12, 0.04, 0.6]} position={[dx, 0.02, 0]} color={F.rail} radius={0.015} />
        </group>
      ))}
      <Cylinder args={[0.022, 0.022, w, 10]} position={[0, RAIL_H, 0]} rotation={[0, 0, Math.PI / 2]} color={F.rail} />
      {Array.from({ length: count }, (_, i) => (
        <Garment key={i} position={[-w / 2 + 0.2 + i * gap, RAIL_H, 0]} color={cloth(i + Math.round(x))} long={i % 5 === 2} sway={i % 4 === 0 ? i + x : undefined} />
      ))}
    </group>
  );
}

/** Round rack with garments all around; it turns slowly like a display carousel. */
function RoundRack({ x, z }: { x: number; z: number }) {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15;
  });
  const count = 16;
  return (
    <group position={[x, 0, z]}>
      <Cylinder args={[0.05, 0.05, RAIL_H - 0.3, 10]} position={[0, (RAIL_H - 0.3) / 2, 0]} color={F.rail} />
      <Cylinder args={[0.4, 0.45, 0.05, 20]} position={[0, 0.03, 0]} color={F.rail} />
      <group ref={ref} position={[0, RAIL_H - 0.3, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[ROUND_R - 0.3, 0.02, 6, 40]} />
          <meshStandardMaterial color={F.rail} />
        </mesh>
        {Array.from({ length: count }, (_, i) => {
          const a = (i / count) * Math.PI * 2;
          return (
            <group key={i} position={[Math.cos(a) * (ROUND_R - 0.3), 0, Math.sin(a) * (ROUND_R - 0.3)]} rotation={[0, Math.PI / 2 - a, 0]}>
              <Garment position={[0, 0, 0]} color={cloth(i * 3 + Math.round(x))} />
            </group>
          );
        })}
      </group>
    </group>
  );
}

function FoldedStack({ position, n, seed }: { position: Vec3; n: number; seed: number }) {
  return (
    <group position={position}>
      {Array.from({ length: n }, (_, i) => (
        <Block key={i} size={[0.42, 0.07, 0.34]} position={[0, 0.035 + i * 0.075, 0]} color={cloth(seed + i * 2)} radius={0.02} />
      ))}
    </group>
  );
}

function FoldTable() {
  const { x, z, w, d } = FOLD_TABLE;
  return (
    <group position={[x, 0, z]}>
      <Block size={[w, 0.75, d]} position={[0, 0.375, 0]} color={F.oak} radius={0.05} />
      {[-0.9, -0.3, 0.3, 0.9].flatMap((dx, i) =>
        [-0.3, 0.3].map((dz, j) => <FoldedStack key={`${dx}${dz}`} position={[dx, 0.75, dz]} n={3 + ((i + j) % 3)} seed={i * 4 + j} />),
      )}
    </group>
  );
}

/** Back wall of cubbies full of folded clothes, with a hanging rail above. */
function CubbyWall() {
  const z = -STORE.halfD + 0.45;
  const cols = 16;
  const rows = 3;
  const shelfGap = 0.62;
  const x0 = -10;
  const x1 = 14.5;
  const cw = (x1 - x0) / cols;
  const shelfY = (r: number) => 0.15 + r * shelfGap;
  const top = shelfY(rows);
  return (
    <group>
      <Slab size={[x1 - x0 + 0.3, 4.1, 0.12]} position={[(x0 + x1) / 2, 2.05, z - 0.36]} color="#F6F1EA" />
      {Array.from({ length: rows + 1 }, (_, r) => (
        <Slab key={r} size={[x1 - x0, 0.05, 0.6]} position={[(x0 + x1) / 2, shelfY(r), z]} color={F.oak} />
      ))}
      {Array.from({ length: cols / 2 + 1 }, (_, c) => (
        <Slab key={c} size={[0.05, top - 0.15, 0.6]} position={[x0 + c * cw * 2, (top + 0.15) / 2, z]} color={F.oak} />
      ))}
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        return <FoldedStack key={i} position={[x0 + cw * (c + 0.5), shelfY(r) + 0.025, z + 0.05]} n={2 + ((c + r) % 4)} seed={c + r * 3} />;
      })}
      <Cylinder args={[0.022, 0.022, x1 - x0, 10]} position={[(x0 + x1) / 2, 3.7, z]} rotation={[0, 0, Math.PI / 2]} color={F.rail} />
      {Array.from({ length: 34 }, (_, i) => (
        <Garment key={i} position={[x0 + 0.3 + i * ((x1 - x0 - 0.6) / 33), 3.7, z]} color={cloth(i * 7 + 1)} />
      ))}
    </group>
  );
}

function ShoeWall() {
  const { x, z0, z1 } = SHOE_WALL;
  const per = 7;
  return (
    <group>
      {[0.5, 1.1, 1.7, 2.3].map((y, r) => (
        <group key={y}>
          <Slab size={[0.5, 0.04, z1 - z0]} position={[x + 0.25, y, (z0 + z1) / 2]} color={F.oak} />
          {Array.from({ length: per }, (_, i) => (
            <Block
              key={i}
              size={[0.3, 0.14, 0.2]}
              position={[x + 0.25, y + 0.09, z0 + 0.6 + i * ((z1 - z0 - 1.2) / (per - 1))]}
              color={["#F9FAFB", "#1F2937", "#B4533A", "#7C9CBF"][(i + r) % 4]}
              radius={0.05}
            />
          ))}
        </group>
      ))}
      <Block size={[1.4, 0.45, 0.7]} position={[x + 3.0, 0.225, (z0 + z1) / 2]} color={F.accent} radius={0.15} />
    </group>
  );
}

/** One fitting room; the curtain of the first slides open and shut. */
function FittingRoom({ z, animate }: { z: number; animate: boolean }) {
  const curtain = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!curtain.current || !animate) return;
    const open = (Math.sin(clock.elapsedTime * 0.5) + 1) / 2;
    curtain.current.scale.z = 0.25 + 0.75 * (1 - open);
    curtain.current.position.z = z - FITTING.d / 2 + (FITTING.d * curtain.current.scale.z) / 2;
  });
  const { x, w, d } = FITTING;
  return (
    <group>
      <Slab size={[w, 2.6, 0.06]} position={[x, 1.3, z - d / 2]} color="#F3EEE7" />
      <Slab size={[w, 2.6, 0.06]} position={[x, 1.3, z + d / 2]} color="#F3EEE7" />
      <Slab size={[0.05, 0.05, d]} position={[x + w / 2, 2.55, z]} color={F.rail} />
      <group ref={curtain} position={[x + w / 2, 0, z]}>
        <Block size={[0.05, 2.3, d]} position={[0, 1.3, 0]} color={F.accent} radius={0.02} />
      </group>
      <mesh position={[x - w / 2 + 0.05, 1.3, z]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.8, 1.7]} />
        <meshStandardMaterial color="#E5EEF2" metalness={0.5} roughness={0.1} />
      </mesh>
    </group>
  );
}

function Mannequin({ x, z, color }: { x: number; z: number; color: string }) {
  return (
    <group position={[x, 0, z]} rotation={[0, (x % 2) * 0.3, 0]}>
      <Cylinder args={[0.3, 0.32, 0.1, 20]} position={[0, 0.05, 0]} color="#E7E2DA" />
      <Cylinder args={[0.025, 0.025, 0.7, 8]} position={[0, 0.45, 0]} color={F.rail} />
      <Block size={[0.48, 0.9, 0.28]} position={[0, 1.2, 0]} color={color} radius={0.12} />
      <mesh position={[0, 1.85, 0]}>
        <sphereGeometry args={[0.17, 16, 12]} />
        <meshStandardMaterial color="#F4F1EC" roughness={0.5} />
      </mesh>
    </group>
  );
}

function Counter() {
  const { x, z, w, d } = COUNTER;
  return (
    <group position={[x, 0, z]}>
      <Block size={[w, 1.05, d]} position={[0, 0.525, 0]} color={F.oak} radius={0.08} />
      <Block size={[w + 0.12, 0.06, d + 0.12]} position={[0, 1.08, 0]} color="#FFFFFF" radius={0.03} />
      <Block size={[0.45, 0.32, 0.04]} position={[0.2, 1.35, -0.8]} rotation={[0, -Math.PI / 2, 0]} color="#1F2937" radius={0.015} />
      <Block size={[0.32, 0.4, 0.16]} position={[-0.2, 1.31, 1.3]} color={F.accent} radius={0.03} />
      <Block size={[0.28, 0.34, 0.14]} position={[-0.25, 1.28, 0.95]} color="#F6F1EA" radius={0.03} />
    </group>
  );
}

const PINS: { id: string; at: Vec3 }[] = [
  { id: "fashion-section-women", at: [(RAILS.womenA.x + RAILS.womenB.x) / 2, 2.8, RAILS.womenA.z] },
  { id: "fashion-section-men", at: [(RAILS.menA.x + RAILS.menB.x) / 2, 2.8, RAILS.menA.z] },
  { id: "fashion-section-fitting", at: [FITTING.x, 3.3, FITTING.zs[1]] },
  { id: "fashion-section-shoes", at: [SHOE_WALL.x + 0.4, 3.1, (SHOE_WALL.z0 + SHOE_WALL.z1) / 2] },
  { id: "fashion-section-accessories", at: [ACCESSORIES.x + 1.2, 2.6, ACCESSORIES.z] },
  { id: "fashion-section-denim", at: [DENIM_TABLE.x, 2.2, DENIM_TABLE.z] },
  { id: "fashion-section-checkout", at: [COUNTER.x, 2.6, COUNTER.z + 1.2] },
];

export function FashionFixtures() {
  return (
    <group>
      <CubbyWall />
      {Object.values(RAILS).map((r) => <Rail key={r.x} {...r} />)}
      {ROUND_RACKS.map((r) => <RoundRack key={r.x} {...r} />)}
      <FoldTable />
      <ShoeWall />
      {FITTING.zs.map((z, i) => <FittingRoom key={z} z={z} animate={i === 0} />)}
      {MANNEQUINS.map((m, i) => <Mannequin key={m.x} {...m} color={cloth(i * 3 + 2)} />)}
      <Counter />
      <AccessoryCorner />
      {PINS.map((p) => <group key={p.id} position={p.at}><PinAnchor id={p.id} /></group>)}
    </group>
  );
}
