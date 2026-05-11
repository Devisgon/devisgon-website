import fs from "fs";
import path from "path";
import type { TechnologyListingData, TechnologyPageData } from "@/types/technologies_page";
import { toLegacySlug } from "@/lib/slugs";

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
  "java",
  "javascript",
  "python",
  "typescript",
  "php",
  "cpp",
  "c",
  "nodejs",
  "nextjs",
  "nestjs",
  "laravel",
  "react",
  "react-native",
  "flutter",
  "supabase",
  "mongodb",
  "graphql",
  "mysql",
  "amazon-dynamodb",
  "n8n",
  "make",
  "zapier",
  "amazon",
  "shopify",
  "wordpress",
  "doctorhosters",
  "jotform",

] as const;

const TECHNOLOGY_CATEGORY_MAP: Record<(typeof TECHNOLOGY_SLUGS)[number], "languages" | "frameworks" | "database" | "tools"> = {
  languages: "languages",
  frameworks: "frameworks",
  database: "database",
  tools: "tools",
  java: "languages",
  javascript: "languages",
  python: "languages",
  typescript: "languages",
  php: "languages",
  cpp: "languages",
  c: "languages",
  nodejs: "frameworks",
  nextjs: "frameworks",
  nestjs: "frameworks",
  laravel: "frameworks",
  react: "frameworks",
  "react-native": "frameworks",
  flutter: "frameworks",
  supabase: "database",
  mongodb: "database",
  graphql: "database",
  mysql: "database",
  "amazon-dynamodb": "database",
  n8n: "tools",
  make: "tools",
  zapier: "tools",
  amazon: "tools",
  shopify: "tools",
  wordpress: "tools",
  doctorhosters: "tools",
  jotform: "tools",

};

const TECHNOLOGY_FILE_SLUG_MAP: Record<string, string> = {
  "amazon-dynamodb": "amazon_dynamodb",
  "react-native": "react_native",
};

function resolveTechnologyPath(langFolder: string, slug: string): string | null {
  const typedSlug = slug as (typeof TECHNOLOGY_SLUGS)[number];
  const category = TECHNOLOGY_CATEGORY_MAP[typedSlug];

  if (!category) {
    return null;
  }

  const fileSlug = TECHNOLOGY_FILE_SLUG_MAP[slug] ?? toLegacySlug(slug);
  const fileName = slug === category ? "index.json" : `${fileSlug}.json`;
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
