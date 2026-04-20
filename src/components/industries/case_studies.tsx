import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import type { IndustryCaseStudiesSection, IndustryPageProps } from "@/types/industries_page";

export default function IndustryCaseStudies({ data }: IndustryPageProps<IndustryCaseStudiesSection>) {
  return (
    <section className="w-screen md:w-full bg-bg-primary px-6 py-14 md:px-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 border-b border-[#DFCDEB] pb-6 md:grid-cols-[1.5fr,2fr] md:items-end">
          <h2 className="text-3xl font-extrabold leading-tight text-t-primary md:text-5xl">{data.title}</h2>
          <p className="text-sm font-semibold text-t-secondary dark:text-t-primary md:text-right md:text-base">{data.subtitle}</p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {data.cards.map((item) => (
            <article key={item.title} className="border border-[#E7DAF1] bg-bg-secondary/90 p-7">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-t-secondary">{item.label}</p>
              <h3 className="mt-3 text-3xl font-bold text-t-primary">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-t-secondary dark:text-t-primary">{item.description}</p>
              <Link href={item.href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8E4EC6]">
                {item.cta_text}
                <FaArrowRight size={12} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

