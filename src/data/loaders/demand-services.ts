import voiceAgents from "@/data/english_data/services/ai_and_ml/voice_agents.json";
import aiReceptionist from "@/data/english_data/services/ai_and_ml/ai_receptionist.json";
import invoiceAutomation from "@/data/english_data/services/workflow_automations/invoice_automation.json";
import type { BuyerGuideData } from "@/components/sub_services_pages/buyer_guide";
import type { HeroSectionData } from "@/types/sub_services_page/hero";
import type { IntroductionSectionData } from "@/types/sub_services_page/intoduction";
import type { KeyBenefitsSectionData } from "@/types/sub_services_page/key_benefits";
import type { WhatYouGetSectionData } from "@/types/sub_services_page/wwd";
import type { TechnologiesSectionData } from "@/types/sub_services_page/technalogies";
import type { ProcessSectionData } from "@/types/sub_services_page/process";
import type { CaseStudyData } from "@/types/sub_services_page/case_study";
import type { FAQSectionData } from "@/types/sub_services_page/faq";

// Validate JSON against the actual shared renderers at build time.
type ServiceDetail = {
  slug: string;
  hero_section: HeroSectionData;
  introduction_section: IntroductionSectionData;
  buyer_guide: BuyerGuideData;
  key_benefits_section: KeyBenefitsSectionData;
  what_you_get_section: WhatYouGetSectionData;
  technologies_section: TechnologiesSectionData;
  process_section: ProcessSectionData;
  case_study_section: CaseStudyData;
  faq_section: FAQSectionData;
};
export const workflowData = { en: { [voiceAgents.slug]: voiceAgents, [aiReceptionist.slug]: aiReceptionist, [invoiceAutomation.slug]: invoiceAutomation } } satisfies Record<string, Record<string, ServiceDetail>>;
