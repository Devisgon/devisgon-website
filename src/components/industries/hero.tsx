import Link from "next/link";
import type { IndustryHeroSection, IndustryPageProps } from "@/types/industries_page";

export default function IndustryHero({ data }: IndustryPageProps<IndustryHeroSection>) {
  const backgroundStyle = data.background_image
    ? { backgroundImage: `linear-gradient(145deg, rgba(7,10,22,0.8) 0%, rgba(11,20,39,0.7) 40%, rgba(84,34,130,0.5) 100%), url(${data.background_image})` }
    : { backgroundImage: "radial-gradient(circle at 20% 10%, rgba(142,78,198,0.25), rgba(16,20,33,0.95) 35%, rgba(9,13,24,1) 100%)" };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-bg-primary bg-cover bg-center  bg-no-repeat pt-28 pb-16" style={backgroundStyle}>
      <div className="absolute inset-0  bg-[radial-gradient(circle_at_50%_100%,rgba(117,71,164,0.4),transparent_60%)]" />
      <div className="relative mx-auto mt-20  max-w-6xl px-6 md:px-12">
        <p className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#CFA2F2] shadow-xl">
          {data.eyebrow}
        </p>
        <h1 className="max-w-3xl text-3xl font-black leading-tight text-white drop-shadow-2xl md:text-5xl">
          AI for {data.title}
          <span className="block text-[#CFA2F2]">{data.highlight}</span>
        </h1>
        <div className="mt-4 max-w-xl rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg shadow-2xl">
          <p className="text-xs font-medium leading-relaxed text-white/80 md:text-sm">
            {data.description}
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={data.primary_cta.href} className="rounded-lg bg-btn-primary px-6 py-3 text-xs font-bold text-btn-secondary transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(207,162,242,0.3)]">
            {data.primary_cta.text}
          </Link>
          <Link href={data.secondary_cta.href} className="rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-xs font-bold text-white backdrop-blur-md transition-all hover:bg-white/20">
            {data.secondary_cta.text}
          </Link>
        </div>
      </div>
    </section>
  );
}