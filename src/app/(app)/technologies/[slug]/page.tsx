import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Footer from "@/components/footer";
import Header from "@/components/navbar";
import InternalLinks, { TECHNOLOGY_INTERNAL_LINKS } from "@/components/shared/internal_links";
import TechnologyHero from "@/components/technologies/hero";
import TechnologyWhyUse from "@/components/technologies/why_use";
import TechnologyArchitecture from "@/components/technologies/architecture";
import TechnologyCompetitiveEdge from "@/components/technologies/competitive_edge";
import TechnologyQuote from "@/components/technologies/quote";
import TechnologyConversation from "@/components/technologies/conversation";
import { getCachedLanguage } from "@/lib/language";
import { getJsonSeoMetadata, getTechnologySlugMetadata } from "@/lib/seo";
import { getCanonicalTechnologySlug, getTechnologyData } from "@/data/loaders/technologies";
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
  const canonicalSlug = getCanonicalTechnologySlug(slug);
  const fallback = getTechnologySlugMetadata(canonicalSlug);
  const localizedData = getTechnologyData(activeLang, canonicalSlug);
  const englishData = getTechnologyData("en", canonicalSlug);

  return getJsonSeoMetadata(
    localizedData?.seo_metadata ?? englishData?.seo_metadata,
    fallback,
    `/technologies/${canonicalSlug}`,
  );
}

export default async function TechnologyDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const activeLang = await getCachedLanguage(query.lang);

  const canonicalSlug = getCanonicalTechnologySlug(toCanonicalSlug(slug));

  if (slug !== canonicalSlug) {
    const langSuffix = activeLang === "en" ? "" : `?lang=${activeLang}`;
    redirect(`/technologies/${canonicalSlug}${langSuffix}`);
  }

  const data = getTechnologyData(activeLang, canonicalSlug);

  if (!data) {
    notFound();
  }

  const isRTL = activeLang === "ur" || activeLang === "ar";

  return (
    <>
      <Header />
      <div className="overflow-x-hidden" dir={isRTL ? "rtl" : "ltr"}>
        <TechnologyHero data={data.hero_section} />
        <TechnologyWhyUse data={data.why_use_section} />
        <TechnologyArchitecture data={data.architecture_section} />
        <TechnologyCompetitiveEdge data={data.edge_section} />
        <TechnologyQuote data={data.quote_section} />
        <InternalLinks
          title="Related Technology Paths"
          description="Connect this stack to services, industry solutions, delivery process, and contact options."
          links={TECHNOLOGY_INTERNAL_LINKS}
        />
        <TechnologyConversation data={data.conversation_section} />
      </div>
      <Footer />
    </>
  );
}
