"use client";

import { motion } from "framer-motion";
import Scene3D from "@/components/Scene3D";
import CleanParticleCanvas from "@/components/CleanParticleCanvas";
import Text3DDepth from "@/components/Text3DDepth";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Copy, Check, FileText } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import SectionScrub from "@/components/motion/SectionScrub";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ContactItem({
  text,
  icon: Icon,
  label,
  href,
  target = "_self",
}: {
  text: string;
  icon: any;
  label: string;
  href: string;
  target?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <a
      data-scrub-item
      href={href}
      target={target}
      className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-white/10 bg-[#0d1017]/70 p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:bg-white/10"
    >
      <div className="flex size-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition-colors group-hover:bg-white group-hover:text-black">
        <Icon size={22} />
      </div>
      <div className="flex-1">
        <p className="mb-0.5 text-xs font-semibold tracking-wider text-slate-400 uppercase">
          {label}
        </p>
        <p className="font-mono text-sm text-white md:text-base break-all">{text}</p>
      </div>

      <button
        onClick={handleCopy}
        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
        title="Copy content"
      >
        {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
      </button>
    </a>
  );
}

export default function ContactPage() {
  const { language } = useLanguage();
  const t = (vi: string, en: string) => (language === "vi" ? vi : en);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "project",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    setTimeout(() => {
      setFormStatus("success");

      const subjectLabels: Record<string, string> = {
        project: t("Hợp tác dự án", "Project collaboration"),
        hiring: t("Tuyển dụng", "Hiring"),
        technical: t("Trao đổi kỹ thuật", "Technical discussion"),
        other: t("Khác", "Other"),
      };
      const subject = encodeURIComponent(
        `[Portfolio Contact] ${subjectLabels[formData.subject]} - from ${formData.name}`
      );
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );

      window.location.href = `mailto:lmquang.devops@gmail.com?subject=${subject}&body=${body}`;
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07080a] font-sans text-white">
      <CleanParticleCanvas />
      <Scene3D />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pt-36 pb-24 sm:px-8">
        {/* Header */}
        <div className="mb-16 text-center" data-scrub-group>
          <Reveal>
            <div data-scrub-item className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
              <div className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
                {t("Sẵn sàng cho dự án mới", "Available for Projects & Full-time")}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Text3DDepth depth={12}>
              <h1 data-scrub-item className="text-3d-luxury text-5xl font-extrabold tracking-tight text-white md:text-7xl">
                {t("Kết Nối Hợp Tác", "Let's Connect")}
              </h1>
            </Text3DDepth>
          </Reveal>

          <Reveal delay={0.2}>
            <p data-scrub-item className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
              {t(
                "Bạn có ý tưởng hoặc bài toán cần phát triển? Đừng ngần ngại liên hệ để cùng trao đổi.",
                "Have an interesting initiative or need an engineer on your product? Feel free to reach out."
              )}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2" data-scrub-group>
          {/* Left Column: Contact info */}
          <div className="space-y-6">
            <Reveal delay={0.3}>
              <h2 data-scrub-item className="mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight text-white">
                <span className="h-1 w-6 rounded-full bg-white" />
                {t("Thông Tin Liên Hệ", "Contact Information")}
              </h2>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="space-y-4">
                <ContactItem
                  text="lmquang.devops@gmail.com"
                  icon={Mail}
                  label="Email"
                  href="mailto:lmquang.devops@gmail.com"
                />

                <ContactItem
                  text="0387412607"
                  icon={Phone}
                  label="Phone"
                  href="tel:0387412607"
                />

                <ContactItem
                  text={t("Xem CV (PDF)", "View CV (PDF)")}
                  icon={FileText}
                  label="Curriculum Vitae"
                  href="/CV-LeMinhQuang_Software_Engineer.pdf"
                  target="_blank"
                />

                <div data-scrub-item className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0d1017]/70 p-4 backdrop-blur-xl">
                  <div className="flex size-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-slate-300">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="mb-0.5 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                      Location
                    </p>
                    <p className="font-medium text-white">
                      {t("Thủ Đức, TP. Hồ Chí Minh", "Thu Duc, Ho Chi Minh City")}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <div data-scrub-item className="pt-6">
                <h3 className="mb-4 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  Social Profiles
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/lmQuanGGGG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-white/25 hover:bg-white/10"
                  >
                    <Github size={22} className="text-slate-400 transition-colors group-hover:text-white" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/minh-quang-lê-624148202"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-white/25 hover:bg-white/10"
                  >
                    <Linkedin size={22} className="text-slate-400 transition-colors group-hover:text-white" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Message Form */}
          <Reveal delay={0.4}>
            <div data-scrub-item className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d1017]/80 p-8 shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl md:p-10">
              <h2 className="relative z-10 mb-2 text-2xl font-bold tracking-tight text-white">
                {t("Gửi Tin Nhắn", "Send Message")}
              </h2>
              <p className="relative z-10 mb-8 text-sm text-slate-400">
                {t(
                  "Điền thông tin bên dưới để mở trình soạn thảo email trực tiếp.",
                  "Fill in the form to open your direct email composer."
                )}
              </p>

              <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="ml-1 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white transition-all focus:border-white/40 focus:outline-none"
                      placeholder={t("Tên của bạn", "Your name")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="ml-1 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white transition-all focus:border-white/40 focus:outline-none"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="ml-1 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full cursor-pointer rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white transition-all focus:border-white/40 focus:outline-none"
                  >
                    <option value="project" className="bg-[#0d1017]">
                      {t("Hợp tác dự án", "Project collaboration")}
                    </option>
                    <option value="hiring" className="bg-[#0d1017]">
                      {t("Tuyển dụng", "Hiring")}
                    </option>
                    <option value="technical" className="bg-[#0d1017]">
                      {t("Trao đổi kỹ thuật", "Technical discussion")}
                    </option>
                    <option value="other" className="bg-[#0d1017]">
                      {t("Khác", "Other")}
                    </option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="ml-1 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white transition-all focus:border-white/40 focus:outline-none"
                    placeholder={t("Nội dung tin nhắn...", "Your message...")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus !== "idle"}
                  className="button-primary w-full py-3.5 text-center"
                >
                  {formStatus === "idle" && (
                    <>
                      {t("Mở ứng dụng Mail", "Open Mail App")} <Send size={16} />
                    </>
                  )}
                  {formStatus === "submitting" && (
                    <div className="size-5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                  )}
                  {formStatus === "success" && (
                    <>
                      {t("Đang chuyển hướng...", "Redirecting...")} <Check size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
      <SectionScrub />
    </main>
  );
}
