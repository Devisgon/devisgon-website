export interface ProcessSectionData {
  section_heading: string;
  main_heading: string;
  span_heading: string;
  heading: string;
  stepsData?: Array<{
    id: number;
    title: string;
  }>;
}

export interface ProcessSectionProps {
  data: ProcessSectionData;
}
