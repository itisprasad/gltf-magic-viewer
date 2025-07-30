import { useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, PerspectiveCamera, Environment } from "@react-three/drei";
import { Mesh } from "three";
import { toast } from "sonner";

interface ModelProps {
  url: string;
  wireframe: boolean;
}

function Model({ url, wireframe }: ModelProps) {
  const { scene } = useGLTF(url);
  const meshRef = useRef<Mesh>(null);

  // Apply wireframe to all meshes
  scene.traverse((child) => {
    if (child instanceof Mesh) {
      child.material.wireframe = wireframe;
    }
  });

  return <primitive object={scene} ref={meshRef} />;
}

interface ModelViewerProps {
  modelUrl: string | null;
  wireframe: boolean;
  environmentPreset: "sunset" | "dawn" | "night" | "warehouse" | "forest" | "apartment" | "studio" | "city" | "park" | "lobby";
}

export const ModelViewer = ({ modelUrl, wireframe, environmentPreset }: ModelViewerProps) => {
  const controlsRef = useRef<any>(null);

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      toast("Camera position reset!");
    }
  };

  return (
    <div className="relative w-full h-full bg-canvas-bg rounded-lg overflow-hidden">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        {/* Environment */}
        <Environment preset={environmentPreset} />
        
        {/* Controls */}
        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          dampingFactor={0.05}
          enableDamping={true}
        />
        
        {/* Model */}
        {modelUrl && (
          <Suspense
            fallback={
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#666" wireframe />
              </mesh>
            }
          >
            <Model url={modelUrl} wireframe={wireframe} />
          </Suspense>
        )}
      </Canvas>
      
      {/* Reset Camera Button */}
      <button
        onClick={resetCamera}
        className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-3 py-2 rounded-md 
                   hover:bg-primary/90 transition-colors duration-200 text-sm font-medium"
      >
        Reset Camera
      </button>
      
      {/* Placeholder when no model */}
      {!modelUrl && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
              </svg>
            </div>
            <p className="text-muted-foreground">Upload a 3D model to get started</p>
          </div>
        </div>
      )}
    </div>
  );
};