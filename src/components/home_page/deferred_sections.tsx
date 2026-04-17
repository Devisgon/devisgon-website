import ExportServices from "@/components/home_page/expert_services_section";
import Award from "@/components/home_page/award";
import Solution from "@/components/home_page/solution_section";
import Ceo from "@/components/home_page/ceo_section";
import WorkingProgress from "@/components/home_page/working_progress";
import TeamSection from "@/components/home_page/team_section";
import DeferredInteractiveSections from "@/components/home_page/deferred_interactive_sections";

import type { ExpertServicesData } from "@/types/homepage/expert_services";
import type { SolutionsSectionData } from "@/types/homepage/solution";
import type { ProcessSectionData } from "@/types/homepage/process";
import type { TestimonialData } from "@/types/homepage/comments";
import type { CEOData } from "@/types/homepage/ceo";
import type { TeamMember } from "@/types/homepage/team";

type DeferredSectionsProps = {
  expertServicesSection: ExpertServicesData;
  solutionsSection: SolutionsSectionData;
  workingProcess: ProcessSectionData;
  testimonialsSection: TestimonialData;
  ceoMessageSection: CEOData;
  teamMembers: TeamMember[];
};

export default function DeferredSections({
  expertServicesSection,
  solutionsSection,
  workingProcess,
  testimonialsSection,
  ceoMessageSection,
  teamMembers,
}: DeferredSectionsProps) {
  return (
    <>
      <Award />
      <ExportServices data={expertServicesSection} />
      <Solution data={solutionsSection} />
      <Ceo data={ceoMessageSection} />
      <WorkingProgress data={workingProcess} />
      <DeferredInteractiveSections
        testimonialsSection={testimonialsSection}
      />
      <TeamSection data={teamMembers} />
    </>
  );
}
