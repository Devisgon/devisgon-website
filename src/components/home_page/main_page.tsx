"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ClipLoader from "react-spinners/ClipLoader";

import Hero from "@/components/home_page/hero_section";
import Services from "@/components/home_page/services_section";
import ExportServices from "@/components/home_page/expert_services_section";
import Award from "@/components/home_page/award";
import Solution from "@/components/home_page/solution_section";
import Progress from "@/components/home_page/working_progress";
import Comments from "@/components/home_page/comments_section";
import Ceo from "@/components/home_page/ceo_section";
import Team from "@/components/home_page/team_section";

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
  const [showTimedLoader, setShowTimedLoader] = useState(false);

  useEffect(() => {
    setMounted(true);

    const hasSeenLoader = sessionStorage.getItem("home_loader_shown");

    if (!hasSeenLoader) {
      setShowTimedLoader(true);

      const timer = window.setTimeout(() => {
        setShowTimedLoader(false);
        sessionStorage.setItem("home_loader_shown", "true");
      }, 1000);

      return () => window.clearTimeout(timer);
    }
  }, []);

  const heroSection = t("hero_section", {
    returnObjects: true,
  }) as HeroSectionData;

  const servicesSection = t("services_section", {
    returnObjects: true,
  }) as ServicesSectionData;

  const expertServicesSection = t("expert_services_section", {
    returnObjects: true,
  }) as ExpertServicesData;

  const solutionsSection = t("solutions_section", {
    returnObjects: true,
  }) as SolutionsSectionData;

  const workingProcess = t("working_process", {
    returnObjects: true,
  }) as ProcessSectionData;

  const testimonialsSection = t("testimonials_section", {
    returnObjects: true,
  }) as TestimonialData;

  const ceoMessageSection = t("ceo_message_section", {
    returnObjects: true,
  }) as CEOData;

  const teamMembers = t("teamMembers.team", {
    returnObjects: true,
  }) as TeamMember[];

  const isLoading = !mounted || !i18n.isInitialized;

  const isDataMissing =
    !heroSection ||
    !servicesSection ||
    typeof heroSection === "string" ||
    typeof servicesSection === "string";

  if (showTimedLoader) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary">
        <ClipLoader
          color="#8E4EC6"
          loading={true}
          size={90}
          aria-label="Loading Spinner"
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        id="loader"
        className="flex h-screen items-center justify-center bg-bg-primary"
      >
        <ClipLoader
          color="#8E4EC6"
          loading={isLoading}
          size={90}
          aria-label="Loading Spinner"
        />
      </div>
    );
  }

  if (isDataMissing) {
    return (
      <div className="flex h-screen items-center justify-center bg-bg-primary">
        <p>Translation data missing for {i18n.language}</p>
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
