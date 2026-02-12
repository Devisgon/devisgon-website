"use client";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin } from "lucide-react";

// Interfaces stay the same...
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

const PrivacyPolicy = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };


  const { i18n } = useTranslation();
  const privacyData = i18n.getResourceBundle(i18n.language, 'privacy');
if (!privacyData) 
  {    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading Privacy Policy...</p>
      </div>
    );
  }


  return (
    <>
      {/* 4. Use 'privacyData' instead of 'data' to render content */}
      <div className="bg-bg-primary min-h-screen text-t-primary">

        {/* Header */}
        <div className="pt-20 pb-12 text-center px-4">
          <h1 className="text-4xl md:text-5xl text-t-primary font-extrabold mb-4">
            {privacyData.title}
          </h1>
          <p className="text-t-secondary font-medium text-sm md:text-base opacity-90">
            {privacyData.date}
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-24 flex flex-col lg:flex-row gap-16">

          {/* Sidebar */}
          <aside className="hidden lg:block w-1/4 h-fit sticky top-24">
            <div className="p-6 rounded-2xl shadow border border-[#E5E7EB]">
              <h3 className="font-bold text-lg mb-6 text-t-primary">
Table of Contents              </h3>

              <ul className="space-y-3 text-sm font-medium text-t-secondary">
                {privacyData.table_of_contents.map((item: string, index: number) => {
                  const id = item.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <li key={index}>
                      <button
                        onClick={() => scrollToSection(id)}
                        className="hover:text-purple-600 transition text-left w-full"
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
            {privacyData.sections.map((section: PolicySection, index: number) => {
              const sectionId = section.heading.toLowerCase().replace(/\s+/g, "-");

              return (
                <section key={index} id={sectionId} className="scroll-mt-28 pt-12">
                  <h2 className="text-2xl font-bold mb-6 text-t-primary">
                    {section.heading}
                  </h2>

                  {section.description && (
                    <p className="text-t-secondary mb-6 leading-relaxed">
                      {section.description}
                    </p>
                  )}

                  {/* Render Subsections */}
                  {section.subsections?.map((sub, idx) => (
                    <div key={idx} className="mb-8 pl-4 border-l-2 border-purple-100">
                      <h3 className="font-bold text-lg mb-3 text-t-primary">{sub.title}</h3>
                      <p className="mb-3 text-sm text-t-secondary">{sub.description}</p>
                      <ul className="pl-5 space-y-2 text-sm text-t-secondary list-disc">
                        {sub.items.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  ))}

                  {/* Render Simple Items (String array) */}
                  {section.items && Array.isArray(section.items) && typeof section.items[0] === "string" && (
                    <ul className="pl-5 space-y-2 text-t-secondary list-disc">
                      {(section.items as string[]).map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  )}

                  {/* Render Complex Items (Object array) */}
                  {section.items && Array.isArray(section.items) && typeof section.items[0] === "object" && (
                    <div className="space-y-4 text-t-secondary">
                      {(section.items as ComplexItem[]).map((item, i) => (
                        <div key={i} className="flex flex-col md:flex-row md:gap-2">
                          <span className="font-bold md:min-w-[200px]">
                            {item.title || item.right}:
                          </span>
                          <span>{item.details}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Content & Safeguards logic stays same... */}
                </section>
              );
            })}

            {/* Static Contact Section (Optionally move to JSON for full translation) */}
            <div className="max-w-5xl mx-auto border-t pt-16">
              <h2 className="text-3xl font-bold text-[#8E4EC6] mb-4">
Contact us              </h2>
              {/* ... Rest of contact UI */}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;