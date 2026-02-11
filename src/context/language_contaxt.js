"use client";
import { createContext, useContext, useState, useEffect } from 'react';

// English Data
import homeEn from '@/data/english_data/home_page.json';
import servicesEn from '@/data/english_data/services_page.json';
import privacyEn from '@/data/english_data/privacy_policy.json';
import termsEn from '@/data/english_data/terms_condition.json';

// Urdu Data (from your 'ur' folder)
import homeUr from '@/data/urdu_data/home_page.json';
import servicesUr from '@/data/urdu_data/services_page.json';
import privacyUr from '@/data/urdu_data/privacy_policy.json';
import termsUr from '@/data/urdu_data/terms_condition.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const dictionary = {
    en: { home: homeEn, services: servicesEn, privacy: privacyEn, terms: termsEn },
    ur: { home: homeUr, services: servicesUr, privacy: privacyUr, terms: termsUr }
  };

 

  const toggleLanguage = () => setLang((prev) => (prev === 'en' ? 'ur' : 'en'));

  return (
    <LanguageContext.Provider value={{ lang, setLang, data: dictionary[lang], toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);