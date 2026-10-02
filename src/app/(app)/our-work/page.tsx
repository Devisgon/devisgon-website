import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
import { featuredWork } from "@/data/featured-work";
import { getDiscoveryCallHref } from "@/lib/discovery-call";

export const metadata: Metadata = {
  title: "AI Product & Agent Engineering Work | Devisgon",
  description: "Explore selected AI product and agent engineering work: MeMyselfI.ai, Taskera AI and FulixLabs Backend.",
  alternates: { canonical: "/our-work" },
  openGraph: { title: "Selected Engineering Work | Devisgon", description: "AI-powered products, multi-agent assistants and tool orchestration.", url: "/our-work" },
};
export default function OurWork() {
  return <><Header /><main id="main-content" className="mx-auto max-w-6xl px-6 pb-20 pt-36 text-t-primary"><p className="mb-4 text-xs font-semibold uppercase tracking-widest">Selected engineering work</p><h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">AI products, agents and the systems behind them.</h1><p className="mt-6 max-w-2xl text-base leading-8">A selection of projects demonstrating AI product and backend engineering. Explore the scope and discuss how similar capabilities could fit your business.</p><div className="mt-14 space-y-8">{featuredWork.map((project) => <article id={project.slug} key={project.slug} className="scroll-mt-28 rounded-2xl border border-[#D1AFEC] p-7 md:p-10"><p className="text-xs font-semibold uppercase tracking-wide">{project.category}</p><h2 className="mt-3 text-3xl font-semibold">{project.name}</h2><h3 className="mt-4 text-lg font-medium">{project.title}</h3><p className="mt-4 max-w-3xl text-sm leading-7">{project.detail}</p><ul className="mt-6 flex flex-wrap gap-3">{project.focus.map((tag) => <li key={tag} className="rounded-full border border-[#D1AFEC] px-4 py-2 text-xs">{tag}</li>)}</ul><Link href="/contact" className="mt-7 inline-block text-sm font-semibold underline underline-offset-4">Discuss a similar project</Link></article>)}</div><section className="mt-14"><h2 className="text-3xl font-semibold">What would you like to build?</h2><Link href={getDiscoveryCallHref()} className="mt-6 inline-block rounded-xl bg-[#40005B] px-6 py-4 text-sm font-semibold text-white">Book a discovery call</Link></section></main><Footer /></>;
}
