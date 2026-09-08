"use client";

import { BarChart3, Bot, Cloud, Code2, Database, Send, ShieldCheck, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type Language = "vi" | "en";
type Line = { tone: "cmd" | "info" | "ok" | "warn" | "dim" | "gap"; value?: string };

const themes = { cmd: "text-white", info: "text-sky-400", ok: "text-emerald-400", warn: "text-amber-300", dim: "text-slate-500", gap: "" };

export default function AboutTerminal({ language }: { language: Language }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [scrollScale, setScrollScale] = useState(0.7);
  const lines = useMemo<Line[]>(() => language === "vi" ? [
    { tone: "cmd", value: "npm run portfolio:deploy" }, { tone: "gap" },
    { tone: "ok", value: "✓ [Build] Next.js production build hoàn tất" },
    { tone: "info", value: "▶ [FPT IS] Đồng bộ CMS TypeScript cho 4 Mini App..." },
    { tone: "dim", value: "  → RBAC, luồng phân phối và UI doanh nghiệp: OK" },
    { tone: "warn", value: "▶ [StorePublish] Khởi tạo workflow phát hành ứng dụng..." },
    { tone: "ok", value: "  → Google Play / App Store delivery: sẵn sàng" },
    { tone: "info", value: "▶ [Cloud] Alibaba OSS · CDN · DNS · SSL đã cấu hình" },
    { tone: "ok", value: "  → Hạ tầng production: healthy" },
    { tone: "gap" }, { tone: "info", value: "⚡ [System] Build · Ship · Scale" },
  ] : [
    { tone: "cmd", value: "npm run portfolio:deploy" }, { tone: "gap" },
    { tone: "ok", value: "✓ [Build] Next.js production build completed" },
    { tone: "info", value: "▶ [FPT IS] Syncing TypeScript CMS for four Mini Apps..." },
    { tone: "dim", value: "  → RBAC, distribution workflows and enterprise UI: OK" },
    { tone: "warn", value: "▶ [StorePublish] Preparing app-publishing workflow..." },
    { tone: "ok", value: "  → Google Play / App Store delivery: ready" },
    { tone: "info", value: "▶ [Cloud] Alibaba OSS · CDN · DNS · SSL configured" },
    { tone: "ok", value: "  → Production infrastructure: healthy" },
    { tone: "gap" }, { tone: "info", value: "⚡ [System] Build · Ship · Scale" },
  ], [language]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const run = (index: number) => {
      timer = setTimeout(() => {
        if (index >= lines.length) { setVisibleLines(0); run(0); return; }
        setVisibleLines(index + 1);
        requestAnimationFrame(() => {
          if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
        });
        run(index + 1);
      }, index >= lines.length ? 1800 : index === 0 ? 250 : 460);
    };
    setVisibleLines(0);
    run(0);
    return () => clearTimeout(timer);
  }, [lines]);

  useEffect(() => {
    const updateScale = () => {
      if (!terminalRef.current) return;
      const rect = terminalRef.current.getBoundingClientRect();
      const height = window.innerHeight;
      const progress = 1 - (rect.top - height * 0.35) / (height * 0.6);
      const clamped = Math.min(Math.max(progress, 0), 1);
      setScrollScale(window.innerWidth < 768 ? 1 : 0.7 + clamped * 0.35);
    };
    window.addEventListener("scroll", updateScale, { passive: true });
    updateScale();
    return () => window.removeEventListener("scroll", updateScale);
  }, []);

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 640);
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const tools = [[Terminal, "CLI"], [Bot, "AI"], [Code2, "Code"], [Cloud, "Cloud"], [Database, "Data"], [Send, "Ship"], [BarChart3, "Metrics"], [ShieldCheck, "Secure"]] as const;
  const toolClass = "group flex h-[76px] w-[60px] flex-col items-center gap-2 text-[10px] font-medium text-slate-400 outline-none transition-colors hover:text-slate-700 sm:h-[84px] sm:w-[68px] sm:text-[11px]";
  const toolFace = (Icon: typeof Terminal, label: string, index: number, mobilePulse = false) => <>
    {mobilePulse
      ? <motion.span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm sm:h-14 sm:w-14" animate={{ scale: [1, 1.075, 1], rotate: [0, -1.2, 0], boxShadow: ["0 2px 3px rgba(15,23,42,.12)", "0 12px 22px rgba(99,102,241,.22)", "0 2px 3px rgba(15,23,42,.12)"] }} transition={{ duration: 1.9, delay: index * .14, repeat: Infinity, ease: "easeInOut" }}><Icon size={21} strokeWidth={1.9} /></motion.span>
      : <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 group-hover:border-slate-300 group-hover:shadow-md sm:h-14 sm:w-14"><Icon size={21} strokeWidth={1.9} /></span>}
    <span className="block h-[10px] leading-[10px]">{label}</span>
  </>;
  return <div ref={terminalRef} className="mx-auto w-full max-w-5xl will-change-transform" style={{ transform: `scale(${scrollScale})`, transformOrigin: "top center", transition: "transform 80ms linear" }}>
    <motion.div className="rounded-[28px] bg-[#0d1117] p-3 shadow-[0_40px_100px_-20px_rgba(15,23,42,.32)] sm:p-5" whileHover={{ y: -6, rotateX: 1.25, rotateY: -1.25 }} transition={{ type: "spring", stiffness: 220, damping: 18 }}>
      <div className="overflow-hidden rounded-[20px] border border-zinc-800 bg-[#0d1117]">
        <div className="flex min-h-12 items-center gap-2 border-b border-zinc-800/60 bg-[#161b22] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" /><span className="h-3 w-3 rounded-full bg-[#ffbd2e]" /><span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-auto font-mono text-[11px] font-semibold text-zinc-600">leminhquang — engineering</span>
        </div>
        <div ref={logRef} className="h-[245px] overflow-y-auto px-4 py-4 font-mono text-[11px] leading-[1.7] sm:h-[270px] sm:px-5 sm:text-[13px]" style={{ scrollbarWidth: "none" }}>
        {lines.slice(0, visibleLines).map((line, index) => <div key={`${line.value}-${index}`} className={line.tone === "gap" ? "h-3" : themes[line.tone]}>{line.tone === "cmd" && <span className="mr-2 text-emerald-400">❯</span>}{line.value}{index === visibleLines - 1 && line.tone !== "gap" && <span className="ml-1 animate-pulse text-sky-300">▊</span>}</div>)}
        {visibleLines === 0 && <span className="animate-pulse text-sky-300">▊</span>}
        </div>
      </div>
    </motion.div>
    <div className="mt-7" style={{ display: "grid", width: "100%", gridTemplateColumns: `repeat(${isMobile ? 4 : 8}, minmax(0, 1fr))`, gridAutoRows: isMobile ? "76px" : "84px", justifyItems: "center", alignItems: "start", columnGap: isMobile ? ".35rem" : "1.25rem", rowGap: "1.25rem" }}>
      {tools.map(([Icon, label], index) => isMobile
        ? <button key={`${label}-mobile`} type="button" className={toolClass}>{toolFace(Icon, label, index, true)}</button>
        : <motion.button key={`${label}-desktop`} type="button" animate={{ y: [0, -7, 0] }} transition={{ duration: 3, delay: index * .25, repeat: Infinity, ease: "easeInOut" }} className={toolClass}>{toolFace(Icon, label, index)}</motion.button>)}
    </div>
  </div>;
}
