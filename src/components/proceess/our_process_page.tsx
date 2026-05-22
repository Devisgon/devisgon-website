import Link from "next/link";
import {
  AppWindow,
  ArrowRight,
  Bot,
  Briefcase,
  Check,
  CheckCircle,
  ClipboardList,
  Cloud,
  Code,
  Eye,
  FlaskConical,
  GitBranch,
  Layers,
  Lightbulb,
  MessageSquare,
  Phone,
  Rocket,
  Settings,
  ShieldCheck,
  Smartphone,
  Target,
  Users,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
type CardItem = {
  title: string;
  description: string;
  icon: string;
};

type HeroSection = {
  id: string;
  type: "hero_section";
  label: string;
  heading: string;
  description: string;
  primaryButton: {
    text: string;
    url: string;
  };
  secondaryButton: {
    text: string;
    url: string;
  };
  visual: {
    text: string;
  };
};

type CardSection = {
  id: string;
  type: "intro_trust_section" | "value_cards_section" | "services_grid_section";
  heading: string;
  description: string;
  cards: CardItem[];
};

type TimelineSection = {
  id: string;
  type: "timeline_section";
  heading: string;
  description: string;
  steps: Array<{
    step: string;
    title: string;
    description: string;
    keyPoints: string[];
    icon: string;
  }>;
};

type CtaSection = {
  id: string;
  type: "call_to_action_section";
  heading: string;
  description: string;
  primaryButton: {
    text: string;
    url: string;
  };
  secondaryButton: {
    text: string;
    url: string;
  };
};

type FaqSection = {
  id: string;
  type: "faq_section";
  heading: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
};

type ProcessSection = HeroSection | CardSection | TimelineSection | CtaSection | FaqSection;

export type ProcessPageData = {
  sections: ProcessSection[];
};

const iconMap: Record<string, LucideIcon> = {
  ai: Bot,
  automation: Workflow,
  briefcase: Briefcase,
  business: Briefcase,
  "check-circle": CheckCircle,
  "cloud-software": Cloud,
  cloud: Cloud,
  code: Code,
  eye: Eye,
  flowchart: GitBranch,
  interview: MessageSquare,
  layers: Layers,
  mobile: Smartphone,
  phone: Phone,
  planning: ClipboardList,
  prototype: FlaskConical,
  rocket: Rocket,
  scalability: Layers,
  settings: Settings,
  "shield-check": ShieldCheck,
  startup: Lightbulb,
  target: Target,
  users: Users,
  "web-app": AppWindow,
};

const getSection = <T extends ProcessSection["type"]>(data: ProcessPageData, type: T) =>
  data.sections.find((section): section is Extract<ProcessSection, { type: T }> => section.type === type);

const getIcon = (name: string) => iconMap[name] ?? CheckCircle;

const ButtonLink = ({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) => {
  const className =
    variant === "primary"
      ? "inline-flex h-12 items-center justify-center rounded-lg bg-btn-primary px-6 text-sm font-semibold text-white shadow-lg shadow-purple-900/15 transition hover:-translate-y-0.5 hover:bg-[#6F1595]"
      : "inline-flex h-12 items-center justify-center rounded-lg border border-[color:var(--primry)] bg-white/70 px-6 text-sm font-semibold text-t-primary transition hover:-translate-y-0.5 hover:border-btn-primary hover:text-btn-primary dark:bg-white/5";

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
};

const SectionHeading = ({ heading, description }: { heading: string; description?: string }) => (
  <div className="mx-auto mb-12 max-w-3xl text-center">
    <h2 className="text-3xl font-bold leading-tight text-t-primary md:text-4xl">{heading}</h2>
    {description && <p className="mt-4 text-base leading-7 text-t-secondary md:text-lg">{description}</p>}
  </div>
);

const Hero = ({ section }: { section: HeroSection }) => {
  const visualSteps = section.visual.text.split("→").map((step) => step.trim());

  return (
    <section className="relative overflow-hidden bg-bg-primary px-6 pb-20 pt-32 md:px-12">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.75),rgba(234,213,249,0.42),rgba(248,250,252,0.7))] dark:bg-[linear-gradient(135deg,rgba(24,17,27,0.85),rgba(48,28,59,0.76),rgba(15,23,42,0.82))]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.92fr]">
        <div>
          <p className="inline-flex rounded-full border border-[color:var(--primry)] bg-bg-secondary px-4 py-2 text-sm font-semibold text-btn-primary">
            {section.label}
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight text-t-primary md:text-6xl">
            {section.heading}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-t-secondary md:text-lg">{section.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={section.primaryButton.url}>{section.primaryButton.text}</ButtonLink>
            <ButtonLink href={section.secondaryButton.url} variant="secondary">
              {section.secondaryButton.text}
            </ButtonLink>
          </div>
        </div>

        <div className="relative rounded-2xl border border-[color:var(--primry)] bg-bg-secondary p-5 shadow-2xl shadow-purple-950/10">
          <div className="grid gap-3 sm:grid-cols-2">
            {visualSteps.map((step, index) => {
              const Icon = [Phone, Target, Code, ShieldCheck, Rocket, Settings][index] ?? CheckCircle;
              return (
                <div
                  key={step}
                  className="relative overflow-hidden rounded-xl border border-[color:var(--primry)] bg-bg-primary p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-btn-primary text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-t-secondary">Step {String(index + 1).padStart(2, "0")}</p>
                      <p className="text-sm font-bold text-t-primary">{step}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const CardsSection = ({ section, variant = "standard" }: { section: CardSection; variant?: "standard" | "dense" }) => (
  <section id={section.id} className="bg-bg-secondary px-6 py-18 md:px-12 md:py-24">
    <SectionHeading heading={section.heading} description={section.description} />
    <div
      className={`mx-auto grid max-w-6xl gap-5 ${
        variant === "dense" ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"
      }`}
    >
      {section.cards.map((card) => {
        const Icon = getIcon(card.icon);
        return (
          <article
            key={card.title}
            className="group rounded-xl border border-[color:var(--primry)] bg-bg-primary p-6 shadow-sm transition hover:-translate-y-1 hover:border-btn-primary hover:shadow-xl hover:shadow-purple-950/10"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-btn-primary/10 text-btn-primary transition group-hover:bg-btn-primary group-hover:text-white">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-xl font-bold text-t-primary">{card.title}</h3>
            <p className="mt-3 text-sm leading-7 text-t-secondary">{card.description}</p>
          </article>
        );
      })}
    </div>
  </section>
);

const Timeline = ({ section }: { section: TimelineSection }) => (
  <section id={section.id} className="bg-bg-primary px-6 py-18 md:px-12 md:py-24">
    <SectionHeading heading={section.heading} description={section.description} />
    <div className="mx-auto max-w-5xl">
      <div className="relative space-y-6 md:space-y-0">
        <div className="absolute left-6 top-0 hidden h-full w-px bg-[color:var(--primry)] md:block" />
        {section.steps.map((step) => {
          const Icon = getIcon(step.icon);
          return (
            <article key={step.step} className="relative md:pl-20 md:pb-8">
              <div className="hidden md:absolute md:left-0 md:top-0 md:flex md:h-12 md:w-12 md:items-center md:justify-center md:rounded-full md:border md:border-[color:var(--primry)] md:bg-bg-secondary md:text-btn-primary md:shadow-sm">
                <Icon className="h-5 w-5" />
              </div>
              <div className="rounded-xl border border-[color:var(--primry)] bg-bg-secondary p-6 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-black text-btn-primary">{step.step}</p>
                    <h3 className="mt-1 text-2xl font-bold text-t-primary">{step.title}</h3>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-t-secondary">{step.description}</p>
                  </div>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-btn-primary/10 text-btn-primary md:hidden">
                    <Icon className="h-6 w-6" />
                  </span>
                </div>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {step.keyPoints.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm leading-6 text-t-primary">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-btn-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

const Cta = ({ section }: { section: CtaSection }) => (
  <section id={section.id} className="bg-bg-primary px-6 py-18 md:px-12 md:py-24">
    <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-[#1f1630] px-6 py-12 text-white shadow-2xl shadow-purple-950/20 md:px-12">
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
        <div>
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">{section.heading}</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/75">{section.description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <ButtonLink href={section.primaryButton.url}>{section.primaryButton.text}</ButtonLink>
          <Link
            href={section.secondaryButton.url}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/20 px-6 text-sm font-semibold text-white transition hover:border-white/70"
          >
            {section.secondaryButton.text}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Faq = ({ section }: { section: FaqSection }) => (
  <section id={section.id} className="bg-bg-secondary px-6 py-18 md:px-12 md:py-24">
    <SectionHeading heading={section.heading} />
    <div className="mx-auto grid max-w-5xl gap-4">
      {section.items.map((item) => (
        <article key={item.question} className="rounded-xl border border-[color:var(--primry)] bg-bg-primary p-6">
          <h3 className="text-lg font-bold text-t-primary">{item.question}</h3>
          <p className="mt-3 text-sm leading-7 text-t-secondary">{item.answer}</p>
        </article>
      ))}
    </div>
  </section>
);

export default function OurProcessPage({ data }: { data: ProcessPageData }) {
  const hero = getSection(data, "hero_section");
  const intro = getSection(data, "intro_trust_section");
  const timeline = getSection(data, "timeline_section");
  const valueCards = getSection(data, "value_cards_section");
  const solutions = getSection(data, "services_grid_section");
  const cta = getSection(data, "call_to_action_section");
  const faq = getSection(data, "faq_section");

  return (
    <div className="overflow-x-hidden">
      {hero && <Hero section={hero} />}
      {intro && <CardsSection section={intro} />}
      {timeline && <Timeline section={timeline} />}
      {valueCards && <CardsSection section={valueCards} variant="dense" />}
      {solutions && <CardsSection section={solutions} variant="dense" />}
      {cta && <Cta section={cta} />}
      {faq && <Faq section={faq} />}
    </div>
  );
}
