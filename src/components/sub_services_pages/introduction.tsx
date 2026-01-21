"use client";
import React from "react";
import { IntroductionSectionProps } from "@/types/sub_services_page/intoduction";

const IntroductionSection: React.FC<IntroductionSectionProps> = ({ data }) => {
  if (!data) return null;

  return (
    <section className="w-full bg-bg-secondary py-20 px-6 md:px-12 lg:px-24 flex items-center justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Text Content */}
        <div className="flex flex-col gap-6">  
          <h2 className="text-4xl md:text-5xl font-bold text-t-primary tracking-tight">
            {data.heading}{" "}
            <span className="text-t_secondary">{data.span_heading}</span>
          </h2>

          <div className="space-y-6">
            {data.content.map((paragraph, index) => (
              <p 
                key={index} 
                className="text-lg text-t_secondary leading-relaxed font-medium"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-4 p-4 bg-[#e3c6f8] border-l-4 border-[#D1AFEC] rounded-r-xl shadow-sm">
            <p className="text-secondary font-bold text-lg italic">
              {data.highlight_quote}
            </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full flex justify-center lg:justify-end">
          <div className="rounded-2xl overflow-hidden w-full max-w-lg">
            <img 
              src={data.side_image} 
              alt="AI App Interface" 
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default IntroductionSection;
