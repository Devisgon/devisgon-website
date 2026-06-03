import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/footer";
import Header from "@/components/navbar";
import DoctorHostingPage from "@/components/others/doctorhosting/doctor_hosting_page";
import { getDoctorHostingData } from "@/data/loaders/others";
import { getCachedLanguage } from "@/lib/language";
import { DOCTORHOSTER_PAGE_METADATA } from "@/lib/seo";

type PageProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

export const metadata: Metadata = DOCTORHOSTER_PAGE_METADATA;
export const dynamic = "force-dynamic";

export default async function DoctorHostingRoute({ searchParams }: PageProps) {
  const query = await searchParams;
  const activeLang = await getCachedLanguage(query.lang);
  const data = getDoctorHostingData(activeLang);

  if (!data) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="overflow-x-hidden bg-background">
        <DoctorHostingPage data={data} />
      </main>
      <Footer />
    </>
  );
}
