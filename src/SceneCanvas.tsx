import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Scene } from "./Scene";
import { useRef } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

// This component must be inside Canvas to use useFrame
function CameraController({ mouseX, mouseY }: { mouseX: number; mouseY: number; }) {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.target.x = mouseX * 2;
      controlsRef.current.target.y = mouseY * 2;
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      enablePan={false}
      autoRotate
      autoRotateSpeed={0.8}
    />
  );
}

export function SceneCanvas({ mouseX, mouseY }: { mouseX: number; mouseY: number; }) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [8, 6, 8], fov: 75 }}
        gl={{ antialias: true, alpha: true, toneMapping: 2, toneMappingExposure: 1.2 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#0a0e1a']} />
        <fog attach="fog" args={['#0a0e1a', 15, 60]} />

        {/* Enhanced Dramatic Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[15, 15, 8]}
          intensity={2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          color="#ffffff"
        />
        <pointLight position={[-12, -8, -12]} intensity={1.5} color="#60a5fa" distance={30} />
        <pointLight position={[12, 8, 12]} intensity={1.2} color="#818cf8" distance={30} />
        <pointLight position={[0, -10, 0]} intensity={1} color="#a78bfa" distance={25} />
        <spotLight
          position={[0, 20, 0]}
          angle={0.4}
          penumbra={1}
          intensity={1.5}
          castShadow
          color="#93c5fd"
          distance={40}
        />

        <Environment preset="city" />
        <CameraController mouseX={mouseX} mouseY={mouseY} />
        <Scene />
      </Canvas>
    </div>
  );
}