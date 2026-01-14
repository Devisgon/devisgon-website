"use client";

import { useRef, useEffect } from "react";
import styles from "../animations/ServicesSection.module.css";

export default function ServicesSection({ data }) {
  const scrollRef = useRef(null);

  // 1. Triple the data to create the infinite buffer (Left, Middle, Right)
  const originalList = data.services_list || [];
  const infiniteList = [...originalList, ...originalList, ...originalList];

  // CONFIGURATION: Ensure these match your CSS values!
  // .card width = 600px
  // gap = 0.5rem (approx 8px)
  const CARD_WIDTH = 600; 
  const GAP = 8; 
  const ITEM_FULL_WIDTH = CARD_WIDTH + GAP;
  const SINGLE_SET_WIDTH = ITEM_FULL_WIDTH * originalList.length;

  // 2. Initial Setup: Jump to the Middle Set immediately
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = SINGLE_SET_WIDTH;
    }
  }, [SINGLE_SET_WIDTH]);

  // 3. The Teleport Logic
  const handleScroll = () => {
    if (!scrollRef.current) return;

    const scrollLeft = scrollRef.current.scrollLeft;

    // If scrolled past the 2nd set (into the 3rd), jump back to start of 2nd
    if (scrollLeft >= SINGLE_SET_WIDTH * 2) {
      scrollRef.current.scrollLeft = scrollLeft - SINGLE_SET_WIDTH;
    }
    // If scrolled backwards into the 1st set, jump forward to start of 2nd
    else if (scrollLeft <= 0) { // Using roughly 0 or a small buffer
       scrollRef.current.scrollLeft = scrollLeft + SINGLE_SET_WIDTH;
    }
  };

  return (
    <section className="bg-bg-secondary py-12 flex flex-col items-center overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col justify-center items-center m-4 px-4 z-10 relative">
        <p className="text-secondary text-2xl font-semibold mb-2">
          {data.header_title}
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-primary max-w-2xl text-center leading-tight">
          {data.main_title}
        </h1>
      </div>

      <div className="relative w-full mt-8">
        <div className={styles.cardsWrapper}>
          
          {/* Attach Ref and Scroll Handler here */}
          <div 
            className={styles.track} 
            ref={scrollRef} 
            onScroll={handleScroll}
          >
            {infiniteList.map((card, index) => (
              /* Use index in key because IDs are duplicated in the triple list */
              <div key={`${index}-${card.title}`} className={styles.card}>
                <img
                  src={card.image_alt}
                  alt={card.title}
                  className={styles.cardImage}
                />

                <div className="w-48 -top-30 absolute bottom-10 left-10">
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