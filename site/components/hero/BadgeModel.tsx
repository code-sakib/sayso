"use client";

// The finished SaySo badge (sizes from design/sayso-badge-lab.html): a plain black Ø56 × 13.5 mm
// round case. The only thing on the face is a small red light that glows steadily while it records.
// The button and power switch sit on the left edge, USB-C on the top edge. 1 unit = 10 mm. The face
// looks down +Y before the group is stood up, so "up" on the face is -Z here.

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CanvasTexture, LatheGeometry, SRGBColorSpace, Vector2, type MeshStandardMaterial } from "three";

const R = 2.8;
const H = 1.35;
const BEVEL = 0.38;
const SHELL = "#16181B";
const REC = "#EF4444";
const LED = { x: 0, z: -1.5, r: 0.11 };
/** Brushed metal of the magnet plate, also used for the record button. */
const MAGNET = { color: "#9AA1A8", metalness: 0.7, roughness: 0.35 } as const;
const GLOW_RATE = 6; // how fast the light fades on and off

/** Rounded puck: flat faces with a soft bevel round the rim. */
function useShellGeometry() {
  return useMemo(() => {
    const pts: Vector2[] = [new Vector2(0, -H / 2)];
    const arc = (cx: number, cy: number, from: number, to: number) => {
      for (let i = 0; i <= 10; i++) {
        const a = from + ((to - from) * i) / 10;
        pts.push(new Vector2(cx + Math.cos(a) * BEVEL, cy + Math.sin(a) * BEVEL));
      }
    };
    arc(R - BEVEL, -H / 2 + BEVEL, -Math.PI / 2, 0);
    arc(R - BEVEL, H / 2 - BEVEL, 0, Math.PI / 2);
    pts.push(new Vector2(0, H / 2));
    return new LatheGeometry(pts, 96);
  }, []);
}

/** Small red light: glows steadily while recording, off when stopped. No blinking, no sound. */
function Led({ isRecording }: { isRecording: boolean }) {
  const mat = useRef<MeshStandardMaterial>(null);
  useFrame((_, delta) => {
    const m = mat.current;
    if (!m) return;
    const goal = isRecording ? 2.2 : 0;
    m.emissiveIntensity += (goal - m.emissiveIntensity) * Math.min(1, delta * GLOW_RATE);
  });
  return (
    <mesh position={[LED.x, H / 2 + 0.004, LED.z]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[LED.r, 32]} />
      <meshStandardMaterial ref={mat} color="#2A1414" emissive={REC} emissiveIntensity={isRecording ? 2.2 : 0} roughness={0.3} />
    </mesh>
  );
}

/** Puts its children on the rim at a point on the face, pointing outwards (+X inside the group). */
function OnRim({ x, z, children }: { x: number; z: number; children: React.ReactNode }) {
  const angle = Math.atan2(-z, x);
  return <group rotation={[0, angle, 0]}><group position={[R, 0, 0]}>{children}</group></group>;
}

/** Slots and the button, seated into the case edge. */
function Edge() {
  const dark = <meshStandardMaterial color="#0D0F12" roughness={0.9} />;
  return (
    <group>
      {/* USB-C on the top edge */}
      <OnRim x={0} z={-1}>
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[0.1, 0.3, 0.9]} />
          {dark}
        </mesh>
      </OnRim>
      {/* Record button on the left edge: half sunk into the case */}
      <OnRim x={-2.68} z={-0.8}>
        <mesh position={[0.02, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.24, 0.24, 0.16, 32]} />
          <meshStandardMaterial {...MAGNET} />
        </mesh>
      </OnRim>
      {/* Power switch lower on the left edge */}
      <OnRim x={-2.6} z={1}>
        <mesh>
          <boxGeometry args={[0.08, 0.24, 0.36]} />
          {dark}
        </mesh>
        <mesh position={[0.04, 0, 0.06]}>
          <boxGeometry args={[0.1, 0.12, 0.12]} />
          <meshStandardMaterial {...MAGNET} />
        </mesh>
      </OnRim>
    </group>
  );
}

/** Branding printed on the back cover: the SaySo name above the magnet plate, model below. */
function useBackTexture() {
  return useMemo(() => {
    const size = 1024;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const c = canvas.getContext("2d");
    if (!c) return null;
    const px = size / (2 * (R - BEVEL)); // pixels per unit across the flat back
    const at = (u: number) => size / 2 + u * px;
    c.fillStyle = SHELL;
    c.fillRect(0, 0, size, size);
    c.fillStyle = "#C9CED4";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.font = `600 ${0.5 * px}px Inter, system-ui, sans-serif`;
    c.fillText("sayso", at(0), at(-1.22));
    c.fillStyle = "#9CA3AF";
    c.font = `500 ${0.16 * px}px ui-monospace, Menlo, monospace`;
    c.fillText("STAFF BADGE · SB-01", at(0), at(1.15));
    c.fillText("Records staff voice only", at(0), at(1.45));
    const tex = new CanvasTexture(canvas);
    tex.colorSpace = SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, []);
}

/** Back cover with the branding and the magnet plate that holds the badge through the shirt. */
function Back() {
  const print = useBackTexture();
  return (
    <group position={[0, -H / 2, 0]}>
      {print && (
        // Turned half a circle so the print reads upright when you look at the back
        <mesh position={[0, -0.003, 0]} rotation={[Math.PI / 2, 0, Math.PI]}>
          <circleGeometry args={[R - BEVEL, 96]} />
          <meshStandardMaterial map={print} roughness={0.55} />
        </mesh>
      )}
      <mesh position={[0, -0.006, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[R - BEVEL - 0.08, R - BEVEL - 0.03, 80]} />
        <meshStandardMaterial color="#26292D" roughness={0.6} />
      </mesh>
      <mesh position={[0, -0.12, 0]}>
        <boxGeometry args={[4, 0.24, 1.2]} />
        <meshStandardMaterial {...MAGNET} />
      </mesh>
    </group>
  );
}

export function BadgeModel({ isRecording, onPress }: { isRecording: boolean; onPress: () => void }) {
  const shell = useShellGeometry();
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh geometry={shell} castShadow onClick={(e) => { e.stopPropagation(); onPress(); }}>
        <meshStandardMaterial color={SHELL} roughness={0.55} />
      </mesh>
      <Led isRecording={isRecording} />
      <Edge />
      <Back />
    </group>
  );
}
