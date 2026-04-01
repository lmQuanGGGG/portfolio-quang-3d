"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, Mail, Briefcase, Award } from "lucide-react";

const navItems = [
  { name: "Home", href: "/", icon: Home, hash: "" },
  { name: "About", href: "/#about", icon: Briefcase, hash: "#about" },
  { name: "Experience", href: "/#experience", icon: Briefcase, hash: "#experience" },
  { name: "Services & Contact", href: "/#services-contact", icon: Mail, hash: "#services-contact" },
  { name: "Certificates", href: "/#certificates", icon: Award, hash: "#certificates" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const syncHash = () => setActiveHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-1 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full p-1.5 shadow-2xl"
      >
        {navItems.map((item) => {
          const isActive = item.hash ? activeHash === item.hash : pathname === "/" && activeHash === "";
          return (
            <Link 
              key={item.href} 
              href={item.href}
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
              <span className="relative z-10 md:hidden">{isActive ? item.name : ""}</span>
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}