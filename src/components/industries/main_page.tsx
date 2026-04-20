import type { IndustryListingData, IndustryPageProps } from "@/types/industries_page";
import IndustriesPageHero from "@/components/industries/page_hero";
import IndustriesPageCards from "@/components/industries/page_cards";

export default function IndustriesMainPage({ data }: IndustryPageProps<IndustryListingData>) {
  return (
    <>
      <IndustriesPageHero data={data.hero_section} />
      <IndustriesPageCards data={data.industry_cards} />
    </>
  );
}

