"use client";
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin } from "lucide-react";


interface Subsection {
  title: string;
  description: string;
  items: string[];
}

interface ComplexItem {
  title?: string;
  right?: string;
  details: string;
}

interface PolicySection {
  heading: string;
  description?: string;
  subsections?: Subsection[];
  items?: string[] | ComplexItem[]; 
  content?: string[];
  safeguards?: string[];
  disclaimer?: string;
  contact_note?: string;
}

interface PrivacyData {
  title: string;
  date: string;
  table_of_contents: string[];
  sections: PolicySection[];
}

const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation('privacy');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const title = t('title');
  const date = t('date');
  const tableOfContents = t('table_of_contents', { returnObjects: true }) as string[];
  const sections = t('sections', { returnObjects: true }) as PolicySection[];

  if (!mounted || !i18n.isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen bg-bg-primary">
        <div className="animate-pulse text-t-secondary">Loading Privacy Policy...</div>
      </div>
    );
  }

  return (
    <>
      <div className="bg--bg min-h-screen  text-t-primary">

        {/* Header */}
        <div className="pt-20 pb-12 text-center px-4">
          <h1 className="text-4xl md:text-5xl text-t-primary dark:text-t-secondary font-extrabold mb-4">
            {title}
          </h1>
          <p className="text-t-secondary dark:text-t-primary font-medium text-sm md:text-base opacity-90">
            {date}
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-24 flex flex-col lg:flex-row gap-16">

          {/* Sidebar */}
          <aside className="hidden lg:block w-1/4 h-fit sticky top-24">
            <div className="p-6 rounded-2xl shadow border border-[#E5E7EB]">
              <h3 className="font-bold text-lg mb-6 text-t-primary dark:text-t-primary">
                Table of Contents
              </h3>

              <ul className="space-y-3 text-sm font-medium text-t-secondary dark:text-t-secondary">
              {Array.isArray(tableOfContents) && tableOfContents.map((item, index) => {
                  const id = item.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <li key={index}>
                      <button
                        onClick={() => scrollToSection(id)}
                        className="hover:border-b-2 transition text-left w-full"
                      >
                        {item}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          <main className="w-full lg:w-3/4 space-y-16">

          {Array.isArray(sections) && sections.map((section, index) => {
              const sectionId = section.heading
                .toLowerCase()
                .replace(/\s+/g, "-");

              return (
                <section
                  key={index}
                  id={sectionId}
                  className="scroll-mt-28 pt-12"
                >
                  <h2 className="text-2xl font-bold mb-6 text-t-primary dark:text-t-secondary">
                    {section.heading}
                  </h2>

                  {section.description && (
                    <p className="text-t-secondary dark:text-t-primary mb-6 leading-relaxed">
                      {section.description}
                    </p>
                  )}

                  {section.subsections?.map((sub, idx) => (
                    <div key={idx} className="mb-8 pl-4 text-t-secondary dark:text-t-primary">
                      <h3 className="font-bold text-lg mb-3 text-t-primary dark:text-t-secondary ">
                        {sub.title}
                      </h3>
                      <p className="mb-3 text-sm">
                        {sub.description}
                      </p>
                      <ul className="pl-5 space-y-2 text-sm">
                        {sub.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  
                  {section.items && 
                   Array.isArray(section.items) && 
                   section.items.length > 0 && 
                   typeof section.items[0] === "string" && (
                    <ul className="pl-5 space-y-2 text-t-secondary dark:text-t-primary">
                      {(section.items as string[]).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                 
                  {section.items && 
                   Array.isArray(section.items) && 
                   section.items.length > 0 && 
                   typeof section.items[0] === "object" && (
                    <div className="space-y-4 text-t-secondary dark:text-t-primary">
                      {(section.items as ComplexItem[]).map((item, i) => (
                        <div key={i} className="flex gap-2">
                          <span className="font-bold min-w-[200px]">
                            {item.title || item.right}:
                          </span>
                          <span>{item.details}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.content && (
                    <div className="space-y-4 text-t-secondary dark:text-t-primary">
                      {section.content.map((text, i) => (
                        <p key={i}>{text}</p>
                      ))}
                    </div>
                  )}

                  {section.safeguards && (
                    <ul className="list-disc pl-5 space-y-2 text-t-secondary dark:text-t-primary mt-4">
                      {section.safeguards.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {section.disclaimer && (
                    <div className="mt-6 p-4 rounded-lg text-sm dark:text-t-primary text-t-secondary">
                      {section.disclaimer}
                    </div>
                  )}

                  {section.contact_note && (
                    <p className="mt-6 text-sm text-t-secondary dark:text-t-primary italic">
                      {section.contact_note}
                    </p>
                  )}
                </section>
              );
            })}


      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-2xl font-bold text-[#8E4EC6] mb-4">
          Contact Us
        </h2>

        <p className="text-t-secondary dark:text-t-primary mb-8 max-w-3xl">
          If you have any questions, concerns, or requests regarding this Privacy
          Policy or our data practices, please contact us:
        </p>

        <div className="rounded-xl bg-bg-primary p-8 space-y-4">
          <div className="flex items-center gap-3 text-t-secondary dark:text-t-primary">
            <Mail className="w-5 h-5 text-t-secondary dark:text-t-primary" />
   <a href="mailto:info@devisgon.com" className="text-t-primary hover:underline">
  INFO@devisgon.com
   </a>
          </div>

          <div className="flex items-center gap-3 text-t-secondary dark:text-t-primary">
            <Phone className="w-5 h-5 text-t-secondary dark:text-t-primary" />
            <a href='tel:+92 331 6944411' className="text-t-primary hover:underline">+92 331 6944411</a>
          </div>

          <div className="flex items-center gap-3 text-t-secondary dark:text-t-primary">
            <MapPin className="w-5 h-5 text-t-secondary dark:text-t-primary" />
            <a href="" className="text-t-primary hover:underline">Okara, Pakistan</a>
          </div>
        </div>

        <p className="text-t-secondary dark:text-t-primary mt-6">
          We will respond to your inquiry within 30 days of receipt.
        </p>
      </div>
   


          </main>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;