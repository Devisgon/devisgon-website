import translate from "translate";

const supportedLangs = new Set(["en", "ur", "ar", "zh", "es", "de", "fr"]);
const strictNonEnglishLangs = new Set(["ur", "ar", "zh"]);

const translationTargetsByLang: Record<string, string[]> = {
  en: ["en"],
  ur: ["ur"],
  ar: ["ar"],
  zh: ["zh-CN", "zh", "zh-Hans"],
  es: ["es"],
  de: ["de"],
  fr: ["fr"],
};

const inMemoryCache = new Map<string, Promise<string>>();

type TranslateEngine = "google" | "deepl" | "libre" | "yandex";
const allowedEngines: TranslateEngine[] = [
  "google",
  "deepl",
  "libre",
  "yandex",
];

const requestedEngine = process.env.BLOG_TRANSLATE_ENGINE as
  | TranslateEngine
  | undefined;

if (requestedEngine && allowedEngines.includes(requestedEngine)) {
  translate.engine = requestedEngine;
}

if (process.env.BLOG_TRANSLATE_KEY) {
  translate.key = process.env.BLOG_TRANSLATE_KEY;
}

if (process.env.BLOG_TRANSLATE_URL) {
  (
    translate as unknown as {
      url?: string;
    }
  ).url = process.env.BLOG_TRANSLATE_URL;
}

(
  translate as unknown as {
    from?: string;
    cache?: number;
  }
).from = "en";
(
  translate as unknown as {
    from?: string;
    cache?: number;
  }
).cache = 1000 * 60 * 60;

function normalizeBlogLanguage(lang: string) {
  const raw = lang.toLowerCase().trim();
  if (raw === "zh-cn" || raw === "zh-hans" || raw === "zh-hant" || raw === "cn") {
    return "zh";
  }

  const base = raw.split("-")[0];
  return supportedLangs.has(base) ? base : raw;
}

function shouldTranslateText(value: string) {
  if (!value.trim()) return false;
  if (/^https?:\/\//i.test(value)) return false;
  if (/^[\d\s\W_]+$/u.test(value)) return false;
  return true;
}

function hasLatinLetters(value: string) {
  return /[A-Za-z]/.test(value);
}

function removeLatinWordTokens(value: string) {
  return value
    .replace(/\b[A-Za-z][A-Za-z0-9'-]*\b/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function enforceStrictNonEnglishOutput(value: string, lang: string, original: string) {
  if (!strictNonEnglishLangs.has(lang)) return value;
  if (!hasLatinLetters(value)) return value;

  const cleaned = removeLatinWordTokens(value);
  if (cleaned) return cleaned;

  if (lang === "zh") return "内容翻译中";
  if (lang === "ar") return "يتم ترجمة المحتوى";
  if (lang === "ur") return "مواد کا ترجمہ جاری ہے";

  return original;
}

export async function translateTextForLanguage(value: string, lang: string) {
  const normalizedLang = normalizeBlogLanguage(lang);
  if (!supportedLangs.has(normalizedLang) || normalizedLang === "en") return value;
  if (!shouldTranslateText(value)) return value;

  const targets = translationTargetsByLang[normalizedLang] ?? ["en"];
  const cacheKey = `${normalizedLang}::${value}`;

  const existing = inMemoryCache.get(cacheKey);
  if (existing) return existing;

  const promise = (async () => {
    for (const target of targets) {
      try {
        const translated = await translate(value, { to: target, from: "en" });
        if (!translated) continue;

        const strict = enforceStrictNonEnglishOutput(
          translated,
          normalizedLang,
          value,
        );
        if (strict) return strict;
      } catch {
        // Continue with fallback targets.
      }
    }

    const strictFallback = enforceStrictNonEnglishOutput(
      value,
      normalizedLang,
      value,
    );
    return strictFallback || value;
  })();

  inMemoryCache.set(cacheKey, promise);
  return promise;
}

export async function translateLexicalContentForLanguage(
  content: unknown,
  lang: string,
): Promise<unknown> {
  if (!content || lang === "en") return content;

  if (Array.isArray(content)) {
    const translatedItems = await Promise.all(
      content.map((item) => translateLexicalContentForLanguage(item, lang)),
    );
    return translatedItems;
  }

  if (typeof content !== "object") {
    return content;
  }

  const obj = content as Record<string, unknown>;
  const entries = await Promise.all(
    Object.entries(obj).map(async ([key, value]) => {
      if (key === "text" && typeof value === "string") {
        return [key, await translateTextForLanguage(value, lang)] as const;
      }

      if (Array.isArray(value) || (value && typeof value === "object")) {
        return [key, await translateLexicalContentForLanguage(value, lang)] as const;
      }

      return [key, value] as const;
    }),
  );

  return Object.fromEntries(entries);
}
