import type { IndustryListingData, IndustryPageProps } from "@/types/industries_page";
import IndustriesPageCards from "@/components/industries/page_cards";

export default function IndustriesMainPage({ data }: IndustryPageProps<IndustryListingData>) {
  return (
    <>
      <section className="w-screen md:w-full bg-bg-primary px-6 pb-10 pt-32 md:px-12 md:pb-14 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-t-secondary">
            {data.hero_section.eyebrow}
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight text-t-primary md:text-6xl">
            {data.hero_section.title}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-t-secondary md:text-base">
            {data.hero_section.description}
          </p>
        </div>
      </section>
      <IndustriesPageCards data={data.industry_cards} />
    </>
  );
}
