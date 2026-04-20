import type { Metadata } from "next";
import Footer from "@/components/footer";
import Header from "@/components/navbar";
import IndustriesMainPage from "@/components/industries/main_page";
import { getCachedLanguage } from "@/lib/language";
import { INDUSTRIES_PAGE_METADATA } from "@/lib/seo";
import type { IndustryListingData } from "@/types/industries_page";

import dataEn from "@/data/english_data/industries_page.json";
import dataUr from "@/data/urdu_data/industries_page.json";
import dataAr from "@/data/arabic_data/industries_page.json";
import dataFr from "@/data/french_data/industries_page.json";
import dataZh from "@/data/chinese_data/industries_page.json";
import dataDe from "@/data/german_data/industries_page.json";
import dataEs from "@/data/spanish_data/industries_page.json";

const langMap: Record<string, IndustryListingData> = {
  en: dataEn as IndustryListingData,
  ur: dataUr as IndustryListingData,
  ar: dataAr as IndustryListingData,
  fr: dataFr as IndustryListingData,
  zh: dataZh as IndustryListingData,
  de: dataDe as IndustryListingData,
  es: dataEs as IndustryListingData,
};

export const metadata: Metadata = INDUSTRIES_PAGE_METADATA;

type PageProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

export default async function IndustriesPage({ searchParams }: PageProps) {
  const query = await searchParams;
  const lang = await getCachedLanguage(query.lang);
  const pageData = langMap[lang] ?? langMap.en;
  const langSuffix = lang === "en" ? "" : `?lang=${lang}`;

  const localizedData: IndustryListingData = {
    ...pageData,
    industry_cards: pageData.industry_cards.map((card) => ({
      ...card,
      href: `${card.href}${langSuffix}`,
    })),
  };

  return (
    <>
      <Header />
      <IndustriesMainPage data={localizedData} />
      <Footer />
    </>
  );
}

