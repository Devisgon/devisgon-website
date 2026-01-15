"use client";
import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // Using react-icons as requested previously

const FAQSection = ({ data }) => {
  // Destructure section data

  // State to track which accordion item is open (null means all closed)
  const [openIndex, setOpenIndex] = useState(null);

  // Toggle function
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-20 px-6">
      <div className="container mx-auto max-w-3xl">
        
        {/* --- Header --- */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-t-primary mb-3">
            {data.title}
          </h2>
          <p className="text-lg text-t_secondary font-medium">
            {data.subtitle}
          </p>
        </div>

        {/* --- FAQ List --- */}
        <div className="space-y-4">
          {data.questions.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className={`border rounded-xl transition-all duration-300 bg-white overflow-hidden ${
                  isOpen ? 'border-secondary shadow-md' : 'border-purple-100 hover:border-purple-200'
                }`}
              >
                {/* Question Header (Clickable) */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <span className={`text-lg font-semibold ${isOpen ? 'text-secondary' : 'text-primary'}`}>
                    {item.question}
                  </span>
                  <div className={`text-secondary transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <FiChevronDown size={24} />
                  </div>
                </button>

                {/* Answer Content (Collapsible) */}
                <div 
                  className={`px-5 text-primary leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>

        {/* --- Footer --- */}
        <div className="text-center mt-12">
          <p className="text-t_secondary mb-2 font-medium">
            {data.footer.text}
          </p>
          <a 
            href={data.footer.link_url} 
            className="text-t-primary font-bold hover:underline hover:text-primary transition-colors"
          >
            {data.footer.link_text}
          </a>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;