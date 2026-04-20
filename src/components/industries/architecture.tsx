import type { IndustryArchitectureSection, IndustryPageProps } from "@/types/industries_page";
import IndustryIconBadge from "@/components/industries/icon_badge";

export default function IndustryArchitecture({ data }: IndustryPageProps<IndustryArchitectureSection>) {
  return (
    <section
      id={data.id ?? "industry-architecture"}
      className="w-screen md:w-full bg-bg-secondary px-6 py-14 md:px-12 md:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <h2 className="text-3xl font-extrabold leading-tight text-t-primary md:text-5xl">{data.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-t-secondary dark:text-t-primary md:text-base">{data.description}</p>
          <ul className="mt-7 space-y-3">
            {data.bullets.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm font-semibold text-t-primary md:text-base">
                <span className="mt-0.5 inline-block h-5 w-5 rounded-full bg-btn-primary text-center text-xs leading-5 text-btn-secondary">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {data.cards.map((card) => (
            <article
              key={card.title}
              className={`group relative overflow-hidden rounded-2xl border border-[color:var(--primry)] bg-bg-secondary p-6 shadow-sm ${card.featured ? "md:col-span-2" : ""}`}
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

