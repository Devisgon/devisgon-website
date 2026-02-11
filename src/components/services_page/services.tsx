"use client";
import { motion } from "framer-motion";
import type { ServicesListProps } from "@/types/services_page/services";
import allIcons from "../icons";

const ServicesList = ({ data }: ServicesListProps) => {
  return (
    <div className="flex flex-col">
      {data.map((section, index) => (
        <section
          key={index}
          className={`
            px-6 md:px-12 lg:px-20 transition-colors duration-300
            ${index % 2 === 0 
              ? "bg-background"
              : "bg-foreground dark:bg-background"
            }
          `}
        >
          <div className="max-w-9xl mx-auto py-16">
            {/* Heading */}
            <div className="text-center max-w-full mb-16 mt-4">
              <motion.h3
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false }}
                className="text-t-primary font-bold text-lg md:text-2xl leading-tight mb-3"
              >
                {section.category}
              </motion.h3>
              
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false }}
                className="text-2xl md:text-4xl font-bold text-t-secondary mb-6 leading-tight"
              >
                {section.headline}{" "}
                <span className="text-t-primary">
                  {section.span}
                </span>
              </motion.h2>

              <p className="text-t-secondary dark:text-t-primary text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                {section.description}
              </p>
            </div>

            {/* Features Grid */}
            <div className="flex flex-wrap justify-center items-stretch gap-6 mb-16">
              {section.features.map((feature, idx) => {
                // Ensure icon mapping works regardless of language JSON
                const iconKey = feature.icon?.trim() as keyof typeof allIcons | undefined;
                const IconComponent = iconKey ? allIcons[iconKey] : null;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white border w-full md:w-72 border-purple-100 rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 group flex flex-col items-start"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#F3E8FF] dark:bg-[#6F1595] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {IconComponent ? (
                        <IconComponent className="w-6 h-6 text-t-secondary dark:text-[#ECD9FA]" />
                      ) : (
                        <span className="text-t-primary text-[10px]">Icon</span>
                      )}
                    </div>
                    <h4 className="text-lg font-bold text-[#402060] mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-t-secondary leading-relaxed">
                      {feature.details}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Section Image */}
            <div className="relative w-full h-[250px] md:h-[450px] overflow-hidden rounded-3xl mb-16 shadow-lg">
              <motion.img
                src={section.image}
                alt={section.category}
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Deliverables & Tech Stack */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-10 border-t border-purple-100/50">
              {/* Deliverables */}
              <motion.div className="flex flex-col gap-4 items-center lg:items-start text-center lg:text-start">
                <span className="text-t-primary font-bold text-sm uppercase tracking-widest">
                  Deliverables:
                </span>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                  {section.deliverables.map((item, i) => (
                    <span
                      key={i}
                      className="px-5 py-2 rounded-full bg-[#EAD5F9] dark:bg-[#6F1595] dark:text-white text-t-secondary text-xs font-medium hover:-translate-y-1 transition-transform cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Tech Stack */}
              <motion.div className="flex flex-col gap-4 items-center lg:items-end text-center lg:text-end">
                <span className="text-t-primary font-bold text-sm uppercase tracking-widest">
                  Tech Stack:
                </span>
                <div className="flex flex-wrap justify-center lg:justify-end gap-2">
                  {section.tech_stack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-5 py-2 rounded-full bg-[#EAD5F9] dark:bg-[#6F1595] dark:text-white text-t-secondary text-xs font-medium hover:-translate-y-1 transition-transform cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ServicesList;