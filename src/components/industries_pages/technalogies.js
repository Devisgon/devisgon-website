"use client";
import React from 'react';
// Combine icon libraries for dynamic lookup
import AllIcons from "../icons"
const TechnologiesSection = ({ data }) => {

  return (
    <section className="w-full bg-[#F7EDFE] py-20 px-4">
      <div className="container mx-auto max-w-7xl text-center">
        
        {/* --- Header --- */}
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          {data.title}
        </h2>
        <p className="text-lg text-secondary font-medium mb-12">
          {data.subtitle}
        </p>

        {/* --- Tools Grid --- */}
        <div className="flex flex-wrap justify-center gap-6">
          {data.tools.map((tool, index) => {
            const IconComponent = AllIcons[tool.icon.trim()];

            return (
              <div 
                key={index} 
                className="w-32 h-32 md:w-40 md:h-36 bg-[#BE93E4] rounded-xl flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon */}
                <div className="text-white mb-3">
                  {IconComponent ? <IconComponent size={40} /> : <span>Icon</span>}
                </div>
                {/* Name */}
                <span className="text-white font-semibold text-lg">
                  {tool.name}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TechnologiesSection;