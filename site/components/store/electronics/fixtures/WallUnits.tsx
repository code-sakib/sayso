"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";
import { Block, Cylinder, Screen, Slab } from "../../primitives";
import { APPLIANCES, SHELF_WALL, TV_WALL } from "../layout";
import { STORE } from "../../shell";
import { C, SCREEN_HUES } from "../../palette";

const WALL_Z = -STORE.halfD + 0.08;

export function TvWall() {
  const cols = 6;
  const rows = 2;
  const width = TV_WALL.x1 - TV_WALL.x0;
  const cx = (TV_WALL.x0 + TV_WALL.x1) / 2;
  const tvW = width / cols - 0.32;
  const tvH = tvW * 0.58;
  return (
    <group>
      <Slab size={[width + 0.5, 3.6, 0.05]} position={[cx, 2.2, WALL_Z]} color="#EEF3F0" />
      {Array.from({ length: cols * rows }, (_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = TV_WALL.x0 + (col + 0.5) * (width / cols);
        const y = 1.75 + row * 1.5;
        return (
          <group key={i} position={[x, y, WALL_Z + 0.08]}>
            <Block size={[tvW, tvH, 0.07]} color={C.device} radius={0.02} />
            <Screen size={[tvW - 0.08, tvH - 0.08]} position={[0, 0, 0.037]} hue={SCREEN_HUES[i % SCREEN_HUES.length]} phase={i * 0.8} />
          </group>
        );
      })}
      {/* Low media console with soundbars on top */}
      <Block size={[width, 0.55, 0.75]} position={[cx, 0.275, WALL_Z + 0.45]} color={C.wood} radius={0.05} />
      {[-0.35, 0.05, 0.4].map((k) => (
        <Block key={k} size={[1.1, 0.1, 0.14]} position={[cx + k * width, 0.6, WALL_Z + 0.45]} color={C.device} radius={0.04} />
      ))}
    </group>
  );
}

const BOX_COLORS = ["#F9FAFB", "#1F2937", "#3B82F6", "#E5E7EB", "#EF7A85", "#94A3B8"];
const SHELF_D = 0.6;

