import fs from "fs";
import path from "path";
import type { TechnologyListingData, TechnologyPageData } from "@/types/technologies_page";
import { toCanonicalSlug, toLegacySlug } from "@/lib/slugs";

const LANGUAGE_FOLDER_MAP: Record<string, string> = {
  en: "english_data",
  ur: "urdu_data",
  ar: "arabic_data",
  fr: "french_data",
  de: "german_data",
  es: "spanish_data",
  zh: "chinese_data",
};

export const TECHNOLOGY_SLUGS = [
  "languages",
  "frameworks",
  "database",
  "tools",
  "automation",
  "crms",
  "java",
  "javascript-typescript",
  "python",
  "php",
  "ruby",
  "rust",
  "nextjs-nodejs",
  "nestjs",
  "laravel",
  "react-native",
  "flutter",
  "supabase",
  "mongodb",
  "mysql",
  "amazon-dynamodb",
  "google-apps-script",
  "hubspot",
  "n8n",
  "make",
  "microsoft-power-automate",
  "zapier",
  "amazon",
  "shopify",
  "wordpress",
  "doctorhosters",
  "gohighlevel",
  "jira-crm",
  "microsoft-dynamics-365-crm",
  "odoo",
  "payload-cms",

] as const;

const TECHNOLOGY_ALIAS_MAP: Record<string, (typeof TECHNOLOGY_SLUGS)[number]> = {
  javascript: "javascript-typescript",
  typescript: "javascript-typescript",
  nextjs: "nextjs-nodejs",
  nodejs: "nextjs-nodejs",
  jira: "jira-crm",
  payload: "payload-cms",
  ghl: "gohighlevel",
  "microsoft-dynamics": "microsoft-dynamics-365-crm",
};

const TECHNOLOGY_CATEGORY_MAP: Record<(typeof TECHNOLOGY_SLUGS)[number], "languages" | "frameworks" | "database" | "tools" | "automation" | "crms"> = {
  languages: "languages",
  frameworks: "frameworks",
  database: "database",
  tools: "tools",
  automation: "automation",
  crms: "crms",
  java: "languages",
  "javascript-typescript": "languages",
  python: "languages",
  php: "languages",
  ruby: "languages",
  rust: "languages",
  "nextjs-nodejs": "frameworks",
  nestjs: "frameworks",
  laravel: "frameworks",
  "react-native": "frameworks",
  flutter: "frameworks",
  supabase: "database",
  mongodb: "database",
  mysql: "database",
  "amazon-dynamodb": "database",
  "google-apps-script": "automation",
  hubspot: "automation",
  n8n: "automation",
  make: "automation",
  "microsoft-power-automate": "automation",
  zapier: "automation",
  amazon: "tools",
  shopify: "tools",
  wordpress: "tools",
  doctorhosters: "tools",
  gohighlevel: "crms",
  "jira-crm": "crms",
  "microsoft-dynamics-365-crm": "crms",
  odoo: "crms",
  "payload-cms": "crms",

};

const TECHNOLOGY_FILE_SLUG_MAP: Record<string, string> = {
  "amazon-dynamodb": "amazon_dynamodb",
  "javascript-typescript": "javascript-typescript",
  "nextjs-nodejs": "nextjs-nodejs",
  "react-native": "react-native",
  "google-apps-script": "google_app_script",
  "microsoft-power-automate": "microsoft_power_automation",
  gohighlevel: "ghl",
  "jira-crm": "jira",
  "microsoft-dynamics-365-crm": "microsoft_dynamo",
  "payload-cms": "payload",
};

export function getCanonicalTechnologySlug(slug: string): string {
  const canonicalSlug = toCanonicalSlug(slug);
  return TECHNOLOGY_ALIAS_MAP[canonicalSlug] ?? canonicalSlug;
}

function resolveTechnologyPath(langFolder: string, slug: string): string | null {
  const canonicalSlug = getCanonicalTechnologySlug(slug);
  const typedSlug = canonicalSlug as (typeof TECHNOLOGY_SLUGS)[number];
  const category = TECHNOLOGY_CATEGORY_MAP[typedSlug];

  if (!category) {
    return null;
  }

  const fileSlug = TECHNOLOGY_FILE_SLUG_MAP[canonicalSlug] ?? toLegacySlug(canonicalSlug);
  const fileName = canonicalSlug === category ? "index.json" : `${fileSlug}.json`;
  return path.join(process.cwd(), "src", "data", langFolder, "technologies", category, fileName);
}

function resolveLangFolder(lang: string): string {
  return LANGUAGE_FOLDER_MAP[lang] ?? LANGUAGE_FOLDER_MAP.en;
}

function readJsonFile<T>(filePath: string): T | null {
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf-8").replace(/^\uFEFF/, "");
    return JSON.parse(fileContent) as T;
  } catch {
    return null;
  }
}

export function getTechnologyData(lang: string, slug: string): TechnologyPageData | null {
  const langFolder = resolveLangFolder(lang);
  const localizedFilePath = resolveTechnologyPath(langFolder, slug);
  const localizedData = localizedFilePath ? readJsonFile<TechnologyPageData>(localizedFilePath) : null;

  if (localizedData) {
    return localizedData;
  }

  const fallbackFilePath = resolveTechnologyPath(LANGUAGE_FOLDER_MAP.en, slug);

  return fallbackFilePath ? readJsonFile<TechnologyPageData>(fallbackFilePath) : null;
}

export function getTechnologiesListingData(lang: string): TechnologyListingData | null {
  const langFolder = resolveLangFolder(lang);
  const localizedFilePath = path.join(process.cwd(), "src", "data", langFolder, "technologies_page.json");
  const localizedData = readJsonFile<TechnologyListingData>(localizedFilePath);

  if (localizedData) {
    return localizedData;
  }

  const fallbackFilePath = path.join(
    process.cwd(),
    "src",
    "data",
    LANGUAGE_FOLDER_MAP.en,
    "technologies_page.json"
  );

  return readJsonFile<TechnologyListingData>(fallbackFilePath);
}
