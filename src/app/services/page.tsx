"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Scene3D from "@/components/Scene3D";
import CleanParticleCanvas from "@/components/CleanParticleCanvas";
import Text3DDepth from "@/components/Text3DDepth";
import {
  Code2,
  Smartphone,
  Rocket,
  Search,
  Layout,
  Database,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import SectionScrub from "@/components/motion/SectionScrub";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const services = [
  {
    icon: Layout,
    title: "Web Design & Development",
    desc: "Thiết kế Website chuẩn UX/UI, responsive trên mọi thiết bị với Next.js và React để đảm bảo tốc độ và hiệu năng.|||UX/UI-focused responsive websites built with Next.js and React for speed and performance.",
    tags: ["Landing Page", "E-commerce", "Portfolio", "Dashboard"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Xây dựng ứng dụng di động đa nền tảng mượt mà với Flutter hoặc React Native, tối ưu trải nghiệm người dùng.|||Smooth cross-platform mobile apps with Flutter or React Native, optimized for user experience.",
    tags: ["iOS", "Android", "Cross-platform", "App Store Optimization"],
  },
  {
    icon: Database,
    title: "System & Backend API",
    desc: "Thiết kế backend mạnh mẽ, bảo mật, có khả năng mở rộng; tích hợp database và API RESTful/GraphQL.|||Secure, scalable backend systems with database and RESTful/GraphQL API integration.",
    tags: ["Node.js", ".NET", "Database Design", "Cloud AWS/Alibaba"],
  },
  {
    icon: Sparkles,
    title: "AI Workflows & Automation",
    desc: "Tích hợp mô hình AI, MCP Agent workflows và tự động hóa quy trình vận hành doanh nghiệp.|||AI model integration, MCP Agent workflows, and automated enterprise operations.",
    tags: ["LLM Apps", "MCP Protocols", "Automation", "Workflow Engineering"],
  },
];

const process = [
  {
    step: "01",
    title: "Discovery",
    desc: "Thảo luận yêu cầu, phân tích đối thủ và xác định mục tiêu dự án.|||Discuss requirements, study the landscape and define project goals.",
  },
  {
    step: "02",
    title: "Architecture",
    desc: "Lên ý tưởng, wireframe và thiết kế UI/UX chi tiết để chốt giao diện.|||Create concepts, wireframes and detailed UI/UX direction.",
  },
  {
    step: "03",
    title: "Development",
    desc: "Lập trình theo tiêu chuẩn clean code và bảo mật cao.|||Build with clean-code and high security standards.",
  },
  {
    step: "04",
    title: "Deploy & Scale",
    desc: "Triển khai, kiểm thử và bảo trì/nâng cấp dài hạn.|||Deploy, test and provide long-term maintenance and upgrades.",
  },
];

export default function ServicesPage() {
  const { language } = useLanguage();
  const t = (vi: string, en: string) => (language === "vi" ? vi : en);
  const localize = (value: string) => {
    const [vi, en] = value.split("|||");
    return language === "vi" ? vi : en || vi;
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07080a] font-sans text-white">
      {/* Sleek Progress Bar */}
      <motion.div
        className="fixed top-0 right-0 left-0 z-50 h-[2px] origin-left bg-gradient-to-r from-slate-400 via-white to-slate-400 shadow-[0_0_10px_#ffffff]"
        style={{ scaleX }}
      />

      <CleanParticleCanvas />
      <Scene3D />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-36 pb-24 sm:px-8">
        {/* Hero Section */}
        <section className="mb-32 text-center" data-scrub-group>
          <Reveal>
            <div data-scrub-item className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
              <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
                {t("Dịch vụ phần mềm chuyên nghiệp", "Premium Engineering Services")}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Text3DDepth depth={12}>
              <h1 data-scrub-item className="text-3d-luxury text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl">
                {t("Giải Pháp Số", "Digital Solutions")} <br />
                <span className="text-gradient-titanium">
                  {t("Chuẩn Mực & Tin Cậy", "Built with Precision")}
                </span>
              </h1>
            </Text3DDepth>
          </Reveal>

          <Reveal delay={0.2}>
            <p data-scrub-item className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">
              {t(
                "Tôi cung cấp các giải pháp công nghệ toàn diện giúp doanh nghiệp của bạn bứt phá: từ website tốc độ cao, ứng dụng di động mượt mà đến tự động hóa AI.",
                "I deliver end-to-end technology solutions that help your business move forward — from high-performance web products to polished mobile apps and AI automation."
              )}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div data-scrub-item className="mt-9 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="button-primary">
                {t("Bắt đầu dự án", "Start a Project")} <ArrowRight size={17} />
              </Link>
              <a href="mailto:lmquang.devops@gmail.com" className="button-secondary">
                {t("Gửi Email", "Email Direct")}
              </a>
            </div>
          </Reveal>
        </section>

        {/* Services Grid */}
        <section className="mb-32" data-scrub-group>
          <Reveal>
            <div data-scrub-item className="mb-14 flex items-end justify-between border-b border-white/10 pb-6">
              <div>
                <p className="eyebrow-luxury">{t("Lĩnh vực chuyên sâu", "Capabilities")}</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
                  {t("Dịch Vụ Phát Triển", "Core Services")}
                </h2>
              </div>
              <p className="hidden font-mono text-xs text-slate-400 md:block">
                END-TO-END DELIVERY
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {services.map((service, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div data-scrub-item className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d1017]/70 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:shadow-[0_25px_60px_rgba(255,255,255,0.05)]">
                  <div className="mb-6 flex size-14 items-center justify-center rounded-xl border border-white/15 bg-white/5 transition-transform duration-300 group-hover:scale-105">
                    <service.icon size={26} className="text-white" />
                  </div>

                  <h3 className="mb-3 text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-slate-100">
                    {service.title}
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-slate-400">
                    {localize(service.desc)}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded-lg border border-white/5 bg-white/5 px-3 py-1 font-mono text-xs text-slate-300 transition-colors group-hover:border-white/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Workflow Process */}
        <section className="mb-32" data-scrub-group>
          <Reveal>
            <div data-scrub-item className="mb-16 text-center">
              <p className="eyebrow-luxury">{t("Phương pháp", "Methodology")}</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-5xl">
                {t("Quy Trình Triển Khai", "Delivery Process")}
              </h2>
              <p className="mt-3 text-slate-400">
                {t(
                  "Quy trình làm việc chuyên nghiệp, minh bạch và tập trung vào chất lượng kỹ thuật.",
                  "A disciplined, transparent, and quality-driven engineering process."
                )}
              </p>
            </div>
          </Reveal>

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
            {process.map((step, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div data-scrub-item className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md transition-all duration-300 hover:border-white/25">
                  <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full border border-white/20 bg-black font-mono text-lg font-bold text-white transition-transform duration-300 group-hover:scale-110">
                    {step.step}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-400">{localize(step.desc)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/10 pt-20 text-center" data-scrub-group>
          <Reveal>
            <h2 data-scrub-item className="text-3d-luxury text-4xl font-extrabold tracking-tight text-white md:text-6xl">
              {t("Sẵn sàng xây dựng?", "Ready to build?")}
            </h2>
            <p data-scrub-item className="mx-auto mt-4 mb-10 max-w-xl text-slate-400">
              {t(
                "Hãy cùng tôi biến ý tưởng thành hiện thực với giải pháp công nghệ bền vững và hiệu quả nhất.",
                "Let’s turn your vision into a robust, high-performance product."
              )}
            </p>
            <div data-scrub-item className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="button-primary">
                {t("Liên hệ ngay", "Contact Me")}
              </Link>
              <a href="mailto:lmquang.devops@gmail.com" className="button-secondary">
                {t("Email trao đổi", "Email Direct")}
              </a>
            </div>
          </Reveal>
        </section>
      </div>
      <SectionScrub />
    </main>
  );
}
