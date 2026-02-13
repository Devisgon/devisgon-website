// ENGLISH
import enAi from "@/data/english_data/services/ai_and_saas_developments/ai_powered_app.json";
import enmi from "@/data/english_data/services/ai_and_saas_developments/meachine_learning.json";
import enmvp from "@/data/english_data/services/ai_and_saas_developments/mvps.json";
import ensaas from "@/data/english_data/services/ai_and_saas_developments/saas_plateform.json";


// URDU
import urAi from "@/data/urdu_data/services/ai_and_saas_developments/ai_powered_app.json";
import urmi from "@/data/urdu_data/services/ai_and_saas_developments/meachine_learning.json";
import urmvp from "@/data/urdu_data/services/ai_and_saas_developments/mvps.json";
import ursaas from "@/data/urdu_data/services/ai_and_saas_developments/saas_plateform.json";

// ARABIC
import arAi from "@/data/arabic_data/services/ai_and_saas_developments/ai_powered_app.json";
import armi from "@/data/arabic_data/services/ai_and_saas_developments/meachine_learning.json";
import armvp from "@/data/arabic_data/services/ai_and_saas_developments/mvps.json";
import arsaas from "@/data/arabic_data/services/ai_and_saas_developments/saas_plateform.json";

//german
import grAi from "@/data/german_data/services/ai_and_saas_developments/ai_powered_app.json";
import grmi from "@/data/german_data/services/ai_and_saas_developments/meachine_learning.json";
import grmvp from "@/data/german_data/services/ai_and_saas_developments/mvps.json";
import grsaas from "@/data/german_data/services/ai_and_saas_developments/saas_plateform.json";

//spanish
import spAi from "@/data/spanish_data/services/ai_and_saas_developments/ai_powered_app.json";
import spmi from "@/data/spanish_data/services/ai_and_saas_developments/meachine_learning.json";
import spmvp from "@/data/spanish_data/services/ai_and_saas_developments/mvps.json";
import spsaas from "@/data/spanish_data/services/ai_and_saas_developments/saas_plateform.json";

//chineas
import chAi from "@/data/chinese_data/services/ai_and_saas_developments/ai_powered_app.json";
import chmi from "@/data/chinese_data/services/ai_and_saas_developments/meachine_learning.json";
import chmvp from "@/data/chinese_data/services/ai_and_saas_developments/mvps.json";
import chsaas from "@/data/chinese_data/services/ai_and_saas_developments/saas_plateform.json";


//french 
import frAi from "@/data/french_data/services/ai_and_saas_developments/ai_powered_app.json";
import frmi from "@/data/french_data/services/ai_and_saas_developments/meachine_learning.json";
import frmvp from "@/data/french_data/services/ai_and_saas_developments/mvps.json";
import frsaas from "@/data/french_data/services/ai_and_saas_developments/saas_plateform.json";



export const workflowData: Record<string, Record<string, any>> = {
  en: {
    "ai_powered_app": enAi, 
    "meachine_learning": enmi,
    "saas_plateform": ensaas,
    "mvps": enmvp,

  },
   ur: {
    "ai_powered_app": urAi, 
    "meachine_learning": urmi,
    "saas_plateform": ursaas,
    "mvps": urmvp,

  }, ar: {
    "ai_powered_app": arAi, 
    "meachine_learning": armi,
    "saas_plateform": arsaas,
    "mvps": armvp,

  }, es: {
    "ai_powered_app": spAi, 
    "meachine_learning": spmi,
    "saas_plateform": spsaas,
    "mvps": spmvp,

  }, de: {
    "ai_powered_app": grAi, 
    "meachine_learning": grmi,
    "saas_plateform": grsaas,
    "mvps": grmvp,

  }, zh: {
    "ai_powered_app": chAi, 
    "meachine_learning": chmi,
    "saas_plateform": chsaas,
    "mvps": chmvp,

  }, fr: {
    "ai_powered_app": frAi, 
    "meachine_learning": frmi,
    "saas_plateform": frsaas,
    "mvps": frmvp,

  }, 

};