"use client";

import React, { createContext, useContext } from "react";
import { dictionary, Dictionary, Language } from "@/lib/config";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface LanguageContextType {
  language: Language;
  t: Dictionary;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const langParam = searchParams.get("lang");
  const language: Language = (langParam && (langParam === "fr" || langParam === "en" || langParam === "nl")) 
    ? (langParam as Language) 
    : "fr";

  const setLanguage = (lang: Language) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", lang);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const t = dictionary[language];

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
