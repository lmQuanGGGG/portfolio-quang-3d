"use client";
import { useState } from "react"; 
import Link from "next/link"; // 1. Import Link từ next/link
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import { blogPosts } from "../data"; 
import { ArrowDown, Search, BookOpen, Sparkles, FileWarning } from "lucide-react";
import Scene3D from "@/components/Scene3D"; 

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

export default function BlogPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // --- LOGIC TÌM KIẾM ---
  const [searchQuery, setSearchQuery] = useState("");

  // Lọc bài viết theo Tiêu đề hoặc Category (không phân biệt hoa thường)
  const filteredPosts = blogPosts.filter((post) => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="relative min-h-screen text-white font-sans bg-black selection:bg-purple-500 selection:text-white overflow-hidden">
      
      {/* THANH TIẾN TRÌNH */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 origin-left z-50"
        style={{ scaleX }}
      />

      <Scene3D />

      <div className="relative z-10 pt-32">
        
        {/* --- HEADER --- */}
        <section className="px-4 mb-20 text-center">
          <ParallaxText yProgress={scrollYProgress} speed={-1.5}>
            <Reveal delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                <Sparkles size={14} className="text-yellow-400"/>
                <span className="text-sm font-medium text-gray-300">Insights & Tutorials</span>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <h1 className="text-5xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x">
                Knowledge Base
              </h1>
            </Reveal>
            
            <Reveal delay={0.3}>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Kho tàng kiến thức về <span className="text-white">Java, JavaScript</span> và các kỹ thuật lập trình hiện đại.
              </p>
            </Reveal>
            
            {/* --- THANH TÌM KIẾM (ĐÃ HOẠT ĐỘNG) --- */}
            <Reveal delay={0.4}>
              <div className="mt-10 relative max-w-lg mx-auto group">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative flex items-center bg-black/60 backdrop-blur-xl border border-white/10 rounded-full p-2 shadow-2xl">
                  <Search className="ml-4 text-gray-400 group-focus-within:text-pink-500 transition-colors" size={20}/>
                  
                  <input 
                    type="text" 
                    placeholder="Tìm kiếm bài viết (VD: Java, React...)" 
                    className="w-full bg-transparent border-none px-4 py-2 text-white focus:outline-none placeholder:text-gray-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật state khi gõ
                  />
                  
                  {/* Nút Clear nếu đang có chữ */}
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="mr-2 text-xs text-gray-400 hover:text-white"
                    >
                      Xóa
                    </button>
                  )}
                </div>
              </div>
            </Reveal>
          </ParallaxText>
        </section>

        {/* --- BLOG GRID --- */}
        <section className="px-4 max-w-7xl mx-auto pb-32">
          
          {/* Hiển thị thông báo nếu không tìm thấy bài nào */}
          {filteredPosts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-block p-6 rounded-full bg-white/5 mb-4">
                <FileWarning size={48} className="text-gray-500"/>
              </div>
              <h3 className="text-2xl font-bold text-gray-300">Không tìm thấy bài viết nào</h3>
              <p className="text-gray-500 mt-2">Hãy thử tìm từ khóa khác xem sao nhé!</p>
            </motion.div>
          ) : (
            // Hiển thị lưới bài viết đã lọc
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, i) => (
                <Reveal key={post.id} delay={i * 0.1}>
                  {/* 2. Bọc article bằng Link trỏ tới /blog/{id} */}
                  <Link href={`/blog/${post.id}`} className="block h-full">
                    <article className="group cursor-pointer h-full flex flex-col relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                      
                      <div className="relative p-8 bg-gray-900/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-pink-500/50 hover:shadow-[0_10px_40px_-10px_rgba(236,72,153,0.2)] transition-all duration-500 h-full flex flex-col hover:-translate-y-2">
                        
                        <div className="flex justify-between items-start mb-6">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${post.category === 'Java' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                            {post.category}
                          </span>
                          <span className="text-xs text-gray-500 font-mono flex items-center gap-1">
                            <BookOpen size={12}/> {post.readTime} READ
                          </span>
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-pink-400 transition-colors leading-snug">
                          {post.title}
                        </h3>
                        
                        <div className="w-12 h-1 bg-white/10 rounded-full mb-6 group-hover:bg-pink-500/50 transition-colors"></div>

                        <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
                          Khám phá chi tiết về {post.title}. Bài viết này sẽ đi sâu vào các khái niệm cốt lõi...
                        </p>

                        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-sm text-gray-400 group-hover:text-white transition-colors">
                          <span className="font-mono text-xs opacity-60">{post.date}</span>
                          <span className="flex items-center gap-2 font-medium group-hover:translate-x-1 transition-transform">
                            Read Article <ArrowDown className="-rotate-90" size={16}/>
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </section>

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