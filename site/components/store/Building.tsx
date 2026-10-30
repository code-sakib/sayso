"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { DOOR, STORE } from "./shell";
import { LIVE_POSITIONS } from "./people";
import type { Branch } from "./branches";
import { C } from "./palette";
import { PinAnchor } from "./pins";
import { Block, Cylinder, Slab, type Vec3 } from "./primitives";

const WALL_T = 0.3;
const LOW_WALL_H = 0.6;
const GLASS_H = 2.7;
const FRONT_H = 3.6;
const TILE = 2;
const DOOR_SENSE = 2.6; // metres from the door at which it starts to open

function Flat({ size, position, color }: { size: [number, number]; position: Vec3; color: string }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.85} />
    </mesh>
  );
}

function Glass({ size, position }: { size: Vec3; position: Vec3 }) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={C.glass} transparent opacity={0.2} roughness={0.1} depthWrite={false} />
    </mesh>
  );
}

function Floor({ branch }: { branch: Branch }) {
  const cols = (STORE.halfW * 2) / TILE;
  const rows = (STORE.halfD * 2) / TILE;
  return (
    <group>
      <Block size={[STORE.halfW * 2 + 0.7, 0.14, STORE.halfD * 2 + 0.7]} position={[0, -0.07, 0]} color={C.skirting} radius={0.05} />
      {Array.from({ length: cols * rows }, (_, i) => {
        const cx = i % cols;
        const rz = Math.floor(i / cols);
        return (
          <Flat
            key={i}
            size={[TILE - 0.025, TILE - 0.025]}
            position={[-STORE.halfW + TILE * (cx + 0.5), 0.003, -STORE.halfD + TILE * (rz + 0.5)]}
            color={(cx + rz) % 2 === 0 ? branch.floor : branch.floorTile}
          />
        );
      })}
      <Flat size={[DOOR.width - 0.3, 1.6]} position={[DOOR.x, 0.008, STORE.halfD - 1]} color={branch.accent} />
    </group>
  );
}

function Walls({ accent }: { accent: string }) {
  const { halfW, halfD, wallH } = STORE;
  return (
    <group>
      <Block size={[halfW * 2 + WALL_T * 2, wallH, WALL_T]} position={[0, wallH / 2, -halfD - WALL_T / 2]} color={C.wall} radius={0.04} />
      <Block size={[WALL_T, wallH, halfD * 2]} position={[-halfW - WALL_T / 2, wallH / 2, 0]} color={C.wallSide} radius={0.04} />
      {/* Green brand band along the top of the walls */}
      <Slab size={[halfW * 2, 0.5, 0.04]} position={[0, wallH - 0.35, -halfD + 0.02]} color={accent} />
      <Slab size={[0.04, 0.5, halfD * 2]} position={[-halfW + 0.02, wallH - 0.35, 0]} color={accent} />
      {/* Cut-away right side: low wall only */}
      <Block size={[WALL_T, LOW_WALL_H, halfD * 2 + WALL_T]} position={[halfW + WALL_T / 2, LOW_WALL_H / 2, WALL_T / 2]} color={C.wall} radius={0.06} />
    </group>
  );
}

