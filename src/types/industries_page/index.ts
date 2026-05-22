export type IndustryActionLink = {
  text: string;
  href: string;
};

export type IndustryListingAction = {
  label?: string;
  text?: string;
  href: string;
};

export type IndustryIconCard = {
  title: string;
  description: string;
  icon_type: string;
};

export type IndustryHeroSection = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  primary_cta: IndustryActionLink;
  secondary_cta: IndustryActionLink;
  background_image?: string;
};

export type IndustryFrictionSection = {
  title: string;
  subtitle: string;
  cards: IndustryIconCard[];
};

export type IndustryArchitectureCard = IndustryIconCard & {
  featured?: boolean;
};

export type IndustryArchitectureSection = {
  id?: string;
  title: string;
  description: string;
  bullets: string[];
  cards: IndustryArchitectureCard[];
};

export type IndustryBenefitsSection = {
  title: string;
  subtitle: string;
  cards: IndustryIconCard[];
};

export type IndustryCarouselCard = {
  title: string;
  description: string;
};

export type IndustryCarouselSection = {
  title: string;
  subtitle: string;
  cards: IndustryCarouselCard[];
};

export type IndustryCaseStudy = {
  label: string;
  title: string;
  description: string;
  href: string;
  cta_text: string;
};

export type IndustryCaseStudiesSection = {
  title: string;
  subtitle: string;
  cards: IndustryCaseStudy[];
};

export type IndustryExploreCard = {
  title: string;
  description: string;
  href: string;
  icon_type: string;
};

export type IndustryExploreSection = {
  title: string;
  subtitle: string;
  cards: IndustryExploreCard[];
};

export type IndustryConversationSection = {
  title: string;
  subtitle: string;
  full_name_label: string;
  business_email_label: string;
  message_label: string;
  full_name_placeholder: string;
  business_email_placeholder: string;
  message_placeholder: string;
  button_text: string;
};

export type IndustryListingHero = {
  eyebrow: string;
  title: string;
  description: string;
  primary_cta?: IndustryListingAction;
  secondary_cta?: IndustryListingAction;
};

export type IndustryListingCard = {
  title: string;
  description: string;
  href: string;
  icon_type: string;
};

export type IndustryListingGroup = {
  anchor?: string;
  title: string;
  description: string;
  cards: IndustryListingCard[];
};

export type IndustryListingCategory = {
  title: string;
  slug?: string;
  href: string;
  description: string;
  sub_industries?: {
    title: string;
    slug?: string;
    href: string;
    description?: string;
  }[];
};

export type IndustryListingCategorySection = {
  id?: string;
  title: string;
  description: string;
  categories: IndustryListingCategory[];
};

export type IndustryListingData = {
  hero_section: IndustryListingHero;
  industry_cards: IndustryListingCard[];
  industry_categories_section?: IndustryListingCategorySection;
  industry_groups?: IndustryListingGroup[];
};

export type IndustryPageData = {
  slug: string;
  hero_section: IndustryHeroSection;
  friction_section: IndustryFrictionSection;
  architecture_section: IndustryArchitectureSection;
  benefits_section: IndustryBenefitsSection;
  carousel_section?: IndustryCarouselSection;
  case_studies_section: IndustryCaseStudiesSection;
  explore_section: IndustryExploreSection;
  conversation_section: IndustryConversationSection;
};

export type IndustryPageProps<T> = {
  data: T;
};
