import type { IndustryListingHero, IndustryPageProps } from "@/types/industries_page";

export default function IndustriesPageHero({ data }: IndustryPageProps<IndustryListingHero>) {
  return (
    <section
      className="w-screen md:w-full bg-bg-primary bg-cover bg-center bg-no-repeat px-6 pt-28 md:px-12"
      style={{ backgroundImage: "url('/services_page/hero_bg.svg')" }}
    >
      <div className="mx-auto max-w-6xl border border-[color:var(--primry)] bg-bg-primary/90 px-6 py-12 md:px-12 md:py-16">
        <p className="inline-flex bg-[color:var(--primry)] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-t-secondary">
          {data.eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-t-primary md:text-6xl">
          {data.title}
        </h1>
        <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-t-secondary dark:text-t-primary md:text-lg">
          {data.description}
        </p>
      </div>
    </section>
  );
}

