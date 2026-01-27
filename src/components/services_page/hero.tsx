"use client";
import { useState } from "react";
import type { HeroSectionProps } from "@/types/services_page/hero";

const HeroSection = ({ data }: HeroSectionProps) => {
const [activeBtn, setActiveBtn] = useState<number | null>(null);  return (
    <section
      className="relative w-full py-24 px-6 md:px-12 lg:px-20 bg-bg-secondary overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: "url('/services_page/hero_bg.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
      }}
    >
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <h2 className="text-t-primary font-bold text-3xl md:text-7xl mb-4 tracking-tight">
          {data.title}
        </h2>

        <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold mb-6 leading-[1.15]">
          <span className="text-t-secondary block md:inline 
             bg-clip-text dark:text-transparent
dark:bg-[linear-gradient(135deg,rgba(109,0,195,0.31)_0%,#D1AFEC_70.71%)] ">{data.subtitle}</span>
          <span className="text-t-primary block md:inline 
             bg-clip-text dark:text-transparent
dark:bg-[linear-gradient(135deg,rgba(109,0,195,0.31)_0%,#D1AFEC_70.71%)] ">{data.span_subtitle}</span>
        </h1>

        <p className="text-t-secondary dark:text-t-primary text-base md:text-lg max-w-2xl mb-10 leading-relaxed font-medium">
          {data.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {data.buttons.map((btn, index) => (
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

export default HeroSection;
