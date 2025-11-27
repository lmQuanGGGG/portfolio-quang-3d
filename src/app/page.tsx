"use client";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import Scene3D from "@/components/Scene3D";
import { profile, blogPosts } from "./data";
import { Github, Code2, Award, ArrowDown, ExternalLink, User, Cpu, Database, Smartphone, Terminal, BookOpen } from "lucide-react";
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

                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -right-6 p-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slow z-20">
                            <div className="relative">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute opacity-75"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full relative"></div>
                            </div>
                            <span className="text-sm font-medium text-white">Open to Work</span>
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
                      {profile.role} • <span className="text-white">AI Enthusiast</span> • Mobile Developer
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
                        About Me <ArrowDown size={18}/>
                      </a>
                      <a href="https://github.com/lmQuanGGGG" target="_blank" className="px-8 py-3 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition flex items-center gap-2 backdrop-blur-md">
                        <Github size={20}/> GitHub
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
                  <User className="text-cyan-400" size={48}/> 
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">About Profile</span>
                </h2>
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed text-center lg:text-left">
                  <p className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                    "👋 Xin chào! Tôi là <strong className="text-white">Lê Minh Quang</strong>. 
                    Trong kỷ nguyên AI, tôi định vị mình là một Code Architect thế hệ mới. Thay vì chỉ gõ từng dòng lệnh, tôi tập trung vào nghệ thuật <span className="text-purple-400">'Prompt Engineering'</span> — chuyển hóa ngôn ngữ tự nhiên thành các module phần mềm phức tạp với tốc độ và độ chính xác vượt trội."
                  </p>
                  <p>
                    Hiện tại, tôi đang tập trung nghiên cứu sâu về <strong>Prompt Engineering</strong> và tích hợp các mô hình AI vào ứng dụng thực tế (Mobile & Web) để giải quyết các vấn đề phức tạp.
                  </p>
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal delay={0.2}>
                <h3 className="text-2xl font-bold mb-6 flex items-center justify-center lg:justify-start gap-2">
                  <Cpu className="text-purple-500"/> Technical Arsenal
                </h3>
              </Reveal>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Skill Groups - Đã xóa các class căn giữa (justify-center, text-center) */}
                <Reveal delay={0.3}>
                  <div className="p-5 bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/20 rounded-2xl hover:border-purple-500/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><Cpu size={20}/></div>
                      <h4 className="font-bold">AI & Backend</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Prompt Engineering</li>
                      <li>• Python (Flask/FastAPI)</li>
                      <li>• .NET Core / C#</li>
                      <li>• Next.js (App Router)</li>
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={0.4}>
                  <div className="p-5 bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/20 rounded-2xl hover:border-blue-500/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Smartphone size={20}/></div>
                      <h4 className="font-bold">Mobile & Frontend</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Flutter (Dart)</li>
                      <li>• React Native</li>
                      <li>• Tailwind CSS</li>
                      <li>• UI/UX Design (Figma)</li>
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={0.5}>
                  <div className="p-5 bg-gradient-to-br from-green-900/20 to-black border border-green-500/20 rounded-2xl hover:border-green-500/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-green-500/20 rounded-lg text-green-400"><Database size={20}/></div>
                      <h4 className="font-bold">Data & DevOps</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• MongoDB / MSSQL</li>
                      <li>• Docker & CI/CD</li>
                      <li>• Git / GitHub Actions</li>
                      <li>• Networking Basics</li>
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={0.6}>
                  <div className="p-5 bg-gradient-to-br from-orange-900/20 to-black border border-orange-500/20 rounded-2xl hover:border-orange-500/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400"><Terminal size={20}/></div>
                      <h4 className="font-bold">Soft Skills</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Problem Solving</li>
                      <li>• Teamwork & Leadership</li>
                      <li>• English for IT 2</li>
                      <li>• Agile / Scrum basics</li>
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: PROJECTS --- */}
        <section className="py-20 px-4 max-w-7xl mx-auto border-t border-white/5">
          <Reveal>
            <div className="mb-16 text-center md:text-left pt-10">
              <h2 className="text-4xl md:text-5xl font-bold flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 mb-4">
                <Code2 className="text-pink-500" size={48}/> 
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
                        <ExternalLink size={20}/>
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

       {/* --- SECTION 4: CERTIFICATES --- */}
        <section className="py-20 bg-black overflow-hidden relative border-y border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black z-0 pointer-events-none"></div>
          <div className="relative z-10 max-w-7xl mx-auto">
            <Reveal>
              <div className="text-center mb-[-40px] relative z-20 pointer-events-none">
                <h2 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                  <Award className="text-green-400" size={48}/> CERTIFICATES
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