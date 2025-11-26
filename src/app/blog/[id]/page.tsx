"use client";
import { useParams, useRouter } from "next/navigation";
import { blogPosts } from "@/app/data"; 
import { motion, useScroll, useSpring } from "framer-motion"; 
import { ArrowLeft, Calendar, Clock, Tag, User, Share2, Copy, Check } from "lucide-react"; 
import Scene3D from "@/components/Scene3D";
import ReactMarkdown from "react-markdown"; 
import { useState, useEffect } from "react"; 
import remarkGfm from 'remark-gfm'; 

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'; 

function Reveal({ children, delay = 0, width = "100%" }: { children: React.ReactNode, delay?: number, width?: "100%" | "auto" }) {
  return (
    <motion.div
      style={{ width }}
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button onClick={handleCopy} className="text-gray-400 hover:text-white transition">
            {copied ? <Check size={14} className="text-green-400"/> : <Copy size={14}/>}
        </button>
    );
};

export default function BlogPostDetail() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<any>(null); 

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    if (params?.id) {
        const foundPost = blogPosts.find((p) => p.id === Number(params.id));
        if (foundPost) {
            setPost(foundPost);
            window.scrollTo(0, 0);
        }
    }
  }, [params?.id]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <Scene3D />
        <div className="z-10 text-center">
            {!params?.id ? (
                 <p className="text-gray-400 animate-pulse">Loading...</p>
            ) : (
                <>
                    <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">404</h1>
                    <p className="text-gray-400 mb-8">Bài viết không tồn tại.</p>
                    <button onClick={() => router.push('/blog')} className="px-8 py-3 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition backdrop-blur-md">
                    Quay lại Blog
                    </button>
                </>
            )}
        </div>
      </div>
    );
  }

  return (
    <main key={post.id} className="relative min-h-screen text-white font-sans bg-black selection:bg-purple-500 selection:text-white">
      
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 origin-left z-50" 
        style={{ scaleX }} 
      />

      <Scene3D />

      <article className="relative z-10 max-w-5xl mx-auto px-4 pt-32 pb-20">
        
        <Reveal>
            <button 
            onClick={() => router.push('/blog')}
            className="group flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all mb-10 backdrop-blur-md"
            >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform text-purple-400"/> 
            <span className="text-sm font-medium text-gray-300 group-hover:text-white">Back to Intelligence</span>
            </button>
        </Reveal>

        <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
            
            <div className="mb-12 text-center md:text-left border-b border-white/10 pb-10">
                <Reveal delay={0.1}>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs md:text-sm font-mono uppercase tracking-wider mb-6">
                        <span className="flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                            <Tag size={12}/> {post.category}
                        </span>
                        <span className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 text-gray-400 border border-white/10">
                            <Calendar size={12}/> {post.date}
                        </span>
                        <span className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 text-gray-400 border border-white/10">
                            <Clock size={12}/> {post.readTime}
                        </span>
                    </div>
                </Reveal>
            
                <Reveal delay={0.2}>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                        {post.title}
                    </h1>
                </Reveal>
            
                <Reveal delay={0.3}>
                    <div className="flex items-center justify-center md:justify-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 p-[2px]">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                <User size={20} className="text-white"/>
                            </div>
                        </div>
                        <div className="text-left">
                            <p className="text-white font-bold text-base">Lê Minh Quang</p>
                            <p className="text-purple-400 text-xs uppercase tracking-widest">Author / Engineer</p>
                        </div>
                        <button className="ml-auto p-3 rounded-full bg-white/5 hover:bg-white/10 transition text-gray-400 hover:text-white">
                            <Share2 size={20} />
                        </button>
                    </div>
                </Reveal>
            </div>

            <Reveal delay={0.4}>
                <div className="prose prose-invert prose-lg max-w-none 
                    prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight
                    prose-h1:text-3xl prose-h1:mt-16 prose-h1:mb-8 
                    prose-h2:text-2xl prose-h2:text-purple-300 prose-h2:mt-16 prose-h2:mb-8 prose-h2:border-b prose-h2:border-purple-500/20 prose-h2:pb-4
                    prose-h3:text-xl prose-h3:text-cyan-300 prose-h3:mt-12 prose-h3:mb-6
                    
                    /* Đã chuyển CSS của 'p' xuống component bên dưới để fix lỗi */
                    
                    prose-a:text-pink-400 hover:prose-a:text-pink-300 prose-a:no-underline prose-a:border-b prose-a:border-pink-500/50 prose-a:transition-colors
                    prose-strong:text-white prose-strong:font-extrabold
                    prose-li:text-gray-300 prose-li:marker:text-purple-500 prose-li:mb-4 prose-li:leading-loose
                    prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-500/10 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-gray-200 prose-blockquote:shadow-inner prose-blockquote:my-10
                    prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-img:shadow-2xl prose-img:my-12
                    prose-code:text-orange-300 prose-code:font-mono prose-code:text-sm
                    prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0
                    
                    prose-table:border-collapse prose-table:w-full prose-table:my-10 prose-table:rounded-lg prose-table:overflow-hidden
                    prose-thead:bg-white/10
                    prose-th:border-b prose-th:border-white/10 prose-th:p-4 prose-th:text-left prose-th:text-white prose-th:font-bold
                    prose-td:border-b prose-td:border-white/5 prose-td:p-4 prose-td:text-gray-300 prose-td:align-top
                    prose-tr:hover:bg-white/5 prose-tr:transition-colors
                ">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]} 
                    components={{
                        // FIX QUAN TRỌNG: Thay thế thẻ <p> mặc định bằng <div> để tránh lỗi <p> lồng <div>
                        // Đồng thời áp dụng lại style của đoạn văn vào đây
                        p: ({node, children}: any) => (
                            <div className="mb-8 leading-loose text-base md:text-lg text-gray-300">{children}</div>
                        ),
                        
                        table: ({node, ...props}) => (
                            <div className="overflow-x-auto my-10 rounded-lg border border-white/10 shadow-lg">
                                <table className="w-full text-left border-collapse" {...props} />
                            </div>
                        ),
                        thead: ({node, ...props}) => (
                            <thead className="bg-white/10 text-white" {...props} />
                        ),
                        th: ({node, ...props}) => (
                            <th className="p-4 font-bold border-b border-white/10 text-sm uppercase tracking-wider whitespace-nowrap" {...props} />
                        ),
                        td: ({node, ...props}) => (
                            <td className="p-4 border-b border-white/5 text-gray-300 text-sm leading-relaxed" {...props} />
                        ),
                        img: ({node, ...props}) => (
                            <div className="my-14 relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                                <div className="relative rounded-xl overflow-hidden bg-black border border-white/10">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img {...props} className="w-full h-auto object-cover m-0 hover:scale-105 transition duration-700" alt={props.alt || "Blog Image"} />
                                </div>
                                {props.alt && <p className="text-center text-gray-500 text-sm mt-3 font-mono italic">{props.alt}</p>}
                            </div>
                        ),
                        code({node, inline, className, children, ...props}: any) {
                            const match = /language-(\w+)/.exec(className || '')
                            const codeString = String(children).replace(/\n$/, '');
                            
                            return !inline && match ? (
                                <div className="rounded-xl overflow-hidden my-12 border border-white/10 shadow-2xl bg-[#1e1e1e] group">
                                    <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-black/50">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                        </div>
                                        <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">{match[1]}</span>
                                        <CopyButton text={codeString} />
                                    </div>
                                    <SyntaxHighlighter
                                        style={vscDarkPlus}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                        customStyle={{ margin: 0, padding: '1.5rem', background: '#1e1e1e', fontSize: '0.95rem', lineHeight: '1.7', fontFamily: '"Fira Code", monospace' }}
                                    >
                                        {codeString}
                                    </SyntaxHighlighter>
                                </div>
                            ) : (
                                <code className="bg-purple-500/10 text-purple-300 px-1.5 py-0.5 rounded text-sm font-mono border border-purple-500/20 mx-1" {...props}>
                                    {children}
                                </code>
                            )
                        }
                    }}
                >
                    {post.content || "Nội dung đang được cập nhật..."}
                </ReactMarkdown>
                </div>
            </Reveal>

            <div className="mt-20 pt-10 border-t border-white/10 text-center">
                <Reveal delay={0.5}>
                    <p className="text-gray-500 italic mb-4">Thanks for reading!</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs text-gray-400 font-mono">SYSTEM END OF FILE</span>
                    </div>
                </Reveal>
            </div>
        </div>

      </article>
    </main>
  );
}