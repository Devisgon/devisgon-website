"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { FeaturedWorkProject, WorkCategory, WorkCategoryId } from "@/data/featured-work";

type Props = { projects: FeaturedWorkProject[]; categories: WorkCategory[]; labels: { all: string; view: string; empty: string } };

export default function WorkGrid({ projects, categories, labels }: Props) {
  const [active, setActive] = useState<string>("all");
  const filtered = useMemo(
    () => active === "all" ? projects : projects.filter((project) => project.categoryIds.includes(active as WorkCategoryId)),
    [active, projects],
  );

  return <div>
    <div className="mb-8 flex flex-wrap gap-2" aria-label="Filter projects by service">
      <button type="button" onClick={() => setActive("all")} aria-pressed={active === "all"} className={`rounded-full border px-4 py-2 text-sm transition-colors ${active === "all" ? "border-[#40005B] bg-[#40005B] text-white" : "border-[#D1AFEC] hover:bg-[#F7F0FC]"}`}>{labels.all}</button>
      {categories.map((category) => <button key={category.id} type="button" onClick={() => setActive(category.id)} aria-pressed={active === category.id} className={`rounded-full border px-4 py-2 text-sm transition-colors ${active === category.id ? "border-[#40005B] bg-[#40005B] text-white" : "border-[#D1AFEC] hover:bg-[#F7F0FC]"}`}>{category.label}</button>)}
    </div>
    {filtered.length ? <div className="grid gap-6 md:grid-cols-2">
      {filtered.map((project) => <Link key={project.slug} href={`/our-work/${project.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#D1AFEC] p-7 transition duration-200 hover:-translate-y-1 hover:border-[#40005B] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#40005B] md:p-9">
        {(project.cardImageSrc || project.heroImageSrc) && <div className="relative -mx-7 -mt-7 mb-6 aspect-[2.15/1] overflow-hidden bg-[#15121a] md:-mx-9 md:-mt-9"><Image src={project.cardImageSrc || project.heroImageSrc} alt={`${project.name} project preview`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />{project.logoIconSrc && <><Image src={project.logoIconSrc} alt="" width={38} height={32} className="absolute left-4 top-4 z-10 h-9 w-auto rounded bg-white p-1 object-contain shadow dark:hidden" /><Image src={project.logoIconDarkSrc} alt="" width={38} height={32} className="absolute left-4 top-4 z-10 hidden h-9 w-auto rounded bg-[#101010] p-1 object-contain shadow dark:block" /></>}</div>}
        <div className="flex items-center justify-between gap-4"><span className="text-xs font-semibold uppercase tracking-widest text-t-secondary">Project {project.number}</span><span aria-hidden="true" className="text-xl transition-transform group-hover:translate-x-1">↗</span></div>
        <h2 className="mt-6 flex min-h-10 items-center text-3xl font-semibold tracking-tight">{project.logoSrc ? <><Image src={project.logoSrc} alt={`${project.name} logo`} width={214} height={36} className="h-9 w-auto max-w-full object-contain object-left dark:hidden" /><Image src={project.logoDarkSrc} alt={`${project.name} logo`} width={214} height={36} className="hidden h-9 w-auto max-w-full object-contain object-left dark:block" /></> : project.name}</h2><h3 className="mt-3 text-lg font-medium">{project.title}</h3>
        <p className="mt-4 grow text-sm leading-7 text-t-secondary">{project.detail}</p>
        <ul className="mt-6 flex flex-wrap gap-2">{project.categoryIds.map((id) => <li key={id} className="rounded-full border border-[#D1AFEC] px-3 py-1.5 text-xs">{categories.find((category) => category.id === id)?.label ?? id}</li>)}</ul>
        <span className="mt-7 text-sm font-semibold underline underline-offset-4">{labels.view} {project.name}</span>
      </Link>)}
    </div> : <p className="rounded-xl border border-dashed border-[#D1AFEC] p-8 text-sm text-t-secondary">{labels.empty}</p>}
  </div>;
}
