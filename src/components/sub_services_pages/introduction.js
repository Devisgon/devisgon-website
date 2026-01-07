"use client";
import React from 'react';

const IntroductionSection = ({ data }) => {
  return (
    <section className="w-full bg-[#FBF7FE] py-20 px-6 md:px-12 lg:px-24 flex items-center justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        <div className="flex flex-col gap-6">  
          <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            {data.heading} <span className="text-secondary">{data.span_heading}</span>
          </h2>

          <div className="space-y-6">
            {data.content.map((content, index) => (
              <p 
                key={index} 
                className="text-lg text-secondary leading-relaxed font-medium"
              >
                {content}
              </p>
            ))}
          </div>

          <div className="mt-4 p-4 bg-[#EAD5F9] border-l-4 border-[#D1AFEC] rounded-r-xl shadow-sm">
            <p className="text-primary font-bold text-lg italic">
              {data.highlight_quote}
            </p>
          </div>
        </div>

        <div className="relative w-full flex justify-center lg:justify-end">
            <div className="rounded-2xl overflow-hidden  w-full max-w-lg">
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