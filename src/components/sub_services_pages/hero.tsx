"use client";
import React from "react";
import { Play } from "lucide-react";
import { HeroSectionProps } from "@/types/sub_services_page/hero";

const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const { title, subtitle, description, hero_image } = data;

  return (
    <section className="relative w-full min-h-screen bg-bg-secondary overflow-hidden flex items-center justify-center py-30">
      
      {/* Decorative circles */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-70 w-[400px] h-[400px] rounded-full border-[60px] border-[#8145B5] opacity-10" />
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-[300px] h-[300px] rounded-full border-[40px] border-[#8145B5] opacity-10" />
      <div className="absolute top-20 right-16 w-[100px] h-[100px] rounded-full border-[16px] border-[#8145B5] opacity-10" />

      <div className="px-22 relative z-10 flex gap-0.52">
        <div className="flex flex-col lg:flex-row items-center">
          
          {/* Left Content */}
          <div className="w-full lg:w-2/3 bg-[#E9D5FF] rounded-2xl p-8 md:p-16 lg:pr-32 shadow-sm relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-t-primary mb-2 tracking-tight">{title}</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-t-primary/80 mb-6">{subtitle}</h2>
            <p className="text-t-primary text-lg md:text-xl font-medium mb-10 max-w-lg leading-relaxed">{description}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary hover:bg-primary text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-md">
                Start My AI Project
              </button>
              <button className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-4 px-8 rounded-xl transition-all">
                Contact Us
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/3 z-20">
            <div className="relative mx-auto w-[300px] h-[550px] rounded-2xl overflow-hidden">
              <img
                src={hero_image}
                alt="App Interface"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <div className="flex justify-between">
                  <h3 className="text-white text-3xl font-bold leading-tight">
                    Our Work.<br />Their Words.
                  </h3>
                  <div className="flex gap-1 mt-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                    <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button className="w-12 h-12 bg-black rounded-full flex items-center justify-center border border-white/20">
                    <Play className="text-white w-5 h-5 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
