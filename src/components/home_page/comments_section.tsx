"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TestimonialSectionProps } from "@/types/homepage/comments";
import { motion } from "framer-motion"
const TestimonialSection = ({ data }: TestimonialSectionProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;

    const child = containerRef.current.children[index] as HTMLElement | undefined;
    child?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const handlePrev = () => {
    const newIndex =
      activeIndex === 0 ? data.reviews.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex =
      activeIndex === data.reviews.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
    scrollToIndex(newIndex);
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 overflow-hidden bg-white dark:bg-background sm:overflow-visible">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="relative mb-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between ">
            <div className="relative z-10 shrink-0">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-t-primary leading-[1.1]">
                What Our <br />
                Client Saying
              </h2>
               {/* Light mode */}
{/* Light mode image */}
<img
   src="/home_page/comments_section/Vector_1.svg"

  alt="arrow"
  className="hidden md:block dark:hidden w-44 ml-90 -mt-35"
/>

{/* Dark mode image */}
<img
 src={data.icon}
  alt="arrow"
  className=" hidden dark:block w-44 ml-90 -mt-35"
/>


            </div>

            <div className="flex flex-col w-full   mt-4 lg:mt-0">
              <p className="lg:hidden text-t-secondary text-sm mb-4">
                {data.subtitle_note}
              </p>
              <p className="hidden lg:block text-t-secondary ml-12 max-w-xl text-xl  mb-6">
                {data.subtitle_note}
              </p>

              <div className="flex ml-auto items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full text-[#8145B5] bg-white flex items-center justify-center hover:bg-[#8145B5] hover:text-white transition-colors border border-gray-100 shadow-sm"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full text-[#8145B5] bg-white flex items-center justify-center hover:bg-[#8145B5] hover:text-white transition-colors border border-gray-100 shadow-sm"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={containerRef}
          className={`
            flex gap-4 
           md:mt-30
            pt-18 pb-12 px-4 sm:p-8 
            scroll-smooth
            justify-between
            overflow-x-auto        
            snap-x snap-mandatory 
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] /* Hides scrollbar */
            
            sm:overflow-visible     
            sm:snap-none            
          `}
        >
{data.reviews.map((review, index) => {
  const isActive = index === activeIndex;

  return (
    <div
      key={index}
      onClick={() => {
        setActiveIndex(index);
        scrollToIndex(index);
      }}

      className={`
        snap-center relative overflow-visible
        flex-shrink-0 cursor-pointer rounded-3xl p-6 flex flex-col justify-between
        transition-all duration-700 ease-out
        ${
          isActive
            ? "w-80 sm:w-92 h-68 sm:h-68 sm:scale-110 sm:-translate-y-18 z-20"
            : "w-72 sm:w-82 h-64 sm:h-72 scale-95 opacity-60"
        }
      `}
    >
      {isActive && (
        <motion.div
          layoutId="activeGlow"
className="absolute -bottom-5 left-0 right-0 h-1/2 -z-20"         
 initial={false}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 100,
          }}
          style={{
            background: "#8145B5",
            filter: "blur(100px)",
          }}
        />
      )}


      <div className="absolute inset-0 -z-10 bg-white dark:bg-background rounded-3xl" />


      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="flex items-center gap-2 mb-6">
          <img
            src={review.image}
            alt={review.name}
            className={`rounded-full object-cover border-2 border-white shadow-md ${
              isActive ? "w-16 h-16" : "w-14 h-14"
            }`}
          />

          <div>
            <h4
              className={`font-bold ${
                isActive
                  ? "text-lg text-t-primary dark:text-t-secondary md:text-xl"
                  : "text-t-primary md:text-lg dark:text-t-secondary"
              }`}
            >
              {review.name}
            </h4>
            <p
              className={`font-medium ${
                isActive
                  ? "text-sm text-t-primary dark:text-t-primary"
                  : " text-t-primary dark:text-t-primary"
              }`}
            >
              {review.role}
            </p>
          </div>
        </div>

        <p
          className={`leading-relaxed font-medium ${
            isActive
              ? "text-t-secondary dark:text-t-primary md:text-lg"
              : "text-t-secondary text-sm md:text-base dark:text-t-primary"
          }`}
        >
          "{review.review}"
        </p>
      </div>
    </div>
  );
})}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;