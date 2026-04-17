import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { workflowData } from "@/data/loaders/testing";
import { getCachedLanguage } from "@/lib/language";
import { getServiceSlugMetadata } from "@/lib/seo";

import Footer from "@/components/footer";
import Header from "@/components/navbar";
import Hero from "@/components/sub_services_pages/hero";
import Introduction from "@/components/sub_services_pages/introduction";
import KeyBenefitsSection from "@/components/sub_services_pages/key_benefits";
import WhatYouGetSection from "@/components/sub_services_pages/what_we_do";
import Technalogies from "@/components/sub_services_pages/technalogies";
import Progress from "@/components/sub_services_pages/process_section";
import Casestudy from "@/components/sub_services_pages/case_study";
import Faqs from "@/components/sub_services_pages/faq";
import Contact from "@/components/sub_services_pages/contact";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return getServiceSlugMetadata(slug);
}

export default async function IndustryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const activeLang = await getCachedLanguage(query.lang);

  const data = workflowData[activeLang]?.[slug] || workflowData.en?.[slug];

  if (!data) {
    notFound();
  }

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
        <Contact />
      </div>
      <Footer />
    </>
  );
}
