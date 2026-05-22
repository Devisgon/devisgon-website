import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Footer from "@/components/footer";
import Header from "@/components/navbar";
import ServicesCtaSection from "@/components/services_page/cta_section";
import Casestudy from "@/components/sub_services_pages/case_study";
import Faqs from "@/components/sub_services_pages/faq";
import Hero from "@/components/sub_services_pages/hero";
import Introduction from "@/components/sub_services_pages/introduction";
import KeyBenefitsSection from "@/components/sub_services_pages/key_benefits";
import Progress from "@/components/sub_services_pages/process_section";
import Technalogies from "@/components/sub_services_pages/technalogies";
import WhatYouGetSection from "@/components/sub_services_pages/what_we_do";
import { getCachedLanguage } from "@/lib/language";
import { getJsonSeoMetadata, getServiceSlugMetadata } from "@/lib/seo";
import { getServiceDetailData } from "@/lib/service-detail";
import { toCanonicalSlug } from "@/lib/slugs";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

function servicePath(slug: string, lang: string) {
  const langSuffix = lang === "en" ? "" : `?lang=${lang}`;
  return `/services/${slug}${langSuffix}`;
}

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
  const canonicalSlug = toCanonicalSlug(slug);
  const fallback = getServiceSlugMetadata(canonicalSlug);
  const localizedResult = getServiceDetailData(activeLang, canonicalSlug);
  const englishResult = getServiceDetailData("en", canonicalSlug);
  const result = localizedResult ?? englishResult;

  return getJsonSeoMetadata(
    localizedResult?.data?.seo_metadata ?? englishResult?.data?.seo_metadata,
    fallback,
    `/services/${result?.slug ?? canonicalSlug}`,
  );
}

export default async function ServiceDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const activeLang = await getCachedLanguage(query.lang);
  const canonicalSlug = toCanonicalSlug(slug);

  if (slug !== canonicalSlug) {
    redirect(servicePath(canonicalSlug, activeLang));
  }

  const result = getServiceDetailData(activeLang, canonicalSlug);

  if (!result) {
    notFound();
  }

  if (result.slug !== canonicalSlug) {
    redirect(servicePath(result.slug, activeLang));
  }

  const { data } = result;
  const isRTL = activeLang === "ur" || activeLang === "ar";

  return (
    <>
      <Header />
      <div className="overflow-x-hidden" dir={isRTL ? "rtl" : "ltr"}>
        <Hero data={data.hero_section} />
        <Introduction data={data.introduction_section} />
        <KeyBenefitsSection data={data.key_benefits_section} />
        <WhatYouGetSection data={data.what_you_get_section} />
        <Technalogies data={data.technologies_section} />
        <Progress data={data.process_section} />
        <Casestudy data={data.case_study_section} />
        <Faqs data={data.faq_section} />
        <ServicesCtaSection />
      </div>
      <Footer />
    </>
  );
}
