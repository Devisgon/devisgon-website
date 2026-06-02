import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
import TechnologiesMainPage from "@/components/technologies/main_page";
import InternalLinks, { TECHNOLOGY_INTERNAL_LINKS } from "@/components/shared/internal_links";
import { getCachedLanguage } from "@/lib/language";
import { getJsonSeoMetadata, TECHNOLOGIES_PAGE_METADATA } from "@/lib/seo";
import { getCanonicalTechnologySlug, getTechnologiesListingData, getTechnologyData } from "@/data/loaders/technologies";
import { findNavbarItemByHref, getNavbarDataByLang } from "@/lib/localized-content";
import { toSectionAnchor } from "@/lib/section-anchor";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}): Promise<Metadata> {
  const query = await searchParams;
  const lang = await getCachedLanguage(query.lang);
  const data = getTechnologiesListingData(lang);
  const englishData = getTechnologiesListingData("en");

  return getJsonSeoMetadata(data?.seo ?? englishData?.seo, TECHNOLOGIES_PAGE_METADATA, "/technologies");
}

function getLastPathSegment(href: string): string | null {
  const slug = href.split("?")[0].split("#")[0].split("/").filter(Boolean).pop();
  return slug ?? null;
}

export default async function TechnologiesPage() {
  const lang = await getCachedLanguage();
  const data = getTechnologiesListingData(lang);

  if (!data) {
    notFound();
  }

  const isRTL = lang === "ur" || lang === "ar";
  const withLang = (href: string) => (lang === "en" ? href : `${href}${href.includes("?") ? "&" : "?"}lang=${lang}`);
  const technologyHref = (slug: string) => withLang(`/technologies/${getCanonicalTechnologySlug(slug)}`);
  const listingCards = Array.isArray(data.technology_cards) ? data.technology_cards : [];
  const categorySections = Array.isArray(data.technology_categories_section?.technology_cards)
    ? data.technology_categories_section.technology_cards
    : [];
  const categoryDescriptionMap = new Map(
    [...categorySections, ...listingCards].map((card) => [card.title.toLowerCase(), card.description])
  );
  const navbarData = getNavbarDataByLang(lang);

  const technologiesDropdown = findNavbarItemByHref(navbarData, "/technologies")?.dropdown;
  const technologyGroups =
    (categorySections.length > 0
      ? categorySections.map((category) => ({
          title: category.title,
          anchor: category.slug ? toSectionAnchor(category.slug) : toSectionAnchor(category.title),
          description: category.description,
          links:
            category.technologies?.map((technology) => ({
              name: technology.title,
              href: technology.href,
              description: technology.description,
              slug: technology.slug,
            })) ?? [],
        }))
      : technologiesDropdown?.columns?.map((column) => ({
          title: column.title,
          anchor: toSectionAnchor(column.title),
          description:
            categoryDescriptionMap.get(column.title.toLowerCase()) ??
            `Explore modern ${column.title.toLowerCase()} stacks for scalable product delivery.`,
          links:
            column.links?.map((link) => ({
              name: link.name,
              href: link.href,
              description: undefined,
              slug: undefined,
            })) ?? [],
        })) ?? [])
      ?.map((column) => {
        const cards =
          column.links
            ?.map((link) => {
              const slug = link.slug ?? getLastPathSegment(link.href);

              if (!slug) {
                return null;
              }

              const detailData = getTechnologyData(lang, slug);

              return {
                title: link.name ?? detailData?.hero_section.highlight ?? slug,
                href: technologyHref(slug),
                description:
                  link.description ??
                  detailData?.hero_section.description ??
                  `Production-ready implementation support for ${link.name.toLowerCase()}.`,
                icon_type: detailData?.why_use_section.cards?.[0]?.icon_type ?? "FaCode",
              };
            })
            .filter((card): card is NonNullable<typeof card> => Boolean(card)) ?? [];

        return {
          anchor: column.anchor,
          title: column.title,
          description: column.description,
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
        <InternalLinks
          title="Connect Technologies to Services"
          description="Move from the technology library into implementation services, industry use cases, process, and project contact options."
          links={TECHNOLOGY_INTERNAL_LINKS}
        />
      </div>
      <Footer />
    </>
  );
}
