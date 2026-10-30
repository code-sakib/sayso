"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { BadgeModel } from "./BadgeModel";

const START: [number, number, number] = [5, 3.4, 15];

/** Drag-to-turn viewer for the badge. It turns by itself until you grab it. */
export default function BadgeViewer({ isRecording, onPress, active, still }: { isRecording: boolean; onPress: () => void; active: boolean; still: boolean }) {
  return (
    <Canvas flat dpr={[1, 2]} camera={{ position: START, fov: 30 }} gl={{ antialias: true, alpha: true }} frameloop={!active ? "never" : still ? "demand" : "always"}>
      <hemisphereLight args={["#FFFFFF", "#C8CDD3", 1.35]} />
      <directionalLight position={[6, 8, 10]} intensity={1.5} />
      <directionalLight position={[-8, -2, -6]} intensity={0.4} />
      <Environment resolution={128}>
        <Lightformer intensity={0.7} position={[0, 6, 6]} scale={[10, 4, 1]} />
        <Lightformer intensity={0.3} position={[-6, 2, 2]} rotation={[0, Math.PI / 2, 0]} scale={[6, 4, 1]} />
      </Environment>
      <BadgeModel isRecording={isRecording} onPress={onPress} />
      <ContactShadows position={[0, -3.6, 0]} opacity={0.28} scale={10} blur={2.6} far={5} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={!still} autoRotateSpeed={1.4} minPolarAngle={0.5} maxPolarAngle={2.3} />
    </Canvas>
  );
}
