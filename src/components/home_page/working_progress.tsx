"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import type { ProcessSectionProps } from "@/types/homepage/process";

const stepsData = [
  { id: 1, title: "Exploration" },
  { id: 2, title: "Planning" },
  { id: 3, title: "Execute" },
  { id: 4, title: "Testing" },
  { id: 5, title: "Deliver" },
] as const;

export default function ProcessSection({ data }: ProcessSectionProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isLastGreen, setIsLastGreen] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev === stepsData.length) {
          setIsLastGreen(true);

          setTimeout(() => {
            setIsLastGreen(false);
            setCurrentStep(1);
          }, 500);

          return prev;
        }
        return prev + 1;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  const progressPercent =
    ((currentStep - 1) / (stepsData.length - 1)) * 100;

  return (
    <section className="bg-background  py-20 px-4">
      <div className="flex flex-col items-center text-center mb-20">
        <p className="text-t-secondary font-bold text-3xl mb-4">
          {data.section_heading}
        </p>

        <h1 className="text-t-primary font-extrabold text-5xl">
          {data.main_heading}{" "}
          <span className="text-t-secondary">{data.span_heading}</span>
        </h1>

        <h1 className="text-t-primary text-5xl font-extrabold mt-2">
          {data.heading}
        </h1>
      </div>

      <div className="flex justify-center">
        <div className="relative w-full max-w-5xl">
          {/* Horizontal progress (desktop) */}
          <div className="hidden md:block absolute top-[2.5rem] left-4 w-[950px] h-1 rounded-full overflow-hidden">
            <div className="absolute w-full h-full bg-purple-200" />
            <div
              className="absolute h-full bg-t-secondary transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Vertical progress (mobile) */}
          <div className="md:hidden absolute left-1/2 top-4 -translate-x-1/2 w-1 h-[700px] rounded-full overflow-hidden">
            <div className="absolute w-full h-full bg-purple-200" />
            <div
              className="absolute w-full bg-t-secondary transition-all duration-700"
              style={{ height: `${progressPercent}%` }}
            />
          </div>

          {/* Steps */}
          <div className="flex md:flex-row flex-col md:justify-between items-center md:items-start gap-12 relative z-10">
            {stepsData.map((step) => {
              const isActive = step.id <= currentStep;
              const isLastStep =
                step.id === stepsData.length && isLastGreen;

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center border-4 border-[#EAD5F9] dark:border-[#47295C] transition-all duration-500
                      ${
                        isLastStep
                          ? "bg-[#138b33] border-[#138b33]"
                          : isActive
                          ? "bg-t-secondary  "
                          : "bg-white "
                      }
                    `}
                  >
                    {isActive && (
                      <Check
                        className="w-8 h-8 text-background animate-in zoom-in duration-300"
                        strokeWidth={3}
                      />
                    )}
                  </div>

                  <p
                    className={`mt-4 text-lg font-semibold text-center transition-colors
                      ${
                        isLastStep
                          ? "text-[#138b33]"
                          : isActive
                          ? "text-t-secondary"
                          : "text-[#6F6F6F]"
                      }
                    `}
                  >
                    {step.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
