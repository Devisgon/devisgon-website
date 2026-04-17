import React from "react";
import AllIcons from "../icons";
import { TechnologiesSectionProps } from "@/types/sub_services_page/technalogies";

const TechnologiesSection: React.FC<TechnologiesSectionProps> = ({ data }) => {
  return (
    <section className="w-screen md:w-full bg-bg-primary py-20 px-4">
      <div className="container mx-auto max-w-7xl text-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-t-primary mb-4">{data.title}</h2>
          <p className="text-lg text-t-secondary dark:text-t-primary font-medium mb-12">{data.subtitle}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {data.tools.map((tool, index) => {
            const iconName = tool.icon?.trim();

            const IconComponent = iconName && iconName in AllIcons ? AllIcons[iconName as keyof typeof AllIcons] : null;

            return (
              <div
                key={index}
                className="w-32 h-32 md:w-40 md:h-36 bg-[#BE93E4] dark:bg-[#8457AA] rounded-xl flex flex-col items-center justify-center shadow-sm hover:shadow-md cursor-pointer"
              >
                <div className="text-[#ebd7fa] dark:text-[#47295c]  mb-3">
                  {IconComponent ? <IconComponent size={40} /> : <span className="text-xs">No Icon</span>}
                </div>
                <span className="text-[#FBF7FE]  dark:text-[#1E1423] font-semibold text-lg">{tool.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
