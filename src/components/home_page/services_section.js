"use client";

import { useRef } from "react";

export default function ServicesSection({ data }) {

  return (
    <section className="bg-bg-secondary py-12 flex flex-col items-center overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col justify-center items-center m-4 px-4">
        <p className="text-secondary text-2xl font-semibold mb-2">
          {data.header_title}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-primary max-w-2xl text-center leading-tight">
          {data.main_title}
        </h1>
      </div>

      {/* Cards */}
      <div className="relative w-full mt-12">
        <div
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-2 px-6 md:px-12 pb-8 w-full no-scrollbar"
        >
          {data.services_list.map((card, index) => (
            <div
              key={index}
              className="relative flex-none w-[500px] h-[320px] rounded-xl overflow-hidden"
            >
              <img
                src={card.image_alt}
                alt={card.title}
                className=" absolute min-w-[500px] min-h-[320px] object-cover " 
              />


              {/* Text */}
              <div className="absolute bottom-8 max-w-20 left-16 right-4 z-10">
                <h3 className="text-2xl font-bold text-white leading-tight">
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hide Scrollbar */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
