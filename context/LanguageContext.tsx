// context/LanguageContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "es",
  setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("es");
  const [mounted, setMounted] = useState(false); // 🔒 SSR-safe flag

  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (storedLang === "en" || storedLang === "es") {
      setLanguageState(storedLang);
    }
    setMounted(true); // ✔️ evitar mismatch
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  // ⚠️ No renderizar hijos hasta que el idioma esté sincronizado con el cliente
  if (!mounted) return null;

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
