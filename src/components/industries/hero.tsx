import Link from "next/link";
import type { IndustryHeroSection, IndustryPageProps } from "@/types/industries_page";

export default function IndustryHero({ data }: IndustryPageProps<IndustryHeroSection>) {
  const backgroundStyle = data.background_image
    ? {
        backgroundImage: `linear-gradient(145deg, rgba(7,10,22,0.9) 0%, rgba(11,20,39,0.82) 40%, rgba(84,34,130,0.7) 100%), url(${data.background_image})`,
      }
    : {
        backgroundImage:
          "radial-gradient(circle at 20% 10%, rgba(142,78,198,0.25), rgba(16,20,33,0.95) 35%, rgba(9,13,24,1) 100%)",
      };

  return (
    <section className="w-screen md:w-full bg-bg-primary pb-12 pt-28 md:pb-20">
      <div className="relative overflow-hidden bg-cover bg-center bg-no-repeat px-6 py-12 md:px-12 md:py-20" style={backgroundStyle}>
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "url('/home_page/hero_section/hero_bg.svg')" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(117,71,164,0.3),transparent_58%)]" />

        <div className="relative mx-auto max-w-6xl">
          <p className="mb-4 inline-flex bg-[#8E4EC62A] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#CFA2F2]">
            {data.eyebrow}
          </p>
          <h1 className="max-w-2xl text-4xl font-black leading-none text-[#E8D8F8] md:text-7xl">
            {data.title}
            <span className="block text-[#A968E9]">{data.highlight}</span>
          </h1>
          <p className="mt-5 max-w-xl bg-[#FEFCFEE0] p-4 text-sm font-medium leading-relaxed text-t-primary md:text-base">
            {data.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={data.primary_cta.href}
              className="bg-btn-primary px-5 py-3 text-sm font-semibold text-btn-secondary transition hover:opacity-90"
            >
              {data.primary_cta.text}
            </Link>
            <Link
              href={data.secondary_cta.href}
              className="bg-bg-secondary px-5 py-3 text-sm font-semibold text-t-secondary transition hover:bg-[#F2E4FC]"
            >
              {data.secondary_cta.text}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

