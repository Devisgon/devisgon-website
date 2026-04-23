import type { TechnologyWhyUseSection } from "@/types/technologies_page";
import TechnologyIconBadge from "@/components/technologies/icon_badge";

type TechnologyWhyUseProps = {
  data: TechnologyWhyUseSection;
};

export default function TechnologyWhyUse({ data }: TechnologyWhyUseProps) {
  return (
    <section className="w-full bg-bg-secondary px-6 py-14 md:px-12 md:py-20 transition-colors duration-300">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="text-4xl font-black text-t-primary md:text-5xl">{data.title}</h2>
          <div className="mt-4 h-1 w-20 rounded-full bg-btn-primary" />
          <p className="mt-5 text-sm font-semibold text-t-secondary">{data.subtitle}</p>
          <div className="mt-5 space-y-4">
            {data.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-t-secondary md:text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          {data.cards.map((card) => (
            <article key={card.title} className="group rounded-2xl border border-[color:var(--primry)] bg-bg-primary p-6 shadow-sm transition-colors duration-300">
              <TechnologyIconBadge iconName={card.icon_type} />
              <h3 className="mt-4 text-2xl font-bold text-t-primary">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-t-secondary">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
