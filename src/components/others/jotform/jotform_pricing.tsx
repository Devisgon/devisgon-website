"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown, Sparkles } from "lucide-react";
import type { JotformLandingPageData } from "@/types/others_page";

type JotformPage = JotformLandingPageData["landing_page"];
type JotformCopy = NonNullable<JotformPage["page_copy"]>;

const pricingCopyDefaults = {
  pricing_eyebrow: "Plans",
  pricing_title: "Start simple, scale when the forms get busy",
  pricing_subtitle: "Plan cards use the supplied Jotform data and keep this website's theme colors for dark and light mode.",
  starter_access: "Starter access",
  billed_yearly: "per month, billed yearly",
  popular_label: "Popular",
  pricing_cta: "Start Free",
  form_limits_label: "Form Limits",
  ai_agent_limits_label: "AI Agent Limits",
} satisfies Pick<
  JotformCopy,
  | "pricing_eyebrow"
  | "pricing_title"
  | "pricing_subtitle"
  | "starter_access"
  | "billed_yearly"
  | "popular_label"
  | "pricing_cta"
  | "form_limits_label"
  | "ai_agent_limits_label"
>;

function getPricingCopy(data: JotformPage) {
  return {
    ...pricingCopyDefaults,
    ...data.page_copy,
  };
}

function formatJotformPrice(value: number) {
  return value === 0 ? "Free" : `$${value}`;
}

function JotformPricingHeading({
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

export default function JotformPricing({ data }: { data: JotformPage }) {
  const joinHref = data.hero_section.cta_link;
  const copy = getPricingCopy(data);
  const hasAgentLimits = useMemo(() => data.pricing.some((plan) => plan.agent?.length), [data.pricing]);
  const [openAgentPlan, setOpenAgentPlan] = useState<string | null>(null);

  return (
    <section id="pricing" className="bg-bg-secondary px-6 py-20 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <JotformPricingHeading
          eyebrow={copy.pricing_eyebrow}
          title={copy.pricing_title}
          subtitle={copy.pricing_subtitle}
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {data.pricing.map((plan) => {
            const isAgentOpen = openAgentPlan === plan.plan;

            return (
              <article
                key={plan.plan}
                className={`relative flex min-h-[430px] flex-col rounded-2xl border bg-bg-primary p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  plan.is_popular ? "border-btn-primary ring-2 ring-btn-primary/25" : "border-[color:var(--primry)]"
                }`}
              >
                {plan.is_popular ? (
                  <span className="absolute right-5 top-5 rounded-full bg-btn-primary px-3 py-1 text-[11px] font-black text-btn-secondary">
                    {copy.popular_label}
                  </span>
                ) : null}
                <h3 className="text-xl font-black text-t-primary">{plan.plan}</h3>
                <div className="mt-6">
                  <p className="text-4xl font-black text-btn-primary">{formatJotformPrice(plan.price_yearly)}</p>
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-t-secondary">
                    {plan.price_yearly === 0 ? copy.starter_access : copy.billed_yearly}
                  </p>
                </div>
                <ul className="mt-7 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-xs font-semibold text-t-secondary">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-btn-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {hasAgentLimits && plan.agent?.length ? (
                  <div className="mt-6 overflow-hidden rounded-xl border border-[color:var(--primry)] bg-bg-secondary">
                    <button
                      type="button"
                      aria-expanded={isAgentOpen}
                      onClick={() => setOpenAgentPlan(isAgentOpen ? null : plan.plan)}
                      className="flex min-h-12 w-full items-center justify-between gap-3 px-4 text-left text-xs font-black text-t-primary transition hover:bg-bg-primary"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-btn-primary" />
                        {copy.ai_agent_limits_label}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-t-primary transition duration-300 ${
                          isAgentOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isAgentOpen ? (
                      <ul className="space-y-3 border-t border-[color:var(--primry)] px-4 py-4">
                        {plan.agent.map((feature) => (
                          <li key={feature} className="flex gap-3 text-xs font-semibold text-t-secondary">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-btn-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ) : null}
                <a
                  href={joinHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex min-h-11 items-center justify-center rounded-xl bg-btn-primary px-4 py-3 text-xs font-black text-btn-secondary transition hover:opacity-90"
                >
                  {copy.pricing_cta}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
