"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number; y: number; baseX: number; baseY: number; vx: number; vy: number;
  size: number; color: string; shape: number; angle: number; speed: number;
  depth: number; rotation: number; rotSpeed: number; heartX: number; heartY: number;
};

const ATTRACT_RADIUS = 800;
const RETURN_FORCE = 0.05;
const FRICTION = 0.92;

export default function HeartCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const colors = ["#4285F4", "#EA4335", "#FBBC04", "#34A853", "#7B61FF", "#FF6D93", "#00BCD4", "#FF9800", "#A855F7", "#06B6D4"];
    let width = 0, height = 0;
    let particles: Particle[] = [];
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(250, Math.floor(width * height / 4500));
      particles = Array.from({ length: count }, () => {
        const depth = .3 + Math.random() * .7;
        const heartAngle = Math.random() * Math.PI * 2;
        const heartScale = (.3 + Math.random() * .7) * 20;
        return {
          x: Math.random() * width, y: Math.random() * height,
          baseX: Math.random() * width, baseY: Math.random() * height,
          vx: 0, vy: 0, size: (2 + Math.random() * 4) * depth,
          color: colors[Math.floor(Math.random() * colors.length)], shape: Math.floor(Math.random() * 3),
          angle: Math.random() * Math.PI * 2, speed: .15 + Math.random() * .3, depth,
          rotation: Math.random() * Math.PI * 2, rotSpeed: (Math.random() - .5) * .02,
          heartX: heartScale * 16 * Math.pow(Math.sin(heartAngle), 3),
          heartY: -heartScale * (13 * Math.cos(heartAngle) - 5 * Math.cos(2 * heartAngle) - 2 * Math.cos(3 * heartAngle) - Math.cos(4 * heartAngle)),
        };
      });
    };
    const onMove = (event: MouseEvent) => { mouseRef.current = { x: event.clientX, y: event.clientY, active: true }; };
    const onLeave = () => { mouseRef.current = { ...mouseRef.current, active: false }; };
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    resize();

    let frame = 0;
    let time = 0;
    const draw = () => {
      time += .005;
      ctx.clearRect(0, 0, width, height);
      const { x: mouseX, y: mouseY, active } = mouseRef.current;
      for (const particle of particles) {
        particle.baseX += Math.cos(particle.angle) * particle.speed * .2;
        particle.baseY += Math.sin(particle.angle) * particle.speed * .2;
        if (particle.baseX < -20) particle.baseX = width + 20;
        if (particle.baseX > width + 20) particle.baseX = -20;
        if (particle.baseY < -20) particle.baseY = height + 20;
        if (particle.baseY > height + 20) particle.baseY = -20;

        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.hypot(dx, dy);
        particle.vx += (particle.baseX + Math.sin(time * 2 + particle.angle) * 15 - particle.x) * RETURN_FORCE;
        particle.vy += (particle.baseY + Math.cos(time * 1.5 + particle.angle) * 15 - particle.y) * RETURN_FORCE;

        if (active && distance < ATTRACT_RADIUS) {
          const beatPhase = Math.sin(time * 12);
          const beatScale = 1 + Math.pow(beatPhase, 6) * .4;
          const targetX = mouseX + particle.heartX * beatScale;
          const targetY = mouseY + particle.heartY * beatScale;
          particle.baseX += (targetX - particle.baseX) * (.15 * particle.speed);
          particle.baseY += (targetY - particle.baseY) * (.15 * particle.speed);
          if (beatPhase > .95 && Math.random() < .05) {
            particle.vx += particle.heartX * .05;
            particle.vy += particle.heartY * .05;
          }
        }

        particle.vx *= FRICTION;
        particle.vy *= FRICTION;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotSpeed + (Math.abs(particle.vx) + Math.abs(particle.vy)) * .01;
        const pulse = Math.pow(Math.sin(time * 8 + particle.angle * 2), 4);
        const scale = 1 + pulse * .15;
        ctx.save();
        ctx.translate(particle.x, particle.y + Math.sin(time * 5 + particle.angle) * 8 * particle.depth - pulse * 5);
        ctx.rotate(particle.rotation);
        ctx.scale(scale, scale);
        ctx.globalAlpha = Math.min(.035 + particle.depth * .08 + (active && distance < ATTRACT_RADIUS ? (1 - distance / ATTRACT_RADIUS) * .62 : 0), .82);
        ctx.fillStyle = particle.color;
        if (particle.shape === 0) { ctx.beginPath(); ctx.arc(0, 0, particle.size, 0, Math.PI * 2); ctx.fill(); }
        else if (particle.shape === 1) { const size = particle.size * 1.8; ctx.beginPath(); ctx.roundRect(-size / 2, -particle.size / 2, size, particle.size, particle.size * .3); ctx.fill(); }
        else { ctx.strokeStyle = particle.color; ctx.lineWidth = Math.max(1.5, particle.size * .5); ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(-particle.size * 1.5, 0); ctx.lineTo(particle.size * 1.5, 0); ctx.stroke(); }
        ctx.restore();
      }
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMove); document.removeEventListener("mouseleave", onLeave); };
  }, []);

  return <canvas ref={canvasRef} className="heart-particles" aria-label="Cursor-reactive particle heart" />;
}
