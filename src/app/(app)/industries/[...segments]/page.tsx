import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Footer from "@/components/footer";
import Header from "@/components/navbar";
import IndustryHero from "@/components/industries/hero";
import IndustryFriction from "@/components/industries/friction";
import IndustryArchitecture from "@/components/industries/architecture";
import IndustryKeyBenefits from "@/components/industries/key_benefits";
import IndustryCaseStudies from "@/components/industries/case_studies";
import IndustryExplore from "@/components/industries/explore";
import IndustryConversation from "@/components/industries/conversation";
import { getIndustryCategoryBySlug, getIndustryData } from "@/data/loaders/industries";
import { getCachedLanguage } from "@/lib/language";
import { getIndustrySlugMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

export async function generateMetadata({ params }: { params: Promise<{ segments: string[] }> }): Promise<Metadata> {
  const { segments } = await params;
  const slug = segments?.[segments.length - 1] ?? "industry";
  return getIndustrySlugMetadata(slug);
}

export default async function IndustryPage({ params, searchParams }: PageProps) {
  const { segments } = await params;
  const query = await searchParams;
  const activeLang = await getCachedLanguage(query.lang);

  if (!segments || segments.length === 0) {
    notFound();
  }

  if (segments.length === 1) {
    const [legacySlug] = segments;
    const category = getIndustryCategoryBySlug(legacySlug);

    if (!category) {
      notFound();
    }

    const langSuffix = activeLang === "en" ? "" : `?lang=${activeLang}`;
    redirect(`/industries/${category}/${legacySlug}${langSuffix}`);
  }

  if (segments.length !== 2) {
    notFound();
  }

  const [category, slug] = segments;
  const data = getIndustryData(activeLang, category, slug);

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
        <IndustryHero data={data.hero_section} />
        <IndustryFriction data={data.friction_section} />
        <IndustryArchitecture data={data.architecture_section} />
        <IndustryKeyBenefits data={data.benefits_section} />
        <IndustryCaseStudies data={data.case_studies_section} />
        <IndustryExplore data={localizedExploreSection} />
        <IndustryConversation data={data.conversation_section} />
      </div>
      <Footer />
    </>
  );
}
