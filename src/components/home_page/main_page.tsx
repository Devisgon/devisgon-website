import { cookies } from 'next/headers';

import Hero from "@/components/home_page/hero_section";
import Services from "@/components/home_page/services_section";
import ExportServices from "@/components/home_page/expert_services_section";
import Award from "@/components/home_page/award";
import Solution from "@/components/home_page/solution_section";
import Progress from "@/components/home_page/working_progress";
import Comments from "@/components/home_page/comments_section";
import Ceo from "@/components/home_page/ceo_section";
import Team from "@/components/home_page/team_section";

import type { HeroSectionData } from "@/types/homepage/hero";
import type { ServicesSectionData } from "@/types/homepage/services";
import type { ExpertServicesData } from "@/types/homepage/expert_services";
import type { SolutionsSectionData } from "@/types/homepage/solution";
import type { ProcessSectionData } from "@/types/homepage/process";
import type { TestimonialData } from "@/types/homepage/comments";
import type { CEOData } from "@/types/homepage/ceo";
import type { TeamMember } from "@/types/homepage/team";

import homeEn from '@/data/english_data/home_page.json';
import homeUr from '@/data/urdu_data/home_page.json';
import homeAr from '@/data/arabic_data/home_page.json';
import homeFr from '@/data/french_data/home_page.json';
import homeZh from '@/data/chinese_data/home_page.json';
import homeDe from '@/data/german_data/home_page.json';
import homeEs from '@/data/spanish_data/home_page.json';

/* eslint-disable @typescript-eslint/no-explicit-any */
const langMap: Record<string, any> = {
  en: homeEn, ur: homeUr, ar: homeAr,
  fr: homeFr, zh: homeZh, de: homeDe, es: homeEs,
};

export default async function Home() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('lang')?.value || 'en';
  const t = langMap[lang] ?? langMap['en'];

  const heroSection        = t.hero_section          as HeroSectionData;
  const servicesSection    = t.services_section      as ServicesSectionData;
  const expertServicesSection = t.expert_services_section as ExpertServicesData;
  const solutionsSection   = t.solutions_section     as SolutionsSectionData;
  const workingProcess     = t.working_process       as ProcessSectionData;
  const testimonialsSection = t.testimonials_section as TestimonialData;
  const ceoMessageSection  = t.ceo_message_section   as CEOData;
  const teamMembers        = (t.teamMembers?.team ?? []) as TeamMember[];

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
