import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Footer from "@/components/footer";
import Header from "@/components/navbar";
import IndustryArchitecture from "@/components/industries/architecture";
import IndustryFriction from "@/components/industries/friction";
import IndustryHero from "@/components/industries/hero";
import IndustryKeyBenefits from "@/components/industries/key_benefits";
import { getIndustryCategoryBySlug, getIndustryData, toPublicIndustrySlug } from "@/data/loaders/industries";
import { getCachedLanguage } from "@/lib/language";
import { getIndustrySlugMetadata, getJsonSeoMetadata, INDUSTRIES_PAGE_METADATA } from "@/lib/seo";
import { toCanonicalSlug } from "@/lib/slugs";
import { getIndustryCroUi } from "@/data/industry-cro-ui";
import { IndustryCalculatorAndProcess, IndustryProofStrip, IndustryServiceGrid } from "@/components/industries/conversion_sections";

const INDUSTRIES_LISTING_ALIAS_SLUG = "ai-automation-software-solutions";

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

  if (publicSlug === INDUSTRIES_LISTING_ALIAS_SLUG) {
    return getJsonSeoMetadata(undefined, INDUSTRIES_PAGE_METADATA, "/industries");
  }

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

  if (publicSlug === INDUSTRIES_LISTING_ALIAS_SLUG) {
    const langSuffix = activeLang === "en" ? "" : `?lang=${activeLang}`;
    redirect(`/industries${langSuffix}`);
  }

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

  const croCopy = await getIndustryCroUi(activeLang);

  const isRTL = activeLang === "ur" || activeLang === "ar";
  const sourcePage = "/industries/" + toCanonicalSlug(publicSlug);

  return (
    <>
      <Header />
      <div className="overflow-x-hidden" dir={isRTL ? "rtl" : "ltr"}>
        <IndustryHero
          data={data.hero_section}
          slides={data.carousel_section?.cards}
          conversation={data.conversation_section}
          lang={activeLang}
          sourcePage={sourcePage}
          calculatorLabel={croCopy.calculatorLink}
          headingPrefix={croCopy.heroHeadingPrefix}
          primaryCtaLabel={croCopy.heroCta}
        />
        <IndustryProofStrip copy={croCopy} data={data.proof_section} />
        <IndustryFriction data={data.friction_section} />
        <IndustryArchitecture data={data.architecture_section} ctaLabel={croCopy.architectureCta} />
        <IndustryServiceGrid copy={croCopy} />
        <IndustryKeyBenefits data={data.benefits_section} ctaLabel={croCopy.benefitsCta} />
        <IndustryCalculatorAndProcess copy={croCopy} lang={activeLang} />
      </div>
      <Footer />
    </>
  );
}
