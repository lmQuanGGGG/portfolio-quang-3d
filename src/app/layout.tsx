import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Import Navbar vừa tạo
import SmoothScroll from "@/components/motion/SmoothScroll";
import { LanguageProvider } from "@/components/LanguageProvider";

export const metadata: Metadata = {
  title: "Le Minh Quang — Software Engineer & Creative Developer",
  description: "Le Minh Quang builds thoughtful digital products, enterprise systems, and mobile applications from Vietnam.",
  icons: { icon: "/lmq-logo.svg?v=2", shortcut: "/lmq-logo.svg?v=2", apple: "/lmq-logo.svg?v=2" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider><SmoothScroll /><Navbar /> {/* Đặt Navbar vừa tạo */}
        {children}</LanguageProvider>
      </body>
    </html>
  );
}
