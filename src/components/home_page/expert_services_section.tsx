"use client";
import { Check } from "lucide-react";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion"; // Add Variants to your import
import { useRef } from "react";
import type { ExpertServicesSectionProps } from "@/types/homepage/expert_services";

/* ------------------ Looping Typewriter Sub-Component ------------------ */
const TypewriterTitle = ({ text, color }: { text: string; color: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, display: "none" },
    visible: { 
      opacity: 1, 
      display: "inline",
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        repeatDelay: 1.5,
        duration: 0.01 
      }
    },
  };

  // 1. Define the cursor blinking animation
const cursorVariants: Variants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: "linear",
      times: [0, 0.5, 0.5, 1],
    },
  },
};

  return (
  <motion.span
  ref={ref}
  variants={sentence}
  initial="hidden"
  animate={isInView ? "visible" : "hidden"}
  className="font-bold text-xs sm:text-sm mb-2 uppercase tracking-wide inline-flex items-center flex-wrap"
  style={{ color: color }}
>
  {text.split("").map((char, index) => (
    <motion.span 
      key={index} 
      variants={letter}
      className={char === " " ? "inline-block w-[0.3em]" : "inline"}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ))}
  
  <motion.span
    variants={cursorVariants}
    animate="blinking"
    className="w-[2px] h-[1em] ml-0.5 flex-shrink-0"
    style={{ backgroundColor: color }}
  />
</motion.span>
  );
};
/* ------------------ Main Section ------------------ */
const ExpertServicesSection = ({ data }: ExpertServicesSectionProps) => {
  return (
    <section className="w-full bg-bg-secondary py-16">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-t-primary ml-0 md:ml-20 max-w-md mb-10">
          {data.main_heading}
        </h2>

        <div className="relative w-full">
          <Image
            src={data.image}
            alt="Expert Services"
            width={1024}
            height={480}
            sizes="(max-width: 768px) 100vw, 90vw"
            className="w-full md:w-[90%] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[480px] object-cover rounded-lg"
            loading="lazy"
          />

          {/* Checklist Card */}
          <div className="absolute right-0 md:top-1/2 -translate-y-1/2 bg-[#FFFFFF] dark:bg-[#402060] rounded-lg shadow-2xl p-4 sm:p-6 w-64 sm:w-72 z-20">
            <ul className="space-y-3 sm:space-y-4">
              {data.process_checklist_card.items.map((item, index) => (
                <li key={index} className="flex text-t-primary items-center gap-2">
                  <Check className="w-4 h-4 text-t-secondary flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Info Cards */}
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
                <TypewriterTitle text={card.title} color={card.main_text} />

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
