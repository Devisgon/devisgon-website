import { redirect } from "next/navigation";
import { toCanonicalSlug } from "@/lib/slugs";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

export const dynamic = "force-dynamic";

export default async function LegacyWebAndMobileDevelopmentPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const lang = Array.isArray(query.lang) ? query.lang[0] : query.lang;
  redirect(`/services/web-and-mobile-development/${toCanonicalSlug(slug)}${lang ? `?lang=${encodeURIComponent(lang)}` : ""}`);
}
