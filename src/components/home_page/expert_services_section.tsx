"use client";

import { Typewriter } from "react-simple-typewriter";
import { Check } from "lucide-react";
import type { ExpertServicesSectionProps } from "@/types/homepage/expert_services";

const ExpertServicesSection = ({ data }: ExpertServicesSectionProps) => {
  return (
    <section className="w-full bg-bg-secondary py-16">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-t-primary ml-0 md:ml-20 max-w-md mb-10">
          {data.main_heading}
        </h2>

        <div className="relative w-full">
          <img
            src={data.image}
            alt="Expert Services"
            className="w-full md:w-[90%] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[480px] object-cover rounded-lg"
          />

          {/* Checklist Card */}
          <div className="absolute right-0  md:top-1/2 -translate-y-1/2 bg-[#FFFFFF] dark:bg-[#402060] rounded-lg shadow-2xl p-4 sm:p-6 w-64 sm:w-72 z-20">
            <ul className="space-y-3 sm:space-y-4">
              {data.process_checklist_card.items.map((item, index) => (
                <li key={index} className="flex text-t-primary items-center gap-2">
                  <Check className="w-4 h-4 text-t-secondary flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium ">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Cards */}
          <div
            className="
              flex flex-col p-2 mt-10 
              md:absolute md:bottom-0 md:left-[25%] md:right-0 md:flex-row md:translate-y-1/2
              z-20
            "
          >
            {data.core_info_cards.map((card, index) => (
              <div
                key={index}
                className="flex-1 p-4 sm:p-6 rounded-sm"
                style={{ backgroundColor: card.bg }}
              >
                <span
                  className="font-bold text-xs sm:text-sm mb-2 uppercase tracking-wide"
                  style={{ color: card.main_text }}
                >
                  <Typewriter
                    words={[card.title]}
                    loop
                    cursor
                    cursorStyle="|"
                    typeSpeed={80}
                    deleteSpeed={50}
                    delaySpeed={1500}
                  />
                </span>

                <p
                  className="text-[10px] sm:text-xs leading-relaxed opacity-90"
                  style={{ color: card.text }}
                >
                  {card.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-24 md:h-32"></div>
      </div>
    </section>
  );
};

export default ExpertServicesSection;
