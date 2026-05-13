import { FaArrowRight } from "react-icons/fa";
import type { HeroSectionProps } from "@/types/homepage/hero";
import Image from "next/image";
import Link from "next/link";


const HeroSection = ({ data }: HeroSectionProps) => {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-y-visible pt-10 pb-32">
      <div className="absolute -left-1 top-44 md:left-72 md:top-36 w-12 md:w-24 h-0.5 rounded-full rotate-[48deg] bg-gradient-to-r from-transparent to-[#8E4EC6] " />

      <div className="absolute -right-2  md:right-50 md:top-70 w-12 md:w-24 h-0.5 rounded-full rotate-[135deg] bg-gradient-to-r from-transparent to-[#8E4EC6]" />

      <div className="absolute left-1 top-60 w-8 md:left-6  md:w-24 h-0.5 rounded-full rotate-[48deg] md:opacity-10 opacity-50 bg-gradient-to-r from-transparent to-[#8E4EC6]" />

      <div className="absolute right-3  md:right-8 md:top-90 md:w-24 w-12 h-0.5 rounded-full rotate-[136deg] md:opacity-10 opacity-50 bg-gradient-to-r from-transparent to-[#8E4EC6]" />

      <div className="relative  container mx-auto px-4 mt-24 flex flex-col  items-center text-center">
        <div className="inline-block h-8 py-2 px-6 rounded-full
bg-[linear-gradient(90deg,rgba(251,247,254,0.1)_1.25%,rgba(142,78,198,0.1)_14.66%)]
dark:bg-[linear-gradient(89.7deg,rgba(64,32,96,0.4)_1.56%,#402060_23.75%,#402060_50.16%,rgba(64,32,96,0.4)_97.71%)]
           text-sm font-medium tracking-wide
           border-l-1 border-[#ffffff] mb-10
           ">
          <span className=" bg-[linear-gradient(90deg,#8E4EC6_8.68%,rgba(142,78,198,0.9)_23.34%,rgba(142,78,198,0.9)_30.29%,#8E4EC6_38.33%)]

  dark:bg-[linear-gradient(135deg,rgba(255, 0, 255, 0.31)_0%,#D1AFEC_70.71%)]
  bg-clip-text
  text-transparent dark:text-white
">
            {data.pre_title}
          </span>
        </div>

        <h1 className="text-3xl md:text-6xl lg:text-7xl max-w-5xl font-extrabold leading-[1.1] tracking-tight mb-8 bg-[linear-gradient(89.7deg,rgba(64,32,96,0.4)_1.56%,#402060_23.75%,#402060_50.16%,rgba(64,32,96,0.4)_97.71%)] bg-clip-text text-transparent dark:bg-[linear-gradient(135deg,rgba(109,0,195,0.31)_0%,#D1AFEC_70.71%)] ">
          {data.main_title} <br />
          {data.sub_main_title} <br />
          <span className="bg-[linear-gradient(89.7deg,rgba(64,32,96,0.4)_1.56%,#402060_23.75%,#402060_50.16%,rgba(64,32,96,0.4)_97.71%)]

  dark:bg-[linear-gradient(135deg,rgba(109,0,195,0.31)_0%,#D1AFEC_70.71%)]
                   bg-clip-text text-transparent">
            {data.title}
          </span>
        </h1>

        <p className="text-t-secondary dark:text-[#ECD9FA] text-lg md:text-xl font-medium max-w-2xl mb-12">
          {data.description}
        </p>

        <div>
          <Link
            href="/contact"
            className="group relative inline-flex items-center w-52 p-2 overflow-hidden rounded-full bg-t-primary text-white hover:text-[#8E4EC6] dark:text-[#8E4EC6] shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <span className="absolute right-0 m-1 rounded-full h-16 w-16 bg-[#EAD5F9] dark:bg-[#47295C] transition-all duration-500 ease-in-out group-hover:w-50" />
            <span className="relative z-10 pl-8 font-medium text-lg transition-colors  group-hover:text-bold group-hover:ml-3 duration-500 group-hover:texl-xl group-hover:text-[#4c386] dark:group-hover:text-[#8E4EC6] ">
              {data.cta_button.text}
            </span>

            <span className="relative z-10 ml-auto mr-2 h-14 w-14 flex items-center justify-center text-[#8E4EC6] group-hover:-ml-5 transition-all duration-900">
              <FaArrowRight className="ml-3" />
            </span>
          </Link>
        </div>

        <div className="absolute  inset-0 -z-10 pointer-events-none select-none">
          <div className="relative w-full h-full translate-y-30 md:translate-y-56" style={{ transformOrigin: "center" }}>
            <Image
              src="/home_page/hero_section/hero_bg.webp"
              alt="bg"
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
