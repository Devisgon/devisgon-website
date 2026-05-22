import Image from "next/image";
import {
  CONTACT_US_HREF,
  CONTACT_US_LABEL,
  DISCOVERY_CALL_LABEL,
  discoveryCallHref,
} from "@/lib/cta-links";
import type { TechnologyHeroSection } from "@/types/technologies_page";

type TechnologyHeroProps = {
  data: TechnologyHeroSection;
};

export default function TechnologyHero({ data }: TechnologyHeroProps) {
  return (
    <section className="w-full bg-bg-primary px-6 pb-14 pt-28 md:px-12 md:pb-20 md:pt-32 transition-colors duration-300">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-btn-primary">{data.eyebrow}</p>
          <h1 className="text-4xl font-black leading-tight text-t-primary md:text-6xl">
            {data.title} <span className="text-btn-primary">{data.highlight}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-t-secondary md:text-lg">{data.description}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={discoveryCallHref}
              className="rounded-lg bg-btn-primary px-6 py-3 text-sm font-bold text-btn-secondary transition-colors hover:opacity-90"
            >
              {DISCOVERY_CALL_LABEL}
            </a>
            <a
              href={CONTACT_US_HREF}
              className="rounded-lg border border-[color:var(--primry)] bg-bg-secondary px-6 py-3 text-sm font-bold text-t-primary transition-colors hover:bg-bg-primary"
            >
              {CONTACT_US_LABEL}
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-[color:var(--primry)] bg-bg-secondary shadow-lg">
          <div className="relative h-[280px] w-full md:h-[340px]">
            <Image
              src={data.side_image}
              alt={`${data.highlight} illustration`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
