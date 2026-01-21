"use client";
import React from "react";
import { Play } from "lucide-react";
import { HeroSectionProps } from "@/types/sub_services_page/hero";
import { motion, Variants } from "framer-motion";

// --- Animation Variants ---

// 1. Text Content Animation (Staggered Entrance)
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

// 2. Image Animation (Pop in from right)
const imageVariants: Variants = {
  hidden: { opacity: 0, x: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1, 
    transition: { duration: 0.8, ease: "easeOut", delay: 0.4 } 
  },
};

// 3. Background Circle "Breathing" Animation
const circleVariants: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.1, 0.15, 0.1],
    transition: {
      duration: 5,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const { title, subtitle, description, hero_image } = data;

  return (
    <section className="relative w-full min-h-screen bg-bg-secondary overflow-hidden flex items-center justify-center py-30">
      
      {/* --- Decorative Circles (Animated) --- */}
      <motion.div 
        variants={circleVariants}
        animate="animate"
        className="absolute top-1/2 -translate-y-1/2 -left-70 w-[400px] h-[400px] rounded-full border-[60px] border-[#8145B5] opacity-10" 
      />
      <motion.div 
        variants={circleVariants}
        animate="animate"
        transition={{ delay: 1 }} // Offset the breathing for variety
        className="absolute top-1/2 -translate-y-1/2 left-1/2 w-[300px] h-[300px] rounded-full border-[40px] border-[#8145B5] opacity-10" 
      />
      <motion.div 
        variants={circleVariants}
        animate="animate"
        transition={{ delay: 2 }}
        className="absolute top-20 right-16 w-[100px] h-[100px] rounded-full border-[16px] border-[#8145B5] opacity-10" 
      />

      <div className="px-22 relative z-10 flex gap-0.52">
        <div className="flex flex-col lg:flex-row items-center">
          
          {/* --- Left Content --- */}
          <motion.div 
            className="w-full lg:w-2/3 bg-axcend rounded-2xl p-8 md:p-16 lg:pr-32 shadow-sm relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-bold text-t-primary mb-2 tracking-tight">
              {title}
            </motion.h1>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-t-primary/80 mb-6">
              {subtitle}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-t-primary text-lg md:text-xl font-medium mb-10 max-w-lg leading-relaxed">
              {description}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-primary text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-md"
              >
                Start My AI Project
              </motion.button>
              <motion.a 
                href="/contact" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-4 px-8 rounded-xl transition-all inline-block text-center"
              >
                Contact Us
              </motion.a>
            </motion.div>
          </motion.div>

          {/* --- Right Image --- */}
          <motion.div 
            className="w-full lg:w-1/3 z-20"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative mx-auto w-[300px] h-[550px] rounded-2xl overflow-hidden">
              <img
                src={hero_image}
                alt="App Interface"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <div className="flex justify-between">
                  <h3 className="text-white text-3xl font-bold leading-tight">
                    Our Work.<br />Their Words.
                  </h3>
                  <div className="flex gap-1 mt-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                    <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-black rounded-full flex items-center justify-center border border-white/20"
                  >
                    <Play className="text-white w-5 h-5 ml-1" />
                  </motion.button>
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