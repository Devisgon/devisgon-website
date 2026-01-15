"use client";
import React from 'react';
import AllIcons from "../icons"
const TechnologiesSection = ({ data }) => {

  return (
    <section className="w-full bg-bg-primary py-20 px-4">
      <div className="container mx-auto max-w-7xl text-center">
        
        <h2 className="text-3xl md:text-4xl font-bold text-t-primary mb-4">
          {data.title}
        </h2>
        <p className="text-lg text-t_secondary font-medium mb-12">
          {data.subtitle}
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {data.tools.map((tool, index) => {
            const IconComponent = AllIcons[tool.icon.trim()];

            return (
              <div 
                key={index} 
                className="w-32 h-32 md:w-40 md:h-36 bg-[#BE93E4] rounded-xl flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
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