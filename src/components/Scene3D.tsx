"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, RoundedBox } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function EditorialSculpture({ lowPower }: { lowPower: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 0.35;
      pointer.current.y = (0.5 - event.clientY / window.innerHeight) * 0.25;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const scroll = Math.min(window.scrollY / maxScroll, 1);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.current.y * 0.35 + scroll * 0.2, 0.035);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.current.x * 0.5 - scroll * 0.45 + Math.sin(t * 0.18) * 0.025, 0.035);
    group.current.position.y = Math.sin(t * 0.45) * 0.035 - scroll * 0.35;
    group.current.position.z = scroll * 0.45;
  });

  return (
    <group ref={group} scale={lowPower ? 0.78 : 0.92}>
      <Float speed={lowPower ? 0.45 : 0.7} rotationIntensity={0.03} floatIntensity={0.15}>
        <RoundedBox args={[1.85, 1.85, 0.42]} radius={0.22} smoothness={6} rotation={[0.06, -0.16, -0.13]} position={[-0.2, 0.08, 0]}>
          <meshPhysicalMaterial color="#d9e2f2" roughness={0.3} metalness={0.02} transmission={0.25} thickness={0.35} clearcoat={0.35} />
        </RoundedBox>
        <RoundedBox args={[1.38, 1.38, 0.28]} radius={0.16} smoothness={6} rotation={[-0.04, 0.12, 0.2]} position={[0.34, -0.38, 0.28]}>
          <meshPhysicalMaterial color="#b5c8df" roughness={0.24} metalness={0.03} transmission={0.4} thickness={0.25} clearcoat={0.4} />
        </RoundedBox>
        <mesh position={[0.02, 0.08, 0.34]} rotation={[0.05, 0.16, -0.12]}>
          <planeGeometry args={[0.78, 0.78]} />
          <meshPhysicalMaterial color="#5e78bf" roughness={0.24} metalness={0.08} transmission={0.2} clearcoat={0.55} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0.48, 0.46, 0.1]} rotation={[0.2, -0.2, 0.1]}>
          <torusGeometry args={[0.18, 0.035, 16, 48]} />
          <meshStandardMaterial color="#f1b98d" roughness={0.48} metalness={0.05} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene3D() {
  const [enabled, setEnabled] = useState(false);
  const [inView, setInView] = useState(false);
  const [lowPower, setLowPower] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const compact = window.matchMedia("(max-width: 700px)");
    const update = () => setEnabled(motion.matches);
    const updatePower = () => setLowPower(compact.matches);
    update(); updatePower();
    motion.addEventListener("change", update);
    compact.addEventListener("change", updatePower);
    return () => { motion.removeEventListener("change", update); compact.removeEventListener("change", updatePower); };
  }, []);

  useEffect(() => {
    const element = sceneRef.current;
    if (!enabled || !element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "100px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={sceneRef} className="absolute inset-0 z-0 h-full w-full overflow-hidden" aria-hidden="true">
      <Canvas frameloop={inView ? "always" : "never"} camera={{ position: [0, 0, lowPower ? 6.7 : 5.8], fov: lowPower ? 48 : 42 }} dpr={lowPower ? [1, 1] : [1, 1.25]} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={1.4} color="#fffaf2" />
        <directionalLight position={[4, 6, 5]} intensity={2.8} color="#fff4df" />
        <directionalLight position={[-4, 1, 2]} intensity={1.1} color="#b8c8ef" />
        <EditorialSculpture lowPower={lowPower} />
        <ContactShadows position={[0, -1.65, 0]} opacity={lowPower ? 0.18 : 0.25} scale={3.8} blur={2.8} far={3} resolution={lowPower ? 64 : 128} color="#3c4659" />
      </Canvas>
    </div>
  );
}
