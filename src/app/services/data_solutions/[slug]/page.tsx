import Header from "@/components/navbar";
import Hero from "@/components/sub_services_pages/hero";
import Introduction from "@/components/sub_services_pages/introduction";
import KeyBenefitsSection from "@/components/sub_services_pages/key_benefits";
import WhatYouGetSection from "@/components/sub_services_pages/what_we_do";
import Technalogies from "@/components/sub_services_pages/technalogies";
import Progress from "@/components/sub_services_pages/process_section";
import Casestudy from "@/components/sub_services_pages/case_study";
import Faqs from "@/components/sub_services_pages/faq";
import Contact from '@/components/sub_services_pages/contact';
import Footer from "@/components/footer";
import { notFound } from "next/navigation";


interface SubServiceData {
  hero_section: any;
  introduction_section: any;
  key_benefits_section: any;
  what_you_get_section: any;
  technologies_section: any;
  process_section: any;
  case_study_section: any;
  faq_section: any;
}

interface IndustryPageProps {
  params: {
    slug: string;
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;

  let data: SubServiceData | null = null;

  try {
    data = (await import(`@/data/services/data_solutions/${slug}.json`)).default as SubServiceData;
  } catch (error) {
    console.error(`JSON file not found for slug: ${slug} | ${(error as Error).message}`);
    notFound();
  }

  if (!data) {
    return <p className="text-center py-20 text-red-500">this service is currently un-available</p>;
  }

  return (
    <>
      <Header />
      <Hero data={data.hero_section} />
      <Introduction data={data.introduction_section} />
      <KeyBenefitsSection data={data.key_benefits_section} />
      <WhatYouGetSection data={data.what_you_get_section} />
      <Technalogies data={data.technologies_section} />
      <Progress data={data.process_section} />
      <Casestudy data={data.case_study_section} />
      <Faqs data={data.faq_section} />
      <Contact />
      <Footer />
    </>
  );
}
