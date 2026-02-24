"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CircleLoader } from "react-spinners";
import Hero from '@/components/home_page/hero_section';
import Services from '@/components/home_page/services_section';
import ExportServices from '@/components/home_page/expert_services_section';
import Award from "@/components/home_page/award";
import Solution from '@/components/home_page/solution_section';
import Progress from '@/components/home_page/working_progress';
import Comments from '@/components/home_page/comments_section';
import Ceo from '@/components/home_page/ceo_section';
import Team from '@/components/home_page/team_section';

// import individual types
import { HeroSectionData } from "@/types/homepage/hero";
import { ServicesSectionData } from "@/types/homepage/services";
import { ExpertServicesData } from "@/types/homepage/expert_services";
import { SolutionsSectionData } from "@/types/homepage/solution";
import { ProcessSectionData } from "@/types/homepage/process";
import { TestimonialData } from "@/types/homepage/comments";
import { CEOData } from "@/types/homepage/ceo";
import { TeamMember } from "@/types/homepage/team";

export default function Home() {

  const { t, i18n } = useTranslation("home");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Extract each section with correct type
  const heroSection = t("hero_section", { returnObjects: true }) as HeroSectionData;

  const servicesSection = t("services_section", { returnObjects: true }) as ServicesSectionData;

  const expertServicesSection = t("expert_services_section", { returnObjects: true }) as ExpertServicesData;

  const solutionsSection = t("solutions_section", { returnObjects: true }) as SolutionsSectionData;

  const workingProcess = t("working_process", { returnObjects: true }) as ProcessSectionData;

  const testimonialsSection = t("testimonials_section", { returnObjects: true }) as TestimonialData;

  const ceoMessageSection = t("ceo_message_section", { returnObjects: true }) as CEOData;

  const teamMembers = t("teamMembers.team", { returnObjects: true }) as TeamMember[];

  const isLoading = !mounted || !i18n.isInitialized;

  const isDataMissing =
    !heroSection ||
    !servicesSection ||
    typeof heroSection === "string";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-bg-primary">
<CircleLoader
  color="#8E4EC6" 
  size={80}  
  speedMultiplier={5}    
/>       
      </div>
    );
  }

  if (isDataMissing) {
    return (
      <div className="flex items-center justify-center h-screen bg-bg-primary">
        <p>
          Translation data missing for {i18n.language}
        </p>
      </div>
    );
  }

  return (
    <main>

      <Hero data={heroSection} />

      <Services data={servicesSection} />

      <Award />

      <ExportServices data={expertServicesSection} />

      <Solution data={solutionsSection} />

      <Progress data={workingProcess} />

      <Comments data={testimonialsSection} />

      <Ceo data={ceoMessageSection} />

      <Team data={teamMembers} />

    </main>
  );
}