/** Glass shop front with a sliding door that opens when someone walks up to it. */
function Front({ branch, withLabel }: { branch: Branch; withLabel: boolean }) {
  const { halfW, halfD } = STORE;
  const left = useRef<Group>(null);
  const right = useRef<Group>(null);
  const openness = useRef(0);
  const doorL = DOOR.x - DOOR.width / 2;
  const doorR = DOOR.x + DOOR.width / 2;
  const leftLen = doorL + halfW + WALL_T;
  const rightLen = halfW + WALL_T - doorR;
  const panel = DOOR.width / 2;
  const z = halfD + WALL_T / 2;

  useFrame((_, delta) => {
    let near = false;
    for (const p of LIVE_POSITIONS.get(branch.id)?.values() ?? []) {
      if (Math.hypot(p.x - DOOR.x, p.z - halfD) < DOOR_SENSE) {
        near = true;
        break;
      }
    }
    openness.current += ((near ? 1 : 0) - openness.current) * Math.min(1, delta * 5);
    const shift = openness.current * panel * 0.92;
    if (left.current) left.current.position.x = doorL + panel / 2 - shift;
    if (right.current) right.current.position.x = doorR - panel / 2 + shift;
  });

  return (
    <group>
      <Block size={[leftLen, LOW_WALL_H, WALL_T]} position={[doorL - leftLen / 2, LOW_WALL_H / 2, z]} color={C.wall} radius={0.06} />
      <Block size={[rightLen, LOW_WALL_H, WALL_T]} position={[doorR + rightLen / 2, LOW_WALL_H / 2, z]} color={C.wall} radius={0.06} />
      <Glass size={[leftLen, GLASS_H, 0.05]} position={[doorL - leftLen / 2, LOW_WALL_H + GLASS_H / 2, z]} />
      <Glass size={[rightLen, GLASS_H, 0.05]} position={[doorR + rightLen / 2, LOW_WALL_H + GLASS_H / 2, z]} />
      {/* Door frame and the green sign above it */}
      <Block size={[0.18, FRONT_H, 0.4]} position={[doorL, FRONT_H / 2, z]} color={branch.accent} />
      <Block size={[0.18, FRONT_H, 0.4]} position={[doorR, FRONT_H / 2, z]} color={branch.accent} />
      <Block size={[DOOR.width + 2.4, 0.9, 0.4]} position={[DOOR.x, FRONT_H + 0.25, z]} color={branch.accent} radius={0.1} />
      <Slab size={[DOOR.width + 1.6, 0.08, 0.05]} position={[DOOR.x, FRONT_H + 0.25, z + 0.21]} color="#FFFFFF" />
      <group ref={left} position={[doorL + panel / 2, 0, z + 0.25]}>
        <Glass size={[panel, 3, 0.05]} position={[0, 1.5, 0]} />
      </group>
      <group ref={right} position={[doorR - panel / 2, 0, z + 0.25]}>
        <Glass size={[panel, 3, 0.05]} position={[0, 1.5, 0]} />
      </group>
      {withLabel && <group position={[DOOR.x, FRONT_H + 1.2, z]}><PinAnchor id={`branch-${branch.id}`} /></group>}
    </group>
  );
}

/** Ceiling CCTV camera that slowly pans across the floor. */
function Cctv() {
  const head = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (head.current) head.current.rotation.y = Math.PI / 4 + Math.sin(clock.elapsedTime * 0.35) * 0.55;
  });
  const { halfW, halfD, wallH } = STORE;
  return (
    <group position={[-halfW + 0.4, wallH - 0.9, -halfD + 0.4]}>
      <Block size={[0.12, 0.4, 0.12]} position={[0, 0.2, 0]} color={C.metal} radius={0.03} />
      <group ref={head}>
        <group rotation={[0.45, 0, 0]}>
          <Block size={[0.32, 0.3, 0.62]} position={[0, 0, 0.25]} color="#F8FAFC" radius={0.08} />
          <mesh position={[0.1, 0.09, 0.57]}>
            <sphereGeometry args={[0.03, 10, 10]} />
            <meshStandardMaterial color={C.rec} emissive={C.rec} emissiveIntensity={2} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export function Plant({ position, scale = 1 }: { position: Vec3; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <Cylinder args={[0.32, 0.25, 0.55, 20]} position={[0, 0.275, 0]} color="#ECE7DD" />
      <mesh position={[0, 0.95, 0]} castShadow>
        <sphereGeometry args={[0.55, 14, 12]} />
        <meshStandardMaterial color="#5EA97A" roughness={0.8} />
      </mesh>
      <mesh position={[0.25, 1.3, 0.1]} castShadow>
        <sphereGeometry args={[0.35, 12, 10]} />
        <meshStandardMaterial color="#6DB989" roughness={0.8} />
      </mesh>
    </group>
  );
}

/**
 * The shop shell every branch shares: floor, walls, glass front with a sliding door.
 * The hero backdrop draws it too, without the floating name label.
 */
export function Building({ branch, withLabel = true }: { branch: Branch; withLabel?: boolean }) {
  const { halfW, halfD } = STORE;
  return (
    <group>
      <Floor branch={branch} />
      <Walls accent={branch.accent} />
      <Front branch={branch} withLabel={withLabel} />
      <Cctv />
      <Plant position={[halfW - 0.7, 0, halfD - 0.7]} />
      <Plant position={[-halfW + 0.7, 0, halfD - 0.7]} />
      <Plant position={[halfW - 0.7, 0, -halfD + 1.5]} />
    </group>
  );
}
