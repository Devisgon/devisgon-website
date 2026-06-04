"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FiGlobe } from "react-icons/fi";
import CN from "country-flag-icons/react/3x2/CN";
import DE from "country-flag-icons/react/3x2/DE";
import ES from "country-flag-icons/react/3x2/ES";
import FR from "country-flag-icons/react/3x2/FR";
import PK from "country-flag-icons/react/3x2/PK";
import SA from "country-flag-icons/react/3x2/SA";
import US from "country-flag-icons/react/3x2/US";

type LanguageOption = {
  code: string;
  name: string;
  flag?: React.ReactNode;
};

interface LanguageSwitcherProps {
  onLanguageChange?: (code: string) => void;
}

const languages: LanguageOption[] = [
  { code: "en", name: "English", flag: <US title="United States" className="w-5 h-auto rounded-sm" /> },
  { code: "ur", name: "Urdu", flag: <PK title="Pakistan" className="w-5 h-auto rounded-sm" /> },
  { code: "ar", name: "Arabic", flag: <SA title="Saudi Arabia" className="w-5 h-auto rounded-sm" /> },
  { code: "zh", name: "Chinese", flag: <CN title="China" className="w-5 h-auto rounded-sm" /> },
  { code: "es", name: "Spanish", flag: <ES title="Spain" className="w-5 h-auto rounded-sm" /> },
  { code: "de", name: "German", flag: <DE title="Germany" className="w-5 h-auto rounded-sm" /> },
  { code: "fr", name: "French", flag: <FR title="France" className="w-5 h-auto rounded-sm" /> },
];

const getCookieValue = (name: string): string | null => {
  const token = `${name}=`;
  const match = document.cookie.split("; ").find((cookie) => cookie.startsWith(token));
  return match ? decodeURIComponent(match.slice(token.length)) : null;
};

const LanguageSwitcher = ({ onLanguageChange }: LanguageSwitcherProps) => {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [currentCode, setCurrentCode] = useState("en");

  useEffect(() => {
    const cookieLang = getCookieValue("lang");
    if (cookieLang && languages.some((lang) => lang.code === cookieLang)) {
      setCurrentCode(cookieLang);
      document.documentElement.lang = cookieLang;
    }
  }, []);

  const changeLanguage = (code: string) => {
    document.cookie = `lang=${code}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = code;
    window.dispatchEvent(new Event("app-language-change"));
    setCurrentCode(code);
    onLanguageChange?.(code);
    setIsOpen(false);
    router.refresh();
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 400);
  };

  const currentLang = languages.find((lang) => lang.code === currentCode) ?? languages[0];

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
        <span className="text-[10px] flex items-center justify-center transition-transform duration-300">
          {currentLang.code === "en" ? (
            <FiGlobe className="text-t-primary w-5 h-5" />
          ) : (
            currentLang.flag
          )}
        </span>
      </button>

      {isOpen && (
        <div className="absolute md:-ml-36 mt-3 min-w-[170px] bg-bg-primary border border-white/10 rounded-2xl shadow-2xl z-50 p-2 backdrop-blur-xl">
          <div className="flex flex-col gap-1">
            {languages.map((lang) => {
              const isActive = currentCode === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                    isActive ? "" : "hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 flex items-center justify-center">{lang.flag}</div>
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
