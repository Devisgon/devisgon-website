"use client";

import { useEffect, useMemo, useState } from "react";
import type { IndustryCarouselCard } from "@/types/industries_page";

const HERO_ROTATE_MS = 3600;

type HeroRotatingCopyProps = {
  slides?: IndustryCarouselCard[];
  fallbackTitle: string;
};

export default function IndustryHeroRotatingCopy({
  slides = [],
  fallbackTitle,
}: HeroRotatingCopyProps) {
  const displaySlides = useMemo(
    () => (slides.length > 0 ? slides.slice(0, 5) : [{ title: fallbackTitle, description: "" }]),
    [fallbackTitle, slides],
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
    <div
      aria-hidden="true"
      className="mt-4 grid w-full text-left text-lg font-bold tracking-tight text-[#E7B6E7] sm:text-xl md:text-2xl"
    >
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
  );
}
