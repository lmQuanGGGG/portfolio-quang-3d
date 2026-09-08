"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";

const links = [
  ["Giới thiệu", "About", "/#about"],
  ["Kinh nghiệm", "Experience", "/#experience"],
  ["Dự án", "Work", "/#certificates"],
  ["Dịch vụ", "Services", "/services"],
  ["Liên hệ", "Contact", "/#services-contact"],
];

export default function Navbar() {
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const label = (vi: string, en: string) => language === "vi" ? vi : en;
  const hasPortfolioNavigation = pathname === "/" || pathname === "/services";

  return <header className="sticky inset-x-0 top-0 z-50 w-full max-w-[100vw] overflow-x-clip px-4 py-4 sm:px-8 sm:py-5">
    <nav className="mx-auto flex w-[min(92vw,34rem)] items-center justify-between rounded-2xl border border-white/35 bg-white/18 px-4 py-3 shadow-[0_12px_40px_rgba(15,23,42,.14)] backdrop-blur-2xl sm:px-5 md:w-full md:max-w-7xl">
      <Link href="/" className="text-sm font-semibold tracking-[-0.02em] text-slate-950">LMQ<span className="text-indigo-600">.</span></Link>
      {hasPortfolioNavigation && <div className="hidden items-center gap-5 md:flex">{links.map(([vi, en, href]) => <Link key={href} href={href} className="text-sm text-slate-600 transition hover:text-slate-950">{label(vi, en)}</Link>)}</div>}
      <div className="flex items-center gap-2"><button onClick={toggleLanguage} className="rounded-lg bg-white/55 px-2 py-2 text-[11px] font-bold text-slate-600 shadow-sm transition hover:bg-white hover:text-indigo-700">{language === "vi" ? "EN" : "VI"}</button><a href="mailto:leminhquang2k4@gmail.com" className="hidden rounded-xl bg-slate-950 px-3 py-2 text-xs font-medium text-white transition hover:bg-indigo-600 sm:block">{label("Liên hệ", "Contact")}</a>{hasPortfolioNavigation && <button onClick={() => setMenuOpen((open) => !open)} className="grid size-9 place-items-center rounded-xl bg-white/40 text-slate-800 transition hover:bg-white/70 md:hidden" aria-label="Toggle navigation">{menuOpen ? <X size={19} /> : <Menu size={20} />}</button>}</div>
    </nav>
    {hasPortfolioNavigation && menuOpen && <div className="mx-auto mt-2 w-[min(92vw,34rem)] rounded-2xl border border-white/35 bg-white/25 p-2 shadow-[0_16px_45px_rgba(15,23,42,.16)] backdrop-blur-2xl md:max-w-7xl">{links.map(([vi, en, href]) => <Link key={href} onClick={() => setMenuOpen(false)} href={href} className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-white/55 hover:text-slate-950">{label(vi, en)}</Link>)}<a href="mailto:leminhquang2k4@gmail.com" className="mt-1 block rounded-xl bg-slate-950 px-4 py-3 text-sm font-medium text-white">{label("Liên hệ", "Contact")}</a></div>}
  </header>;
}
