export interface SolutionFeature {
  title: string;
  description: string;
}

export interface SolutionSideCard {
  pre_text: string;
  title: string;
  description: string;
}

export interface SolutionsSectionData {
  title: string;
  description: string;
  features: SolutionFeature[];
  side_image: string;
  side_card: SolutionSideCard;
}

export interface SolutionsSectionProps {
  data: SolutionsSectionData;
}
