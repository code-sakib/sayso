"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { PerspectiveCamera } from "three";
import { Building } from "./Building";
import { BRANCHES } from "./branches";
import { City } from "./city/City";
import { homeView, STORE_FOV } from "./CameraRig";
import { Person } from "./Person";
import { PASSERS } from "./passers";
import { C } from "./palette";
import { CAMERA_VIEW } from "./selection";

const STAGE_SELECTOR = ".store-section canvas";

/**
 * Uses the store camera, shifted up by exactly the hero's height (plus any gap down to the store),
 * so the hero shows the buildings right above whichever store is in view and the two line up.
 */
function MirrorCamera() {
  const camera = useThree((s) => s.camera as PerspectiveCamera);
  const gl = useThree((s) => s.gl);
  useFrame(() => {
    const own = gl.domElement.getBoundingClientRect();
    const stage = document.querySelector(STAGE_SELECTOR)?.getBoundingClientRect();
    const width = own.width;
    const height = own.height;
    const stageH = CAMERA_VIEW.isSet ? CAMERA_VIEW.height : stage?.height ?? window.innerHeight;
    const gap = stage ? stage.top - own.bottom : 0;
    if (CAMERA_VIEW.isSet) {
      camera.position.fromArray(CAMERA_VIEW.position);
      camera.quaternion.fromArray(CAMERA_VIEW.quaternion);
    } else {
      const home = homeView(width / stageH);
      camera.position.copy(home.position);
      camera.lookAt(home.target);
    }
    camera.fov = STORE_FOV;
    camera.aspect = width / stageH;
    camera.setViewOffset(width, stageH, 0, -(height + gap), width, height);
    camera.updateProjectionMatrix();
  });
  return null;
}

/** The same town as the store section, without shop interiors, labels or shadows. */
export default function CityBackdrop({ active, still }: { active: boolean; still: boolean }) {
  const frameloop = !active ? "never" : still ? "demand" : "always";
  return (
    <Canvas flat dpr={0.75} frameloop={frameloop} gl={{ antialias: false }} camera={{ fov: STORE_FOV, near: 1, far: 400 }}>
      <color attach="background" args={[C.ground]} />
      <fog attach="fog" args={[C.ground, 110, 190]} />
      <hemisphereLight args={["#FFFFFF", "#CFC8BA", 0.68]} />
      <directionalLight position={[30, 50, 25]} intensity={1.25} />
      <MirrorCamera />
      <City />
      {BRANCHES.map((b) => (
        <group key={b.id} position={[b.x, 0, b.z]}>
          <Building branch={b} withLabel={false} />
        </group>
      ))}
      {PASSERS.map((w) => <Person key={w.id} walker={w} />)}
    </Canvas>
  );
}
