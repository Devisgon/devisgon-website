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

import getStartedEn from "@/data/english_data/get_started_page.json";
import getStartedAr from "@/data/arabic_data/get_started_page.json";
import getStartedZh from "@/data/chinese_data/get_started_page.json";
import getStartedFr from "@/data/french_data/get_started_page.json";
import getStartedDe from "@/data/german_data/get_started_page.json";
import getStartedEs from "@/data/spanish_data/get_started_page.json";
import getStartedUr from "@/data/urdu_data/get_started_page.json";

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

const getStartedByLang = {
  en: getStartedEn,
  ar: getStartedAr,
  zh: getStartedZh,
  fr: getStartedFr,
  de: getStartedDe,
  es: getStartedEs,
  ur: getStartedUr,
} as const;

export type NavbarContent = typeof navbarEn;
export type FooterContent = typeof footerEn;
export type ContactPageContent = typeof contactEn;
export type GetStartedPageContent = typeof getStartedEn;
type NavbarItem = NavbarContent["navbar"][number];

export function normalizeLanguage(language: string | null | undefined): SupportedLanguage {
  if (!language) return "en";

  const raw = language.toLowerCase().trim();
  const aliases: Record<string, SupportedLanguage> = {
    "zh-cn": "zh",
    "zh-hans": "zh",
    "zh-hant": "zh",
    cn: "zh",
  };

  if (aliases[raw]) return aliases[raw];

  if (SUPPORTED_LANGUAGES.includes(raw as SupportedLanguage)) {
    return raw as SupportedLanguage;
  }

  const base = raw.split("-")[0];
  if (SUPPORTED_LANGUAGES.includes(base as SupportedLanguage)) {
    return base as SupportedLanguage;
  }

  return "en";
}

export function getNavbarDataByLang(language: string | null | undefined): NavbarContent {
  return navbarByLang[normalizeLanguage(language)] ?? navbarByLang.en;
}

export function findNavbarItemByHref(navbarData: NavbarContent, href: string): NavbarItem | undefined {
  const queue: NavbarItem[] = [...navbarData.navbar];

  while (queue.length > 0) {
    const item = queue.shift();

    if (!item) {
      continue;
    }

    if (item.href === href) {
      return item;
    }

    for (const column of item.dropdown?.columns ?? []) {
      queue.push(...(column.links as NavbarItem[]));
    }
  }

  return undefined;
}

export function getFooterDataByLang(language: string | null | undefined): FooterContent {
  return footerByLang[normalizeLanguage(language)] ?? footerByLang.en;
}

export function getContactPageDataByLang(language: string | null | undefined): ContactPageContent {
  return contactByLang[normalizeLanguage(language)] ?? contactByLang.en;
}

export function getGetStartedPageDataByLang(language: string | null | undefined): GetStartedPageContent {
  return getStartedByLang[normalizeLanguage(language)] ?? getStartedByLang.en;
}
