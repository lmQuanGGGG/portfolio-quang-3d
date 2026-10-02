"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type ReactNode, useRef } from "react";

interface Text3DDepthProps {
  children: ReactNode;
  className?: string;
  depth?: number; // 3D depth multiplier
  perspective?: number;
}

export default function Text3DDepth({
  children,
  className = "",
  depth = 12,
  perspective = 1000,
}: Text3DDepthProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [depth, -depth]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-depth, depth]);
  const translateZ = useTransform(smoothX, [-0.5, 0, 0.5], [10, 24, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: `${perspective}px` }}
      className="relative inline-block cursor-default select-none"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          translateZ,
          transformStyle: "preserve-3d",
        }}
        className={`transition-shadow duration-300 ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
