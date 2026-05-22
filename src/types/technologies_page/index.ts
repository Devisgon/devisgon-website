export type TechnologyActionLink = {
  text: string;
  href: string;
};

export type TechnologySeoMetadata = {
  title?: string;
  description?: string;
  keywords?: string[];
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  robots?: string;
  primary_keywords?: string[];
  secondary_keywords?: string[];
};

export type TechnologyListingAction = {
  label?: string;
  text?: string;
  href: string;
};

export type TechnologyIconCard = {
  title: string;
  description: string;
  icon_type: string;
};

export type TechnologyListingHero = {
  eyebrow: string;
  title: string;
  description: string;
  primary_cta?: TechnologyListingAction;
  secondary_cta?: TechnologyListingAction;
};

export type TechnologyListingCard = {
  title: string;
  description: string;
  href: string;
  icon_type: string;
};

export type TechnologyListingGroup = {
  anchor?: string;
  title: string;
  description: string;
  cards: TechnologyListingCard[];
};

export type TechnologyListingCategory = {
  title: string;
  slug?: string;
  href: string;
  icon_type?: string;
  description: string;
  technologies?: {
    title: string;
    slug?: string;
    href: string;
    description?: string;
  }[];
};

export type TechnologyListingCategorySection = {
  id?: string;
  title: string;
  description: string;
  technology_cards: TechnologyListingCategory[];
};

export type TechnologyListingData = {
  seo?: TechnologySeoMetadata;
  hero_section: TechnologyListingHero;
  technology_cards: TechnologyListingCard[];
  technology_categories_section?: TechnologyListingCategorySection;
  technology_groups?: TechnologyListingGroup[];
};

export type TechnologyHeroSection = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  side_image: string;
  primary_cta: TechnologyActionLink;
  secondary_cta: TechnologyActionLink;
};

export type TechnologyWhyUseSection = {
  title: string;
  subtitle: string;
  paragraphs: string[];
  cards: TechnologyIconCard[];
};

export type TechnologyArchitectureItem = {
  title: string;
  description: string;
};

export type TechnologyArchitectureSection = {
  id?: string;
  title: string;
  image: string;
  items: TechnologyArchitectureItem[];
};

export type TechnologyEdgeCard = {
  metric: string;
  title: string;
  description: string;
};

export type TechnologyEdgeSection = {
  title: string;
  subtitle: string;
  cards: TechnologyEdgeCard[];
};

export type TechnologyQuoteSection = {
  quote: string;
  highlight: string;
};

export type TechnologyConversationSection = {
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

export type TechnologyPageData = {
  slug: string;
  seo_metadata?: TechnologySeoMetadata;
  hero_section: TechnologyHeroSection;
  why_use_section: TechnologyWhyUseSection;
  architecture_section: TechnologyArchitectureSection;
  edge_section: TechnologyEdgeSection;
  quote_section: TechnologyQuoteSection;
  conversation_section: TechnologyConversationSection;
};
