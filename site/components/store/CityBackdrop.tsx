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
import { Lights } from "./StoreCanvas";
import { townTime } from "./townClock";

const STAGE_SELECTOR = ".store-section canvas";

export type Placement = "above" | "below";

/**
 * Uses the store camera, shifted by exactly this canvas's height: "above" shows the buildings right
 * above whichever store is in view (the hero, so the two line up); "below" shows the street and park
 * just below it (the section under the store).
 */
function MirrorCamera({ placement }: { placement: Placement }) {
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
    const offsetY = placement === "above" ? -(height + gap) : stageH;
    camera.setViewOffset(width, stageH, 0, offsetY, width, height);
    camera.updateProjectionMatrix();
  });
  return null;
}

/** The same town as the store section, without shop interiors, labels or shadows. */
export default function CityBackdrop({ active, still, placement = "above" }: { active: boolean; still: boolean; placement?: Placement }) {
  const frameloop = !active ? "never" : still ? "demand" : "always";
  return (
    <Canvas
      flat
      // The hero is washed out behind text, so it renders cheaply; below the store it is shown sharp
      dpr={placement === "below" ? [1, 1.5] : 0.75}
      frameloop={frameloop}
      gl={{ antialias: placement === "below" }} camera={{ fov: STORE_FOV, near: 1, far: 400 }}>
      <color attach="background" args={[C.ground]} />
      <fog attach="fog" args={[C.ground, 110, 190]} />
      <Lights />
      <MirrorCamera placement={placement} />
      <City />
      {BRANCHES.map((b) => (
        <group key={b.id} position={[b.x, 0, b.z]}>
          <Building branch={b} withLabel={false} />
        </group>
      ))}
      {PASSERS.map((w) => <Person key={w.id} walker={w} time={townTime} />)}
    </Canvas>
  );
}
