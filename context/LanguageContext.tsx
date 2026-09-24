"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Content } from "@/content/types";

// Import available interface transalations
import { eng } from "@/content/eng";
import { esp } from "@/content/esp";
import { fra } from "@/content/fra";

type Locale = "eng" | "esp" | "fra";

const content: Record<Locale, Content> = { eng, esp, fra };

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Content;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("eng");

  // Reads localStorage after mount, same timing reason as the theme system:
  // localStorage doesn't exist during server rendering, only in the browser
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && saved in content) {
      // Reading localStorage can only happen after mount (it doesn't exist
      // during server rendering), so this necessarily runs one render after
      // the initial "eng" default. That's intentional here, not something to
      // fix — see the note above this hook for the full reasoning.
      // eslint-disable-next-line
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: content[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Fails loudly if called outside the provider, rather than silently
// returning undefined content that would break every section at once.
export function useTranslations() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslations must be used within a LanguageProvider");
  }
  return context;
}