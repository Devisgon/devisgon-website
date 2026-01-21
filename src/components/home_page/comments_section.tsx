"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TestimonialSectionProps } from "@/types/homepage/comments";

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
    <section className="py-16 px-4 md:px-8 lg:px-16 overflow-visible">
      <div className="max-w-7xl mx-auto overflow-visible">
        {/* Header */}
        <div className="relative mb-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="relative z-10 shrink-0">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-t-primary leading-[1.1]">
                What Our <br />
                Client Saying
              </h2>
              <p className="text-primary text-9xl ml-84 -mt-16">↝</p>
            </div>

            <div className="flex flex-col w-full lg:w-auto mt-4 lg:mt-0">
              <p className="lg:hidden text-t-secondary text-sm mb-4">
                {data.subtitle_note}
              </p>
              <p className="hidden lg:block text-t_secondary text-sm md:text-[15px] mb-6">
                {data.subtitle_note}
              </p>

              <div className="flex ml-[85%]  items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full text-[#8145B5] bg-white flex items-center justify-center hover:bg-[#8145B5] hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full text-[#8145B5] bg-white flex items-center justify-center hover:bg-[#8145B5] hover:text-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div
          ref={containerRef}
          className="flex justify-between gap-4 p-8 overflow-visible"
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
                  flex-shrink-0 cursor-pointer rounded-3xl p-6 flex flex-col justify-between
                  transition-all duration-700 ease-out
                  ${
                    isActive
                      ? "w-92 h-68 scale-110 -translate-y-18 z-20 shadow-[0_0_40px_5px_rgb(129,69,181)]"
                      : "w-82 h-72 scale-95 opacity-60 bg-white dark:bg-background"
                  }
                `}
              >
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
                          ? "text-lg text-t-primary md:text-xl"
                          : "text-gray-700 md:text-lg"
                      }`}
                    >
                      {review.name}
                    </h4>
                    <p
                      className={`font-medium ${
                        isActive
                          ? "text-sm text-t-primary"
                          : "text-gray-600"
                      }`}
                    >
                      {review.role}
                    </p>
                  </div>
                </div>

                <p
                  className={`leading-relaxed font-medium ${
                    isActive
                      ? "text-t_secondary md:text-lg"
                      : "text-gray-500 text-sm md:text-base"
                  }`}
                >
                  "{review.review}"
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
