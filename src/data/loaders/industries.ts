import fs from "fs";
import path from "path";
import type { IndustryListingData, IndustryPageData } from "@/types/industries_page";

const LANGUAGE_FOLDER_MAP: Record<string, string> = {
  en: "english_data",
  ur: "urdu_data",
  ar: "arabic_data",
  fr: "french_data",
  de: "german_data",
  es: "spanish_data",
  zh: "chinese_data",
};

export const INDUSTRY_GROUPS: Record<string, string[]> = {
  healthcare: ["dentist", "psychologist", "massage_therapist", "myotherapist", "chiropractor"],
  professional: ["education", "travel_services", "consulting", "legal_services"],
  trades: ["electrician", "plumbing", "carpentry", "welding"],
  entertainment: ["restaurants", "hotels", "events", "media_production"],
  agriculture: ["farms", "fields", "plants", "irrigation"],
};

function resolveLangFolder(lang: string): string {
  return LANGUAGE_FOLDER_MAP[lang] ?? LANGUAGE_FOLDER_MAP.en;
}

function readJsonFile<T>(filePath: string): T | null {
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent) as T;
  } catch {
    return null;
  }
}

export function getIndustryData(lang: string, category: string, slug: string): IndustryPageData | null {
  const langFolder = resolveLangFolder(lang);

  const localizedFilePath = path.join(
    process.cwd(),
    "src",
    "data",
    langFolder,
    "industries",
    category,
    `${slug}.json`
  );

  const localizedData = readJsonFile<IndustryPageData>(localizedFilePath);
  if (localizedData) {
    return localizedData;
  }

  const fallbackFilePath = path.join(
    process.cwd(),
    "src",
    "data",
    LANGUAGE_FOLDER_MAP.en,
    "industries",
    category,
    `${slug}.json`
  );

  return readJsonFile<IndustryPageData>(fallbackFilePath);
}

export function getIndustryCategoryBySlug(slug: string): string | null {
  for (const [category, slugs] of Object.entries(INDUSTRY_GROUPS)) {
    if (slugs.includes(slug)) {
      return category;
    }
  }
  return null;
}

export function getIndustriesListingData(lang: string): IndustryListingData | null {
  const langFolder = resolveLangFolder(lang);
  const localizedFilePath = path.join(process.cwd(), "src", "data", langFolder, "industries_page.json");
  const localizedData = readJsonFile<IndustryListingData>(localizedFilePath);

  if (localizedData) {
    return localizedData;
  }

  const fallbackFilePath = path.join(
    process.cwd(),
    "src",
    "data",
    LANGUAGE_FOLDER_MAP.en,
    "industries_page.json"
  );

  return readJsonFile<IndustryListingData>(fallbackFilePath);
}
