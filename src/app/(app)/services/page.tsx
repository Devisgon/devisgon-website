import type { Metadata } from "next";
import Hero from "@/components/services_page/hero";
import Service from '@/components/services_page/services';
import ServicesCtaSection from "@/components/services_page/cta_section";
import Footer from '@/components/footer';
import Header from '@/components/navbar';
import { getCachedLanguage } from "@/lib/language";
import { SERVICES_PAGE_METADATA } from "@/lib/seo";

import dataEn from '@/data/english_data/services_page.json';
import dataUr from '@/data/urdu_data/services_page.json';
import dataAr from '@/data/arabic_data/services_page.json';
import dataFr from '@/data/french_data/services_page.json';
import dataZh from '@/data/chinese_data/services_page.json';
import dataDe from '@/data/german_data/services_page.json';
import dataEs from '@/data/spanish_data/services_page.json';

import type { HeroSectionData } from "@/types/services_page/hero";
import type { ServiceItem } from "@/types/services_page/services";

type ServicesCtaData = {
  headline: string;
  description: string;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const langMap: Record<string, any> = {
  en: dataEn, ur: dataUr, ar: dataAr,
  fr: dataFr, zh: dataZh, de: dataDe, es: dataEs,
};

export const metadata: Metadata = SERVICES_PAGE_METADATA;

export default async function Services() {
  const lang = await getCachedLanguage();
  const data = langMap[lang] ?? langMap['en'];

  const herosection = data.herosection as HeroSectionData;
  const services = data.services as ServiceItem[];
  const ctaSection = data.contact_form as ServicesCtaData;
  const consultationHref =
    process.env.NEXT_PUBLIC_CALENDLY_30_MIN_MEETING ||
    process.env.NEXT_PUBLIC_CALENDLY_15_MIN_MEETING ||
    "/contact";

  return (
    <>
      <Header />
      <Hero data={herosection} />
      <Service data={services} />
      <ServicesCtaSection data={ctaSection} consultationHref={consultationHref} />
      <Footer />
    </>
  );
}
