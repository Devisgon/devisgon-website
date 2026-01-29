export interface CaseContent {
  problem?: {
    label: string;
    text: string;
  };
  solution?: {
    label: string;
    text: string;
  };
  result?: {
    label: string;
    text: string;
  };
}

// Main case study data
export interface CaseStudyData {
  headline: string;
  image?: string;
  content: CaseContent;
}

export interface CaseStudyProps {
  data?: CaseStudyData | null;
}
