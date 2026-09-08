"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, MeshDistortMaterial, OrbitControls, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Satellite({ position, color }: { position: [number, number, number]; color: string }) {
  return <mesh position={position}><sphereGeometry args={[0.09, 20, 20]} /><meshBasicMaterial color={color} /></mesh>;
}

function SystemCore() {
  const core = useRef<THREE.Mesh>(null!);
  const orbit = useRef<THREE.Group>(null!);
  const system = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const scroll = Math.min(window.scrollY / maxScroll, 1);
    core.current.rotation.y = t * (0.22 + scroll * 1.4);
    core.current.rotation.z = Math.sin(t * 0.35) * 0.14;
    orbit.current.rotation.y = t * (0.12 + scroll * 0.7);
    orbit.current.rotation.x = Math.sin(t * 0.18) * 0.1;
    system.current.position.y = -scroll * 1.4;
    system.current.position.x = Math.sin(scroll * Math.PI) * 0.65;
    system.current.scale.setScalar(1 - scroll * 0.2);
  });
  return <group ref={system}><Float speed={1.7} rotationIntensity={0.25} floatIntensity={0.65}>
    <mesh ref={core}><icosahedronGeometry args={[1.15, 5]} /><MeshDistortMaterial color="#5666ef" roughness={0.15} metalness={0.3} distort={0.25} speed={1.65} /></mesh>
    <mesh scale={1.025}><icosahedronGeometry args={[1.15, 2]} /><meshBasicMaterial color="#c7d2fe" wireframe transparent opacity={0.42} /></mesh>
  </Float><group ref={orbit} rotation={[0.72, -0.45, 0.1]}>
    <mesh><torusGeometry args={[1.72, 0.018, 12, 120]} /><meshBasicMaterial color="#94a3ff" transparent opacity={0.85} /></mesh>
    <mesh rotation={[1.12, 0.65, 0.2]}><torusGeometry args={[2.2, 0.012, 12, 120]} /><meshBasicMaterial color="#2dd4bf" transparent opacity={0.7} /></mesh>
    <Satellite position={[1.7, 0.02, 0]} color="#f59e0b" /><Satellite position={[-1.42, -1.6, 0]} color="#14b8a6" />
  </group></group>;
}

function Network() {
  const points = useMemo(() => [new THREE.Vector3(-2.7, 1.5, -0.5), new THREE.Vector3(-1.85, 2.3, -0.7), new THREE.Vector3(2.55, 1.45, -0.65), new THREE.Vector3(2.95, -1.45, -0.6), new THREE.Vector3(-2.65, -1.85, -0.55)], []);
  return <>{points.map((point, index) => <Satellite key={index} position={[point.x, point.y, point.z]} color={index % 2 ? "#2dd4bf" : "#818cf8"} />)}<Line points={[points[0], points[1]]} color="#a5b4fc" transparent opacity={0.45} lineWidth={0.6} /><Line points={[points[2], points[3]]} color="#99f6e4" transparent opacity={0.42} lineWidth={0.6} /></>;
}

export default function Scene3D() {
  return <div className="hero-3d" aria-label="Interactive 3D visualization"><Canvas camera={{ position: [0, 0, 6.8], fov: 43 }} dpr={[1, 1.5]}><ambientLight intensity={1.3} /><directionalLight position={[4, 5, 4]} intensity={2.8} color="#eef2ff" /><pointLight position={[-3, -2, 2]} intensity={8} color="#5eead4" /><SystemCore /><Network /><Sparkles count={110} scale={5.8} size={2.5} speed={0.8} color="#818cf8" /><OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.45} minPolarAngle={Math.PI / 2.6} maxPolarAngle={Math.PI / 1.6} /></Canvas><div className="hero-3d-glow" /></div>;
}
