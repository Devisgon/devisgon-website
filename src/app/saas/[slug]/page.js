import Header from "@/components/navbar";
import Hero from "@/components/industries_pages/hero";
import Introduction from "@/components/industries_pages/introduction";
import KeyBenefitsSection from "@/components/industries_pages/key_benefits";
import WhatYouGetSection from "@/components/industries_pages/what_we_do";
import Technalogies from "@/components/industries_pages/technalogies";
import Progress from "@/components/industries_pages/process_section";
import Casestudy from "@/components/industries_pages/case_study";
import Faqs from "@/components/industries_pages/faq";
import Footer from "@/components/footer";
import { notFound } from "next/navigation";

export default async function IndustryPage({ params }) {
  const { slug } = params;

  if (!slug) notFound();

  let page;

  try {
    const data = await import(
      `@/data/services/ai_and_saas_developments/${slug}.json`
    );
    page = data.default;
  } catch (error) {
    console.error("Industry JSON not found:", slug);
    notFound();
  }

  return (
    <>
      <Header />
      <Hero data={page.hero_section} />
      <Introduction data={page.introduction_section} />
      <KeyBenefitsSection data={page.key_benefits_section} />
      <WhatYouGetSection data={page.what_you_get_section} />
      <Technalogies data={page.technologies_section} />
      <Progress data={page.process_section} />
      <Casestudy data={page.case_study_section} />
      <Faqs data={page.faq_section} />
      <Footer />
    </>
  );
}
