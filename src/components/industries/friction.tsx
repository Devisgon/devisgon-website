import type { IndustryFrictionSection, IndustryPageProps } from "@/types/industries_page";
import IndustryIconBadge from "@/components/industries/icon_badge";

export default function IndustryFriction({ data }: IndustryPageProps<IndustryFrictionSection>) {
  return (
    <section className="w-screen md:w-full bg-bg-primary px-6 py-14 md:px-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-extrabold text-t-primary md:text-5xl">{data.title}</h2>
        <p className="mt-2 max-w-2xl text-sm font-medium text-t-secondary dark:text-t-primary md:text-base">
          {data.subtitle}
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {data.cards.map((card) => (
            <article
              key={card.title}
              className="group relative overflow-hidden rounded-2xl border border-[color:var(--primry)] bg-bg-secondary p-6 shadow-sm"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-btn-primary/20 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              <div className="relative z-10">
                <IndustryIconBadge iconName={card.icon_type} />
                <h3 className="mt-4 text-2xl font-bold text-t-primary transition-colors duration-500 group-hover:text-t-secondary">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-t-secondary transition-colors duration-500 group-hover:text-t-primary">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

