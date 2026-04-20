import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
import IndustriesMainPage from "@/components/industries/main_page";
import { getCachedLanguage } from "@/lib/language";
import { INDUSTRIES_PAGE_METADATA } from "@/lib/seo";
import { getIndustriesListingData } from "@/data/loaders/industries";

export const metadata: Metadata = INDUSTRIES_PAGE_METADATA;

export default async function IndustriesPage() {
  const lang = await getCachedLanguage();
  const data = getIndustriesListingData(lang);

  if (!data) {
    notFound();
  }

  const isRTL = lang === "ur" || lang === "ar";
  const langSuffix = lang === "en" ? "" : `?lang=${lang}`;
  const localizedData = {
    ...data,
    industry_cards: data.industry_cards.map((card) => ({
      ...card,
      href: `${card.href}${langSuffix}`,
    })),
  };

  return (
    <>
      <Header />
      <div className="overflow-x-hidden" dir={isRTL ? "rtl" : "ltr"}>
        <IndustriesMainPage data={localizedData} />
      </div>
      <Footer />
    </>
  );
}
