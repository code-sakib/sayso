"use client";

import { useRef } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import type { Group, Mesh, MeshStandardMaterial } from "three";
import { sampleRoute } from "./routes";
import { LIVE_ACTIVITY, setLivePosition, type Walker } from "./people";
import type { Look } from "./look";
import { C } from "./palette";
import { PinAnchor } from "./pins";
import { activeId, getSelection, hover, pin } from "./selection";

const STRIDE = 7.5; // leg swings per second while walking
const LEG_SWING = 0.55;
const ARM_SWING = 0.45;
const TURN_RATE = 8;
const LED_BLINK = 1.6; // seconds per blink
const ROUGH = 0.7;
const FADE_SECONDS = 0.8; // shoppers grow in and shrink out at the ends of their route

/** Shortest signed angle from a to b. */
const angleDelta = (a: number, b: number) => Math.atan2(Math.sin(b - a), Math.cos(b - a));

function Mat({ color }: { color: string }) {
  return <meshStandardMaterial color={color} roughness={ROUGH} />;
}

function Leg({ legRef, x, pants }: { legRef: React.RefObject<Group | null>; x: number; pants: string }) {
  return (
    <group ref={legRef} position={[x, 0.82, 0]}>
      <mesh position={[0, -0.38, 0]} castShadow>
        <capsuleGeometry args={[0.085, 0.6, 4, 10]} />
        <Mat color={pants} />
      </mesh>
      <RoundedBox args={[0.17, 0.09, 0.28]} radius={0.04} position={[0, -0.78, 0.05]} castShadow>
        <Mat color={C.shoes} />
      </RoundedBox>
    </group>
  );
}

function Arm({ armRef, x, sleeve, skin }: { armRef: React.RefObject<Group | null>; x: number; sleeve: string; skin: string }) {
  return (
    <group ref={armRef} position={[x, 1.47, 0]}>
      <mesh position={[0, -0.16, 0]} castShadow>
        <capsuleGeometry args={[0.07, 0.2, 4, 8]} />
        <Mat color={sleeve} />
      </mesh>
      <mesh position={[0, -0.4, 0]} castShadow>
        <capsuleGeometry args={[0.055, 0.22, 4, 8]} />
        <Mat color={skin} />
      </mesh>
    </group>
  );
}

function Hair({ look }: { look: Look }) {
  const { hair, hairStyle } = look;
  if (hairStyle === "bald") return null;
  const cap = (
    <mesh position={[0, 1.83, -0.025]} castShadow>
      <sphereGeometry args={[hairStyle === "curly" ? 0.232 : 0.212, 20, 10, 0, Math.PI * 2, 0, Math.PI / 1.9]} />
      <Mat color={hair} />
    </mesh>
  );
  return (
    <group>
      {cap}
      {hairStyle === "long" && (
        <RoundedBox args={[0.4, 0.5, 0.14]} radius={0.06} position={[0, 1.6, -0.15]} castShadow>
          <Mat color={hair} />
        </RoundedBox>
      )}
      {hairStyle === "bun" && (
        <mesh position={[0, 1.98, -0.16]} castShadow>
          <sphereGeometry args={[0.1, 12, 10]} />
          <Mat color={hair} />
        </mesh>
      )}
      {hairStyle === "curly" &&
        [-0.17, 0, 0.17].map((dx) => (
          <mesh key={dx} position={[dx, 1.92, -0.12]} castShadow>
            <sphereGeometry args={[0.1, 10, 8]} />
            <Mat color={hair} />
          </mesh>
        ))}
    </group>
  );
}

function Badge() {
  const led = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    const on = clock.elapsedTime % LED_BLINK < LED_BLINK * 0.55;
    const mat = led.current?.material as MeshStandardMaterial | undefined;
    if (mat) mat.emissiveIntensity = on ? 2.6 : 0.2;
  });
  return (
    <group position={[0.12, 1.36, 0.17]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 0.035, 24]} />
        <meshStandardMaterial color="#F9FAFB" roughness={0.4} />
      </mesh>
      <mesh ref={led} position={[0, 0.025, 0.02]}>
        <sphereGeometry args={[0.024, 12, 12]} />
        <meshStandardMaterial color={C.rec} emissive={C.rec} emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

