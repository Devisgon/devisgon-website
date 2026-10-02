import { getCachedLanguage } from "@/lib/language";
import ConversionHome from "@/components/home_page/conversion_home";

import homeEn from '@/data/english_data/home_page.json';
import homeUr from '@/data/urdu_data/home_page.json';
import homeAr from '@/data/arabic_data/home_page.json';
import homeFr from '@/data/french_data/home_page.json';
import homeZh from '@/data/chinese_data/home_page.json';
import homeDe from '@/data/german_data/home_page.json';
import homeEs from '@/data/spanish_data/home_page.json';

const langMap: Record<string, typeof homeEn> = {
  en: homeEn, ur: homeUr, ar: homeAr,
  fr: homeFr, zh: homeZh, de: homeDe, es: homeEs,
};

export default async function Home() {
  const lang = await getCachedLanguage();
  const t = langMap[lang] ?? langMap['en'];

  // Keep one homepage layout for every supported language. Copy continues to
  // come from the language-specific dataset already used by the legacy page.
  return <ConversionHome lang={lang} homeCopy={t} />;
}
