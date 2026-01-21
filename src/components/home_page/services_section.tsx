"use client";
import { useEffect, useRef } from "react";
import styles from "../animations/ServicesSection.module.css";
import type { ServicesSectionProps } from "@/types/homepage/services";
import { style } from "framer-motion/client";

export default function ServicesSection({ data }: ServicesSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate cards for seamless scroll
  const cards = [...data.services_list, ...data.services_list];

  return (
    <section className="bg-bg-secondary p-10 flex flex-col items-center overflow-hidden">
      {/* Header */}
      <div className="flex flex-col justify-center items-center m-4 px-4 z-10 relative">
        <p className="text-t_secondary text-2xl font-semibold mb-2">
          {data.header_title}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-t-primary max-w-2xl text-center leading-tight">
          {data.main_title}
        </h1>
      </div>

      {/* Infinite Scroll Cards */}
      <div className="relative w-full overflow-hidden mt-8">
        <div className={styles.track} ref={trackRef}>
          {cards.map((card, index) => (
            <div
              key={index}
              className={`${styles.card}   group relative flex-shrink-0 overflow-hidden rounded-2xl shadow-lg`
            }
            >
              <a href={card.link} className="block w-full h-full relative">
                <img
                  src={card.image_alt}
                  alt={card.title}
                  className={`${styles.cardImage} duration-500 group-hover:scale-110`}
                />
                <div className="absolute inset-0 flex flex-col justify-center ml-8 -mb-64 transition-all duration-300">
                  <h3 className="text-5xl font-bold text-white transition-transform duration-300 group-hover:-translate-y-4">
                    {card.title}
                  </h3>
                  <div className="text-white text-3xl font-bold opacity-0 translate-y-8 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-2">
                    <p>Learn more ➜</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}
