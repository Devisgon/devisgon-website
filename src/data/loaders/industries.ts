import fs from "fs";
import path from "path";
import type { IndustryListingData, IndustryPageData } from "@/types/industries_page";
import { getSlugCandidates, toCanonicalSlug, toLegacySlug } from "@/lib/slugs";

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
  healthcare: ["dentist", "psychologist", "massage-therapist", "myotherapist", "chiropractor", "optometry"],
  professional: ["education", "travel-services", "consulting", "legal-services", "fuel-station", "gym", "tutor"],
  trades: ["electrician", "plumbing", "carpentry", "welding", "cleaning", "electronics", "roofing"],
  entertainment: ["restaurants", "hotels", "events", "media-production", "clothing", "supermarket"],
  agriculture: ["farms", "fields", "plants", "irrigation", "dairy-farm", "landscaping", "poultry-farm"],
  food: ["bakery", "juice-bar", "catering", "fine-dining", "ice-cream-parlor"],
  "real-estate": ["residential", "commercial", "property-management", "architecture-design", "insurance", "micro-finance"],
};

const INDUSTRY_SLUG_ALIASES: Record<string, string[]> = {
  electronics: ["elctronics"],
  landscaping: ["landscraping"],
  "poultry-farm": ["poetry-farm", "poetry_farm"],
  tutor: ["tutoer"],
};

export function toPublicIndustrySlug(slug: string): string {
  const canonicalSlug = toCanonicalSlug(slug);

  for (const [publicSlug, aliases] of Object.entries(INDUSTRY_SLUG_ALIASES)) {
    if (publicSlug === canonicalSlug || aliases.map(toCanonicalSlug).includes(canonicalSlug)) {
      return publicSlug;
    }
  }

  return canonicalSlug;
}

function getIndustrySlugCandidates(slug: string): string[] {
  const publicSlug = toPublicIndustrySlug(slug);
  const aliases = INDUSTRY_SLUG_ALIASES[publicSlug] ?? [];

  return Array.from(
    new Set([
      ...getSlugCandidates(slug),
      ...getSlugCandidates(publicSlug),
      ...aliases.flatMap((alias) => getSlugCandidates(alias)),
    ])
  );
}

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
  const categoryCandidates = getSlugCandidates(category);
  const slugCandidates = getIndustrySlugCandidates(slug);

  for (const categoryCandidate of categoryCandidates) {
    for (const slugCandidate of slugCandidates) {
      const localizedFilePath = path.join(
        process.cwd(),
        "src",
        "data",
        langFolder,
        "industries",
        categoryCandidate,
        `${slugCandidate}.json`
      );

      const localizedData = readJsonFile<IndustryPageData>(localizedFilePath);
      if (localizedData) {
        return localizedData;
      }
    }
  }

  for (const categoryCandidate of categoryCandidates) {
    for (const slugCandidate of slugCandidates) {
      const fallbackFilePath = path.join(
        process.cwd(),
        "src",
        "data",
        LANGUAGE_FOLDER_MAP.en,
        "industries",
        categoryCandidate,
        `${slugCandidate}.json`
      );

      const fallbackData = readJsonFile<IndustryPageData>(fallbackFilePath);
      if (fallbackData) {
        return fallbackData;
      }
    }
  }

  return null;
}

export function getIndustryCategoryBySlug(slug: string): string | null {
  const slugCandidates = getIndustrySlugCandidates(slug);
  for (const [category, slugs] of Object.entries(INDUSTRY_GROUPS)) {
    if (slugs.some((candidate) => slugCandidates.includes(candidate) || slugCandidates.includes(toLegacySlug(candidate)))) {
      return toCanonicalSlug(category);
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
