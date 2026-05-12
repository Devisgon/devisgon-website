export type HostingAction = {
  text: string;
  link_url: string;
};

export type HostingHeroSlide = {
  slide_id: number;
  title: {
    primary: string;
    secondary: string;
  };
  description?: string;
  background_image_url?: string;
  elements?: Array<{
    type: string;
    image_url: string;
  }>;
  primary_button?: HostingAction;
  secondary_button?: HostingAction;
};

export type HostingHeroSection = {
  section_id: "hero_slider_1" | "hero_slider_2";
  section_title: string;
  is_slider?: boolean;
  slides: HostingHeroSlide[];
};

export type DomainSearchSection = {
  section_id: "domain_search";
  section_title: string;
  title: string;
  sub_title: string;
  placeholder_text: string;
  tlds: Array<{
    tld_name: string;
    price: string;
    primary_color?: string;
  }>;
};

export type HostingPlan = {
  plan_id: number;
  title: string;
  badge?: string | null;
  price?: string;
  duration?: string;
  color_theme?: string;
  features: string[];
  primary_button?: HostingAction;
};

export type HostingPlansSection = {
  section_id: "hosting_plans" | "extra_hosting_plans";
  section_title: string;
  main_title?: string;
  main_sub_title?: string;
  plans_per_row?: number;
  plans: HostingPlan[];
};

export type HostingServiceCard = {
  id: number;
  title: string;
  description: string;
  icon_url?: string;
};

export type WhatWeDoSection = {
  section_id: "what_we_do";
  section_title: string;
  main_sub_title?: string;
  main_title: string;
  services: HostingServiceCard[];
};

export type OurServicesSection = {
  section_id: "our_services";
  section_title: string;
  main_title: string;
  main_sub_title?: string;
  services_list: HostingServiceCard[];
};

export type HostingCtaSection = {
  section_id: "call_to_action";
  section_title: string;
  title: string;
  description: {
    line1: string;
    line2: string;
  };
  button?: HostingAction;
};

export type HostingFaqSection = {
  section_id: "faqs";
  section_title: string;
  main_title: string;
  questions: Array<{
    q_id: number;
    question: string;
    answer: string;
  }>;
};

export type OtherHostingSection =
  | HostingHeroSection
  | DomainSearchSection
  | HostingPlansSection
  | WhatWeDoSection
  | OurServicesSection
  | HostingCtaSection
  | HostingFaqSection;

export type OtherHostingPageData = OtherHostingSection[];

export type JotformLandingPageData = {
  landing_page: {
    brand_config: {
      partner_name: string;
      primary_color?: string;
      accent_color?: string;
      font_family?: string;
    };
    hero_section: {
      headline: string;
      subheadline: string;
      cta_text: string;
      cta_link: string;
      image?: {
        url: string;
        alt: string;
        style?: string;
      };
    };
    page_copy?: {
      compare_plans: string;
      workspace_label: string;
      hero_chips: string[];
      features_eyebrow: string;
      features_title: string;
      features_subtitle: string;
      pricing_eyebrow: string;
      pricing_title: string;
      pricing_subtitle: string;
      starter_access: string;
      billed_yearly: string;
      popular_label: string;
      pricing_cta: string;
      form_limits_label?: string;
      ai_agent_limits_label?: string;
      stats_eyebrow: string;
      stats_title: string;
      products_eyebrow: string;
      products_title: string;
      products_subtitle: string;
      templates_eyebrow: string;
      templates_title: string;
      templates_subtitle: string;
      workflow_eyebrow: string;
      workflow_title: string;
      workflow_subtitle: string;
      security_eyebrow: string;
      security_title: string;
      security_subtitle: string;
      faq_eyebrow: string;
      faq_title: string;
      faq_subtitle: string;
    };
    stats?: Array<{
      value: string;
      label: string;
      description: string;
    }>;
    features: Array<{
      id: number;
      title: string;
      description: string;
    }>;
    product_suite?: Array<{
      title: string;
      description: string;
    }>;
    template_categories?: Array<{
      title: string;
      description: string;
    }>;
    workflow_steps?: Array<{
      title: string;
      description: string;
    }>;
    security_items?: Array<{
      title: string;
      description: string;
    }>;
    pricing: Array<{
      plan: string;
      price_monthly: number;
      price_yearly: number;
      features: string[];
      agent?: string[];
      is_popular?: boolean;
    }>;
    faqs?: Array<{
      question: string;
      answer: string;
    }>;
  };
};

export type OtherPageData = OtherHostingPageData | JotformLandingPageData;
