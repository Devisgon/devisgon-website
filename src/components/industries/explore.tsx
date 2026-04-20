import Link from "next/link";
import type { IndustryExploreSection, IndustryPageProps } from "@/types/industries_page";
import IndustryIconBadge from "@/components/industries/icon_badge";

export default function IndustryExplore({ data }: IndustryPageProps<IndustryExploreSection>) {
  return (
    <section className="w-full bg-background px-6 py-14 md:px-12 md:py-20 transition-colors duration-300">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-extrabold text-t-primary md:text-5xl">
          {data.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm font-medium text-t-secondary md:text-base">
          {data.subtitle}
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {data.cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative overflow-hidden rounded-2xl border border-primary bg-bg-secondary p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-btn-primary/50"
            >
              {/* Animated Background Slide - subtle purple tint */}
              <span className="absolute inset-0 origin-left scale-x-0 bg-btn-primary/5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              
              <div className="relative z-10">
                <div className="transition-transform duration-300 group-hover:-translate-y-1">
                  <IndustryIconBadge iconName={card.icon_type} />
                </div>
                
                <h3 className="mt-4 text-2xl font-bold text-t-primary">
                  {card.title}
                </h3>
                
                <p className="mt-2 text-sm leading-relaxed text-t-secondary">
                  {card.description}
                </p>

                {/* Optional: Subtle Arrow indicator that appears on hover */}
                <div className="mt-4 flex items-center text-xs font-bold uppercase tracking-wider text-btn-primary opacity-0 transition-all duration-300 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0">
                  Explore More →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}