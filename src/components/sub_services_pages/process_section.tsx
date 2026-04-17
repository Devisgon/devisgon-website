import React from "react";
import {
  FaBug,
  FaChartBar,
  FaChartLine,
  FaCheckCircle,
  FaCheckDouble,
  FaClipboardList,
  FaCode,
  FaCogs,
  FaCompass,
  FaDatabase,
  FaEdit,
  FaFileAlt,
  FaFileContract,
  FaFileExport,
  FaHammer,
  FaLightbulb,
  FaLink,
  FaLock,
  FaMobileAlt,
  FaPaintBrush,
  FaPalette,
  FaPenNib,
  FaPencilRuler,
  FaPlay,
  FaProjectDiagram,
  FaRobot,
  FaRocket,
  FaSearch,
  FaShieldAlt,
  FaSitemap,
  FaTerminal,
  FaUnlockAlt,
  FaVial,
  FaWrench,
} from "react-icons/fa";
import { TbTools } from "react-icons/tb";
import type { IconType } from "react-icons";
import { ProcessSectionProps } from "@/types/sub_services_page/process";

const ICONS: Record<string, IconType> = {
  FaBug,
  FaChartBar,
  FaChartLine,
  FaCheckCircle,
  FaCheckDouble,
  FaClipboardList,
  FaCode,
  FaCogs,
  FaCompass,
  FaDatabase,
  FaEdit,
  FaFileAlt,
  FaFileContract,
  FaFileExport,
  FaHammer,
  FaLightbulb,
  FaLink,
  FaLock,
  FaMobileAlt,
  FaPaintBrush,
  FaPalette,
  FaPenNib,
  FaPencilRuler,
  FaPlay,
  FaProjectDiagram,
  FaRadar: FaSearch,
  FaRobot,
  FaRocket,
  FaSearch,
  FaShieldAlt,
  FaSitemap,
  FaTerminal,
  FaUnlockAlt,
  FaVial,
  FaWrench,
  TbTools,
};

const ProcessSection: React.FC<ProcessSectionProps> = ({ data }) => {
  return (
    <section className="w-screen md:w-full  py-24 px-6">
      <div className="container mx-auto max-w-7xl text-center">
        <div className="mb-20">
          <h2 className="text-4xl font-extrabold text-t-primary mb-4">{data.title}</h2>
          <p className="text-lg text-t-secondary dark:text-t-primary font-medium">{data.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {data.steps.map((step, index) => {
            const iconName = step.icon.trim() as keyof typeof ICONS;
            const IconComponent = ICONS[iconName];

            return (
              <div key={index} className="flex flex-col items-center">
                <div className="w-24 h-24 bg-[#E9D5FF] dark:bg-[#47295C] rounded-full flex items-center justify-center mb-6 shadow-sm">
                  {IconComponent ? (
                    <IconComponent className="text-black dark:text-[#ecd9fa] w-8 h-8" />
                  ) : (
                    <span className="text-xs">No Icon</span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-t-primary  mb-3">{step.title}</h3>

                <p className="text-t-secondary text-sm font-medium leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
