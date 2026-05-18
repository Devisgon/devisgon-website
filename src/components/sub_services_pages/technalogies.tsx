import React from "react";
import Link from "next/link";
import AllIcons from "../icons";
import { TechnologiesSectionProps } from "@/types/sub_services_page/technalogies";
import navbarData from "@/data/navbar.json";
import { findNavbarItemByHref } from "@/lib/localized-content";

const normalizeTechnologyName = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\+/g, "plus")
    .replace(/[^a-z0-9]+/g, "");

const technologyAliases: Record<string, string> = {
  [normalizeTechnologyName("AWS")]: "/technologies/amazon",
  [normalizeTechnologyName("AWS Lambda")]: "/technologies/amazon",
  [normalizeTechnologyName("AWS RDS")]: "/technologies/amazon",
  [normalizeTechnologyName("JavaScript")]: "/technologies/javascript",
  [normalizeTechnologyName("Javascript")]: "/technologies/javascript",
  [normalizeTechnologyName("Make.com")]: "/technologies/make",
  [normalizeTechnologyName("make.com")]: "/technologies/make",
  [normalizeTechnologyName("next js.")]: "/technologies/nextjs",
  [normalizeTechnologyName("Next.js")]: "/technologies/nextjs",
  [normalizeTechnologyName("laravel")]: "/technologies/laravel",
};

const technologyLinks = findNavbarItemByHref(navbarData, "/technologies")
  ?.dropdown?.columns?.flatMap((column) => column.links ?? [])
  .reduce<Record<string, string>>((links, item) => {
    links[normalizeTechnologyName(item.name)] = item.href;
    return links;
  }, technologyAliases) ?? technologyAliases;

const getTechnologyHref = (name: string) => technologyLinks[normalizeTechnologyName(name)] ?? "/technologies";

const TechnologiesSection: React.FC<TechnologiesSectionProps> = ({ data }) => {
  const marqueeGroups = [data.tools, data.tools, data.tools, data.tools];

  return (
    <section className="w-screen md:w-full overflow-hidden bg-bg-primary py-20 px-4">
      <div className="container mx-auto max-w-7xl text-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-t-primary mb-4">{data.title}</h2>
          <p className="text-lg text-t-secondary dark:text-t-primary font-medium mb-12">{data.subtitle}</p>
        </div>

        <div className="relative -mx-4 overflow-hidden">

          <div className="service-tech-marquee flex w-max px-4 py-2">
            {marqueeGroups.map((tools, groupIndex) => (
              <div
                key={groupIndex}
                aria-hidden={groupIndex > 0}
                className="flex min-w-max items-stretch gap-6 pr-6"
              >
                {tools.map((tool, index) => {
                  const iconName = tool.icon?.trim();

                  const IconComponent =
                    iconName && iconName in AllIcons ? AllIcons[iconName as keyof typeof AllIcons] : null;

                  return (
                    <Link
                      key={`${groupIndex}-${index}-${tool.name}`}
                      href={getTechnologyHref(tool.name)}
                      tabIndex={groupIndex > 0 ? -1 : undefined}
                      className="group flex h-36 w-40 shrink-0 flex-col items-center justify-center rounded-xl bg-[#BE93E4] px-4 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:bg-btn-primary hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-btn-primary dark:bg-[#8457AA]"
                    >
                      <div className="mb-3 text-[#ebd7fa] transition duration-300 group-hover:text-btn-secondary dark:text-[#47295c] dark:group-hover:text-t-primary">
                        {IconComponent ? <IconComponent size={40} /> : <span className="text-xs">No Icon</span>}
                      </div>
                      <span className="text-base font-semibold leading-tight text-[#FBF7FE] transition duration-300 group-hover:text-btn-secondary dark:text-[#1E1423] dark:group-hover:text-t-primary">
                        {tool.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
