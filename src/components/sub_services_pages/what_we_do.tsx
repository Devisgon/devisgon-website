"use client";
import React from "react";
import { WhatYouGetSectionProps } from "@/types/sub_services_page/wwd";
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
    transition: { duration: 0.5, ease: "easeOut" } 
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

const WhatYouGetSection: React.FC<WhatYouGetSectionProps> = ({ data }) => {
  if (!data) return null;

  return (
    <section className="w-full  py-20 px-6 md:px-12 lg:px-24 flex items-center justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

        <motion.div 
          className="flex flex-col justify-center"
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} 
        >
          <motion.h2 
            variants={textItemVariants}
            className="text-2xl md:text-3xl font-bold  text-t-primary mb-12 leading-tight"
          >
            {data.title}
          </motion.h2>

          <div className="space-y-8">
            {data.list_items.map((item, index) => (
              <motion.div 
                key={index} 
                className="flex flex-col"
                variants={textItemVariants}
              >
                <h3 className="text-xl font-bold text-t-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-t-secondary text-base md:text-lg font-medium leading-relaxed opacity-90">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="relative w-full h-full flex items-center justify-center lg:justify-end"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} 
        >
          <div className="w-full rounded-3xl overflow-hidden">
            <motion.img
              src={data.image}
              alt="Feature Illustration"
              className="w-full h-full scale-110  "
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default WhatYouGetSection;