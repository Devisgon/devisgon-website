import Link from "next/link";
import type { IndustryListingCard, IndustryPageProps } from "@/types/industries_page";
import IndustryIconBadge from "@/components/industries/icon_badge";

type IndustriesPageCardsProps = IndustryPageProps<IndustryListingCard[]>;

export default function IndustriesPageCards({ data }: IndustriesPageCardsProps) {
  return (
    <section className="w-screen md:w-full bg-bg-secondary px-6 pb-16 pt-10 md:px-12 md:pb-24 md:pt-12">
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
        {data.map((card) => (
          <Link key={card.title} href={card.href} className="border border-[#E2D2EF] bg-bg-secondary/90 p-7 transition hover:bg-[#F7EDFE]">
            <IndustryIconBadge iconName={card.icon_type} />
            <h2 className="mt-4 text-3xl font-extrabold text-t-primary">{card.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-t-secondary dark:text-t-primary">{card.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

