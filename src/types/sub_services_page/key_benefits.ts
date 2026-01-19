
export interface KeyBenefitCard {
  icon_type: string; 
  title: string;
  description: string;
}

export interface KeyBenefitsSectionData {
  title: string;
  subtitle: string;
  cards: KeyBenefitCard[];
}

export interface KeyBenefitsSectionProps {
  data: KeyBenefitsSectionData;
}
