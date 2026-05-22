// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ServiceDetailData = any;

import enBusinessAnalytics from "@/data/english_data/services/data_solutions/business_analytics.json";
import enCLevelDashboard from "@/data/english_data/services/data_solutions/c_level_dashboard.json";
import enWorkflowDiagram from "@/data/english_data/services/data_solutions/workflow_diagram.json";
import enDataAnalyticsDashboard from "@/data/english_data/services/data_solutions/data_analytics_dashboard.json";
import enDataScraping from "@/data/english_data/services/data_solutions/data_scraping.json";
import enMarketingDashboard from "@/data/english_data/services/data_solutions/marketing_dashboard.json";

import urBusinessAnalytics from "@/data/urdu_data/services/data_solutions/business_analytics.json";
import urCLevelDashboard from "@/data/urdu_data/services/data_solutions/c_level_dashboard.json";
import urWorkflowDiagram from "@/data/urdu_data/services/data_solutions/workflow_diagram.json";
import urDataAnalyticsDashboard from "@/data/urdu_data/services/data_solutions/data_analytics_dashboard.json";
import urDataScraping from "@/data/urdu_data/services/data_solutions/data_scraping.json";
import urMarketingDashboard from "@/data/urdu_data/services/data_solutions/marketing_dashboard.json";

import arBusinessAnalytics from "@/data/arabic_data/services/data_solutions/business_analytics.json";
import arCLevelDashboard from "@/data/arabic_data/services/data_solutions/c_level_dashboard.json";
import arWorkflowDiagram from "@/data/arabic_data/services/data_solutions/workflow_diagram.json";
import arDataAnalyticsDashboard from "@/data/arabic_data/services/data_solutions/data_analytics_dashboard.json";
import arDataScraping from "@/data/arabic_data/services/data_solutions/data_scraping.json";
import arMarketingDashboard from "@/data/arabic_data/services/data_solutions/marketing_dashboard.json";

import deBusinessAnalytics from "@/data/german_data/services/data_solutions/business_analytics.json";
import deCLevelDashboard from "@/data/german_data/services/data_solutions/c_level_dashboard.json";
import deWorkflowDiagram from "@/data/german_data/services/data_solutions/workflow_diagram.json";
import deDataAnalyticsDashboard from "@/data/german_data/services/data_solutions/data_analytics_dashboard.json";
import deDataScraping from "@/data/german_data/services/data_solutions/data_scraping.json";
import deMarketingDashboard from "@/data/german_data/services/data_solutions/marketing_dashboard.json";

import esBusinessAnalytics from "@/data/spanish_data/services/data_solutions/business_analytics.json";
import esCLevelDashboard from "@/data/spanish_data/services/data_solutions/c_level_dashboard.json";
import esWorkflowDiagram from "@/data/spanish_data/services/data_solutions/workflow_diagram.json";
import esDataAnalyticsDashboard from "@/data/spanish_data/services/data_solutions/data_analytics_dashboard.json";
import esDataScraping from "@/data/spanish_data/services/data_solutions/data_scraping.json";
import esMarketingDashboard from "@/data/spanish_data/services/data_solutions/marketing_dashboard.json";

import zhBusinessAnalytics from "@/data/chinese_data/services/data_solutions/business_analytics.json";
import zhCLevelDashboard from "@/data/chinese_data/services/data_solutions/c_level_dashboard.json";
import zhWorkflowDiagram from "@/data/chinese_data/services/data_solutions/workflow_diagram.json";
import zhDataAnalyticsDashboard from "@/data/chinese_data/services/data_solutions/data_analytics_dashboard.json";
import zhDataScraping from "@/data/chinese_data/services/data_solutions/data_scraping.json";
import zhMarketingDashboard from "@/data/chinese_data/services/data_solutions/marketing_dashboard.json";

import frBusinessAnalytics from "@/data/french_data/services/data_solutions/business_analytics.json";
import frCLevelDashboard from "@/data/french_data/services/data_solutions/c_level_dashboard.json";
import frWorkflowDiagram from "@/data/french_data/services/data_solutions/workflow_diagram.json";
import frDataAnalyticsDashboard from "@/data/french_data/services/data_solutions/data_analytics_dashboard.json";
import frDataScraping from "@/data/french_data/services/data_solutions/data_scraping.json";
import frMarketingDashboard from "@/data/french_data/services/data_solutions/marketing_dashboard.json";

const serviceEntries = (businessAnalytics: ServiceDetailData, cLevelDashboard: ServiceDetailData, workflowDiagram: ServiceDetailData, dataAnalyticsDashboard: ServiceDetailData, dataScraping: ServiceDetailData, marketingDashboard: ServiceDetailData) => ({
  "business-analytics": businessAnalytics,
  "c-level-dashboard": cLevelDashboard,
  "code-architecture-diagrams": workflowDiagram,
  "workflow-diagram": workflowDiagram,
  "data-analytics-dashboard": dataAnalyticsDashboard,
  "data-scraping": dataScraping,
  "marketing-dashboard": marketingDashboard,
});

export const workflowData: Record<string, Record<string, ServiceDetailData>> = {
  en: serviceEntries(enBusinessAnalytics, enCLevelDashboard, enWorkflowDiagram, enDataAnalyticsDashboard, enDataScraping, enMarketingDashboard),
  ur: serviceEntries(urBusinessAnalytics, urCLevelDashboard, urWorkflowDiagram, urDataAnalyticsDashboard, urDataScraping, urMarketingDashboard),
  ar: serviceEntries(arBusinessAnalytics, arCLevelDashboard, arWorkflowDiagram, arDataAnalyticsDashboard, arDataScraping, arMarketingDashboard),
  de: serviceEntries(deBusinessAnalytics, deCLevelDashboard, deWorkflowDiagram, deDataAnalyticsDashboard, deDataScraping, deMarketingDashboard),
  es: serviceEntries(esBusinessAnalytics, esCLevelDashboard, esWorkflowDiagram, esDataAnalyticsDashboard, esDataScraping, esMarketingDashboard),
  zh: serviceEntries(zhBusinessAnalytics, zhCLevelDashboard, zhWorkflowDiagram, zhDataAnalyticsDashboard, zhDataScraping, zhMarketingDashboard),
  fr: serviceEntries(frBusinessAnalytics, frCLevelDashboard, frWorkflowDiagram, frDataAnalyticsDashboard, frDataScraping, frMarketingDashboard),
};
