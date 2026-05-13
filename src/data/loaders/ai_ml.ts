// ENGLISH
import enAiModels from "@/data/english_data/services/ai_and_ml/ai_ml_models.json";
import enCustomBots from "@/data/english_data/services/ai_and_ml/custom_bots.json";
import enMachineLearning from "@/data/english_data/services/ai_and_ml/meachine_learning.json";

// URDU
import urAiModels from "@/data/urdu_data/services/ai_and_ml/ai_ml_models.json";
import urCustomBots from "@/data/urdu_data/services/ai_and_ml/custom_bots.json";
import urMachineLearning from "@/data/urdu_data/services/ai_and_ml/meachine_learning.json";

// ARABIC
import arAiModels from "@/data/arabic_data/services/ai_and_ml/ai_ml_models.json";
import arCustomBots from "@/data/arabic_data/services/ai_and_ml/custom_bots.json";
import arMachineLearning from "@/data/arabic_data/services/ai_and_ml/meachine_learning.json";

// GERMAN
import deAiModels from "@/data/german_data/services/ai_and_ml/ai_ml_models.json";
import deCustomBots from "@/data/german_data/services/ai_and_ml/custom_bots.json";
import deMachineLearning from "@/data/german_data/services/ai_and_ml/meachine_learning.json";

// SPANISH
import esAiModels from "@/data/spanish_data/services/ai_and_ml/ai_ml_models.json";
import esCustomBots from "@/data/spanish_data/services/ai_and_ml/custom_bots.json";
import esMachineLearning from "@/data/spanish_data/services/ai_and_ml/meachine_learning.json";

// CHINESE
import zhAiModels from "@/data/chinese_data/services/ai_and_ml/ai_ml_models.json";
import zhCustomBots from "@/data/chinese_data/services/ai_and_ml/custom_bots.json";
import zhMachineLearning from "@/data/chinese_data/services/ai_and_ml/meachine_learning.json";

// FRENCH
import frAiModels from "@/data/french_data/services/ai_and_ml/ai_ml_models.json";
import frCustomBots from "@/data/french_data/services/ai_and_ml/custom_bots.json";
import frMachineLearning from "@/data/french_data/services/ai_and_ml/meachine_learning.json";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const workflowData: Record<string, Record<string, any>> = {
  en: {
    "ai-ml-models": enAiModels,
    "custom-bots": enCustomBots,
    "machine-learning": enMachineLearning,
  },
  ur: {
    "ai-ml-models": urAiModels,
    "custom-bots": urCustomBots,
    "machine-learning": urMachineLearning,
  },
  ar: {
    "ai-ml-models": arAiModels,
    "custom-bots": arCustomBots,
    "machine-learning": arMachineLearning,
  },
  es: {
    "ai-ml-models": esAiModels,
    "custom-bots": esCustomBots,
    "machine-learning": esMachineLearning,
  },
  de: {
    "ai-ml-models": deAiModels,
    "custom-bots": deCustomBots,
    "machine-learning": deMachineLearning,
  },
  zh: {
    "ai-ml-models": zhAiModels,
    "custom-bots": zhCustomBots,
    "machine-learning": zhMachineLearning,
  },
  fr: {
    "ai-ml-models": frAiModels,
    "custom-bots": frCustomBots,
    "machine-learning": frMachineLearning,
  },
};
