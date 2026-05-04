"use client";
import { Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { ProcessSectionProps } from "@/types/homepage/process";

const stepsData = [
  { id: 1, title: "Exploration" },
  { id: 2, title: "Planning" },
  { id: 3, title: "Execute" },
  { id: 4, title: "Testing" },
  { id: 5, title: "Deliver" },
] as const;

export default function ProcessSection({ data }: ProcessSectionProps) {
  const resolvedSteps = data.stepsData?.length ? data.stepsData : stepsData;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });
  
  const [activeStep, setActiveStep] = useState(0);
  const [isSuccessState, setIsSuccessState] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isInView) {
      interval = setInterval(() => {
        setActiveStep((prev) => {
          if (prev >= resolvedSteps.length) {
            setIsSuccessState(false);
            return 0;
          }
          
          const nextStep = prev + 1;
          
          // If it's the last step, trigger the "Green" shift after a small delay
          if (nextStep === resolvedSteps.length) {
            setTimeout(() => setIsSuccessState(true), 800);
          }
          
          return nextStep;
        });
      }, 1000); // Slower interval to appreciate the fill effect
    }

    return () => {
      clearInterval(interval);
      setIsSuccessState(false);
    };
  }, [isInView, resolvedSteps.length]);

  const progressPercent =
    resolvedSteps.length > 1
      ? (Math.max(0, activeStep - 1) / (resolvedSteps.length - 1)) * 100
      : 100;

  return (
    <section ref={sectionRef} className="bg-background py-20 px-4 overflow-hidden">
      {/* Headings... (Same as before) */}
      <div className="flex flex-col items-center text-center mb-20">
        <p className="text-t-secondary font-bold text-3xl mb-4">{data.section_heading}</p>
        <h1 className="text-t-primary font-bold md:text-5xl text-2xl">
          {data.main_heading} <span className="text-t-secondary">{data.span_heading}</span>
        </h1>
      </div>

      <div className="flex justify-center">
        <div className="relative w-full max-w-5xl">
          
          {/* Progress Line (Desktop) */}
        <div className="absolute top-[2.5rem] left-4 right-4 h-1 rounded-full bg-[#EAD5F9] dark:bg-[#47295C] overflow-hidden">
  <motion.div
    className="h-full bg-t-secondary origin-left" // Added origin-left for smoother growth
    initial={{ width: 0 }}
    animate={{ width: `${progressPercent}%` }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  />
</div>

          {/* Steps */}
          <div className="flex md:flex-row flex-col md:justify-between items-center relative z-10">
            {resolvedSteps.map((step, index) => {
              const stepNumber = index + 1;
              const isFilled = stepNumber <= activeStep;
              const isLast = stepNumber === resolvedSteps.length;
              const turnGreen = isLast && isSuccessState;

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className="relative w-20 h-20">
                    {/* The Background/Border Circle */}
                    <div className={`absolute inset-0 rounded-full border-4 border-[#EAD5F9] dark:border-[#47295C] bg-background`} />
                    
                    {/* The Animated Fill Layer */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: isFilled ? 1 : 0,
                        backgroundColor: turnGreen ? "#138b33" : "var(--t-secondary, #9333ea)" 
                      }}
                      transition={{ duration: 0.5, ease: "backOut" }}
                      className="absolute inset-0 rounded-full flex items-center justify-center"
                    >
                      <AnimatePresence>
                        {isFilled && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <Check className="w-8 h-8 text-white" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  <motion.p
                    animate={{ 
                      color: turnGreen ? "#138b33" : isFilled ? "var(--t-secondary, #9333ea)" : "#6F6F6F",
                      scale: isFilled ? 1.1 : 1 
                    }}
                    className="mt-6 text-lg font-semibold text-center transition-all"
                  >
                    {step.title}
                  </motion.p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}