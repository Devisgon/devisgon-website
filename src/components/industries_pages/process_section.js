"use client";

import React from 'react';

import ALLIcons from "../icons"
const ProcessSection = ({ data }) => {

  return (
    <section className="w-full bg-[#FAFAFF] py-24 px-6">
      <div className="container mx-auto max-w-7xl text-center">
        
        <div className="mb-20">
          <h2 className="text-4xl font-extrabold text-primary mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-secondary font-medium">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {data.steps.map((step, index) => {
            const iconName = step.icon.trim();
            const IconComponent = ALLIcons[iconName];

            return (
              <div 
                key={index} 
                className="flex flex-col items-center group"
              >
                <div className="w-24 h-24 bg-[#E9D5FF] rounded-full flex items-center justify-center mb-6 shadow-sm transition-transform duration-300 group-hover:scale-110">
                  {IconComponent ? (
                    <IconComponent className="text-black w-8 h-8" />
                  ) : (
                    <span className="text-xs">Icon</span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-primary mb-3">
                  {step.title}
                </h3>

                <p className="text-secondary/80 text-sm font-medium leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;