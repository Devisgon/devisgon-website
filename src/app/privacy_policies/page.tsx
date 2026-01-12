"use client";
import React from 'react';
import Header from '../../components/navbar';
import Footer from '../../components/footer';
import data from "../../data/privacy_policy.json";

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
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header />
      <div className="bg--bg min-h-screen bg-bg-secondary text-primary">

        {/* Header */}
        <div className="pt-20 pb-12 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {data.title}
          </h1>
          <p className="text-secondary font-medium text-sm md:text-base opacity-90">
            {data.date}
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-24 flex flex-col lg:flex-row gap-16">

          {/* Sidebar */}
          <aside className="hidden lg:block w-1/4 h-fit sticky top-24">
            <div className="p-6 rounded-2xl shadow border border-[#E5E7EB]">
              <h3 className="font-bold text-lg mb-6 text-primary">
                Table of Contents
              </h3>

              <ul className="space-y-3 text-sm font-medium text-secondary">
                {data.table_of_contents.map((item, index) => {
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

            {data.sections.map((section, index) => {
              const sectionId = section.heading
                .toLowerCase()
                .replace(/\s+/g, "-");

              return (
                <section
                  key={index}
                  id={sectionId}
                  className="scroll-mt-28 pt-12"
                >
                  <h2 className="text-2xl font-bold mb-6 text-primary">
                    {section.heading}
                  </h2>

                  {section.description && (
                    <p className="text-secondary mb-6 leading-relaxed">
                      {section.description}
                    </p>
                  )}

                  {section.subsections?.map((sub, idx) => (
                    <div key={idx} className="mb-8 pl-4 text-secondary">
                      <h3 className="font-bold text-lg mb-3 text-primary">
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
                    <ul className="pl-5 space-y-2 text-secondary">
                      {(section.items as string[]).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                 
                  {section.items && 
                   Array.isArray(section.items) && 
                   section.items.length > 0 && 
                   typeof section.items[0] === "object" && (
                    <div className="space-y-4 text-secondary">
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
                    <div className="space-y-4 text-secondary">
                      {section.content.map((text, i) => (
                        <p key={i}>{text}</p>
                      ))}
                    </div>
                  )}

                  {section.safeguards && (
                    <ul className="list-disc pl-5 space-y-2 text-secondary mt-4">
                      {section.safeguards.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {section.disclaimer && (
                    <div className="mt-6 p-4 rounded-lg text-sm text-secondary">
                      {section.disclaimer}
                    </div>
                  )}

                  {section.contact_note && (
                    <p className="mt-6 text-sm text-secondary italic">
                      {section.contact_note}
                    </p>
                  )}
                </section>
              );
            })}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;