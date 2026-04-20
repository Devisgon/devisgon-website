import Link from "next/link";
import type { IndustryListingCard, IndustryPageProps } from "@/types/industries_page";
import IndustryIconBadge from "@/components/industries/icon_badge";

type IndustriesPageCardsProps = IndustryPageProps<IndustryListingCard[]>;

export default function IndustriesPageCards({ data }: IndustriesPageCardsProps) {
  return (
    <section className="w-screen md:w-full bg-bg-secondary px-6 pb-16 pt-10 md:px-12 md:pb-24 md:pt-12">
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
        {data.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group relative overflow-hidden rounded-2xl border border-[color:var(--primry)] bg-bg-secondary p-7 shadow-sm"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-btn-primary/20 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
            <div className="relative z-10">
              <IndustryIconBadge iconName={card.icon_type} />
              <h2 className="mt-4 text-3xl font-extrabold text-t-primary transition-colors duration-500 group-hover:text-t-secondary">
                {card.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-t-secondary transition-colors duration-500 group-hover:text-t-primary">
                {card.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

