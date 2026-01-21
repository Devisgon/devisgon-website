"use client";
import React from "react";
import { CaseStudyProps } from "@/types/sub_services_page/case_study";
import { motion, Variants } from "framer-motion"; 

const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, x: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } 
  },
};

const CaseStudySection: React.FC<CaseStudyProps> = ({ data }) => {
  if (!data || !data.content) return null;

  const { headline, image, content } = data;
  const { problem, solution, result } = content;

  return (
    <section className="w-full bg-bg-primary py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Text */}
        <motion.div 
          className="flex flex-col justify-center"
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <motion.h2 
            variants={textItemVariants}
            className="text-3xl md:text-4xl font-bold text-t-primary mb-10 leading-tight"
          >
            {headline}
          </motion.h2>

          {problem && (
            <motion.div variants={textItemVariants} className="mb-6">
              <h3 className="text-xl font-bold text-t-primary mb-2">
                {problem.label}
              </h3>
              <p className="text-t-secondary text-base md:text-lg leading-relaxed opacity-90">
                {problem.text}
              </p>
            </motion.div>
          )}

          {solution && (
            <motion.div variants={textItemVariants} className="mb-6">
              <h3 className="text-xl font-bold text-t-primary mb-2">
                {solution.label}
              </h3>
              <p className="text-t-secondary text-base md:text-lg leading-relaxed opacity-90">
                {solution.text}
              </p>
            </motion.div>
          )}

          {result && (
            <motion.div variants={textItemVariants}>
              <h3 className="text-xl font-bold text-t-primary mb-2">
                {result.label}
              </h3>
              <p className="text-t-secondary text-base md:text-lg leading-relaxed opacity-90">
                {result.text}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Right Image */}
        <motion.div 
          className="relative w-full h-full flex items-center justify-center lg:justify-end"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {image && (
            <div className="w-full rounded-2xl overflow-hidden">
              <img
                src={image}
                alt={headline || "Case Study Image"}
                className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105"
              />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudySection;