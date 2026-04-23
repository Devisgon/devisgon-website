import type { TechnologyQuoteSection } from "@/types/technologies_page";

type TechnologyQuoteProps = {
  data: TechnologyQuoteSection;
};

export default function TechnologyQuote({ data }: TechnologyQuoteProps) {
  return (
    <section className="w-full bg-bg-primary px-6 py-14 md:px-12 md:py-20 transition-colors duration-300">
      <div className="mx-auto max-w-5xl">
        <p className="text-4xl font-black italic leading-tight text-t-primary md:text-6xl">
          &ldquo;{data.quote} <span className="text-btn-primary underline decoration-btn-primary/40">{data.highlight}</span>.&rdquo;
        </p>
      </div>
    </section>
  );
}
