"use client";

import React from 'react';

interface CEOData {
  image: string;
  title: string;
  quote: string;
  author: string;
  role: string;
}

interface CEOSectionProps {
  data: CEOData | null | undefined; 
}

const CEOSection = ({ data }: CEOSectionProps) => {
  if (!data) return null;

  return (
    <section id="about" className="py-20 bg-bg-secondary">
      <div className="max-w-2xl mx-auto">
        <div className="relative bg-card rounded-2xl shadow-testimonial p-12 pt-8">
          <div className="flex justify-center -translate-y-10">
            <div className="w-96 h-84 rounded-xl overflow-hidden shadow-lg">
              <img
                src={data.image}
                alt="CEO"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="bg-background rounded-2xl p-6 -mt-38 border-t-[6px] border-[#D1AFEC] dark:border-white shadow-xl">
            <div className="absolute left-10 top-28 text-[300px] font-serif font-bold text-t-primary/10">
              “
            </div>

            <div className="relative text-center space-y-6 mt-24">
              <h2 className="text-2xl md:text-3xl font-bold text-t-primary">
                {data.title}
              </h2>

              <p className="text-t_secondary text-sm md:text-base leading-relaxed max-w-lg mx-auto">
                "At <span className="font-semibold text-secondary">Devisgon</span>
                {data.quote}
              </p>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-t-primary">{data.author}</h3>
                <p className="text-t_secondary font-medium">{data.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEOSection;