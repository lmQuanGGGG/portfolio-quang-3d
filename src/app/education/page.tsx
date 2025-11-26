"use client";
import { motion } from "framer-motion";
import Scene3D from "@/components/Scene3D";
import { GraduationCap, Calendar, Award, Book, Star, Briefcase, Code2, School } from "lucide-react";

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

export default function EducationPage() {
  return (
    <main className="relative min-h-screen text-white font-sans bg-black selection:bg-purple-500 selection:text-white overflow-hidden">
      
      {/* Nền 3D */}
      <Scene3D />

      <div className="relative z-10 pt-32 pb-20 px-4 max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
            <Reveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                    <GraduationCap size={16} className="text-yellow-400"/>
                    <span className="text-sm font-medium text-gray-300">Academic & Career Journey</span>
                </div>
            </Reveal>
            <Reveal delay={0.1}>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-gradient-x">
                    Education & Experience
                </h1>
            </Reveal>
            <Reveal delay={0.2}>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Hành trình tích lũy kiến thức từ ghế nhà trường đến môi trường doanh nghiệp chuyên nghiệp.
                </p>
            </Reveal>
        </div>

        {/* Main Content: Timeline Style */}
        <div className="relative border-l-2 border-white/10 ml-4 md:ml-auto md:mx-auto max-w-3xl pl-8 md:pl-0 space-y-16">
            
            {/* MỐC 1: THỰC TẬP FPT IS (Mới nhất) */}
            <div className="relative">
                <Reveal delay={0.3}>
                    {/* Dot */}
                    <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-orange-500 border-4 border-black shadow-[0_0_20px_rgba(249,115,22,0.5)]"></div>
                    
                    <div className="bg-gray-900/40 backdrop-blur-xl border border-orange-500/30 rounded-3xl p-8 md:p-10 hover:border-orange-500/50 transition-all duration-500 group relative overflow-hidden">
                        {/* Background Glow nhẹ */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 relative z-10">
                            <div>
                                <h2 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors flex items-center gap-2">
                                    <Briefcase size={24} className="text-orange-500"/> FPT IS (FPT Information System)
                                </h2>
                                <p className="text-gray-400 text-lg">Thực tập sinh Lập trình di động</p>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-sm font-mono text-orange-300">
                                <Calendar size={14} />
                                <span>12/2025 - 03/2026</span>
                            </div>
                        </div>

                        <div className="space-y-4 relative z-10">
                            <p className="text-gray-300"><strong className="text-white">Bộ phận:</strong> FIS MAC HCM</p>
                            <p className="text-gray-300"><strong className="text-white">Địa điểm:</strong> FPT IS, Đường Sáng Tạo, KCX Tân Thuận, Quận 7, HCM</p>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 mt-4">
                                <p className="text-sm text-gray-400 italic">
                                    "Tham gia phát triển các dự án phần mềm thực tế, làm việc trực tiếp với quy trình chuyên nghiệp tại tập đoàn công nghệ hàng đầu Việt Nam."
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* MỐC 2: ĐẠI HỌC HUTECH */}
            <div className="relative">
                <Reveal delay={0.4}>
                    <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-yellow-400 border-4 border-black shadow-[0_0_20px_rgba(250,204,21,0.5)]"></div>
                    
                    <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 hover:border-yellow-500/30 transition-all duration-500 group">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                                    Đại học Công nghệ TP.HCM
                                </h2>
                                <p className="text-gray-400 text-lg">Chuyên ngành Công nghệ phần mềm</p>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-gray-300">
                                <Calendar size={14} />
                                <span>2022 - 2026</span>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* GPA & Đồ án */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Star size={20} className="text-yellow-400" fill="currentColor" />
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">GPA Hiện tại</p>
                                    </div>
                                    <p className="text-3xl font-bold text-white">3.38 <span className="text-lg text-gray-500 font-normal">/ 4.0</span></p>
                                </div>
                                
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Award size={20} className="text-green-400" />
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">Thành tích</p>
                                    </div>
                                    <p className="text-sm text-gray-300">Sinh viên tiêu biểu 3 năm liên tiếp (2022 - 2025)</p>
                                </div>
                            </div>

                            {/* Đồ án tiêu biểu */}
                            <div>
                                <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Code2 size={16} /> Đồ án môn học xuất sắc
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/10">
                                        <div>
                                            <p className="font-bold text-blue-300">GameNect (Đồ án Chuyên ngành)</p>
                                            <p className="text-xs text-gray-500">Mobile App kết nối game thủ</p>
                                        </div>
                                        <div className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">9.0</div>
                                    </div>
                                    <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-white/10">
                                        <div>
                                            <p className="font-bold text-orange-300">QConcert (Đồ án Cơ sở)</p>
                                            <p className="text-xs text-gray-500">Website đặt vé sự kiện</p>
                                        </div>
                                        <div className="px-3 py-1 rounded-lg bg-orange-500/20 text-orange-300 font-bold border border-orange-500/30">8.5</div>
                                    </div>
                                </div>
                            </div>

                            {/* Key Courses */}
                            <div>
                                <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Book size={16} /> Môn học trọng tâm
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {["Cấu trúc dữ liệu & Giải thuật", "Lập trình hướng đối tượng (OOP)", "Cơ sở dữ liệu", "Mạng máy tính", "Lập trình web", "Trí tuệ nhân tạo", "Lập trình trên thiết bị di động", " Lập trình mạng"].map((subject, i) => (
                                        <span key={i} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-white/10 transition-colors cursor-default">
                                            {subject}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* MỐC 3: THPT VĨNH LINH */}
            <div className="relative">
                <Reveal delay={0.5}>
                    <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-white border-4 border-black shadow-[0_0_20px_rgba(255,255,255,0.5)]"></div>
                    
                    <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 hover:border-white/30 transition-all duration-500 group">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors flex items-center gap-2">
                                    <School size={24} /> THPT Vĩnh Linh
                                </h2>
                                <p className="text-gray-400 text-lg">Học sinh Trung học phổ thông</p>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-gray-300">
                                <Calendar size={14} />
                                <span>2019 - 2022</span>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-3 mt-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                            <Award size={20} className="text-yellow-400 shrink-0 mt-1" />
                            <div>
                                <p className="font-bold text-white">Học sinh Giỏi 3 năm liền</p>
                                <p className="text-sm text-gray-400">Đạt thành tích xuất sắc trong học tập và rèn luyện suốt 3 năm cấp 3.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 mt-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                            <Award size={20} className="text-yellow-400 shrink-0 mt-1" />
                            <div>
                                <p className="font-bold text-white">Đạt giải nhì Học sinh giỏi Tin học cấp Huyện</p>
                                <p className="text-sm text-gray-400">Đạt thành tích xuất sắc trong suốt quá trình tham gia cuộc thi.</p>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
            
        </div>

      </div>
    </main>
  );
}