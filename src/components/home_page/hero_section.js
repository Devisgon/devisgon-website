"use client";

import { FaArrowRight } from "react-icons/fa";
const HeroSection = ({ data }) => {
  return (
    <section
      className="relative w-full bg-bg-secondary min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-32"
      style={{
        backgroundImage: "url('/home_page/hero_section/hero_bg.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom",
      }}
    >
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
        <div className="mb-6">
          <span className="inline-block h-8 py-2 px-6 rounded-full bg-gradient-to-br from-[#FBF7FE]  to-[#d4adf6] text-secondary text-sm font-medium tracking-wide border border-[#e9e3f8]">
            {data.pre_title}
          </span>
        </div>

        <h1 className="text-6xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-primary mb-8">
          {data.title}
          <br />
          <span className="text-primary">{data.main_title}</span>
        </h1>

        <p className="text-secondary text-lg md:text-xl font-medium max-w-2xl mb-12">
          {data.description}
        </p>

        <button className="group relative inline-flex items-center w-52 p-2 overflow-hidden rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <span className="absolute right-0 m-1 rounded-full h-16 w-16 bg-[#EAD5F9] transition-all duration-500 ease-in-out group-hover:w-50" />
          <span className="relative z-10 pl-8 font-medium text-lg transition-colors duration-300 group-hover:text-[#3b2363]">
            {data.cta_button.text}
          </span>
          <span className="relative z-10 ml-auto mr-2 h-14 w-14 flex items-center justify-center text-[#3b2363] transition-all duration-500">
            <FaArrowRight />
          </span>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
