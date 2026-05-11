import { redirect } from "next/navigation";

type PageProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

export const dynamic = "force-dynamic";

export default async function LegacyDoctorHostingRoute({ searchParams }: PageProps) {
  const query = await searchParams;
  const lang = Array.isArray(query.lang) ? query.lang[0] : query.lang;
  redirect(`/partners/dctr-hosting${lang ? `?lang=${encodeURIComponent(lang)}` : ""}`);
}
