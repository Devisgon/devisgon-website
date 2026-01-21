"use client";

import styles from "../animations/ServicesSection.module.css";
import type { ServicesSectionProps } from "@/types/homepage/services";

export default function ServicesSection({ data }: ServicesSectionProps) {
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

      {/* Carousel */}
      <div className="relative w-full mt-8">
        <div className={styles.track}>
          <div className={styles.maskClip}>
            <div className={styles.marquee}>
              <div className={styles.marqueeGroup}>
               {data.services_list.map((card, index) => (
  <a
    key={index}
    href={card.link}
    className={styles.card}
  >
    <img
      src={card.image_alt}
      alt={card.title}
      className={styles.cardImage}
    />

     <div className={styles.overlay}>
      <h3 className={styles.title}>{card.title}</h3>

      <span className={styles.learnMore}>
        Learn more →
      </span>
    </div>
  </a>
))}

              </div>

              <div className={styles.marqueeGroup}>
                        {data.services_list.map((card, index) => (
  <a
    key={index}
    href={card.link}
    className={styles.card}
  >
    <img
      src={card.image_alt}
      alt={card.title}
      className={styles.cardImage}
    />

     <div className={styles.overlay}>
      <h3 className={styles.title}>{card.title}</h3>

      <span className={styles.learnMore}>
        Learn more →
      </span>
    </div>
  </a>
))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
