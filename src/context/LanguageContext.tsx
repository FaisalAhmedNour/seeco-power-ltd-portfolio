"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, TranslationSchema } from "@/translations";

// Supported language options
export type LanguageType = "en" | "bn";

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * LanguageProvider Component.
 * Wraps the application to provide translation state.
 * Prevents hydration mismatches by defaulting to English on server-render,
 * and loading localStorage settings after client mount.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageType>("en");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Read from localStorage on mount to preserve state
    const savedLanguage = localStorage.getItem("preferred_language") as LanguageType;
    if (savedLanguage === "en" || savedLanguage === "bn") {
      setLanguageState(savedLanguage);
      document.documentElement.lang = savedLanguage;
    }
    setIsMounted(true);
  }, []);

  const setLanguage = (lang: LanguageType) => {
    setLanguageState(lang);
    localStorage.setItem("preferred_language", lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    const dictionary = translations[language];
    const parts = key.split(".");
    let current: any = dictionary;

    for (const part of parts) {
      if (current && current[part] !== undefined) {
        current = current[part];
      } else {
        // Fallback to English dictionary if key is missing in active language
        let fallback: any = translations["en"];
        for (const fbPart of parts) {
          if (fallback && fallback[fbPart] !== undefined) {
            fallback = fallback[fbPart];
          } else {
            return key; // return key as final fallback
          }
        }
        return fallback;
      }
    }
    return typeof current === "string" ? current : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Custom hook to consume the language context.
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
