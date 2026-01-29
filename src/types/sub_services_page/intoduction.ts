export interface IntroductionSectionData {
  heading: string;
  span_heading: string;
  content: string[];          
  highlight_quote: string;    
  side_image: string;         
}

export interface IntroductionSectionProps {
  data: IntroductionSectionData | null | undefined;
}
