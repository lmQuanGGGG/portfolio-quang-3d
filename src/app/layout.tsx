import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Import Navbar vừa tạo
import { LanguageProvider } from "@/components/LanguageProvider";

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
      <body>
        <LanguageProvider><Navbar /> {/* Đặt Navbar vừa tạo */}
        {children}</LanguageProvider>
      </body>
    </html>
  );
}
