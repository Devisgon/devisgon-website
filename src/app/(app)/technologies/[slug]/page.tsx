import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/footer";
import Header from "@/components/navbar";
import TechnologyHero from "@/components/technologies/hero";
import TechnologyWhyUse from "@/components/technologies/why_use";
import TechnologyArchitecture from "@/components/technologies/architecture";
import TechnologyCompetitiveEdge from "@/components/technologies/competitive_edge";
import TechnologyQuote from "@/components/technologies/quote";
import TechnologyConversation from "@/components/technologies/conversation";
import { getCachedLanguage } from "@/lib/language";
import { getTechnologySlugMetadata } from "@/lib/seo";
import { getTechnologyData } from "@/data/loaders/technologies";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return getTechnologySlugMetadata(slug);
}

export default async function TechnologyDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const activeLang = await getCachedLanguage(query.lang);
  const data = getTechnologyData(activeLang, slug);

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
        <TechnologyConversation data={data.conversation_section} />
      </div>
      <Footer />
    </>
  );
}
