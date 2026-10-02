"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type ReactNode, useRef } from "react";
import Image from "next/image";

interface DepthCard3DProps {
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  subtitle?: string;
  description: string;
  tags?: string[];
  link?: string;
  actionText?: string;
  badge?: string;
  className?: string;
  children?: ReactNode;
}

export default function DepthCard3D({
  imageSrc,
  imageAlt = "3D visual",
  title,
  subtitle,
  description,
  tags = [],
  link,
  actionText = "Explore",
  badge,
  className = "",
  children,
}: DepthCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["14deg", "-14deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-14deg", "14deg"]);

  // Glare position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const CardContent = (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:shadow-[0_25px_60px_rgba(255,255,255,0.06)] ${className}`}
    >
      {/* Specular glass reflection layer */}
      <motion.div
        className="pointer-events-none absolute -inset-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 320px at ${glareX} ${glareY}, rgba(255,255,255,0.12), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Layer 0: 3D Image Canvas with depth */}
      {imageSrc && (
        <div
          style={{ transform: "translateZ(20px)" }}
          className="relative mb-5 aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 transition-transform duration-300 group-hover:scale-[1.02]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
          {badge && (
            <div
              style={{ transform: "translateZ(40px)" }}
              className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-semibold tracking-wider text-slate-200 backdrop-blur-md"
            >
              {badge}
            </div>
          )}
        </div>
      )}

      {/* Layer 1: Content with elevated Z-axis */}
      <div style={{ transform: "translateZ(35px)" }} className="relative z-10 flex flex-col justify-between">
        <div>
          {subtitle && (
            <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
              {subtitle}
            </p>
          )}
          <h3 className="mt-1 text-xl font-bold tracking-tight text-white transition-colors group-hover:text-slate-100">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            {description}
          </p>
        </div>

        {tags.length > 0 && (
          <div style={{ transform: "translateZ(45px)" }} className="mt-5 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/5 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-300 transition-colors group-hover:border-white/15 group-hover:bg-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {children}

        {link && (
          <div style={{ transform: "translateZ(50px)" }} className="mt-6 flex items-center gap-2 pt-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:underline">
              {actionText}
              <svg
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div style={{ perspective: "1200px" }} className="w-full">
      {link ? (
        <a href={link} target={link.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block">
          {CardContent}
        </a>
      ) : (
        CardContent
      )}
    </div>
  );
}
