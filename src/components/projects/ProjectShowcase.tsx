"use client";

import { ArrowUpRight } from "lucide-react";
import SplitText from "@/components/motion/SplitText";

type Project = { title: string; desc: string; tech: string; link: string };

const covers = [
  { label: "STORE / PUBLISH", word: "SP.", kind: "store" },
  { label: "CREATIVE / MEDIA", word: "TH.", kind: "media" },
  { label: "COMMERCE / MOBILE", word: "ZX.", kind: "commerce" },
  { label: "PARTNER / PLATFORM", word: "PX.", kind: "partner" },
  { label: "AUTOMATION / SYSTEM", word: "AF.", kind: "farm" },
  { label: "MINI APP / SYSTEM", word: "LB.", kind: "mini" },
  { label: "EDITORIAL / PLATFORM", word: "NW.", kind: "news" },
  { label: "SUPER APP / MOBILE", word: "SA.", kind: "super" },
  { label: "PLAY / TOGETHER", word: "GN.", kind: "game" },
  { label: "DATA / INTELLIGENCE", word: "ME.", kind: "match" },
  { label: "LIVE / EXPERIENCE", word: "QC.", kind: "concert" },
] as const;

export function PosterArt({ kind }: { kind: string }) {
  return (
    <div className={`poster-art poster-art--${kind}`} aria-hidden="true">
      <div className="poster-art-ring poster-art-ring--one" />
      <div className="poster-art-ring poster-art-ring--two" />
      <div className="poster-art-core">
        {kind === "store" && <><span className="art-store-icon">↗</span><i className="art-store-tile" /><i className="art-store-tile" /></>}
        {kind === "media" && <><span className="art-media-letter">M</span><i className="art-media-slice" /><i className="art-media-slice" /></>}
        {kind === "commerce" && <><span className="art-commerce-sun" /><span className="art-commerce-bag">✳</span></>}
        {kind === "partner" && <><span className="art-partner-window"><i /><i /><i /><i /></span><span className="art-partner-dot" /></>}
        {kind === "farm" && <><span className="art-farm-track" /><i className="art-farm-node" /><i className="art-farm-node" /><i className="art-farm-node" /></>}
        {kind === "mini" && <><span className="art-mini-grid"><i /><i /><i /><i /><i /><i /></span><span className="art-mini-star">✳</span></>}
        {kind === "news" && <><span className="art-news-page"><b>THE<br />NEXT<br />THING.</b><i /><i /><i /></span></>}
        {kind === "super" && <><span className="art-super-device"><b>◉</b><i /><i /><i /></span><span className="art-super-disc" /></>}
        {kind === "game" && <><span className="art-game-orbit">✦</span><i className="art-game-chip" /><i className="art-game-chip" /></>}
        {kind === "match" && <svg className="art-match-line" viewBox="0 0 240 220" fill="none"><path d="M-10 178 C37 166 40 53 93 73 S148 194 183 95 235 36 257 13" stroke="currentColor" strokeWidth="13" strokeLinecap="round"/><circle cx="93" cy="73" r="12" fill="currentColor"/><circle cx="183" cy="95" r="12" fill="currentColor"/></svg>}
        {kind === "concert" && <><span className="art-concert-beam" /><span className="art-concert-beam" /><span className="art-concert-beam" /><span className="art-concert-star">✦</span></>}
      </div>
    </div>
  );
}

function ProjectPoster({ project, index }: { project: Project; index: number }) {
  const cover = covers[index] ?? covers[index % covers.length];
  return (
    <div className={`project-poster project-poster--${cover.kind}`}>
      <div className="poster-top"><span>Q / SELECTED WORK</span><span>{String(index + 1).padStart(2, "0")}</span></div>
      <PosterArt kind={cover.kind} />
      <div className="poster-bottom"><span className="poster-category">{cover.label}</span><strong>{cover.word}</strong><span className="poster-project-title">{project.title}</span></div>
      <span className="poster-edge" aria-hidden="true" />
    </div>
  );
}

export default function ProjectShowcase({ projects, language }: { projects: Project[]; language: "vi" | "en" }) {
  const localized = (value: string) => {
    const [vi, en] = value.split("|||");
    return language === "vi" ? vi : en || vi;
  };

  return (
    <div className="project-stage" data-project-stage>
      <div className="project-name-field project-name-field--back" aria-hidden="true">
        {projects.map((project) => <span className="project-name-back" key={`back-${project.title}`}>{project.title}</span>)}
      </div>
      <div className="project-type-intro" aria-hidden="true">
        <div className="project-type-line project-type-line--first"><SplitText text={language === "vi" ? "DỰ ÁN" : "SELECTED"} mode="chars" pieceClassName="project-type-char" /></div>
        <div className="project-type-line project-type-line--second"><SplitText text={language === "vi" ? "TIÊU BIỂU" : "WORK"} mode="chars" pieceClassName="project-type-char" /></div>
        <span className="project-type-caption">SCROLL / EXPLORE THE WORK ↓</span>
      </div>
      <div className="project-fan-heading" aria-hidden="true"><span>PROJECTS / 2025—26</span><strong>{language === "vi" ? "Mỗi sản phẩm, một thế giới riêng." : "Every product, its own world."}</strong></div>
      <div className="project-stack" data-project-stack>
        <div className="stack-orbit stack-orbit--one" aria-hidden="true" />
        <div className="stack-orbit stack-orbit--two" aria-hidden="true" />
        {projects.map((project, index) => (
          <article className="stack-card" data-project-card data-project-index={index} key={project.title}>
            <a href={project.link} target={project.link.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={`${project.title} — open project`}>
              <ProjectPoster project={project} index={index} />
            </a>
          </article>
        ))}
      </div>
      <div className="project-meta-deck">
        {projects.map((project, index) => (
          <div className="stack-card-meta" data-project-meta key={`meta-${project.title}`}>
            <div className="stack-card-heading"><span>{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} · SELECTED WORK</span><h3>{project.title}</h3><p>{localized(project.desc)}</p></div>
            <div className="stack-card-bottom"><span>{project.tech}</span><a href={project.link} target={project.link.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{language === "vi" ? "XEM DỰ ÁN" : "VIEW PROJECT"} <ArrowUpRight size={16} /></a></div>
          </div>
        ))}
      </div>
      <div className="project-stage-caption"><span>SCROLL TO EXPLORE</span><span data-project-counter>01 / {String(projects.length).padStart(2, "0")}</span></div>
    </div>
  );
}
