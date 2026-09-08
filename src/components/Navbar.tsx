"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";
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
  const [navVisible, setNavVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const label = (vi: string, en: string) => language === "vi" ? vi : en;
  const hasPortfolioNavigation = pathname === "/" || pathname === "/services";
  const handleSectionLink = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href !== "/#about" || pathname !== "/") return;
    event.preventDefault();
    setMenuOpen(false);
    const about = document.getElementById("about");
    if (!about) return;
    window.history.replaceState(null, "", "#about");
    window.scrollTo({ top: about.getBoundingClientRect().top + window.scrollY + 50, behavior: "smooth" });
  };

  useEffect(() => {
    let previousScrollY = window.scrollY;
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 72) setNavVisible(true);
      else if (currentScrollY < previousScrollY - 4) setNavVisible(true);
      else if (currentScrollY > previousScrollY + 4) setNavVisible(false);
      setScrolled(currentScrollY >= 72);
      previousScrollY = currentScrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <header className={`fixed inset-x-0 top-0 z-50 w-full max-w-[100vw] overflow-x-clip px-5 py-3 transition-[transform,background-color,box-shadow] duration-300 ease-out sm:px-8 sm:py-2 ${navVisible ? "translate-y-0" : "-translate-y-full"} ${scrolled ? "bg-white/92 shadow-[0_8px_28px_rgba(15,23,42,.08)] backdrop-blur-xl" : "bg-transparent"}`}>
    <nav className="mx-auto flex w-full max-w-7xl items-center justify-between">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold tracking-[-0.02em] text-slate-950" aria-label="Lê Minh Quang home">
        <img src="/lmq-logo.svg" alt="LMQ logo" className="size-8 rounded-[.72rem] shadow-[0_7px_18px_rgba(15,23,42,.16)]" />
        <span>LMQ<span className="text-indigo-600">.</span></span>
      </Link>
      {hasPortfolioNavigation && <div className="hidden items-center gap-8 xl:flex">{links.map(([vi, en, href]) => <Link key={href} href={href} onClick={(event) => handleSectionLink(event, href)} className="text-sm text-slate-500 transition hover:text-slate-950">{label(vi, en)}</Link>)}</div>}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-[11px] font-bold" aria-label="Language selector">
          <button onClick={() => language !== "vi" && toggleLanguage()} className={`rounded-full px-2.5 py-1.5 transition ${language === "vi" ? "bg-slate-950 text-white shadow-[0_5px_12px_rgba(15,23,42,.16)]" : "text-slate-400 hover:text-slate-950"}`}>VI</button>
          <button onClick={() => language !== "en" && toggleLanguage()} className={`rounded-full px-2.5 py-1.5 transition ${language === "en" ? "bg-slate-950 text-white shadow-[0_5px_12px_rgba(15,23,42,.16)]" : "text-slate-400 hover:text-slate-950"}`}>EN</button>
        </div>
        <a href="mailto:lmquang.devops@gmail.com" className="hidden rounded-full bg-slate-950 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-600 sm:block">{label("Liên hệ", "Contact")}</a>
        {hasPortfolioNavigation && <button onClick={() => setMenuOpen((open) => !open)} className="grid size-9 place-items-center text-slate-800 transition hover:text-indigo-600 xl:hidden" aria-label="Toggle navigation">{menuOpen ? <X size={20} /> : <Menu size={21} />}</button>}
      </div>
    </nav>
    {hasPortfolioNavigation && menuOpen && <div className="mx-auto mt-3 w-full max-w-7xl rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-[0_18px_40px_rgba(15,23,42,.14)] backdrop-blur-xl xl:hidden">{links.map(([vi, en, href]) => <Link key={href} onClick={(event) => { handleSectionLink(event, href); if (!event.defaultPrevented) setMenuOpen(false); }} href={href} className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600">{label(vi, en)}</Link>)}</div>}
  </header>;
}
