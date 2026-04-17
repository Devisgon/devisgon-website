import { cookies } from "next/headers";
import { cache } from "react";

const SUPPORTED_LANGS = new Set(["en", "ur", "ar", "fr", "zh", "de", "es"]);
const DEFAULT_LANG = "en";

export const normalizeLanguage = (value?: string | null): string => {
  if (!value) return DEFAULT_LANG;
  const lang = value.toLowerCase().trim();
  return SUPPORTED_LANGS.has(lang) ? lang : DEFAULT_LANG;
};

export const getCachedLanguage = cache(
  async (queryLang?: string | string[]): Promise<string> => {
    const normalizedQuery = normalizeLanguage(
      Array.isArray(queryLang) ? queryLang[0] : queryLang,
    );

    if (normalizedQuery !== DEFAULT_LANG || queryLang) {
      return normalizedQuery;
    }

    const cookieStore = await cookies();
    return normalizeLanguage(cookieStore.get("lang")?.value);
  },
);

