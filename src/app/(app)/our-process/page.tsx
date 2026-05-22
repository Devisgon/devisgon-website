import type { Metadata } from "next";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
import OurProcessPage from "@/components/proceess/our_process_page";
import type { ProcessPageData } from "@/components/proceess/our_process_page";
import processData from "@/data/english_data/our_process.json";
import { DEFAULT_OPEN_GRAPH_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";

const keywords = [
  ...processData.seo.primaryKeywords,
  ...processData.seo.secondaryKeywords,
];

export const metadata: Metadata = {
  title: processData.seo.metaTitle,
  description: processData.seo.metaDescription,
  keywords,
  alternates: {
    canonical: "/our-process",
  },
  openGraph: {
    title: processData.seo.metaTitle,
    description: processData.seo.metaDescription,
    siteName: SITE_NAME,
    url: `${SITE_URL}/our-process`,
    type: "website",
    images: [DEFAULT_OPEN_GRAPH_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: processData.seo.metaTitle,
    description: processData.seo.metaDescription,
    images: [DEFAULT_OPEN_GRAPH_IMAGE.url],
  },
};

const faqSection = processData.sections.find((section) => section.type === "faq_section");
const faqStructuredData =
  faqSection && "items" in faqSection && Array.isArray(faqSection.items)
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqSection.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

export default function ProcessPage() {
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
      <OurProcessPage data={processData as ProcessPageData} />
      <Footer />
    </>
  );
}
