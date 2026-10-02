import { PosterArt } from "@/components/projects/ProjectShowcase";

type ExperienceVisualProps = { index: number };

const covers = [
  { kind: "mini", category: "SYSTEMS / MOBILE", word: "LB.", title: "FPT IS" },
  { kind: "media", category: "PRODUCT / CLOUD", word: "TH.", title: "TRIEU HY MEDIA" },
  { kind: "store", category: "BUILD / PUBLISH", word: "SP.", title: "StorePublish" },
  { kind: "partner", category: "OPERATIONS / ERP", word: "TM.", title: "TMTECH Lighting" },
] as const;

export default function ExperienceVisual({ index }: ExperienceVisualProps) {
  const cover = covers[index];
  return <div className={`experience-visual experience-visual--${index}`} aria-hidden="true">
    <span className="experience-visual-echo experience-art-layer" />
    <span className="experience-visual-echo experience-visual-echo--second experience-art-layer" />
    <div className={`experience-visual-frame project-poster project-poster--${cover.kind}`}>
      <div className="poster-top"><span>Q / EXPERIENCE</span><span>0{index + 1} / 04</span></div>
      <PosterArt kind={cover.kind} />
      <div className="poster-bottom"><span className="poster-category">{cover.category}</span><strong>{cover.word}</strong><span className="poster-project-title">{cover.title}</span></div>
      <span className="poster-edge" />
    </div>
  </div>;
}
