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
  const [lineReachedStep, setLineReachedStep] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isInView) {
      interval = setInterval(() => {
        setActiveStep((prev) => {
          if (prev >= resolvedSteps.length) {
            setIsSuccessState(false);
            setLineReachedStep(0);
            return 0;
          }
          const nextStep = prev + 1;
          setTimeout(() => {
            setLineReachedStep(nextStep);
            if (nextStep === resolvedSteps.length) {
              setTimeout(() => setIsSuccessState(true), 400);
            }
          }, 800);
          return nextStep;
        });
      }, 2000);
    }

    return () => {
      clearInterval(interval);
      setIsSuccessState(false);
      setLineReachedStep(0);
    };
  }, [isInView, resolvedSteps.length]);

  const progressPercent =
    resolvedSteps.length > 1
      ? (Math.max(0, activeStep - 1) / (resolvedSteps.length - 1)) * 100
      : 100;

  return (
    <section ref={sectionRef} className="bg-background py-20 px-4 overflow-visible">
      <div className="flex flex-col items-center text-center mb-24">
        <p className="text-t-secondary font-bold text-3xl mb-4">{data.section_heading}</p>
        <h2 className="text-t-primary font-bold md:text-5xl text-2xl">
          {data.main_heading} <span className="text-t-secondary">{data.span_heading}</span>
        </h2>
      </div>

      <div className="flex justify-center overflow-visible">
        <div className="relative w-full max-w-5xl overflow-visible">
          
          {/* Progress Line (Desktop) */}
          <div className="hidden md:block absolute top-[2.5rem] left-4 right-4 h-1 rounded-full bg-[#EAD5F9] dark:bg-[#47295C] overflow-hidden">
            <motion.div
              className="h-full bg-t-secondary origin-left"
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>

          {/* Progress Line (Mobile) */}
          <div className="md:hidden absolute left-1/2 top-10 bottom-10 w-1 -translate-x-1/2 rounded-full bg-[#EAD5F9] dark:bg-[#47295C] overflow-hidden">
            <motion.div
              className="w-full bg-t-secondary origin-top"
              animate={{ height: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>

          <div className="flex md:flex-row flex-col md:justify-between items-center relative z-10 gap-20 md:gap-0 overflow-visible">
            {resolvedSteps.map((step, index) => {
              const stepNumber = index + 1;
              const hasLineReached = stepNumber <= lineReachedStep;
              const isCurrentlyGlowing = stepNumber === lineReachedStep;
              const turnGreen = stepNumber === resolvedSteps.length && isSuccessState;

              return (
                <div key={step.id} className="relative flex flex-col items-center justify-center w-full md:w-auto overflow-visible">
                  
                  {/* MAIN CIRCLE WRAPPER */}
                  <motion.div 
                    className="relative w-20 h-20 shrink-0 z-20 rounded-full flex items-center justify-center bg-background" // bg-background hides the line behind it
                    animate={{
                      scale: isCurrentlyGlowing ? 1.2 : 1,
                      // The border color matches the line color until reached
                      borderColor: hasLineReached 
                        ? (turnGreen ? "#138b33" : "var(--t-secondary, #9333ea)") 
                        : "#EAD5F9",
                     
                    }}
                    style={{ borderWidth: "4px" }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* FILL LAYER (Inside the border) */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: hasLineReached ? 1 : 0,
                        backgroundColor: turnGreen ? "#138b33" : "var(--t-secondary, #9333ea)" 
                      }}
                      className="absolute inset-0 rounded-full flex items-center justify-center"
                    >
                      <AnimatePresence>
                        {hasLineReached && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <Check className="w-10 h-10 text-white" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>

                  {/* Text Container */}
                  <motion.p
                    animate={{ 
                      color: turnGreen ? "#138b33" : hasLineReached ? "var(--t-secondary, #9333ea)" : "#6F6F6F",
                    }}
                    className={`
                      absolute left-[calc(50%+4rem)] w-[140px] text-left 
                      md:static md:w-auto md:mt-8 md:text-center 
                      text-lg font-bold transition-all duration-300
                    `}
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