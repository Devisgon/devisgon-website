

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


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const workflowData: Record<string, Record<string, any>> = {
  en: {
    "ai_powered_app": enAi, 
    "machine-learning": enmi,
    "meachine_learning": enmi,
    "saas-development": ensaas,
    "mvps": enmvp,

  },
   ur: {
    "ai_powered_app": urAi, 
    "machine-learning": urmi,
    "meachine_learning": urmi,
    "saas-development": ursaas,
    "mvps": urmvp,

  }, ar: {
    "ai_powered_app": arAi, 
    "machine-learning": armi,
    "meachine_learning": armi,
    "saas-development": arsaas,
    "mvps": armvp,

  }, es: {
    "ai_powered_app": spAi, 
    "machine-learning": spmi,
    "meachine_learning": spmi,
    "saas-development": spsaas,
    "mvps": spmvp,

  }, de: {
    "ai_powered_app": grAi, 
    "machine-learning": grmi,
    "meachine_learning": grmi,
    "saas-development": grsaas,
    "mvps": grmvp,

  }, zh: {
    "ai_powered_app": chAi, 
    "machine-learning": chmi,
    "meachine_learning": chmi,
    "saas-development": chsaas,
    "mvps": chmvp,

  }, fr: {
    "ai_powered_app": frAi, 
    "machine-learning": frmi,
    "meachine_learning": frmi,
    "saas-development": frsaas,
    "mvps": frmvp,

  }, 

};
