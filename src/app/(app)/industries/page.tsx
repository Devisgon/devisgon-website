import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
import IndustriesMainPage from "@/components/industries/main_page";
import { getCachedLanguage } from "@/lib/language";
import { getJsonSeoMetadata, INDUSTRIES_PAGE_METADATA } from "@/lib/seo";
import { getIndustriesListingData, getIndustryData, INDUSTRY_GROUPS } from "@/data/loaders/industries";
import { findNavbarItemByHref, getNavbarDataByLang } from "@/lib/localized-content";
import { toSectionAnchor } from "@/lib/section-anchor";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}): Promise<Metadata> {
  const query = await searchParams;
  const lang = await getCachedLanguage(query.lang);
  const data = getIndustriesListingData(lang);
  const englishData = getIndustriesListingData("en");

  return getJsonSeoMetadata(data?.seo ?? englishData?.seo, INDUSTRIES_PAGE_METADATA, "/industries");
}

function formatSlug(slug: string): string {
  return slug
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

function getLastPathSegment(href: string): string | null {
  const slug = href.split("?")[0].split("#")[0].split("/").filter(Boolean).pop();
  return slug ?? null;
}

export default async function IndustriesPage() {
  const lang = await getCachedLanguage();
  const data = getIndustriesListingData(lang);

  if (!data) {
    notFound();
  }

  const isRTL = lang === "ur" || lang === "ar";
  const withLang = (href: string) => (lang === "en" ? href : `${href}${href.includes("?") ? "&" : "?"}lang=${lang}`);
  const industryHref = (slug: string) => withLang(`/industries/${slug}`);
  const listingCards = Array.isArray(data.industry_cards) ? data.industry_cards : [];
  const categorySections = Array.isArray(data.industry_categories_section?.categories)
    ? data.industry_categories_section.categories
    : [];
  const categoryDescriptionMap = new Map(
    [...categorySections, ...listingCards].map((card) => [card.title.toLowerCase(), card.description])
  );
  const navbarData = getNavbarDataByLang(lang);
  const industriesDropdown = findNavbarItemByHref(navbarData, "/industries")?.dropdown;
  const slugCategoryMap = new Map(
    Object.entries(INDUSTRY_GROUPS).flatMap(([category, slugs]) => slugs.map((slug) => [slug, category]))
  );

  const industryGroups =
    (categorySections.length > 0
      ? categorySections.map((category) => ({
          title: category.title,
          anchor: category.slug ? toSectionAnchor(category.slug) : toSectionAnchor(category.title),
          description: category.description,
          categorySlug: category.slug,
          links:
            category.sub_industries?.map((subIndustry) => ({
              name: subIndustry.title,
              href: subIndustry.href,
              description: subIndustry.description,
              slug: subIndustry.slug,
            })) ?? [],
        }))
      : industriesDropdown?.columns?.map((column) => ({
          title: column.title,
          anchor: toSectionAnchor(column.title),
          description:
            categoryDescriptionMap.get(column.title.toLowerCase()) ??
            `Specialized AI solutions for ${column.title.toLowerCase()} organizations.`,
          categorySlug: toSectionAnchor(column.title),
          links: column.links.map((link) => ({
            name: link.name,
            href: link.href,
            description: undefined,
            slug: undefined,
          })),
        })) ?? []
    )
      .map((column) => {
        const cards = column.links
          .map((link) => {
          const slug = link.slug ?? getLastPathSegment(link.href);

          if (!slug) {
            return null;
          }

          const category = slugCategoryMap.get(slug) ?? column.categorySlug;
          if (!category) {
            return null;
          }

          const detailData = getIndustryData(lang, category, slug);

          return {
            title: link.name ?? detailData?.hero_section.highlight ?? formatSlug(slug),
            href: industryHref(slug),
            description:
              link.description ??
              detailData?.hero_section.description ??
              `Specialized AI solutions for ${formatSlug(slug).toLowerCase()} operations.`,
            icon_type:
              detailData?.benefits_section.cards?.[0]?.icon_type ??
              detailData?.friction_section.cards?.[0]?.icon_type ??
              "FaArrowRight",
          };
        })
          .filter((card): card is NonNullable<typeof card> => Boolean(card));

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
