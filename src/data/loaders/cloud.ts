
// ENGLISH
import endbm from "@/data/english_data/services/cloud/Database_managment.json";
import encicd from "@/data/english_data/services/cloud/ci_cd_pipeline.json";
import encs from "@/data/english_data/services/cloud/cloud_security.json";
import endoc from "@/data/english_data/services/cloud/devops_consulting.json";


// URDU
import urdbm from "@/data/urdu_data/services/cloud/Database_managment.json";
import urcicd from "@/data/urdu_data/services/cloud/ci_cd_pipeline.json";
import urcs from "@/data/urdu_data/services/cloud/cloud_security.json";
import urrdoc from "@/data/urdu_data/services/cloud/devops_consulting.json";

// ARABIC
import ardbm from "@/data/arabic_data/services/cloud/Database_managment.json";
import arcicd from "@/data/arabic_data/services/cloud/ci_cd_pipeline.json";
import arcs from "@/data/arabic_data/services/cloud/cloud_security.json";
import ardoc from "@/data/arabic_data/services/cloud/devops_consulting.json";

//german
import grdbm from "@/data/german_data/services/cloud/Database_managment.json";
import grcicd from "@/data/german_data/services/cloud/ci_cd_pipeline.json";
import grcs from "@/data/german_data/services/cloud/cloud_security.json";
import grdoc from "@/data/german_data/services/cloud/devops_consulting.json";

//spanish
import spdbm from "@/data/spanish_data/services/cloud/Database_managment.json";
import spcicd from "@/data/spanish_data/services/cloud/ci_cd_pipeline.json";
import spcs from "@/data/spanish_data/services/cloud/cloud_security.json";
import spdoc from "@/data/spanish_data/services/cloud/devops_consulting.json";

//chineas
import chdbm from "@/data/chinese_data/services/cloud/Database_managment.json";
import chcicd from "@/data/chinese_data/services/cloud/ci_cd_pipeline.json";
import chcs from "@/data/chinese_data/services/cloud/cloud_security.json";
import chdoc from "@/data/chinese_data/services/cloud/devops_consulting.json";


//french 
import frdbm from "@/data/french_data/services/cloud/Database_managment.json";
import frcicd from "@/data/french_data/services/cloud/ci_cd_pipeline.json";
import frcs from "@/data/french_data/services/cloud/cloud_security.json";
import frdoc from "@/data/french_data/services/cloud/devops_consulting.json";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const workflowData: Record<string, Record<string, any>> = {
  en: {
    "cicd_pipelines": encicd, 
    "cloud_security": encs,
    "database_management": endbm,
    "devops_consulting": endoc,

  },
   ur: {
    "cicd_pipelines": urcicd, 
    "cloud_security": urcs,
    "database_management": urdbm,
    "devops_consulting": urrdoc,

  }, ar: {
    "cicd_pipelines": arcicd, 
    "cloud_security": arcs,
    "database_management": ardbm,
    "devops_consulting": ardoc,


  }, es: {
    "cicd_pipelines": spcicd, 
    "cloud_security": spcs,
    "database_management": spdbm,
    "devops_consulting": spdoc,

  }, de: {
    "cicd_pipelines": grcicd,
    "cloud_security": grcs,
    "database_management": grdbm,
    "devops_consulting": grdoc,

    

  }, zh: {
   "cicd_pipelines": chcicd, 
    "cloud_security": chcs,
    "database_management": chdbm,
    "devops_consulting": chdoc,

  }, fr: {
    "cicd_pipelines": frcicd,
    "cloud_security": frcs,
    "database_management": frdbm,
    "devops_consulting": frdoc,


  }, 

};