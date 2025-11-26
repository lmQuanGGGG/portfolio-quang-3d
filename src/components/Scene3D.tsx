"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Icosahedron, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Crystal() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Xoay phức tạp hơn
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.5;
    meshRef.current.rotation.y = Math.cos(t * 0.5) * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Icosahedron args={[1, 0]} ref={meshRef} scale={1.8}>
         {/* Vật liệu truyền sáng giống thủy tinh/kim cương công nghệ */}
        <MeshTransmissionMaterial 
          backside
          samples={4}
          thickness={2}
          chromaticAberration={0.5}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.5}
          color="#a855f7" // Tím neon
          roughness={0.1}
        />
      </Icosahedron>
    </Float>
  );
}

function BgParticles() {
    const ref = useRef<THREE.Group>(null);
    useFrame((state, delta) => {
        if(ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });
    
    return (
        <group rotation={[0,0, Math.PI / 4]} ref={ref}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </group>
    )
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 bg-black">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} intensity={2} color="#ec4899" />
        
        <Crystal />
        <BgParticles />
      </Canvas>
      {/* Lớp phủ mờ màu tím để tạo không gian huyền bí */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none"></div>
    </div>
  );
}