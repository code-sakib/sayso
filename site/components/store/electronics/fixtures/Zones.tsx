"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";
import { Block, Cylinder, Screen, Slab } from "../../primitives";
import { FIXTURES, LOUNGE, PROMO } from "../layout";
import { C } from "../../palette";
import { Table, TABLE_H } from "./Tables";

export function SpeakerStand() {
  const { x, z, w, d } = FIXTURES.speakers;
  const cones = useRef<(Mesh | null)[]>([]);
  useFrame(({ clock }) => {
    const beat = Math.max(0, Math.sin(clock.elapsedTime * 9.4)) ** 4;
    cones.current.forEach((m, i) => m?.scale.setScalar(1 + beat * (0.12 + i * 0.04)));
  });
  return (
    <Table x={x} z={z} w={w} d={d}>
      {[-0.8, 0, 0.8].map((sx, i) => (
        <group key={sx} position={[sx, TABLE_H, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <Block size={[0.5, i === 1 ? 0.5 : 0.85, 0.45]} position={[0, i === 1 ? 0.25 : 0.425, 0]} color={i === 1 ? C.deviceLight : C.device} radius={0.06} />
          <mesh ref={(m) => { cones.current[i] = m; }} position={[0, i === 1 ? 0.27 : 0.5, 0.23]}>
            <circleGeometry args={[0.15, 24]} />
            <meshStandardMaterial color="#4B5563" />
          </mesh>
        </group>
      ))}
    </Table>
  );
}

export function Counter() {
  const { x, z, w, d } = FIXTURES.counter;
  return (
    <group position={[x, 0, z]}>
      <Block size={[w, 1.05, d]} position={[0, 0.525, 0]} color={C.brand} radius={0.08} />
      <Block size={[w + 0.14, 0.07, d + 0.14]} position={[0, 1.08, 0]} color={C.tableTop} radius={0.03} />
      {[-0.8, 0.8].map((dz) => (
        <group key={dz} position={[0.15, 1.12, dz]} rotation={[0, -Math.PI / 2, 0]}>
          <Block size={[0.06, 0.26, 0.06]} position={[0, 0.13, 0]} color={C.device} radius={0.02} />
          <group position={[0, 0.38, 0]} rotation={[-0.2, 0, 0]}>
            <Block size={[0.52, 0.36, 0.04]} color={C.device} radius={0.015} />
            <Screen size={[0.46, 0.3]} position={[0, 0, 0.022]} hue="#DCEFE5" />
          </group>
        </group>
      ))}
      {/* Shopping bags waiting on the counter */}
      <Block size={[0.3, 0.38, 0.18]} position={[-0.25, 1.31, 1.5]} color={C.brandLight} radius={0.03} />
      <Block size={[0.26, 0.3, 0.16]} position={[-0.3, 1.27, 1.15]} color="#F2C14E" radius={0.03} />
    </group>
  );
}

/** A sofa facing a big TV with a console, where customers try games. */
export function GamingLounge() {
  const { x, z, w, d } = LOUNGE;
  const sofaX = x - 1.4;
  const tvX = x + w / 2 - 0.5;
  return (
    <group>
      <mesh position={[x, 0.008, z]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial color="#DDE7F3" roughness={0.9} />
      </mesh>
      <group position={[sofaX, 0, z]}>
        <Block size={[0.9, 0.42, 2.6]} position={[0, 0.21, 0]} color="#64748B" radius={0.12} />
        <Block size={[0.3, 0.55, 2.6]} position={[-0.32, 0.6, 0]} color="#64748B" radius={0.12} />
        <Block size={[0.9, 0.3, 0.22]} position={[0, 0.5, 1.2]} color="#5B6878" radius={0.1} />
        <Block size={[0.9, 0.3, 0.22]} position={[0, 0.5, -1.2]} color="#5B6878" radius={0.1} />
      </group>
      <group position={[tvX, 0, z]}>
        <Block size={[0.6, 0.5, 2.4]} position={[0, 0.25, 0]} color={C.wood} radius={0.05} />
        <Block size={[0.3, 0.08, 0.4]} position={[0, 0.54, 0.7]} color="#F8FAFC" radius={0.03} />
        <group position={[0.1, 1.55, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <Block size={[2.4, 1.4, 0.07]} color={C.device} radius={0.02} />
          <Screen size={[2.3, 1.3]} position={[0, 0, 0.037]} hue="#A78BFA" phase={2} />
        </group>
      </group>
    </group>
  );
}

/** Round stand by the door with a giant phone that slowly turns. */
export function LaunchStand() {
  const phone = useRef<Group>(null);
  useFrame((_, delta) => {
    if (phone.current) phone.current.rotation.y += delta * 0.5;
  });
  return (
    <group position={[PROMO.x, 0, PROMO.z]}>
      <Cylinder args={[PROMO.r, PROMO.r + 0.1, 0.35, 40]} position={[0, 0.175, 0]} color="#FFFFFF" />
      <Cylinder args={[PROMO.r - 0.15, PROMO.r - 0.15, 0.04, 40]} position={[0, 0.37, 0]} color={C.brandPale} />
      <group ref={phone} position={[0, 0.4, 0]}>
        <Block size={[0.9, 1.8, 0.1]} position={[0, 0.95, 0]} color={C.device} radius={0.05} />
        <Screen size={[0.8, 1.68]} position={[0, 0.95, 0.052]} hue="#34D399" />
        <Screen size={[0.8, 1.68]} position={[0, 0.95, -0.052]} rotation={[0, Math.PI, 0]} hue="#38BDF8" phase={1} />
      </group>
    </group>
  );
}
