"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Adds reversible scroll motion to page details without touching their entrance effects. */
export default function SectionScrub({ refreshKey }: { refreshKey?: string | number }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      document.querySelectorAll<HTMLElement>("[data-scrub-group]").forEach((group) => {
        const items = gsap.utils.toArray<HTMLElement>("[data-scrub-item]", group);
        if (!items.length) return;

        if (group.dataset.scrubGroup === "individual") {
          items.forEach((item) => gsap.fromTo(item,
            { y: 22, opacity: 0.68 },
            {
              y: 0, opacity: 1, ease: "none",
              scrollTrigger: { trigger: item, start: "top 90%", end: "top 54%", scrub: 0.8 },
            }
          ));
          return;
        }

        gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: group,
            start: "top 90%",
            end: "bottom 35%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        }).fromTo(items,
          { y: 22, opacity: 0.68 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.12 }
        );
      });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    return () => media.revert();
  }, [refreshKey]);

  return null;
}
