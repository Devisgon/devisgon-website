import type { Metadata } from "next";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
import OurProcessPage from "@/components/proceess/our_process_page";
import type { ProcessPageData } from "@/components/proceess/our_process_page";
import processData from "@/data/english_data/our_process.json";
import { DEFAULT_OPEN_GRAPH_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";
import { getCachedLanguage } from "@/lib/language";
import { localizeContentTree } from "@/lib/content-language";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getCachedLanguage();
  const seo = await localizeContentTree(processData.seo, lang);
  const keywords = [...seo.primaryKeywords, ...seo.secondaryKeywords];
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords,
    alternates: { canonical: "/our-process" },
    openGraph: { title: seo.metaTitle, description: seo.metaDescription, siteName: SITE_NAME, url: `${SITE_URL}/our-process`, type: "website", images: [DEFAULT_OPEN_GRAPH_IMAGE] },
    twitter: { card: "summary_large_image", title: seo.metaTitle, description: seo.metaDescription, images: [DEFAULT_OPEN_GRAPH_IMAGE.url] },
  };
}

export default async function ProcessPage() {
  const lang = await getCachedLanguage();
  const localizedData = await localizeContentTree(processData, lang);
  const faqSection = localizedData.sections.find((section) => section.type === "faq_section");
  const faqStructuredData = faqSection && "items" in faqSection && Array.isArray(faqSection.items)
    ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqSection.items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }
    : null;
  return (
    <>
      <Header />
      {faqStructuredData && (
        <script
          id="our-process-faq-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}
      <OurProcessPage data={localizedData as ProcessPageData} />
      <Footer />
    </>
  );
}
