"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, PerspectiveCamera } from "@react-three/drei";
import { PCFSoftShadowMap } from "three";
import { Branch } from "./Branch";
import { BRANCHES } from "./branches";
import { City } from "./city/City";
import { Person } from "./Person";
import { PASSERS } from "./passers";
import { CameraRig, HOME_CAMERA, STORE_FOV } from "./CameraRig";
import { C } from "./palette";
import { pin } from "./selection";
import { PinUpdater } from "./pins";

const SHADOW_SPAN = 100;

function Lights() {
  return (
    <>
      <hemisphereLight args={["#FFFFFF", "#CFC8BA", 0.68]} />
      <directionalLight
        position={[30, 50, 25]}
        intensity={1.25}
        castShadow
        shadow-mapSize={[4096, 4096]}
        shadow-camera-left={-SHADOW_SPAN}
        shadow-camera-right={SHADOW_SPAN}
        shadow-camera-top={SHADOW_SPAN}
        shadow-camera-bottom={-SHADOW_SPAN}
        shadow-camera-far={200}
        shadow-radius={5}
        shadow-bias={-0.0004}
        shadow-normalBias={0.03}
      />
      {/* Soft studio reflections, built in code so nothing is downloaded */}
      <Environment resolution={128}>
        <Lightformer intensity={0.45} position={[0, 10, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[30, 30, 1]} />
        <Lightformer intensity={0.25} position={[20, 6, 10]} rotation={[0, -Math.PI / 2, 0]} scale={[20, 6, 1]} />
        <Lightformer intensity={0.15} color="#DCEBE3" position={[-20, 4, -10]} rotation={[0, Math.PI / 2, 0]} scale={[20, 6, 1]} />
      </Environment>
    </>
  );
}

export default function StoreCanvas({ active, still, interactive }: { active: boolean; still: boolean; interactive: boolean }) {
  const frameloop = !active ? "never" : still ? "demand" : "always";
  return (
    <Canvas
      shadows={{ type: PCFSoftShadowMap }}
      flat
      dpr={[1, 2]}
      frameloop={frameloop}
      gl={{ antialias: true }}
      onPointerMissed={() => pin(null)}
    >
      <color attach="background" args={[C.ground]} />
      <fog attach="fog" args={[C.ground, 110, 190]} />
      <PerspectiveCamera makeDefault fov={STORE_FOV} position={HOME_CAMERA.toArray()} near={1} far={400} />
      <CameraRig enabled={interactive} />
      <Lights />
      <City />
      {BRANCHES.map((b) => <Branch key={b.id} branch={b} />)}
      {PASSERS.map((w) => <Person key={w.id} walker={w} />)}
      <PinUpdater />
    </Canvas>
  );
}
