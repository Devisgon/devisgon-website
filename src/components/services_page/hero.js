import data from "../../data/services_page.json";

const HeroSection = () => {
  const section = data.herosection;

  return (
    <section className="relative w-full py-24 px-6 md:px-12 lg:px-20 bg-[#FBF7FE] overflow-hidden flex items-center justify-center">
      
      {/* Optional: Background Wave Decoration (Placeholder) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200/40 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        
        <h2 className="text-primary font-bold text-3xl md:text-7xl mb-4 tracking-tight">
          {section.title}
        </h2>
        {/* Main Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-[1.15]">
          <span className="text-secondary block md:inline">
            {section.subtitle}
          </span>
          <span className="text-primary block md:inline">
            {section.span_subtitle}
          </span>
        </h1>

        {/* Description */}
        <p className="text-secondary text-base md:text-lg max-w-2xl mb-10 leading-relaxed font-medium">
          {section.description}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {section.buttons.map((btn, index) => (
            <button
              key={index}
              className={`
                px-8 py-3.5 rounded-lg text-sm md:text-base font-semibold transition-all duration-300 shadow-md hover:shadow-lg
                ${btn.action === "primary"
                  ? "bg-[#8B3DFF] text-white hover:bg-[#7a35e0] border border-transparent"
                  : " text-[#2E1045] border border-[#2E1045]/20 hover:border-[#8B3DFF] hover:text-[#8B3DFF] bg-white/50"
                }
              `}
            >
              {btn.text}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HeroSection;