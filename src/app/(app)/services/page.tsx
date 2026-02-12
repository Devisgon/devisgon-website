"use client";
import React, { useEffect, useState } from "react";
import Hero from "@/components/services_page/hero";
import Service from '@/components/services_page/services';
import Form from '@/components/sub_services_pages/contact';
import { useTranslation } from 'react-i18next';

import { HeroSectionData } from "@/types/services_page/hero";
import { ServiceItem } from "@/types/services_page/services";

export default function Services() {
  const { t, i18n } = useTranslation('services');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const herosection = t("herosection", { returnObjects: true }) as HeroSectionData;
  const services = t("services", { returnObjects: true }) as ServiceItem[];

  const isLoading = !mounted || !i18n.isInitialized;
  
  const isDataMissing = !herosection || !services || typeof herosection === 'string';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-bg-primary">
        <p className="text-t-secondary font-medium">Initializing Services...</p>
      </div>
    );
  }

  if (isDataMissing) {
    return (
      <div className="flex items-center justify-center h-screen bg-bg-primary">
        <p>Translation data missing for {i18n.language}</p>
      </div>
    );
  }

  return (
    <>
      <Hero data={herosection} />
      <Service data={services} />
      <Form />
    </>
  );
}