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
    "src/data/services/web_and_mobile_development"
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
    "src/data/services/web_and_mobile_development",
    `${slug}.json`
  );

  let page;

  try {
    const raw = fs.readFileSync(jsonPath, "utf-8");
    page = JSON.parse(raw);
  } catch (error) {
    console.error(`Industry JSON not found for slug: ${slug}`, error);
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
      <Casestudy data={page.case_study_section}/>
      <Faqs data={page.faq_section} />
        <Contact/>

      <Footer/>
    </>
  );
}
