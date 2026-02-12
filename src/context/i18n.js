"use client"
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// english
import homeEn from '@/data/english_data/home_page.json';
import servicesEn from '@/data/english_data/services_page.json';
import privacyEn from '@/data/english_data/privacy_policy.json';
import termsEn from '@/data/english_data/terms_condition.json';
//urdu
import homeUr from '@/data/urdu_data/home_page.json';
import servicesUr from '@/data/urdu_data/services_page.json';
import privacyUr from '@/data/urdu_data/privacy_policy.json';
import termsUr from '@/data/urdu_data/terms_condition.json';
//arabic
import homeAr from '@/data/arabic_data/home_page.json';
import servicesAr from '@/data/arabic_data/services_page.json';
import privacyAr from '@/data/arabic_data/privacy_policy.json';
import termsAr from '@/data/arabic_data/terms_condition.json';
//french
import homeFr from '@/data/french_data/home_page.json';
import servicesFr from '@/data/french_data/services_page.json';
import privacyFr from '@/data/french_data/privacy_policy.json';
import termsFr from '@/data/french_data/terms_condition.json';

// Chinese
import homeZh from '@/data/chinese_data/home_page.json';
import servicesZh from '@/data/chinese_data/services_page.json';
import privacyZh from '@/data/chinese_data/privacy_policy.json';
import termsZh from '@/data/chinese_data/terms_condition.json';

//German
import homeDe from '@/data/german_data/home_page.json';
import servicesDe from '@/data/german_data/services_page.json';
import privacyDe from '@/data/german_data/privacy_policy.json';
import termsDe from '@/data/german_data/terms_condition.json';

// Spanish
import homeEs from '@/data/spanish_data/home_page.json';
import servicesEs from '@/data/spanish_data/services_page.json';
import privacyEs from '@/data/spanish_data/privacy_policy.json';
import termsEs from '@/data/spanish_data/terms_condition.json';

// Punjabi
import homePa from '@/data/punjabi_data/home_page.json';
import servicesPa from '@/data/punjabi_data/services_page.json';
import privacyPa from '@/data/punjabi_data/privacy_policy.json';
import termsPa from '@/data/punjabi_data/terms_condition.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next) 
  .init({
    resources: {
      en: { home: homeEn, services: servicesEn, privacy: privacyEn, terms: termsEn },
      ur: { home: homeUr, services: servicesUr, privacy: privacyUr, terms: termsUr },
      ar: { home: homeAr, services: servicesAr, privacy: privacyAr, terms: termsAr },
      fr: { home: homeFr, services: servicesFr, privacy: privacyFr, terms: termsFr },
      zh: { home: homeZh, services: servicesZh, privacy: privacyZh, terms: termsZh }, 
      de: { home: homeDe, services: servicesDe, privacy: privacyDe, terms: termsDe }, 
      es: { home: homeEs, services: servicesEs, privacy: privacyEs, terms: termsEs }, 
      pa: { home: homePa, services: servicesPa, privacy: privacyPa, terms: termsPa }, 
    },
    fallbackLng: 'en',
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