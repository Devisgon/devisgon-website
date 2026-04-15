
// ENGLISH
import engd from "@/data/english_data/services/digital_design/graphical.json";
import enlg from "@/data/english_data/services/digital_design/logo_design.json";
import enmd from "@/data/english_data/services/digital_design/mobile_design.json";
import enpd from "@/data/english_data/services/digital_design/product_deign.json";
import enpwd from "@/data/english_data/services/digital_design/prototyping_and_wireframe.json";
import enui from "@/data/english_data/services/digital_design/ui_ux_design.json";
import enwd from "@/data/english_data/services/digital_design/web_design.json";



// URDU

import urgd from "@/data/urdu_data/services/digital_design/graphical.json";
import urlg from "@/data/urdu_data/services/digital_design/logo_design.json";
import urmd from "@/data/urdu_data/services/digital_design/mobile_design.json";
import urpd from "@/data/urdu_data/services/digital_design/product_deign.json";
import urpwd from "@/data/urdu_data/services/digital_design/prototyping_and_wireframe.json";
import urui from "@/data/urdu_data/services/digital_design/ui_ux_design.json";
import urwd from "@/data/urdu_data/services/digital_design/web_design.json";


// ARABIC

import argd from "@/data/german_data/services/digital_design/graphical.json";
import arlg from "@/data/german_data/services/digital_design/logo_design.json";
import armd from "@/data/german_data/services/digital_design/mobile_design.json";
import arpd from "@/data/german_data/services/digital_design/product_deign.json";
import arpwd from "@/data/german_data/services/digital_design/prototyping_and_wireframe.json";
import arui from "@/data/german_data/services/digital_design/ui_ux_design.json";
import arwd from "@/data/german_data/services/digital_design/web_design.json";


//german

import grgd from "@/data/arabic_data/services/digital_design/graphical.json";
import grlg from "@/data/arabic_data/services/digital_design/logo_design.json";
import grmd from "@/data/arabic_data/services/digital_design/mobile_design.json";
import grpd from "@/data/arabic_data/services/digital_design/product_deign.json";
import grpwd from "@/data/arabic_data/services/digital_design/prototyping_and_wireframe.json";
import grui from "@/data/arabic_data/services/digital_design/ui_ux_design.json";
import grwd from "@/data/arabic_data/services/digital_design/web_design.json";


//spanish

import spgd from "@/data/spanish_data/services/digital_design/graphical.json";
import splg from "@/data/spanish_data/services/digital_design/logo_design.json";
import spmd from "@/data/spanish_data/services/digital_design/mobile_design.json";
import sppd from "@/data/spanish_data/services/digital_design/product_deign.json";
import sppwd from "@/data/spanish_data/services/digital_design/prototyping_and_wireframe.json";
import spui from "@/data/spanish_data/services/digital_design/ui_ux_design.json";
import spwd from "@/data/spanish_data/services/digital_design/web_design.json";


//chinese

import chgd from "@/data/chinese_data/services/digital_design/graphical.json";
import chlg from "@/data/chinese_data/services/digital_design/logo_design.json";
import chmd from "@/data/chinese_data/services/digital_design/mobile_design.json";
import chpd from "@/data/chinese_data/services/digital_design/product_deign.json";
import chpwd from "@/data/chinese_data/services/digital_design/prototyping_and_wireframe.json";
import chui from "@/data/chinese_data/services/digital_design/ui_ux_design.json";
import chwd from "@/data/chinese_data/services/digital_design/web_design.json";


//french 

import frgd from "@/data/french_data/services/digital_design/graphical.json";
import frlg from "@/data/french_data/services/digital_design/logo_design.json";
import frmd from "@/data/french_data/services/digital_design/mobile_design.json";
import frpd from "@/data/french_data/services/digital_design/product_deign.json";
import frpwd from "@/data/french_data/services/digital_design/prototyping_and_wireframe.json";
import frui from "@/data/french_data/services/digital_design/ui_ux_design.json";
import frwd from "@/data/french_data/services/digital_design/web_design.json";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const workflowData: Record<string, Record<string, any>> = {
  
  en: {
    "graphic_design": engd, 
    "logo_design": enlg,
    "mobile_app_design": enmd,
        "product_design": enpd,
    "prototyping_wireframing": enpwd,
    "ui_ux_design": enui,
    "web_design": enwd,



  },
   ur: {
  "graphic_design": urgd, 
    "logo_design": urlg,
    "mobile_app_design": urmd,
        "product_design": urpd,
    "prototyping_wireframing": urpwd,
    "ui_ux_design": urui,
    "web_design": urwd,

  }, ar: {
   "graphic_design": argd, 
    "logo_design": arlg,
    "mobile_app_design": armd,
        "product_design": arpd,
    "prototyping_wireframing": arpwd,
    "ui_ux_design": arui,
    "web_design": arwd,

  }, es: {
     "graphic_design": spgd, 
    "logo_design": splg,
    "mobile_app_design": spmd,
        "product_design": sppd,
    "prototyping_wireframing": sppwd,
    "ui_ux_design": spui,
    "web_design": spwd,
  },
   de: {
     "graphic_design": grgd, 
    "logo_design": grlg,
    "mobile_app_design": grmd,
        "product_design": grpd,
    "prototyping_wireframing": grpwd,
    "ui_ux_design": grui,
    "web_design": grwd,

  }, zh: {
    "graphic_design": chgd, 
    "logo_design": chlg,
    "mobile_app_design": chmd,
        "product_design": chpd,
    "prototyping_wireframing": chpwd,
    "ui_ux_design": chui,
    "web_design": chwd,

  }, fr: {
 "graphic_design": frgd, 
    "logo_design": frlg,
    "mobile_app_design": frmd,
        "product_design": frpd,
    "prototyping_wireframing": frpwd,
    "ui_ux_design": frui,
    "web_design": frwd,

  }, 

};