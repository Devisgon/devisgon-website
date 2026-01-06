import rawData from "../../data/services/ai_and_saas_developments/ai_powered_app.json"
import Header from "../../components/navbar"
import Hero from "../../components/industries_pages/hero"
import Introduction from "../../components/industries_pages/introduction"
import KeyBenefitsSection from "../../components/industries_pages/key_benefits" 
import WhatYouGetSection from "../../components/industries_pages/what_we_do"
import Technalogies from "../../components/industries_pages/technalogies"
import Progress from "../../components/industries_pages/process_section"
import Casestudy from "../../components/industries_pages/case_study"
import Faqs from "../../components/industries_pages/faq"
import Footer from "../../components/footer"

cimport rawData from "../../data/services/ai_and_saas_developments/ai_powered_app.json";

const pgdata = rawData && typeof rawData === "object" ? rawData : null;

export default function Home() {
  if (!pgdata) {
    throw new Error("Industries page data missing or invalid");
  }

  return (
    <>
      <Header />
      <Hero data={pgdata.hero_section} />
      <Introduction data={pgdata.introduction_section} />
      <KeyBenefitsSection data={pgdata.key_benefits_section} />
      <WhatYouGetSection data={pgdata.what_you_get_section} />
      <Technalogies data={pgdata.technologies_section} />
      <Progress data={pgdata.process_section} />
      <Casestudy data={pgdata.case_study_section} />
      <Faqs data={pgdata.faq_section} />
      <Footer />
    </>
  );
}

