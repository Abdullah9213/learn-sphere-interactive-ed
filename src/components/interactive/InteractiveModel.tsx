
import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, ThreeElements, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Float, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { MotionConfig } from 'framer-motion';

// Interactive 3D shape with advanced material
const InteractiveShape = ({ position = [0, 0, 0], color = '#6d28d9', size = 1.5 }: { position?: [number, number, number], color?: string, size?: number }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);
  
  // Animation for the shape
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={5} rotationIntensity={0.5} floatIntensity={2}>
      <motion.mesh
        ref={mesh}
        position={position}
        scale={active ? 1.5 : 1}
        onClick={() => setActive(!active)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <icosahedronGeometry args={[size, 2]} />
        <MeshDistortMaterial 
          color={hover ? '#f97316' : color} 
          speed={hover ? 5 : 2}
          distort={hover ? 0.6 : 0.3}
          roughness={0.2}
          metalness={0.8}
        />
      </motion.mesh>
    </Float>
  );
};

// Create multiple interactive shapes for a more complex scene
const InteractiveScene = () => {
  return (
    <MotionConfig transition={{ duration: 0.5, type: 'spring' }}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} color="#f97316" intensity={1} />
        
        <InteractiveShape position={[-3, 0, 0]} color="#8b5cf6" size={1.2} />
        <InteractiveShape position={[0, 0, 0]} color="#6d28d9" size={1.5} />
        <InteractiveShape position={[3, 0, 0]} color="#9333ea" size={1.0} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI - Math.PI / 4}
        />
      </Canvas>
    </MotionConfig>
  );
};

export const InteractiveModel = () => {
  return (
    <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-xl border border-white/10 glass-card">
      <InteractiveScene />
    </div>
  );
};
