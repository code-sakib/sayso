"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { CameraModel } from "./CameraModel";

/** Drag-to-turn viewer for the future store camera. It turns by itself until you grab it. */
export default function CameraViewer({ active, still }: { active: boolean; still: boolean }) {
  return (
    <Canvas flat dpr={[1, 2]} camera={{ position: [6, 3, 12], fov: 32 }} gl={{ antialias: true, alpha: true }} frameloop={!active ? "never" : still ? "demand" : "always"}>
      <hemisphereLight args={["#FFFFFF", "#C8CDD3", 1.35]} />
      <directionalLight position={[6, 8, 10]} intensity={1.5} />
      <directionalLight position={[-8, -2, -6]} intensity={0.4} />
      <Environment resolution={128}>
        <Lightformer intensity={0.7} position={[0, 6, 6]} scale={[10, 4, 1]} />
        <Lightformer intensity={0.3} position={[-6, 2, 2]} rotation={[0, Math.PI / 2, 0]} scale={[6, 4, 1]} />
      </Environment>
      <CameraModel />
      <ContactShadows position={[0, -2.2, 0]} opacity={0.28} scale={10} blur={2.6} far={5} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={!still} autoRotateSpeed={1.2} minPolarAngle={0.6} maxPolarAngle={2.2} />
    </Canvas>
  );
}
