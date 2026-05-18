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

import enAiPoweredApp from "@/data/english_data/services/web_and_saas_development/ai_powered_app.json";
import enApiIntegration from "@/data/english_data/services/web_and_saas_development/api_integration.json";
import enAppApplications from "@/data/english_data/services/web_and_saas_development/app_applications.json";
import enMvps from "@/data/english_data/services/web_and_saas_development/mvps.json";
import enSaasPlateform from "@/data/english_data/services/web_and_saas_development/saas_plateform.json";
import enSearchEngineOptimization from "@/data/english_data/services/web_and_saas_development/search_engine_optimization.json";
import enWebApplications from "@/data/english_data/services/web_and_saas_development/web_applications.json";
import enWebDevelopment from "@/data/english_data/services/web_and_saas_development/web_development.json";

import urAiPoweredApp from "@/data/urdu_data/services/web_and_saas_development/ai_powered_app.json";
import urApiIntegration from "@/data/urdu_data/services/web_and_saas_development/api_integration.json";
import urAppApplications from "@/data/urdu_data/services/web_and_saas_development/app_applications.json";
import urMvps from "@/data/urdu_data/services/web_and_saas_development/mvps.json";
import urSaasPlateform from "@/data/urdu_data/services/web_and_saas_development/saas_plateform.json";
import urSearchEngineOptimization from "@/data/urdu_data/services/web_and_saas_development/search_engine_optimization.json";
import urWebApplications from "@/data/urdu_data/services/web_and_saas_development/web_applications.json";
import urWebDevelopment from "@/data/urdu_data/services/web_and_saas_development/web_development.json";

import arAiPoweredApp from "@/data/arabic_data/services/web_and_saas_development/ai_powered_app.json";
import arApiIntegration from "@/data/arabic_data/services/web_and_saas_development/api_integration.json";
import arAppApplications from "@/data/arabic_data/services/web_and_saas_development/app_applications.json";
import arMvps from "@/data/arabic_data/services/web_and_saas_development/mvps.json";
import arSaasPlateform from "@/data/arabic_data/services/web_and_saas_development/saas_plateform.json";
import arSearchEngineOptimization from "@/data/arabic_data/services/web_and_saas_development/search_engine_optimization.json";
import arWebApplications from "@/data/arabic_data/services/web_and_saas_development/web_applications.json";
import arWebDevelopment from "@/data/arabic_data/services/web_and_saas_development/web_development.json";

import deAiPoweredApp from "@/data/german_data/services/web_and_saas_development/ai_powered_app.json";
import deApiIntegration from "@/data/german_data/services/web_and_saas_development/api_integration.json";
import deAppApplications from "@/data/german_data/services/web_and_saas_development/app_applications.json";
import deMvps from "@/data/german_data/services/web_and_saas_development/mvps.json";
import deSaasPlateform from "@/data/german_data/services/web_and_saas_development/saas_plateform.json";
import deSearchEngineOptimization from "@/data/german_data/services/web_and_saas_development/search_engine_optimization.json";
import deWebApplications from "@/data/german_data/services/web_and_saas_development/web_applications.json";
import deWebDevelopment from "@/data/german_data/services/web_and_saas_development/web_development.json";

import esAiPoweredApp from "@/data/spanish_data/services/web_and_saas_development/ai_powered_app.json";
import esApiIntegration from "@/data/spanish_data/services/web_and_saas_development/api_integration.json";
import esAppApplications from "@/data/spanish_data/services/web_and_saas_development/app_applications.json";
import esMvps from "@/data/spanish_data/services/web_and_saas_development/mvps.json";
import esSaasPlateform from "@/data/spanish_data/services/web_and_saas_development/saas_plateform.json";
import esSearchEngineOptimization from "@/data/spanish_data/services/web_and_saas_development/search_engine_optimization.json";
import esWebApplications from "@/data/spanish_data/services/web_and_saas_development/web_applications.json";
import esWebDevelopment from "@/data/spanish_data/services/web_and_saas_development/web_development.json";

