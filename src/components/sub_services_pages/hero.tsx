"use client";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { HeroSectionProps } from "@/types/sub_services_page/hero";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, x: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1, 
    transition: { duration: 0.8, ease: "easeOut", delay: 0.4 } 
  },
};

const circleVariants: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.1, 0.15, 0.1],
    transition: {
      duration: 5,
      ease: "easeInOut",
    },
  },
};

const HeroSection: React.FC<HeroSectionProps> = ({ data } ) => {
  const { title, subtitle, description, hero_image ,buttons = []} = data;
    const [activeBtn, setActiveBtn] = useState<number | null>(null); 
  

  return (
    <section className="relative w-full bg-[radial-gradient(circle_at_0%_0%,rgba(234,213,249,0.4)_0%,rgba(234,213,249,0.4)_100%)] 
dark:bg-[linear-gradient(to_right,#382842_0%,#45394d_100%)]    min-h-screen overflow-hidden flex items-center justify-center py-30">
      <motion.div 
        variants={circleVariants}
        className="absolute top-1/2 -translate-y-1/2 -left-70 w-[400px] h-[400px] rounded-full border-[60px] border-[#8145B5] opacity-10" 
      />
      <motion.div 
        variants={circleVariants}
        animate="animate"
        transition={{ delay: 1 }} 
        className="absolute top-1/2 -translate-y-1/2 left-1/2 w-[300px] h-[300px] rounded-full border-[40px] border-[#8145B5] opacity-10" 
      />
      <motion.div 
        variants={circleVariants}
        animate="animate"
        transition={{ delay: 2 }}
        className="absolute top-20 right-16 w-[100px] h-[100px] rounded-full border-[16px] border-[#8145B5] opacity-10" 
      />

      <div className="px-22 relative z-10 flex gap-0.52 ">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-2 items-center">
          
          {/* --- Left Content --- */}
          <motion.div 
            className="w-full  lg:w-2/3 bg-[#EAD5F9] dark:bg-[#8457AA] rounded-2xl p-8 md:p-16 lg:pr-32 shadow-sm relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-extrabold  mb-2 tracking-tight  bg-[linear-gradient(89.7deg,rgba(64,32,96,0.4)_1.56%,#402060_23.75%,#402060_50.16%,rgba(64,32,96,0.4)_97.71%)]
           
             bg-clip-text text-transparent">
              {title}
            </motion.h1>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold  mb-6  bg-[linear-gradient(89.7deg,rgba(64,32,96,0.4)_1.56%,#402060_23.75%,#402060_50.16%,rgba(64,32,96,0.4)_97.71%)]
           
             bg-clip-text text-transparent">
              {subtitle}
            </motion.h2>
            <motion.p variants={itemVariants} className=" text-lg md:text-xl text-t-secondary dark:text-t-primary font-medium mb-10 max-w-lg leading-relaxed ">
              {description}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col items-center sm:flex-row gap-4">
                      {data.buttons.map((btn, index) => (
                   <a      href={btn.link}            key={index}>

                                 <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              onClick={() => setActiveBtn(index)}
              className={`px-8 py-3.5 rounded-lg text-sm font-semibold duration-300 border-2 border-btn-primary 
                ${activeBtn == index 
                  ? 'bg-btn-primary text-white' 
                  : 'bg-transparent text-t-secondary dark:text-t-primary hover:bg-btn-primary hover:text-white'
                }`}
              >
                     {btn.text}     
         </motion.button></a>
))}
             
            </motion.div>
          </motion.div>
<motion.div
  className="w-full lg:w-1/3 z-20"
  variants={imageVariants}
  initial="hidden"
  animate="visible"
>
  <div className="relative mx-auto w-[300px]  h-[550px]  rounded-2xl overflow-hidden">



  {/* VIDEO */}
  <video
    src={hero_image}
    autoPlay
    muted
    loop
    className="absolute inset-0 w-full h-full object-contain "
  />

  <div
    className="
      absolute bottom-0 left-0 w-full h-[40%]
      bg-gradient-to-t
      from-[#BE93E4]/70
      via-[#BE93E4]/40
      to-transparent
      z-[2]
      pointer-events-none
    "
  />

  {/* CONTENT */}
  <div className="relative z-[3] h-full flex flex-col justify-between p-6 text-white">

    <div className="flex justify-between items-start">
      <div>
        <p className="opacity-50 text-xl md:text-3xl font-semibold">
          Our Work.
        </p>
        <p className="text-2xl md:text-3xl font-bold leading-tight">
          Their Words.
        </p>
      </div>
    </div>

  </div>

 </div>
</motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;


  