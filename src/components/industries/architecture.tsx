import type { IndustryArchitectureSection, IndustryPageProps } from "@/types/industries_page";
import IndustryIconBadge from "@/components/industries/icon_badge";

export default function IndustryArchitecture({ data }: IndustryPageProps<IndustryArchitectureSection>) {
  return (
    <section
      id={data.id ?? "industry-architecture"}
      className="w-screen md:w-full bg-bg-primary px-6 py-14 md:px-12 md:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <h2 className="text-3xl font-extrabold leading-tight text-t-primary md:text-5xl">{data.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-t-secondary dark:text-t-primary md:text-base">{data.description}</p>
          <ul className="mt-7 space-y-3">
            {data.bullets.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm font-semibold text-t-primary md:text-base">
                <span className="mt-0.5 inline-block h-5 w-5 bg-[#8E4EC6] text-center text-xs leading-5 text-white">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {data.cards.map((card) => (
            <article key={card.title} className={`border border-[#E7DAF1] bg-bg-secondary/90 p-6 ${card.featured ? "md:col-span-2" : ""}`}>
              <IndustryIconBadge iconName={card.icon_type} />
              <h3 className="mt-4 text-2xl font-bold text-t-primary">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-t-secondary dark:text-t-primary">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

