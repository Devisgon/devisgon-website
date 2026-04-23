import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getCachedLanguage } from "@/lib/language";
import { getIndustrySlugMetadata } from "@/lib/seo";
import { getIndustryCategoryBySlug } from "@/data/loaders/industries";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return getIndustrySlugMetadata(slug);
}

export default async function LegacyIndustrySlugPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const activeLang = await getCachedLanguage(query.lang);

  const category = getIndustryCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const langSuffix = activeLang === "en" ? "" : `?lang=${activeLang}`;
  redirect(`/industries/${category}/${slug}${langSuffix}`);
}
