import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
import TechnologiesMainPage from "@/components/technologies/main_page";
import { getCachedLanguage } from "@/lib/language";
import { TECHNOLOGIES_PAGE_METADATA } from "@/lib/seo";
import { getTechnologiesListingData, getTechnologyData } from "@/data/loaders/technologies";
import navbarData from "@/data/navbar.json";

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
  const categoryDescriptionMap = new Map(listingCards.map((card) => [card.title.toLowerCase(), card.description]));

  const technologiesDropdown = navbarData.navbar.find((item) => item.name.toLowerCase() === "technologies")?.dropdown;
  const technologyGroups =
    technologiesDropdown?.columns
      ?.map((column) => {
        const cards =
          column.links
            ?.map((link) => {
              const slug = link.href.split("?")[0].split("/").filter(Boolean).pop();

              if (!slug) {
                return null;
              }

              const detailData = getTechnologyData(lang, slug);

              return {
                title: detailData?.hero_section.highlight ?? link.name,
                href: withLang(link.href),
                description:
                  detailData?.hero_section.description ??
                  `Production-ready implementation support for ${link.name.toLowerCase()}.`,
                icon_type: detailData?.why_use_section.cards?.[0]?.icon_type ?? "FaCode",
              };
            })
            .filter((card): card is NonNullable<typeof card> => Boolean(card)) ?? [];

        return {
          title: column.title,
          description:
            categoryDescriptionMap.get(column.title.toLowerCase()) ??
            `Explore modern ${column.title.toLowerCase()} stacks for scalable product delivery.`,
          cards,
        };
      })
      .filter((group) => group.cards.length > 0) ?? [];

  const localizedData = {
    ...data,
    technology_cards: listingCards.map((card) => ({
      ...card,
      href: withLang(card.href),
    })),
    technology_groups: technologyGroups,
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
