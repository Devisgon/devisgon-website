// ENGLISH
import enAi from "@/data/english_data/services/workflow_automations/ai_powered_automation.json";
import enLow from "@/data/english_data/services/workflow_automations/low_code_automations.json";
import enNo from "@/data/english_data/services/workflow_automations/no_code_automations.json";
import enbpa from "@/data/english_data/services/workflow_automations/business_process_automation.json"
import enRpa from "@/data/english_data/services/workflow_automations/robotic_process_automation.json"
import enFa from "@/data/english_data/services/workflow_automations/accounting.json"
import enDia from "@/data/english_data/services/workflow_automations/infrastructure_automation.json"
import enMsa from "@/data/english_data/services/workflow_automations/marketing_sales_automation.json"
import enApi from "@/data/english_data/services/workflow_automations/api_integration.json"
// URDU
import urAi from "@/data/urdu_data/services/workflow_automations/ai_powered_automation.json";
import urLow from "@/data/urdu_data/services/workflow_automations/low_code_automations.json";
import urNo from "@/data/urdu_data/services/workflow_automations/no_code_automations.json";
import urbpa from "@/data/urdu_data/services/workflow_automations/business_process_automation.json"
import urRpa from "@/data/urdu_data/services/workflow_automations/robotic_process_automation.json"
import urFa from "@/data/urdu_data/services/workflow_automations/accounting.json"
import urDia from "@/data/urdu_data/services/workflow_automations/infrastructure_automation.json"
import urMsa from "@/data/urdu_data/services/workflow_automations/marketing_sales_automation.json"
import urApi from "@/data/urdu_data/services/workflow_automations/api_integration.json"

// ARABIC
import arAi from "@/data/arabic_data/services/workflow_automations/ai_powered_automation.json";
import arLow from "@/data/arabic_data/services/workflow_automations/low_code_automations.json";
import arNo from "@/data/arabic_data/services/workflow_automations/no_code_automations.json";
import arbpa from "@/data/arabic_data/services/workflow_automations/business_process_automation.json"
import arRpa from "@/data/arabic_data/services/workflow_automations/robotic_process_automation.json"
import arFa from "@/data/arabic_data/services/workflow_automations/accounting.json"
import arDia from "@/data/arabic_data/services/workflow_automations/infrastructure_automation.json"
import arMsa from "@/data/arabic_data/services/workflow_automations/marketing_sales_automation.json"
import arApi from "@/data/arabic_data/services/workflow_automations/api_integration.json"

//spanish
import spAi from "@/data/spanish_data/services/workflow_automations/ai_powered_automation.json";
import spLow from "@/data/spanish_data/services/workflow_automations/low_code_automations.json";
import spNo from "@/data/spanish_data/services/workflow_automations/no_code_automations.json";
import spbpa from "@/data/spanish_data/services/workflow_automations/business_process_automation.json"
import spRpa from "@/data/spanish_data/services/workflow_automations/robotic_process_automation.json"
import spFa from "@/data/spanish_data/services/workflow_automations/accounting.json"
import spDia from "@/data/spanish_data/services/workflow_automations/infrastructure_automation.json"
import spMsa from "@/data/spanish_data/services/workflow_automations/marketing_sales_automation.json"
import spApi from "@/data/spanish_data/services/workflow_automations/api_integration.json"

//germam
import grAi from "@/data/german_data/services/workflow_automations/ai_powered_automation.json";
import grLow from "@/data/german_data/services/workflow_automations/low_code_automations.json";
import grNo from "@/data/german_data/services/workflow_automations/no_code_automations.json";
import grbpa from "@/data/german_data/services/workflow_automations/business_process_automation.json"
import grRpa from "@/data/german_data/services/workflow_automations/robotic_process_automation.json"
import grFa from "@/data/german_data/services/workflow_automations/accounting.json"
import grDia from "@/data/german_data/services/workflow_automations/infrastructure_automation.json"
import grMsa from "@/data/german_data/services/workflow_automations/marketing_sales_automation.json"
import grApi from "@/data/german_data/services/workflow_automations/api_integration.json"

