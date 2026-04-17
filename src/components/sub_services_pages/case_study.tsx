import React from "react";
import { CaseStudyProps } from "@/types/sub_services_page/case_study";

const CaseStudySection: React.FC<CaseStudyProps> = ({ data }) => {
  if (!data || !data.content) return null;

  const { headline, image, content } = data;
  const { problem, solution, result } = content;

  return (
    <section className="w-screen md:w-full bg-bg-primary dark:bg-background py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-t-primary mb-10 leading-tight">{headline}</h2>

          {problem && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-t-primary mb-2">{problem.label}</h3>
              <p className="text-t-secondary text-base md:text-lg leading-relaxed opacity-90">{problem.text}</p>
            </div>
          )}

          {solution && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-t-primary mb-2">{solution.label}</h3>
              <p className="text-t-secondary text-base md:text-lg leading-relaxed opacity-90">{solution.text}</p>
            </div>
          )}

          {result && (
            <div>
              <h3 className="text-xl font-bold text-t-primary mb-2">{result.label}</h3>
              <p className="text-t-secondary text-base md:text-lg leading-relaxed opacity-90">{result.text}</p>
            </div>
          )}
        </div>

        <div className="relative w-full h-full flex items-center justify-center lg:justify-end">
          {image && (
            <div className="w-full rounded-2xl overflow-hidden">
              <img
                src={image}
                alt={headline || "Case Study Image"}
                className="w-full h-auto object-cover scale-101 hover:scale-110 transform transition-transform duration-700 "
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;
