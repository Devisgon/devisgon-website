"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import data from "../../data/home_page.json";

const TestimonialSection = () => {
  const section = data.testimonials_section;
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const handlePrev = () => {
    const newIndex = activeIndex === 0 ? section.reviews.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex === section.reviews.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const scrollToIndex = (index) => {
    if (containerRef.current) {
      const child = containerRef.current.children[index];
      if (child) {
        child.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="relative mb-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="relative z-10 shrink-0">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-[1.1]">
                What Our <br />
                Client Saying
              </h2>
            </div>

            <div className="flex flex-col w-full lg:w-auto mt-4 lg:mt-0">
              <p className="lg:hidden text-secondary text-sm mb-4">
                {section.subtitle_note}
              </p>
              <p className="hidden lg:block text-secondary text-sm md:text-[15px] mb-6">
                {section.subtitle_note}
              </p>

              <div className="flex items-center justify-start lg:justify-end gap-3">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full text-[#8145B5] bg-white flex items-center justify-center hover:bg-[#8145B5] hover:text-white transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full text-[#8145B5] bg-white flex items-center justify-center hover:bg-[#8145B5] hover:text-white transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={containerRef}
          className="flex overflow-x-auto no-scrollbar gap-4 pb-4 scroll-smooth"
        >
          {section.reviews.map((review, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  scrollToIndex(index);
                }}
                className={`
                  flex-shrink-0 cursor-pointer rounded-3xl p-6 md:p-8 flex flex-col justify-between
                  transition-all duration-500 ease-out
                  ${isActive 
                    ? "w-80 md:w-96 bg-white shadow-2xl shadow-[#8145B5] scale-100 z-20 border-transparent" 
                    : "w-72 md:w-80 bg-white scale-95 opacity-60"
                  }
                `}
              >
                <div className="flex items-center gap-4 mb-4 md:mb-6">
                  <img
                    src={review.image}
                    alt={review.name}
                    className={`rounded-full object-cover border-2 border-white shadow-md ${
                      isActive ? "w-16 h-16" : "w-14 h-14"
                    }`}
                  />
                  <div>
                    <h4 className={`font-bold text-primary ${isActive ? "text-lg md:text-xl" : "text-base md:text-lg"}`}>
                      {review.name}
                    </h4>
                    <p className="text-primary text-sm font-medium">{review.role}</p>
                  </div>
                </div>
                <p className={`leading-relaxed font-medium ${isActive ? "text-secondary text-base md:text-lg" : "text-secondary text-sm md:text-base"}`}>
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
