"use client";
import { useTranslation } from 'react-i18next';
import { workflowData } from "@/data/loaders/web_development";
import { use, useEffect } from 'react';
import { notFound, useSearchParams } from "next/navigation"; 

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
  const searchParams = useSearchParams();
  const { i18n } = useTranslation();
  const urlLang = searchParams.get('lang');

  useEffect(() => {
    if (urlLang && urlLang !== i18n.language) {
      i18n.changeLanguage(urlLang);
    }
  }, [urlLang, i18n]);

  const activeLang = urlLang || i18n.language || 'en';
  const data = workflowData[activeLang]?.[slug] || workflowData['en']?.[slug];

  if (!data) {
    return notFound();
  }

  const isRTL = activeLang === 'ur' || activeLang === 'ar';

  return (
    <div className='overflow-x-hidden' dir={isRTL ? 'rtl' : 'ltr'}>
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