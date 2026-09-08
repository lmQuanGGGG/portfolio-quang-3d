"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles } from "@react-three/drei";
import { motion } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";

function Stack() {
  const group = useRef<THREE.Group>(null!);
  const blocks = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.42 + time * 0.13, 0.045);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * 0.25 + Math.sin(time * 0.7) * 0.05, 0.045);
    blocks.current.rotation.z = Math.sin(time * 0.55) * 0.05;
  });

  const glass = <meshPhysicalMaterial color="#c7d2fe" transparent opacity={0.68} roughness={0.18} metalness={0.08} transmission={0.35} thickness={0.8} />;
  return <Float speed={1.6} rotationIntensity={0.1} floatIntensity={0.36}>
    <group ref={group} rotation={[0.1, -0.35, 0]}>
      <group ref={blocks}>
        <RoundedBox args={[2.05, 0.36, 0.72]} radius={0.13} position={[0, -0.6, 0]}>{glass}</RoundedBox>
        <RoundedBox args={[1.72, 0.36, 0.72]} radius={0.13} position={[0.1, -0.14, 0.08]}>{glass}</RoundedBox>
        <RoundedBox args={[1.38, 0.36, 0.72]} radius={0.13} position={[-0.04, 0.32, 0.03]}>{glass}</RoundedBox>
        <RoundedBox args={[0.9, 0.44, 0.76]} radius={0.15} position={[0.06, 0.79, 0.02]}><meshPhysicalMaterial color="#4f46e5" transparent opacity={0.8} roughness={0.16} metalness={0.14} transmission={0.2} /></RoundedBox>
        <mesh position={[0.06, 0.79, 0.42]}><boxGeometry args={[0.32, 0.13, 0.025]} /><meshBasicMaterial color="#e0e7ff" /></mesh>
      </group>
      <group position={[-1.34, 0.58, 0.1]}><RoundedBox args={[0.38, 0.38, 0.38]} radius={0.09}><meshStandardMaterial color="#2dd4bf" roughness={0.25} metalness={0.2} /></RoundedBox></group>
      <group position={[1.38, 0.35, 0.18]}><RoundedBox args={[0.34, 0.34, 0.34]} radius={0.08}><meshStandardMaterial color="#fbbf24" roughness={0.25} metalness={0.2} /></RoundedBox></group>
      <group position={[-1.2, -0.84, 0.2]}><RoundedBox args={[0.3, 0.3, 0.3]} radius={0.07}><meshStandardMaterial color="#818cf8" roughness={0.25} metalness={0.2} /></RoundedBox></group>
      <group position={[1.25, -0.72, 0.15]}><RoundedBox args={[0.28, 0.28, 0.28]} radius={0.07}><meshStandardMaterial color="#fb7185" roughness={0.25} metalness={0.2} /></RoundedBox></group>
    </group>
  </Float>;
}

const modules = [
  ["FPT IS", "left-2 top-5"],
  ["TRIEU HY", "right-0 top-12"],
  ["StorePublish", "bottom-8 left-0"],
  ["Hynnie", "bottom-2 right-5"],
] as const;

export default function CareerStack3D() {
  return <div className="relative h-[270px] w-[390px]" aria-label="Interactive 3D career stack">
    <Canvas className="absolute inset-0" camera={{ position: [0, 0, 5.3], fov: 40 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={1.6} /><directionalLight position={[3, 4, 5]} intensity={2.2} color="#ffffff" /><pointLight position={[-3, 1, 3]} intensity={3} color="#818cf8" />
      <Stack /><Sparkles count={26} scale={[4.5, 3.2, 2]} size={1.6} speed={0.35} color="#818cf8" />
    </Canvas>
    {modules.map(([label, position], index) => <motion.span key={label} initial={{ opacity: 0, scale: 0.3, x: 0, y: 0 }} whileInView={{ opacity: 1, scale: 1, x: index % 2 ? 11 : -11, y: index < 2 ? -8 : 8 }} viewport={{ once: true, amount: 0.6 }} transition={{ type: "spring", stiffness: 180, damping: 13, delay: index * 0.11 }} className={`absolute rounded-full border border-white/80 bg-white/75 px-3 py-1.5 text-[10px] font-bold tracking-[.1em] text-slate-600 shadow-[0_10px_25px_rgba(15,23,42,.11)] backdrop-blur ${position}`}>{label}</motion.span>)}
  </div>;
}
