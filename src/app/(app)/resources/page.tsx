import Link from "next/link";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
import { planningGuides } from "@/data/planning-guides";
import { getJsonSeoMetadata, HOME_PAGE_METADATA } from "@/lib/seo";
import { getCachedLanguage } from "@/lib/language";
import LocalizedText from "@/components/localized_text";
import { localizeContentTree } from "@/lib/content-language";

export async function generateMetadata() {
  const lang = await getCachedLanguage();
  const seo = await localizeContentTree({ title: "AI & Automation Planning Guides | Devisgon", description: "Plan an AI agent, AI-powered MVP or business automation project with practical scope, evaluation and launch checklists." }, lang);
  return getJsonSeoMetadata(seo, HOME_PAGE_METADATA, "/resources");
}

export default async function ResourcesPage() {
  const lang = await getCachedLanguage();
  return <><Header /><LocalizedText lang={lang}><section className="mx-auto max-w-6xl px-6 py-24 text-t-primary"><h1 className="text-4xl font-bold">Plan your AI and automation project</h1><p className="mt-5 max-w-3xl text-t-secondary">Practical planning guidance for founders and operations teams. Use these checklists to define requirements and discuss scope; they are not case studies or guarantees of an outcome.</p><div className="mt-10 grid gap-6 md:grid-cols-3">{planningGuides.map((guide) => <Link key={guide.slug} href={`/resources/${guide.slug}`} className="rounded-2xl border border-primary p-6 hover:bg-bg-secondary"><h2 className="text-xl font-semibold">{guide.title}</h2><p className="mt-4 text-t-secondary">{guide.description}</p><span className="mt-5 inline-block underline">Read the checklist</span></Link>)}</div><p className="mt-10"><Link className="underline" href="/tools/automation-roi">Estimate the potential value of an automation</Link></p></section></LocalizedText><Footer /></>;
}
