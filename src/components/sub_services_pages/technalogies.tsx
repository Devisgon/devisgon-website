"use client";
import React from "react";
import AllIcons from "../icons";
import { TechnologiesSectionProps } from "@/types/sub_services_page/technalogies";

const TechnologiesSection: React.FC<TechnologiesSectionProps> = ({ data }) => {
  return (
    <section className="w-full bg-bg-primary py-20 px-4">
      <div className="container mx-auto max-w-7xl text-center">
        
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-t-primary mb-4">
          {data.title}
        </h2>
        <p className="text-lg text-t_secondary font-medium mb-12">
          {data.subtitle}
        </p>

        {/* Tools Grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {data.tools.map((tool, index) => {
            const iconName = tool.icon?.trim();

            // Type-safe icon retrieval
            const IconComponent = iconName && iconName in AllIcons
              ? AllIcons[iconName as keyof typeof AllIcons]
              : null;

            return (
              <div 
                key={index} 
                className="w-32 h-32 md:w-40 md:h-36 bg-[#BE93E4] rounded-xl flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-white mb-3">
                  {IconComponent ? (
                    <IconComponent size={40} />
                  ) : (
                    <span className="text-xs">No Icon</span>
                  )}
                </div>
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
