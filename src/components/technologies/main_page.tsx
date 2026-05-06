import Link from "next/link";
import type { TechnologyListingData } from "@/types/technologies_page";
import TechnologyIconBadge from "@/components/technologies/icon_badge";
import TechnologiesCategorySections from "@/components/technologies/category_sections";

const bookMeetingLink =
  process.env.NEXT_PUBLIC_CALENDLY_30_MIN_MEETING || process.env.NEXT_PUBLIC_CALENDLY_15_MIN_MEETING || "/contact";

type TechnologiesMainPageProps = {
  data: TechnologyListingData;
};

export default function TechnologiesMainPage({ data }: TechnologiesMainPageProps) {
  const backgroundStyle = {
    backgroundImage:
      "linear-gradient(145deg, rgba(7,10,22,0.8) 0%, rgba(11,20,39,0.7) 40%, rgba(84,34,130,0.5) 100%), url(/services_page/hero_bg.webp)",
  };

  return (
    <>
      <section
        className="relative w-full min-h-screen overflow-hidden bg-bg-primary bg-cover bg-center bg-no-repeat px-6 pb-16 pt-32 md:px-12"
        style={backgroundStyle}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(117,71,164,0.4),transparent_60%)]" />
        <div className="relative mx-auto mt-20 max-w-6xl">
          <p className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#CFA2F2] shadow-xl backdrop-blur-md">
            {data.hero_section.eyebrow}
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight text-white drop-shadow-2xl md:text-6xl">
            {data.hero_section.title}
          </h1>
          <div className="mt-4 max-w-3xl rounded-xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-lg">
            <p className="text-sm leading-relaxed text-white/80 md:text-base">{data.hero_section.description}</p>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={bookMeetingLink}
              className="inline-flex h-12 items-center justify-center rounded-lg border-2 border-white/25 bg-white/10 px-8 text-sm font-semibold text-white shadow-xl transition-colors hover:bg-btn-primary"
            >
              Book a Meeting
            </a>
          </div>
        </div>
      </section>

      {data.technology_groups && data.technology_groups.length > 0 ? (
        <TechnologiesCategorySections data={data.technology_groups} />
      ) : (
        <section className="w-full bg-bg-secondary px-6 pb-16 pt-8 md:px-12 md:pb-24 md:pt-10 transition-colors duration-300">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
            {data.technology_cards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group relative overflow-hidden rounded-2xl border border-[color:var(--primry)] bg-bg-primary p-7 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-btn-primary hover:shadow-[0_14px_35px_-20px_var(--btn_primary)]"
              >
                <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-btn-primary/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-btn-primary transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />

                <div className="relative z-10">
                  <TechnologyIconBadge iconName={card.icon_type} />
                  <h2 className="mt-4 text-2xl font-extrabold text-t-primary transition-all duration-300 group-hover:translate-x-1 group-hover:text-btn-primary">
                    {card.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-t-secondary transition-colors duration-300 group-hover:text-t-primary">
                    {card.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
