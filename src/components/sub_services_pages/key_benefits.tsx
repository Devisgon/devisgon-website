"use client";
import React from "react";
import AllIcons from "../icons";
import { KeyBenefitsSectionProps } from "@/types/sub_services_page/key_benefits";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, 
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
};

const KeyBenefitsSection: React.FC<KeyBenefitsSectionProps> = ({ data }) => {
  return (
    <section className="w-full bg-background py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }} 
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-t-primary mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-t-secondary dark:text-t-primary font-medium">
            {data.subtitle}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }} 
        >
          {data.cards.map((card, index) => {
            const iconName = card.icon_type.trim() as keyof typeof AllIcons; 
            const IconComponent = AllIcons[iconName];

            return (
              <motion.div 
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white border border-[#D1AFEC] rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col items-start"
              >
                <div className="w-14 h-14 bg-[#EAD5F9] dark:bg-[#6F1595] rounded-xl flex items-center justify-center mb-6 text-[#9333EA] dark:text-[#EAD5F9]">
                  {IconComponent ? (
                    <IconComponent size={28} />
                  ) : (
                    <span className="text-xs">No Icon</span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-[#402060] mb-3">
                  {card.title}
                </h3>
                <p className="text-t-secondary leading-relaxed text-sm">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
        
      </div>
    </section>
  );
};

export default KeyBenefitsSection;