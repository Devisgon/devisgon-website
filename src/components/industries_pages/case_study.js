"use client";

import React from "react";

const CaseStudySection = ({ data }) => {
  // Optional: fallback if data or content is missing
  if (!data || !data.content) return null;

  const { headline, image, content } = data;
  const { problem, solution, result } = content;

  return (
    <section className="w-full bg-[#F7EDFE] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* --- Left Column: Text Content --- */}
        <div className="flex flex-col justify-center">
          {/* Main Headline */}
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10 leading-tight">
            {headline}
          </h2>

          {/* Problem Block */}
          {problem && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-primary mb-2">
                {problem.label}
              </h3>
              <p className="text-secondary text-base md:text-lg leading-relaxed opacity-90">
                {problem.text}
              </p>
            </div>
          )}

          {/* Solution Block */}
          {solution && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-primary mb-2">
                {solution.label}
              </h3>
              <p className="text-secondary text-base md:text-lg leading-relaxed opacity-90">
                {solution.text}
              </p>
            </div>
          )}

          {/* Result Block */}
          {result && (
            <div>
              <h3 className="text-xl font-bold text-primary mb-2">
                {result.label}
              </h3>
              <p className="text-secondary text-base md:text-lg leading-relaxed opacity-90">
                {result.text}
              </p>
            </div>
          )}
        </div>

        {/* --- Right Column: Case Study Image --- */}
        <div className="relative w-full h-full flex items-center justify-center lg:justify-end">
          {image && (
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-purple-100 group">
              <img
                src={image}
                alt={headline || "Case Study Image"}
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default CaseStudySection;
