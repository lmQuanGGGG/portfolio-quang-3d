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
          const videoFrame = hero.querySelector<HTMLElement>("[data-hero-video-frame]");
          if (videoFrame) {
            gsap.set(videoFrame, { scale: mobile ? 1 : 1.015, rotation: 0 });
          }
          const heroTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: mobile ? "+=120%" : "+=150%",
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          heroTimeline
            .to(".hero-title-line--one", { xPercent: mobile ? -3 : -7, yPercent: mobile ? -6 : -12, ease: "none" }, 0)
            .to(".hero-title-line--two", { xPercent: mobile ? 3 : 8, yPercent: mobile ? 5 : 9, ease: "none" }, 0)
            .to(".hero-content", { y: mobile ? -12 : -38, opacity: mobile ? 0.86 : 0.72, ease: "none" }, 0.16)
            .to(".hero-visual", { xPercent: mobile ? 0 : -3, yPercent: mobile ? -2 : -5, scale: mobile ? 1.025 : 1.07, rotation: mobile ? 0 : 1, ease: "none" }, 0.2)
            .to(".hero-grid", { yPercent: 4, opacity: 0.18, ease: "none" }, 0.2)
            .to(".hero-bottom", { xPercent: mobile ? 0 : 5, y: mobile ? -9 : -20, opacity: 0.8, ease: "none" }, 0.3)
            .to(".hero-meta", { y: -14, opacity: 0.72, ease: "none" }, 0)
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
            .to(".statement-top", { y: -24, opacity: 0.72, duration: 4.83 }, 0)
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
            gsap.set(archiveCards, { autoAlpha: 0, x: 0, y: 0, scale: 1, rotation: 0, transformOrigin: "50% 50%" });
            gsap.set(finale, { autoAlpha: 0 });
            archiveCards.forEach((card, index) => gsap.set(card, { zIndex: index + 1 }));
            const experienceTimeline = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: experience,
                start: "top top",
                end: () => `+=${Math.max(rows.length * 145, 470)}%`,
                pin: true,
                scrub: 0.6,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });
            experienceTimeline
              .to(titleChars, {
                x: (index: number) => Math.sin(index * 1.1) * 18,
                y: (index: number) => (index % 2 ? -1 : 1) * 48,
                rotationX: (index: number) => index % 2 ? -60 : 60,
                opacity: 0, filter: "blur(2px)", duration: 0.52, stagger: 0.015,
              }, 0.6)
              .to(".experience-heading", { y: -90, scale: 0.78, opacity: 0, duration: 0.6 }, 0.92);

            rows.forEach((row, index) => {
              const phase = 1.05 + index * 2.5;
              const companyChars = gsap.utils.toArray<HTMLElement>(".experience-company-char", row);
              const sourceVisual = row.querySelector<HTMLElement>(".experience-visual");
              const visualFrame = row.querySelector<HTMLElement>(".experience-visual-frame");
              const visualLayers = gsap.utils.toArray<HTMLElement>(".experience-art-layer", row);
              experienceTimeline
                .fromTo(row, { autoAlpha: 0, xPercent: 25, scale: 0.95, rotationY: 8 },
                  { autoAlpha: 1, xPercent: 0, scale: 1, rotationY: 0, duration: 0.68 }, phase)
                .fromTo(row, { "--row-progress": 0 }, { "--row-progress": 1, duration: 1.8 }, phase)
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
                  { y: 0, rotation: 0, opacity: 1, duration: 0.4 }, phase + 0.6)
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
              .fromTo(finale, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 10.95)
              .fromTo(".experience-finale-line", { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, 11.1)
              .fromTo(".experience-finale p", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, 11.12)
              .fromTo(".experience-finale-company", { y: 34, rotationX: -32, opacity: 0, filter: "blur(5px)" }, { y: 0, rotationX: 0, opacity: 1, filter: "blur(0px)", stagger: 0.11, duration: 0.65 }, 11.28)
              .to(finale, { opacity: 1, duration: 0.9 }, 12.05);
          } else {
            gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: { trigger: experience, start: "top 90%", end: "top 12%", scrub: 0.6 },
            })
              .fromTo(titleChars, letterWave, {
                x: 0, y: 0, rotationX: 0, opacity: 1, filter: "blur(0px)", duration: 0.4, stagger: 0.014,
              }, 0)
              .fromTo(".experience-heading > p", { x: 16, opacity: 0.4 }, { x: 0, opacity: 1, duration: 0.48 }, 0.3);
            rows.forEach((row) => {
              gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: row, start: "top 90%", end: "bottom 58%", scrub: 0.55 } })
                .fromTo(row, { "--row-progress": 0 }, { "--row-progress": 1, duration: 1 }, 0)
                .fromTo(row.querySelector(".experience-visual-frame"), { y: 35, scale: 0.92, opacity: 0.5 }, { y: 0, scale: 1, opacity: 1, duration: 0.6 }, 0.15)
                .fromTo(row.querySelectorAll(".experience-art-layer"), { y: 15, opacity: 0.5 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 }, 0.3)
                .fromTo(gsap.utils.toArray<HTMLElement>(".experience-company-char", row), letterWave,
                  { x: 0, y: 0, rotationX: 0, opacity: 1, filter: "blur(0px)", duration: 0.4, stagger: 0.014 }, 0.1)
                .fromTo(row.querySelectorAll(".experience-role, .experience-project, .experience-points li"),
                  { y: 12, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.05 }, 0.4);
            });
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

        // Secondary details follow their section's scroll position. The established
        // pinned timelines and card choreography above remain in control of their elements.
        const work = document.querySelector<HTMLElement>(".work");
        if (work) {
          gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: work, start: "top 92%", end: "top 18%", scrub: 0.8 },
          })
            .fromTo(".work > .section-heading .eyebrow", { x: -24, opacity: 0.35 }, { x: 0, opacity: 1, duration: 0.48 }, 0)
            .fromTo(".work > .section-heading h2", { y: 46, rotateX: 8, opacity: 0.45 }, { y: 0, rotateX: 0, opacity: 1, duration: 0.8 }, 0.08)
            .fromTo(".work > .section-heading > p", { y: 25, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.58 }, 0.3);
        }

        const proof = document.querySelector<HTMLElement>(".proof");
        if (proof) {
          gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: proof, start: "top 92%", end: "bottom 45%", scrub: 0.8 },
          })
            .fromTo(".proof > .eyebrow", { x: -20, opacity: 0.4 }, { x: 0, opacity: 1, duration: 0.3 }, 0)
            .fromTo(".proof-item", { y: 46, opacity: 0.22, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 0.58, stagger: 0.12 }, 0.12)
            .fromTo(".proof-item strong", { y: 15, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.12 }, 0.3);
        }

        const credentials = document.querySelector<HTMLElement>(".credentials");
        if (credentials) {
          gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: credentials, start: "top 90%", end: "bottom 40%", scrub: 0.8 },
          })
            .fromTo(".credentials-intro .eyebrow", { x: -20, opacity: 0.4 }, { x: 0, opacity: 1, duration: 0.25 }, 0)
            .fromTo(".credentials-intro h2", { y: 38, opacity: 0.48 }, { y: 0, opacity: 1, duration: 0.45 }, 0.08)
            .fromTo(".education", { y: 24, opacity: 0.45 }, { y: 0, opacity: 1, duration: 0.35 }, 0.25)
            .fromTo(".credential-list a", { x: mobile ? 16 : 34, opacity: 0.35 }, { x: 0, opacity: 1, duration: 0.32, stagger: 0.09 }, 0.3);
        }

        const services = document.querySelector<HTMLElement>(".services");
        if (services) {
          gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: services, start: "top 92%", end: "top 22%", scrub: 0.8 },
          })
            .fromTo(".services > .section-heading .eyebrow", { x: -20, opacity: 0.42 }, { x: 0, opacity: 1, duration: 0.42 }, 0)
            .fromTo(".services > .section-heading h2", { y: 42, opacity: 0.5 }, { y: 0, opacity: 1, duration: 0.7 }, 0.1)
            .fromTo(".services > .section-heading > p", { y: 20, opacity: 0.42 }, { y: 0, opacity: 1, duration: 0.55 }, 0.28);
        }

        const contact = document.querySelector<HTMLElement>(".contact");
        if (contact) {
          gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: contact, start: "top 90%", end: "bottom bottom", scrub: 0.8 },
          })
            .fromTo(".contact-top", { y: 18, opacity: 0.48 }, { y: 0, opacity: 1, duration: 0.32 }, 0)
            .fromTo(".contact-bottom", { y: 30, opacity: 0.42 }, { y: 0, opacity: 1, duration: 0.4 }, 0.34)
            .fromTo(".contact footer", { y: 18, opacity: 0.45 }, { y: 0, opacity: 1, duration: 0.32 }, 0.66);
        }

        gsap.utils.toArray<HTMLElement>(".archive-project, .service-rows article").forEach((row, index) => {
          gsap.fromTo(row, { x: index % 2 ? 36 : -36, opacity: 0.55 }, {
            x: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: row, start: "top 92%", end: "top 62%", scrub: true },
          });
        });

        gsap.fromTo(".contact h2", { y: 90, scale: 0.9 }, {
          y: -22,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: ".contact", start: "top bottom", end: "center center", scrub: true },
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());
      }
    );

    return () => media.revert();
  }, [language]);

  return null;
}
