"use client"; 
import Hero from "@/components/services_page/hero";
import Service from '@/components/services_page/services';
import Form from '@/components/sub_services_pages/contact';
import { useLanguage } from '@/context/language_contaxt'; 

export default function Services() {
  const { data } = useLanguage();

  if (!data || !data.services) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading services...</p>
      </div>
    );
  }

  const servicesData = data.services;

  return (
    <>
      <Hero data={servicesData.herosection} />
      <Service data={servicesData.services} />
      <Form />
    </>
  );
}