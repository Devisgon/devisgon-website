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
  healthcare: [
    "beauty-therapist",
    "dentist",
    "psychologist",
    "massage-therapist",
    "myotherapist",
    "chiropractor",
    "optometry",
    "osteopath",
    "physiotherapist",
    "podiatrist",
  ],
  professional: [
    "barber",
    "education",
    "travel-services",
    "consulting",
    "legal-services",
    "fuel-station",
    "gym",
    "hairdresser",
    "hvac",
  ],
  trades: ["electrician", "plumbing", "carpentry", "cleaning", "roofing", "clothing", "mechanic", "painter"],
  agriculture: [
    "agricultural-equipment",
    "agricultural-shelters",
    "fertilizer-suppliers",
    "grain-storage",
    "pesticide-companies",
    "seed-companies",
  ],
  food: ["bakery", "juice-bar", "catering", "hotels"],
  "real-estate": ["accountant", "residential", "commercial", "property-management", "architecture-design", "insurance"],
};

const INDUSTRY_PUBLIC_SLUG_ALIASES: Record<string, string[]> = {
  "agricultural-equipment-software-automation-solutions": ["agricultural-equipment"],
  "agricultural-shelter-software-automation-solutions": ["agricultural-shelters"],
  "fertilizer-supplier-software-automation-solutions": ["fertilizer-suppliers"],
  "grain-storage-management-software-solutions": ["grain-storage"],
  "pesticide-company-software-automation-solutions": ["pesticide-companies"],
  "seed-company-software-automation-solutions": ["seed-companies"],
  "bakery-software-automation-solutions": ["bakery"],
  "juice-bar-software-automation-solutions": ["juice-bar"],
  "catering-business-software-automation-solutions": ["catering"],
  "hotel-management-software-automation-solutions": ["hotels"],
  "beauty-therapist-booking-automation-solutions": ["beauty-therapist", "beautytherapist"],
  "chiropractor-clinic-software-automation-solutions": ["chiropractor"],
  "dental-clinic-software-automation-solutions": ["dentist"],
  "massage-therapist-booking-automation-solutions": ["massage-therapist"],
  "myotherapy-clinic-software-automation-solutions": ["myotherapist"],
  "optometry-clinic-software-automation-solutions": ["optometry"],
  "osteopath-clinic-software-automation-solutions": ["osteopath"],
  "physiotherapy-clinic-software-automation-solutions": ["physiotherapist"],
  "podiatry-clinic-software-automation-solutions": ["podiatrist"],
  "psychology-practice-software-automation-solutions": ["psychologist"],
  "barber-shop-booking-automation-solutions": ["barber"],
  "consulting-business-software-automation-solutions": ["consulting"],
  "education-software-automation-solutions": ["education"],
  "fuel-station-management-software-solutions": ["fuel-station"],
  "gym-fitness-management-software-solutions": ["gym", "gym-fitness"],
  "hairdresser-salon-booking-automation-solutions": ["hairdresser"],
  "hvac-service-business-automation-solutions": ["hvac"],
  "legal-services-case-management-automation-solutions": ["legal-services"],
  "travel-agency-booking-automation-solutions": ["travel-services"],
  "accounting-firm-software-automation-solutions": ["accountant"],
  "architecture-design-project-management-solutions": ["architecture-design"],
  "commercial-business-software-automation-solutions": ["commercial"],
  "insurance-agency-crm-automation-solutions": ["insurance"],
  "property-management-software-automation-solutions": ["property-management"],
  "residential-service-business-automation-solutions": ["residential"],
  "carpentry-business-software-automation-solutions": ["carpentry"],
  "cleaning-business-booking-automation-solutions": ["cleaning"],
  "electrician-service-business-automation-solutions": ["electrician"],
  "mechanic-auto-repair-software-automation-solutions": ["mechanic"],
  "painter-service-business-automation-solutions": ["painter"],
};

const INDUSTRY_LEGACY_TO_PUBLIC_SLUG = Object.fromEntries(
  Object.entries(INDUSTRY_PUBLIC_SLUG_ALIASES).flatMap(([publicSlug, aliases]) =>
    aliases.map((alias) => [alias, publicSlug]),
  ),
) as Record<string, string>;

const INDUSTRY_SLUG_ALIASES: Record<string, string[]> = {
  "beauty-therapist": ["beautytherapist"],
  gym: ["gym-fitness"],
  ...INDUSTRY_PUBLIC_SLUG_ALIASES,
};

export function toPublicIndustrySlug(slug: string): string {
  const canonicalSlug = toCanonicalSlug(slug);
  const publicSlug = INDUSTRY_LEGACY_TO_PUBLIC_SLUG[canonicalSlug];

  if (publicSlug) {
    return publicSlug;
  }

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
