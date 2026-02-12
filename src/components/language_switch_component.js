"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../context/i18n'; 

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const currentLang = languages.find(l => l.code === (i18n.language || 'en')) || languages[0];

  const changeLanguage = (code) => {
    if (i18n && typeof i18n.changeLanguage === 'function') {
      i18n.changeLanguage(code).then(() => {
        document.documentElement.lang = code;
      });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-2 bg-transparent border-none text-t-primary cursor-pointer hover:opacity-80 transition-opacity focus:outline-none"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="uppercase font-bold text-sm tracking-wide">
          {i18n.language || 'en'}
        </span>
        <span 
          className={`text-[10px] transition-transform duration-300 ${
            isOpen ? 'rotate-0' : 'rotate-180'
          }`}
        >
          ▴
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-3 bg-bg-primary border border-gray-100 dark:border-gray-800 rounded-xl shadow-2xl z-50 p-1 min-w-[150px] overflow-hidden">
          <div className="flex flex-col gap-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                  i18n.language === lang.code 
                    ? 'bg-gray-100 dark:bg-gray-800 font-bold text-t-primary' 
                    : 'text-t-primary hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{lang.flag}</span>
                  <span>{lang.name}</span>
                </div>
                {i18n.language === lang.code && (
                  <span className="text-blue-500 font-bold">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;