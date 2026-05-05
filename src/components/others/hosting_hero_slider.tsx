"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { HostingHeroSlide } from "@/types/others_page";

type HostingHeroSliderProps = {
  slides: HostingHeroSlide[];
};

function normalizeHeroHref(href: string) {
  return href === "#compare_plans" ? "#pricing" : href;
}

export default function HostingHeroSlider({ slides }: HostingHeroSliderProps) {
  const usableSlides = useMemo(() => slides.filter((slide) => slide.title?.primary), [slides]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (usableSlides.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % usableSlides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [usableSlides.length]);

  if (usableSlides.length === 0) {
    return null;
  }

  const slide = usableSlides[activeIndex];
  const primaryWords = slide.title.primary.split(" ");

  return (
    <section className="relative min-h-[640px] overflow-hidden bg-bg-secondary px-6 pt-28 md:px-12 md:pt-32">
      {usableSlides.map((item, index) => (
        <div
          key={`${item.slide_id}-${item.title.primary}`}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url('${item.background_image_url ?? "/doctr_hosting/doctor_hosting.webp"}')`,
          }}
        />
      ))}

      <div className="relative mx-auto flex min-h-[520px] max-w-6xl items-center">
        <div
          key={`${slide.slide_id}-${slide.title.primary}-copy`}
          className="max-w-2xl animate-[pulse_0.9s_ease-in-out_1]"
        >
          <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-btn-primary">
            Doctor Hosting
          </p>
          <h1 className="text-4xl font-black leading-tight text-btn-secondary md:text-7xl">
            <span className="text-btn-primary">{primaryWords[0]}</span>{" "}
            {primaryWords.slice(1).join(" ")}
          </h1>
          <p className="mt-4 max-w-xl text-2xl font-bold leading-snug text-btn-secondary md:text-4xl">
            {slide.title.secondary}
          </p>
          {slide.description ? (
            <p className="mt-4 max-w-xl text-base font-semibold leading-relaxed text-btn-secondary/85">
              {slide.description}
            </p>
          ) : null}
          {slide.primary_button ? (
            <Link
              href={normalizeHeroHref(slide.primary_button.link_url)}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-btn-primary px-6 py-3 text-sm font-black uppercase text-btn-secondary transition hover:opacity-90"
            >
              {slide.primary_button.text}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}

         
        </div>

      </div>
    </section>
  );
}
