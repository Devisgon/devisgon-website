import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Footer from "@/components/footer";
import Header from "@/components/navbar";
import IndustryArchitecture from "@/components/industries/architecture";
import IndustryCarousel from "@/components/industries/carousel";
import IndustryCaseStudies from "@/components/industries/case_studies";
import IndustryConversation from "@/components/industries/conversation";
import IndustryExplore from "@/components/industries/explore";
import IndustryFriction from "@/components/industries/friction";
import IndustryHero from "@/components/industries/hero";
import IndustryKeyBenefits from "@/components/industries/key_benefits";
import { getIndustryCategoryBySlug, getIndustryData, toPublicIndustrySlug } from "@/data/loaders/industries";
import { getCachedLanguage } from "@/lib/language";
import { getIndustrySlugMetadata, getJsonSeoMetadata } from "@/lib/seo";
import { toCanonicalSlug } from "@/lib/slugs";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const query = await searchParams;
  const activeLang = await getCachedLanguage(query.lang);
  const publicSlug = toPublicIndustrySlug(slug);
  const fallback = getIndustrySlugMetadata(publicSlug);
  const category = getIndustryCategoryBySlug(publicSlug);

  if (!category) {
    return fallback;
  }

  const localizedData = getIndustryData(activeLang, category, publicSlug);
  const englishData = getIndustryData("en", category, publicSlug);

  return getJsonSeoMetadata(
    localizedData?.seo_metadata ??
      localizedData?.seo ??
      englishData?.seo_metadata ??
      englishData?.seo,
    fallback,
    `/industries/${publicSlug}`,
  );
}

export default async function IndustrySlugPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const activeLang = await getCachedLanguage(query.lang);
  const publicSlug = toPublicIndustrySlug(slug);

  if (slug !== publicSlug) {
    const langSuffix = activeLang === "en" ? "" : `?lang=${activeLang}`;
    redirect(`/industries/${publicSlug}${langSuffix}`);
  }

  const category = getIndustryCategoryBySlug(publicSlug);

  if (!category) {
    notFound();
  }

  const data = getIndustryData(activeLang, category, publicSlug);

  if (!data) {
    notFound();
  }

  const isRTL = activeLang === "ur" || activeLang === "ar";
  const localizeHref = (href: string) => {
    if (activeLang === "en") {
      return href;
    }

    const queryJoiner = href.includes("?") ? "&" : "?";
    return `${href}${queryJoiner}lang=${activeLang}`;
  };

  const localizedExploreSection = {
    ...data.explore_section,
    cards: data.explore_section.cards.map((card) => ({
      ...card,
      href: localizeHref(card.href),
    })),
  };

  return (
    <>
      <Header />
      <div className="overflow-x-hidden" dir={isRTL ? "rtl" : "ltr"}>
        <IndustryHero data={data.hero_section} slides={data.carousel_section?.cards} />
        <IndustryFriction data={data.friction_section} />
        <IndustryArchitecture data={data.architecture_section} />
        <IndustryKeyBenefits data={data.benefits_section} />
        {data.carousel_section ? <IndustryCarousel data={data.carousel_section} /> : null}
        <IndustryCaseStudies data={data.case_studies_section} />
        <IndustryExplore data={localizedExploreSection} />
        <IndustryConversation
          data={data.conversation_section}
          industryName={data.hero_section.highlight}
          sourcePage={`/industries/${toCanonicalSlug(publicSlug)}`}
        />
      </div>
      <Footer />
    </>
  );
}
