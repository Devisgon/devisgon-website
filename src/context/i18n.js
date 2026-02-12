"use client"
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all your JSON files
import homeEn from '@/data/english_data/home_page.json';
import servicesEn from '@/data/english_data/services_page.json';
import privacyEn from '@/data/english_data/privacy_policy.json';
import termsEn from '@/data/english_data/terms_condition.json';

import homeUr from '@/data/urdu_data/home_page.json';
import servicesUr from '@/data/urdu_data/services_page.json';
import privacyUr from '@/data/urdu_data/privacy_policy.json';
import termsUr from '@/data/urdu_data/terms_condition.json';


import homeAr from '@/data/arabic_data/home_page.json';
import servicesAr from '@/data/arabic_data/services_page.json';
import privacyAr from '@/data/arabic_data/privacy_policy.json';
import termsAr from '@/data/arabic_data/terms_condition.json';



i18n
  .use(LanguageDetector)
  .use(initReactI18next) 
  .init({
    resources: {
      en: {
        home: homeEn,
        services: servicesEn,
        privacy: privacyEn,
        terms: termsEn
      },
      ur: {
        home: homeUr,
        services: servicesUr,
        privacy: privacyUr,
        terms: termsUr
      },
       ar : {
        home: homeAr,
        services: servicesAr,
        privacy: privacyAr,
        terms: termsAr
      }
    },
    fallbackLng: 'en',
    lng: 'en', 
    debug: false, 
    
    ns: ['home', 'services', 'privacy', 'terms'],
    defaultNS: 'home',
    
    interpolation: {
      escapeValue: false 
    },
    
    react: {
      useSuspense: false
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'app-lang'
    }
  });

export default i18n;