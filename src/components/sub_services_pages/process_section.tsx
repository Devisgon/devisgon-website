"use client";

import React from "react";
import ALLIcons from "../icons";
import { ProcessSectionProps } from "@/types/sub_services_page/process";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5, 
      delayChildren: 0.3,
    },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const iconVariants: Variants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.15, 
    transition: { type: "spring", stiffness: 300, damping: 15 } 
  },
};

const ProcessSection: React.FC<ProcessSectionProps> = ({ data }) => {
  return (
    <section className="w-full  py-24 px-6">
      <div className="container mx-auto max-w-7xl text-center">
        
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-extrabold text-t-primary mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-t-secondary dark:text-t-primary font-medium">
            {data.subtitle}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} 
        >
          {data.steps.map((step, index) => {
            const iconName = step.icon.trim();
            const IconComponent = ALLIcons[iconName as keyof typeof ALLIcons];

            return (
              <motion.div 
                key={index} 
                className="flex flex-col items-center"
                variants={stepVariants}
                initial="rest"
                whileHover="hover" 
              >
                
                <motion.div 
                  variants={iconVariants}
                  className="w-24 h-24 bg-[#E9D5FF] dark:bg-[#47295C] rounded-full flex items-center justify-center mb-6 shadow-sm"
                >
                  {IconComponent ? (
                    <IconComponent className="text-black dark:text-[#ecd9fa] w-8 h-8" />
                  ) : (
                    <span className="text-xs">No Icon</span>
                  )}
                </motion.div>

                <h3 className="text-xl font-bold text-t-primary  mb-3">
                  {step.title}
                </h3>

                <p className="text-t-secondary text-sm font-medium leading-relaxed max-w-[200px]">
                  {step.description}
                </p>

              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;