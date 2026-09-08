"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Github,
  GraduationCap,
  Mail,
  MapPin,
} from "lucide-react";
import { profile } from "./data";
import HeartCanvas from "@/components/HeartCanvas";
import AboutTerminal from "@/components/AboutTerminal";
import ExperienceIndex from "@/components/ExperienceIndex";
import ExperienceConstellation from "@/components/ExperienceConstellation";
import { useLanguage } from "@/components/LanguageProvider";

const reveal = {
  hidden: { opacity: 0, y: 42, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] as const } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 90, scale: 0.76, rotateX: 14, rotateZ: -2.5, filter: "blur(14px)" },
  visible: { opacity: 1, y: 0, scale: 1, rotateX: 0, rotateZ: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 105, damping: 13, mass: 0.85 } },
};

const titleReveal = {
  hidden: { opacity: 0, y: 55, scale: 0.9, skewY: 4, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, scale: 1, skewY: 0, filter: "blur(0px)", transition: { duration: 0.78, ease: [0.16, 1, 0.3, 1] as const } },
};

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} className="max-w-2xl">
      <motion.p variants={reveal} className="eyebrow">{eyebrow}</motion.p>
      <motion.h2 variants={titleReveal} className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">{title}</motion.h2>
      <motion.p variants={reveal} transition={{ delay: 0.16 }} className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">{description}</motion.p>
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />;
}

export default function Home() {
  const { language } = useLanguage();
  const t = (vi: string, en: string) => language === "vi" ? vi : en;
  const localize = (value: string) => {
    const [vi, en] = value.split("|||");
    return language === "vi" ? vi : (en || vi);
  };
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 130]);
  const badgeRotateX = useTransform(scrollY, [0, 360, 900], [0, 10, -8]);
  const badgeFlip = useTransform(scrollY, [80, 640], [0, 180]);
  const badgeScale = useTransform(scrollY, [0, 360, 900], [1, .91, 1.04]);
  const badgeY = useTransform(scrollY, [0, 360, 900], [0, -30, 14]);
  return (
    <main className={`site-shell overflow-hidden bg-[#fbfcfe] text-slate-900 ${language === "vi" ? "lang-vi" : "lang-en"}`}>
      <ScrollProgress />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grid-noise" />
      <div className="background-heart"><HeartCanvas /></div>
      <div className="scatter scatter-one" /><div className="scatter scatter-two" /><div className="scatter scatter-three" />

      <motion.section style={{ y: heroY }} className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 pb-20 pt-12 sm:px-8 sm:pt-20 lg:px-10">
        <div className="grid w-full items-center gap-14 lg:-translate-y-10 lg:grid-cols-[1.1fr_.9fr]">
          <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.1 }}>
            <motion.p variants={reveal} className="eyebrow mt-7">{t("Kỹ sư phần mềm · TP. Hồ Chí Minh", "Software Engineer · Ho Chi Minh City")}</motion.p>
            <motion.h1 variants={titleReveal} className="mt-4 max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-7xl lg:text-[5.7rem] lg:leading-[1.03]">
              {t("Xây hệ thống giúp", "Engineering systems that")} <span className="text-gradient">{t("ý tưởng tiến về phía trước.", "move ideas forward.")}</span>
            </motion.h1>
            <motion.p variants={reveal} className="mt-7 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
              {t("Tôi là Lê Minh Quang, kỹ sư phần mềm xây nền tảng doanh nghiệp, sản phẩm full-stack và AI automation.", "I'm Le Minh Quang, a software engineer building enterprise platforms, full-stack products and AI-assisted automation.")}
            </motion.p>
            <motion.div variants={reveal} className="mt-9 flex flex-wrap gap-3">
              <a href="#experience" className="button-primary">{t("Khám phá công việc", "Explore my work")} <ArrowDownRight size={18} /></a>
              <a href="/CV-LeMinhQuang_Software_Engineer.pdf" target="_blank" className="button-secondary">{t("Xem CV", "View CV")} <ArrowUpRight size={17} /></a>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative mx-auto w-full max-w-md lg:max-w-[28rem]">
            <div className="portrait-orbit" />
            <div className="lanyard" aria-hidden="true"><span className="lanyard-loop" /><span className="lanyard-clip" /></div>
            <motion.div style={{ rotateX: badgeRotateX, rotateY: badgeFlip, scale: badgeScale, y: badgeY }} className="badge-flip">
              <div className="hero-photo-card badge-face badge-front">
                <span className="badge-hole" aria-hidden="true"><i /></span>
                <div className="badge-header"><span className="badge-mark">LMQ.</span><span>EMPLOYEE ID · 2026</span></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/quang-portrait.png" alt={t("Lê Minh Quang", "Le Minh Quang")} />
                <div className="badge-glare" aria-hidden="true" />
                <div className="hero-photo-caption"><span><small>PRODUCT · CLOUD · CI/CD</small>{t("Lê Minh Quang", "Le Minh Quang")}</span><span><small>ROLE</small>{t("Kỹ sư Full-stack & Cloud", "Full-stack & Cloud Engineer")}</span></div>
              </div>
              <div className="badge-face badge-back">
                <span className="badge-hole" aria-hidden="true"><i /></span>
                <div className="badge-back-top"><span className="badge-mark">LMQ.</span><span>ID / BACKSIDE</span></div>
                <div className="badge-back-center"><p>{t("HỆ THỐNG · SẢN PHẨM · CLOUD", "SYSTEMS · PRODUCT · CLOUD")}</p><h3>{t("Kỹ sư phần mềm", "Software Engineer")}</h3><div className="badge-code" aria-label="Identification code"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div>
                <div className="badge-back-bottom"><span>LMQ / 2026</span><span>BUILD · SHIP · SCALE</span></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.65 }} variants={reveal} id="about" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow={t("Giới thiệu", "About me")} title={t("Hệ thống thực tế, được xây dựng chỉn chu.", "Practical systems, built with care.")} description={t("Tôi biến yêu cầu sản phẩm thành phần mềm dễ bảo trì: từ nền tảng doanh nghiệp, REST API đến AI automation đáng tin cậy.", "I turn product requirements into maintainable software: from enterprise platforms and REST APIs to reliable AI automation workflows.")} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [t("Ngôn ngữ", "Languages"), "C#, TypeScript, JavaScript, Dart, Python, SQL"],
              [t("Phát triển", "Development"), "React, Next.js, React Native, Flutter, ASP.NET Core"],
              [t("Dữ liệu & triển khai", "Data & delivery"), "SQL Server, PostgreSQL, Firebase, Docker, CI/CD"],
              [t("AI & tự động hóa", "AI & automation"), "LLM apps, agents, MCP, RAG, tool calling"],
            ].map(([title, copy], index) => (
              <motion.article key={title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} transition={{ delay: index * 0.1 }} variants={cardReveal} className="soft-card p-6">
                <p className="text-sm font-semibold text-slate-900">{title}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p>
              </motion.article>
            ))}
          </div>
        </div>
        <div className="mt-10 lg:mt-12"><AboutTerminal language={language} /></div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.14 }} transition={{ duration: 0.65 }} variants={reveal} id="experience" className="relative border-y border-slate-200/80 bg-white/60 px-5 py-24 backdrop-blur-sm sm:px-8 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="relative"><SectionHeading eyebrow={t("Kinh nghiệm", "Experience")} title={t("Thực chiến cùng đội ngũ doanh nghiệp và sản phẩm.", "Hands-on across enterprise and product teams.")} description={t("Những kinh nghiệm trong CV, tập trung vào trách nhiệm và kết quả quan trọng nhất.", "The work in my CV, distilled into the responsibilities and outcomes I care about most.")} /><div className="absolute right-0 top-[-1.75rem] hidden lg:block"><ExperienceConstellation /></div></div>
          <div className="mt-14 divide-y divide-slate-200 border-y border-slate-200">
            {profile.experience.map((job, index) => (
              <motion.article key={job.company} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ delay: index * 0.12 }} variants={cardReveal} className="experience-row grid gap-5 py-9 md:grid-cols-[180px_1fr_auto] md:gap-10">
                  <div><p className="text-sm font-medium text-slate-900">{job.company}</p><p className="mt-1 text-sm text-slate-500">{localize(job.period)}</p></div>
                <div><h3 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">{localize(job.role)}</h3><p className="mt-2 text-sm font-medium text-indigo-600">{localize(job.project)}</p><ul className="mt-4 max-w-2xl space-y-2 text-slate-600">{localize(job.description).split("\n").map((item) => <li key={item} className="flex gap-3 leading-7"><span className="mt-3 size-1.5 shrink-0 rounded-full bg-indigo-400" />{item}</li>)}</ul></div>
                <div className="hidden self-start md:block"><ExperienceIndex value={index + 1} /></div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65 }} variants={reveal} className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
          <SectionHeading eyebrow={t("Dự án tiêu biểu", "Selected work")} title={t("Những sản phẩm tôi đã góp phần xây dựng.", "Products I've helped shape.")} description={t("Phần mềm doanh nghiệp, hệ thống AI và các sản phẩm end-to-end từ CV hiện tại.", "Enterprise software, AI-enabled systems and end-to-end products from my current CV.")} />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {profile.projects.map((project, index) => (
            <motion.a key={project.title} href={project.link} target={project.link.startsWith("http") ? "_blank" : undefined} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.24 }} transition={{ delay: (index % 3) * 0.1 }} variants={cardReveal} className="project-card group" aria-label={`Open ${project.title}`}>
              <div className="flex items-start justify-between"><span className="project-index">0{index + 1}</span>{project.link !== "#" && <ArrowUpRight size={19} className="text-slate-400 transition group-hover:text-indigo-600" />}</div>
              <div className="mt-16"><h3 className="text-xl font-semibold tracking-[-0.035em] text-slate-950">{project.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{localize(project.desc)}</p></div>
              <div className="mt-7 flex flex-wrap gap-2">{project.tech.split(", ").map((tech) => <span key={tech} className="tag">{tech}</span>)}</div>
            </motion.a>
          ))}
        </div>
      </motion.section>

      <section id="certificates" className="relative bg-slate-950 px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_.9fr] lg:items-end">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}><motion.p variants={reveal} className="eyebrow text-indigo-300">{t("Học vấn & chứng chỉ", "Education & credentials")}</motion.p><motion.h2 variants={titleReveal} className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">{t("Học hỏi công khai, triển khai thực tế.", "Learning in public, shipping in practice.")}</motion.h2><motion.div variants={reveal} className="mt-9 flex items-start gap-4 text-slate-300"><GraduationCap className="mt-1 text-indigo-300" /><p>{t("Đại học Bách Khoa TP. Hồ Chí Minh", "Ho Chi Minh City University of Technology")}<br /><span className="text-sm text-slate-400">{t("Công nghệ Thông tin", "Information Technology")} · 2022 - 2026 · GPA 3.43 / 4.0</span></p></motion.div></motion.div>
          <div className="grid gap-3">{profile.certificates.map((certificate, index) => <motion.a initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={cardReveal} transition={{ delay: index * 0.08 }} key={certificate.name} href={certificate.link} target="_blank" className="certificate-item flex items-center justify-between rounded-2xl bg-white/5 px-5 py-4 transition hover:bg-white/10"><div><p className="font-medium">{certificate.name}</p><p className="mt-1 text-sm text-slate-400">{certificate.issuer}</p></div><Check size={18} className="text-emerald-300" /></motion.a>)}</div>
        </div>
      </section>

      <section id="services-contact" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
          <SectionHeading eyebrow={t("Dịch vụ", "Services")} title={t("Từ ý tưởng đến bản phát hành đáng tin cậy.", "From an idea to a dependable release.")} description={t("Từ sản phẩm web, mobile tới AI workflow và hỗ trợ phát hành App Store hoặc Google Play.", "From web and mobile products to AI workflows and App Store or Google Play publishing support.")} />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            [t("Ứng dụng web", "Web applications"), t("Landing page, dashboard và web full-stack nhanh, rõ ràng.", "Landing pages, dashboards and full-stack web products built for speed and clarity.")],
            ["Mobile & hybrid", t("Flutter, React Native và WebView cho trải nghiệm mobile liền mạch.", "Flutter, React Native and WebView experiences for cohesive mobile products.")],
            [t("Hệ thống, AI & phát hành", "Systems, AI & publishing"), t("REST API, AI workflow và hỗ trợ phát hành App Store / Google Play.", "REST APIs, AI-assisted workflows and hands-on App Store / Google Play delivery support.")],
          ].map(([title, description], index) => <motion.article initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={cardReveal} transition={{ delay: index * 0.1 }} key={title} className="soft-card p-6"><p className="text-lg font-semibold text-slate-950">{title}</p><p className="mt-3 text-sm leading-6 text-slate-600">{description}</p></motion.article>)}
        </div>
        <div className="contact-panel mt-5"><div><p className="eyebrow">{t("Kết nối", "Let's connect")}</p><h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">{t("Có bài toán sản phẩm hoặc tự động hóa?", "Have a product or automation challenge?")}</h2><p className="mt-5 max-w-xl leading-7 text-slate-600">{t("Tôi luôn sẵn sàng trao đổi về kỹ thuật phần mềm, sản phẩm full-stack và AI workflow.", "I'm open to conversations about software engineering, full-stack products and AI-assisted workflows.")}</p></div><div className="flex flex-wrap gap-3"><Link className="button-primary" href="/contact"><Mail size={17} /> {t("Liên hệ", "Contact")}</Link><Link className="button-secondary" href="/services">{t("Xem dịch vụ", "View services")} <ArrowUpRight size={17} /></Link><a className="button-secondary" href="https://github.com/lmQuanGGGG" target="_blank"><Github size={17} /> GitHub</a></div></div>
      </section>

      <footer className="relative border-t border-slate-200 px-5 py-8 sm:px-8 lg:px-10"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-sm text-slate-500"><span>© {new Date().getFullYear()} {t("Lê Minh Quang", "Le Minh Quang")}</span><span className="flex items-center gap-1"><MapPin size={14} /> Ho Chi Minh City, Vietnam</span></div></footer>
    </main>
  );
}
