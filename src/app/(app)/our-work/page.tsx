import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
import { featuredWork, workCategories } from "@/data/featured-work";
import { getDiscoveryCallHref } from "@/lib/discovery-call";
import { getCachedLanguage } from "@/lib/language";
import { localizeContentTree } from "@/lib/content-language";
import LocalizedText from "@/components/localized_text";
import WorkGrid from "@/components/our_work/work_grid";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getCachedLanguage();
  const copy = await localizeContentTree({
    title: "Selected Product & Engineering Work | Devisgon",
    description: "Explore end-to-end product work across websites, web apps, AI, voice agents, mobile, design and cloud deployment.",
    openGraphTitle: "Selected Product & Engineering Work | Devisgon",
    openGraphDescription: "Product engineering, AI capabilities and connected digital experiences.",
  }, lang);
  return { title: copy.title, description: copy.description, alternates: { canonical: "/our-work" }, openGraph: { title: copy.openGraphTitle, description: copy.openGraphDescription, url: "/our-work" } };
}

export default async function OurWork() {
  const lang = await getCachedLanguage();
  const categories = await localizeContentTree(workCategories, lang);
  const projects = featuredWork;
  const labels = await localizeContentTree({ all: "All projects", view: "Explore project", empty: "No projects are listed under this category yet." }, lang);
  return <><Header /><LocalizedText lang={lang}><main id="main-content" className="mx-auto max-w-6xl px-6 pb-20 pt-36 text-t-primary">
    <p className="mb-4 text-xs font-semibold uppercase tracking-widest">Selected work</p>
    <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">Products and digital experiences, built end to end.</h1>
    <p className="mt-6 max-w-2xl text-base leading-8">Explore selected work across product strategy, software, AI, design, deployment and quality assurance.</p>
    <section className="mt-12"><WorkGrid projects={projects} categories={categories} labels={labels} /></section>
    <section className="mt-16"><h2 className="text-3xl font-semibold">What would you like to build?</h2><Link href={getDiscoveryCallHref()} className="mt-6 inline-block rounded-xl bg-[#40005B] px-6 py-4 text-sm font-semibold text-white">Book a discovery call</Link></section>
  </main></LocalizedText><Footer /></>;
}
