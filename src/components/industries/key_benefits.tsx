import type { IndustryBenefitsSection, IndustryPageProps } from "@/types/industries_page";
import IndustryIconBadge from "@/components/industries/icon_badge";

export default function IndustryKeyBenefits({ data }: IndustryPageProps<IndustryBenefitsSection>) {
  return (
    <section className="w-screen md:w-full bg-bg-secondary px-6 py-14 md:px-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-t-primary md:text-5xl">{data.title}</h2>
          <p className="mt-3 text-sm font-medium text-t-secondary dark:text-t-primary md:text-base">{data.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data.cards.map((card) => (
            <article key={card.title} className="border border-[#E7DAF1] bg-bg-secondary/90 p-6">
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

