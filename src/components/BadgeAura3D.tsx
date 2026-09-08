"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function HolographicOrbit() {
  const group = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const scroll = Math.min(window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1), 1);
    group.current.rotation.z = state.clock.getElapsedTime() * .22 + scroll * Math.PI * 3.2;
    group.current.rotation.y = scroll * Math.PI * 1.5;
    group.current.rotation.x = Math.sin(scroll * Math.PI) * .45;
    group.current.position.y = Math.sin(scroll * Math.PI) * -.48;
  });
  return <Float speed={1.4} rotationIntensity={.12} floatIntensity={.45}>
    <group ref={group} rotation={[.7, .18, .12]}>
      <mesh><torusGeometry args={[2.4, .018, 10, 120]} /><meshBasicMaterial color="#818cf8" transparent opacity={.82} /></mesh>
      <mesh rotation={[1.25, .25, .35]}><torusGeometry args={[2.95, .014, 10, 120]} /><meshBasicMaterial color="#2dd4bf" transparent opacity={.72} /></mesh>
      <mesh rotation={[-.45, .7, -.2]}><torusGeometry args={[3.35, .01, 10, 120]} /><meshBasicMaterial color="#f59e0b" transparent opacity={.56} /></mesh>
    </group>
  </Float>;
}

export default function BadgeAura3D() {
  return <div className="badge-aura-3d" aria-hidden="true"><Canvas gl={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 7], fov: 42 }} dpr={[1, 1.5]}><ambientLight intensity={1.2} /><HolographicOrbit /><Sparkles count={52} scale={[6, 8, 2]} size={2.1} speed={.45} color="#818cf8" /></Canvas></div>;
}
