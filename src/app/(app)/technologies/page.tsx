import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
import TechnologiesMainPage from "@/components/technologies/main_page";
import { getCachedLanguage } from "@/lib/language";
import { TECHNOLOGIES_PAGE_METADATA } from "@/lib/seo";
import { getTechnologiesListingData } from "@/data/loaders/technologies";

export const metadata: Metadata = TECHNOLOGIES_PAGE_METADATA;

export default async function TechnologiesPage() {
  const lang = await getCachedLanguage();
  const data = getTechnologiesListingData(lang);

  if (!data) {
    notFound();
  }

  const isRTL = lang === "ur" || lang === "ar";
  const withLang = (href: string) => (lang === "en" ? href : `${href}${href.includes("?") ? "&" : "?"}lang=${lang}`);
  const listingCards = Array.isArray(data.technology_cards) ? data.technology_cards : [];

  const localizedData = {
    ...data,
    technology_cards: listingCards.map((card) => ({
      ...card,
      href: withLang(card.href),
    })),
  };

  return (
    <>
      <Header />
      <div className="overflow-x-hidden" dir={isRTL ? "rtl" : "ltr"}>
        <TechnologiesMainPage data={localizedData} />
      </div>
      <Footer />
    </>
  );
}
