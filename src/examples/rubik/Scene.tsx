import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Vec3 = [number, number, number];

const POSITIONS: Vec3[] = [
  [1.5, 0, 0],
  [0, 1.5, 0],
  [0, 0, 1.5],
  [-1.5, 0, 0],
  [0, 0, -1.5],
  [0, -1.5, 0],
  [-1.5, 1.5, 1.5],
  [1.5, 1.5, 0],
  [1.5, -1.5, 0],
  [1.5, 0, 1.5],
  [1.5, 0, -1.5],
  [-1.5, 0, -1.5],
  [-1.5, 0, 1.5],
  [-1.5, -1.5, 0],
  [0, -1.5, 1.5],
  [0, -1.5, -1.5],
  [1.5, -1.5, 1.5],
  [1.5, -1.5, -1.5],
  [-1.5, -1.5, 1.5],
  [-1.5, -1.5, -1.5],
  [1.5, 1.5, 1.5],
  [1.5, 1.5, -1.5],
  [-1.5, 1.5, -1.5],
  [-1.5, 1.5, 0],
  [0, 1.5, 1.5],
  [0, 1.5, -1.5],
  [0, 0, 0],
];

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function smoothstep01(t: number) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

/**
 * Frame-rate independent damping
 * lambda ~ 8..14 is smooth and snappy
 */
function damp(current: number, target: number, lambda: number, dt: number) {
  return THREE.MathUtils.damp(current, target, lambda, dt);
}
function dampVec3(
  current: THREE.Vector3,
  target: THREE.Vector3,
  lambda: number,
  dt: number
) {
  current.x = damp(current.x, target.x, lambda, dt);
  current.y = damp(current.y, target.y, lambda, dt);
  current.z = damp(current.z, target.z, lambda, dt);
}

export function Scene({
  scrollProgress,
  mouse,
}: {
  scrollProgress: number; // 0..1
  mouse: { x: number; y: number }; // -1..1
}) {
  const groupRef = useRef<THREE.Group>(null);
  const cubieRefs = useRef<THREE.Mesh[]>([]);

  const basePositions = useMemo(() => POSITIONS, []);

  // Reuse vectors (avoid allocations every frame)
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const tmpPos = useMemo(() => new THREE.Vector3(), []);
  const tmpScale = useMemo(() => new THREE.Vector3(1, 1, 1), []);

  useFrame((state, dt) => {
    const t = state.clock.getElapsedTime();

    // ----- Scroll-driven path (Right -> Left, pin at History) -----
    const p = clamp01(scrollProgress);
    const pinAt = 0.85;
    const travelT = smoothstep01(Math.min(p / pinAt, 1));

    targetPos.set(
      THREE.MathUtils.lerp(3.2, -3.2, travelT),
      THREE.MathUtils.lerp(0.35, 0.1, travelT),
      0
    );

    // ----- Rotation targets (more "revolve" on scroll) -----
    const baseRotY = t * 0.35;
    const revolveTurns = 0.5;
    const scrollRevolve = travelT * Math.PI * 2 * revolveTurns;
    const targetRotY = baseRotY + scrollRevolve;

    const targetRotX = 0.25 + Math.sin(t * 0.4) * 0.06 + travelT * 0.25;

    // ----- Mouse tilt -----
    const tiltX = -mouse.y * 0.38;
    const tiltY = mouse.x * 0.28;

    // ----- Apply smooth damping -----
    const g = groupRef.current;
    if (g) {
      tmpPos.copy(g.position);
      dampVec3(tmpPos, targetPos, 10, dt);
      g.position.copy(tmpPos);

      g.rotation.y = damp(g.rotation.y, targetRotY + tiltY, 10, dt);
      g.rotation.x = damp(g.rotation.x, targetRotX + tiltX, 10, dt);

      const breathe = 1 + Math.sin(t * 0.6) * 0.01;
      tmpScale.setScalar(breathe);
      g.scale.lerp(tmpScale, 0.06);
    }

    // ----- Cube-wave -----
    const waveStrength = 0.1 + (1 - travelT) * 0.03;

    cubieRefs.current.forEach((m, i) => {
      if (!m) return;
      const bp = basePositions[i];
      const phase = i * 0.28;

      const wx = Math.cos(t * 1.2 + phase) * waveStrength;
      const wy = Math.sin(t * 1.5 + phase) * waveStrength * 1.15;
      const wz = Math.sin(t * 1.0 + phase) * waveStrength;

      m.position.set(bp[0] + wx, bp[1] + wy, bp[2] + wz);
    });
  });

  return (
    <>
      {/* ===== Better studio lighting ===== */}
      {/* Soft ambient lift */}
      <ambientLight intensity={0.25} />

      {/* Key light (main) */}
      <directionalLight
        position={[8, 10, 6]}
        intensity={1.25}
        color={"#ffffff"}
      />

      {/* Fill light (cool) */}
      <directionalLight
        position={[-8, 2, 6]}
        intensity={0.55}
        color={"#bfe7ff"}
      />

      {/* Rim light (separates from background) */}
      <directionalLight
        position={[-6, 10, -10]}
        intensity={0.85}
        color={"#ffd6f7"}
      />

      {/* Small point sparkle */}
      <pointLight position={[0, -6, 10]} intensity={0.35} color={"#7dd3fc"} />

      {/* ===== Scene Objects ===== */}
      <group ref={groupRef}>
        {basePositions.map((p, i) => (
          <mesh
            key={i}
            ref={(el) => {
              if (el) cubieRefs.current[i] = el;
            }}
            position={p}
          >
            {/* slightly beveled look via smaller gaps (geometry stays same) */}
            <boxGeometry args={[0.98, 0.98, 0.98]} />
            <meshStandardMaterial
              color="#4a90d9"
              roughness={0.35}
              metalness={0.08}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}
