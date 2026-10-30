"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MapControls } from "@react-three/drei";
import { MathUtils, Vector3 } from "three";
import { BRANCHES, MAIN_BRANCH, branchById, type Branch } from "./branches";
import { SNAP_MIN, snapTarget } from "./snap";
import { CITY } from "./city/plan";
import { CAMERA_FOCUS, CAMERA_VIEW, getSelection } from "./selection";

export const STORE_FOV = 30;

/** Each store is framed slightly in front of its centre so the door and street show. */
const FRAME_DZ = 1.5;
const POLAR = 0.9; // radians from straight down
const AZIMUTH = 0.62;
const AZIMUTH_PLAY = 0.7; // how far people can turn the view
const HOME_DISTANCE = 52;
const MIN_DISTANCE = 14;
const MAX_DISTANCE = 75;
const FLY_RATE = 3.2;
const PAN_MARGIN = 20;

const direction = (azimuth: number) =>
  new Vector3(Math.sin(POLAR) * Math.sin(azimuth), Math.cos(POLAR), Math.sin(POLAR) * Math.cos(azimuth));

const frameOf = (b: Branch) => new Vector3(b.x, 0, b.z + FRAME_DZ);

export const HOME_CAMERA = frameOf(MAIN_BRANCH).addScaledVector(direction(AZIMUTH), HOME_DISTANCE);

type MapControlsImpl = React.ComponentRef<typeof MapControls>;

type Goal = { target: Vector3; distance: number; dir?: Vector3 };

/** Bigger screens see more of the store, so they start a little closer. */
const homeDistance = (aspect: number) => HOME_DISTANCE * MathUtils.clamp(1.9 / aspect, 0.85, 1.6);

/** Where the store camera sits before anyone moves it, for a stage of this shape. */
export function homeView(aspect: number) {
  const target = frameOf(MAIN_BRANCH);
  return { target, position: target.clone().addScaledVector(direction(AZIMUTH), homeDistance(aspect)) };
}

/**
 * Drag to move between the stores (a short flick is enough: it flies to the next store in that
 * direction), right-drag turns the view, and the overlay buttons fly to a store. Wheel zoom
 * stays off so the page still scrolls past.
 */
export function CameraRig({ enabled }: { enabled: boolean }) {
  const controls = useRef<MapControlsImpl>(null);
  const camera = useThree((s) => s.camera);
  const gl = useThree((s) => s.gl);
  const aspect = useThree((s) => s.size.width / s.size.height);
  const height = useThree((s) => s.size.height);
  const goal = useRef<Goal | null>({ target: frameOf(MAIN_BRANCH), distance: homeDistance(aspect), dir: direction(AZIMUTH) });
  const dragStart = useRef<Vector3 | null>(null);
  const lastSeq = useRef(0);

  // Re-frame when the stage changes shape
  useEffect(() => {
    goal.current = { target: frameOf(MAIN_BRANCH), distance: homeDistance(aspect), dir: direction(AZIMUTH) };
  }, [aspect]);

  useFrame((_, delta) => {
    const c = controls.current;
    if (!c) return;
    CAMERA_FOCUS.x = c.target.x;
    CAMERA_FOCUS.z = c.target.z;
    camera.position.toArray(CAMERA_VIEW.position);
    camera.quaternion.toArray(CAMERA_VIEW.quaternion);
    CAMERA_VIEW.height = height;
    CAMERA_VIEW.isSet = true;
    readCommand(c, aspect);

    const g = goal.current;
    if (!g) return;
    const k = 1 - Math.exp(-delta * FLY_RATE);
    const offset = camera.position.clone().sub(c.target);
    const dist = MathUtils.lerp(offset.length(), g.distance, k);
    const dir = offset.normalize();
    if (g.dir) dir.lerp(g.dir, k).normalize();
    c.target.lerp(g.target, k);
    camera.position.copy(c.target).addScaledVector(dir, dist);
    c.update();
    if (c.target.distanceTo(g.target) < 0.02 && Math.abs(dist - g.distance) < 0.05) goal.current = null;
  });

  function flyTo(b: Branch, aspectNow: number) {
    goal.current = { target: frameOf(b), distance: homeDistance(aspectNow) };
  }

  function readCommand(c: MapControlsImpl, aspectNow: number) {
    const cmd = getSelection().command;
    if (!cmd || cmd.seq === lastSeq.current) return;
    lastSeq.current = cmd.seq;
    if (cmd.kind === "zoom") {
      const dist = camera.position.distanceTo(c.target);
      goal.current = { target: c.target.clone(), distance: MathUtils.clamp(dist * cmd.factor, MIN_DISTANCE, MAX_DISTANCE) };
    } else if (cmd.kind === "home") {
      goal.current = { target: frameOf(MAIN_BRANCH), distance: homeDistance(aspectNow), dir: direction(AZIMUTH) };
    } else {
      const b = branchById(cmd.id);
      if (b) flyTo(b, aspectNow);
    }
  }

  /** Keep the view over the town while panning. */
  function clampTarget() {
    const c = controls.current;
    if (!c) return;
    const before = c.target.clone();
    const xs = BRANCHES.map((b) => b.x);
    const zs = BRANCHES.map((b) => b.z);
    c.target.x = MathUtils.clamp(c.target.x, Math.min(...xs) - PAN_MARGIN, Math.max(...xs) + PAN_MARGIN);
    c.target.z = MathUtils.clamp(c.target.z, Math.min(...zs) - PAN_MARGIN, Math.min(Math.max(...zs) + PAN_MARGIN, CITY.maxZ));
    c.target.y = 0;
    camera.position.add(c.target.clone().sub(before));
  }

  return (
    <MapControls
      ref={controls}
      makeDefault
      enabled={enabled}
      enableZoom={false}
      enableDamping
      dampingFactor={0.12}
      minPolarAngle={POLAR}
      maxPolarAngle={POLAR}
      minAzimuthAngle={AZIMUTH - AZIMUTH_PLAY}
      maxAzimuthAngle={AZIMUTH + AZIMUTH_PLAY}
      onStart={() => {
        goal.current = null;
        dragStart.current = controls.current?.target.clone() ?? null;
        gl.domElement.classList.add("is-dragging");
      }}
      onEnd={() => {
        gl.domElement.classList.remove("is-dragging");
        const c = controls.current;
        const start = dragStart.current;
        dragStart.current = null;
        if (!c || !start) return;
        // Turning the view (right-drag) barely moves the target, so it never snaps.
        if (c.target.distanceTo(start) < SNAP_MIN) return;
        flyTo(snapTarget(BRANCHES, start, c.target), aspect);
      }}
      onChange={clampTarget}
    />
  );
}
