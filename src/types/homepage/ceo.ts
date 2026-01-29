export interface CEOData {
  image: string;
  title: string;
  quote: string;
  author: string;
  role: string;
}

export interface CEOSectionProps {
  data?: CEOData | null;
}