import zhAiPoweredApp from "@/data/chinese_data/services/web_and_saas_development/ai_powered_app.json";
import zhApiIntegration from "@/data/chinese_data/services/web_and_saas_development/api_integration.json";
import zhAppApplications from "@/data/chinese_data/services/web_and_saas_development/app_applications.json";
import zhMvps from "@/data/chinese_data/services/web_and_saas_development/mvps.json";
import zhSaasPlateform from "@/data/chinese_data/services/web_and_saas_development/saas_plateform.json";
import zhSearchEngineOptimization from "@/data/chinese_data/services/web_and_saas_development/search_engine_optimization.json";
import zhWebApplications from "@/data/chinese_data/services/web_and_saas_development/web_applications.json";
import zhWebDevelopment from "@/data/chinese_data/services/web_and_saas_development/web_development.json";

import frAiPoweredApp from "@/data/french_data/services/web_and_saas_development/ai_powered_app.json";
import frApiIntegration from "@/data/french_data/services/web_and_saas_development/api_integration.json";
import frAppApplications from "@/data/french_data/services/web_and_saas_development/app_applications.json";
import frMvps from "@/data/french_data/services/web_and_saas_development/mvps.json";
import frSaasPlateform from "@/data/french_data/services/web_and_saas_development/saas_plateform.json";
import frSearchEngineOptimization from "@/data/french_data/services/web_and_saas_development/search_engine_optimization.json";
import frWebApplications from "@/data/french_data/services/web_and_saas_development/web_applications.json";
import frWebDevelopment from "@/data/french_data/services/web_and_saas_development/web_development.json";

const serviceEntries = (aiPoweredApp: ServiceDetailData, apiIntegration: ServiceDetailData, appApplications: ServiceDetailData, mvps: ServiceDetailData, saasPlateform: ServiceDetailData, searchEngineOptimization: ServiceDetailData, webApplications: ServiceDetailData, webDevelopment: ServiceDetailData) => ({
  "ai-powered-app": aiPoweredApp,
  "api-integration": apiIntegration,
  "mobile-app-development": appApplications,
  "app-applications": appApplications,
  "mvps": mvps,
  "mvps-pocs": mvps,
  "saas-development": saasPlateform,
  "saas-platform": saasPlateform,
  "saas-plateform": saasPlateform,
  "search-engine-optimization": searchEngineOptimization,
  "web-application-development": webApplications,
  "web-applications": webApplications,
  "website-development": webDevelopment,
  "web-development": webDevelopment,
});

export const workflowData: Record<string, Record<string, ServiceDetailData>> = {
  en: serviceEntries(enAiPoweredApp, enApiIntegration, enAppApplications, enMvps, enSaasPlateform, enSearchEngineOptimization, enWebApplications, enWebDevelopment),
  ur: serviceEntries(urAiPoweredApp, urApiIntegration, urAppApplications, urMvps, urSaasPlateform, urSearchEngineOptimization, urWebApplications, urWebDevelopment),
  ar: serviceEntries(arAiPoweredApp, arApiIntegration, arAppApplications, arMvps, arSaasPlateform, arSearchEngineOptimization, arWebApplications, arWebDevelopment),
  de: serviceEntries(deAiPoweredApp, deApiIntegration, deAppApplications, deMvps, deSaasPlateform, deSearchEngineOptimization, deWebApplications, deWebDevelopment),
  es: serviceEntries(esAiPoweredApp, esApiIntegration, esAppApplications, esMvps, esSaasPlateform, esSearchEngineOptimization, esWebApplications, esWebDevelopment),
  zh: serviceEntries(zhAiPoweredApp, zhApiIntegration, zhAppApplications, zhMvps, zhSaasPlateform, zhSearchEngineOptimization, zhWebApplications, zhWebDevelopment),
  fr: serviceEntries(frAiPoweredApp, frApiIntegration, frAppApplications, frMvps, frSaasPlateform, frSearchEngineOptimization, frWebApplications, frWebDevelopment),
};
