import Solution from "@/components/home_page/solution_section";
import Ceo from "@/components/home_page/ceo_section";
import WorkingProgress from "@/components/home_page/working_progress";
import TeamSection from "@/components/home_page/team_section";
import type { SolutionsSectionData } from "@/types/homepage/solution";
import type { ProcessSectionData } from "@/types/homepage/process";
import type { CEOData } from "@/types/homepage/ceo";
import type { TeamMember } from "@/types/homepage/team";

type Props = {
  solutionsSection: SolutionsSectionData;
  workingProcess: ProcessSectionData;
  ceoMessageSection: CEOData;
  teamMembers: TeamMember[];
};

// Core company information and anchors exist before scrolling. Unverified
// award totals and unrelated sample testimonials are withheld from rendering.
export default function DeferredSections(props: Props) {
  return (
    <>
      <Solution data={props.solutionsSection} />
      <Ceo data={props.ceoMessageSection} />
      <WorkingProgress data={props.workingProcess} />
      <TeamSection data={props.teamMembers} />
    </>
  );
}
