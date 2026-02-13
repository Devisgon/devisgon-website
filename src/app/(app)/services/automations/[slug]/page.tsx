"use client";
import  { use } from 'react';
import { useTranslation } from 'react-i18next';
import { notFound } from "next/navigation";
import { workflowData } from "@/data/loaders/workflow_automations";

import Hero from "@/components/sub_services_pages/hero";
import Introduction from "@/components/sub_services_pages/introduction";
import KeyBenefitsSection from "@/components/sub_services_pages/key_benefits";
import WhatYouGetSection from "@/components/sub_services_pages/what_we_do";
import Technalogies from "@/components/sub_services_pages/technalogies";
import Progress from "@/components/sub_services_pages/process_section";
import Casestudy from "@/components/sub_services_pages/case_study";
import Faqs from "@/components/sub_services_pages/faq";
import Contact from '@/components/sub_services_pages/contact';

export default function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { i18n } = useTranslation(); 
  const lang = i18n.language || 'en'; 
  const data = workflowData[lang]?.[slug] || workflowData['en']?.[slug];

  if (!data) {
    return notFound();
  }

  const isRTL = lang === 'ur' || lang === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
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
  );
}