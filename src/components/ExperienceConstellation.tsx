"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles, useTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const chips = [
  { name: "FPT IS", color: "#ffffff", phase: 0, logo: "/fpt-is-logo.png", aspect: 2, zoom: 1 },
  { name: "TMTECH", color: "#e2e8f0", phase: Math.PI / 2, logo: "/tmtech-logo.png", aspect: 3.36, zoom: 1 },
  { name: "TRIEU HY", color: "#cbd5e1", phase: Math.PI, logo: "/trieu-hy-logo.png", aspect: 1.78, zoom: 1.17 },
  { name: "StorePublish", color: "#94a3b8", phase: Math.PI * 1.5, logo: "/storepublish-wordmark.png", aspect: 3, zoom: 1.2 },
];

function CompanyLogo({ url, aspect, zoom }: { url: string; aspect: number; zoom: number }) {
  const sourceTexture = useTexture(url);
  const texture = useMemo(() => {
    const copy = sourceTexture.clone();
    copy.colorSpace = THREE.SRGBColorSpace;
    return copy;
  }, [sourceTexture]);
  const height = Math.min(0.42, 0.96 / aspect) * zoom;
  return (
    <mesh position={[0.08, 0, 0.078]} scale={[height * aspect, height, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent toneMapped={false} />
    </mesh>
  );
}

function Constellation() {
  const system = useRef<THREE.Group>(null!);
  const core = useRef<THREE.Mesh>(null!);
  const chipsRef = useRef<THREE.Group[]>([]);

  useFrame((state) => {
    const scroll = Math.min(
      window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1),
      1
    );
    const time = state.clock.getElapsedTime();
    system.current.rotation.y = THREE.MathUtils.lerp(
      system.current.rotation.y,
      state.pointer.x * 0.42 + scroll * Math.PI * 2.35,
      0.035
    );
    system.current.rotation.x = THREE.MathUtils.lerp(
      system.current.rotation.x,
      -state.pointer.y * 0.24 + Math.sin(scroll * Math.PI * 2) * 0.16,
      0.035
    );
    core.current.rotation.x = time * 0.25 + scroll * Math.PI * 1.5;
    core.current.rotation.y = time * 0.38 - scroll * Math.PI * 1.8;

    chipsRef.current.forEach((chip, index) => {
      const phase = chips[index].phase + time * 0.5 + scroll * Math.PI * 4;
      const radius = 1.75 + Math.sin(scroll * Math.PI) * 0.3;
      const depth = Math.sin(phase * 1.3);
      chip.position.set(Math.cos(phase) * radius, Math.sin(phase) * 0.9, depth * 0.6);
      chip.scale.setScalar(0.85 + (depth + 1) * 0.15);
      chip.lookAt(state.camera.position);
      chip.rotateZ(Math.sin(time * 1.2 + index) * 0.08);
    });
  });

  return (
    <group ref={system}>
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
        {/* Clean Brushed Titanium Core */}
        <mesh ref={core} scale={1.05}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#e2e8f0"
            metalness={0.92}
            roughness={0.2}
          />
        </mesh>
        {/* Outer Frosted Crystal Wireframe */}
        <mesh scale={1.12}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.25} />
        </mesh>
      </Float>

      {/* Titanium Floating Chips */}
      {chips.map((chip, index) => (
        <group
          key={chip.name}
          ref={(node) => {
            if (node) chipsRef.current[index] = node;
          }}
        >
          <Float
            speed={1.2 + index * 0.1}
            floatIntensity={0.15}
            rotationIntensity={0.05}
            floatingRange={[-0.04, 0.04]}
          >
            <RoundedBox args={[1.52, 0.54, 0.12]} radius={0.16} smoothness={4}>
              <meshPhysicalMaterial
                color="#0f172a"
                roughness={0.2}
                metalness={0.8}
                clearcoat={1}
                clearcoatRoughness={0.1}
              />
            </RoundedBox>
            <mesh position={[-0.64, 0, 0.07]}>
              <circleGeometry args={[0.065, 18]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            <CompanyLogo url={chip.logo} aspect={chip.aspect} zoom={chip.zoom} />
          </Float>
        </group>
      ))}
    </group>
  );
}

export default function ExperienceConstellation() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 701px) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!enabled) return <div className="h-[325px] w-[520px]" aria-hidden="true" />;

  return (
    <div className="h-[325px] w-[520px]" aria-label="Interactive 3D experience constellation">
      <Canvas
        camera={{ position: [0, 0, 6.25], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 5, 5]} intensity={2.4} color="#ffffff" />
        <pointLight position={[-3, 2, 3]} intensity={1.8} color="#cbd5e1" />
        <Constellation />
        <Sparkles count={45} scale={[5.5, 4, 2]} size={1.6} speed={0.3} color="#ffffff" />
      </Canvas>
    </div>
  );
}
