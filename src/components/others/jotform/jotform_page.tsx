import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CreditCard,
  FileText,
  FormInput,
  HelpCircle,
  MousePointerClick,
  PlugZap,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { JotformLandingPageData } from "@/types/others_page";
import JotformPricing from "./jotform_pricing";

const jotformFeatureIcons = [MousePointerClick, Workflow, CreditCard, FileText, PlugZap, ShieldCheck];
const jotformProductIcons = [FormInput, FileText, Workflow, BarChart3, Sparkles, ShieldCheck];
const bookMeetingLink =
  process.env.NEXT_PUBLIC_CALENDLY_30_MIN_MEETING || process.env.NEXT_PUBLIC_CALENDLY_15_MIN_MEETING || "/contact";

const defaultJotformCopy: NonNullable<JotformLandingPageData["landing_page"]["page_copy"]> = {
  compare_plans: "Compare Plans",
  workspace_label: "Live form workspace",
  hero_chips: ["No-code forms", "Payment-ready", "Company referral"],
  features_eyebrow: "Build like Jotform",
  features_title: "Fast forms with a polished finish",
  features_subtitle: "Use the familiar Jotform flow for forms, payments, automations, and connected business data.",
  pricing_eyebrow: "Plans",
  pricing_title: "Start simple, scale when the forms get busy",
  pricing_subtitle: "Plan cards use the supplied Jotform data and keep this website's theme colors for dark and light mode.",
  starter_access: "Starter access",
  billed_yearly: "per month, billed yearly",
  popular_label: "Popular",
  pricing_cta: "Start Free",
  stats_eyebrow: "Why teams choose it",
  stats_title: "A form platform built for scale",
  products_eyebrow: "Product suite",
  products_title: "More than a form builder",
  products_subtitle: "Collect data, turn it into documents, route approvals, and manage responses from one workspace.",
  templates_eyebrow: "Templates",
  templates_title: "Launch from a ready-made starting point",
  templates_subtitle: "Pick a category, customize the fields, and publish without rebuilding common workflows from scratch.",
  workflow_eyebrow: "Workflow",
  workflow_title: "From intake to action",
  workflow_subtitle: "Use forms as the front door, then route responses to payments, approvals, tables, and connected apps.",
  security_eyebrow: "Security",
  security_title: "Controls for sensitive data collection",
  security_subtitle: "Jotform provides form security features for encrypted collection, privacy controls, and regulated workflows.",
  faq_eyebrow: "FAQ",
  faq_title: "Jotform landing page questions",
  faq_subtitle: "Quick answers before opening the Jotform workspace.",
};

function getJotformCopy(data: JotformLandingPageData["landing_page"]) {
  return {
    ...defaultJotformCopy,
    ...data.page_copy,
    hero_chips: data.page_copy?.hero_chips?.length ? data.page_copy.hero_chips : defaultJotformCopy.hero_chips,
  };
}

function JotformSectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      {eyebrow ? (
        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-btn-primary">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 text-4xl font-black leading-tight text-t-primary md:text-6xl">{title}</h2>
      {subtitle ? <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-relaxed text-t-secondary">{subtitle}</p> : null}
    </div>
  );
}

function JotformJoinButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const isExternal = href.startsWith("http");
  const className =
    variant === "primary"
      ? "bg-btn-primary text-btn-secondary shadow-lg shadow-btn-primary/20 hover:-translate-y-0.5"
      : "border border-[color:var(--primry)] bg-bg-secondary text-t-primary hover:border-btn-primary";

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-black transition duration-300 ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

function JotformHero({ data }: { data: JotformLandingPageData["landing_page"] }) {
  const hero = data.hero_section;
  const copy = getJotformCopy(data);

  return (
    <section className="relative overflow-hidden bg-bg-primary px-6 pt-28 md:px-12 md:pt-32">
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(var(--primry)_1px,transparent_1px),linear-gradient(90deg,var(--primry)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="relative mx-auto grid min-h-[640px] max-w-7xl items-center gap-12 py-14 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--primry)] bg-bg-secondary px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-btn-primary">
            <Sparkles className="h-4 w-4" />
            {data.brand_config.partner_name} x Jotform
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight text-t-primary md:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-sm font-semibold leading-relaxed text-t-secondary md:text-base">
            {hero.subheadline}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <JotformJoinButton href={bookMeetingLink}>Book a Discovery Call</JotformJoinButton>
            <JotformJoinButton href={hero.cta_link} variant="secondary">
              {hero.cta_text}
            </JotformJoinButton>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] border border-[color:var(--primry)] bg-bg-secondary p-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[color:var(--primry)] pb-4">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-btn-primary" />
                <span className="h-3 w-3 rounded-full bg-[color:var(--primry)]" />
                <span className="h-3 w-3 rounded-full bg-t-secondary" />
              </div>
              <span className="rounded-full bg-bg-primary px-3 py-1 text-[11px] font-black text-t-secondary">
                {copy.workspace_label}
              </span>
            </div>
            <div className="grid gap-5 pt-5 md:grid-cols-[0.72fr_1fr]">
              <div className="space-y-3">
                {["Name", "Email", "Service", "Message"].map((label, index) => (
                  <div key={label} className="rounded-2xl border border-[color:var(--primry)] bg-bg-primary p-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.14em] text-t-secondary">{label}</p>
                    <div className={`mt-3 h-3 rounded-full bg-btn-primary/30 ${index === 3 ? "w-4/5" : "w-2/3"}`} />
                  </div>
                ))}
              </div>
              <div className="flex min-h-[350px] items-center justify-center rounded-3xl bg-bg-primary p-5">
                {hero.image?.url ? (
                  <Image
                    src={hero.image.url}
                    alt={hero.image.alt}
                    width={560}
                    height={360}
                    unoptimized
                    className="max-h-[320px] w-full object-contain"
                  />
                ) : (
                  <FormInput className="h-28 w-28 text-btn-primary" />
                )}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 left-6 right-6 grid gap-3 sm:grid-cols-3">
            {copy.hero_chips.map((item) => (
              <div key={item} className="rounded-2xl border border-[color:var(--primry)] bg-bg-primary p-4 shadow-lg">
                <CheckCircle2 className="h-5 w-5 text-btn-primary" />
                <p className="mt-2 text-xs font-black text-t-primary">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function JotformStats({ data }: { data: JotformLandingPageData["landing_page"] }) {
  const copy = getJotformCopy(data);
  const stats = data.stats ?? [];

  if (stats.length === 0) return null;

  return (
    <section className="bg-bg-primary px-6 pb-16 pt-8 md:px-12 md:pb-20">
      <div className="mx-auto max-w-7xl">
        <JotformSectionHeading eyebrow={copy.stats_eyebrow} title={copy.stats_title} />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {stats.map((item) => (
            <article key={item.label} className="rounded-2xl border border-[color:var(--primry)] bg-bg-secondary p-6 shadow-sm">
              <p className="text-4xl font-black text-btn-primary md:text-5xl">{item.value}</p>
              <h3 className="mt-4 text-lg font-black text-t-primary">{item.label}</h3>
              <p className="mt-2 text-xs font-semibold leading-relaxed text-t-secondary">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function JotformFeatures({ data }: { data: JotformLandingPageData["landing_page"] }) {
  const copy = getJotformCopy(data);

  return (
    <section className="bg-bg-secondary px-6 py-20 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <JotformSectionHeading
          eyebrow={copy.features_eyebrow}
          title={copy.features_title}
          subtitle={copy.features_subtitle}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {data.features.map((feature, index) => {
            const Icon = jotformFeatureIcons[index % jotformFeatureIcons.length] ?? FormInput;

            return (
              <article
                key={feature.id}
                className="group rounded-2xl border border-[color:var(--primry)] bg-bg-primary p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-btn-primary hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-btn-primary text-btn-secondary">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-lg font-black text-t-primary">{feature.title}</h3>
                <p className="mt-3 text-xs font-semibold leading-relaxed text-t-secondary">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function JotformProductSuite({ data }: { data: JotformLandingPageData["landing_page"] }) {
  const copy = getJotformCopy(data);
  const products = data.product_suite ?? [];

  if (products.length === 0) return null;

  return (
    <section className="bg-bg-primary px-6 py-20 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <JotformSectionHeading eyebrow={copy.products_eyebrow} title={copy.products_title} subtitle={copy.products_subtitle} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => {
            const Icon = jotformProductIcons[index % jotformProductIcons.length] ?? FormInput;

            return (
              <article key={product.title} className="rounded-2xl border border-[color:var(--primry)] bg-bg-secondary p-6 transition duration-300 hover:-translate-y-1 hover:border-btn-primary">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-btn-primary text-btn-secondary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-black text-t-primary">{product.title}</h3>
                <p className="mt-3 text-xs font-semibold leading-relaxed text-t-secondary">{product.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function JotformTemplateCategories({ data }: { data: JotformLandingPageData["landing_page"] }) {
  const copy = getJotformCopy(data);
  const categories = data.template_categories ?? [];

  if (categories.length === 0) return null;

  return (
    <section className="bg-bg-primary px-6 py-20 md:px-12 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <JotformSectionHeading eyebrow={copy.templates_eyebrow} title={copy.templates_title} subtitle={copy.templates_subtitle} />
        <div className="grid gap-4 sm:grid-cols-2">
          {categories.map((category) => (
            <article key={category.title} className="rounded-2xl border border-[color:var(--primry)] bg-bg-secondary p-5 shadow-sm">
              <h3 className="text-base font-black text-t-primary">{category.title}</h3>
              <p className="mt-2 text-xs font-semibold leading-relaxed text-t-secondary">{category.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function JotformWorkflow({ data }: { data: JotformLandingPageData["landing_page"] }) {
  const copy = getJotformCopy(data);
  const steps = data.workflow_steps ?? [];

  if (steps.length === 0) return null;

  return (
    <section className="bg-bg-secondary px-6 py-20 md:px-12 md:py-24">
      <div className="mx-auto max-w-6xl">
        <JotformSectionHeading eyebrow={copy.workflow_eyebrow} title={copy.workflow_title} subtitle={copy.workflow_subtitle} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="relative rounded-2xl border border-[color:var(--primry)] bg-bg-primary p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-btn-primary text-sm font-black text-btn-secondary">
                {index + 1}
              </span>
              <h3 className="mt-5 text-lg font-black text-t-primary">{step.title}</h3>
              <p className="mt-3 text-xs font-semibold leading-relaxed text-t-secondary">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function JotformSecurity({ data }: { data: JotformLandingPageData["landing_page"] }) {
  const copy = getJotformCopy(data);
  const items = data.security_items ?? [];

  if (items.length === 0) return null;

  return (
    <section className="bg-bg-primary px-6 py-20 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <JotformSectionHeading eyebrow={copy.security_eyebrow} title={copy.security_title} subtitle={copy.security_subtitle} />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article key={item.title} className="rounded-2xl border border-[color:var(--primry)] bg-bg-secondary p-5">
              <ShieldCheck className="h-7 w-7 text-btn-primary" />
              <h3 className="mt-4 text-base font-black text-t-primary">{item.title}</h3>
              <p className="mt-2 text-xs font-semibold leading-relaxed text-t-secondary">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function JotformFaqs({ data }: { data: JotformLandingPageData["landing_page"] }) {
  const copy = getJotformCopy(data);
  const faqs = data.faqs ?? [];

  if (faqs.length === 0) return null;

  return (
    <section className="bg-bg-secondary px-6 py-20 md:px-12 md:py-24">
      <div className="mx-auto max-w-4xl">
        <JotformSectionHeading eyebrow={copy.faq_eyebrow} title={copy.faq_title} subtitle={copy.faq_subtitle} />
        <div className="mt-10 space-y-4">
          {faqs.map((item) => (
            <details key={item.question} className="group rounded-2xl border border-[color:var(--primry)] bg-bg-primary p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-black text-t-primary">
                {item.question}
                <HelpCircle className="h-5 w-5 shrink-0 text-btn-primary transition group-open:rotate-45" />
              </summary>
              <p className="mt-4 text-xs font-semibold leading-relaxed text-t-secondary">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function JotformPage({ data }: { data: JotformLandingPageData }) {
  const page = data.landing_page;

  return (
    <>
      <JotformHero data={page} />
      <JotformStats data={page} />
      <JotformFeatures data={page} />
      <JotformProductSuite data={page} />
      <JotformPricing data={page} />
      <JotformTemplateCategories data={page} />
      <JotformWorkflow data={page} />
      <JotformSecurity data={page} />
      <JotformFaqs data={page} />
    </>
  );
}
