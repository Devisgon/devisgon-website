import type { TechnologyEdgeSection } from "@/types/technologies_page";

type TechnologyCompetitiveEdgeProps = {
  data: TechnologyEdgeSection;
};

export default function TechnologyCompetitiveEdge({ data }: TechnologyCompetitiveEdgeProps) {
  return (
    <section className="w-full bg-bg-secondary px-6 py-14 md:px-12 md:py-20 transition-colors duration-300">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-4xl font-black text-t-primary md:text-5xl">{data.title}</h2>
          <p className="mt-3 text-sm font-semibold text-t-secondary">{data.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.cards.map((card, index) => (
            <article
              key={card.metric}
              className="rounded-2xl border border-[color:var(--primry)] p-6 transition-colors duration-300"
            >
              <p className="text-5xl font-black tracking-tight text-btn-primary">{card.metric}</p>
              <h3 className="mt-3 text-2xl font-bold text-t-primary">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-t-secondary">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
