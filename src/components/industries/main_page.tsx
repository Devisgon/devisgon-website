import type { IndustryListingData, IndustryPageProps } from "@/types/industries_page";
import IndustriesPageCards from "@/components/industries/page_cards";
import IndustriesCategorySections from "@/components/industries/category_sections";

export default function IndustriesMainPage({ data }: IndustryPageProps<IndustryListingData>) {
  const backgroundStyle = {
    backgroundImage:
      "linear-gradient(145deg, rgba(7,10,22,0.8) 0%, rgba(11,20,39,0.7) 40%, rgba(84,34,130,0.5) 100%), url(/services_page/hero_bg.svg)",
  };

  return (
    <>
      <section
        className="relative w-full min-h-screen overflow-hidden bg-bg-primary bg-cover bg-center bg-no-repeat px-6 pb-16 pt-32 md:px-12"
        style={backgroundStyle}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(117,71,164,0.4),transparent_60%)]" />
        <div className="relative mx-auto mt-20 max-w-6xl">
          <p className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#CFA2F2] shadow-xl backdrop-blur-md">
            {data.hero_section.eyebrow}
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight text-white drop-shadow-2xl md:text-6xl">
            {data.hero_section.title}
          </h1>
          <div className="mt-4 max-w-3xl rounded-xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-lg">
            <p className="text-sm leading-relaxed text-white/80 md:text-base">{data.hero_section.description}</p>
          </div>
        </div>
      </section>

      {data.industry_groups && data.industry_groups.length > 0 ? (
        <IndustriesCategorySections data={data.industry_groups} />
      ) : (
        <IndustriesPageCards data={data.industry_cards} />
      )}
    </>
  );
}
