import { IconType } from "react-icons";

export interface ProcessStep {
  icon: unknown;           
  title: string;
  description: string;
}

export interface ProcessSectionData {
  title: string;
  subtitle: string;
  steps: ProcessStep[];
}

export interface ProcessSectionProps {
  data: ProcessSectionData;
}
