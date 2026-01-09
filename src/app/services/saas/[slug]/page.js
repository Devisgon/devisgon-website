import Header from "../../../../components/navbar";
import Hero from "../../../../components/sub_services_pages/hero";
import Introduction from "../../../../components/sub_services_pages/introduction";
import KeyBenefitsSection from "../../../../components/sub_services_pages/key_benefits";
import WhatYouGetSection from "../../../../components/sub_services_pages/what_we_do";
import Technalogies from "../../../../components/sub_services_pages/technalogies";
import Progress from "../../../../components/sub_services_pages/process_section";
import Casestudy from "../../../../components/sub_services_pages/case_study";
import Faqs from "../../../../components/sub_services_pages/faq";
import Contact from '../../../../components/sub_services_pages/contact'
import Footer from "../../../../components/footer";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

/**
 * Generate static params for SSG
 */
export async function generateStaticParams() {
  const dir = path.join(
    process.cwd(),
    "src/data/services/ai_and_saas_developments"
  );

  const files = fs.readdirSync(dir);

  return files
    .filter((file) => file.endsWith(".json"))
    .map((file) => ({
      slug: file.replace(".json", ""),
    }));
}

/**
 * Industry page component
 */
export default async function IndustryPage({ params }) {
  const { slug } =await params;

  if (!slug) notFound();

  const jsonPath = path.join(
    process.cwd(),
    "src/data/services/ai_and_saas_developments",
    `${slug}.json`
  );

  let data;

  try {
    const raw = fs.readFileSync(jsonPath, "utf-8");
    data = JSON.parse(raw);
  } catch (error) {
    console.error(`Industry JSON not found for slug: ${slug}`, error);
    notFound();
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
      <Casestudy data={data.case_study_section}/>
      <Faqs data={data.faq_section} />
      <Contact/>
      <Footer />
    </>
  );
}
