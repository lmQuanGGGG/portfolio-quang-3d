"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollChoreography({ language }: { language: "vi" | "en" }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    media.add(
      {
        desktop: "(min-width: 1000px)",
        tablet: "(min-width: 701px) and (max-width: 999px)",
        mobile: "(max-width: 700px)",
        motion: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        if (!context.conditions?.motion) return;
        const mobile = Boolean(context.conditions.mobile);

        const hero = document.querySelector<HTMLElement>("[data-scroll-hero]");
        if (hero) {
          const heroTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.35,
              invalidateOnRefresh: true,
            },
          });

          heroTimeline
            .to(".hero-title-line--one", { xPercent: mobile ? -3 : -7, yPercent: mobile ? -6 : -12, ease: "none" }, 0)
            .to(".hero-title-line--two", { xPercent: mobile ? 3 : 8, yPercent: mobile ? 5 : 9, ease: "none" }, 0)
            .to(".hero-content", { y: mobile ? -12 : -38, opacity: mobile ? 0.86 : 0.72, ease: "none" }, 0.16)
            .to(".hero-grid", { yPercent: 4, opacity: 0.18, ease: "none" }, 0.2)
            .to(".hero-bottom", { xPercent: mobile ? 0 : 5, y: mobile ? -9 : -20, opacity: 0.8, ease: "none" }, 0.3)
            .to(".hero-kicker", { x: mobile ? 4 : 16, opacity: 0.78, ease: "none" }, 0.12)
            .to(".hero-index", { y: -10, opacity: 0.62, ease: "none" }, 0.25);
        }

        const about = document.querySelector<HTMLElement>(".intro");
        if (about) {
          const heading = about.querySelector<HTMLElement>(".intro-copy h2");
          const lines = gsap.utils.toArray<HTMLElement>(".intro-heading-line", about);
          const headingWords = gsap.utils.toArray<HTMLElement>(".intro-heading-word", about);
          const paragraphs = gsap.utils.toArray<HTMLElement>(".intro-detail p", about);
          const categoryLine = about.querySelector<HTMLElement>(".capability-line");
          const categories = gsap.utils.toArray<HTMLElement>(".capability-line > span", about);

          const lineStarts = [
            { x: mobile ? -18 : -48, y: -27, z: -60, rotation: -3.2, skewX: 3, scale: 0.95, opacity: 0.55 },
            { x: mobile ? 17 : 42, y: 35, z: -95, rotation: 2.8, skewX: -2.4, scale: 0.92, opacity: 0.42 },
          ];
          const lineWaypoints = [
            { x: mobile ? 7 : 18, y: 11, z: 20, rotation: 1.3, skewX: -1.2, scale: 1.012, opacity: 0.86 },
            { x: mobile ? -8 : -16, y: -11, z: 24, rotation: -1.1, skewX: 1.1, scale: 1.02, opacity: 0.83 },
          ];
          gsap.set(lines, { transformPerspective: 900 });
          lines.forEach((line, index) => gsap.set(line, lineStarts[index]));
          headingWords.forEach((word, index) => gsap.set(word, {
            x: index % 2 ? 5 : -6,
            y: index % 3 ? 3 : -5,
            rotation: index % 2 ? 0.7 : -0.8,
          }));

          const paragraphWords = paragraphs.map((paragraph) => gsap.utils.toArray<HTMLElement>(".scroll-word", paragraph));
          paragraphWords.flat().forEach((word, index) => gsap.set(word, {
            opacity: 0.18,
            x: index % 2 ? 5 : -5,
            y: index % 3 ? 8 : 11,
            skewX: index % 2 ? 1.2 : -1.2,
          }));

          const categoryStarts = [
            { x: -42, y: 24, rotation: -4, skewX: 3 },
            { x: 13, y: 37, rotation: 3.3, skewX: -2 },
            { x: -9, y: -28, rotation: -2.7, skewX: 2 },
            { x: 39, y: 15, rotation: 3.7, skewX: -2.5 },
            { x: 26, y: -34, rotation: -3.5, skewX: 2.5 },
          ];
          categories.forEach((category, index) => gsap.set(category, {
            ...categoryStarts[index], opacity: 0.25, scale: 0.94, filter: "blur(1.5px)",
          }));
          if (categoryLine) gsap.set(categoryLine, { "--line-progress": 0 });

          const aboutTimeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: about,
              start: "top top",
              end: mobile ? "+=180%" : "+=210%",
              pin: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          lines.forEach((line, index) => {
            aboutTimeline
              .to(line, { ...lineWaypoints[index], duration: 0.23 }, 0.03 + index * 0.025)
              .to(line, { x: 0, y: 0, z: 0, rotation: 0, skewX: 0, scale: 1, opacity: 1, duration: 0.22 }, 0.27 + index * 0.025);
          });
          headingWords.forEach((word, index) => {
            aboutTimeline.to(word, { x: 0, y: 0, rotation: 0, duration: 0.22 }, 0.3 + index * 0.018);
          });

          paragraphWords.forEach((words, paragraphIndex) => {
            words.forEach((word, index) => {
              const start = 0.39 + paragraphIndex * 0.055 + index * (0.22 / Math.max(words.length - 1, 1));
              aboutTimeline.to(word, { x: 0, y: 0, skewX: 0, opacity: 1, duration: 0.095 }, start);
            });
          });

          if (categoryLine) aboutTimeline.to(categoryLine, { "--line-progress": 1, duration: 0.25 }, 0.56);
          categories.forEach((category, index) => {
            const start = 0.57 + index * 0.045;
            aboutTimeline
              .to(category, {
                x: index % 2 ? -7 : 8, y: index % 2 ? -5 : 6,
                rotation: index % 2 ? -1.2 : 1.4, skewX: index % 2 ? 0.8 : -0.8,
                scale: 1.015, opacity: 0.85, filter: "blur(0px)", duration: 0.13,
              }, start)
              .to(category, { x: 0, y: 0, rotation: 0, skewX: 0, scale: 1, opacity: 1, duration: 0.14 }, start + 0.13);
          });
          aboutTimeline.to(".intro-label", { y: -24, opacity: 0.76, duration: 0.55 }, 0.18);
          if (heading) aboutTimeline.to(heading, { y: -7, scale: 1.012, transformOrigin: "50% 50%", duration: 0.07 }, 0.93);
        }

        const workIntro = document.querySelector<HTMLElement>("[data-work-intro]");
        if (workIntro) {
          const eyebrow = workIntro.querySelector<HTMLElement>(".eyebrow");
          const firstWords = gsap.utils.toArray<HTMLElement>(".work-intro-line--first .work-intro-word", workIntro);
          const secondWords = gsap.utils.toArray<HTMLElement>(".work-intro-line--second .work-intro-word", workIntro);
          const descriptionWords = gsap.utils.toArray<HTMLElement>(".work-intro-description-word", workIntro);

          gsap.set(eyebrow, { x: mobile ? -20 : -42, opacity: 0 });
          gsap.set(firstWords, { x: mobile ? -18 : -44, y: mobile ? 30 : 68, rotationX: -68, skewX: -7, opacity: 0, filter: "blur(9px)", transformPerspective: 900 });
          gsap.set(secondWords, { x: mobile ? 24 : 58, y: mobile ? 28 : 62, rotationX: 62, skewX: 6, opacity: 0, filter: "blur(9px)", transformPerspective: 900 });
          gsap.set(descriptionWords, { x: -14, y: 18, opacity: 0, filter: "blur(4px)" });

          gsap.timeline({
            scrollTrigger: {
              trigger: workIntro,
              start: "top top",
              end: mobile ? "+=135%" : "+=155%",
              pin: true,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
            .to(eyebrow, { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" }, 0.08)
            .to(firstWords, { x: 0, y: 0, rotationX: 0, skewX: 0, opacity: 1, filter: "blur(0px)", duration: 0.65, stagger: 0.13, ease: "power3.out" }, 0.28)
            .to(secondWords, { x: 0, y: 0, rotationX: 0, skewX: 0, opacity: 1, filter: "blur(0px)", duration: 0.67, stagger: 0.11, ease: "power3.out" }, 1.02)
            .to(descriptionWords, { x: 0, y: 0, opacity: 1, filter: "blur(0px)", duration: 0.35, stagger: 0.035, ease: "power2.out" }, 1.6)
            .to({}, { duration: 0.9 }, 2.55);
        }

        const stage = document.querySelector<HTMLElement>("[data-project-stage]");
        const stack = document.querySelector<HTMLElement>("[data-project-stack]");
        if (stage && stack) {
          const cards = gsap.utils.toArray<HTMLElement>("[data-project-card]", stack);
          const metas = gsap.utils.toArray<HTMLElement>("[data-project-meta]", stage);
          const counter = stage.querySelector<HTMLElement>("[data-project-counter]");
          const total = cards.length;
          const intro = stage.querySelector<HTMLElement>(".project-type-intro");
          const firstLine = stage.querySelector<HTMLElement>(".project-type-line--first");
          const secondLine = stage.querySelector<HTMLElement>(".project-type-line--second");
          const chars = gsap.utils.toArray<HTMLElement>(".project-type-char", stage);
          const backNames = gsap.utils.toArray<HTMLElement>(".project-name-back", stage);
          const projectStart = 2.8;
          const mobileStack = mobile;
          const pose = (active: number, index: number) => {
            // Keep the deck linear. Wrapping the index made project 01 reappear
            // after project 10 when the pinned timeline ended.
            const delta = index - active;
            const distance = Math.abs(delta);
            const side = delta < 0 ? -1 : 1;
            return {
              xPercent: delta * (mobileStack ? 28 : 35),
              y: distance === 0 ? -12 : Math.min(distance * distance * (mobileStack ? 8 : 10), 215),
              z: distance === 0 ? 190 : -70 - distance * 72,
              scale: distance === 0 ? 1 : Math.max(0.94 - distance * 0.075, 0.54),
              rotationY: distance === 0 ? 0 : -side * Math.min(8 + distance * 4, 27),
              rotationX: distance === 0 ? 0 : Math.min(distance * 2, 9),
              rotationZ: distance === 0 ? 0 : side * Math.min(distance * 6, 28),
              opacity: distance === 0 ? 1 : Math.max(0.92 - distance * 0.16, 0),
              filter: `blur(${Math.max(distance - 2, 0) * 0.35}px)`,
              zIndex: total - distance,
            };
          };

          cards.forEach((card, index) => {
            gsap.set(card, pose(0, index));
            const poster = card.querySelector<HTMLElement>(".project-poster");
            if (poster) gsap.set(poster, { transformOrigin: "50% 50%", scale: index === 0 ? 1 : 0.98 });
          });
          metas.forEach((meta) => gsap.set(meta, { autoAlpha: 0, y: 24 }));
          gsap.set(stack, { opacity: 0, scale: mobile ? 0.88 : 0.77, y: mobile ? 42 : 85, transformOrigin: "50% 50%" });
          gsap.set(".project-fan-heading", { autoAlpha: 0, y: -20 });
          chars.forEach((char, index) => {
            const alternating = index % 2 === 0 ? 1 : -1;
            gsap.set(char, {
              x: alternating * (mobile ? 12 : 22),
              y: alternating * (mobile ? 34 : 60),
              z: index % 3 === 0 ? (mobile ? -90 : -150) : (mobile ? 50 : 80),
              rotationX: alternating * (mobile ? 30 : 38),
              rotationY: alternating * (mobile ? 7 : 10),
              opacity: 0.68,
              filter: "blur(1px)",
            });
          });
          gsap.set(backNames, { xPercent: -18, z: -280, scale: 0.7, opacity: 0, filter: "blur(8px)" });

          const sequence = gsap.timeline({
            defaults: { ease: "none" },
            onUpdate: () => {
              if (!counter) return;
              const active = Math.min(total - 1, Math.max(0, Math.round(sequence.time() - projectStart)));
              counter.textContent = String(active + 1).padStart(2, "0") + " / " + String(total).padStart(2, "0");
            },
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: () => "+=" + Math.max((total + 2) * (mobileStack ? 62 : 54), 330) + "%",
              pin: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          sequence
            .to(chars, { x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, stagger: { each: 0.045, from: "center" } }, 0)
            .to(firstLine, { xPercent: -105, z: mobile ? 90 : 175, scale: 1.25, letterSpacing: "0.04em", opacity: 0, duration: 1.05 }, 1.22)
            .to(secondLine, { xPercent: 100, z: mobile ? 210 : 480, scale: mobile ? 3.2 : 5.2, letterSpacing: "0.08em", opacity: 0, duration: 1.18 }, 1.22)
            .to(intro, { opacity: 0, duration: 0.24 }, 2.26)
            .to(stack, { opacity: 1, scale: 1, y: 0, duration: 0.92 }, 1.65)
            .to(metas[0], { autoAlpha: 1, y: 0, duration: 0.65 }, 1.95)
            .to(".project-fan-heading", { autoAlpha: 1, y: 0, duration: 0.7 }, 1.9)
            .to(backNames[0], { xPercent: -50, z: -90, scale: 1, opacity: 0.1, filter: "blur(0px)", duration: 0.8 }, 1.9);

          for (let active = 1; active < total; active += 1) {
            const phase = projectStart + active - 1;
            cards.forEach((card, index) => {
              sequence.to(card, { ...pose(active, index), duration: 1 }, phase);
              const poster = card.querySelector<HTMLElement>(".project-poster");
              if (poster) sequence.to(poster, { scale: index === active ? 1 : 0.98, duration: 1 }, phase);
            });
            sequence
              .to(metas[active - 1], { autoAlpha: 0, y: -22, duration: 0.4 }, phase)
              .fromTo(metas[active], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.55 }, phase + 0.35);
            sequence
              .to(backNames[active - 1], { xPercent: -86, z: 260, scale: 1.45, opacity: 0, filter: "blur(5px)", duration: 0.85 }, phase)
              .fromTo(backNames[active], { xPercent: -18, z: -280, scale: 0.7, opacity: 0, filter: "blur(8px)" }, { xPercent: -50, z: -90, scale: 1, opacity: 0.1, filter: "blur(0px)", duration: 0.92 }, phase + 0.07);
          }
        }

        const statement = document.querySelector<HTMLElement>("[data-kinetic-stage]");
        if (statement) {
          const build = statement.querySelector<HTMLElement>(".kinetic-word--build");
          const design = statement.querySelector<HTMLElement>(".kinetic-word--design");
          const code = statement.querySelector<HTMLElement>(".kinetic-word--code");
          const ship = statement.querySelector<HTMLElement>(".kinetic-word--ship");
          const shipChars = gsap.utils.toArray<HTMLElement>(".kinetic-char", statement);
          gsap.set([build, design, code, ship], { xPercent: -50, yPercent: -50, transformOrigin: "50% 50%" });
          gsap.set(build, { z: -520, scale: 0.45, rotationX: 72, opacity: 0 });
          gsap.set(design, { y: mobile ? 100 : 170, z: -360, scale: 0.62, rotationX: 78, opacity: 0 });
          gsap.set(code, { x: mobile ? 70 : 180, z: -400, scale: 0.6, rotationY: -54, opacity: 0 });
          gsap.set(ship, { z: -340, scale: 0.55, opacity: 0 });
          shipChars.forEach((char, index) => gsap.set(char, {
            x: (index - 1.5) * (mobile ? 24 : 75),
            y: index % 2 === 0 ? -90 : 90,
            z: index % 2 === 0 ? -300 : 160,
            rotationX: index % 2 === 0 ? 60 : -60,
            opacity: 0,
          }));

          const kinetic = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: statement,
              start: "top top",
              end: mobile ? "+=475%" : "+=430%",
              pin: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          kinetic
            .to(build, { z: 0, scale: 1, rotationX: 0, opacity: 1, duration: 0.85 }, 0)
            .to(build, { xPercent: -145, z: 200, scale: 1.45, rotationY: -18, opacity: 0, duration: 0.86 }, 0.88)
            .to(design, { y: 0, z: 0, scale: 1, rotationX: 0, opacity: 1, duration: 0.82 }, 0.86)
            .to(design, { z: -420, scale: 1.65, rotationX: -58, opacity: 0, duration: 0.82 }, 1.76)
            .to(code, { x: 0, z: 0, scale: 1, rotationY: 0, opacity: 1, duration: 0.82 }, 1.75)
            .to(code, { xPercent: 45, z: 220, scale: 1.55, rotationY: 25, opacity: 0, duration: 0.83 }, 2.62)
            .to(ship, { z: 0, scale: 1, opacity: 1, duration: 0.8 }, 2.78)
            .to(shipChars, { x: 0, y: 0, z: 0, rotationX: 0, opacity: 1, duration: 0.8, stagger: 0.08 }, 2.85)
            .to(ship, { z: 650, scale: mobile ? 5 : 7, opacity: 0.13, duration: 1 }, 3.83)
            .fromTo(".type-track--first", { xPercent: 6 }, { xPercent: -53, duration: 4.83 }, 0)
            .fromTo(".type-track--second", { xPercent: -47 }, { xPercent: 12, duration: 4.83 }, 0)
            .to(".statement-orbit", { scale: 1.45, rotation: 85, opacity: 0.28, duration: 4.83 }, 0)
            .to(".statement-top", { y: 0, opacity: 0.72, duration: 4.83 }, 0)
            .to(".statement-bottom", { y: 22, opacity: 0.72, duration: 4.83 }, 0);
        }

        const experience = document.querySelector<HTMLElement>(".experience");
        if (experience) {
          const titleChars = gsap.utils.toArray<HTMLElement>(".experience-title-char", experience);
          const rows = gsap.utils.toArray<HTMLElement>(".experience-entry", experience);
          const archiveCards = gsap.utils.toArray<HTMLElement>("[data-experience-archive-card]", experience);
          const finale = experience.querySelector<HTMLElement>(".experience-finale");
          const letterWave = {
            x: (index: number) => Math.sin(index * 1.1) * (mobile ? 6 : 11),
            y: (index: number) => (index % 2 ? -1 : 1) * (mobile ? 20 : 36),
            rotationX: (index: number) => index % 2 ? -55 : 55,
            opacity: 0.08,
            filter: "blur(2px)",
          };

          if (!mobile) {
            gsap.set(titleChars, { x: 0, y: 0, rotationX: 0, opacity: 1, filter: "blur(0px)" });
            gsap.set(rows, { autoAlpha: 0, xPercent: 25, scale: 0.95, rotationY: 8 });
            gsap.set(rows[0], { autoAlpha: 1, xPercent: 0, scale: 1, rotationY: 0 });
            gsap.set(archiveCards, { autoAlpha: 0, x: 0, y: 0, scale: 1, rotation: 0, transformOrigin: "50% 50%" });
            gsap.set(finale, { autoAlpha: 0 });
            archiveCards.forEach((card, index) => gsap.set(card, { zIndex: index + 1 }));
            const experienceTimeline = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: experience,
                start: "top top",
                end: () => `+=${Math.max(rows.length * 130, 420)}%`,
                pin: true,
                scrub: 0.6,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });
            experienceTimeline
              .to(titleChars, {
                x: (index: number) => Math.sin(index * 1.1) * 18,
                y: (index: number) => (index % 2 ? -1 : 1) * 26,
                rotationX: (index: number) => index % 2 ? -35 : 35,
                opacity: 0, filter: "blur(2px)", duration: 0.45, stagger: 0.008,
              }, 1.5)
              .to(".experience-first-intro", { y: -28, opacity: 0, duration: 0.4 }, 1.86);

            rows.forEach((row, index) => {
              const phase = index * 2.5;
              const companyChars = gsap.utils.toArray<HTMLElement>(".experience-company-char", row);
              const sourceVisual = row.querySelector<HTMLElement>(".experience-visual");
              const visualFrame = row.querySelector<HTMLElement>(".experience-visual-frame");
              const visualLayers = gsap.utils.toArray<HTMLElement>(".experience-art-layer", row);
              if (index > 0) experienceTimeline.fromTo(row, { autoAlpha: 0, xPercent: 25, scale: 0.95, rotationY: 8 },
                { autoAlpha: 1, xPercent: 0, scale: 1, rotationY: 0, duration: 0.68 }, phase);
              experienceTimeline
                .fromTo(row, { "--row-progress": 0 }, { "--row-progress": 1, duration: 1.8 }, phase);
              if (index > 0) experienceTimeline
                .fromTo(visualFrame, { y: 48, rotationY: -14, rotationX: 8, scale: 0.87, opacity: 0.45 },
                  { y: 0, rotationY: 0, rotationX: 0, scale: 1, opacity: 1, duration: 0.8 }, phase + 0.12)
                .fromTo(visualLayers, { x: (layerIndex: number) => (layerIndex % 2 ? 25 : -25), y: 16, opacity: 0.4 },
                  { x: 0, y: 0, opacity: 1, duration: 0.85, stagger: 0.09 }, phase + 0.3)
                .fromTo(row.querySelector(".experience-date"), { y: 18, opacity: 0.35 }, { y: 0, opacity: 1, duration: 0.45 }, phase + 0.12)
                .fromTo(companyChars, letterWave, {
                  x: 0, y: 0, rotationX: 0, opacity: 1, filter: "blur(0px)",
                  duration: 0.45, stagger: 0.018,
                }, phase + 0.17)
                .fromTo(row.querySelectorAll(".experience-role, .experience-project, .experience-points li"),
                  { y: 13, opacity: 0.3 }, { y: 0, opacity: 1, duration: 0.43, stagger: 0.06 }, phase + 0.54)
                .fromTo(row.querySelector(".experience-arrow"), { y: -12, rotation: -30, opacity: 0.3 },
                  { y: 0, rotation: 0, opacity: 1, duration: 0.4 }, phase + 0.6);
              experienceTimeline
                .fromTo(archiveCards[index], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12 }, phase + 2.03)
                .to(sourceVisual, { opacity: 0, duration: 0.12 }, phase + 2.03)
                .to(archiveCards[index], {
                  x: (index - 1.5) * 75 - 30,
                  y: () => Math.min(window.innerHeight * 0.28, 240),
                  scale: 0.48,
                  rotation: -12 + index * 8,
                  duration: 0.76,
                }, phase + 2.1)
                .to(row, { autoAlpha: 0, xPercent: -20, scale: 1.04, rotationY: -5, duration: 0.6 }, phase + 2.22);
            });
            experienceTimeline
              .fromTo(finale, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 9.9)
              .fromTo(".experience-finale-line", { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, 10.05)
              .fromTo(".experience-finale p", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, 10.07)
              .fromTo(".experience-finale-company", { y: 34, rotationX: -32, opacity: 0, filter: "blur(5px)" }, { y: 0, rotationX: 0, opacity: 1, filter: "blur(0px)", stagger: 0.11, duration: 0.65 }, 10.23)
              .to(finale, { opacity: 1, duration: 0.9 }, 11);
          } else {
            gsap.set(rows, { autoAlpha: 0, xPercent: 18, scale: 0.95 });
            gsap.set(rows[0], { autoAlpha: 1, xPercent: 0, scale: 1 });
            gsap.set(archiveCards, { autoAlpha: 0, x: 0, y: 0, scale: 1, rotation: 0, transformOrigin: "50% 50%" });
            archiveCards.forEach((card, index) => gsap.set(card, { zIndex: index + 1 }));
            const mobileExperience = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: experience,
                start: "top top",
                end: () => `+=${rows.length * 112}%`,
                pin: true,
                scrub: 0.55,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });
            mobileExperience
              .to(titleChars, { y: -16, opacity: 0, filter: "blur(2px)", duration: 0.45, stagger: 0.008 }, 1.25)
              .to(".experience-first-intro", { y: -25, opacity: 0, duration: 0.4 }, 1.6);
            rows.forEach((row, index) => {
              const phase = index * 2.35;
              const sourceVisual = row.querySelector<HTMLElement>(".experience-visual");
              const archiveScale = 0.27 + index * 0.05;
              if (index > 0) mobileExperience
                .fromTo(row, { autoAlpha: 0, xPercent: 18, scale: 0.95 }, { autoAlpha: 1, xPercent: 0, scale: 1, duration: 0.58 }, phase)
                .fromTo(row.querySelector(".experience-visual-frame"), { y: 28, scale: 0.88, opacity: 0.55 }, { y: 0, scale: 1, opacity: 1, duration: 0.68 }, phase + 0.08)
                .fromTo(gsap.utils.toArray<HTMLElement>(".experience-company-char", row), letterWave,
                  { x: 0, y: 0, rotationX: 0, opacity: 1, filter: "blur(0px)", duration: 0.42, stagger: 0.012 }, phase + 0.14)
                .fromTo(row.querySelectorAll(".experience-role, .experience-project, .experience-points li"),
                  { y: 12, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.035 }, phase + 0.28);
              mobileExperience.fromTo(row, { "--row-progress": 0 }, { "--row-progress": 1, duration: 1.65 }, phase);
              mobileExperience
                .fromTo(archiveCards[index], { autoAlpha: 0, scale: 0.88 }, { autoAlpha: 1, scale: 0.88, duration: 0.1 }, phase + 1.78)
                .to(sourceVisual, { opacity: 0, duration: 0.13 }, phase + 1.78)
                .to(archiveCards[index], {
                  x: (index - (rows.length - 1) / 2) * 72,
                  y: () => experience.clientHeight - archiveCards[index].offsetTop - archiveCards[index].offsetHeight * (1 + archiveScale) / 2 - 28,
                  scale: archiveScale,
                  rotation: -7 + index * 4.5,
                  duration: 0.62,
                }, phase + 1.84);
              if (index < rows.length - 1) mobileExperience
                .to(row, { autoAlpha: 0, xPercent: -17, scale: 1.03, duration: 0.48 }, phase + 2.02);
            });
            mobileExperience.to(rows[rows.length - 1], { opacity: 1, duration: 0.8 }, rows.length * 2.35 - 0.55)
              .to(archiveCards, { opacity: 1, duration: 0.45 }, rows.length * 2.35 + 0.15)
              .set(archiveCards, { opacity: 1 }, rows.length * 2.35 + 1.25);
          }
        }

        const toolkit = document.querySelector<HTMLElement>("[data-toolkit-stage]");
        if (toolkit) {
          const toolkitGroups = gsap.utils.toArray<HTMLElement>("[data-toolkit-group]", toolkit);
          const toolkitWords = gsap.utils.toArray<HTMLElement>(".toolkit-group p", toolkit);
          const toolkitVisuals = gsap.utils.toArray<HTMLElement>(".skill-visual", toolkit);
          const tech = toolkit.querySelector<HTMLElement>(".toolkit-title h2");
          const stackWord = toolkit.querySelector<HTMLElement>(".toolkit-title h2 span");
          gsap.set(tech, { transformPerspective: 1100, transformOrigin: "0 50%" });
          gsap.set(stackWord, { x: mobile ? 12 : 30, y: 10, letterSpacing: "0.02em", opacity: 0.55 });
          gsap.set(toolkitGroups, { opacity: 0.22 });
          gsap.set(toolkitWords, { opacity: 0.38 });
          gsap.set(toolkitVisuals, { opacity: 0.12, y: 18, scale: 0.94 });

          const toolkitTimeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: toolkit,
              start: "top top",
              end: mobile ? "+=145%" : "+=165%",
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          toolkitTimeline
            .to(tech, { x: mobile ? -4 : -12, y: -4, rotationY: 0, letterSpacing: "-0.12em", duration: 0.65 }, 0)
            .to(stackWord, { x: 0, y: 0, letterSpacing: "-0.1em", opacity: 1, color: "#3348c5", duration: 0.8 }, 0.12)
            .to(toolkitGroups[0], { opacity: 1, x: 0, y: 0, duration: 0.55 }, 0.5)
            .to(toolkitWords[0], { opacity: 1, y: 0, duration: 0.5 }, 0.55)
            .to(toolkitVisuals[0], { opacity: 0.7, y: 0, scale: 1, duration: 0.6 }, 0.58)
            .fromTo(toolkitGroups[1], { x: mobile ? 24 : 55, opacity: 0.15 }, { x: 0, opacity: 1, duration: 0.65 }, 0.88)
            .to(toolkitWords[1], { opacity: 1, x: 0, duration: 0.5 }, 0.98)
            .to(toolkitVisuals[1], { opacity: 0.7, y: 0, scale: 1, duration: 0.6 }, 1.02)
            .fromTo(toolkitGroups[2], { y: 38, opacity: 0.15 }, { y: 0, opacity: 1, duration: 0.65 }, 1.28)
            .to(toolkitWords[2], { opacity: 1, y: 0, duration: 0.5 }, 1.38)
            .to(toolkitVisuals[2], { opacity: 0.7, y: 0, scale: 1, duration: 0.6 }, 1.42)
            .fromTo(toolkitGroups[3], { x: mobile ? -24 : -50, opacity: 0.15 }, { x: 0, opacity: 1, duration: 0.7 }, 1.66)
            .to(toolkitWords[3], { opacity: 1, y: 0, duration: 0.5 }, 1.76)
            .to(toolkitVisuals[3], { opacity: 0.7, y: 0, scale: 1, duration: 0.6 }, 1.8)
            .to(tech, { y: -14, z: -20, opacity: 0.76, duration: 0.5 }, 2.85)
            .to(toolkitGroups, { y: -18, opacity: 0.7, duration: 0.5 }, 2.9)
            .fromTo(".toolkit-title .eyebrow", { x: -20, opacity: 0.5 }, { x: 0, opacity: 1, duration: 0.8 }, 0)
            .fromTo(".toolkit-title p", { y: 24, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.8 }, 0.22);
        }

        const proof = document.querySelector<HTMLElement>(".proof");
        if (proof) {
          const proofItems = gsap.utils.toArray<HTMLElement>(".proof-item", proof);
          const proofBars = gsap.utils.toArray<HTMLElement>(".proof-chart-bar", proof);
          const proofChart = proof.querySelector<HTMLElement>(".proof-chart");
          const proofCursor = proof.querySelector<HTMLElement>(".proof-chart-cursor");
          const proofTimeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: proof,
              start: "top top",
              end: mobile ? "+=115%" : "+=145%",
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          proofTimeline.fromTo(".proof > .eyebrow", { x: -28, opacity: 0.3 }, { x: 0, opacity: 1, duration: 0.4 }, 0);
          proofItems.forEach((item, index) => {
            const number = item.querySelector<HTMLElement>("strong");
            const description = item.querySelector<HTMLElement>("p");
            if (!number) return;
            const target = Number.parseInt(number.dataset.proofValue ?? "0", 10);
            const counter = { value: 0 };
            const at = 0.32 + index * 0.48;
            proofTimeline
              .fromTo(item, { y: 54, opacity: 0.18, rotationX: -13 }, { y: 0, opacity: 1, rotationX: 0, duration: 0.5 }, at)
              .fromTo(number, { y: 74, scale: 0.3, rotationX: -65, opacity: 0, filter: "blur(7px)" }, {
                y: -26, scale: 1.3, rotationX: 0, opacity: 1, filter: "blur(0px)", ease: "back.out(2.2)", duration: 0.45,
              }, at + 0.08)
              .to(number, { y: 0, scale: 1, ease: "elastic.out(1,0.42)", duration: 0.6 }, at + 0.53)
              .to(counter, {
                value: target,
                ease: "power2.out",
                duration: 0.58,
                onUpdate: () => { number.textContent = `${Math.round(counter.value)}+`; },
              }, at + 0.1);
            if (proofBars[index]) proofTimeline.to(proofBars[index], { scaleY: 1, duration: 0.72, ease: "back.out(1.7)" }, at + 0.12);
            if (proofCursor && proofChart) proofTimeline.to(proofCursor, { x: () => proofChart.clientWidth * (index + 0.5) / 4, opacity: 0.8, duration: 0.56, ease: "power2.inOut" }, at + 0.1);
            if (description) proofTimeline.fromTo(description, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 }, at + 0.44);
          });
          if (proofCursor) proofTimeline.to(proofCursor, { opacity: 0, duration: 0.4 }, 3.15);
        }

        const credentials = document.querySelector<HTMLElement>("[data-credentials-stage]");
        if (credentials) {
          const world = credentials.querySelector<HTMLElement>("[data-credentials-world]");
          const viewport = credentials.querySelector<HTMLElement>(".credentials-viewport");
          const documents = gsap.utils.toArray<HTMLElement>("[data-credential-doc]", credentials);
          const records = gsap.utils.toArray<HTMLElement>("[data-credential-record]", credentials);
          const markers = documents.map((document) => document.querySelector<HTMLElement>(".credential-inspection")).filter((marker): marker is HTMLElement => marker !== null);
          const catalog = credentials.querySelector<HTMLElement>(".credential-catalog");
          const education = credentials.querySelector<HTMLElement>(".credentials-education");
          const overviewLabel = credentials.querySelector<HTMLElement>(".credentials-overview-label");
          const headingAccent = credentials.querySelector<HTMLElement>(".credentials-intro h2 span");

          if (world && viewport && documents.length === 5 && records.length === 5) {
            const focusScale = mobile ? [1.08, 1.13, 1.18, 1.1, 1.14] : [1.48, 1.58, 1.66, 1.52, 1.6];
            const focusRotation = [-1.1, 0.9, -0.7, 1, -0.9];
            const focusPose = (index: number) => {
              const document = documents[index];
              const scale = focusScale[index];
              return {
                x: -(document.offsetLeft + document.offsetWidth / 2 - world.offsetWidth / 2) * scale,
                y: -(document.offsetTop + document.offsetHeight / 2 - world.offsetHeight / 2) * scale,
                scale,
                rotation: focusRotation[index],
                rotationX: index % 2 ? 0.7 : -0.7,
              };
            };
            const overviewScale = () => Math.min(
              (viewport.clientWidth / world.offsetWidth) * (mobile ? 0.94 : 0.9),
              (viewport.clientHeight / world.offsetHeight) * (mobile ? 0.9 : 0.84),
            );

            gsap.set(world, { ...focusPose(0), transformOrigin: "50% 50%" });
            gsap.set(documents, { opacity: (index: number) => index === 0 ? 1 : 0.44 });
            gsap.set(markers, { opacity: (index: number) => index === 0 ? 1 : 0 });
            gsap.set(records, { visibility: (index: number) => index === 0 ? "visible" : "hidden", clipPath: (index: number) => index === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" });
            gsap.set(overviewLabel, { opacity: 0 });

            const archive = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: credentials,
                start: "top top",
                end: mobile ? "+=500%" : "+=620%",
                pin: true,
                scrub: 0.65,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            documents.slice(1).forEach((_, offset) => {
              const index = offset + 1;
              const at = index * 1.08;
              archive.to(world, {
                x: () => focusPose(index).x,
                y: () => focusPose(index).y,
                scale: focusScale[index],
                rotation: focusRotation[index],
                rotationX: index % 2 ? 0.7 : -0.7,
                duration: 1.08,
              }, at);
              archive.to(documents, { opacity: (item: number) => item === index ? 1 : 0.44, duration: 0.46 }, at + 0.34);
              archive.to(markers, { opacity: (item: number) => item === index ? 1 : 0, duration: 0.35 }, at + 0.34);
              archive.to(records[index - 1], { clipPath: "inset(0% 0% 100% 0%)", y: -8, duration: 0.28 }, at + 0.27);
              archive.set(records[index - 1], { visibility: "hidden" }, at + 0.55);
              archive.set(records[index], { visibility: "visible", clipPath: "inset(100% 0% 0% 0%)", y: 8 }, at + 0.3);
              archive.to(records[index], { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 0.34 }, at + 0.36);
            });

            const overviewAt = 5.65;
            archive.to(world, { x: 0, y: 0, scale: overviewScale, rotation: 0, rotationX: 0, duration: 0.98 }, overviewAt);
            archive.to(documents, { opacity: 1, duration: 0.65 }, overviewAt + 0.12);
            archive.to(markers, { opacity: 0, duration: 0.26 }, overviewAt);
            archive.to(records[4], { clipPath: "inset(0% 0% 100% 0%)", y: -8, duration: 0.3 }, overviewAt + 0.18);
            archive.set(records[4], { visibility: "hidden" }, overviewAt + 0.48);
            archive.to(overviewLabel, { opacity: 1, duration: 0.36 }, overviewAt + 0.58);
            if (education) archive.to(education, { opacity: 1, duration: 0.5 }, overviewAt + 0.55);
            if (catalog) archive.to(catalog, { visibility: "hidden", duration: 0 }, overviewAt + 0.52);
            if (headingAccent) archive.to(headingAccent, { x: mobile ? 5 : 14, duration: 5.9 }, 0.2);
            archive.to(world, { x: mobile ? -12 : -35, scale: () => overviewScale() * 0.94, duration: 0.55 }, 7.4);
          }
        }

        const services = document.querySelector<HTMLElement>("[data-service-stage]");
        if (services) {
          const lanes = gsap.utils.toArray<HTMLElement>("[data-service-lane]", services);
          const firstHeading = services.querySelector<HTMLElement>(".service-heading-first");
          const secondHeading = services.querySelector<HTMLElement>(".service-heading-second");
          const firstHeadingChars = gsap.utils.toArray<HTMLElement>(".service-heading-first .service-heading-char", services);
          const secondHeadingChars = gsap.utils.toArray<HTMLElement>(".service-heading-second .service-heading-char", services);
          const eyebrow = services.querySelector<HTMLElement>(".section-heading .eyebrow");
          const introduction = services.querySelector<HTMLElement>("[data-service-intro]");
          const spine = services.querySelector<HTMLElement>("[data-service-spine]");
          const spineNodes = gsap.utils.toArray<HTMLElement>(".service-spine i", services);
          const handoffSvg = services.querySelector<SVGSVGElement>("[data-service-handoff]");
          const handoffPaths = gsap.utils.toArray<SVGPathElement>("[data-service-handoff-path]", services);

          if (lanes.length === 3 && spine) {
            const drawHandoff = () => {
              if (!handoffSvg || handoffPaths.length !== 4) return;
              const bounds = services.getBoundingClientRect();
              const width = services.clientWidth;
              const height = services.clientHeight;
              const destinationX = width * 0.83;
              const destinationY = height * 0.91;
              handoffSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);
              lanes.forEach((lane, index) => {
                const route = lane.querySelector<HTMLElement>(".service-route");
                if (!route) return;
                const routeBounds = route.getBoundingClientRect();
                const x = routeBounds.right - bounds.left;
                const y = routeBounds.top - bounds.top + routeBounds.height / 2;
                handoffPaths[index].setAttribute("d", `M ${x} ${y} C ${x - 18} ${y + (destinationY - y) * 0.52}, ${destinationX + 32} ${destinationY - 26}, ${destinationX} ${destinationY}`);
              });
              handoffPaths[3].setAttribute("d", `M ${destinationX} ${destinationY} V ${height}`);
              handoffPaths.forEach((path) => {
                const length = path.getTotalLength();
                path.style.strokeDasharray = `${length}`;
                path.style.strokeDashoffset = `${length}`;
              });
            };
            drawHandoff();
            const allTitles = lanes.map((lane) => lane.querySelector<HTMLElement>("h3")).filter((title): title is HTMLElement => title !== null);
            const allFrames = lanes.map((lane) => lane.querySelector<HTMLElement>(".service-artifact-frame")).filter((frame): frame is HTMLElement => frame !== null);
            const allBlocks = gsap.utils.toArray<SVGRectElement>(".service-artifact-block", services);
            const allPaths = gsap.utils.toArray<SVGPathElement>(".service-artifact-line", services);
            gsap.set(eyebrow, { autoAlpha: 0, y: -18, letterSpacing: ".35em" });
            gsap.set(firstHeading, { autoAlpha: 0 });
            gsap.set(secondHeading, { autoAlpha: 0 });
            gsap.set(firstHeadingChars, { autoAlpha: 0, x: (index: number) => -50 - index * 7, y: (index: number) => Math.sin(index * 0.8) * 42, rotationY: -65, rotationZ: -12, scale: 0.62, filter: "blur(9px)" });
            gsap.set(secondHeadingChars, { autoAlpha: 0, x: (index: number) => 55 + index * 6, y: (index: number) => Math.cos(index * 0.8) * 46, rotationY: 65, rotationZ: 11, scale: 0.62, filter: "blur(9px)" });
            gsap.set(introduction, { autoAlpha: 0, y: 22, clipPath: "inset(100% 0 0 0)" });
            lanes.forEach((lane) => {
              gsap.set(lane.querySelector(".service-lane-index"), { autoAlpha: 0, y: 14 });
              gsap.set(lane.querySelector("h3"), { autoAlpha: 0, x: -48, y: 16, skewX: -9, clipPath: "inset(0 100% 0 0)" });
              gsap.set(lane.querySelector("p"), { autoAlpha: 0, x: 30, y: 15, clipPath: "inset(0 0 100% 0)" });
              gsap.set(lane.querySelectorAll(".service-lane-word"), { autoAlpha: 0, y: 32, rotationX: -70, filter: "blur(7px)" });
              gsap.set(lane.querySelectorAll(".service-description-word"), { autoAlpha: 0, y: 12, filter: "blur(4px)" });
              gsap.set(lane.querySelector(".service-artifact-frame"), { autoAlpha: 0, scale: 0.84, y: 18, transformOrigin: "center center" });
            });
            gsap.set(allPaths, {
              strokeDasharray: (_: number, path: SVGPathElement) => path.getTotalLength(),
              strokeDashoffset: (_: number, path: SVGPathElement) => path.getTotalLength(),
            });
            gsap.set(allBlocks, { opacity: 0, scale: 0.65, transformOrigin: "50% 50%" });
            gsap.set(spine, { scaleY: 0, transformOrigin: "top center" });
            gsap.set(spineNodes, { opacity: 0 });

            const pipeline = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: services,
                start: "top top",
                end: mobile ? "+=220%" : "+=260%",
                pin: true,
                scrub: 0.55,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            pipeline
              .to(eyebrow, { autoAlpha: 1, y: 0, letterSpacing: ".14em", duration: 0.35, ease: "power2.out" }, 0.1)
              .to(firstHeading, { autoAlpha: 1, duration: 0.08 }, 0.28)
              .to(firstHeadingChars, { autoAlpha: 1, x: 0, y: 0, rotationY: 0, rotationZ: 0, scale: 1, filter: "blur(0px)", duration: 0.65, stagger: 0.055, ease: "back.out(1.8)" }, 0.3)
              .to(secondHeading, { autoAlpha: 1, duration: 0.08 }, 0.78)
              .to(secondHeadingChars, { autoAlpha: 1, x: 0, y: 0, rotationY: 0, rotationZ: 0, scale: 1, filter: "blur(0px)", duration: 0.65, stagger: 0.055, ease: "back.out(1.8)" }, 0.8)
              .to(introduction, { autoAlpha: 1, y: 0, clipPath: "inset(0% 0 0 0)", duration: 0.56, ease: "power2.out" }, 1.0);

            lanes.forEach((lane, index) => {
              const at = 1.5 + index * 1.95;
              const title = lane.querySelector<HTMLElement>("h3");
              const description = lane.querySelector<HTMLElement>("p");
              const route = lane.querySelector<HTMLElement>(".service-route");
              const routeLine = lane.querySelector<HTMLElement>("[data-service-route-line]");
              const signal = lane.querySelector<HTMLElement>("[data-service-signal]");
              const nodes = gsap.utils.toArray<HTMLElement>("[data-service-node]", lane);
              const paths = gsap.utils.toArray<SVGPathElement>(".service-artifact-line", lane);
              const blocks = gsap.utils.toArray<SVGRectElement>(".service-artifact-block", lane);
              const frame = lane.querySelector<HTMLElement>(".service-artifact-frame");
              const laneIndex = lane.querySelector<HTMLElement>(".service-lane-index");
              const titleWords = gsap.utils.toArray<HTMLElement>(".service-lane-word", lane);
              const descriptionWords = gsap.utils.toArray<HTMLElement>(".service-description-word", lane);

              if (index > 0) pipeline.to(lanes[index - 1].querySelector("h3"), { color: "#4d6257", x: 0, duration: 0.35 }, at);
              pipeline
                .to(laneIndex, { autoAlpha: 1, y: 0, duration: 0.25, ease: "back.out(2)" }, at)
                .to(title, { autoAlpha: 1, color: "#171d1a", x: mobile ? 2 : 8, y: 0, skewX: 0, clipPath: "inset(0 0% 0 0)", letterSpacing: "-.06em", duration: 0.28, ease: "power3.out" }, at + 0.08)
                .to(titleWords, { autoAlpha: 1, y: 0, rotationX: 0, filter: "blur(0px)", duration: 0.52, stagger: 0.08, ease: "back.out(2)" }, at + 0.14)
                .to(description, { autoAlpha: 1, color: "#34433a", x: 0, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.26, ease: "power2.out" }, at + 0.35)
                .to(descriptionWords, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.34, stagger: 0.022, ease: "power2.out" }, at + 0.41)
                .to(frame, { autoAlpha: 1, scale: 1, y: 0, duration: 0.52, ease: "back.out(1.5)" }, at + 0.43)
                .to(routeLine, { scaleX: 1, duration: 1.02 }, at + 0.12)
                .fromTo(signal, { opacity: 0, x: 0 }, { opacity: 1, x: () => Math.max(0, (route?.clientWidth ?? 0) - 7), duration: 1.02 }, at + 0.12)
                .to(nodes, { borderColor: "#3348c5", backgroundColor: "#3348c5", duration: 0.18, stagger: 0.23 }, at + 0.2)
                .to(paths, { strokeDashoffset: 0, duration: mobile ? 0.72 : 0.88, stagger: mobile ? 0.04 : 0.07 }, at + 0.32)
                .to(blocks, { scale: 1, opacity: 0.8, duration: 0.32, stagger: 0.1 }, at + 0.72)
                .to(frame, { borderColor: "#536f9e8a", duration: 0.32 }, at + 0.78)
                .to(signal, { opacity: 0, duration: 0.18 }, at + 1.27);
              if (introduction) pipeline.to(introduction, { color: ["#4c5d53", "#354b43", "#263e43"][index], duration: 0.45 }, at);
              if (index === 1) {
                pipeline.to(firstHeading, { color: "#55645b", duration: 0.55 }, at)
                  .to(secondHeading, { color: "#34443b", duration: 0.55 }, at);
              }
              if (index === 2) pipeline.to(secondHeading, { color: "#202725", duration: 0.55 }, at);
            });

            pipeline
              .to(allTitles, { color: "#202725", x: 0, duration: 0.54 }, 7.45)
              .to(allFrames, { borderColor: "#536f9e8a", duration: 0.54 }, 7.45)
              .to(allBlocks, { opacity: 0.88, duration: 0.54 }, 7.45)
              .to(firstHeading, { color: "#202725", duration: 0.54 }, 7.45)
              .to(spine, { scaleY: 1, duration: 0.74 }, 7.5)
              .to(spineNodes, { opacity: 1, duration: 0.14, stagger: 0.22 }, 7.63)
              .to(spine, { scaleY: 1.13, duration: 0.4 }, 9.6)
              .to(handoffPaths.slice(0, 3), { strokeDashoffset: 0, duration: 0.88, stagger: 0.12 }, 9.54)
              .to(handoffPaths[3], { strokeDashoffset: 0, duration: 0.38 }, 10.35);
          }
        }

        const contact = document.querySelector<HTMLElement>("[data-contact-stage]");
        let cleanupContact = () => {};
        if (contact) {
          const darkField = contact.querySelector<HTMLElement>("[data-contact-dark]");
          const signalSvg = contact.querySelector<SVGSVGElement>("[data-contact-signal]");
          const signalPath = contact.querySelector<SVGPathElement>("[data-contact-signal-path]");
          const lines = gsap.utils.toArray<HTMLElement>("[data-contact-line]", contact);
          const glyphLines = lines.map((line) => gsap.utils.toArray<HTMLElement>("[data-contact-glyph]", line));
          const rule = contact.querySelector<HTMLElement>("[data-contact-handoff-rule]");
          const links = gsap.utils.toArray<HTMLElement>("[data-contact-activate]", contact);
          const footer = contact.querySelector<HTMLElement>("[data-contact-footer]");
          const back = contact.querySelector<HTMLAnchorElement>("[data-contact-back]");
          const headline = contact.querySelector<HTMLElement>(".contact-headline");
          const label = contact.querySelector<HTMLElement>("[data-contact-top]");

          if (darkField && signalSvg && signalPath && lines.length === 4 && rule && footer && headline) {
            const drawContactSignal = () => {
              const width = contact.clientWidth;
              const height = contact.clientHeight;
              signalSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);
              signalPath.setAttribute("d", `M ${width * 0.955} 0 C ${width * 0.91} ${height * 0.16}, ${width * 0.99} ${height * 0.28}, ${width * 0.945} ${height * 0.42} S ${width * 0.975} ${height * 0.56}, ${width * 0.94} ${height * 0.69}`);
              const length = signalPath.getTotalLength();
              signalPath.style.strokeDasharray = `${length}`;
              signalPath.style.strokeDashoffset = `${length}`;
            };
            drawContactSignal();
            glyphLines.forEach((lineGlyphs, lineIndex) => gsap.set(lineGlyphs, {
              x: (glyphIndex: number) => -(mobile ? 90 : 210) - glyphIndex * (mobile ? 7 : 13),
              y: (glyphIndex: number) => Math.sin(glyphIndex * 0.72 + lineIndex * 0.8) * (mobile ? 42 : 82) + 26,
              z: -130,
              rotation: (glyphIndex: number) => Math.sin(glyphIndex * 0.72 + lineIndex) * 32,
              rotationY: (glyphIndex: number) => Math.cos(glyphIndex * 0.72 + lineIndex) * 42,
              skewX: -12,
              scale: 0.62,
              opacity: 0,
              filter: "blur(11px)",
              transformOrigin: "50% 70%",
            }));
            let pointerActive = false;
            const contactTimeline = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: contact,
                start: "top top",
                end: mobile ? "+=180%" : "+=210%",
                pin: true,
                scrub: 0.55,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  pointerActive = self.progress >= 0.82;
                  contact.dataset.darkReady = self.progress >= 0.13 ? "true" : "false";
                },
              },
            });
            contactTimeline
              .to(darkField, { clipPath: "circle(165% at 83% 0%)", duration: 1.8 }, 0)
              .to(signalPath, { strokeDashoffset: 0, duration: 8.8 }, 0.3)
              .to(label, { clipPath: "inset(0 0% 0 0)", duration: 0.35 }, 1.3)
              .to(rule, { scaleX: 1, duration: 0.68 }, 8.15);
            glyphLines.forEach((lineGlyphs, index) => {
              const revealAt = [1.75, 3.35, 4.95, 6.55][index];
              contactTimeline.to(lineGlyphs, {
                x: (glyphIndex: number) => Math.sin(glyphIndex * 0.72 + index * 0.8) * (mobile ? 10 : 22),
                y: (glyphIndex: number) => -Math.cos(glyphIndex * 0.72 + index * 0.8) * (mobile ? 16 : 30),
                z: 26,
                rotation: (glyphIndex: number) => Math.sin(glyphIndex * 0.72 + index) * -9,
                rotationY: (glyphIndex: number) => Math.cos(glyphIndex * 0.72 + index) * -12,
                skewX: 4,
                scale: 1.12,
                opacity: 1,
                filter: "blur(0px)",
                ease: "power3.out",
                duration: 0.78,
                stagger: 0.075,
              }, revealAt).to(lineGlyphs, {
                x: 0,
                y: 0,
                z: 0,
                rotation: 0,
                rotationY: 0,
                skewX: 0,
                scale: 1,
                ease: "sine.inOut",
                duration: 0.54,
                stagger: 0.075,
              }, revealAt + 0.78);
            });
            if (links[0]) contactTimeline.to(links[0].querySelectorAll("svg, span"), { clipPath: "inset(0 0% 0 0)", duration: 0.34 }, 8.32);
            if (links[1]) contactTimeline.to(links[1].querySelectorAll("svg, span"), { clipPath: "inset(0 0% 0 0)", duration: 0.34 }, 8.52);
            if (links[2]) contactTimeline.to(links[2].querySelectorAll("svg, span"), { clipPath: "inset(0 0% 0 0)", duration: 0.34 }, 8.72);
            contactTimeline
              .to(footer, { clipPath: "inset(0 0% 0 0)", duration: 0.32 }, 8.92)
              .to(headline, { y: -5, duration: 0.28 }, 9.72)
              .to(back, { color: "#f0eee5", duration: 0.28 }, 9.72);

            const onPointerMove = (event: PointerEvent) => {
              if (!pointerActive || mobile) return;
              lines.forEach((line, index) => {
                const bounds = line.getBoundingClientRect();
                const dx = Math.max(-4, Math.min(4, (event.clientX - (bounds.left + bounds.width / 2)) / 110));
                const dy = Math.max(-2, Math.min(2, (event.clientY - (bounds.top + bounds.height / 2)) / 180));
                gsap.to(line, { x: dx * (index % 2 ? -1 : 1), y: dy, duration: 0.26, overwrite: true });
              });
            };
            const onPointerLeave = () => gsap.to(lines, { x: 0, y: 0, duration: 0.3, overwrite: true });
            const onBackToTop = (event: MouseEvent) => {
              event.preventDefault();
              if (window.portfolioLenis) window.portfolioLenis.scrollTo(0, { duration: 1.25 });
              else window.scrollTo({ top: 0, behavior: "smooth" });
            };
            if (!mobile) {
              contact.addEventListener("pointermove", onPointerMove);
              contact.addEventListener("pointerleave", onPointerLeave);
            }
            back?.addEventListener("click", onBackToTop);
            cleanupContact = () => {
              delete contact.dataset.darkReady;
              contact.removeEventListener("pointermove", onPointerMove);
              contact.removeEventListener("pointerleave", onPointerLeave);
              back?.removeEventListener("click", onBackToTop);
              gsap.killTweensOf(lines);
            };
          }
        }

        gsap.utils.toArray<HTMLElement>(".archive-project").forEach((row, index) => {
          gsap.fromTo(row, { x: index % 2 ? 36 : -36, opacity: 0.55 }, {
            x: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: row, start: "top 92%", end: "top 62%", scrub: true },
          });
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());
        return cleanupContact;
      }
    );

    return () => media.revert();
  }, [language]);

  return null;
}
