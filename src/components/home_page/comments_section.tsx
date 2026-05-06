"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TestimonialSectionProps } from "@/types/homepage/comments";

const TestimonialSection = ({ data }: TestimonialSectionProps) => {
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [activeIndexInCarousel, setActiveIndexInCarousel] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const cardsPerCarousel = 3;
  const totalCarousels = Math.ceil(data.reviews.length / cardsPerCarousel);

  const getCurrentCarouselCards = () => {
    const startIndex = carouselIndex * cardsPerCarousel;
    const endIndex = Math.min(startIndex + cardsPerCarousel, data.reviews.length);
    return data.reviews.slice(startIndex, endIndex);
  };

  const currentCards = getCurrentCarouselCards();

  // Memoized navigation logic to use inside useEffect
  const handleNext = useCallback(() => {
    setCarouselIndex((prev) => (prev === totalCarousels - 1 ? 0 : prev + 1));
    setActiveIndexInCarousel(1);
  }, [totalCarousels]);

  const handlePrev = useCallback(() => {
    setCarouselIndex((prev) => (prev === 0 ? totalCarousels - 1 : prev - 1));
    setActiveIndexInCarousel(1);
  }, [totalCarousels]);

  // Autoplay Effect
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000); // Change carousel every 5 seconds

    return () => clearInterval(timer);
  }, [handleNext, isPaused]);

  const handleCardClick = (indexInCarousel: number) => {
    setActiveIndexInCarousel(indexInCarousel);
  };

  return (
    <section 
      className="py-16 px-4 md:px-8 lg:px-16 overflow-hidden bg-white dark:bg-background"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="relative mb-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
            <div className="relative z-10 shrink-0">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-t-primary leading-[1.1]">
                What Our <br />
                Client Saying
              </h2>
              {/* Arrow Vectors */}
              <img
                src="/home_page/comments_section/Vector_1.webp"
                alt="arrow"
                className="hidden md:block dark:hidden w-44 ml-90 -mt-35"
                loading="lazy"
              />
              <img
                src="/home_page/comments_section/Vector-removebg-preview.webp"
                alt="arrow"
                className="hidden dark:block w-44 ml-90 bg-transparent -mt-35"
                loading="lazy"
              />
            </div>

            <div className="flex flex-col w-full -mt-12 md:mt-0">
              <p className="lg:hidden text-t-secondary text-sm mb-4">
                {data.subtitle_note}
              </p>
              <p className="hidden lg:block text-t-secondary ml-12 max-w-xl text-xl mb-6">
                {data.subtitle_note}
              </p>

              {/* Navigation Buttons */}
              <div className="flex ml-auto items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full text-[#8145B5] bg-white flex items-center justify-center hover:bg-[#8145B5] hover:text-white transition-colors border border-gray-100 shadow-sm"
                  aria-label="Previous carousel"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full text-[#8145B5] bg-white flex items-center justify-center hover:bg-[#8145B5] hover:text-white transition-colors border border-gray-100 shadow-sm"
                  aria-label="Next carousel"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Container */}
        <div className="flex gap-4 md:gap-6 md:mt-30 pt-18 pb-12 justify-center items-center">
          {currentCards.map((review, indexInCarousel) => {
            const isActive = indexInCarousel === activeIndexInCarousel;

            return (
              <div
                key={`${review.name}-${carouselIndex}-${indexInCarousel}`}
                onClick={() => handleCardClick(indexInCarousel)}
                className={`
                  relative overflow-visible transition-all
                  flex-shrink-0 cursor-pointer rounded-3xl p-6 flex flex-col justify-between
                  duration-700 ease-out
                  ${
                    isActive
                      ? "w-80 sm:w-92 h-68 sm:h-68 sm:scale-110 sm:-translate-y-18 z-20"
                      : "w-72 sm:w-82 h-64 sm:h-72 scale-95 opacity-60"
                  }
                `}
              >
                {isActive && (
                  <div
                    className="absolute -bottom-5 left-0 right-0 h-1/2 -z-20"
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
                      loading="lazy"
                    />

                    <div>
                      <h4 className={`font-bold ${isActive ? "text-lg text-t-primary dark:text-t-secondary md:text-xl" : "text-t-primary md:text-lg dark:text-t-secondary"}`}>
                        {review.name}
                      </h4>
                      <p className="font-medium text-t-primary dark:text-t-primary">
                        {review.role}
                      </p>
                    </div>
                  </div>

                  <p className={`leading-relaxed font-medium ${isActive ? "text-t-secondary dark:text-t-primary md:text-lg" : "text-t-secondary text-sm md:text-base dark:text-t-primary"}`}>
                    &quot;{review.review}&quot;
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalCarousels }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCarouselIndex(index);
                setActiveIndexInCarousel(1);
              }}
              className={`h-2 rounded-full transition-all ${
                index === carouselIndex ? "bg-[#8145B5] w-8" : "bg-gray-300 dark:bg-gray-600 w-2"
              }`}
              aria-label={`Go to carousel ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;