// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ServiceDetailData = any;

import enAws from "@/data/english_data/services/cloud/aws.json";
import enCiCdPipeline from "@/data/english_data/services/cloud/ci_cd_pipeline.json";
import enCloudSecurity from "@/data/english_data/services/cloud/cloud_security.json";
import enDatabaseManagment from "@/data/english_data/services/cloud/Database_managment.json";
import enDevopsConsulting from "@/data/english_data/services/cloud/devops_consulting.json";
import enGcp from "@/data/english_data/services/cloud/gcp.json";

import urAws from "@/data/urdu_data/services/cloud/aws.json";
import urCiCdPipeline from "@/data/urdu_data/services/cloud/ci_cd_pipeline.json";
import urCloudSecurity from "@/data/urdu_data/services/cloud/cloud_security.json";
import urDatabaseManagment from "@/data/urdu_data/services/cloud/Database_managment.json";
import urDevopsConsulting from "@/data/urdu_data/services/cloud/devops_consulting.json";
import urGcp from "@/data/urdu_data/services/cloud/gcp.json";

import arAws from "@/data/arabic_data/services/cloud/aws.json";
import arCiCdPipeline from "@/data/arabic_data/services/cloud/ci_cd_pipeline.json";
import arCloudSecurity from "@/data/arabic_data/services/cloud/cloud_security.json";
import arDatabaseManagment from "@/data/arabic_data/services/cloud/Database_managment.json";
import arDevopsConsulting from "@/data/arabic_data/services/cloud/devops_consulting.json";
import arGcp from "@/data/arabic_data/services/cloud/gcp.json";

import deAws from "@/data/german_data/services/cloud/aws.json";
import deCiCdPipeline from "@/data/german_data/services/cloud/ci_cd_pipeline.json";
import deCloudSecurity from "@/data/german_data/services/cloud/cloud_security.json";
import deDatabaseManagment from "@/data/german_data/services/cloud/Database_managment.json";
import deDevopsConsulting from "@/data/german_data/services/cloud/devops_consulting.json";
import deGcp from "@/data/german_data/services/cloud/gcp.json";

import esAws from "@/data/spanish_data/services/cloud/aws.json";
import esCiCdPipeline from "@/data/spanish_data/services/cloud/ci_cd_pipeline.json";
import esCloudSecurity from "@/data/spanish_data/services/cloud/cloud_security.json";
import esDatabaseManagment from "@/data/spanish_data/services/cloud/Database_managment.json";
import esDevopsConsulting from "@/data/spanish_data/services/cloud/devops_consulting.json";
import esGcp from "@/data/spanish_data/services/cloud/gcp.json";

import zhAws from "@/data/chinese_data/services/cloud/aws.json";
import zhCiCdPipeline from "@/data/chinese_data/services/cloud/ci_cd_pipeline.json";
import zhCloudSecurity from "@/data/chinese_data/services/cloud/cloud_security.json";
import zhDatabaseManagment from "@/data/chinese_data/services/cloud/Database_managment.json";
import zhDevopsConsulting from "@/data/chinese_data/services/cloud/devops_consulting.json";
import zhGcp from "@/data/chinese_data/services/cloud/gcp.json";

import frAws from "@/data/french_data/services/cloud/aws.json";
import frCiCdPipeline from "@/data/french_data/services/cloud/ci_cd_pipeline.json";
import frCloudSecurity from "@/data/french_data/services/cloud/cloud_security.json";
import frDatabaseManagment from "@/data/french_data/services/cloud/Database_managment.json";
import frDevopsConsulting from "@/data/french_data/services/cloud/devops_consulting.json";
import frGcp from "@/data/french_data/services/cloud/gcp.json";

const serviceEntries = (aws: ServiceDetailData, cicdPipelines: ServiceDetailData, cloudSecurity: ServiceDetailData, databaseManagement: ServiceDetailData, devopsConsulting: ServiceDetailData, gcp: ServiceDetailData) => ({
  "aws-devops-infrastructure": aws,
  "cicd-pipelines": cicdPipelines,
  "cicd_pipelines": cicdPipelines,
  "ci-cd-pipelines": cicdPipelines,
  "cloud-security": cloudSecurity,
  "database-management": databaseManagement,
  "database-managment": databaseManagement,
  "devops-consulting": devopsConsulting,
  "gcp-devops-infrastructure": gcp,
});

export const workflowData: Record<string, Record<string, ServiceDetailData>> = {
  en: serviceEntries(enAws, enCiCdPipeline, enCloudSecurity, enDatabaseManagment, enDevopsConsulting, enGcp),
  ur: serviceEntries(urAws, urCiCdPipeline, urCloudSecurity, urDatabaseManagment, urDevopsConsulting, urGcp),
  ar: serviceEntries(arAws, arCiCdPipeline, arCloudSecurity, arDatabaseManagment, arDevopsConsulting, arGcp),
  de: serviceEntries(deAws, deCiCdPipeline, deCloudSecurity, deDatabaseManagment, deDevopsConsulting, deGcp),
  es: serviceEntries(esAws, esCiCdPipeline, esCloudSecurity, esDatabaseManagment, esDevopsConsulting, esGcp),
  zh: serviceEntries(zhAws, zhCiCdPipeline, zhCloudSecurity, zhDatabaseManagment, zhDevopsConsulting, zhGcp),
  fr: serviceEntries(frAws, frCiCdPipeline, frCloudSecurity, frDatabaseManagment, frDevopsConsulting, frGcp),
};
