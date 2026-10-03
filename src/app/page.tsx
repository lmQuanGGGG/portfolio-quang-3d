"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, GraduationCap, Mail } from "lucide-react";
import { profile } from "./data";
import { useLanguage } from "@/components/LanguageProvider";
import ScrollChoreography from "@/components/motion/ScrollChoreography";
import SplitText from "@/components/motion/SplitText";
import ProjectShowcase from "@/components/projects/ProjectShowcase";
import ExperienceVisual from "@/components/ExperienceVisual";

const certificateDescriptions: Record<string, string> = {
  "Networking Basics": "Network communication, protocols, IPv4/IPv6 addressing, and secure router configuration.",
  "JavaScript Essentials 2": "Object-oriented programming, asynchronous programming, and advanced data structures.",
  "JavaScript Essentials 1": "JavaScript syntax, algorithmic thinking, and foundational programming.",
  "English for IT 2 (B2 Level)": "Advanced professional communication and Cloud/Network terminology.",
  "English for IT 1": "IT English fundamentals, communication, and technical documentation.",
};

function localize(value: string, language: "vi" | "en") {
  const [vi, en] = value.split("|||");
  return language === "vi" ? vi : en || vi;
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function ExperienceLettering({ text, charClass }: { text: string; charClass: string }) {
  return (
    <span className="experience-lettering" aria-label={text}>
      {text.split(/\s+/).map((word, wordIndex) => (
        <span className="experience-word" aria-hidden="true" key={`${word}-${wordIndex}`}>
          {Array.from(word).map((char, charIndex) => <span className={charClass} key={`${char}-${charIndex}`}>{char}</span>)}
        </span>
      )).reduce<React.ReactNode[]>((parts, word, index) => index === 0 ? [word] : [...parts, " ", word], [])}
    </span>
  );
}

function ServiceHeadingLetters({ text }: { text: string }) {
  return <span className="service-heading-letters" aria-label={text}>{text.split(/\s+/).map((word, wordIndex) => <span className="service-heading-word" aria-hidden="true" key={`${word}-${wordIndex}`}>{Array.from(word).map((character, charIndex) => <span className="service-heading-char" key={`${character}-${charIndex}`}>{character}</span>)}</span>).reduce<React.ReactNode[]>((parts, word, index) => index === 0 ? [word] : [...parts, " ", word], [])}</span>;
}

function SkillVisual({ index }: { index: number }) {
  if (index === 0) return <svg className="skill-visual" viewBox="0 0 240 130" aria-hidden="true"><path d="M18 22h204M18 47h128M18 72h185M18 97h94" /><path className="skill-accent" d="M164 47h42M126 97h56" /><circle cx="30" cy="116" r="4" /><circle cx="49" cy="116" r="4" /><circle cx="68" cy="116" r="4" /></svg>;
  if (index === 1) return <svg className="skill-visual" viewBox="0 0 240 130" aria-hidden="true"><rect x="16" y="22" width="150" height="88" rx="5" /><path d="M16 39h150M31 53h78M31 65h104M31 77h61" /><rect className="skill-accent" x="178" y="42" width="43" height="76" rx="8" /><path d="M188 54h23M188 64h23M188 74h16" /></svg>;
  if (index === 2) return <svg className="skill-visual" viewBox="0 0 240 130" aria-hidden="true"><ellipse cx="55" cy="29" rx="30" ry="9" /><path d="M25 29v48c0 5 13 9 30 9s30-4 30-9V29M25 53c0 5 13 9 30 9s30-4 30-9" /><circle className="skill-accent-fill" cx="153" cy="38" r="9" /><circle cx="190" cy="66" r="9" /><circle cx="143" cy="94" r="9" /><path className="skill-accent" d="M161 43l21 17M181 74l-29 14M143 47l-1 38" /></svg>;
  return <svg className="skill-visual" viewBox="0 0 240 130" aria-hidden="true"><rect x="16" y="52" width="56" height="30" rx="4" /><rect className="skill-accent-fill" x="92" y="20" width="56" height="30" rx="4" /><rect x="168" y="77" width="56" height="30" rx="4" /><path className="skill-accent" d="M72 67h20V35h0M148 35h20v57h0M72 67h96" /><circle cx="82" cy="67" r="3" /><circle cx="158" cy="35" r="3" /><circle cx="158" cy="92" r="3" /></svg>;
}

function ServiceArtifact({ index }: { index: number }) {
  if (index === 0) return (
    <svg className="service-artifact" viewBox="0 0 240 100" aria-hidden="true">
      <path className="service-artifact-line" d="M14 16h188v70H14zM14 32h188M27 24h4m7 0h4m7 0h4M28 46h76v28H28zM116 46h72M116 55h53M116 64h60M116 73h38" />
      <path className="service-artifact-line service-artifact-accent" d="M104 60h13M188 60h25m-4-4 4 4-4 4" />
      <rect className="service-artifact-block" x="32" y="50" width="67" height="20" rx="1" />
      <rect className="service-artifact-block" x="117" y="46" width="31" height="5" rx="1" />
      <rect className="service-artifact-block" x="117" y="64" width="42" height="5" rx="1" />
    </svg>
  );
  if (index === 1) return (
    <svg className="service-artifact" viewBox="0 0 240 100" aria-hidden="true">
      <path className="service-artifact-line" d="M64 10h62a8 8 0 0 1 8 8v68a8 8 0 0 1-8 8H64a8 8 0 0 1-8-8V18a8 8 0 0 1 8-8zM75 19h40M71 34h48v32H71zM71 76h19M97 76h22M162 23h52v54h-52zM162 35h52M145 52h17" />
      <path className="service-artifact-line service-artifact-accent" d="M119 51h26m-5-5 5 5-5 5M214 52h17" />
      <rect className="service-artifact-block" x="76" y="39" width="38" height="22" rx="1" />
      <rect className="service-artifact-block" x="169" y="44" width="37" height="7" rx="1" />
      <rect className="service-artifact-block" x="169" y="57" width="24" height="7" rx="1" />
    </svg>
  );
  return (
    <svg className="service-artifact" viewBox="0 0 240 100" aria-hidden="true">
      <path className="service-artifact-line" d="M13 35h45v30H13zM97 20h48v27H97zM97 57h48v27H97zM182 35h45v30h-45zM58 50h18v-17h21M58 50h18v20h21M145 33h18v17h19M145 70h18V50M227 50h10" />
      <path className="service-artifact-line service-artifact-accent" d="M18 50h35M102 33h37M102 70h37M187 50h35" />
      <rect className="service-artifact-block" x="21" y="43" width="21" height="14" rx="1" />
      <rect className="service-artifact-block" x="106" y="26" width="29" height="14" rx="1" />
      <rect className="service-artifact-block" x="106" y="63" width="29" height="14" rx="1" />
      <rect className="service-artifact-block" x="192" y="42" width="22" height="16" rx="1" />
    </svg>
  );
}

function ContactSignalLine({ text, mode }: { text: string; mode: "sweep" | "segments" | "slices" | "resolve" }) {
  return (
    <span className={`contact-line contact-line--${mode}`} data-contact-line aria-hidden="true">
      {Array.from(text).map((character, index) => (
        <span className={`contact-glyph${character === "." ? " contact-final-period" : ""}`} data-contact-glyph key={`${mode}-${index}`}>
          {character === " " ? "\u00a0" : character}
        </span>
      ))}
    </span>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const t = (vi: string, en: string) => language === "vi" ? vi : en;
  const maxProofValue = Math.max(...profile.stats.map((stat) => Number.parseInt(stat.value, 10)));

  const capabilities = [
    [t("NGÔN NGỮ", "LANGUAGES"), "TypeScript · JavaScript · C# (.NET 8) · Python · Dart · SQL"],
    [t("WEB & MOBILE", "WEB & MOBILE"), "React · Next.js · SvelteKit · Flutter · React Native (Expo)"],
    [t("DỮ LIỆU & CLOUD", "DATA & CLOUD"), "PostgreSQL · SQL Server · Firebase · Alibaba Cloud · Docker"],
    [t("AI & WORKFLOW", "AI & WORKFLOWS"), "LLM Apps · MCP Tool Calling · RAG · Puppeteer Automation"],
  ];

  return (
    <main className="portfolio">
      <section className="hero" id="top" data-scroll-hero>
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-visual">
          <div className="hero-video-frame" data-hero-video-frame>
            <video className="hero-video" data-hero-video autoPlay muted loop playsInline preload="metadata" aria-label="Le Minh Quang working with a smartphone">
              <source src="/videos/engineer-hero-new.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="hero-content">
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14, delayChildren: 0.12 } } }}
          >
            <motion.p className="hero-kicker" variants={{ hidden: { opacity: 0, y: 18, filter: "blur(6px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8 } } }}>
              {t("KỸ SƯ PHẦN MỀM · FULL-STACK, MOBILE & CLOUD", "SOFTWARE ENGINEER · FULL-STACK, MOBILE & CLOUD")}
            </motion.p>
            <motion.h1 className="hero-title" variants={{ hidden: { opacity: 0, y: 48, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}>
              <span className="hero-title-line hero-title-line--one">LE MINH</span><span className="hero-title-line hero-title-line--two">QUANG</span>
            </motion.h1>
            <div className="hero-bottom">
              <div>
                <p>{t("Tại FPT IS, tôi giải bài toán công nghệ ở quy mô doanh nghiệp. Với vai trò freelancer, tôi đưa sản phẩm web, mobile và AI từ bản thiết kế đầu tiên đến ngày phát hành.", profile.bio)}</p>
              </div>
              <a className="round-link" href="#projects" aria-label="Scroll to selected work"><ArrowDown size={18} /></a>
            </div>
          </motion.div>
        </div>
        <div className="hero-index"><span>01 — 08</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section className="intro section-pad" id="about">
        <div className="intro-label"><Label>01 / {t("GIỚI THIỆU", "ABOUT")}</Label><span className="vertical-mark">LMQ®</span></div>
        <div className="intro-copy">
          <h2>
            <span className="intro-heading-line">{t("XÂY DỰNG CÓ CHỦ ĐÍCH,", "THOUGHTFULLY BUILT,").split(" ").map((word, index) => <span className="intro-heading-word" key={`about-first-${index}`}>{word}{" "}</span>)}</span>
            <span className="intro-heading-line">{t("VỮNG CHẮC TỪ GỐC.", "ROBUST BY DESIGN.").split(" ").map((word, index) => <span className="intro-heading-word" key={`about-second-${index}`}>{word}{" "}</span>)}</span>
          </h2>
          <div className="intro-detail">
            <p className="intro-word-scrub"><SplitText mode="words" text={t("Tôi là Lê Minh Quang — kỹ sư phần mềm tập trung vào nền tảng doanh nghiệp, sản phẩm full-stack và AI automation hiệu năng cao.", "I'm Le Minh Quang — software engineer building enterprise platforms, full-stack digital products, and high-reliability AI automation.")} pieceClassName="scroll-word" /></p>
            <p className="intro-word-scrub"><SplitText mode="words" text={t("Từ logic backend doanh nghiệp phức tạp, mô hình bảo mật đến ứng dụng web/mobile responsive và AI workflow ổn định.", "From complex backend enterprise logic and security models to responsive web/mobile apps and dependable AI workflows.")} pieceClassName="scroll-word" /></p>
          </div>
        </div>
        <div className="capability-line"><span>WEB</span><span>MOBILE</span><span>SYSTEMS</span><span>AI & AUTOMATION</span><span>APP PUBLISHING</span></div>
      </section>

      <section className="work section-pad" id="projects">
        <div className="work-intro" data-work-intro>
          <div className="section-heading">
            <div>
              <Label>02 / {t("DỰ ÁN TIÊU BIỂU", "3D ARCHITECTURE & PROJECTS")}</Label>
              <h2>
                <span className="work-intro-line work-intro-line--first"><SplitText mode="words" text={t("SẢN PHẨM SỐ", "HIGH-DEPTH DIGITAL")} pieceClassName="work-intro-word" /></span>
                <span className="work-intro-line work-intro-line--second"><SplitText mode="words" text={t("VỚI CHIỀU SÂU KỸ THUẬT.", "ENGINEERING.")} pieceClassName="work-intro-word" /></span>
              </h2>
            </div>
            <p><SplitText mode="words" text={t("Mỗi hệ thống được xây dựng với kiến trúc rõ ràng: CMS phân tán, nền tảng đa thiết bị và mô hình AI matching.", "Each system engineered with clean architectural depth: distributed CMS workflows, cross-platform cloud scaling, and AI matching engines.")} pieceClassName="work-intro-description-word" /></p>
          </div>
        </div>
        <ProjectShowcase projects={profile.projects} language={language} />
      </section>

      <section className="statement" data-kinetic-stage aria-label="Build, design, code, ship">
        <div className="statement-orbit" aria-hidden="true" />
        <div className="type-track type-track--first" aria-hidden="true">WEB • MOBILE • SYSTEMS • AI • AUTOMATION •</div>
        <div className="type-track type-track--second" aria-hidden="true">PRODUCT • ENGINEERING • CLOUD • EXPERIENCE •</div>
        <div className="statement-top"><Label>BUILD · DESIGN · CODE · SHIP</Label><span>SCROLL DRIVES THE STORY / 03</span></div>
        <div className="kinetic-word kinetic-word--build" aria-hidden="true">BUILD</div>
        <div className="kinetic-word kinetic-word--design" aria-hidden="true">DESIGN</div>
        <div className="kinetic-word kinetic-word--code" aria-hidden="true">CODE</div>
        <div className="kinetic-word kinetic-word--ship" aria-hidden="true"><SplitText mode="chars" text="SHIP" pieceClassName="kinetic-char" /></div>
        <div className="statement-bottom"><span>FROM IDEA TO PRODUCTION</span><span>LE MINH QUANG ®</span></div>
      </section>

      <section className="experience section-pad" id="experience">
        <div className="experience-list">
          {profile.experience.map((job, index) => (
            <div key={`job-${job.company}-${index}`} className={`experience-entry experience-entry--${index}`}>
              {index === 0 && (
                <div className="experience-first-intro">
                  <Label>03 / {t("KINH NGHIỆM", "HANDS-ON EXPERIENCE")}</Label>
                  <h2><ExperienceLettering text={t("THỰC CHIẾN CÙNG DOANH NGHIỆP & SẢN PHẨM.", "ENTERPRISE & PRODUCT EXPERIENCE.")} charClass="experience-title-char" /></h2>
                </div>
              )}
              <article className="experience-row"><div className="experience-copy"><div className="experience-meta"><span className="experience-date">{localize(job.period, language)}</span><span className="experience-arrow">0{index + 1} / 04</span></div><h3 className="experience-company"><ExperienceLettering text={job.company} charClass="experience-company-char" /></h3><p className="experience-role">{localize(job.role, language)}</p><p className="experience-project">{localize(job.project, language)}</p><ul className="experience-points">{localize(job.description, language).split("\n").map((item, itemIdx) => <li key={`job-${index}-item-${itemIdx}`}>{item}</li>)}</ul></div><ExperienceVisual index={index} /></article>
            </div>
          ))}
        </div>
        <div className="experience-archive" aria-hidden="true">
          <div className="experience-archive-inner">
            {profile.experience.map((job, index) => (
              <div className="experience-archive-card" data-experience-archive-card key={`archive-${job.company}-${index}`}>
                <ExperienceVisual index={index} />
              </div>
            ))}
          </div>
        </div>
        <div className="experience-finale">
          <span className="experience-finale-kicker">03 / {t("HÀNH TRÌNH THỰC CHIẾN", "EXPERIENCE ARCHIVE")}</span>
          <h3>{t("BỐN CHẶNG ĐƯỜNG.", "FOUR CHAPTERS.")}<br /><span>{t("MỘT CÁCH LÀM.", "ONE PRACTICE.")}</span></h3>
          <div className="experience-finale-line" />
          <p>{t("Từ hệ thống doanh nghiệp đến sản phẩm được đưa vào sử dụng — luôn bắt đầu từ bài toán thật và kết thúc bằng thứ chạy được.", "From enterprise systems to products in people's hands — grounded in real problems and built to ship.")}</p>
          <div className="experience-finale-companies">
            {profile.experience.map((job, index) => <span className="experience-finale-company" key={`finale-${job.company}`}>0{index + 1} <strong>{job.company}</strong></span>)}
          </div>
        </div>
      </section>

      <section className="toolkit section-pad" id="skills" data-toolkit-stage>
        <div className="toolkit-title"><Label>04 / {t("NĂNG LỰC", "CAPABILITIES")}</Label><h2>TECH<br /><span>STACK.</span></h2><p>{t("Công cụ phù hợp với bài toán — kết hợp kỹ thuật sản phẩm, kiến trúc hệ thống và triển khai thực tế.", "A practical blend of product engineering, systems architecture, and production delivery.")}</p></div>
        <div className="toolkit-columns">{capabilities.map(([category, skills], index) => <div className={`toolkit-group toolkit-group--${index}`} data-toolkit-group key={`cap-${index}`}><div className="toolkit-group-head"><span>0{index + 1} / {category}</span><SkillVisual index={index} /></div><p>{skills}</p></div>)}</div>
      </section>

      <section className="proof section-pad" id="proof"><Label>05 / {t("MỘT VÀI CON SỐ", "A FEW NUMBERS")}</Label><div className="proof-grid">{profile.stats.map((stat, index) => <div key={`stat-${index}`} className="proof-item"><span>0{index + 1}</span><strong data-proof-value={stat.value}>{stat.value}</strong><p>{t((["Ứng dụng đã phát triển", "Website đã phát triển", "Ứng dụng đã phát hành", "Tổng dự án"])[index], stat.label)}</p></div>)}</div><div className="proof-chart" aria-hidden="true"><span className="proof-chart-cursor" />{profile.stats.map((stat, index) => <div className="proof-chart-slot" key={`proof-chart-${index}`}><span className="proof-chart-bar" style={{ height: `${Math.round(Number.parseInt(stat.value, 10) / maxProofValue * 100)}%` }} /><span className="proof-chart-index">0{index + 1}</span></div>)}</div></section>

      <section className="credentials section-pad" id="certificates" data-credentials-stage>
        <div className="credentials-intro">
          <Label>06 / {t("HỌC VẤN & CHỨNG CHỈ", "EDUCATION & CREDENTIALS")}</Label>
          <h2>{t("NỀN TẢNG", "BUILT ON")}<br /><span>{t("VỮNG CHẮC.", "GOOD FOUNDATIONS.")}</span></h2>
        </div>
        <div className="credential-catalog" aria-live="off">
          {profile.certificates.map((cert, index) => (
            <div className={`credential-record credential-record--${index}`} data-credential-record key={`record-${cert.name}`}>
              <span className="credential-record-index">{String(index + 1).padStart(2, "0")} / 05 <i>ARCHIVE RECORD</i></span>
              <h3>{cert.name}</h3>
              <p>{cert.issuer}<span>{cert.date}</span></p>
              <small>{language === "vi" ? cert.desc : certificateDescriptions[cert.name]}</small>
            </div>
          ))}
        </div>
        <div className="education credentials-education">
          <GraduationCap size={22} />
          <div><h3>{t("Đại học Bách Khoa TP. Hồ Chí Minh", "Ho Chi Minh City University of Technology")}</h3><p>{t("Công nghệ Thông tin", "Information Technology")} · 2022–2026 · GPA 3.43 / 4.0</p></div>
        </div>
        <div className="credentials-viewport">
          <div className="credentials-world" data-credentials-world>
            <div className="credentials-world-guide" aria-hidden="true" />
            {profile.certificates.map((cert, index) => (
              <a className={`credential-document credential-document--${index}`} data-credential-doc href={cert.link} target="_blank" rel="noreferrer" key={`document-${cert.name}`} aria-label={`${cert.name} — ${cert.issuer}`}>
                <Image src={cert.img} alt={`${cert.name} certificate`} width={792} height={612} sizes="(max-width: 700px) 300px, 360px" />
                <span className="credential-inspection" aria-hidden="true"><i /><i /><small>DOC {String(index + 1).padStart(2, "0")} / 05</small></span>
              </a>
            ))}
          </div>
          <span className="credentials-overview-label" aria-hidden="true">05 DOCUMENTS / ONE ARCHIVE</span>
        </div>
      </section>

      <section className="services section-pad" id="services" data-service-stage><div className="section-heading"><div><Label>07 / {t("DỊCH VỤ & HỢP TÁC", "SERVICES & COLLABORATION")}</Label><h2><span className="service-heading-first"><ServiceHeadingLetters text={t("TỪ Ý TƯỞNG", "FROM CONCEPT")} /></span><br /><span className="service-heading-second"><ServiceHeadingLetters text={t("ĐẾN SẢN PHẨM THẬT.", "TO PRODUCTION.")} /></span></h2></div><p data-service-intro>{t("Cung cấp dịch vụ phát triển phần mềm toàn diện: Web/Mobile apps, kiến trúc backend phân tán và AI automation.", "Full-cycle development across web, cross-platform mobile apps, backend systems, and AI automation.")}</p></div>
        <div className="service-rows">{[
          [t("ỨNG DỤNG WEB CAO CẤP", "WEB APPLICATIONS"), t("Landing page, hệ thống quản trị và Web App full-stack với Next.js và React, tối ưu SEO và tốc độ tải trang cao nhất.", "High-performance dashboards, web applications, and landing pages with Next.js, tailored for speed.")],
          [t("MOBILE & ỨNG DỤNG HYBRID", "MOBILE & HYBRID"), t("Xây dựng trải nghiệm mượt mà trên iOS & Android với Flutter, React Native và kiến trúc WebView tối ưu.", "Seamless iOS & Android apps with Flutter, React Native, and hybrid WebView bridges.")],
          [t("HỆ THỐNG, AI & PHÁT HÀNH", "SYSTEMS, AI & RELEASE"), t("Thiết kế REST API bảo mật, tích hợp AI Agents/MCP và hỗ trợ phát hành trực tiếp lên Google Play/App Store.", "Secure REST APIs, AI agent integration, and hands-on Google Play / App Store publishing support.")],
        ].map(([title, description], index) => <article className="service-lane" data-service-lane key={`svc-${index}`}>
          <span className="service-lane-index">0{index + 1}</span><h3><SplitText mode="words" text={title} pieceClassName="service-lane-word" /></h3><p><SplitText mode="words" text={description} pieceClassName="service-description-word" /></p>
          <div className="service-artifact-frame"><ServiceArtifact index={index} /></div>
          <div className="service-route" aria-hidden="true"><span className="service-route-track" /><span className="service-route-current" data-service-route-line /><span className="service-route-signal" data-service-signal />{[0, 1, 2, 3].map((stage) => <i className="service-route-node" data-service-node key={stage} />)}</div>
        </article>)}</div>
        <div className="service-spine" aria-hidden="true"><span data-service-spine /><i /><i /><i /></div>
        <svg className="service-handoff" data-service-handoff aria-hidden="true"><path data-service-handoff-path /><path data-service-handoff-path /><path data-service-handoff-path /><path data-service-handoff-path /></svg>
      </section>

      <section className="contact" id="contact" data-contact-stage>
        <div className="contact-dark-field" data-contact-dark aria-hidden="true" />
        <svg className="contact-signal" data-contact-signal aria-hidden="true"><path data-contact-signal-path /></svg>
        <div className="contact-top" data-contact-top><Label>08 / {t("LIÊN HỆ", "GET IN TOUCH")}</Label><span>HO CHI MINH CITY · VN</span></div>
        <h2 className="contact-headline" aria-label={t("CÙNG HIỆN THỰC HÓA Ý TƯỞNG CỦA BẠN.", "LET’S BUILD SOMETHING REMARKABLE TOGETHER.")}>
          <ContactSignalLine text={t("CÙNG HIỆN", "LET’S BUILD")} mode="sweep" />
          <ContactSignalLine text={t("THỰC HÓA", "SOMETHING")} mode="segments" />
          <a href="mailto:lmquang.devops@gmail.com" aria-label="Email Le Minh Quang"><ContactSignalLine text={t("Ý TƯỞNG", "REMARKABLE")} mode="slices" /><ContactSignalLine text={t("CỦA BẠN.", "TOGETHER.")} mode="resolve" /></a>
        </h2>
        <div className="contact-bottom"><span className="contact-handoff-rule" data-contact-handoff-rule aria-hidden="true" /><a className="email-link" data-contact-activate href="mailto:lmquang.devops@gmail.com"><Mail size={17} /><span>lmquang.devops@gmail.com</span></a><div className="socials"><a data-contact-activate href="https://storepublish.space/" target="_blank" rel="noopener noreferrer"><ArrowUpRight size={17} /><span>{t("Đặt dịch vụ", "Book a service")}</span></a><a data-contact-activate href="https://github.com/lmQuanGGGG" target="_blank" rel="noreferrer"><Github size={17} /><span>GitHub</span></a></div></div>
        <footer data-contact-footer><span>© {new Date().getFullYear()} LE MINH QUANG</span><a href="#top" data-contact-back>BACK TO TOP ↑</a><span>SOFTWARE ENGINEER · VIETNAM</span></footer>
      </section>
      <ScrollChoreography language={language} />
    </main>
  );
}
