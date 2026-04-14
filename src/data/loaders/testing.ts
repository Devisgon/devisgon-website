
// ENGLISH
import enapit from "@/data/english_data/services/testing/api_testing.json";
import enat from "@/data/english_data/services/testing/automation_testing.json";
import endmt from "@/data/english_data/services/testing/manual_testing.json";
import enpt from "@/data/english_data/services/testing/performance_testing.json";
import enst from "@/data/english_data/services/testing/security_testing.json";



// URDU
import urapit from "@/data/urdu_data/services/testing/api_testing.json";
import urat from "@/data/urdu_data/services/testing/automation_testing.json";
import urdmt from "@/data/urdu_data/services/testing/manual_testing.json";
import urpt from "@/data/urdu_data/services/testing/performance_testing.json";
import urst from "@/data/urdu_data/services/testing/security_testing.json";

// ARABIC
import arapit from "@/data/arabic_data/services/testing/api_testing.json";
import arat from "@/data/arabic_data/services/testing/automation_testing.json";
import ardmt from "@/data/arabic_data/services/testing/manual_testing.json";
import arpt from "@/data/arabic_data/services/testing/performance_testing.json";
import arst from "@/data/arabic_data/services/testing/security_testing.json";

//german
import grapit from "@/data/german_data/services/testing/api_testing.json";
import grat from "@/data/german_data/services/testing/automation_testing.json";
import grdmt from "@/data/german_data/services/testing/manual_testing.json";
import grpt from "@/data/german_data/services/testing/performance_testing.json";
import grst from "@/data/german_data/services/testing/security_testing.json";

//spanish
import spapit from "@/data/spanish_data/services/testing/api_testing.json";
import spat from "@/data/spanish_data/services/testing/automation_testing.json";
import spdmt from "@/data/spanish_data/services/testing/manual_testing.json";
import sppt from "@/data/spanish_data/services/testing/performance_testing.json";
import sspst from "@/data/spanish_data/services/testing/security_testing.json";

//chineas
import chapit from "@/data/chinese_data/services/testing/api_testing.json";
import chat from "@/data/chinese_data/services/testing/automation_testing.json";
import chdmt from "@/data/chinese_data/services/testing/manual_testing.json";
import chpt from "@/data/chinese_data/services/testing/performance_testing.json";
import chst from "@/data/chinese_data/services/testing/security_testing.json";


//french 
import frapit from "@/data/french_data/services/testing/api_testing.json";
import frat from "@/data/french_data/services/testing/automation_testing.json";
import frdmt from "@/data/french_data/services/testing/manual_testing.json";
import frpt from "@/data/french_data/services/testing/performance_testing.json";
import frst from "@/data/french_data/services/testing/security_testing.json";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const workflowData: Record<string, Record<string, any>> = {
  en: {
    "api_testing": enapit, 
    "automation_testing": enat,
    "manual_testing": endmt,
    "performance_testing": enpt,
    "security_testing": enst
  },
   ur: {
 "api_testing": urapit, 
    "automation_testing": urat,
    "manual_testing": urdmt,
    "performance_testing": urpt,
    "security_testing": urst

  }, ar: {
    "api_testing": arapit, 
    "automation_testing": arat,
    "manual_testing": ardmt,
    "performance_testing": arpt,
    "security_testing": arst

  }, es: {
 "api_testing": spapit, 
    "automation_testing": spat,
    "manual_testing": spdmt,
    "performance_testing": sppt,
    "security_testing": sspst

  }, de: {
    "api_testing": grapit, 
    "automation_testing": grat,
    "manual_testing": grdmt,
    "performance_testing": grpt,
    "security_testing": grst

  }, zh: {
 "api_testing": chapit, 
    "automation_testing": chat,
    "manual_testing": chdmt,
    "performance_testing": chpt,
    "security_testing": chst

  }, fr: {
    "api_testing": frapit, 
    "automation_testing": frat,
    "manual_testing": frdmt,
    "performance_testing": frpt,
    "security_testing": frst

  }, 

};