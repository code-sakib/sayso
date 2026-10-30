"use client";

// Floating labels pinned to 3D points. The 3D side (PinAnchor) projects its point to the
// screen each frame and moves the matching DOM label (PinLayer) there.

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3, type Group, type Object3D } from "three";
import { SECTIONS } from "./electronics/sections";
import { FASHION_SECTIONS } from "./fashion/layout";
import { BRANCHES } from "./branches";
import { STAFF_PROFILES } from "./staff";
import { activeId, useSelection } from "./selection";

type Dot = "rec" | "info" | "idle" | "good" | "warn";

type PinSpec = { id: string; text: string; dot?: Dot; kind: "section" | "staff" | "branch" };

const PINS: PinSpec[] = [
  ...BRANCHES.map((b): PinSpec => ({ id: `branch-${b.id}`, text: `${b.street} · ${b.kind}`, kind: "branch" })),
  ...BRANCHES.filter((b) => b.kind === "Electronics").flatMap((b) =>
    SECTIONS.map((s): PinSpec => ({ id: `${b.id}-section-${s.id}`, text: s.label, kind: "section" })),
  ),
  ...FASHION_SECTIONS.map((s): PinSpec => ({ id: s.id, text: s.label, kind: "section" })),
  ...STAFF_PROFILES.map((p): PinSpec => ({
    id: `staff-${p.id}`,
    text: p.name.split(" ")[0],
    dot: p.badge.recording ? "rec" : "idle",
    kind: "staff",
  })),
];

const labels = new Map<string, HTMLDivElement>();
const anchors = new Map<string, Object3D>();
const scratch = new Vector3();

/** Marks a 3D point for a label. Positions are updated by <PinUpdater />. */
export function PinAnchor({ id, y = 0 }: { id: string; y?: number }) {
  const ref = useRef<Group>(null);
  useEffect(() => {
    const obj = ref.current;
    if (obj) anchors.set(id, obj);
    return () => {
      anchors.delete(id);
    };
  }, [id]);
  return <group ref={ref} position={[0, y, 0]} />;
}

/**
 * Moves every label to its anchor's screen position. Mount it last inside the Canvas so it runs
 * after people and the camera have moved this frame; otherwise labels trail one frame behind.
 */
export function PinUpdater() {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  useFrame(() => {
    camera.updateMatrixWorld();
    anchors.forEach((obj, id) => {
      const el = labels.get(id);
      if (!el) return;
      obj.getWorldPosition(scratch).project(camera);
      const x = ((scratch.x + 1) / 2) * size.width;
      const top = ((1 - scratch.y) / 2) * size.height;
      el.style.transform = `translate(${x}px, ${top}px) translate(-50%, -100%)`;
      el.style.visibility = scratch.z > 1 ? "hidden" : "visible";
    });
  });
  return null;
}

export function PinLayer() {
  const active = useSelection(activeId);
  return (
    <div className="pin-layer" aria-hidden="true">
      {PINS.map((p) => {
        const isActive = p.kind === "staff" && p.id === `staff-${active}`;
        return (
          <div
            key={p.id}
            className={`tag3d is-${p.kind}${isActive ? " is-active" : ""}`}
            data-pin={p.id}
            ref={(el) => {
              if (el) labels.set(p.id, el);
              else labels.delete(p.id);
            }}
          >
            {p.dot && <span className={`dot is-${p.dot}${p.dot === "rec" ? " live" : ""}`} />}
            {p.text}
          </div>
        );
      })}
    </div>
  );
}
