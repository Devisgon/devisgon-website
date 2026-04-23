import Link from "next/link";
import type { TechnologyListingData } from "@/types/technologies_page";
import TechnologyIconBadge from "@/components/technologies/icon_badge";

type TechnologiesMainPageProps = {
  data: TechnologyListingData;
};

export default function TechnologiesMainPage({ data }: TechnologiesMainPageProps) {
  return (
    <>
      <section className="w-full bg-bg-primary px-6 pb-12 pt-28 md:px-12 md:pb-16 md:pt-32 transition-colors duration-300">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-btn-primary">{data.hero_section.eyebrow}</p>
          <h1 className="text-4xl font-black text-t-primary md:text-6xl">{data.hero_section.title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-t-secondary">{data.hero_section.description}</p>
        </div>
      </section>

      <section className="w-full bg-bg-secondary px-6 pb-16 pt-8 md:px-12 md:pb-24 md:pt-10 transition-colors duration-300">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {data.technology_cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative overflow-hidden rounded-2xl border border-[color:var(--primry)] bg-bg-primary p-7 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-btn-primary hover:shadow-[0_14px_35px_-20px_var(--btn_primary)]"
            >
              <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-btn-primary/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-btn-primary transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />

              <div className="relative z-10">
                <TechnologyIconBadge iconName={card.icon_type} />
                <h2 className="mt-4 text-2xl font-extrabold text-t-primary transition-all duration-300 group-hover:translate-x-1 group-hover:text-btn-primary">
                  {card.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-t-secondary transition-colors duration-300 group-hover:text-t-primary">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
