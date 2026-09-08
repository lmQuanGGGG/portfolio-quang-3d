"use client";
import { motion, useScroll, useSpring } from "framer-motion"; // Import thêm useScroll, useSpring
import Scene3D from "@/components/Scene3D";
import { Code2, Smartphone, Rocket, Search, Layout, Database, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

// Metadata chuẩn SEO (Next.js App Router hỗ trợ export metadata, nhưng ở client component ta dùng cách khác hoặc bỏ qua trong demo này)
// Trong thực tế, bạn nên chuyển phần này sang layout.tsx hoặc dùng server component để SEO tốt nhất.

// --- COMPONENT HIỆU ỨNG ---
function Reveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
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
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Xây dựng ứng dụng di động đa nền tảng mượt mà với Flutter hoặc React Native, tối ưu trải nghiệm người dùng.|||Smooth cross-platform mobile apps with Flutter or React Native, optimized for user experience.",
    tags: ["iOS", "Android", "Cross-platform", "App Store Optimization"],
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Database,
    title: "System & Backend API",
    desc: "Thiết kế backend mạnh mẽ, bảo mật, có khả năng mở rộng; tích hợp database và API RESTful/GraphQL.|||Secure, scalable backend systems with database and RESTful/GraphQL API integration.",
    tags: ["Node.js", ".NET", "Database Design", "Cloud AWS/Azure"],
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Search,
    title: "SEO & Performance",
    desc: "Tối ưu SEO và Core Web Vitals để website dễ tìm thấy hơn, tải nhanh hơn và giữ chân khách hàng.|||SEO and Core Web Vitals optimization for better discoverability, speed and retention.",
    tags: ["Technical SEO", "Speed Optimization", "Analytics", "Audit"],
    color: "from-orange-500 to-red-500"
  }
];

const process = [
  { step: "01", title: "Discovery", desc: "Thảo luận yêu cầu, phân tích đối thủ và xác định mục tiêu dự án.|||Discuss requirements, study the landscape and define project goals." },
  { step: "02", title: "Design", desc: "Lên ý tưởng, wireframe và thiết kế UI/UX chi tiết để chốt giao diện.|||Create concepts, wireframes and detailed UI/UX direction." },
  { step: "03", title: "Development", desc: "Lập trình theo tiêu chuẩn clean code và bảo mật cao.|||Build with clean-code and high security standards." },
  { step: "04", title: "Deploy & Support", desc: "Triển khai, kiểm thử và bảo trì/nâng cấp dài hạn.|||Deploy, test and provide long-term maintenance and upgrades." },
];

export default function ServicesPage() {
  const { language } = useLanguage();
  const t = (vi: string, en: string) => language === "vi" ? vi : en;
  const localize = (value: string) => { const [vi, en] = value.split("|||"); return language === "vi" ? vi : (en || vi); };
  // --- THÊM LOGIC THANH TIẾN TRÌNH ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main className="relative min-h-screen text-white font-sans bg-black selection:bg-purple-500 selection:text-white overflow-hidden">
      
      {/* --- THANH TIẾN TRÌNH (PROGRESS BAR) --- */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Nền 3D */}
      <Scene3D />

      <div className="relative z-10 pt-32 pb-20 px-4 max-w-7xl mx-auto">
        
        {/* --- HERO SECTION --- */}
        <section className="text-center mb-32">
            <Reveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                    <Rocket size={16} className="text-purple-400"/>
                    <span className="text-sm font-medium text-gray-300">Elevate Your Digital Presence</span>
                </div>
            </Reveal>
            <Reveal delay={0.1}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                    Premium <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x">
                        Digital Solutions
                    </span>
                </h1>
            </Reveal>
            <Reveal delay={0.2}>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                    {t("Tôi cung cấp các giải pháp công nghệ toàn diện giúp doanh nghiệp của bạn bứt phá. Từ website tốc độ cao đến ứng dụng di động mượt mà, tất cả đều được may đo riêng cho bạn.", "I deliver end-to-end technology solutions that help your business move forward — from high-performance websites to polished mobile apps, tailored to your goals.")}
                </p>
            </Reveal>
            <Reveal delay={0.3}>
                <Link 
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 hover:bg-gray-200 transition shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                >
                    Start a Project <ArrowRight size={20}/>
                </Link>
            </Reveal>
        </section>

        {/* --- SERVICES GRID --- */}
        <section className="mb-32">
            <Reveal>
                <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
                    <h2 className="text-3xl md:text-4xl font-bold">My Services</h2>
                    <p className="text-gray-500 hidden md:block">What I can do for you</p>
                </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, i) => (
                    <Reveal key={i} delay={i * 0.1}>
                        <div className="group h-full bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                            {/* Hover Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                            
                            <div className="relative z-10">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} p-[1px] mb-6`}>
                                    <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center">
                                        <service.icon size={28} className="text-white"/>
                                    </div>
                                </div>
                                
                                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                <p className="text-gray-400 mb-6 leading-relaxed">{localize(service.desc)}</p>
                                
                                <div className="flex flex-wrap gap-2">
                                    {service.tags.map((tag, idx) => (
                                        <span key={idx} className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-gray-300">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>

        {/* --- WORKING PROCESS --- */}
        <section className="mb-32">
            <Reveal>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Workflow Process</h2>
                    <p className="text-gray-400">{t("Quy trình làm việc chuyên nghiệp, minh bạch và hiệu quả.", "A professional, transparent and effective delivery process.")}</p>
                </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                {/* Connecting Line (Desktop only) */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                {process.map((step, i) => (
                    <Reveal key={i} delay={i * 0.15}>
                        <div className="relative pt-8 md:pt-16 text-center group">
                            {/* Number Bubble */}
                            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-black border-2 border-white/20 rounded-full flex items-center justify-center text-xl font-bold mb-6 relative z-10 group-hover:border-purple-500 group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                {step.step}
                            </div>
                            
                            <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">{step.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed px-2">{localize(step.desc)}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>

        {/* --- CTA / FOOTER --- */}
        <section className="text-center py-20 border-t border-white/10">
            <Reveal>
                <h2 className="text-4xl md:text-6xl font-bold mb-8">
                    Ready to start?
                </h2>
                <p className="text-gray-400 mb-10 max-w-xl mx-auto">
                    {t("Hãy để tôi giúp bạn biến ý tưởng thành hiện thực. Liên hệ ngay để nhận tư vấn miễn phí và báo giá chi tiết.", "Let’s turn your idea into a reliable product. Get in touch for a free consultation and detailed estimate.")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        href="/contact"
                        className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition"
                    >
                        Contact Me
                    </Link>
                    <a 
                        href="mailto:lmquang.devops@gmail.com"
                        className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition"
                    >
                        Email Me
                    </a>
                </div>
            </Reveal>
        </section>

      </div>
    </main>
  );
}
