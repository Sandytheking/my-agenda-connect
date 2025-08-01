"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed bottom-6 right-6 bg-purple-600 text-white px-4 py-2 rounded-xl shadow-lg hover:bg-purple-700 transition"
    >
      {language === "es" ? "English" : "Español"}
    </button>
  );
}
