import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
import IndustriesMainPage from "@/components/industries/main_page";
import { getCachedLanguage } from "@/lib/language";
import { INDUSTRIES_PAGE_METADATA } from "@/lib/seo";
import { getIndustriesListingData, getIndustryData, INDUSTRY_GROUPS } from "@/data/loaders/industries";

export const metadata: Metadata = INDUSTRIES_PAGE_METADATA;

const CATEGORY_LABELS: Record<string, string> = {
  healthcare: "Healthcare",
  professional: "Professional",
  trades: "Trades",
  entertainment: "Entertainment",
  agriculture: "Agriculture",
  real_estate: "Real Estate",
};

function formatSlug(slug: string): string {
  return slug
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

export default async function IndustriesPage() {
  const lang = await getCachedLanguage();
  const data = getIndustriesListingData(lang);

  if (!data) {
    notFound();
  }

  const isRTL = lang === "ur" || lang === "ar";
  const withLang = (href: string) => (lang === "en" ? href : `${href}${href.includes("?") ? "&" : "?"}lang=${lang}`);
  const listingCards = Array.isArray(data.industry_cards) ? data.industry_cards : [];
  const categoryDescriptionMap = new Map(
    listingCards.map((card) => [card.title.toLowerCase(), card.description])
  );

  const industryGroups = Object.entries(INDUSTRY_GROUPS)
    .map(([category, slugs]) => {
      const categoryTitle = CATEGORY_LABELS[category] ?? formatSlug(category);
      const cards = slugs
        .map((slug) => {
          const detailData = getIndustryData(lang, category, slug);
          const href = withLang(`/industries/${category}/${slug}`);

          return {
            title: detailData?.hero_section.highlight ?? formatSlug(slug),
            href,
            description:
              detailData?.hero_section.description ??
              `Specialized AI solutions for ${formatSlug(slug).toLowerCase()} operations.`,
            icon_type:
              detailData?.benefits_section.cards?.[0]?.icon_type ??
              detailData?.friction_section.cards?.[0]?.icon_type ??
              "FaArrowRight",
          };
        })
        .filter((card) => Boolean(card.href));

      return {
        title: categoryTitle,
        description:
          categoryDescriptionMap.get(categoryTitle.toLowerCase()) ??
          `Specialized AI solutions for ${categoryTitle.toLowerCase()} organizations.`,
        cards,
      };
    })
    .filter((group) => group.cards.length > 0);

  const localizedData = {
    ...data,
    industry_cards: listingCards.map((card) => ({
      ...card,
      href: withLang(card.href),
    })),
    industry_groups: industryGroups,
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
