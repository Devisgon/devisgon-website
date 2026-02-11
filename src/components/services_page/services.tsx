"use client";
import { motion } from "framer-motion";
import type { ServicesListProps } from "@/types/services_page/services";
import allIcons from "../icons";

const ServicesList = ({ data }: ServicesListProps) => {
  return (
    <>
    <div className="flex flex-col">
      {data.map((section, index) => (
      <section
  key={index}
  className={`
    px-6 md:px-12 lg:px-20 transition-colors duration-300
    ${index % 2 === 0 
      ?  "bg-background"
      : " bg-foreground dark:bg-background"
    }
  `}
>
          <div className="max-w-9xl mx-auto py-8">
            {/* Heading */}
            <div className="text-center max-w-full  mb-16 mt-4">
              < motion.h3
                initial={{ opacity: 0, y: -40 }}
whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
viewport={{ once: false }}
  className="text-t-primary font-bold text-lg md:text-4xl leading-tight mb-3">
                {section.category}
              </motion.h3>
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
viewport={{ once: false }}
 className="text-xl md:text-4xl font-bold text-t-secondary mb-6 leading-tight">
                {section.headline}
                <span className="text-xl md:text-4xl font-bold text-t-primary  mb-6 leading-tight">
                  {section.span}
                </span>
              </motion.h2>
              <p className="text-t-secondary dark:text-t-primary text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                {section.description}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:flex md:flex-row justify-center  items-center gap-6 mb-16">
              {section.features.map((feature, idx) => {
               const iconKey = feature.icon?.trim() as keyof typeof allIcons | undefined;
               const IconComponent = iconKey ? allIcons[iconKey] : null;

                return (
                  <motion.div
                    key={idx}
                      initial={{ opacity: 0, x: -40 }}
whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 , }}
viewport={{ once: false }}
                    className="bg-white border w-full md:w-68  h-56 border-purple-100 rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:shadow-purple-500/10  hover:transform hover:-translate-y-8 duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#F3E8FF] dark:bg-[#6F1595] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {IconComponent ? (
                        <IconComponent className="w-6 h-6 text-t-secondary dark:text-[#ECD9FA]" />
                      ) : (
                        <span className="text-t-primary text-xs">Icon not found</span>
                      )}
                    </div>
                    <h4 className="text-lg font-bold text-[#402060]  mb-2  transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-t-secondary leading-relaxed">{feature.details}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Image */}
            <div className="relative w-full h-[300px] md:h-[300px] overflow-hidden -mt-30 md:mt-12 -mb-30 md:mb-12">
              <motion.img
                src={section.image}
                alt={section.category}
                  initial={{ opacity: 0, scale:0.5 }}
whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
viewport={{ once: true }}
                className="w-full h-full object-fill transform  transition-transform duration-800"
              />
            </div>

            {/* Deliverables & Tech Stack */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pt-10">
              {/* Deliverables */}
              <motion.div
               className="flex flex-col gap-3 items-center">
                <span className="text-t-primary font-bold text-sm uppercase tracking-wide">
                  Deliverables:
                </span>
                <div className="flex flex-wrap justify-center items-center gap-2">
                  {section.deliverables.map((item, i) => (
                    <span
                      key={i}
                      className=" py-1.5 w-39.5 items-center justify-center flex rounded-full bg-[#EAD5F9] dark:text-white dark:bg-[#6F1595] text-t-secondary text-xs hover:-translate-y-2 duration-400 "
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: -40 }}
whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
viewport={{ once: false }}
className="flex flex-col justify-center items-center gap-3 md:items-center">
                <span className="text-t-primary font-bold text-sm uppercase tracking-wide">
                  Tech Stack:
                </span>
                <div className="flex  justify-center items-center gap-2 md:justify-end">
                  {section.tech_stack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-1.5 rounded-full bg-[#EAD5F9] dark:bg-[#6F1595] dark:text-white text-t-secondary text-xs   hover:-translate-y-2 duration-400 "
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
    
    <section></section>

    </>
  );
};

export default ServicesList;