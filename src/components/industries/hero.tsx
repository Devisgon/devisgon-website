import ProjectEnquiry from "@/components/home_page/project_enquiry";
import IndustryHeroRotatingCopy from "@/components/industries/hero_rotating_copy";
import IndustryProjectBriefCta from "@/components/industries/project_brief_cta";
import type {
  IndustryCarouselCard,
  IndustryConversationSection,
  IndustryHeroSection,
  IndustryPageProps,
} from "@/types/industries_page";

type IndustryHeroProps = IndustryPageProps<IndustryHeroSection> & {
  slides?: IndustryCarouselCard[];
  conversation: IndustryConversationSection;
  lang: string;
  sourcePage: string;
  calculatorLabel: string;
};

export default function IndustryHero({
  data,
  slides,
  conversation,
  lang,
  sourcePage,
  calculatorLabel,
}: IndustryHeroProps) {
  const backgroundStyle = data.background_image
    ? {
        backgroundImage:
          "linear-gradient(145deg, rgba(7,10,22,0.86) 0%, rgba(11,20,39,0.82) 42%, rgba(64,0,91,0.66) 100%), url(" +
          data.background_image +
          ")",
      }
    : {
        backgroundImage:
          "radial-gradient(circle at 20% 10%, rgba(142,78,198,0.28), rgba(16,20,33,0.96) 40%, rgba(9,13,24,1) 100%)",
      };

  return (
    <section
      className="relative w-full overflow-hidden bg-bg-primary bg-cover bg-center px-5 pb-12 pt-28 sm:px-8 md:px-12 md:pb-16 md:pt-32"
      style={backgroundStyle}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(117,71,164,0.32),transparent_60%)]"
      />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-start gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
        <div className="pt-2 text-left lg:pt-12">
          <p className="mb-6 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E3C3F5] shadow-xl backdrop-blur-md sm:text-xs">
            {data.eyebrow}
          </p>
          <h1 className="max-w-3xl text-left text-4xl font-black leading-[1.08] tracking-tight text-white drop-shadow-xl sm:text-5xl md:text-6xl">
            {data.title} <span className="text-[#E7B6E7]">{data.highlight}</span>
          </h1>
          <IndustryHeroRotatingCopy slides={slides} fallbackTitle={data.highlight} />
          <div className="mt-8 flex flex-col items-start justify-start gap-3 sm:flex-row">
            <IndustryProjectBriefCta label={conversation.button_text} variant="hero" />
            <a
              href="#industry-automation-calculator"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {calculatorLabel}
            </a>
          </div>
          <p className="mt-5 max-w-xl text-left text-xs leading-relaxed text-white/65">
            {data.description}
          </p>
        </div>

        <div
          id="industry-project-brief"
          className="scroll-mt-24 rounded-3xl border border-white/15 bg-background p-4 shadow-[0_24px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-6 md:p-7"
        >
          <div className="mb-5 text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-t-primary sm:text-3xl">
              {conversation.title}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-t-secondary sm:text-base">
              {conversation.subtitle}
            </p>
          </div>
          <ProjectEnquiry
            lang={lang}
            sourcePage={sourcePage}
            sourceType="industry"
          />
        </div>
      </div>
    </section>
  );
}
