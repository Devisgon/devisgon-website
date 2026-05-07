import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  CloudUpload,
  Gauge,
  Globe2,
  HardDrive,
  HelpCircle,
  LockKeyhole,
  MessageCircle,
  Search,
  ServerCog,
  ShieldCheck,
} from "lucide-react";
import HostingHeroSlider from "@/components/others/hosting_hero_slider";
import type {
  DomainSearchSection,
  HostingCtaSection,
  HostingFaqSection,
  HostingHeroSection,
  HostingPlansSection,
  HostingServiceCard,
  OtherHostingPageData,
  OurServicesSection,
  WhatWeDoSection,
} from "@/types/others_page";

function getSection<T extends { section_id: string }>(
  data: OtherHostingPageData,
  sectionId: T["section_id"],
) {
  return data.find((section) => section.section_id === sectionId) as T | undefined;
}

const serviceIcons = [ShieldCheck, Gauge, BarChart3, LockKeyhole, MessageCircle, CloudUpload, ServerCog, Globe2];

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p className="text-xs font-black uppercase tracking-[0.24em] text-btn-primary">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 text-3xl font-black text-t-primary md:text-5xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-sm font-semibold leading-relaxed text-t-secondary md:text-base">{subtitle}</p> : null}
    </div>
  );
}

