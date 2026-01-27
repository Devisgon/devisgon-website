"use client";
import { useState } from "react";

import React from "react";
const data=[{text:"Book a Consultation"},{text:"Contact Us"}]

const CallToAction: React.FC = () => {
  const [activeBtn, setActiveBtn] = useState<number | null>(null); 

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#c191e6] via-[#be8ee6] to-[#c9a0e8] dark:from-[#321a47] dark:via-[#402061] dark:to-[#2f1a42] px-8 py-16 md:px-16 text-center shadow-lg">
      <div className="w-full">
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-t-primary">
            Let's Build Smarter, Together
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-white leading-relaxed">
            Talk to our experts and see how Devisgon can accelerate your
            business growth with cutting-edge technology solutions.
          </p>

          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          {data.map((btn, index) => (
          <button
              key={index}
              onClick={() => setActiveBtn(index)}
              className={`px-8 py-3.5 rounded-lg text-sm font-semibold duration-300 border-2 border-btn-primary 
                ${activeBtn == index 
                  ? 'bg-btn-primary text-white' 
                  : 'bg-transparent text-t-secondary hover:bg-btn-primary hover:text-white'
                }`}
            >
              {btn.text}
            </button>
          ))}
        </div>
        </div>
    </section>
  );
};

export default CallToAction;
