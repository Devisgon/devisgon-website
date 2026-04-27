import navbarEn from "@/data/navbar.json";
import navbarAr from "@/data/arabic_data/navbar.json";
import navbarZh from "@/data/chinese_data/navbar.json";
import navbarFr from "@/data/french_data/navbar.json";
import navbarDe from "@/data/german_data/navbar.json";
import navbarEs from "@/data/spanish_data/navbar.json";
import navbarUr from "@/data/urdu_data/navbar.json";

import footerEn from "@/data/english_data/footer.json";
import footerAr from "@/data/arabic_data/footer.json";
import footerZh from "@/data/chinese_data/footer.json";
import footerFr from "@/data/french_data/footer.json";
import footerDe from "@/data/german_data/footer.json";
import footerEs from "@/data/spanish_data/footer.json";
import footerUr from "@/data/urdu_data/footer.json";

import contactEn from "@/data/english_data/contact_page.json";
import contactAr from "@/data/arabic_data/contact_page.json";
import contactZh from "@/data/chinese_data/contact_page.json";
import contactFr from "@/data/french_data/contact_page.json";
import contactDe from "@/data/german_data/contact_page.json";
import contactEs from "@/data/spanish_data/contact_page.json";
import contactUr from "@/data/urdu_data/contact_page.json";

export const SUPPORTED_LANGUAGES = ["en", "ur", "ar", "zh", "es", "de", "fr"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const navbarByLang = {
  en: navbarEn,
  ar: navbarAr,
  zh: navbarZh,
  fr: navbarFr,
  de: navbarDe,
  es: navbarEs,
  ur: navbarUr,
} as const;

const footerByLang = {
  en: footerEn,
  ar: footerAr,
  zh: footerZh,
  fr: footerFr,
  de: footerDe,
  es: footerEs,
  ur: footerUr,
} as const;

const contactByLang = {
  en: contactEn,
  ar: contactAr,
  zh: contactZh,
  fr: contactFr,
  de: contactDe,
  es: contactEs,
  ur: contactUr,
} as const;

export type NavbarContent = typeof navbarEn;
export type FooterContent = typeof footerEn;
export type ContactPageContent = typeof contactEn;

export function normalizeLanguage(language: string | null | undefined): SupportedLanguage {
  if (language && SUPPORTED_LANGUAGES.includes(language as SupportedLanguage)) {
    return language as SupportedLanguage;
  }

  return "en";
}

export function getNavbarDataByLang(language: string | null | undefined): NavbarContent {
  return navbarByLang[normalizeLanguage(language)] ?? navbarByLang.en;
}

export function getFooterDataByLang(language: string | null | undefined): FooterContent {
  return footerByLang[normalizeLanguage(language)] ?? footerByLang.en;
}

export function getContactPageDataByLang(language: string | null | undefined): ContactPageContent {
  return contactByLang[normalizeLanguage(language)] ?? contactByLang.en;
}
