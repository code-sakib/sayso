"use client";

import { RoundedBox } from "@react-three/drei";

const BODY = "#1B1D21";
const TRIM = "#2C3036";

/** The SaySo store camera, built from simple shapes: a body with a lens, a mic grille and a wall mount. */
export function CameraModel() {
  return (
    <group rotation={[0, -0.5, 0]} position={[0, 0.3, 0]}>
      {/* Body */}
      <RoundedBox args={[4.2, 2.4, 2.4]} radius={0.5} smoothness={6}>
        <meshStandardMaterial color={BODY} roughness={0.45} metalness={0.2} />
      </RoundedBox>
      {/* Lens ring, glass and pupil, facing +x */}
      <mesh position={[2.15, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.85, 0.95, 0.3, 48]} />
        <meshStandardMaterial color={TRIM} roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[2.31, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.62, 0.62, 0.06, 48]} />
        <meshStandardMaterial color="#0B1A2A" roughness={0.05} metalness={0.9} />
      </mesh>
      <mesh position={[2.35, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.24, 0.24, 0.04, 32]} />
        <meshStandardMaterial color="#2E6BFF" emissive="#1E4FD8" emissiveIntensity={0.6} roughness={0.1} />
      </mesh>
      {/* Recording light */}
      <mesh position={[2.12, 0.95, 0.75]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#E5484D" emissive="#E5484D" emissiveIntensity={1.4} />
      </mesh>
      {/* Mic grille under the lens */}
      {[-0.45, -0.15, 0.15, 0.45].map((z) => (
        <mesh key={z} position={[2.12, -0.8, z]}>
          <boxGeometry args={[0.04, 0.08, 0.16]} />
          <meshStandardMaterial color="#555B63" />
        </mesh>
      ))}
      {/* Wall mount */}
      <mesh position={[-1.2, 1.7, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 1.1, 24]} />
        <meshStandardMaterial color={TRIM} roughness={0.4} metalness={0.5} />
      </mesh>
      <RoundedBox args={[1.6, 0.25, 1.6]} radius={0.1} position={[-1.2, 2.3, 0]}>
        <meshStandardMaterial color="#E9EBEE" roughness={0.6} />
      </RoundedBox>
    </group>
  );
}
