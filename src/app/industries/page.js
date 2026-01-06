import data from "../../data/services/ai_and_saas-developments/ai_powered_app.json"
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
export default function Home() {

  return (
    <>
    <Header/>
    <Hero />
   <Introduction data={data.ai_apps_page.introduction_section} />
   <KeyBenefitsSection data={data.ai_apps_page.key_benefits_section}/>
   <WhatYouGetSection data={data.ai_apps_page.what_you_get_section}/>
   <Technalogies data={data.ai_apps_page.technologies_section}/>
   <Progress data={data.ai_apps_page.process_section}/>
   <Casestudy data={data.ai_apps_page.case_study_section}/>
   <Faqs data={data.ai_apps_page.faq_section}/>
    <Footer/>

    
    </>
  );
}
