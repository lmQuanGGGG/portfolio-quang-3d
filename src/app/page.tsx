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

function SkillVisual({ index }: { index: number }) {
  if (index === 0) return <svg className="skill-visual" viewBox="0 0 240 130" aria-hidden="true"><path d="M18 22h204M18 47h128M18 72h185M18 97h94" /><path className="skill-accent" d="M164 47h42M126 97h56" /><circle cx="30" cy="116" r="4" /><circle cx="49" cy="116" r="4" /><circle cx="68" cy="116" r="4" /></svg>;
  if (index === 1) return <svg className="skill-visual" viewBox="0 0 240 130" aria-hidden="true"><rect x="16" y="22" width="150" height="88" rx="5" /><path d="M16 39h150M31 53h78M31 65h104M31 77h61" /><rect className="skill-accent" x="178" y="42" width="43" height="76" rx="8" /><path d="M188 54h23M188 64h23M188 74h16" /></svg>;
  if (index === 2) return <svg className="skill-visual" viewBox="0 0 240 130" aria-hidden="true"><ellipse cx="55" cy="29" rx="30" ry="9" /><path d="M25 29v48c0 5 13 9 30 9s30-4 30-9V29M25 53c0 5 13 9 30 9s30-4 30-9" /><circle className="skill-accent-fill" cx="153" cy="38" r="9" /><circle cx="190" cy="66" r="9" /><circle cx="143" cy="94" r="9" /><path className="skill-accent" d="M161 43l21 17M181 74l-29 14M143 47l-1 38" /></svg>;
  return <svg className="skill-visual" viewBox="0 0 240 130" aria-hidden="true"><rect x="16" y="52" width="56" height="30" rx="4" /><rect className="skill-accent-fill" x="92" y="20" width="56" height="30" rx="4" /><rect x="168" y="77" width="56" height="30" rx="4" /><path className="skill-accent" d="M72 67h20V35h0M148 35h20v57h0M72 67h96" /><circle cx="82" cy="67" r="3" /><circle cx="158" cy="35" r="3" /><circle cx="158" cy="92" r="3" /></svg>;
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
        <div className="hero-meta"><span>PORTFOLIO / 2026</span><span>HO CHI MINH CITY, VIETNAM</span></div>
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
                <p>{t("Kỹ sư phần mềm với kinh nghiệm doanh nghiệp tại FPT IS, xây dựng sản phẩm full-stack bằng C# (.NET 8), TypeScript, React, Flutter và Alibaba Cloud.", profile.bio)}</p>
                <a className="cv-link" href="/Le_Minh_Quang_CV_Software_Engineer_2026_Updated.pdf" target="_blank" rel="noreferrer">{t("XEM HỒ SƠ NĂNG LỰC", "VIEW MY CV")} <ArrowUpRight size={13} /></a>
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
        <div className="section-heading"><div><Label>02 / {t("DỰ ÁN TIÊU BIỂU", "3D ARCHITECTURE & PROJECTS")}</Label><h2>{t("SẢN PHẨM SỐ", "HIGH-DEPTH DIGITAL")}<br /><span>{t("VỚI CHIỀU SÂU KỸ THUẬT.", "ENGINEERING.")}</span></h2></div><p>{t("Mỗi hệ thống được xây dựng với kiến trúc rõ ràng: CMS phân tán, nền tảng đa thiết bị và mô hình AI matching.", "Each system engineered with clean architectural depth: distributed CMS workflows, cross-platform cloud scaling, and AI matching engines.")}</p></div>
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

      <section className="proof section-pad" id="proof"><Label>05 / {t("MỘT VÀI CON SỐ", "A FEW NUMBERS")}</Label><div className="proof-grid">{profile.stats.map((stat, index) => <div key={`stat-${index}`} className="proof-item"><span>0{index + 1}</span><strong>{stat.value}</strong><p>{t((["Ứng dụng đã phát triển", "Website đã phát triển", "Ứng dụng đã phát hành", "Tổng dự án"])[index], stat.label)}</p></div>)}</div></section>

      <section className="credentials section-pad" id="certificates">
        <div className="credentials-intro"><Label>06 / {t("HỌC VẤN & CHỨNG CHỈ", "EDUCATION & CREDENTIALS")}</Label><h2>{t("NỀN TẢNG", "BUILT ON")}<br /><span>{t("VỮNG CHẮC.", "GOOD FOUNDATIONS.")}</span></h2><div className="education"><GraduationCap size={22} /><div><h3>{t("Đại học Bách Khoa TP. Hồ Chí Minh", "Ho Chi Minh City University of Technology")}</h3><p>{t("Công nghệ Thông tin", "Information Technology")} · 2022–2026 · GPA 3.43 / 4.0</p></div></div></div>
        <div className="credential-list">{profile.certificates.map((cert, index) => <a key={`cert-${index}`} href={cert.link} target="_blank" rel="noreferrer"><Image src={cert.img} alt="" width={42} height={42} className="credential-image" /><span className="credential-main"><strong>{cert.name}</strong><small>{cert.issuer} · {cert.date}</small><em>{language === "vi" ? cert.desc : certificateDescriptions[cert.name]}</em></span><ArrowUpRight size={16} /></a>)}</div>
      </section>

      <section className="services section-pad" id="services"><div className="section-heading"><div><Label>07 / {t("DỊCH VỤ & HỢP TÁC", "SERVICES & COLLABORATION")}</Label><h2>{t("TỪ Ý TƯỞNG", "FROM CONCEPT")}<br /><span>{t("ĐẾN SẢN PHẨM THẬT.", "TO PRODUCTION.")}</span></h2></div><p>{t("Cung cấp dịch vụ phát triển phần mềm toàn diện: Web/Mobile apps, kiến trúc backend phân tán và AI automation.", "Full-cycle development across web, cross-platform mobile apps, backend systems, and AI automation.")}</p></div>
        <div className="service-rows">{[
          [t("ỨNG DỤNG WEB CAO CẤP", "WEB APPLICATIONS"), t("Landing page, hệ thống quản trị và Web App full-stack với Next.js và React, tối ưu SEO và tốc độ tải trang cao nhất.", "High-performance dashboards, web applications, and landing pages with Next.js, tailored for speed.")],
          [t("MOBILE & ỨNG DỤNG HYBRID", "MOBILE & HYBRID"), t("Xây dựng trải nghiệm mượt mà trên iOS & Android với Flutter, React Native và kiến trúc WebView tối ưu.", "Seamless iOS & Android apps with Flutter, React Native, and hybrid WebView bridges.")],
          [t("HỆ THỐNG, AI & PHÁT HÀNH", "SYSTEMS, AI & RELEASE"), t("Thiết kế REST API bảo mật, tích hợp AI Agents/MCP và hỗ trợ phát hành trực tiếp lên Google Play/App Store.", "Secure REST APIs, AI agent integration, and hands-on Google Play / App Store publishing support.")],
        ].map(([title, description], index) => <article key={`svc-${index}`}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p><ArrowUpRight size={17} /></article>)}</div>
      </section>

      <section className="contact" id="contact"><div className="contact-top"><Label>08 / {t("LIÊN HỆ", "GET IN TOUCH")}</Label><span>HO CHI MINH CITY · VN</span></div><h2>{t("CÙNG HIỆN THỰC HÓA", "LET’S BUILD SOMETHING")}<br /><a href="mailto:lmquang.devops@gmail.com">{t("Ý TƯỞNG CỦA BẠN.", "REMARKABLE TOGETHER.")} <ArrowUpRight className="contact-arrow" /></a></h2><div className="contact-bottom"><a className="email-link" href="mailto:lmquang.devops@gmail.com"><Mail size={17} /> lmquang.devops@gmail.com</a><div className="socials"><a href="https://github.com/lmQuanGGGG" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a></div></div><footer><span>© {new Date().getFullYear()} LE MINH QUANG</span><a href="#top">BACK TO TOP ↑</a><span>SOFTWARE ENGINEER · VIETNAM</span></footer></section>
      <ScrollChoreography language={language} />
    </main>
  );
}
