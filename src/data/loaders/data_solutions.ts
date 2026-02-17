// ENGLISH
import enml from "@/data/english_data/services/data_solutions/ai_ml_models.json";
import ends from "@/data/english_data/services/data_solutions/data_scraping.json";
import endad from "@/data/english_data/services/data_solutions/data_analytics_dashboard.json";
import enbn from "@/data/english_data/services/data_solutions/business_analytics.json";


// URDU
import urml from "@/data/urdu_data/services/data_solutions/ai_ml_models.json";
import urds from "@/data/urdu_data/services/data_solutions/data_scraping.json";
import urdad from "@/data/urdu_data/services/data_solutions/data_analytics_dashboard.json";
import urbn from "@/data/urdu_data/services/data_solutions/business_analytics.json";

// ARABIC
import arml from "@/data/arabic_data/services/data_solutions/ai_ml_models.json";
import ards from "@/data/arabic_data/services/data_solutions/data_scraping.json";
import ardad from "@/data/arabic_data/services/data_solutions/data_analytics_dashboard.json";
import arbn from "@/data/arabic_data/services/data_solutions/business_analytics.json";

//german
import grml from "@/data/german_data/services/data_solutions/ai_ml_models.json";
import grds from "@/data/german_data/services/data_solutions/data_scraping.json";
import grdad from "@/data/german_data/services/data_solutions/data_analytics_dashboard.json";
import grbn from "@/data/german_data/services/data_solutions/business_analytics.json";

//spanish
import spml from "@/data/spanish_data/services/data_solutions/ai_ml_models.json";
import spds from "@/data/spanish_data/services/data_solutions/data_scraping.json";
import spdad from "@/data/spanish_data/services/data_solutions/data_analytics_dashboard.json";
import spbn from "@/data/spanish_data/services/data_solutions/business_analytics.json";

//chineas
import chml from "@/data/chinese_data/services/data_solutions/ai_ml_models.json";
import chds from "@/data/chinese_data/services/data_solutions/data_scraping.json";
import chdad from "@/data/chinese_data/services/data_solutions/data_analytics_dashboard.json";
import chbn from "@/data/chinese_data/services/data_solutions/business_analytics.json";


//french 
import frml from "@/data/french_data/services/data_solutions/ai_ml_models.json";
import frds from "@/data/french_data/services/data_solutions/data_scraping.json";
import frdad from "@/data/french_data/services/data_solutions/data_analytics_dashboard.json";
import frbn from "@/data/french_data/services/data_solutions/business_analytics.json";



export const workflowData: Record<string, Record<string, any>> = {
  en: {
    "ai_ml_models": enml, 
    "data_scraping": ends,
    "data_analytics_dashboard": endad,
    "business_analytics": enbn,

  },
   ur: {
    "ai_ml_models": urml, 
    "data_scraping": urds,
    "data_analytics_dashboard": urdad,
    "business_analytics": urbn,

  }, ar: {
    "ai_ml_models": arml, 
    "data_scraping": ards,
    "data_analytics_dashboard": ardad,
    "business_analytics": arbn,

  }, es: {
    "ai_ml_models": spml, 
    "data_scraping": spds,
    "data_analytics_dashboard": spdad,
    "business_analytics": spbn,

  }, de: {
    "ai_ml_models": grml, 
    "data_scraping": grds,
    "data_analytics_dashboard": grdad,
    "business_analytics": grbn,

  }, zh: {
    "ai_ml_models": chml, 
    "data_scraping": chds,
    "data_analytics_dashboard": chdad,
    "business_analytics": chbn,

  }, fr: {
    "ai_ml_models": frml, 
    "data_scraping": frds,
    "data_analytics_dashboard": frdad,
    "business_analytics": frbn,

  }, 

};