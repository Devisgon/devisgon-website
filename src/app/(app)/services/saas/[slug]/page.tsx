"use client";
import React, { use, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { notFound } from "next/navigation";

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
  const lang = i18n.language; 
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        let module;

          if (lang === 'en') {
          module = await import(`@/data/english_data/services/data_solutionsai_and_saas_developments/${slug}.json`);
        } else if (lang === 'ur'){
          module = await import(`@/data/urdu_data/services/ai_and_saas_developments/${slug}.json`);}
         else if (lang === 'ar') {
          module = await import(`@/data/arabic_data/services/ai_and_saas_developments/${slug}.json`);        
        }else if (lang === 'es') {
          module = await import(`@/data/spanish_data/services/ai_and_saas_developments/${slug}.json`);
        } else if (lang === 'de') {
          module = await import(`@/data/german_data/services/ai_and_saas_developments/${slug}.json`);
        } else if (lang === 'zh') {
          module = await import(`@/data/chinese_data/services/ai_and_saas_developments/${slug}.json`);
        } else if (lang === 'fr') {
          module = await import(`@/data/french_data/services/ai_and_saas_developments/${slug}.json`);
        } else if (lang === 'pa') {
          module = await import(`@/data/punjabi_data/services/ai_and_saas_developments/${slug}.json`);
        }
         else {
          module = await import(`@/data/english_data/services/ai_and_saas_developments/${slug}.json`);
        }

        setData(module.default);
      } catch (error) {
        console.error("File not found for this slug or language:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [slug, lang]); 
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!data) {
    return notFound();
  }

  return (
    <div dir={lang === 'ur' ? 'rtl' : 'ltr'}>
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