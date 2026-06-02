import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/footer";
import Header from "@/components/navbar";
import JotformPage from "@/components/others/jotform/jotform_page";
import InternalLinks, { PARTNER_INTERNAL_LINKS } from "@/components/shared/internal_links";
import { getJotformLandingData } from "@/data/loaders/others";
import { getCachedLanguage } from "@/lib/language";
import { getJsonSeoMetadata, JOTFORM_PAGE_METADATA } from "@/lib/seo";

type PageProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const data = getJotformLandingData("en");

  return getJsonSeoMetadata(
    {
      title: "Jotform Online Forms | Devisgon",
      description: data?.landing_page.hero_section.subheadline,
    },
    JOTFORM_PAGE_METADATA,
    "/partners/jotform",
  );
}

export default async function JotformRoute({ searchParams }: PageProps) {
  const query = await searchParams;
  const activeLang = await getCachedLanguage(query.lang);
  const data = getJotformLandingData(activeLang);

  if (!data) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="overflow-x-hidden bg-background">
        <JotformPage data={data} />
        <InternalLinks
          title="Connect Forms to the Wider Website"
          description="Explore related services, technologies, partner pages, industries, and contact options."
          links={PARTNER_INTERNAL_LINKS}
        />
      </main>
      <Footer />
    </>
  );
}
