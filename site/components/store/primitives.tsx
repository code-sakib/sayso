"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { Color, type MeshStandardMaterial } from "three";
import { C } from "./palette";

export type Vec3 = [number, number, number];

const ROUGH = 0.62;

/** Soft-edged box: the basic building block of every model in the scene. */
export function Block({ size, position, color, rotation, radius, shadow = true }: {
  size: Vec3;
  position?: Vec3;
  color: string;
  rotation?: Vec3;
  radius?: number;
  shadow?: boolean;
}) {
  const r = radius ?? Math.min(0.06, Math.min(...size) * 0.25);
  return (
    <RoundedBox args={size} radius={r} smoothness={3} position={position} rotation={rotation} castShadow={shadow} receiveShadow>
      <meshStandardMaterial color={color} roughness={ROUGH} />
    </RoundedBox>
  );
}

/** Sharp box for thin or flat parts where rounding is invisible anyway. */
export function Slab({ size, position, color, rotation }: { size: Vec3; position?: Vec3; color: string; rotation?: Vec3 }) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={ROUGH} />
    </mesh>
  );
}

/** A glowing display that slowly breathes, so the shop floor feels switched on. */
export function Screen({ size, position, rotation, hue, phase = 0 }: {
  size: [number, number];
  position?: Vec3;
  rotation?: Vec3;
  hue: string;
  phase?: number;
}) {
  const mat = useRef<MeshStandardMaterial>(null);
  const base = useMemo(() => new Color(hue), [hue]);
  useFrame(({ clock }) => {
    if (!mat.current) return;
    const k = 0.6 + 0.4 * Math.sin(clock.elapsedTime * 0.9 + phase);
    mat.current.emissive.copy(base).multiplyScalar(k);
  });
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshStandardMaterial ref={mat} color={C.screenOff} emissive={hue} emissiveIntensity={1} roughness={0.25} />
    </mesh>
  );
}

export function Cylinder({ args, position, rotation, color }: {
  args: [number, number, number, number?];
  position?: Vec3;
  rotation?: Vec3;
  color: string;
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <cylinderGeometry args={[args[0], args[1], args[2], args[3] ?? 24]} />
      <meshStandardMaterial color={color} roughness={ROUGH} />
    </mesh>
  );
}
