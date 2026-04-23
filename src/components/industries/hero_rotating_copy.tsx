"use client";

import { useEffect, useMemo, useState } from "react";
import type { IndustryCarouselCard } from "@/types/industries_page";

const HERO_ROTATE_MS = 3600;

type HeroRotatingCopyProps = {
  slides?: IndustryCarouselCard[];
  titlePrefix: string;
  fallbackTitle: string;
  fallbackDescription: string;
};

export default function IndustryHeroRotatingCopy({
  slides = [],
  titlePrefix,
  fallbackTitle,
  fallbackDescription,
}: HeroRotatingCopyProps) {
  const safeSlides = useMemo(() => slides.slice(0, 5), [slides]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (safeSlides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeSlides.length);
    }, HERO_ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [safeSlides.length]);

  const displaySlides = safeSlides.length > 0 
    ? safeSlides 
    : [{ title: fallbackTitle, description: fallbackDescription }];

  return (
    <div className="flex flex-col items-center justify-center text-center w-full">
    <h1 className="flex flex-row items-center justify-center gap-x-3 text-2xl  font-bold tracking-tight text-white md:text-7xl whitespace-nowrap">
        <span className="opacity-80">{titlePrefix}</span>
        /
        <div className="relative flex items-center justify-center min-w-[120px] md:min-w-[200px] h-[1.2em]">
          {displaySlides.map((slide, index) => (
            <span
              key={index}
              className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]  ${
                index === activeIndex 
                  ? "translate-y-0 opacity-100" 
                  : "pointer-events-none translate-y-4 opacity-0"
              }`}
            >
              {slide.title}
            </span>
          ))}
        </div>
      </h1>

      {/* Description Section with Glassmorphism */}
      <div className="mt-12 md:mt-16 w-full max-w-xl px-4">
        <div className="relative min-h-[80px] md:min-h-[100px] p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl overflow-hidden">
          {displaySlides.map((slide, index) => (
            <p
              key={index}
              className={`absolute inset-0 p-6 flex items-center justify-center text-sm font-medium leading-relaxed text-white/80 transition-all duration-1000 md:text-lg ${
                index === activeIndex 
                  ? "scale-100 opacity-100" 
                  : "pointer-events-none scale-95 opacity-0"
              }`}
            >
              {slide.description}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}