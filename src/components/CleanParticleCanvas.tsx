"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  speed: number;
  angle: number;
};

export default function CleanParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(95, Math.floor((width * height) / 14000));
      particles = Array.from({ length: count }, () => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        return {
          x,
          y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          size: 1 + Math.random() * 2,
          alpha: 0.15 + Math.random() * 0.35,
          speed: 0.18 + Math.random() * 0.3,
          angle: Math.random() * Math.PI * 2,
        };
      });
    };

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const onLeave = () => {
      mouseRef.current = { ...mouseRef.current, active: false };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    resize();

    let frame = 0;
    let time = 0;

    const draw = () => {
      time += 0.006;
      ctx.clearRect(0, 0, width, height);

      const { x: mx, y: my, active } = mouseRef.current;

      // Draw faint connections between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Update & render particles
      for (const p of particles) {
        p.baseX += Math.cos(p.angle) * p.speed * 0.3;
        p.baseY += Math.sin(p.angle) * p.speed * 0.3;

        if (p.baseX < -10) p.baseX = width + 10;
        if (p.baseX > width + 10) p.baseX = -10;
        if (p.baseY < -10) p.baseY = height + 10;
        if (p.baseY > height + 10) p.baseY = -10;

        p.vx += (p.baseX - p.x) * 0.04;
        p.vy += (p.baseY - p.y) * 0.04;

        if (active) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 180) {
            const force = (1 - dist / 180) * 8;
            p.vx -= (dx / dist) * force;
            p.vy -= (dy / dist) * force;
          }
        }

        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy;

        const pulse = Math.sin(time * 3 + p.angle) * 0.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 243, 250, ${Math.max(0.1, p.alpha + pulse)})`;
        ctx.shadowColor = "rgba(255, 255, 255, 0.45)";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60"
      aria-hidden="true"
    />
  );
}
