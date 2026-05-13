import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getIndustryCategoryBySlug, toPublicIndustrySlug } from "@/data/loaders/industries";
import { getCachedLanguage } from "@/lib/language";
import { getIndustrySlugMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

export async function generateMetadata({ params }: { params: Promise<{ segments: string[] }> }): Promise<Metadata> {
  const { segments } = await params;
  const slug = segments?.[segments.length - 1] ?? "industry";
  return getIndustrySlugMetadata(toPublicIndustrySlug(slug));
}

export default async function LegacyIndustryPathPage({ params, searchParams }: PageProps) {
  const { segments } = await params;
  const query = await searchParams;
  const activeLang = await getCachedLanguage(query.lang);

  if (!segments || segments.length !== 2) {
    notFound();
  }

  const [, slug] = segments;
  const publicSlug = toPublicIndustrySlug(slug);
  const category = getIndustryCategoryBySlug(publicSlug);

  if (!category) {
    notFound();
  }

  const langSuffix = activeLang === "en" ? "" : `?lang=${activeLang}`;
  redirect(`/industries/${publicSlug}${langSuffix}`);
}
