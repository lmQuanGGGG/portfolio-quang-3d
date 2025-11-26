"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, BookOpen, Mail, GraduationCap } from "lucide-react"; // Thêm icon GraduationCap

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Education", path: "/education", icon: GraduationCap }, // Thêm mục này
  { name: "Blog", path: "/blog", icon: BookOpen },
  { name: "Contact", path: "/contact", icon: Mail },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-1 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full p-1.5 shadow-2xl"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`relative px-4 py-2.5 md:px-6 rounded-full flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/10 border border-white/20 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon size={16} />
              <span className="relative z-10 hidden md:inline">{item.name}</span>
              {/* Mobile chỉ hiện icon, Desktop hiện cả tên */}
              <span className="relative z-10 md:hidden">{isActive ? item.name : ""}</span>
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}