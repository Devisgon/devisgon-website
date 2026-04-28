import { cookies } from "next/headers";
import { cache } from "react";

const SUPPORTED_LANGS = new Set(["en", "ur", "ar", "fr", "zh", "de", "es"]);
const DEFAULT_LANG = "en";

const LANGUAGE_ALIASES: Record<string, string> = {
  "zh-cn": "zh",
  "zh-hans": "zh",
  "zh-hant": "zh",
  cn: "zh",
};

export const normalizeLanguage = (value?: string | null): string => {
  if (!value) return DEFAULT_LANG;
  const raw = value.toLowerCase().trim();
  const alias = LANGUAGE_ALIASES[raw];
  if (alias && SUPPORTED_LANGS.has(alias)) return alias;

  if (SUPPORTED_LANGS.has(raw)) return raw;

  const base = raw.split("-")[0];
  return SUPPORTED_LANGS.has(base) ? base : DEFAULT_LANG;
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
