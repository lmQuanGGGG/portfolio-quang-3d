"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    portfolioLenis?: Lenis;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
      anchors: { offset: -76 },
    });

    const updateScrollTrigger = () => ScrollTrigger.update();
    const tick = (time: number) => lenis.raf(time * 1000);

    window.portfolioLenis = lenis;
    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", updateScrollTrigger);
      gsap.ticker.remove(tick);
      lenis.destroy();
      if (window.portfolioLenis === lenis) window.portfolioLenis = undefined;
    };
  }, []);

  return null;
}
