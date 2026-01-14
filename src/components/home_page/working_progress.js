"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";

const stepsData = [
  { id: 1, title: "Exploration" },
  { id: 2, title: "Planning" },
  { id: 3, title: "Execute" },
  { id: 4, title: "Testing" },
  { id: 5, title: "Deliver" },
];

export default function ProcessSection({ data }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLastGreen, setIsLastGreen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev === stepsData.length) {
          setIsLastGreen(true);

          setTimeout(() => {
            setIsLastGreen(false);
            setCurrentStep(1);
          }, 1200);

          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const progressPercent =
    ((currentStep - 1) / (stepsData.length - 1)) * 100;

  return (
    <section className="bg-bg-secondary py-20 px-4">

      {/* ================= HEADING ================= */}
      <div className="flex flex-col items-center text-center mb-20">
        <p className="text-secondary text-2xl mb-4">
          {data.section_heading}
        </p>

        <h1 className="text-primary font-bold text-5xl">
          {data.main_heading}{" "}
          <span className="text-secondary">{data.sub_heading}</span>
        </h1>

        <h1 className="text-primary text-5xl font-bold mt-2">
          {data.bottom_heading}
        </h1>
      </div>

      {/* ================= STEPPER ================= */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-5xl">

          {/* ----- DESKTOP HORIZONTAL LINE ----- */}
          <div className="hidden md:block absolute top-[2.5rem] left-4 w-[900px] h-1 rounded-full overflow-hidden">
            <div className="absolute w-full h-full bg-purple-200" />
            <div
              className="absolute h-full bg-secondary transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* ----- MOBILE VERTICAL LINE ----- */}
          <div className="md:hidden absolute left-1/2 top-4 -translate-x-1/2 w-1 h-[700px] rounded-full overflow-hidden">
            <div className="absolute w-full h-full bg-purple-200" />
            <div
              className="absolute w-full bg-secondary transition-all duration-700"
              style={{ height: `${progressPercent}%` }}
            />
          </div>

          {/* ----- STEPS ----- */}
          <div className="flex md:flex-row flex-col md:justify-between items-center md:items-start gap-12 relative z-10">
            {stepsData.map((step) => {
              const isActive = step.id <= currentStep;
              const isLastStep =
                step.id === stepsData.length && isLastGreen;

              return (
                <div key={step.id} className="flex flex-col items-center">

                  {/* Circle */}
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center border-4 transition-all duration-500
                      ${
                        isLastStep
                          ? "bg-green-500 border-green-500"
                          : isActive
                          ? "bg-secondary border-secondary"
                          : "bg-white border-purple-200"
                      }
                    `}
                  >
                    {isActive && (
                      <Check
                        className="w-8 h-8 text-white animate-in zoom-in duration-300"
                        strokeWidth={3}
                      />
                    )}
                  </div>

                  {/* Label */}
                  <p
                    className={`mt-4 text-lg font-semibold text-center transition-colors
                      ${
                        isLastStep
                          ? "text-green-600"
                          : isActive
                          ? "text-secondary"
                          : "text-gray-400"
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
