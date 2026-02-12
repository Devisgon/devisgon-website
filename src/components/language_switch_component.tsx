"use client";
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../context/i18n";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // Add this
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "ur", name: "اردو", flag: "🇵🇰" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "pa", name: "پنجابی", flag: "🇵🇰" },
  ];

  // Logic to find current language
  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  // Important: Set mounted to true on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  const changeLanguage = (code: string) => {
    if (i18n && typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(code).then(() => {
        document.documentElement.lang = code;
      });
    }
    setIsOpen(false);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 400);
  };

  if (!mounted) {
    return (
      <div className="px-3 py-2 opacity-0">
        <span className="text-sm font-bold">EN</span>
      </div>
    );
  }

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-transparent text-t-primary cursor-pointer"
      >
        <span className="uppercase font-bold text-sm tracking-wide">
          {i18n.language?.split("-")[0] || "en"}
        </span>
        <span className={`text-[10px] transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
          ▾
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full  mb-3 bg-bg-primary  rounded-xl shadow-2xl z-50 p-1.5">
          <div className="flex flex-col gap-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`flex items-center justify-between w-full px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
                  i18n.language === lang.code ? "" : "hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-3 text-t-primary">
                  <span>{lang.name}</span>
                </div>
                {i18n.language === lang.code && <span className="text-t-secondary font-bold ml-2">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;