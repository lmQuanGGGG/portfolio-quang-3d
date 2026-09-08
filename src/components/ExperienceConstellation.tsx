"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles, useTexture } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const chips = [
  { name: "FPT IS", color: "#6366f1", phase: 0, logo: "/fpt-is-logo.png", aspect: 2, zoom: 1 },
  { name: "TMTECH", color: "#f59e0b", phase: Math.PI / 2, logo: "/tmtech-logo.png", aspect: 3.36, zoom: 1 },
  { name: "TRIEU HY", color: "#2dd4bf", phase: Math.PI, logo: "/trieu-hy-logo.png", aspect: 1.78, zoom: 1.17 },
  { name: "StorePublish", color: "#fb7185", phase: Math.PI * 1.5, logo: "/storepublish-wordmark.png", aspect: 3, zoom: 1.2 },
];

function CompanyLogo({ url, aspect, zoom }: { url: string; aspect: number; zoom: number }) {
  const texture = useTexture(url);
  texture.colorSpace = THREE.SRGBColorSpace;
  // Keep every brand readable while respecting its native proportions.
  const height = Math.min(.42, .96 / aspect) * zoom;
  return <mesh position={[.08, 0, .078]} scale={[height * aspect, height, 1]}>
    <planeGeometry args={[1, 1]} />
    <meshBasicMaterial map={texture} transparent toneMapped={false} />
  </mesh>;
}

function Constellation() {
  const system = useRef<THREE.Group>(null!);
  const core = useRef<THREE.Mesh>(null!);
  const chipsRef = useRef<THREE.Group[]>([]);
  const crystalGeometry = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(1, 2);
    const positions = geometry.attributes.position;
    const colors = new Float32Array(positions.count * 3);
    const color = new THREE.Color();

    for (let index = 0; index < positions.count; index += 1) {
      const x = positions.getX(index);
      const y = positions.getY(index);
      const z = positions.getZ(index);
      const angle = (Math.atan2(z, x) + Math.PI) / (Math.PI * 2);
      const hue = (.53 + angle * .32 + y * .045 + Math.sin((x - z) * 4) * .025) % 1;
      color.setHSL(hue, .78, .59);
      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;
    }

    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    const scroll = Math.min(window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1), 1);
    const time = state.clock.getElapsedTime();
    system.current.rotation.y = THREE.MathUtils.lerp(system.current.rotation.y, state.pointer.x * .42 + scroll * Math.PI * 2.35, .035);
    system.current.rotation.x = THREE.MathUtils.lerp(system.current.rotation.x, -state.pointer.y * .24 + Math.sin(scroll * Math.PI * 2) * .16, .035);
    core.current.rotation.x = time * .28 + scroll * Math.PI * 1.8;
    core.current.rotation.y = time * .45 - scroll * Math.PI * 2.2;
    chipsRef.current.forEach((chip, index) => {
      const phase = chips[index].phase + time * .7 + scroll * Math.PI * 5.6;
      const radius = 1.66 + Math.sin(scroll * Math.PI) * .44;
      const depth = Math.sin(phase * 1.4);
      chip.position.set(Math.cos(phase) * radius, Math.sin(phase) * 1.02, depth * .7);
      chip.scale.setScalar(.82 + (depth + 1) * .17);
      chip.lookAt(state.camera.position);
      chip.rotateZ(Math.sin(time * 1.35 + index) * .12);
    });
  });

  return <group ref={system}>
    <Float speed={1.35} rotationIntensity={.12} floatIntensity={.38}>
      <mesh ref={core} scale={1.08} geometry={crystalGeometry}><meshPhysicalMaterial vertexColors metalness={.38} roughness={.16} clearcoat={1} clearcoatRoughness={.08} iridescence={1} iridescenceIOR={1.4} emissive="#18204e" emissiveIntensity={.3} /></mesh>
      <mesh scale={1.105} geometry={crystalGeometry}><meshBasicMaterial vertexColors wireframe transparent opacity={.15} /></mesh>
      <mesh scale={.64}><icosahedronGeometry args={[1, 1]} /><meshStandardMaterial color="#6d28d9" metalness={.72} roughness={.16} emissive="#ec4899" emissiveIntensity={.33} /></mesh>
    </Float>
    {chips.map((chip, index) => <group key={chip.name} ref={(node) => { if (node) chipsRef.current[index] = node; }}>
      <Float speed={1.25 + index * .12} floatIntensity={.16} rotationIntensity={.06} floatingRange={[-.045, .045]}>
        <RoundedBox args={[1.5, .52, .11]} radius={.16} smoothness={4}><meshPhysicalMaterial color="#ffffff" roughness={.18} metalness={.08} transmission={.12} /></RoundedBox>
        <mesh position={[-.63, 0, .07]}><circleGeometry args={[.075, 18]} /><meshBasicMaterial color={chip.color} /></mesh>
        <CompanyLogo url={chip.logo} aspect={chip.aspect} zoom={chip.zoom} />
      </Float>
    </group>)}
  </group>;
}

export default function ExperienceConstellation() {
  return <div className="h-[325px] w-[520px]" aria-label="Interactive 3D experience constellation"><Canvas camera={{ position: [0, 0, 6.25], fov: 42 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}><ambientLight intensity={1.6} /><directionalLight position={[3, 4, 4]} intensity={2.8} /><pointLight position={[-2, 1, 3]} intensity={3.2} color="#818cf8" /><Constellation /><Sparkles count={62} scale={[5.3, 3.8, 2]} size={1.8} speed={.4} color="#a5b4fc" /></Canvas></div>;
}
