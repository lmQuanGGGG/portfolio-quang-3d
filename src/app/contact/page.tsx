"use client";
import { motion } from "framer-motion";
import Scene3D from "@/components/Scene3D";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Copy, Check, FileText } from "lucide-react"; // Đã thêm FileText
import { useState } from "react";

// Component hiệu ứng xuất hiện
function Reveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Component hiển thị thông tin liên hệ (Email/Phone/CV)
// - Click vào nội dung chính -> Mở App/Link
// - Click vào nút icon bên phải -> Copy
function ContactItem({ text, icon: Icon, label, href, target = "_self" }: { text: string, icon: any, label: string, href: string, target?: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e: any) => {
        e.stopPropagation(); // Ngăn không cho mở link khi bấm copy
        e.preventDefault();
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <a 
            href={href}
            target={target} // Hỗ trợ mở tab mới
            className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all cursor-pointer"
        >
            <div className="p-3 rounded-full bg-purple-500/10 text-purple-400 group-hover:text-white group-hover:bg-purple-500 transition-colors">
                <Icon size={24} />
            </div>
            <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</p>
                <p className="text-white font-mono text-sm md:text-base break-all">{text}</p>
            </div>
            
            {/* Nút Copy riêng biệt */}
            <button 
                onClick={handleCopy}
                className="p-2 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
                title="Copy content"
            >
                {copied ? <Check size={20} className="text-green-400"/> : <Copy size={20}/>}
            </button>
        </a>
    );
}

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  
  // State cho form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Hợp tác dự án",
    message: ""
  });

  const handleChange = (e: any) => {
      setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    // Giả lập loading một chút cho đẹp
    setTimeout(() => {
        setFormStatus("success");
        
        // Tạo link mailto để mở ứng dụng mail
        const subject = encodeURIComponent(`[Portfolio Contact] ${formData.subject} - from ${formData.name}`);
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
        
        // Mở trình gửi mail mặc định
        window.location.href = `mailto:leminhquang2k4@gmail.com?subject=${subject}&body=${body}`;
        
        // Reset sau 2s
        setTimeout(() => setFormStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <main className="relative min-h-screen text-white font-sans bg-black selection:bg-purple-500 selection:text-white overflow-hidden">
      
      {/* Nền 3D */}
      <Scene3D />

      <div className="relative z-10 pt-32 pb-20 px-4 max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
            <Reveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-300">Available for freelance & full-time</span>
                </div>
            </Reveal>
            <Reveal delay={0.1}>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x">
                    Let's Connect
                </h1>
            </Reveal>
            <Reveal delay={0.2}>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Bạn có ý tưởng thú vị? Hay muốn hợp tác trong dự án tiếp theo? Đừng ngần ngại liên hệ với tôi.
                </p>
            </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Cột trái: Thông tin liên hệ */}
            <div className="space-y-6">
                <Reveal delay={0.3}>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <span className="w-8 h-1 bg-purple-500 rounded-full"></span>
                        Contact Info
                    </h2>
                </Reveal>

                <Reveal delay={0.4}>
                    <div className="space-y-4">
                        {/* Email */}
                        <ContactItem 
                            text="leminhquang2k4@gmail.com" 
                            icon={Mail} 
                            label="Email" 
                            href="mailto:leminhquang2k4@gmail.com"
                        />
                        
                        {/* Phone */}
                        <ContactItem 
                            text="0387412607" 
                            icon={Phone} 
                            label="Phone" 
                            href="tel:0387412607"
                        />

                        {/* CV / Resume - MỚI THÊM */}
                        <ContactItem 
                            text="Xem CV (PDF)" 
                            icon={FileText} 
                            label="Curriculum Vitae" 
                            href="/EL-CV-Fresher Software Developer.pdf" 
                            target="_blank"
                        />
                        
                        {/* Location */}
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                            <div className="p-3 rounded-full bg-blue-500/10 text-blue-400">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Base Location</p>
                                <p className="text-white font-medium">Thủ Đức, TP. Hồ Chí Minh</p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.5}>
                    <div className="pt-8">
                        <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-4">Social Profiles</h3>
                        <div className="flex gap-4">
                            <a 
                                href="https://github.com/lmQuanGGGG" 
                                target="_blank" 
                                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all group"
                            >
                                <Github size={24} className="text-gray-400 group-hover:text-white"/>
                            </a>
                            <a 
                                href="https://www.linkedin.com/in/minh-quang-lê-624148202" 
                                target="_blank" 
                                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all group"
                            >
                                <Linkedin size={24} className="text-gray-400 group-hover:text-blue-400"/>
                            </a>
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* Cột phải: Form gửi tin nhắn */}
            <Reveal delay={0.4}>
                <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <h2 className="text-2xl font-bold mb-2 relative z-10">Send Message</h2>
                    <p className="text-gray-400 mb-8 text-sm relative z-10">Điền thông tin bên dưới để mở trình soạn thảo email.</p>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs text-gray-400 uppercase tracking-wider ml-1">Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 focus:bg-black/40 transition-all"
                                    placeholder="Tên của bạn"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-gray-400 uppercase tracking-wider ml-1">Email</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 focus:bg-black/40 transition-all"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-gray-400 uppercase tracking-wider ml-1">Subject</label>
                            <select 
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 focus:bg-black/40 transition-all appearance-none cursor-pointer"
                            >
                                <option className="bg-gray-900">Hợp tác dự án</option>
                                <option className="bg-gray-900">Tuyển dụng</option>
                                <option className="bg-gray-900">Trao đổi kỹ thuật</option>
                                <option className="bg-gray-900">Khác</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-gray-400 uppercase tracking-wider ml-1">Message</label>
                            <textarea 
                                name="message"
                                required
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 focus:bg-black/40 transition-all resize-none"
                                placeholder="Nội dung tin nhắn..."
                            ></textarea>
                        </div>

                        <button 
                            type="submit" 
                            disabled={formStatus !== "idle"}
                            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                                formStatus === "success" 
                                ? "bg-green-500 text-white cursor-default" 
                                : "bg-white text-black hover:bg-gray-200 hover:scale-[1.02]"
                            }`}
                        >
                            {formStatus === "idle" && (
                                <>Open Mail App <Send size={18} /></>
                            )}
                            {formStatus === "submitting" && (
                                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                            )}
                            {formStatus === "success" && (
                                <>Redirecting... <Check size={18} /></>
                            )}
                        </button>
                    </form>
                </div>
            </Reveal>
        </div>

      </div>
    </main>
  );
}