import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Import Navbar vừa tạo

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Le Minh Quang - Portfolio",
  description: "Software Engineer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> {/* Đặt Navbar ở đây để hiện mọi trang */}
        {children}
      </body>
    </html>
  );
}