import Link from "next/link";
import IndustryHeroRotatingCopy from "@/components/industries/hero_rotating_copy";
import type {
  IndustryCarouselCard,
  IndustryHeroSection,
  IndustryPageProps,
} from "@/types/industries_page";

type IndustryHeroProps = IndustryPageProps<IndustryHeroSection> & {
  slides?: IndustryCarouselCard[];
};

export default function IndustryHero({ data, slides }: IndustryHeroProps) {
  const backgroundStyle = data.background_image
     ? { backgroundImage: `linear-gradient(145deg, rgba(7,10,22,0.8) 0%, rgba(11,20,39,0.7) 40%, rgba(84,34,130,0.5) 100%), url(${data.background_image})` }
    : { backgroundImage: "radial-gradient(circle at 20% 10%, rgba(142,78,198,0.25), rgba(16,20,33,0.95) 35%, rgba(9,13,24,1) 100%)" };

  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-bg-primary  bg-top-right bg-cover bg-center bg-no-repeat px-6 py-24"
      style={backgroundStyle}
    >

      <div className="relative z-10 flex flex-col items-center w-full max-w-screen">
        {/* Eyebrow badge */}
        <p className="mb-10 inline-flex rounded-full border  border-white/10 bg-white/5 px-5 py-2 text-[10px] md:text-[12px] font-bold uppercase tracking-[0.25em]  shadow-2xl backdrop-blur-xl">
          {data.eyebrow}
        </p>

        {/* The Text Switcher */}
        <IndustryHeroRotatingCopy
          slides={slides}
          titlePrefix=""
          fallbackTitle={data.highlight}
          fallbackDescription={data.description}
        />

        {/* Buttons - Spacing increased to avoid overlap */}
        <div className="mt-12 md:mt-16 flex flex-wrap justify-center gap-6">
          <Link
            href={data.primary_cta.href}
            className="rounded-full bg-btn-primary px-10 py-4 text-sm font-black text-btn-secondary transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(207,162,242,0.4)]"
          >
            {data.primary_cta.text}
          </Link>
          
          <Link
            href={data.secondary_cta.href}
            className="rounded-full border border-white/10 bg-white/5 px-10 py-4 text-sm font-black text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20"
          >
            {data.secondary_cta.text}
          </Link>
        </div>
      </div>
    </section>
  );
}