export interface HeroButton {
  text: string;
  link?: string; 
}

export interface HeroSectionData {
  title: string;
  subtitle: string;
  span_subtitle: string;
  description: string;
  buttons: HeroButton[];
  herosection?: string; 
}

export interface HeroSectionProps {
  data: HeroSectionData;
}
