import Link from "next/link";
import IndustryIconBadge from "@/components/industries/icon_badge";
import type { IndustryListingGroup, IndustryPageProps } from "@/types/industries_page";
import { toSectionAnchor } from "@/lib/section-anchor";

type IndustriesCategorySectionsProps = IndustryPageProps<IndustryListingGroup[]>;

export default function IndustriesCategorySections({ data }: IndustriesCategorySectionsProps) {
  return (
    <>
      {data.map((group, index) => (
        <section
          key={group.title}
          id={group.anchor ?? toSectionAnchor(group.title)}
          className={`w-full scroll-mt-24 px-6 py-14 md:px-12 md:py-20 ${index % 2 === 0 ? "bg-bg-secondary" : "bg-bg-primary"}`}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-10 max-w-4xl pb-6 text-center">
              <h2 className="text-3xl font-extrabold text-t-primary md:text-5xl">{group.title}</h2>
              <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-t-secondary md:text-base">{group.description}</p>
            </div>

            <div className="mx-auto grid max-w-6xl auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
              {group.cards.map((card) => (
                <Link
                  key={`${group.title}-${card.title}`}
                  href={card.href}
                  className="group relative flex min-h-[280px] overflow-hidden rounded-2xl border border-[color:var(--primry)] bg-bg-secondary p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-btn-primary hover:shadow-[0_18px_45px_-30px_var(--btn_primary)]"
                >
                  <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-btn-primary transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                  <div className="relative z-10 flex w-full flex-col items-center justify-center">
                    <IndustryIconBadge iconName={card.icon_type} size={20} />
                    <h3 className="mt-4 text-2xl font-bold text-t-primary transition-colors duration-500 group-hover:text-t-secondary">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-t-secondary transition-colors duration-500 group-hover:text-t-primary">
                      {card.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
