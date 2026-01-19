export interface TeamMember {
  id: number | string;
  image: string;
  alt: string;
}

export interface TeamSectionProps {
  data: TeamMember[];
}