/** Soft glowing ring under a hovered or selected staff member. */
function SelectRing({ walkerId }: { walkerId: string }) {
  const ring = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    const m = ring.current;
    if (!m) return;
    const on = activeId(getSelection()) === walkerId;
    m.visible = on;
    if (on) m.scale.setScalar(1 + Math.sin(clock.elapsedTime * 4) * 0.06);
  });
  return (
    <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]} visible={false}>
      <ringGeometry args={[0.5, 0.62, 40]} />
      <meshBasicMaterial color={C.brandLight} transparent opacity={0.85} />
    </mesh>
  );
}

export function Person({ walker }: { walker: Walker }) {
  const root = useRef<Group>(null);
  const body = useRef<Group>(null);
  const legL = useRef<Group>(null);
  const legR = useRef<Group>(null);
  const armL = useRef<Group>(null);
  const armR = useRef<Group>(null);
  const canvas = useThree((st) => st.gl.domElement);
  const { look } = walker;
  const isStaff = walker.profileId !== undefined;
  // Each person keeps their own clock so a hovered rep can stand still while you read their card.
  const ownTime = useRef(0);

  useFrame((_, delta) => {
    const g = root.current;
    if (!g) return;
    const isHeld = isStaff && activeId(getSelection()) === walker.id;
    if (!isHeld) ownTime.current += delta;
    const t = ownTime.current;
    const route = sampleRoute(walker.route, t + walker.offset);
    const s = isHeld ? { ...route, moving: false } : route;

    g.position.set(s.x, 0, s.z);
    g.rotation.y += angleDelta(g.rotation.y, s.heading) * Math.min(1, delta * TURN_RATE);
    if (walker.fadeEnds) {
      const edge = Math.min(s.time, walker.route.total - s.time);
      g.scale.setScalar(Math.min(1, edge / FADE_SECONDS));
    }
    setLivePosition(walker.branch, walker.id, s.x, s.z);
    if (isStaff) LIVE_ACTIVITY.set(walker.id, { label: s.label, moving: s.moving });

    const phase = (t + walker.offset) * STRIDE;
    const swing = s.moving ? Math.sin(phase) : 0;
    if (legL.current) legL.current.rotation.x = swing * LEG_SWING;
    if (legR.current) legR.current.rotation.x = -swing * LEG_SWING;
    if (armL.current) armL.current.rotation.x = -swing * ARM_SWING;
    if (armR.current) armR.current.rotation.x = swing * ARM_SWING;
    if (body.current) {
      body.current.position.y = s.moving ? Math.abs(Math.cos(phase)) * 0.045 : Math.sin(t * 1.4 + walker.offset) * 0.01;
    }
  });

  const handlers = isStaff
    ? {
        onPointerOver: (e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          hover(walker.id);
          canvas.style.cursor = "pointer";
        },
        onPointerOut: () => {
          hover(null);
          canvas.style.cursor = "";
        },
        onClick: (e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          pin(walker.id);
        },
      }
    : {};

  return (
    <group ref={root}>
      <group ref={body}>
        <Leg legRef={legL} x={-0.11} pants={look.pants} />
        <Leg legRef={legR} x={0.11} pants={look.pants} />
        <RoundedBox args={[0.5, 0.66, 0.3]} radius={0.12} smoothness={3} position={[0, 1.19, 0]} castShadow>
          <Mat color={look.shirt} />
        </RoundedBox>
        <Arm armRef={armL} x={-0.31} sleeve={look.shirt} skin={look.skin} />
        <Arm armRef={armR} x={0.31} sleeve={look.shirt} skin={look.skin} />
        <mesh position={[0, 1.58, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.08, 0.1, 10]} />
          <Mat color={look.skin} />
        </mesh>
        <mesh position={[0, 1.79, 0]} castShadow>
          <sphereGeometry args={[0.2, 20, 16]} />
          <Mat color={look.skin} />
        </mesh>
        <Hair look={look} />
        {isStaff && <Badge />}
      </group>
      {isStaff && (
        <>
          <SelectRing walkerId={walker.id} />
          {/* Generous invisible hit area so people are easy to hover */}
          <mesh position={[0, 1, 0]} {...handlers}>
            <cylinderGeometry args={[0.55, 0.55, 2.1, 10]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>
          <PinAnchor id={`staff-${walker.id}`} y={2.35} />
        </>
      )}
    </group>
  );
}
