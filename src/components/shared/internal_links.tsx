import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type InternalLinkItem = {
  label: string;
  href: string;
  description?: string;
};

type InternalLinksProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  links: InternalLinkItem[];
};

export const CORE_INTERNAL_LINKS: InternalLinkItem[] = [
  {
    label: "Services",
    href: "/services",
    description: "Explore AI, automation, SaaS, design, cloud, data, and QA services.",
  },
  {
    label: "Industries",
    href: "/industries",
    description: "Find solutions for healthcare, trades, real estate, food, and professional teams.",
  },
  {
    label: "Technologies",
    href: "/technologies",
    description: "See the platforms, frameworks, databases, CRMs, and automation tools we build with.",
  },
  {
    label: "Our Process",
    href: "/our-process",
    description: "Review how discovery, design, development, testing, and delivery connect.",
  },
  {
    label: "Blog",
    href: "/blogs",
    description: "Read practical updates on AI, automation, software delivery, and digital growth.",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Talk with the team about the right next step for your project.",
  },
];

export const SERVICE_INTERNAL_LINKS: InternalLinkItem[] = [
  {
    label: "AI Chatbots",
    href: "/services/ai-chatbot",
    description: "Create conversational systems for support, sales, and knowledge workflows.",
  },
  {
    label: "AI Agents",
    href: "/services/ai-agents",
    description: "Build tool-using agents for controlled business operations.",
  },
  {
    label: "Web Applications",
    href: "/services/web-application-development",
    description: "Ship reliable web platforms, portals, and customer-facing products.",
  },
  {
    label: "Data Analytics",
    href: "/services/data-analytics-dashboard",
    description: "Turn operational data into dashboards, reporting, and business insight.",
  },
  {
    label: "Technologies",
    href: "/technologies",
    description: "Match each service with the right implementation stack.",
  },
  {
    label: "Industries",
    href: "/industries",
    description: "Connect service capabilities to your market and workflow model.",
  },
];

export const INDUSTRY_INTERNAL_LINKS: InternalLinkItem[] = [
  {
    label: "AI Automation",
    href: "/services/ai-powered-automation",
    description: "Automate front-office, back-office, and operational workflows.",
  },
  {
    label: "AI Chatbots",
    href: "/services/ai-chatbot",
    description: "Handle inquiries, bookings, support questions, and lead qualification.",
  },
  {
    label: "CRM Technologies",
    href: "/technologies/gohighlevel",
    description: "Connect industry workflows to CRM and marketing automation systems.",
  },
  {
    label: "Services",
    href: "/services",
    description: "Review the broader services that support industry-specific solutions.",
  },
  {
    label: "Technologies",
    href: "/technologies",
    description: "Explore the stacks behind modern industry platforms.",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Start a conversation about your industry use case.",
  },
];

export const TECHNOLOGY_INTERNAL_LINKS: InternalLinkItem[] = [
  {
    label: "Automation Services",
    href: "/services/ai-powered-automation",
    description: "Turn technology choices into production automation workflows.",
  },
  {
    label: "SaaS Development",
    href: "/services/saas-development",
    description: "Use modern stacks to build scalable products and portals.",
  },
  {
    label: "Data Solutions",
    href: "/services/data-analytics-dashboard",
    description: "Connect technology implementation to reporting and analytics.",
  },
  {
    label: "Industries",
    href: "/industries",
    description: "See where each platform fits across business models.",
  },
  {
    label: "Our Process",
    href: "/our-process",
    description: "Understand how we plan, build, test, and launch implementation work.",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Talk through your technology roadmap with Devisgon.",
  },
];

export const PARTNER_INTERNAL_LINKS: InternalLinkItem[] = [
  {
    label: "Services",
    href: "/services",
    description: "Pair partner platforms with Devisgon implementation support.",
  },
  {
    label: "Technologies",
    href: "/technologies",
    description: "Explore related stacks, CRMs, tools, and automation platforms.",
  },
  {
    label: "Industries",
    href: "/industries",
    description: "See how partner solutions fit real business categories.",
  },
  {
    label: "Jotform",
    href: "/partners/jotform",
    description: "Build forms, workflows, approvals, and data intake systems.",
  },
  {
    label: "DoctorHoster",
    href: "/partners/doctorhoster",
    description: "Find hosting, domains, and web infrastructure options.",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Ask which partner setup fits your project.",
  },
];

const DEFAULT_TITLE = "Keep Exploring Devisgon";
const DEFAULT_DESCRIPTION = "Move between related pages to compare services, industries, technologies, process, and contact options.";

export default function InternalLinks({
  eyebrow = "Internal Links",
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  links,
}: InternalLinksProps) {
  const uniqueLinks = links.filter(
    (link, index, allLinks) => allLinks.findIndex((item) => item.href === link.href) === index,
  );

  return (
    <section className="w-full bg-bg-secondary px-6 py-14 transition-colors duration-300 md:px-12 md:py-18">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-btn-primary">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-extrabold text-t-primary md:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-t-secondary">{description}</p>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {uniqueLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex min-h-28 items-start justify-between gap-4 rounded-lg border border-[color:var(--primry)] bg-bg-primary p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-btn-primary hover:shadow-[0_12px_28px_-22px_var(--btn_primary)]"
            >
              <span>
                <span className="block text-base font-bold text-t-primary transition-colors duration-300 group-hover:text-btn-primary">
                  {link.label}
                </span>
                {link.description ? (
                  <span className="mt-2 block text-sm leading-relaxed text-t-secondary">{link.description}</span>
                ) : null}
              </span>
              <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-btn-primary transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
