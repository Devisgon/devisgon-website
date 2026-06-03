import React from 'react';
import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import Footer from '@/components/footer';
import Header from '@/components/navbar';
import { getCachedLanguage } from "@/lib/language";
import { PRIVACY_PAGE_METADATA } from "@/lib/seo";

import dataEn from '@/data/english_data/privacy_policy.json';
import dataUr from '@/data/urdu_data/privacy_policy.json';
import dataAr from '@/data/arabic_data/privacy_policy.json';
import dataFr from '@/data/french_data/privacy_policy.json';
import dataZh from '@/data/chinese_data/privacy_policy.json';
import dataDe from '@/data/german_data/privacy_policy.json';
import dataEs from '@/data/spanish_data/privacy_policy.json';

/* eslint-disable @typescript-eslint/no-explicit-any */
const langMap: Record<string, any> = {
  en: dataEn, ur: dataUr, ar: dataAr,
  fr: dataFr, zh: dataZh, de: dataDe, es: dataEs,
};

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

export const metadata: Metadata = PRIVACY_PAGE_METADATA;

export default async function PrivacyPolicy() {
  const lang = await getCachedLanguage();
  const data = langMap[lang] ?? langMap['en'];

  const title = data.title as string;
  const date = data.date as string;
  const tableOfContents = data.table_of_contents as string[];
  const sections = data.sections as PolicySection[];

  return (
    <>
      <Header />

      <div className="bg--bg min-h-screen text-t-primary">
        <div className="pt-20 pb-12 text-center px-4">
          <h1 className="text-4xl md:text-5xl text-t-primary dark:text-t-secondary font-extrabold mb-4">
            {title}
          </h1>
          <p className="text-t-secondary dark:text-t-primary font-medium text-sm md:text-base opacity-90">
            {date}
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-24 flex flex-col lg:flex-row gap-16">
          <aside className="hidden lg:block w-1/4 h-fit sticky top-24">
            <div className="p-6 rounded-2xl shadow border border-[#E5E7EB]">
              <h3 className="font-bold text-lg mb-6 text-t-primary dark:text-t-primary">
                Table of Contents
              </h3>

              <ul className="space-y-3 text-sm font-medium text-t-secondary dark:text-t-secondary">
                {Array.isArray(tableOfContents) &&
                  tableOfContents.map((item, index) => {
                    const id = item.toLowerCase().replace(/\s+/g, "-");
                    return (
                      <li key={index}>
                        <a
                          href={`#${id}`}
                          className="hover:border-b-2 transition text-left w-full block"
                        >
                          {item}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </aside>

          <main className="w-full lg:w-3/4 space-y-16">
            {Array.isArray(sections) &&
              sections.map((section, index) => {
                const sectionId = section.heading.toLowerCase().replace(/\s+/g, "-");

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
                        <h3 className="font-bold text-lg mb-3 text-t-primary dark:text-t-secondary">
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
                  <a href="tel:+923316944411" className="text-t-primary hover:underline">
                    +92 331 6944411
                  </a>
                </div>

                <div className="flex items-center gap-3 text-t-secondary dark:text-t-primary">
                  <MapPin className="w-5 h-5 text-t-secondary dark:text-t-primary" />
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Okara,+Pakistan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-t-primary hover:underline"
                  >
                    Okara, Pakistan
                  </a>
                </div>
              </div>

              <p className="text-t-secondary dark:text-t-primary mt-6">
                We will respond to your inquiry within 30 days of receipt.
              </p>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
