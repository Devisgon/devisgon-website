"use client";

import  { useState } from "react";
import Hero from "@/components/services_page/hero";
import Service from '@/components/services_page/services';
import Form from '@/components/sub_services_pages/contact';

// Import your JSON data
import dataEn from '@/data/services_page_en.json';
import dataUr from '@/data/services_page_ur.json';

// Define the interface to fix the TypeScript "Property does not exist" error
interface PageData {
  herosection: {
    title: string;
    subtitle: string;
    span_subtitle: string;
    description: string;
    buttons: { text: string; link: string }[];
  };
  services: any[]; // You can replace 'any' with your Services interface
}

export default function Services() {
  // State to handle language switching
  const [lang, setLang] = useState<"en" | "ur">("en");

  // Select the correct data and cast it to our interface
  const data = (lang === "ur" ? dataUr : dataEn) as unknown as PageData;
  const isUrdu = lang === "ur";

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "ur" : "en"));
  };

  // Safety check to prevent "undefined" crashes
  if (!data || !data.herosection) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <main 
      dir={isUrdu ? "rtl" : "ltr"} 
      className={`${isUrdu ? "font-urdu" : "font-sans"} transition-all duration-300`}
    >
      {/* Hero Section with language toggle logic */}
      <Hero 
        data={data.herosection} 
        currentLang={lang} 
        onToggleLang={toggleLanguage} 
      />

      {/* Services List Section */}
      <Service data={data.services} />

      {/* Contact Form Section */}
      <Form />
    </main>
  );
}