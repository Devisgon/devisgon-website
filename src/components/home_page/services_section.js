"use client";

import styles from "../animations/ServicesSection.module.css";

export default function ServicesSection({ data }) {
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

      <div className="relative w-full mt-8">
        <div className={styles.cardsWrapper}>
          
          <div className={styles.track}>
            {data.services_list.map((card, index) => (
              <div key={index} className={styles.card}>
                <img
                  src={card.image_alt}
                  alt={card.title}
                  className={styles.cardImage}
                />

                <div className=" w-48 ">
                  <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight drop-shadow-md">
                    {card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}