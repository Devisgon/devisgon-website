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
        <div className="mt-10">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
className="inline-block h-8 py-2 px-6 rounded-full
           bg-gradient-to-tr from-[#F3EBFAFF] to-[#F0E6F7FF]
           text-[#8E4EC6]
           dark:bg-gradient-to-tr dark:from-[#6D00C34F] dark:via-[#D1AFEC] dark:to-[#6D00C34F]
           dark:text-[#40206066]
           text-sm font-medium tracking-wide
           border-l border-[#e9e3f8]"
          >
            {data.pre_title}
          </motion.span>
        </div>

        {/* Title */}
       <motion.h1
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, delay: 0.3 }}
  className="text-6xl md:text-6xl lg:text-7xl
             font-extrabold leading-[1.1] tracking-tight
             mb-8
            bg-gradient-to-br from-[#402060] to-[#402060]

             dark:bg-gradient-to-r dark:from-[#6D00C34F] dark:to-[#D1AFEC]
             bg-clip-text text-transparent"
>
  {data.title}
  <br />
  <span className="bg-gradient-to-r from-[#6D00C34F] to-[#D1AFEC] bg-clip-text text-transparent">
    {data.main_title}
  </span>
</motion.h1>


        {/* Description */}
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-t-secondary text-lg md:text-xl font-medium max-w-2xl mb-12"
        >
          {data.description}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <button className="group relative inline-flex items-center w-52 p-2 overflow-hidden rounded-full bg-t-primary text-white dark:text-[#8E4EC6] shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">


          <span className="absolute right-0 m-1 rounded-full h-16 w-16 bg-[#EAD5F9] dark:bg-[#47295C] transition-all duration-500 ease-in-out group-hover:w-50" />
           <a href="#about"> 
           <span className="relative z-10 pl-8 font-medium text-lg transition-colors duration-300 group-hover:text-bold group-hover:texl-xl group-hover:text-[#4c386] dark:group-hover:text-[#8E4EC6] ">
            {data.cta_button.text}
            </span>
           </a>

          <span className="relative z-10 ml-auto mr-2 h-14 w-14 flex items-center justify-center text-[#8E4EC6] transition-all duration-500">
            <FaArrowRight className="ml-3" />
          </span>
        </button>
        </motion.div>

        {/* Background Image */}
        <motion.img
          src="/home_page/hero_section/hero_bg.svg"
          alt="background"
          className="-mt-24 opacity-100 overflow-hidden  select-none"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
