import type { Metadata } from "next";
import Hero from "@/components/services_page/hero";
import Service from '@/components/services_page/services';
import Form from '@/components/sub_services_pages/contact';
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

  return (
    <>
      <Header />
      <Hero data={herosection} />
      <Service data={services} />
      <Form serviceName="Services" sourcePage="/services" />
      <Footer />
    </>
  );
}
