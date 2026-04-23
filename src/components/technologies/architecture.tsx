import Image from "next/image";
import type { TechnologyArchitectureSection } from "@/types/technologies_page";

type TechnologyArchitectureProps = {
  data: TechnologyArchitectureSection;
};

export default function TechnologyArchitecture({ data }: TechnologyArchitectureProps) {
  return (
    <section
      id={data.id ?? "technology-architecture"}
      className="w-full bg-bg-primary px-6 py-14 md:px-12 md:py-20 transition-colors duration-300"
    >
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_1.2fr] lg:items-center">
        <div className="overflow-hidden rounded-2xl border border-[color:var(--primry)] bg-bg-secondary shadow-md">
          <div className="relative h-[230px] w-full md:h-[290px]">
            <Image src={data.image} alt={`${data.title} visual`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-black text-t-primary md:text-5xl">{data.title}</h2>
          <div className="mt-6 space-y-6">
            {data.items.map((item, index) => (
              <div key={item.title} className="grid grid-cols-[36px_1fr] gap-3">
                <p className="text-3xl font-extrabold leading-none text-btn-primary/50">{String(index + 1).padStart(2, "0")}</p>
                <div>
                  <h3 className="text-2xl font-bold text-t-primary">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-t-secondary">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
