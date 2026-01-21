"use client";

import { Sparkles, Code } from "lucide-react";
import type { SolutionsSectionProps } from "@/types/homepage/solution";

const SolutionsSection = ({ data }: SolutionsSectionProps) => {
  return (
    <section className="w-full py-10  bg-bg-primary">
      <div className="max-w-6xl mx-auto mt-2 px-4">
        <div className="flex flex-col lg:flex-row gap-12 ">

          {/* Left Content */}
          <div className="lg:w-1/2 mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-t-primary mb-6 leading-tight">
              {data.title}
            </h2>

            <p className="text-t_secondary text-sm leading-relaxed mb-10 max-w-md">
              At <span className="text-[#8E4EC6] font-semibold">DEVISGON</span>,{" "}
              {data.description}
            </p>

            {/* Feature Cards */}
            <div className="flex flex-col sm:flex-row gap-8">
              {data.features.map((feature, index) => (
                <div key={index} className="flex-1">
                  <div className="w-14 h-14 rounded-full bg-white border flex items-center justify-center mb-4 shadow-sm">
                    {index === 0 ? (
                      <Sparkles className="text-[#A71A7F] w-full h-full p-2 hover:bg-[#A71A7F] rounded-full hover:text-white hover:border-[#A71A7F]" />
                    ) : (
                      <Code className="text-[#3AB8A9] w-full h-full p-2 rounded-full hover:bg-[#3AB8A9] hover:text-white hover:border-[#3AB8A9]" />
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-t-primary mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-t_secondary text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 relative">
            <div className="overflow-hidden">
              <img
                src={data.side_image}
                alt="Solutions"
                className="w-[470px] h-[515px] rounded-3xl"
              />
            </div>

            <div className="absolute bottom-4 left-[20%] translate-y-1/3 bg-white rounded-xl shadow-2xl p-6 w-72 z-10">
              <p className="text-primary text-xs mb-1">
                {data.side_card.pre_text}
              </p>
              <h4 className="text-lg font-bold text-primary mb-2">
                {data.side_card.title}
              </h4>
              <p className="text-primary text-xs leading-relaxed">
                {data.side_card.description}
              </p>
            </div>
          </div>
        </div>

        <div className="h-16 lg:h-24" />
      </div>
    </section>
  );
};

export default SolutionsSection;
