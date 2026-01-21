"use client";
import React from "react";
import AllIcons from "../icons";
import { TechnologiesSectionProps } from "@/types/sub_services_page/technalogies";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, 
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 } 
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const TechnologiesSection: React.FC<TechnologiesSectionProps> = ({ data }) => {
  return (
    <section className="w-full bg-bg-primary py-20 px-4">
      <div className="container mx-auto max-w-7xl text-center">
        
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }} 
        >
          <h2 className="text-3xl md:text-4xl font-bold text-t-primary mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-t_secondary font-medium mb-12">
            {data.subtitle}
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }} 
        >
          {data.tools.map((tool, index) => {
            const iconName = tool.icon?.trim();

            const IconComponent = iconName && iconName in AllIcons
              ? AllIcons[iconName as keyof typeof AllIcons]
              : null;

            return (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.05 }}
                className="w-32 h-32 md:w-40 md:h-36 bg-[#BE93E4] rounded-xl flex flex-col items-center justify-center shadow-sm hover:shadow-md cursor-pointer"
              >
                <div className="text-white mb-3">
                  {IconComponent ? (
                    <IconComponent size={40} />
                  ) : (
                    <span className="text-xs">No Icon</span>
                  )}
                </div>
                <span className="text-white font-semibold text-lg">
                  {tool.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default TechnologiesSection;