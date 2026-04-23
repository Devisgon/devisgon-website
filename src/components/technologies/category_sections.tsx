import Link from "next/link";
import TechnologyIconBadge from "@/components/technologies/icon_badge";
import type { TechnologyListingGroup } from "@/types/technologies_page";

type TechnologiesCategorySectionsProps = {
  data: TechnologyListingGroup[];
};

export default function TechnologiesCategorySections({ data }: TechnologiesCategorySectionsProps) {
  return (
    <>
      {data.map((group, index) => (
        <section
          key={group.title}
          className={`w-screen md:w-full px-6 py-12 md:px-12 md:py-16 ${index % 2 === 0 ? "bg-bg-secondary" : "bg-bg-primary"}`}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-10 max-w-4xl border-b border-[color:var(--primry)] pb-6 text-center">
              <h2 className="text-3xl font-extrabold text-t-primary md:text-5xl">{group.title}</h2>
              <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-t-secondary md:text-base">{group.description}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {group.cards.map((card) => (
                <Link
                  key={`${group.title}-${card.title}`}
                  href={card.href}
                  className="group relative min-h-[250px] overflow-hidden rounded-2xl border border-[color:var(--primry)] bg-bg-secondary p-7 shadow-sm"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-btn-primary/20 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                  <div className="relative z-10">
                    <TechnologyIconBadge iconName={card.icon_type} size={20} />
                    <h3 className="mt-4 text-2xl font-bold text-t-primary transition-colors duration-500 group-hover:text-t-secondary">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-t-secondary transition-colors duration-500 group-hover:text-t-primary">
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
