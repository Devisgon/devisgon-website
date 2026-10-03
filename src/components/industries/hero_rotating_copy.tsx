"use client";

import { useEffect, useMemo, useState } from "react";
import type { IndustryCarouselCard } from "@/types/industries_page";

const HERO_ROTATE_MS = 3600;

type HeroRotatingCopyProps = {
  slides?: IndustryCarouselCard[];
  fallbackTitle: string;
  fallbackDescription: string;
};

export default function IndustryHeroRotatingCopy({
  slides = [],
  fallbackTitle,
  fallbackDescription,
}: HeroRotatingCopyProps) {
  const displaySlides = useMemo(
    () =>
      slides.length > 0
        ? slides.slice(0, 5)
        : [{ title: fallbackTitle, description: fallbackDescription }],
    [fallbackDescription, fallbackTitle, slides],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (
      displaySlides.length <= 1 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % displaySlides.length);
    }, HERO_ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [displaySlides.length]);

  return (
    <div aria-hidden="true" className="mt-4 w-full text-left">
      <div className="grid w-full text-left text-lg font-bold tracking-tight text-[#E7B6E7] sm:text-xl md:text-2xl">
        {displaySlides.map((slide, index) => (
          <span
            key={slide.title + index}
            className={
              "col-start-1 row-start-1 w-full text-left transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none " +
              (index === activeIndex
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-2 opacity-0")
            }
          >
            {slide.title}
          </span>
        ))}
      </div>

      <div className="relative mt-5 grid w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-md">
        {displaySlides.map((slide, index) => (
          <p
            key={slide.title + index}
            className={
              "col-start-1 row-start-1 flex min-h-[88px] items-center justify-center p-5 text-center text-sm font-medium leading-relaxed text-white/80 transition-all duration-700 motion-reduce:transition-none md:min-h-[100px] md:p-6 md:text-base " +
              (index === activeIndex
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-2 opacity-0")
            }
          >
            {slide.description}
          </p>
        ))}
      </div>
    </div>
  );
}
