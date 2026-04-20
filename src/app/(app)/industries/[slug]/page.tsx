import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/footer";
import Header from "@/components/navbar";
import IndustryHero from "@/components/industries/hero";
import IndustryFriction from "@/components/industries/friction";
import IndustryArchitecture from "@/components/industries/architecture";
import IndustryKeyBenefits from "@/components/industries/key_benefits";
import IndustryCaseStudies from "@/components/industries/case_studies";
import IndustryExplore from "@/components/industries/explore";
import IndustryConversation from "@/components/industries/conversation";
import { industriesData } from "@/data/loaders/industries";
import { getCachedLanguage } from "@/lib/language";
import { getIndustrySlugMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return getIndustrySlugMetadata(slug);
}

export default async function IndustryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const activeLang = await getCachedLanguage(query.lang);

  const data = industriesData[activeLang]?.[slug] || industriesData.en?.[slug];

  if (!data) {
    notFound();
  }

  const isRTL = activeLang === "ur" || activeLang === "ar";
  const langSuffix = activeLang === "en" ? "" : `?lang=${activeLang}`;
  const localizedExploreSection = {
    ...data.explore_section,
    cards: data.explore_section.cards.map((card) => ({
      ...card,
      href: `${card.href}${langSuffix}`,
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

