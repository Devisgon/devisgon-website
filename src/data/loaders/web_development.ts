
import type { CaseStudyData } from "@/types/sub_services_page/case_study";
import type { FAQSectionData } from "@/types/sub_services_page/faq";
import type { HeroSectionData } from "@/types/sub_services_page/hero";
import type { IntroductionSectionData } from "@/types/sub_services_page/intoduction";
import type { KeyBenefitsSectionData } from "@/types/sub_services_page/key_benefits";
import type { ProcessSectionData } from "@/types/sub_services_page/process";
import type { TechnologiesSectionData } from "@/types/sub_services_page/technalogies";
import type { WhatYouGetSectionData } from "@/types/sub_services_page/wwd";

type ServiceDetailData = {
  hero_section: HeroSectionData;
  introduction_section: IntroductionSectionData;
  key_benefits_section: KeyBenefitsSectionData;
  what_you_get_section: WhatYouGetSectionData;
  technologies_section: TechnologiesSectionData;
  process_section: ProcessSectionData;
  case_study_section?: CaseStudyData | null;
  faq_section: FAQSectionData;
};

// ENGLISH
import enAiPoweredApp from "@/data/english_data/services/web_and_saas_development/ai_powered_app.json";
import enApiIntegration from "@/data/english_data/services/web_and_saas_development/api_integration.json";
import enMobileApp from "@/data/english_data/services/web_and_saas_development/app_applications.json";
import enMvp from "@/data/english_data/services/web_and_saas_development/mvps.json";
import enSaas from "@/data/english_data/services/web_and_saas_development/saas_plateform.json";
import enWebApp from "@/data/english_data/services/web_and_saas_development/web_applications.json";

// URDU
import urAiPoweredApp from "@/data/urdu_data/services/web_and_saas_development/ai_powered_app.json";
import urApiIntegration from "@/data/urdu_data/services/web_and_saas_development/api_integration.json";
import urMobileApp from "@/data/urdu_data/services/web_and_saas_development/app_applications.json";
import urMvp from "@/data/urdu_data/services/web_and_saas_development/mvps.json";
import urSaas from "@/data/urdu_data/services/web_and_saas_development/saas_plateform.json";
import urWebApp from "@/data/urdu_data/services/web_and_saas_development/web_applications.json";

// ARABIC
import arAiPoweredApp from "@/data/arabic_data/services/web_and_saas_development/ai_powered_app.json";
import arApiIntegration from "@/data/arabic_data/services/web_and_saas_development/api_integration.json";
import arMobileApp from "@/data/arabic_data/services/web_and_saas_development/app_applications.json";
import arMvp from "@/data/arabic_data/services/web_and_saas_development/mvps.json";
import arSaas from "@/data/arabic_data/services/web_and_saas_development/saas_plateform.json";
import arWebApp from "@/data/arabic_data/services/web_and_saas_development/web_applications.json";

// GERMAN
import deAiPoweredApp from "@/data/german_data/services/web_and_saas_development/ai_powered_app.json";
import deApiIntegration from "@/data/german_data/services/web_and_saas_development/api_integration.json";
import deMobileApp from "@/data/german_data/services/web_and_saas_development/app_applications.json";
import deMvp from "@/data/german_data/services/web_and_saas_development/mvps.json";
import deSaas from "@/data/german_data/services/web_and_saas_development/saas_plateform.json";
import deWebApp from "@/data/german_data/services/web_and_saas_development/web_applications.json";

// SPANISH
import esAiPoweredApp from "@/data/spanish_data/services/web_and_saas_development/ai_powered_app.json";
import esApiIntegration from "@/data/spanish_data/services/web_and_saas_development/api_integration.json";
import esMobileApp from "@/data/spanish_data/services/web_and_saas_development/app_applications.json";
import esMvp from "@/data/spanish_data/services/web_and_saas_development/mvps.json";
import esSaas from "@/data/spanish_data/services/web_and_saas_development/saas_plateform.json";
import esWebApp from "@/data/spanish_data/services/web_and_saas_development/web_applications.json";

// CHINESE
import zhAiPoweredApp from "@/data/chinese_data/services/web_and_saas_development/ai_powered_app.json";
import zhApiIntegration from "@/data/chinese_data/services/web_and_saas_development/api_integration.json";
import zhMobileApp from "@/data/chinese_data/services/web_and_saas_development/app_applications.json";
import zhMvp from "@/data/chinese_data/services/web_and_saas_development/mvps.json";
import zhSaas from "@/data/chinese_data/services/web_and_saas_development/saas_plateform.json";
import zhWebApp from "@/data/chinese_data/services/web_and_saas_development/web_applications.json";

// FRENCH
import frAiPoweredApp from "@/data/french_data/services/web_and_saas_development/ai_powered_app.json";
import frApiIntegration from "@/data/french_data/services/web_and_saas_development/api_integration.json";
import frMobileApp from "@/data/french_data/services/web_and_saas_development/app_applications.json";
import frMvp from "@/data/french_data/services/web_and_saas_development/mvps.json";
import frSaas from "@/data/french_data/services/web_and_saas_development/saas_plateform.json";
import frWebApp from "@/data/french_data/services/web_and_saas_development/web_applications.json";

const webAndSaasEntries = (
  aiPoweredApp: ServiceDetailData,
  apiIntegration: ServiceDetailData,
  mobileApp: ServiceDetailData,
  mvp: ServiceDetailData,
  saas: ServiceDetailData,
  webApp: ServiceDetailData,
) => ({
  "ai-powered-app": aiPoweredApp,
  "api-integration": apiIntegration,
  "api_integration": apiIntegration,
  "app-applications": mobileApp,
  "app_applications": mobileApp,
  "mobile-app-development": mobileApp,
  "mvps": mvp,
  "mvps-pocs": mvp,
  "saas-development": saas,
  "saas-platform": saas,
  "saas_plateform": saas,
  "web-application-development": webApp,
  "web-applications": webApp,
  "web_applications": webApp,
});

export const workflowData: Record<string, Record<string, ServiceDetailData>> = {
  en: webAndSaasEntries(enAiPoweredApp, enApiIntegration, enMobileApp, enMvp, enSaas, enWebApp),
  ur: webAndSaasEntries(urAiPoweredApp, urApiIntegration, urMobileApp, urMvp, urSaas, urWebApp),
  ar: webAndSaasEntries(arAiPoweredApp, arApiIntegration, arMobileApp, arMvp, arSaas, arWebApp),
  es: webAndSaasEntries(esAiPoweredApp, esApiIntegration, esMobileApp, esMvp, esSaas, esWebApp),
  de: webAndSaasEntries(deAiPoweredApp, deApiIntegration, deMobileApp, deMvp, deSaas, deWebApp),
  zh: webAndSaasEntries(zhAiPoweredApp, zhApiIntegration, zhMobileApp, zhMvp, zhSaas, zhWebApp),
  fr: webAndSaasEntries(frAiPoweredApp, frApiIntegration, frMobileApp, frMvp, frSaas, frWebApp),
};
                                                                                                    
