"use client";

import { createContext, useContext, useState } from "react";

type Language = "vi" | "en";
const LanguageContext = createContext<{ language: Language; toggleLanguage: () => void }>({ language: "en", toggleLanguage: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  return <LanguageContext.Provider value={{ language, toggleLanguage: () => setLanguage((current) => current === "vi" ? "en" : "vi") }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() { return useContext(LanguageContext); }