/** Bookshelf speaker with two drivers on the front. */
function Speaker({ x, y, z, h, color }: { x: number; y: number; z: number; h: number; color: string }) {
  const front = z + 0.17;
  return (
    <group position={[x, y, 0]}>
      <Block size={[0.36, h, 0.34]} position={[0, h / 2, z]} color={color} radius={0.03} />
      {[h * 0.68, h * 0.3].map((cy, k) => (
        <mesh key={cy} position={[0, cy, front + 0.002]}>
          <circleGeometry args={[k === 0 ? 0.06 : 0.11, 24]} />
          <meshStandardMaterial color="#374151" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

/** Over-ear headphones on a small stand. */
function Headphones({ x, y, z, color }: { x: number; y: number; z: number; color: string }) {
  return (
    <group position={[x, y, z]}>
      <Cylinder args={[0.09, 0.1, 0.03, 16]} position={[0, 0.015, 0]} color={C.metal} />
      <Cylinder args={[0.02, 0.02, 0.32, 8]} position={[0, 0.16, 0]} color={C.metal} />
      <mesh position={[0, 0.32, 0]} castShadow>
        <torusGeometry args={[0.14, 0.03, 8, 20, Math.PI]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {[-0.14, 0.14].map((dx) => (
        <Block key={dx} size={[0.07, 0.16, 0.14]} position={[dx, 0.3, 0]} color={color} radius={0.03} />
      ))}
    </group>
  );
}

/** Wall of speakers, headphones and boxed earbuds; a thin back panel keeps everything visible. */
export function AudioShelves() {
  const z = -STORE.halfD + 0.45;
  const width = SHELF_WALL.x1 - SHELF_WALL.x0;
  const cx = (SHELF_WALL.x0 + SHELF_WALL.x1) / 2;
  const levels = [0.45, 1.2, 1.95, 2.7];
  const perShelf = 12;
  return (
    <group>
      <Slab size={[width, 3.3, 0.08]} position={[cx, 1.65, z - SHELF_D / 2 - 0.04]} color={C.wallSide} />
      {[SHELF_WALL.x0, SHELF_WALL.x1].map((x) => (
        <Slab key={x} size={[0.06, 3.3, SHELF_D]} position={[x, 1.65, z]} color={C.wood} />
      ))}
      {levels.map((y, r) => (
        <group key={y}>
          <Slab size={[width - 0.1, 0.05, SHELF_D]} position={[cx, y, z]} color={C.wood} />
          {Array.from({ length: perShelf }, (_, i) => {
            const x = SHELF_WALL.x0 + 0.55 + i * ((width - 1.1) / (perShelf - 1));
            const kind = (i + r * 2) % 3;
            const color = BOX_COLORS[(i * 2 + r) % BOX_COLORS.length];
            if (kind === 0) return <Speaker key={i} x={x} y={y + 0.025} z={z} h={0.42 + (r % 2) * 0.1} color={i % 2 ? "#1F2937" : "#F3F4F6"} />;
            if (kind === 1) return <Headphones key={i} x={x} y={y + 0.025} z={z} color={color} />;
            return (
              <group key={i}>
                {[-0.1, 0.1].map((dx, k) => (
                  <Block key={dx} size={[0.16, 0.2, 0.16]} position={[x + dx, y + 0.125, z + 0.05 - k * 0.12]} color={BOX_COLORS[(i + k + r) % BOX_COLORS.length]} radius={0.02} />
                ))}
              </group>
            );
          })}
        </group>
      ))}
    </group>
  );
}

const SIDE_X = -STORE.halfW;

export function Fridge({ z }: { z: number }) {
  return (
    <group position={[SIDE_X + 0.6, 0, z]}>
      <Block size={[0.95, 2.2, 1.55]} position={[0, 1.1, 0]} color="#EAEFF3" radius={0.08} />
      <Slab size={[0.02, 0.02, 1.5]} position={[0.48, 1.55, 0]} color="#CBD3DA" />
      <Block size={[0.05, 1.1, 0.05]} position={[0.5, 1.15, 0.6]} color={C.metal} radius={0.02} />
      <Block size={[0.05, 0.4, 0.05]} position={[0.5, 1.85, 0.6]} color={C.metal} radius={0.02} />
    </group>
  );
}

export function Washer({ z, phase }: { z: number; phase: number }) {
  const drum = useRef<Mesh>(null);
  const shell = useRef<Group>(null);
  useFrame(({ clock }, delta) => {
    if (drum.current) drum.current.rotation.x -= delta * 6;
    if (shell.current) shell.current.position.z = z + Math.sin(clock.elapsedTime * 30 + phase) * 0.008;
  });
  return (
    <group ref={shell} position={[SIDE_X + 0.55, 0, z]}>
      <Block size={[0.85, 1.0, 1.25]} position={[0, 0.5, 0]} color="#F8FAFC" radius={0.07} />
      <Cylinder args={[0.36, 0.36, 0.04, 32]} position={[0.43, 0.46, 0]} rotation={[0, 0, Math.PI / 2]} color={C.metal} />
      <mesh ref={drum} position={[0.455, 0.46, 0]} rotation={[0, Math.PI / 2, 0]}>
        <circleGeometry args={[0.28, 6]} />
        <meshStandardMaterial color="#86BEDF" roughness={0.3} />
      </mesh>
      <Block size={[0.04, 0.12, 1.0]} position={[0.43, 0.88, 0]} color={C.device} radius={0.015} />
    </group>
  );
}

/** Wall-mounted AC whose flap swings slowly. */
export function AirConditioner({ z, phase }: { z: number; phase: number }) {
  const flap = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (flap.current) flap.current.rotation.z = -0.3 - (0.35 * (1 + Math.sin(clock.elapsedTime * 0.8 + phase))) / 2;
  });
  return (
    <group position={[SIDE_X + 0.24, 3.2, z]}>
      <Block size={[0.42, 0.56, 1.8]} color="#FBFBFA" radius={0.1} />
      <group ref={flap} position={[0.21, -0.24, 0]}>
        <Slab size={[0.18, 0.03, 1.55]} position={[0.08, 0, 0]} color="#E5E7EB" />
      </group>
      <mesh position={[0.215, 0.15, 0.7]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color={C.good} emissive={C.good} emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

export function ApplianceWall() {
  return (
    <group>
      {APPLIANCES.fridges.map((z) => <Fridge key={z} z={z} />)}
      {APPLIANCES.washers.map((z, i) => <Washer key={z} z={z} phase={i * 2} />)}
      {APPLIANCES.acs.map((z, i) => <AirConditioner key={z} z={z} phase={i * 1.5} />)}
      {/* Microwaves on a low counter under the ACs */}
      <Block size={[0.8, 0.9, 5]} position={[SIDE_X + 0.5, 0.45, 3.8]} color={C.wood} radius={0.05} />
      {[1.9, 3.1, 4.3, 5.5].map((z) => (
        <group key={z} position={[SIDE_X + 0.55, 0.9, z]}>
          <Block size={[0.6, 0.4, 0.9]} position={[0, 0.2, 0]} color={z === 3.1 ? C.device : "#F1F5F9"} radius={0.05} />
          <Slab size={[0.02, 0.26, 0.55]} position={[0.31, 0.2, -0.1]} color="#4B5563" />
        </group>
      ))}
    </group>
  );
}
