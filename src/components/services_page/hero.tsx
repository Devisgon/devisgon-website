"use client";

import type { HeroSectionProps } from "@/types/services_page/hero";

const HeroSection = ({ data }: HeroSectionProps) => {
  return (
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

        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-[1.15]">
          <span className="text-t_secondary block md:inline">{data.subtitle}</span>
          <span className="text-t-primary block md:inline">{data.span_subtitle}</span>
        </h1>

        <p className="text-t_secondary text-base md:text-lg max-w-2xl mb-10 leading-relaxed font-medium">
          {data.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {data.buttons.map((btn, index) => (
            <button
              key={index}
              className="px-8 py-3.5 rounded-lg text-sm md:text-base font-semibold transition-all duration-300   hover:shadow-white
                        text-white bg-btn-primary border border-primary hover:shadow-2xl hover-shadow-primary hover:bg-btn-secondary"
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
