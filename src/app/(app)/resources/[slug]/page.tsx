import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
import { planningGuides } from "@/data/planning-guides";
import { getJsonSeoMetadata, HOME_PAGE_METADATA } from "@/lib/seo";
import { getCachedLanguage } from "@/lib/language";
import { localizeContentTree } from "@/lib/content-language";
import LocalizedText from "@/components/localized_text";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return planningGuides.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = planningGuides.find((entry) => entry.slug === slug);
  if (!guide) return {};
  const lang = await getCachedLanguage();
  const seo = await localizeContentTree({ title: `${guide.title} | Devisgon`, description: guide.description }, lang);
  return getJsonSeoMetadata(seo, HOME_PAGE_METADATA, `/resources/${slug}`);
}
export default async function PlanningGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = planningGuides.find((entry) => entry.slug === slug);
  if (!guide) notFound();
  const lang = await getCachedLanguage();
  return <><Header /><LocalizedText lang={lang}><article className="mx-auto max-w-4xl px-6 py-24 text-t-primary"><Link href="/resources" className="underline">All planning guides</Link><h1 className="mt-6 text-4xl font-bold">{guide.title}</h1><p className="mt-4 text-sm text-t-secondary">Devisgon engineering guidance · Published October 2, 2026</p><p className="mt-6 text-lg leading-relaxed text-t-secondary">{guide.intro}</p>{guide.sections.map((section) => <section key={section.title} className="mt-10"><h2 className="text-2xl font-semibold">{section.title}</h2><p className="mt-4 leading-relaxed text-t-secondary">{section.text}</p><ul className="mt-4 list-disc space-y-2 pl-5 text-t-secondary">{section.checks.map((check) => <li key={check}>{check}</li>)}</ul></section>)}<section className="mt-12 rounded-2xl bg-bg-secondary p-6"><h2 className="text-2xl font-semibold">Discuss the next step</h2><p className="mt-4 text-t-secondary">Bring your current tools, representative inputs and priority user journey. We can review fit and the scope of a first release.</p><div className="mt-5 flex flex-wrap gap-5"><Link className="underline" href={guide.service}>Explore the related service</Link><Link className="underline" href="/contact">Discuss your project</Link></div></section></article></LocalizedText><Footer /></>;
}
