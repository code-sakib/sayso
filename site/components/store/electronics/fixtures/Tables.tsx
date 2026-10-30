"use client";

import { Block, Cylinder, Screen, Slab } from "../../primitives";
import { C, SCREEN_HUES } from "../../palette";

export const TABLE_H = 0.92;
const TOP = 0.08;

const hue = (i: number) => SCREEN_HUES[i % SCREEN_HUES.length];

export function Table({ x, z, w, d, children }: { x: number; z: number; w: number; d: number; children?: React.ReactNode }) {
  return (
    <group position={[x, 0, z]}>
      <Block size={[w - 0.5, TABLE_H - TOP, d - 0.45]} position={[0, (TABLE_H - TOP) / 2, 0]} color={C.tableBase} />
      <Block size={[w, TOP, d]} position={[0, TABLE_H - TOP / 2, 0]} color={C.tableTop} radius={0.035} />
      {/* Green price rail along the customer side */}
      <Slab size={[w - 0.2, 0.06, 0.03]} position={[0, TABLE_H - 0.04, d / 2 + 0.005]} color={C.brand} />
      {children}
    </group>
  );
}

/** Phones or tablets propped on little stands, in two staggered rows. */
export function DeviceRow({ w, d, count, size, tilt = -0.5 }: { w: number; d: number; count: number; size: [number, number]; tilt?: number }) {
  const [dw, dh] = size;
  const gap = (w - dw - 0.3) / (count - 1);
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const x = -w / 2 + dw / 2 + 0.15 + i * gap;
        const z = i % 2 === 0 ? d / 4 : -d / 5;
        return (
          <group key={i} position={[x, TABLE_H, z]}>
            <Block size={[dw * 0.5, 0.04, 0.16]} position={[0, 0.02, 0]} color={C.deviceLight} radius={0.015} />
            <group position={[0, 0.03, 0]} rotation={[tilt, 0, 0]}>
              <Block size={[dw, dh, 0.03]} position={[0, dh / 2, 0]} color={C.device} radius={0.012} />
              <Screen size={[dw - 0.035, dh - 0.05]} position={[0, dh / 2, 0.017]} hue={hue(i)} phase={i} />
            </group>
          </group>
        );
      })}
    </>
  );
}

export function LaptopRow({ w, count }: { w: number; count: number }) {
  const gap = (w - 0.8) / (count - 1);
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <group key={i} position={[-w / 2 + 0.4 + i * gap, TABLE_H, 0.12]}>
          <Block size={[0.62, 0.03, 0.44]} position={[0, 0.015, 0]} color={C.deviceLight} radius={0.012} />
          <group position={[0, 0.03, -0.21]} rotation={[-0.28, 0, 0]}>
            <Block size={[0.62, 0.42, 0.02]} position={[0, 0.21, 0]} color={C.deviceLight} radius={0.008} />
            <Screen size={[0.56, 0.36]} position={[0, 0.21, 0.012]} hue={hue(i + 2)} phase={i * 1.7} />
          </group>
        </group>
      ))}
    </>
  );
}

export function WatchRow({ w, count }: { w: number; count: number }) {
  const gap = (w - 0.5) / (count - 1);
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <group key={i} position={[-w / 2 + 0.25 + i * gap, TABLE_H, (i % 2 === 0 ? 1 : -1) * 0.25]}>
          <Cylinder args={[0.06, 0.09, 0.22, 16]} position={[0, 0.11, 0]} color={C.deviceLight} />
          <group position={[0, 0.26, 0]} rotation={[-0.6, 0, 0]}>
            <Block size={[0.15, 0.17, 0.04]} color={C.device} radius={0.03} />
            <Screen size={[0.11, 0.13]} position={[0, 0, 0.021]} hue={hue(i + 3)} phase={i * 1.3} />
          </group>
        </group>
      ))}
    </>
  );
}

export function CameraRow({ w, count }: { w: number; count: number }) {
  const gap = (w - 0.6) / (count - 1);
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <group key={i} position={[-w / 2 + 0.3 + i * gap, TABLE_H, (i % 2 === 0 ? 0.2 : -0.25)]} rotation={[0, 0.3 - i * 0.12, 0]}>
          <Block size={[0.34, 0.22, 0.14]} position={[0, 0.11, 0]} color={i % 3 === 0 ? C.deviceLight : C.device} radius={0.03} />
          <Cylinder args={[0.07, 0.08, 0.16, 18]} position={[0, 0.11, 0.14]} rotation={[Math.PI / 2, 0, 0]} color="#2B3036" />
          <Cylinder args={[0.05, 0.05, 0.01, 18]} position={[0, 0.11, 0.225]} rotation={[Math.PI / 2, 0, 0]} color="#5B7FA6" />
        </group>
      ))}
    </>
  );
}
