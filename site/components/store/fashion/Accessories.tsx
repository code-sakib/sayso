"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { Block, Cylinder, type Vec3 } from "../primitives";
import { ACCESSORIES, CLOTHES, DENIM_TABLE, FASHION_COLORS as F, HAT_TREE, SUNGLASS_SPINNER } from "./layout";

const DENIM = ["#3B5B7A", "#2C4763", "#5B7FA3", "#1F3550", "#7A9CC0"];
const BAG_COLORS = ["#B4533A", "#1F2937", "#E9C46A", "#D98E73"];

function Handbag({ position, color }: { position: Vec3; color: string }) {
  return (
    <group position={position}>
      <Block size={[0.42, 0.3, 0.16]} position={[0, 0.15, 0]} color={color} radius={0.05} />
      <mesh position={[0, 0.32, 0]}>
        <torusGeometry args={[0.12, 0.015, 6, 16, Math.PI]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
    </group>
  );
}

function Hat({ position, color }: { position: Vec3; color: string }) {
  return (
    <group position={position}>
      <Cylinder args={[0.24, 0.24, 0.02, 20]} position={[0, 0.01, 0]} color={color} />
      <Cylinder args={[0.12, 0.14, 0.14, 16]} position={[0, 0.09, 0]} color={color} />
      <Cylinder args={[0.141, 0.141, 0.03, 16]} position={[0, 0.04, 0]} color="#1F2937" />
    </group>
  );
}

function Sunglasses({ position, rotationY = 0 }: { position: Vec3; rotationY?: number }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {[-0.055, 0.055].map((dx) => (
        <mesh key={dx} position={[dx, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.012, 14]} />
          <meshStandardMaterial color="#1F2937" metalness={0.4} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

/** Table of bags, hats and rolled belts. */
function AccessoryTable() {
  const { x, z, w, d } = ACCESSORIES;
  return (
    <group position={[x, 0, z]}>
      <Block size={[w, 0.8, d]} position={[0, 0.4, 0]} color={F.oak} radius={0.05} />
      <Block size={[w + 0.08, 0.05, d + 0.08]} position={[0, 0.82, 0]} color="#FFFFFF" radius={0.02} />
      {[-1.05, -0.35, 0.35].map((dx, i) => <Handbag key={dx} position={[dx, 0.85, -0.25]} color={BAG_COLORS[i]} />)}
      {[-0.9, -0.2].map((dx, i) => <Hat key={dx} position={[dx, 0.85, 0.32]} color={CLOTHES[i * 3 + 2]} />)}
      {[0.5, 0.75, 1.0].map((dx, i) => (
        <mesh key={dx} position={[dx, 0.9, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.08, 0.035, 8, 16]} />
          <meshStandardMaterial color={["#5B4636", "#1F2937", "#B4533A"][i]} roughness={0.6} />
        </mesh>
      ))}
      <Block size={[0.5, 0.06, 0.32]} position={[1.05, 0.88, -0.25]} color="#F6F1EA" radius={0.02} />
      {[0.92, 1.18].map((dx) => <Sunglasses key={dx} position={[dx, 0.94, -0.25]} />)}
    </group>
  );
}

/** Slowly turning sunglasses tower. */
function SunglassSpinner() {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.3;
  });
  const { x, z, r } = SUNGLASS_SPINNER;
  const perRow = 6;
  return (
    <group position={[x, 0, z]}>
      <Cylinder args={[0.35, 0.4, 0.06, 20]} position={[0, 0.03, 0]} color={F.rail} />
      <group ref={ref}>
        <Cylinder args={[r - 0.15, r - 0.15, 1.6, 16]} position={[0, 0.9, 0]} color="#F6F1EA" />
        {[0.5, 0.85, 1.2, 1.55].flatMap((y) =>
          Array.from({ length: perRow }, (_, i) => {
            const a = (i / perRow) * Math.PI * 2 + y;
            return <Sunglasses key={`${y}${i}`} position={[Math.sin(a) * (r - 0.1), y, Math.cos(a) * (r - 0.1)]} rotationY={a} />;
          }),
        )}
        <Hat position={[0, 1.7, 0]} color={F.accent} />
      </group>
    </group>
  );
}

function HatTree() {
  const { x, z } = HAT_TREE;
  return (
    <group position={[x, 0, z]}>
      <Cylinder args={[0.3, 0.32, 0.05, 18]} position={[0, 0.025, 0]} color={F.rail} />
      <Cylinder args={[0.03, 0.03, 1.9, 8]} position={[0, 0.95, 0]} color={F.rail} />
      {[
        [0.2, 1.3, 0],
        [-0.2, 1.55, 0.05],
        [0, 1.9, -0.05],
      ].map(([dx, y, dz], i) => <Hat key={i} position={[dx, y, dz]} color={CLOTHES[i * 2 + 1]} />)}
    </group>
  );
}

/** Round table of folded jeans. */
function DenimTable() {
  const { x, z, r } = DENIM_TABLE;
  return (
    <group position={[x, 0, z]}>
      <Cylinder args={[r, r * 0.8, 0.75, 24]} position={[0, 0.375, 0]} color={F.oak} />
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <group key={i} position={[Math.cos(a) * r * 0.55, 0.75, Math.sin(a) * r * 0.55]} rotation={[0, -a, 0]}>
            {Array.from({ length: 3 + (i % 3) }, (_, k) => (
              <Block key={k} size={[0.34, 0.07, 0.28]} position={[0, 0.035 + k * 0.075, 0]} color={DENIM[(i + k) % DENIM.length]} radius={0.02} />
            ))}
          </group>
        );
      })}
    </group>
  );
}

export function AccessoryCorner() {
  return (
    <group>
      <AccessoryTable />
      <SunglassSpinner />
      <HatTree />
      <DenimTable />
    </group>
  );
}