function DomainSearch({ data }: { data: DomainSearchSection }) {
  return (
    <section className="bg-bg-primary px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={data.title} subtitle={data.sub_title} />
        <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 rounded-2xl border border-[color:var(--primry)] bg-bg-secondary p-3 shadow-lg md:flex-row">
          <div className="flex min-h-12 flex-1 items-center gap-3 rounded-xl bg-bg-primary px-4 text-t-secondary">
            <Search className="h-5 w-5" />
            <span className="text-sm font-semibold">{data.placeholder_text}</span>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-btn-primary px-6 py-3 text-sm font-black text-btn-secondary transition hover:opacity-90"
          >
            Search Domain
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.tlds.map((tld) => (
            <article
              key={tld.tld_name}
              className="rounded-2xl border border-[color:var(--primry)] bg-bg-secondary p-6 text-center shadow-sm"
            >
              <p className="text-3xl font-black text-btn-primary">{tld.tld_name}</p>
              <p className="mt-2 text-sm font-bold text-t-secondary">{tld.price}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCards({ sections }: { sections: HostingPlansSection[] }) {
  const plans = sections.flatMap((section) => section.plans);

  return (
    <section id="pricing" className="bg-bg-secondary px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Compare Plans"
          title="Hosting Pricing"
          subtitle="Choose the hosting platform that matches your website, store, or server workload."
        />

        <div className="mt-10 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {plans.map((plan, index) => (
            <article
              key={plan.plan_id}
              className={`relative flex min-h-[430px] flex-col overflow-hidden rounded-xl border border-[color:var(--primry)] bg-bg-primary p-4 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                index === 1 ? "ring-2 ring-btn-primary/40" : ""
              }`}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-btn-primary" />
              <div className="flex min-h-[78px] items-start justify-between gap-2 pt-2">
                <div className="min-w-0">
                  <h3 className="text-base font-black leading-snug text-t-primary">{plan.title}</h3>
                  {plan.duration ? <p className="mt-1 text-xs font-semibold text-t-secondary">{plan.duration}</p> : null}
                </div>
                {plan.badge ? (
                  <span className="shrink-0 rounded-full bg-btn-primary px-2 py-1 text-[9px] font-black uppercase leading-none text-btn-secondary">
                    {plan.badge}
                  </span>
                ) : null}
              </div>

              <div className="mt-3 rounded-xl bg-bg-secondary p-3">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-t-secondary">Starting From</p>
                <p className="mt-1 text-xl font-black leading-tight text-btn-primary">{plan.price ?? "Custom"}</p>
              </div>

              <ul className="mt-4 flex-1 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-xs font-semibold leading-snug text-t-secondary">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-btn-primary text-btn-secondary">
                      <Check className="h-3 w-3" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.primary_button?.link_url ?? "/contact"}
                className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-btn-primary px-4 py-2 text-xs font-black text-btn-secondary transition hover:opacity-90"
              >
                {plan.primary_button?.text ?? "View Plans"}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  card,
  iconIndex,
  dark = false,
}: {
  card: HostingServiceCard;
  iconIndex: number;
  dark?: boolean;
}) {
  const Icon = serviceIcons[iconIndex % serviceIcons.length] ?? HardDrive;

  return (
    <article
      className={`rounded-2xl border border-[color:var(--primry)] p-6 text-center shadow-lg ${
        dark ? "bg-bg-primary/90" : "bg-bg-secondary"
      }`}
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-btn-primary text-btn-secondary">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="mt-5 text-xl font-black text-t-primary">{card.title}</h3>
      <p className="mt-3 text-sm font-medium leading-relaxed text-t-secondary">{card.description}</p>
    </article>
  );
}

function ServiceGrid({
  whatWeDo,
  ourServices,
}: {
  whatWeDo?: WhatWeDoSection;
  ourServices?: OurServicesSection;
}) {
  const whatWeDoCards = whatWeDo?.services ?? [];
  const servicesCards = ourServices?.services_list ?? [];

  return (
    <>
      <section
        className="bg-bg-secondary bg-cover bg-center px-6 py-16 md:px-12 md:py-24"
        style={{ backgroundImage: "url('/doctr_hosting/doctor_hosting_1.webp')" }}
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow={whatWeDo?.main_sub_title}
            title={whatWeDo?.main_title ?? "What We Do"}
            subtitle="Reliability, speed, and security are included in every hosting plan."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {whatWeDoCards.map((card, index) => (
              <ServiceCard key={card.id} card={card} iconIndex={index} dark />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-primary px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading title={ourServices?.main_title ?? "Our Services"} subtitle={ourServices?.main_sub_title} />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {servicesCards.map((card, index) => (
              <ServiceCard key={card.id} card={card} iconIndex={index + 4} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function CtaBand({ data }: { data: HostingCtaSection }) {
  return (
    <section className="bg-btn-primary px-6 py-10 text-btn-secondary md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-black">{data.title}</h2>
          <p className="mt-2 max-w-3xl text-sm font-semibold leading-relaxed">
            {data.description.line1} {data.description.line2}
          </p>
        </div>
        {data.button ? (
          <Link
            href={data.button.link_url}
            className="inline-flex shrink-0 items-center justify-center rounded-lg border border-btn-secondary px-6 py-3 text-sm font-black transition hover:bg-btn-secondary hover:text-btn-primary"
          >
            {data.button.text}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

function FaqSection({ data }: { data: HostingFaqSection }) {
  return (
    <section className="bg-bg-secondary px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title={data.main_title} />
        <div className="mt-10 space-y-4">
          {data.questions.map((item) => (
            <details
              key={item.q_id}
              className="group rounded-2xl border border-[color:var(--primry)] bg-bg-primary p-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-black text-t-primary">
                {item.question}
                <HelpCircle className="h-5 w-5 shrink-0 text-btn-primary transition group-open:rotate-45" />
              </summary>
              <p className="mt-4 text-sm font-medium leading-relaxed text-t-secondary">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function DoctorHostingPage({ data }: { data: OtherHostingPageData }) {
  const hero = getSection<HostingHeroSection>(data, "hero_slider_1");
  const heroSecond = getSection<HostingHeroSection>(data, "hero_slider_2");
  const domain = getSection<DomainSearchSection>(data, "domain_search");
  const hostingPlans = getSection<HostingPlansSection>(data, "hosting_plans");
  const extraPlans = getSection<HostingPlansSection>(data, "extra_hosting_plans");
  const whatWeDo = getSection<WhatWeDoSection>(data, "what_we_do");
  const ourServices = getSection<OurServicesSection>(data, "our_services");
  const cta = getSection<HostingCtaSection>(data, "call_to_action");
  const faqs = getSection<HostingFaqSection>(data, "faqs");

  return (
    <>
      {hero ? <HostingHeroSlider slides={[...hero.slides, ...(heroSecond?.slides ?? [])]} /> : null}
      {domain ? <DomainSearch data={domain} /> : null}
      {hostingPlans || extraPlans ? <PricingCards sections={[hostingPlans, extraPlans].filter(Boolean) as HostingPlansSection[]} /> : null}
      {whatWeDo || ourServices ? <ServiceGrid whatWeDo={whatWeDo} ourServices={ourServices} /> : null}
      {cta ? <CtaBand data={cta} /> : null}
      {faqs ? <FaqSection data={faqs} /> : null}
    </>
  );
}
