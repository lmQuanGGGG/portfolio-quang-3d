"use client";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import Scene3D from "@/components/Scene3D";
import { profile } from "./data";
import { Github, Code2, Award, ArrowDown, ExternalLink, User, Cpu, Database, Smartphone, Terminal, Briefcase, Layers, ShieldCheck, Mail, Rocket } from "lucide-react";
import SciFiCarousel from "@/components/SciFiCarousel";
import Link from "next/link";

// --- COMPONENT HIỆU ỨNG ---
function Reveal({ children, delay = 0, width = "100%" }: { children: React.ReactNode, delay?: number, width?: "100%" | "auto" }) {
  return (
    <motion.div
      style={{ width }}
      initial={{ opacity: 0, y: 50, scale: 0.95, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ParallaxText({ children, yProgress, speed = 1 }: { children: React.ReactNode, yProgress: MotionValue<number>, speed?: number }) {
  const y = useTransform(yProgress, [0, 1], [0, speed * 100]);
  return <motion.div style={{ y }}>{children}</motion.div>;
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main className="relative min-h-screen text-white font-sans bg-black selection:bg-purple-500 selection:text-white">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 origin-left z-50" style={{ scaleX }} />

      <Scene3D />

      <div className="relative z-10">

        {/* --- SECTION 1: HERO --- */}
        <section className="min-h-screen flex flex-col justify-center px-4 pt-32 pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* CỘT TRÁI: ẢNH CHÂN DUNG 3:4 */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center lg:justify-end">
              <Reveal delay={0.2}>
                <div className="relative w-64 md:w-80 lg:w-96 aspect-[3/4] group mx-auto lg:mx-0">
                  {/* Viền Neon phía sau */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>

                  {/* Khung ảnh */}
                  <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 bg-gray-900 shadow-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/hero-portrait.jpg"
                      alt="Le Minh Quang"
                      className="w-full h-full object-cover scale-105 group-hover:scale-110 transition duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* CỘT PHẢI: NỘI DUNG TEXT */}
            <div className="lg:col-span-7 order-1 lg:order-2 text-center lg:text-left">
              <ParallaxText yProgress={scrollYProgress} speed={-1}>
                <div className="space-y-6">
                  <Reveal delay={0.1}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition cursor-default mx-auto lg:mx-0">
                      <div className="relative">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute opacity-75"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full relative"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-300">System Online • Ready to Deploy</span>
                    </div>
                  </Reveal>

                  <Reveal delay={0.2}>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-normal mb-4 leading-relaxed py-2">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x block pb-1">
                        {profile.name}
                      </span>
                    </h1>
                  </Reveal>

                  <Reveal delay={0.3}>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto lg:mx-0">
                      {profile.role} • <span className="text-white">TypeScript</span> • Super App Platform
                    </p>
                  </Reveal>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 max-w-2xl mx-auto lg:mx-0">
                    {profile.stats.map((stat, i) => (
                      <Reveal key={i} delay={0.4 + i * 0.1}>
                        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-purple-500/50 transition-all hover:-translate-y-1 flex flex-col items-center justify-center h-full">
                          <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                          <div className="text-[10px] md:text-xs uppercase tracking-wider text-gray-500">{stat.label}</div>
                        </div>
                      </Reveal>
                    ))}
                  </div>

                  <Reveal delay={0.8}>
                    <div className="flex justify-center lg:justify-start gap-4 pt-8">
                      <a href="#about" className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        About Me <ArrowDown size={18} />
                      </a>
                      <a href="https://github.com/lmQuanGGGG" target="_blank" className="px-8 py-3 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition flex items-center gap-2 backdrop-blur-md">
                        <Github size={20} /> GitHub
                      </a>
                      <a href="/EL-CV-Fresher Software Engineer.pdf" target="_blank" className="px-8 py-3 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition flex items-center gap-2 backdrop-blur-md">
                        CV
                      </a>
                    </div>
                  </Reveal>
                </div>
              </ParallaxText>
            </div>

          </div>
        </section>

        {/* --- SECTION 2: ABOUT & SKILLS --- */}
        <section id="about" className="py-32 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold flex items-center justify-center lg:justify-start gap-3 mb-6">
                  <User className="text-cyan-400" size={48} />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">About Profile</span>
                </h2>
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed text-center lg:text-left">
                  <p className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                    "👋 Tôi là <strong className="text-white">Lê Minh Quang</strong> — Software Engineer tập trung vào kiến trúc Mini App cho Super App.
                    Tôi ưu tiên hệ thống <span className="text-purple-400">ổn định, mở rộng tốt và tối ưu trải nghiệm thực thi</span>."
                  </p>
                  <p>
                    Tại FPT IS, tôi xây dựng web quản lý Mini App cho Lightbase và tham gia tối ưu app Lightbase theo hướng hybrid.
                    Trọng tâm công việc là TypeScript architecture, đồng bộ phân phối bất đồng bộ, RBAC bảo mật và tối ưu bridge WebView để giảm độ trễ.
                  </p>
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal delay={0.2}>
                <h3 className="text-2xl font-bold mb-6 flex items-center justify-center lg:justify-start gap-2">
                  <Cpu className="text-purple-500" /> Technical Arsenal
                </h3>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Skill Groups - Đã xóa các class căn giữa (justify-center, text-center) */}
                <Reveal delay={0.3}>
                  <div className="p-5 bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/20 rounded-2xl hover:border-purple-500/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><Cpu size={20} /></div>
                      <h4 className="font-bold">Core Architecture</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• TypeScript domain modeling</li>
                      <li>• Modular component architecture</li>
                      <li>• Next.js App Router</li>
                      <li>• Lifecycle state orchestration</li>
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={0.4}>
                  <div className="p-5 bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/20 rounded-2xl hover:border-blue-500/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Smartphone size={20} /></div>
                      <h4 className="font-bold">Hybrid Runtime</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• React Native Super App shell</li>
                      <li>• SvelteKit integration layer</li>
                      <li>• WebView rendering optimization</li>
                      <li>• React Native</li>
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={0.5}>
                  <div className="p-5 bg-gradient-to-br from-green-900/20 to-black border border-green-500/20 rounded-2xl hover:border-green-500/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-green-500/20 rounded-lg text-green-400"><Database size={20} /></div>
                      <h4 className="font-bold">Backend & Distribution</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Encore async workflows</li>
                      <li>• Storage & sync pipelines</li>
                      <li>• Mini App deploy automation</li>
                      <li>• Monitoring and release safety</li>
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={0.6}>
                  <div className="p-5 bg-gradient-to-br from-orange-900/20 to-black border border-orange-500/20 rounded-2xl hover:border-orange-500/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400"><Terminal size={20} /></div>
                      <h4 className="font-bold">Security & Governance</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Auth strategy design</li>
                      <li>• RBAC permission matrix</li>
                      <li>• Data integrity controls</li>
                      <li>• Cross-team technical alignment</li>
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: EXPERIENCE --- */}
        <section id="experience" className="py-20 px-4 max-w-7xl mx-auto border-t border-white/5">
          <Reveal>
            <div className="mb-12 text-center md:text-left pt-10">
              <h2 className="text-4xl md:text-5xl font-bold flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 mb-4">
                <Briefcase className="text-cyan-400" size={48} />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">Professional Experience</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto md:mx-0">
                FPT IS • Lightbase ecosystem: xây dựng nền tảng quản lý, kiểm thử, phân phối và vận hành Mini App trong Super App.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-900/10 via-black to-black p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">Mini App Platform Engineer</h3>
                  <p className="text-cyan-300">FPT IS • Lightbase Platform</p>
                </div>
                <span className="w-fit px-4 py-2 rounded-full text-sm border border-white/15 bg-white/5 text-gray-300">2025 - Present</span>
              </div>

              <div className="mb-6 p-5 rounded-2xl border border-white/10 bg-white/5">
                <h4 className="font-semibold mb-3 text-white">3 sản phẩm trực tiếp triển khai tại FPT IS</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Lightbase Mini App Management - TypeScript, Modular Architecture, Encore</li>
                  <li>• Mini App News - SvelteKit, TypeScript, Web App</li>
                  <li>• Lightbase Super App - React Native, WebView, Hybrid Bridge</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
                  <h4 className="font-semibold mb-3 flex items-center gap-2"><Layers size={18} className="text-cyan-400" /> Lifecycle Dashboard</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Thiết kế hệ thống quản lý 4 module: Home, Test, Store, Profile.</li>
                    <li>• Chuẩn hóa module theo kiến trúc component tái sử dụng bằng TypeScript.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
                  <h4 className="font-semibold mb-3 flex items-center gap-2"><Database size={18} className="text-green-400" /> Backend & Sync Engine</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Xây dựng luồng phân phối Mini App bất đồng bộ dựa trên Encore.</li>
                    <li>• Thiết kế cơ chế đồng bộ dữ liệu và lưu trữ phục vụ triển khai quy mô lớn.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
                  <h4 className="font-semibold mb-3 flex items-center gap-2"><ShieldCheck size={18} className="text-orange-400" /> Security (RBAC)</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Thiết kế tầng xác thực và phân quyền Role-Based Access Control.</li>
                    <li>• Đảm bảo toàn vẹn dữ liệu và tách quyền truy cập theo ngữ cảnh nghiệp vụ.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
                  <h4 className="font-semibold mb-3 flex items-center gap-2"><Smartphone size={18} className="text-purple-400" /> Hybrid Optimization</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Tinh chỉnh bridge SvelteKit-React Native và tối ưu lớp WebView.</li>
                    <li>• Giảm độ trễ khi tải Mini App trong Super App shell trên thiết bị di động.</li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* --- SECTION 5: SERVICES & CONTACT --- */}
        <section id="services-contact" className="py-20 px-4 max-w-7xl mx-auto border-t border-white/5">
          <Reveal>
            <div className="mb-12 text-center md:text-left pt-10">
              <h2 className="text-4xl md:text-5xl font-bold flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 mb-4">
                <Rocket className="text-blue-400" size={48} />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">Services & Contact</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto md:mx-0">
                Thiết kế và triển khai Web App, Landing Page và sản phẩm Web-Mobile cho hệ sinh thái Mini App, từ kiến trúc đến tối ưu vận hành production.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-bold text-lg mb-3">Web App & Landing Page</h3>
                <p className="text-sm text-gray-400">Nhận thiết kế và phát triển Landing Page chuyển đổi cao, cùng Web App quản trị/CRM/dashboard tối ưu hiệu năng.</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-bold text-lg mb-3">Hybrid Performance</h3>
                <p className="text-sm text-gray-400">Tối ưu React Native shell, bridge SvelteKit và WebView để giảm độ trễ khi mở Mini App.</p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-bold text-lg mb-3">Security & Delivery</h3>
                <p className="text-sm text-gray-400">Thiết kế Auth + RBAC và luồng phân phối bất đồng bộ giúp triển khai an toàn, nhất quán.</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.35}>
            <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-900/20 via-black to-cyan-900/20 p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Cần trao đổi dự án?</h3>
                <p className="text-gray-400">Liên hệ trực tiếp để mình tư vấn solution phù hợp với mục tiêu sản phẩm của bạn.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition">Open Contact Form</Link>
                <a href="mailto:leminhquang2k4@gmail.com" className="px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition flex items-center justify-center gap-2">
                  <Mail size={16} /> Email Direct
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* --- SECTION 6: PROJECTS --- */}
        <section className="py-20 px-4 max-w-7xl mx-auto border-t border-white/5">
          <Reveal>
            <div className="mb-16 text-center md:text-left pt-10">
              <h2 className="text-4xl md:text-5xl font-bold flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 mb-4">
                <Code2 className="text-pink-500" size={48} />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">Featured Projects</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto md:mx-0 text-center md:text-left">Các dự án trọng điểm. Triển khai công nghệ AI và Mobile hiệu năng cao.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {profile.projects.map((prj, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="group relative h-full bg-gray-900/40 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.2)] transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer z-0"></div>
                  <div className={`h-1 w-full bg-gradient-to-r ${prj.color}`}></div>
                  <div className="p-8 relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${prj.color} bg-opacity-10`}>
                        <Code2 size={24} className="text-white mix-blend-overlay" />
                      </div>
                      <a href={prj.link} target="_blank" className="p-2 bg-white/5 rounded-full hover:bg-white/20 transition text-gray-400 hover:text-white">
                        <ExternalLink size={20} />
                      </a>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-300 transition-colors">{prj.title}</h3>
                    <p className="text-gray-400 mb-6 flex-grow leading-relaxed">{prj.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {prj.tech.split(', ').map((t, idx) => (
                        <span key={idx} className="px-3 py-1 text-xs font-mono font-medium bg-white/5 rounded-lg border border-white/5 text-gray-300 group-hover:border-purple-500/30 transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* --- SECTION 7: CERTIFICATES --- */}
        <section id="certificates" className="py-20 bg-black overflow-hidden relative border-y border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black z-0 pointer-events-none"></div>
          <div className="relative z-10 max-w-7xl mx-auto">
            <Reveal>
              <div className="text-center mb-[-40px] relative z-20 pointer-events-none">
                <h2 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                  <Award className="text-green-400" size={48} /> CERTIFICATES
                </h2>
                <p className="text-gray-400 mt-4 text-lg">Hệ thống chứng chỉ được xác thực số hóa</p>
              </div>
            </Reveal>
            <SciFiCarousel />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center border-t border-white/5 bg-black/80 backdrop-blur-xl">
          <Reveal>
            <p className="text-gray-500 text-sm mb-2">Designed & Built by Le Minh Quang</p>
            <div className="flex justify-center gap-4 text-xs text-gray-600 font-mono">
              <span>NEXT.JS 14</span>
              <span>•</span>
              <span>THREE.JS</span>
              <span>•</span>
              <span>FRAMER MOTION</span>
            </div>
          </Reveal>
        </footer>
      </div>
    </main>
  );
}