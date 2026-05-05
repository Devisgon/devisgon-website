import fs from "fs";
import path from "path";
import type { OtherHostingPageData } from "@/types/others_page";

const LANGUAGE_FOLDER_MAP: Record<string, string> = {
  en: "english_data",
  ur: "urdu_data",
  ar: "arabic_data",
  fr: "french_data",
  de: "german_data",
  es: "spanish_data",
  zh: "chinese_data",
};

function readJsonFile<T>(filePath: string): T | null {
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }

    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
  } catch {
    return null;
  }
}

export function getOtherHostingData(lang: string, slug: string): OtherHostingPageData | null {
  const langFolder = LANGUAGE_FOLDER_MAP[lang] ?? LANGUAGE_FOLDER_MAP.en;
  const localizedPath = path.join(process.cwd(), "src", "data", langFolder, "others", `${slug}.json`);
  const localizedData = readJsonFile<OtherHostingPageData>(localizedPath);

  if (localizedData) {
    return localizedData;
  }

  const fallbackPath = path.join(process.cwd(), "src", "data", LANGUAGE_FOLDER_MAP.en, "others", `${slug}.json`);
  return readJsonFile<OtherHostingPageData>(fallbackPath);
}
