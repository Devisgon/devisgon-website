"use client";
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiGlobe } from "react-icons/fi"; 
import { US, PK, SA, CN, ES, DE, FR } from 'country-flag-icons/react/3x2';
import "../context/i18n";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const languages = [
    { 
      code: "en", 
      name: "English", 
      icon: <FiGlobe className="text-blue-400 w-5 h-5" />, 
      flag: <US title="United States" className="w-5 h-auto rounded-sm" /> 
    },
    { code: "ur", name: "اردو", flag: <PK title="Pakistan" className="w-5 h-auto rounded-sm" /> },
    { code: "ar", name: "العربية", flag: <SA title="Saudi Arabia" className="w-5 h-auto rounded-sm" /> },
    { code: "zh", name: "中文", flag: <CN title="China" className="w-5 h-auto rounded-sm" /> },
    { code: "es", name: "Español", flag: <ES title="Spain" className="w-5 h-auto rounded-sm" /> },
    { code: "de", name: "Deutsch", flag: <DE title="Germany" className="w-5 h-auto rounded-sm" /> },
    { code: "fr", name: "Français", flag: <FR title="France" className="w-5 h-auto rounded-sm" /> },
  ];

  const currentLang = languages.find(l => i18n.language?.startsWith(l.code)) || languages[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  const changeLanguage = (code: string) => {
      document.cookie = `lang=${code}; path=/`;
    if (i18n?.changeLanguage) {
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
    timeoutRef.current = setTimeout(() => setIsOpen(false), 400);
  };

  if (!mounted) return null;

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all text-t-primary cursor-pointer group"
      >
     
        <span className={`text-[10px] flex items-center justify-center transition-transform duration-300 `}>
                    {currentLang.code === "en" ? currentLang.icon : currentLang.flag}

        </span>
      </button>

      {isOpen && (
        <div className="absolute   -ml-36 mt-3  min-w-[170px] bg-bg-primary border border-white/10 rounded-2xl shadow-2xl z-50 p-2 backdrop-blur-xl">
          <div className="flex flex-col gap-1">
            {languages.map((lang) => {
              const isActive = i18n.language?.startsWith(lang.code);
              return (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                    isActive ? "" : "hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 flex items-center justify-center">
                      {lang.flag}
                    </div>
                    <span className={`font-semibold ${isActive ? "text-t-secondary" : "text-t-primary/70"}`}>
                      {lang.name}
                    </span>
                  </div>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;