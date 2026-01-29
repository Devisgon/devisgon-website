export interface HeroSectionData {
  title: string;
  subtitle: string;
  description: string;
  hero_image: string;
  buttons: Buttons[]; 
}
 
export interface Buttons{
  text:string
  link:string
}

export interface HeroSectionProps {
  data: HeroSectionData;
}
