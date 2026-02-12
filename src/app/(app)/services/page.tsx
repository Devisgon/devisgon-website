"use client"; 
import Hero from "@/components/services_page/hero";
import Service from '@/components/services_page/services';
import Form from '@/components/sub_services_pages/contact';
import { useTranslation } from 'react-i18next';

export default function Services() {
  const { i18n } = useTranslation();
  
  const servicesData = i18n.getResourceBundle(i18n.language, 'services');

  if (!servicesData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading services...</p>
      </div>
    );
  }

  return (
    <>
      <Hero data={servicesData.herosection} />
      <Service data={servicesData.services} />
      <Form  />
    </>
  );
}