//chainese
import chAi from "@/data/chinese_data/services/workflow_automations/ai_powered_automation.json";
import chLow from "@/data/chinese_data/services/workflow_automations/low_code_automations.json";
import chNo from "@/data/chinese_data/services/workflow_automations/no_code_automations.json";
import chbpa from "@/data/chinese_data/services/workflow_automations/business_process_automation.json"
import chRpa from "@/data/chinese_data/services/workflow_automations/robotic_process_automation.json"
import chFa from "@/data/chinese_data/services/workflow_automations/accounting.json"
import chDia from "@/data/chinese_data/services/workflow_automations/infrastructure_automation.json"
import chMsa from "@/data/chinese_data/services/workflow_automations/marketing_sales_automation.json"
import chApi from "@/data/chinese_data/services/workflow_automations/api_integration.json"

//french
import frAi from "@/data/french_data/services/workflow_automations/ai_powered_automation.json";
import frLow from "@/data/french_data/services/workflow_automations/low_code_automations.json";
import frNo from "@/data/french_data/services/workflow_automations/no_code_automations.json";
import frbpa from "@/data/french_data/services/workflow_automations/business_process_automation.json"
import frRpa from "@/data/french_data/services/workflow_automations/robotic_process_automation.json"
import frFa from "@/data/french_data/services/workflow_automations/accounting.json"
import frDia from "@/data/french_data/services/workflow_automations/infrastructure_automation.json"
import frMsa from "@/data/french_data/services/workflow_automations/marketing_sales_automation.json"
import frApi from "@/data/french_data/services/workflow_automations/api_integration.json"


export const workflowData: Record<string, Record<string, any>> = {
  en: {
    "ai_powered_automation": enAi,
    "low_code_automations": enLow,
    "no_code_automations": enNo,
    "business_process_automation": enbpa,
    "accounting": enFa,
    "api_integration": enApi,
    "devops-infrastructure-automation": enDia,
    "marketing-sales-automation": enMsa,
    "robotic-process-automation": enRpa
  },
  ur: {
    "ai_powered_automation": urAi,
    "low_code_automations": urLow,
    "no_code_automations": urNo,
    "business_process_automation": urbpa,
    "accounting": urFa,
    "api_integration": urApi,
    "devops-infrastructure-automation": urDia,
    "marketing-sales-automation": urMsa,
    "robotic-process-automation": urRpa
  },
  ar: {
    "ai_powered_automation": arAi,
    "low_code_automations": arLow,
    "no_code_automations": arNo,
    "business_process_automation": arbpa,
    "accounting": arFa,
    "api_integration": arApi,
    "devops-infrastructure-automation": arDia,
    "marketing-sales-automation": arMsa,
    "robotic-process-automation": arRpa
  },
  de: {
    "ai_powered_automation": grAi,
    "low_code_automations": grLow,
    "no_code_automations": grNo,
    "business_process_automation": grbpa,
    "accounting": grFa,
    "api_integration": grApi,
    "devops-infrastructure-automation": grDia,
    "marketing-sales-automation": grMsa,
    "robotic-process-automation": grRpa
  },
  fr: {
    "ai_powered_automation": frAi,
    "low_code_automations": frLow,
    "no_code_automations": frNo,
    "business_process_automation": frbpa,
    "accounting": frFa,
    "api_integration": frApi,
    "devops-infrastructure-automation": frDia,
    "marketing-sales-automation": frMsa,
    "robotic-process-automation": frRpa
  },
  es: {
    "ai_powered_automation": spAi,
    "low_code_automations": spLow,
    "no_code_automations": spNo,
    "business_process_automation": spbpa,
    "accounting": spFa,
    "api_integration": spApi,
    "devops-infrastructure-automation": spDia,
    "marketing-sales-automation": spMsa,
    "robotic-process-automation": spRpa
  },
  zh: {
    "ai_powered_automation": chAi,
    "low_code_automations": chLow,
    "no_code_automations": chNo,
    "business_process_automation": chbpa,
    "accounting": chFa,
    "api_integration": chApi,
    "devops-infrastructure-automation": chDia,
    "marketing-sales-automation": chMsa,
    "robotic-process-automation": chRpa
  }
};
