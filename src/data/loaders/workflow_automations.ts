// ENGLISH
import enAi from "@/data/english_data/services/workflow_automations/ai_powered_automation.json";
import enLow from "@/data/english_data/services/workflow_automations/low_code_automations.json";
import enNo from "@/data/english_data/services/workflow_automations/no_code_automations.json";
import enbpa from "@/data/english_data/services/workflow_automations/business_process_automation.json"
// URDU
import urAi from "@/data/urdu_data/services/workflow_automations/ai_powered_automation.json";
import urLow from "@/data/urdu_data/services/workflow_automations/low_code_automations.json";
import urNo from "@/data/urdu_data/services/workflow_automations/no_code_automations.json";
import urbpa from "@/data/urdu_data/services/workflow_automations/business_process_automation.json"

// ARABIC
import arAi from "@/data/arabic_data/services/workflow_automations/ai_powered_automation.json";
import arLow from "@/data/arabic_data/services/workflow_automations/low_code_automations.json";
import arNo from "@/data/arabic_data/services/workflow_automations/no_code_automations.json";
import arbpa from "@/data/arabic_data/services/workflow_automations/business_process_automation.json"

//spanish
import spAi from "@/data/spanish_data/services/workflow_automations/ai_powered_automation.json";
import spLow from "@/data/spanish_data/services/workflow_automations/low_code_automations.json";
import spNo from "@/data/spanish_data/services/workflow_automations/no_code_automations.json";
import spbpa from "@/data/spanish_data/services/workflow_automations/business_process_automation.json"

//germam
import grAi from "@/data/german_data/services/workflow_automations/ai_powered_automation.json";
import grLow from "@/data/german_data/services/workflow_automations/low_code_automations.json";
import grNo from "@/data/german_data/services/workflow_automations/no_code_automations.json";
import grbpa from "@/data/german_data/services/workflow_automations/business_process_automation.json"

//chainese
import chAi from "@/data/chinese_data/services/workflow_automations/ai_powered_automation.json";
import chLow from "@/data/chinese_data/services/workflow_automations/low_code_automations.json";
import chNo from "@/data/chinese_data/services/workflow_automations/no_code_automations.json";
import chbpa from "@/data/chinese_data/services/workflow_automations/business_process_automation.json"

//french
import frAi from "@/data/french_data/services/workflow_automations/ai_powered_automation.json";
import frLow from "@/data/french_data/services/workflow_automations/low_code_automations.json";
import frNo from "@/data/french_data/services/workflow_automations/no_code_automations.json";
import frbpa from "@/data/french_data/services/workflow_automations/business_process_automation.json"


export const workflowData: Record<string, Record<string, any>> = {
  en: {
    "ai_powered_automation": enAi, 
    "low_code_automations": enLow,
    "no_code_automations": enNo,
    "business_process_automation":enbpa
  },
  ur: {
    "ai_powered_automation": urAi,
    "low_code_automations": urLow,
    "no_code_automations": urNo,
        "business_process_automation":urbpa

  },
  ar: {
    "ai_powered_automation": arAi,
    "low_code_automations": arLow,
    "no_code_automations": arNo,
        "business_process_automation":arbpa

  },
   de: {
    "ai_powered_automation": grAi,
    "low_code_automations": grLow,
    "no_code_automations": grNo,
        "business_process_automation":grbpa

  }, fr: {
    "ai_powered_automation": frAi,
    "low_code_automations": frLow,
    "no_code_automations": frNo,
        "business_process_automation":frbpa

  }, es: {
    "ai_powered_automation": spAi,
    "low_code_automations": spLow,
    "no_code_automations": spNo,
        "business_process_automation":spbpa

  }, zh: {
    "ai_powered_automation": chAi,
    "low_code_automations": chLow,
    "no_code_automations": chNo,
        "business_process_automation":chbpa

  },
};