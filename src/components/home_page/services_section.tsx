"use client";

import styles from "../animations/ServicesSection.module.css";
import type { ServicesSectionProps } from "@/types/homepage/services";

export default function ServicesSection({ data }: ServicesSectionProps) {
  return (
    <section className="bg-bg-secondary py-12 flex flex-col items-center overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col justify-center items-center m-4 px-4 z-10 relative">
        <p className="text-t_secondary text-2xl font-semibold mb-2">
          {data.header_title}
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-t-primary max-w-2xl text-center leading-tight">
          {data.main_title}
        </h1>
      </div>

      <div className="relative w-full mt-8 overflow-x-auto">
        <div className={styles.cardsWrapper}>
          <div className={styles.track}>
            {data.services_list.map((card, index) => (
              <div
                key={index}
                className={`${styles.card} group relative overflow-hidden rounded-lg shadow-lg`}
              >
                <a href={card.link} className="block w-full h-full relative">
                  <img
                    src={card.image_alt}
                    alt={card.title}
                    className={`${styles.cardImage} duration-500 group-hover:scale-110`}
                  />

                  <div className="absolute inset-0 flex flex-col justify-center p-8 -mb-56 transition-colors duration-300">
                    <h3 className="text-5xl font-bold text-white transition-transform duration-300 group-hover:-translate-y-4">
                      {card.title}
                    </h3>

                    <div className="text-white text-3xl font-bold opacity-0 ml-36 translate-y-8 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-2">
                      <p>Learn more ➜</p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
