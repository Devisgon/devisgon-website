"use client";

import { useEffect, useMemo, useState } from "react";
import type { IndustryCarouselSection, IndustryPageProps } from "@/types/industries_page";

const AUTO_SWAP_MS = 3800;

export default function IndustryCarousel({ data }: IndustryPageProps<IndustryCarouselSection>) {
  const cards = useMemo(() => data.cards.slice(0, 5), [data.cards]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [cards.length]);

  useEffect(() => {
    if (cards.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, AUTO_SWAP_MS);

    return () => window.clearInterval(intervalId);
  }, [cards.length]);

  if (cards.length === 0) {
    return null;
  }

  return (
    <section className="w-screen bg-bg-secondary px-6 py-14 md:w-full md:px-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-t-primary md:text-5xl">{data.title}</h2>
          <p className="mt-3 text-sm font-medium text-t-secondary dark:text-t-primary md:text-base">{data.subtitle}</p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-[color:var(--primry)] bg-bg-primary shadow-sm">
          <div
            className="flex transition-transform w-auto  duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            aria-live="polite"
          >
            {cards.map((card) => (
              <article key={card.title} className="w-full items-center text-center  justify-center shrink-0 px-6 py-10 md:px-12 md:py-14">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-btn-primary">Industry Focus</p>
                <h3 className="mt-3 text-3xl font-bold text-t-primary  md:text-4xl">{card.title}</h3>
                <p className="mt-4  text-sm leading-relaxed text-t-secondary md:text-base">{card.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {cards.map((card, index) => (
            <button
              key={card.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-8 bg-btn-primary" : "w-2.5 bg-btn-primary/35 hover:bg-btn-primary/55"}`}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
