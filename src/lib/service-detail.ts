import { workflowData as aiMlData } from "@/data/loaders/ai_ml";
import { workflowData as cloudData } from "@/data/loaders/cloud";
import { workflowData as dataSolutionsData } from "@/data/loaders/data_solutions";
import { workflowData as digitalDesignData } from "@/data/loaders/digital_design";
import { workflowData as testingData } from "@/data/loaders/testing";
import { workflowData as webDevelopmentData } from "@/data/loaders/web_development";
import { workflowData as workflowAutomationsData } from "@/data/loaders/workflow_automations";
import { getSlugCandidates, toCanonicalSlug, toLegacySlug } from "@/lib/slugs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ServiceDetailData = any;

const SERVICE_DATASETS: Array<Record<string, Record<string, ServiceDetailData>>> = [
  aiMlData,
  workflowAutomationsData,
  cloudData,
  dataSolutionsData,
  digitalDesignData,
  testingData,
  webDevelopmentData,
];

const SERVICE_SLUG_ALIASES: Record<string, string[]> = {
  accounting: ["finance-automation"],
  "ci-cd-pipelines": ["cicd-pipelines"],
  "infrastructure-automation": ["devops-infrastructure-automation"],
  "marketing-sales-automation": ["marketing-automation"],
  "no-code-automations": ["no-code-automation"],
  "saas-platform": ["saas-development"],
  "saas-plateform": ["saas-development"],
};

export function getServiceDetailData(lang: string, slug: string) {
  const canonicalSlug = toCanonicalSlug(slug);
  const aliasCandidates = SERVICE_SLUG_ALIASES[canonicalSlug] ?? [];
  const candidates = Array.from(
    new Set(
      [canonicalSlug, ...aliasCandidates]
        .flatMap((candidate) => getSlugCandidates(candidate))
        .concat(toLegacySlug(canonicalSlug)),
    ),
  );

  for (const dataset of SERVICE_DATASETS) {
    for (const candidate of candidates) {
      const data = dataset[lang]?.[candidate] || dataset.en?.[candidate];

      if (data) {
        return {
          data,
          slug: typeof data.slug === "string" ? toCanonicalSlug(data.slug) : toCanonicalSlug(candidate),
        };
      }
    }
  }

  return null;
}
