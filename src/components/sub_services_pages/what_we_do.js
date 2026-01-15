"use client";
import React from 'react';

const WhatYouGetSection = ({ data }) => {

  return (
    <section className="w-full bg-bg-secondary  py-20 px-6 md:px-12 lg:px-24 flex items-center justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        <div className="flex flex-col justify-center">
          
          <h2 className="text-2xl md:text-2xl lg:text-5xl font-bold text-t-primary mb-12 leading-tight">
            {data.title}
          </h2>

          <div className="space-y-8">
            {data.list_items.map((item, index) => (
              <div key={index} className="flex flex-col">
                <h3 className="text-xl font-bold text-t-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-t_secondary text-base md:text-lg font-medium leading-relaxed opacity-90">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>

        <div className="relative w-full h-full flex items-center justify-center lg:justify-end">
          <div className="w-full rounded-3xl overflow-hidden ">
            <img 
              src={data.image} 
              alt="Feature Illustration" 
              className="w-full h-auto object-cover hover:scale-105  duration-700 "
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhatYouGetSection;