
// ENGLISH
import enaa from "@/data/english_data/services/web_and_mobile_development/app_applications.json";
import enwa from "@/data/english_data/services/web_and_mobile_development/web_applications.json";
import encb from "@/data/english_data/services/web_and_mobile_development//custom_bots.json";


// URDU
import uraa from "@/data/urdu_data/services/web_and_mobile_development/app_applications.json";
import urwa from "@/data/urdu_data/services/web_and_mobile_development/web_applications.json";
import urcb from "@/data/urdu_data/services/web_and_mobile_development//custom_bots.json";

// ARABIC
import araa from "@/data/arabic_data/services/web_and_mobile_development/app_applications.json";
import arwa from "@/data/arabic_data/services/web_and_mobile_development/web_applications.json";
import arcb from "@/data/arabic_data/services/web_and_mobile_development//custom_bots.json";

//german
import graa from "@/data/german_data/services/web_and_mobile_development/app_applications.json";
import grwa from "@/data/german_data/services/web_and_mobile_development/web_applications.json";
import grcb from "@/data/german_data/services/web_and_mobile_development//custom_bots.json";

//spanish
import spaa from "@/data/spanish_data/services/web_and_mobile_development/app_applications.json";
import spwa from "@/data/spanish_data/services/web_and_mobile_development/web_applications.json";
import spcb from "@/data/spanish_data/services/web_and_mobile_development//custom_bots.json";

//chineas
import chaa from "@/data/chinese_data/services/web_and_mobile_development/app_applications.json";
import chwa from "@/data/chinese_data/services/web_and_mobile_development/web_applications.json";
import chcb from "@/data/chinese_data/services/web_and_mobile_development//custom_bots.json";


//french 
import fraa from "@/data/french_data/services/web_and_mobile_development/app_applications.json";
import frwa from "@/data/french_data/services/web_and_mobile_development/web_applications.json";
import frcb from "@/data/french_data/services/web_and_mobile_development//custom_bots.json";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const workflowData: Record<string, Record<string, any>> = {
  
  en: {
    "app_applications": enaa, 
    "web_applications": enwa,
    "custom_bots": encb,


  },
   ur: {
    "app_applications": uraa, 
    "web_applications": urwa,
    "custom_bots": urcb,

  }, ar: {
    "app_applications": araa, 
    "web_applications": arwa,
    "custom_bots": arcb,

  }, es: {
    "app_applications": spaa,
    "web_applications": spwa,
    "custom_bots": spcb,

  }, de: {
    "app_applications": graa, 
    "web_applications": grwa,
    "custom_bots": grcb,

  }, zh: {
    "app_applications": chaa,
    "web_applications": chwa,
    "custom_bots": chcb,

  }, fr: {
    "app_applications": fraa, 
    "web_applications": frwa,
    "custom_bots": frcb,

  }, 

};