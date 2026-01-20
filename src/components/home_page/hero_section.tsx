"use client";

import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import type { HeroSectionProps } from "@/types/homepage/hero";

const HeroSection = ({ data }: HeroSectionProps) => {
  return (
    <section
      className="relative w-full bg-bg-secondary min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-32"
    >
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
        
        {/* Pre Title */}
        <div className="mb-6">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block h-8 py-2 px-6 rounded-full bg-gradient-to-br from-[#FBF7FE] to-[#d4adf6] text-secondary text-sm font-medium tracking-wide border border-[#e9e3f8]"
          >
            {data.pre_title}
          </motion.span>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-6xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-t-primary mb-8"
        >
          {data.title}
          <br />
          <span className="text-t-primary">{data.main_title}</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-t_secondary text-lg md:text-xl font-medium max-w-2xl mb-12"
        >
          {data.description}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <button className="group relative inline-flex items-center w-52 p-2 overflow-hidden rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            
            <span className="absolute right-0 m-1 rounded-full h-16 w-16 bg-[#EAD5F9] transition-all duration-500 ease-in-out group-hover:w-50" />

            <a href="#about">
              <span className="relative z-10 pl-8 font-medium text-lg transition-colors duration-300 group-hover:text-[#3b2363]">
                {data.cta_button.text}
              </span>
            </a>

            <span className="relative z-10 ml-auto mr-2 h-14 w-14 flex items-center justify-center text-[#3b2363] transition-all duration-500">
              <FaArrowRight />
            </span>
          </button>
        </motion.div>

        {/* Background Image */}
        <motion.img
          src="/home_page/hero_section/hero_bg.svg"
          alt="background"
          className="-mt-10 opacity-100 pointer-events-none select-none"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
