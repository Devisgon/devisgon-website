"use client";

import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import type { HeroSectionProps } from "@/types/homepage/hero";

const HeroSection = ({ data }: HeroSectionProps) => {
  return (
    <section
      className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-10 pb-32"  >

  <div className="absolute left-36 top-40 w-24 h-0.5 rounded-full rotate-[48deg]
                  bg-gradient-to-r from-transparent to-[#8E4EC6]" />

  <div className="absolute right-20 top-70 w-24 h-0.5 rounded-full rotate-[135deg]
                  bg-gradient-to-r from-transparent to-[#8E4EC6]" />

  <div className="absolute left-6 top-60 w-24 h-0.5 rounded-full rotate-[48deg] opacity-10
                  bg-gradient-to-r from-transparent to-[#8E4EC6]" />

  <div className="absolute right-8 top-90 w-24 h-0.5 rounded-full rotate-[136deg] opacity-10
                  bg-gradient-to-r from-transparent to-[#8E4EC6]" />

      <div className="relative  container mx-auto px-4 mt-24 flex flex-col  items-center text-center">       
        {/* Pre Title */}
        <div className="inline-block h-8 py-2 px-6 rounded-full
bg-[linear-gradient(90deg,rgba(251,247,254,0.1)_1.25%,rgba(142,78,198,0.1)_14.66%)]
dark:bg-[linear-gradient(89.7deg,rgba(64,32,96,0.4)_1.56%,#402060_23.75%,#402060_50.16%,rgba(64,32,96,0.4)_97.71%)]
           text-sm font-medium tracking-wide
           border-l-1 border-[#ffffff] mb-10
           ">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
             className=" bg-[linear-gradient(90deg,#8E4EC6_8.68%,rgba(142,78,198,0.9)_23.34%,rgba(142,78,198,0.9)_30.29%,#8E4EC6_38.33%)]

  dark:bg-[linear-gradient(135deg,rgba(109,0,195,0.31)_0%,#D1AFEC_70.71%)]
  bg-clip-text
  text-transparent
"

          >
            {data.pre_title}
          </motion.span>
        </div>



        {/* Title */}
  <motion.h1
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, delay: 0.3 }}
  className="text-6xl md:text-6xl lg:text-7xl max-w-5xl
             font-extrabold leading-[1.1] tracking-tight mb-8
 bg-[linear-gradient(89.7deg,rgba(64,32,96,0.4)_1.56%,#402060_23.75%,#402060_50.16%,rgba(64,32,96,0.4)_97.71%)]
           
             bg-clip-text text-transparent
dark:bg-[linear-gradient(135deg,rgba(109,0,195,0.31)_0%,#D1AFEC_70.71%)] ">

{data.main_title}  <br />
{data.sub_main_title}  <br />
  <span className="bg-[linear-gradient(89.7deg,rgba(64,32,96,0.4)_1.56%,#402060_23.75%,#402060_50.16%,rgba(64,32,96,0.4)_97.71%)]

  dark:bg-[linear-gradient(135deg,rgba(109,0,195,0.31)_0%,#D1AFEC_70.71%)]
                   bg-clip-text text-transparent">
                  {data.title}
  </span>
</motion.h1>




        {/* Description */}
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-t-secondary dark:text-[#ECD9FA] text-lg md:text-xl font-medium max-w-2xl mb-12"
        >
          {data.description}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <button className="group relative inline-flex items-center w-52 p-2 overflow-hidden rounded-full bg-t-primary text-white hover:text-[#8E4EC6] dark:text-[#8E4EC6] shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">


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
