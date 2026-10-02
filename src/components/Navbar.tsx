"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";
import { useLanguage } from "./LanguageProvider";

const links = [
  ["Giới thiệu", "About", "/#about"],
  ["Kinh nghiệm", "Experience", "/#experience"],
  ["Dự án", "Work", "/#projects"],
  ["Chứng chỉ", "Credentials", "/#certificates"],
  ["Blog", "Blog", "/blog"],
  ["Liên hệ", "Contact", "/#contact"],
];

export default function Navbar() {
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onDarkSection, setOnDarkSection] = useState(false);
  const label = (vi: string, en: string) => (language === "vi" ? vi : en);
  const hasPortfolioNavigation = pathname === "/" || pathname === "/services";

  const handleSectionLink = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("/#") || pathname !== "/") return;
    const targetId = href.replace("/#", "");
    const target = document.getElementById(targetId);
    if (!target) return;
    event.preventDefault();
    setMenuOpen(false);
    window.history.replaceState(null, "", `#${targetId}`);
    if (window.portfolioLenis) window.portfolioLenis.scrollTo(target, { offset: -76 });
    else target.scrollIntoView();
  };

  useEffect(() => {
    let frame = 0;
    let wasScrolled = false;
    let wasDark = false;
    const updateTheme = () => {
      frame = 0;
      const isScrolled = window.scrollY >= 40;
      const isDark = pathname === "/" && [".work .project-stage", ".statement", ".proof", ".contact"].some((selector) => {
        const section = document.querySelector<HTMLElement>(selector);
        if (!section) return false;
        const bounds = section.getBoundingClientRect();
        return bounds.top <= 42 && bounds.bottom > 42;
      });
      if (isScrolled !== wasScrolled) { wasScrolled = isScrolled; setScrolled(isScrolled); }
      if (isDark !== wasDark) { wasDark = isDark; setOnDarkSection(isDark); }
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(updateTheme); };
    window.addEventListener("scroll", onScroll, { passive: true });
    updateTheme();
    return () => { window.removeEventListener("scroll", onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, [pathname]);

  return (
    <header
      data-nav-theme={onDarkSection ? "dark" : "light"}
      className={`site-nav fixed inset-x-0 top-0 z-50 w-full px-5 py-4 transition-colors duration-300 ease-out sm:px-8 ${
        scrolled
          ? onDarkSection
            ? "border-b border-white/10 bg-[#171b24]/85 backdrop-blur-md"
            : "border-b border-black/10 bg-[#f7f4ed]/72 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link
          href="/"
          className={`group inline-flex items-center gap-2.5 text-sm font-semibold tracking-tight ${onDarkSection ? "text-white" : "text-[#171816]"}`}
          aria-label="Lê Minh Quang home"
        >
          <div className={`flex size-8 items-center justify-center rounded-full border transition group-hover:bg-[#171816] group-hover:text-white ${onDarkSection ? "border-white/35" : "border-black/20"}`}>
            <span className="font-mono text-xs font-bold">Q</span>
          </div>
          <span className={`tracking-tight ${onDarkSection ? "text-white" : "text-[#171816]"}`}>
            QUANG<span className="text-[#3348c5]">.</span>
          </span>
        </Link>

        {hasPortfolioNavigation && (
          <div className="hidden items-center gap-4 xl:gap-6 lg:flex">
            {links.map(([vi, en, href]) => (
              <Link
                key={href}
                href={href}
                onClick={(event) => handleSectionLink(event, href)}
                className={`text-[10px] font-semibold tracking-wider uppercase transition hover:text-[#171816] ${onDarkSection ? "text-white/70 hover:!text-white" : "text-[#666761]"}`}
              >
                {label(vi, en)}
              </Link>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          <div
            className={`flex items-center rounded-full border p-0.5 text-[10px] font-bold ${onDarkSection ? "border-white/25" : "border-black/15"}`}
            aria-label="Language selector"
          >
            <button
              onClick={() => language !== "vi" && toggleLanguage()}
              className={`rounded-full px-2.5 py-1 transition ${
                language === "vi"
                  ? "rounded-full bg-[#171816] text-white"
                  : onDarkSection ? "text-white/60 hover:text-white" : "text-[#777872] hover:text-[#171816]"
              }`}
            >
              VI
            </button>
            <button
              onClick={() => language !== "en" && toggleLanguage()}
              className={`rounded-full px-2.5 py-1 transition ${
                language === "en"
                  ? "rounded-full bg-[#171816] text-white"
                  : onDarkSection ? "text-white/60 hover:text-white" : "text-[#777872] hover:text-[#171816]"
              }`}
            >
              EN
            </button>
          </div>

          <a
            href="mailto:lmquang.devops@gmail.com"
            className={`hidden rounded-full px-4 py-2 text-[10px] font-semibold transition sm:block ${onDarkSection ? "bg-white text-[#171816] hover:bg-[#cbd5ff]" : "bg-[#171816] text-white hover:bg-[#3348c5]"}`}
          >
            {label("Liên hệ", "Contact")}
          </a>

          {hasPortfolioNavigation && (
            <button
              onClick={() => setMenuOpen((open) => !open)}
              className={`grid size-9 place-items-center transition hover:text-[#3348c5] lg:hidden ${onDarkSection ? "text-white" : "text-[#171816]"}`}
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </nav>

      {hasPortfolioNavigation && menuOpen && (
        <div className="mx-auto mt-3 w-full max-w-7xl rounded-2xl border border-black/10 bg-[#f1f0eb]/95 p-4 shadow-xl backdrop-blur-2xl lg:hidden">
          {links.map(([vi, en, href]) => (
            <Link
              key={href}
              onClick={(event) => {
                handleSectionLink(event, href);
                if (!event.defaultPrevented) setMenuOpen(false);
              }}
              href={href}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#555650] transition hover:bg-black/5 hover:text-[#171816]"
            >
              {label(vi, en)}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
