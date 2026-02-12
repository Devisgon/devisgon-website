"use client";
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../context/i18n'; 

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    if (i18n && typeof i18n.changeLanguage === 'function') {
      const newLang = i18n.language === "en" ? "ur" : "en";
      
      i18n.changeLanguage(newLang).then(() => {
        document.documentElement.lang = newLang;
      });
    } else {
      console.error("i18n.changeLanguage is missing. Check if I18nextProvider is in layout.js");
    }
  };

  return (
    <button
      onClick={toggleLanguage}
      style={{
        padding: '8px 16px',
        cursor: 'pointer',
        borderRadius: '5px',
        border: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: 'bold'
      }}
    >
      {i18n.language === "en" ? "🇬🇧 English" : "🇵🇰 اردو"}
    </button>
  );
};

export default LanguageSwitcher;