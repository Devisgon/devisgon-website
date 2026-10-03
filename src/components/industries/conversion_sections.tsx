import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Globe2,
  Headset,
  Megaphone,
  PanelsTopLeft,
  Smartphone,
  Workflow,
} from "lucide-react";
import type { IndustryCroUi } from "@/data/industry-cro-ui";
import type { IndustryProofSection } from "@/types/industries_page";

const serviceIcons = [BrainCircuit, Workflow, Globe2, Headset, Bot, PanelsTopLeft, Smartphone, Megaphone];

export function IndustryProofStrip({ copy, data }: { copy: IndustryCroUi; data?: IndustryProofSection }) {
  const metrics = data?.metrics?.length ? data.metrics : copy.metrics;
  const logos = data?.logos?.length ? data.logos : copy.logoSlots.map((name) => ({ name }));

  return (
    <section className="border-b border-primary/20 bg-bg-secondary px-5 py-10 sm:px-8 md:px-12 md:py-12">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#A71A7F]">{copy.proofEyebrow}</p>
          <h2 className="mt-2 text-2xl font-bold text-t-primary md:text-3xl">{copy.proofTitle}</h2>
          <p className="mt-3 max-w-xl text-xs leading-relaxed text-t-secondary">{copy.proofNote}</p>
        </div>
        <div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-primary/15 bg-bg-primary p-3 text-center sm:p-4">
                <p className="text-2xl font-black tracking-tight text-[#A71A7F] sm:text-3xl">{metric.value}</p>
                <p className="mt-1 text-[10px] leading-relaxed text-t-secondary sm:text-xs">{metric.label}</p>
              </div>
            ))}
          </div>
          <p className="mb-2 mt-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-t-secondary">{copy.logosLabel}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {logos.map((logo, index) => (
              <div key={logo.name + index} className="flex min-h-12 items-center justify-center rounded-lg border border-dashed border-primary/25 bg-bg-primary px-3 text-xs font-bold tracking-[0.12em] text-t-secondary">
                {logo.src ? (
                  <Image src={logo.src} alt={logo.name + " logo"} width={140} height={48} className="h-9 w-auto max-w-full object-contain" />
                ) : (
                  logo.name
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function IndustryServiceGrid({ copy }: { copy: IndustryCroUi }) {
  return (
    <section className="bg-bg-primary px-5 py-16 sm:px-8 md:px-12 md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#A71A7F]">{copy.servicesEyebrow}</p>
        <div className="mt-3 grid gap-5 md:grid-cols-[1fr_0.8fr] md:items-end">
          <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-t-primary md:text-5xl">{copy.servicesTitle}</h2>
          <p className="text-sm leading-relaxed text-t-secondary">{copy.servicesIntro}</p>
        </div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {copy.services.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <article key={service.title} className="group rounded-2xl border border-primary/15 bg-bg-secondary p-5 transition duration-300 hover:-translate-y-1 hover:border-[#A71A7F]/50 hover:shadow-xl">
                <Icon aria-hidden="true" className="text-[#A71A7F]" size={24} strokeWidth={1.7} />
                <h3 className="mt-4 text-lg font-bold text-t-primary">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-t-secondary">{service.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function IndustryCalculatorAndProcess({ copy, lang }: { copy: IndustryCroUi; lang: string }) {
  const calculatorHref = lang === "en" ? "/tools/automation-roi" : "/tools/automation-roi?lang=" + encodeURIComponent(lang);
  return (
    <>
      <section id="industry-automation-calculator" className="scroll-mt-24 bg-bg-secondary px-5 py-16 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-3xl border border-primary/15 bg-bg-primary p-6 shadow-sm sm:p-9 md:grid-cols-[1fr_auto] md:items-center md:p-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#A71A7F]">{copy.calculatorEyebrow}</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-t-primary md:text-4xl">{copy.calculatorTitle}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-t-secondary">{copy.calculatorDescription}</p>
          </div>
          <Link href={calculatorHref} className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#40005B] px-6 py-3 text-center text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#A71A7F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A71A7F]">
            {copy.calculatorLink}<ArrowUpRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </section>
      <section className="bg-bg-primary px-5 py-16 sm:px-8 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#A71A7F]">{copy.processEyebrow}</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-t-primary md:text-5xl">{copy.processTitle}</h2>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {copy.processSteps.map((step) => (
              <article key={step.number} className="border-t-2 border-[#A71A7F] pt-5">
                <p className="text-sm font-black tracking-[0.16em] text-[#A71A7F]">{step.number}</p>
                <h3 className="mt-3 text-xl font-bold text-t-primary">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-t-secondary">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-r from-[#40005B] to-[#78106F] px-5 py-14 text-white sm:px-8 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/75">{copy.finalEyebrow}</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">{copy.finalTitle}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/80">{copy.finalDescription}</p>
          </div>
          <a href="#industry-project-brief" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#40005B] transition hover:-translate-y-0.5 hover:bg-[#F5E8F5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            {copy.finalCta}<ArrowUpRight aria-hidden="true" size={17} />
          </a>
        </div>
      </section>
    </>
  );
}
