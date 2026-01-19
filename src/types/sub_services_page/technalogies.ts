
export interface Tool {
  name: string;
  icon: string;
}

export interface TechnologiesSectionData {
  title: string;
  subtitle: string;
  tools: Tool[];
}

export interface TechnologiesSectionProps {
  data: TechnologiesSectionData;
}
