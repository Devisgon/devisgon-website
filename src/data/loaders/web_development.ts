
// ENGLISH
import enaa from "@/data/english_data/services/web_and_mobile_development/app_applications.json";
import enwa from "@/data/english_data/services/web_and_mobile_development/web_applications.json";
import encb from "@/data/english_data/services/web_and_mobile_development/custom_bots.json";
import enApi from "@/data/english_data/services/web_and_mobile_development/api_integration.json"



// URDU
import uraa from "@/data/urdu_data/services/web_and_mobile_development/app_applications.json";
import urwa from "@/data/urdu_data/services/web_and_mobile_development/web_applications.json";
import urcb from "@/data/urdu_data/services/web_and_mobile_development//custom_bots.json";
import urApi from "@/data/english_data/services/web_and_mobile_development/api_integration.json"

// ARABIC
import araa from "@/data/arabic_data/services/web_and_mobile_development/app_applications.json";
import arwa from "@/data/arabic_data/services/web_and_mobile_development/web_applications.json";
import arcb from "@/data/arabic_data/services/web_and_mobile_development//custom_bots.json";
import arApi from "@/data/english_data/services/web_and_mobile_development/api_integration.json"


//german
import graa from "@/data/german_data/services/web_and_mobile_development/app_applications.json";
import grwa from "@/data/german_data/services/web_and_mobile_development/web_applications.json";
import grcb from "@/data/german_data/services/web_and_mobile_development//custom_bots.json";
import grApi from "@/data/english_data/services/web_and_mobile_development/api_integration.json"

//spanish
import spaa from "@/data/spanish_data/services/web_and_mobile_development/app_applications.json";
import spwa from "@/data/spanish_data/services/web_and_mobile_development/web_applications.json";
import spcb from "@/data/spanish_data/services/web_and_mobile_development//custom_bots.json";
import spApi from "@/data/english_data/services/web_and_mobile_development/api_integration.json"

//chineas
import chaa from "@/data/chinese_data/services/web_and_mobile_development/app_applications.json";
import chwa from "@/data/chinese_data/services/web_and_mobile_development/web_applications.json";
import chcb from "@/data/chinese_data/services/web_and_mobile_development//custom_bots.json";
import chApi from "@/data/english_data/services/web_and_mobile_development/api_integration.json"


//french 
import fraa from "@/data/french_data/services/web_and_mobile_development/app_applications.json";
import frwa from "@/data/french_data/services/web_and_mobile_development/web_applications.json";
import frcb from "@/data/french_data/services/web_and_mobile_development//custom_bots.json";
import frApi from "@/data/english_data/services/web_and_mobile_development/api_integration.json"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const workflowData: Record<string, Record<string, any>> = {
  
  en: {
    "mobile-app-development": enaa, 
    "web-application-development": enwa,
    "custom_bots": encb,
    "api_integration": enApi

  },
   ur: {
    "mobile-app-development": uraa, 
    "web-application-development": urwa,
    "custom_bots": urcb,
    "api_integration": urApi

  }, ar: {
    "mobile-app-development": araa, 
    "web-application-development": arwa,
    "custom_bots": arcb,
    "api_integration": arApi

  }, es: {
    "mobile-app-development": spaa,
    "web-application-development": spwa,
    "custom_bots": spcb,
    "api_integration": spApi

  }, de: {
    "mobile-app-development": graa, 
    "web-application-development": grwa,
    "custom_bots": grcb,
    "api_integration": grApi

  }, zh: {
    "mobile-app-development": chaa,
    "web-application-development": chwa,
    "custom_bots": chcb,
    "api_integration": chApi

  }, fr: {
    "mobile-app-development": fraa, 
    "web-application-development": frwa,
    "custom_bots": frcb,
    "api_integration": frApi

  }, 

};