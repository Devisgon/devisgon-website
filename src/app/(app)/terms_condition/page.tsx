
"use client";
import React from 'react';
import { useTranslation } from 'react-i18next';
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

interface TermsData {
  title: string;
  date: string;
  table_of_contents: string[];
  sections: Section[];
}

const TermsAndConditions = () => { 

const { i18n } = useTranslation();

const termsData = (i18n && typeof i18n.getResourceBundle === 'function') 
  ? i18n.getResourceBundle(i18n.language, 'terms') 
  : null;

if (!termsData) {
  return (
    <div className="flex items-center justify-center h-screen">
      <p>Loading Privacy Policy...</p>
    </div>
  );
}


  return (
    <>
      <div className="min-h-screen bg-bg-secondary py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-t-primary dark:text-t-secondary mb-4">
              {termsData.title}
            </h1>
            <p className="text-t-secondary dark:text-t-primary font-medium">
              {termsData.date}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Table of Contents */}
            <aside className="hidden lg:block w-1/4 h-fit sticky top-24">
              <div className="p-6 rounded-2xl shadow border border-[#D1AFEC] ">
                <h2 className="text-sm font-bold text-t-primary  uppercase tracking-wider mb-4">
                  Table of Contents
                </h2>
                <nav>
                  <ul className="space-y-3">
                    {termsData.table_of_contents.map((item:string, index:string) => {
                      const sectionId = item.split('.')[0];
                      return (
                        <li key={index}>
                          <a 
                            href={`#section-${sectionId}`} 
                            className="text-sm text-t-secondary  hover:underline transition-colors block"
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

            <div className="lg:w-3/4 space-y-12 p-8 rounded-t-2xl  border-b-0 border border-[#D1AFEC] dark:border-hidden">
              {termsData.sections.map((section:Section) => (
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
                         <p className="text-t-secondary dark:text-t-primary leading-relaxed mb-6">
                           {section.description}
                         </p>
                      )}
                      <div className="bg-bg-primary rounded-xl p-6 ">
                        <div className="space-y-3 text-t-secondary dark:text-t-primary font-medium">
                          <div className="flex flex-col sm:flex-row sm:items-center">
                            <span className="w-32 font-bold text-secondary ">Email:</span>
                            <a href={`mailto:${section.contact_details.email}`} className="hover:underline">
                              {section.contact_details.email}
                            </a>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center">
                            <span className="w-32 font-bold ">Phone:</span>
                            <a href={`tel:${section.contact_details.phone}`} className="hover:underline">
                              {section.contact_details.phone}
                            </a>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center">
                            <span className="w-32 font-bold ">Business Hours:</span>
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
    </>
  );
};

export default TermsAndConditions;