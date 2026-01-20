export interface HeroCTA {
  text: string;
}

export interface HeroSectionData {
  title?: string;
  pre_title: string;
  main_title: string;
  description: string;
  cta_button: HeroCTA;
}

export interface HeroSectionProps {
  data: HeroSectionData;
}
