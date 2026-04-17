import Footer from '@/components/footer';
import Header from '@/components/navbar';
import { getCachedLanguage } from "@/lib/language";

import dataEn from '@/data/english_data/terms_condition.json';
import dataUr from '@/data/urdu_data/terms_condition.json';
import dataAr from '@/data/arabic_data/terms_condition.json';
import dataFr from '@/data/french_data/terms_condition.json';
import dataZh from '@/data/chinese_data/terms_condition.json';
import dataDe from '@/data/german_data/terms_condition.json';
import dataEs from '@/data/spanish_data/terms_condition.json';

/* eslint-disable @typescript-eslint/no-explicit-any */
const langMap: Record<string, any> = {
  en: dataEn, ur: dataUr, ar: dataAr,
  fr: dataFr, zh: dataZh, de: dataDe, es: dataEs,
};

interface ContactDetails {
  email: string;
  phone: string;
  business_hours: string;
}

interface Section {
  section_number: string | number;
  heading: string;
  content?: string[];
  description?: string;
  contact_details?: ContactDetails;
}

export default async function TermsAndConditions() {
  const lang = await getCachedLanguage();
  const data = langMap[lang] ?? langMap['en'];

  const title = data.title as string;
  const date = data.date as string;
  const tableOfContents = data.table_of_contents as string[];
  const sections = data.sections as Section[];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-bg-secondary py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-t-primary dark:text-t-secondary mb-4">
              {title}
            </h1>
            <p className="text-t-secondary dark:text-t-primary font-medium">
              {date}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            
            <aside className="hidden lg:block w-1/4 h-fit sticky top-24">
              <div className="p-6 rounded-2xl shadow border border-[#D1AFEC] bg-bg-primary/50 backdrop-blur-sm">
                <h2 className="text-sm font-bold text-t-primary uppercase tracking-wider mb-4">
                  Table of Contents
                </h2>
                <nav>
                  <ul className="space-y-3">
                    {Array.isArray(tableOfContents) && tableOfContents.map((item, index) => {
                      const sectionId = item.split('.')[0].trim();
                      return (
                        <li key={index}>
                          <a 
                            href={`#section-${sectionId}`} 
                            className="text-sm text-t-secondary hover:text-secondary hover:underline transition-colors block"
                          >
                            {item}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </aside>

            <div className="lg:w-3/4 space-y-12 p-8 rounded-2xl border border-[#D1AFEC] dark:border-gray-800 bg-bg-primary/30">
              {Array.isArray(sections) && sections.map((section) => (
                <div 
                  key={section.section_number} 
                  id={`section-${section.section_number}`} 
                  className="scroll-mt-24"
                >
                  <h2 className="text-2xl font-bold text-t-primary dark:text-t-secondary mb-4">
                    {section.section_number}. {section.heading}
                  </h2>

                  {section.content && section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-t-secondary dark:text-t-primary leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}

                  {section.contact_details && (
                    <div className="mt-4">
                      {section.description && (
                         <p className="text-t-secondary dark:text-t-primary leading-relaxed mb-6 italic">
                           {section.description}
                         </p>
                      )}
                      <div className="bg-bg-primary rounded-xl p-6 border border-[#D1AFEC]/30">
                        <div className="space-y-3 text-t-secondary dark:text-t-primary font-medium">
                          <div className="flex flex-col sm:flex-row sm:items-center">
                            <span className="w-32 font-bold text-secondary">Email:</span>
                            <a href={`mailto:${section.contact_details.email}`} className="hover:text-secondary transition-colors underline decoration-[#D1AFEC]">
                              {section.contact_details.email}
                            </a>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-row sm:items-center">
                            <span className="w-32 font-bold">Phone:</span>
                            <a href={`tel:${section.contact_details.phone}`} className="hover:text-secondary transition-colors underline decoration-[#D1AFEC]">
                              {section.contact_details.phone}
                            </a>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center">
                            <span className="w-32 font-bold">Hours:</span>
                            <span>{section.contact_details.business_hours}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
