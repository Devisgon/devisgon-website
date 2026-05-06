import type { HeroSectionProps } from "@/types/services_page/hero";

const bookMeetingLink =
  process.env.NEXT_PUBLIC_CALENDLY_30_MIN_MEETING || process.env.NEXT_PUBLIC_CALENDLY_15_MIN_MEETING || "/contact";

const HeroSection = ({ data }: HeroSectionProps) => {
  return (
    <section className="relative w-full py-24 px-6 md:px-12 lg:px-20 bg-bg-secondary overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/services_page/hero_bg.webp')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="text-t-primary font-bold text-3xl md:text-7xl mb-4 tracking-tight bg-clip-text dark:text-transparent dark:bg-[linear-gradient(135deg,rgba(109,0,195,0.31)_0%,#D1AFEC_70.71%)]">
          {data.title}
        </h2>

        <h1 className="text-2xl md:text-6xl text-center font-bold mb-6">
          <span className="text-t-secondary bg-clip-text dark:text-transparent dark:bg-[linear-gradient(#8248b5_0%,#8248b5_70.71%)] ">
            {data.subtitle}
          </span>
          <span className="text-t-primary bg-clip-text dark:text-transparent dark:bg-[linear-gradient(135deg,#a782c4_0%,#D1AFEC_70.71%)] ">
            {" "}
            {data.span_subtitle}
          </span>
        </h1>

        <p className="text-t-secondary dark:text-t-primary text-center text-base md:text-lg max-w-2xl mb-10 leading-relaxed font-medium">
          {data.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {data.buttons.map((btn, index) => {
            const isPrimaryButton = index === 0;
            const href = isPrimaryButton ? bookMeetingLink : btn.link;
            const text = isPrimaryButton ? "Book a Meeting" : btn.text;

            return (
            <a href={href} key={index}>
              <button className="px-8 py-3.5 rounded-lg text-sm font-semibold duration-300 border-2 dark:border-[#664282] bg-transparent text-t-secondary hover:bg-btn-primary hover:text-white">
                {text}
              </button>
            </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
