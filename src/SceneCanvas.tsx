import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Scene } from "./Scene";
import * as THREE from "three";

export function SceneCanvas() {
  return (
    <div className="w-full h-full">
      <Canvas
        style={{ background: "transparent" }}
        camera={{ position: [10, 8, 10], fov: 65 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ReinhardToneMapping,
          toneMappingExposure: 1.4,
        }}
      >
        {/* Ambient base */}
        <ambientLight intensity={0.35} />

        {/* Key light */}
        <directionalLight
          position={[12, 15, 8]}
          intensity={2.2}
          color="#93c5fd"
          castShadow
          shadow-mapSize={[2048, 2048]}
        />

        {/* Rim light */}
        <pointLight
          position={[-10, 0, -10]}
          intensity={1.6}
          color="#60a5fa"
          distance={30}
        />

        {/* Core glow */}
        <pointLight
          position={[0, 0, 0]}
          intensity={2.5}
          color="#ec4899"
          distance={20}
        />

        {/* Reflections */}
        <Environment preset="city" environmentIntensity={0.4} />

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
          enableDamping
          dampingFactor={0.05}
        />

        <group scale={1.5}>
          <Scene />
        </group>
      </Canvas>
    </div>
  );
}
