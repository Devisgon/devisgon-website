// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ServiceDetailData = any;

import enApiTesting from "@/data/english_data/services/testing/api_testing.json";
import enAutomationTesting from "@/data/english_data/services/testing/automation_testing.json";
import enBlackBoxTesting from "@/data/english_data/services/testing/black_box_testing.json";
import enBugBounty from "@/data/english_data/services/testing/bug_bounty.json";
import enLoadTesting from "@/data/english_data/services/testing/load_testing.json";
import enManualTesting from "@/data/english_data/services/testing/manual_testing.json";
import enPerformanceTesting from "@/data/english_data/services/testing/performance_testing.json";
import enSecurityTesting from "@/data/english_data/services/testing/security_testing.json";

import urApiTesting from "@/data/urdu_data/services/testing/api_testing.json";
import urAutomationTesting from "@/data/urdu_data/services/testing/automation_testing.json";
import urBlackBoxTesting from "@/data/urdu_data/services/testing/black_box_testing.json";
import urBugBounty from "@/data/urdu_data/services/testing/bug_bounty.json";
import urLoadTesting from "@/data/urdu_data/services/testing/load_testing.json";
import urManualTesting from "@/data/urdu_data/services/testing/manual_testing.json";
import urPerformanceTesting from "@/data/urdu_data/services/testing/performance_testing.json";
import urSecurityTesting from "@/data/urdu_data/services/testing/security_testing.json";

import arApiTesting from "@/data/arabic_data/services/testing/api_testing.json";
import arAutomationTesting from "@/data/arabic_data/services/testing/automation_testing.json";
import arBlackBoxTesting from "@/data/arabic_data/services/testing/black_box_testing.json";
import arBugBounty from "@/data/arabic_data/services/testing/bug_bounty.json";
import arLoadTesting from "@/data/arabic_data/services/testing/load_testing.json";
import arManualTesting from "@/data/arabic_data/services/testing/manual_testing.json";
import arPerformanceTesting from "@/data/arabic_data/services/testing/performance_testing.json";
import arSecurityTesting from "@/data/arabic_data/services/testing/security_testing.json";

import deApiTesting from "@/data/german_data/services/testing/api_testing.json";
import deAutomationTesting from "@/data/german_data/services/testing/automation_testing.json";
import deBlackBoxTesting from "@/data/german_data/services/testing/black_box_testing.json";
import deBugBounty from "@/data/german_data/services/testing/bug_bounty.json";
import deLoadTesting from "@/data/german_data/services/testing/load_testing.json";
import deManualTesting from "@/data/german_data/services/testing/manual_testing.json";
import dePerformanceTesting from "@/data/german_data/services/testing/performance_testing.json";
import deSecurityTesting from "@/data/german_data/services/testing/security_testing.json";

import esApiTesting from "@/data/spanish_data/services/testing/api_testing.json";
import esAutomationTesting from "@/data/spanish_data/services/testing/automation_testing.json";
import esBlackBoxTesting from "@/data/spanish_data/services/testing/black_box_testing.json";
import esBugBounty from "@/data/spanish_data/services/testing/bug_bounty.json";
import esLoadTesting from "@/data/spanish_data/services/testing/load_testing.json";
import esManualTesting from "@/data/spanish_data/services/testing/manual_testing.json";
import esPerformanceTesting from "@/data/spanish_data/services/testing/performance_testing.json";
import esSecurityTesting from "@/data/spanish_data/services/testing/security_testing.json";

import zhApiTesting from "@/data/chinese_data/services/testing/api_testing.json";
import zhAutomationTesting from "@/data/chinese_data/services/testing/automation_testing.json";
import zhBlackBoxTesting from "@/data/chinese_data/services/testing/black_box_testing.json";
import zhBugBounty from "@/data/chinese_data/services/testing/bug_bounty.json";
import zhLoadTesting from "@/data/chinese_data/services/testing/load_testing.json";
import zhManualTesting from "@/data/chinese_data/services/testing/manual_testing.json";
import zhPerformanceTesting from "@/data/chinese_data/services/testing/performance_testing.json";
import zhSecurityTesting from "@/data/chinese_data/services/testing/security_testing.json";

import frApiTesting from "@/data/french_data/services/testing/api_testing.json";
import frAutomationTesting from "@/data/french_data/services/testing/automation_testing.json";
import frBlackBoxTesting from "@/data/french_data/services/testing/black_box_testing.json";
import frBugBounty from "@/data/french_data/services/testing/bug_bounty.json";
import frLoadTesting from "@/data/french_data/services/testing/load_testing.json";
import frManualTesting from "@/data/french_data/services/testing/manual_testing.json";
import frPerformanceTesting from "@/data/french_data/services/testing/performance_testing.json";
import frSecurityTesting from "@/data/french_data/services/testing/security_testing.json";

const serviceEntries = (apiTesting: ServiceDetailData, automationTesting: ServiceDetailData, blackBoxTesting: ServiceDetailData, bugBounty: ServiceDetailData, loadTesting: ServiceDetailData, manualTesting: ServiceDetailData, performanceTesting: ServiceDetailData, securityTesting: ServiceDetailData) => ({
  "api-testing": apiTesting,
  "automation-testing": automationTesting,
  "black-box-testing": blackBoxTesting,
  "bug-bounty": bugBounty,
  "load-testing": loadTesting,
  "manual-testing": manualTesting,
  "performance-testing": performanceTesting,
  "security-testing": securityTesting,
});

export const workflowData: Record<string, Record<string, ServiceDetailData>> = {
  en: serviceEntries(enApiTesting, enAutomationTesting, enBlackBoxTesting, enBugBounty, enLoadTesting, enManualTesting, enPerformanceTesting, enSecurityTesting),
  ur: serviceEntries(urApiTesting, urAutomationTesting, urBlackBoxTesting, urBugBounty, urLoadTesting, urManualTesting, urPerformanceTesting, urSecurityTesting),
  ar: serviceEntries(arApiTesting, arAutomationTesting, arBlackBoxTesting, arBugBounty, arLoadTesting, arManualTesting, arPerformanceTesting, arSecurityTesting),
  de: serviceEntries(deApiTesting, deAutomationTesting, deBlackBoxTesting, deBugBounty, deLoadTesting, deManualTesting, dePerformanceTesting, deSecurityTesting),
  es: serviceEntries(esApiTesting, esAutomationTesting, esBlackBoxTesting, esBugBounty, esLoadTesting, esManualTesting, esPerformanceTesting, esSecurityTesting),
  zh: serviceEntries(zhApiTesting, zhAutomationTesting, zhBlackBoxTesting, zhBugBounty, zhLoadTesting, zhManualTesting, zhPerformanceTesting, zhSecurityTesting),
  fr: serviceEntries(frApiTesting, frAutomationTesting, frBlackBoxTesting, frBugBounty, frLoadTesting, frManualTesting, frPerformanceTesting, frSecurityTesting),
};
