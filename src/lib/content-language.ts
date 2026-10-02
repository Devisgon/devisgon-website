import { translateTextForLanguage } from "@/lib/blog-language";

const PRESERVED_KEYS = new Set([
  "slug", "href", "link", "url", "src", "image", "video", "video_url",
  "icon", "id", "key", "type", "@type", "email", "phone", "value", "number", "robots",
]);

/** Translate authored text while preserving route identifiers and media references. */
export async function localizeContentTree<T>(value: T, lang: string, key = ""): Promise<T> {
  if (lang === "en") return value;
  if (typeof value === "string") {
    if (PRESERVED_KEYS.has(key) || /^https?:\/\//i.test(value) || value.startsWith("/")) return value;
    return await translateTextForLanguage(value, lang) as T;
  }
  if (Array.isArray(value)) {
    return await Promise.all(value.map((item) => localizeContentTree(item, lang))) as T;
  }
  if (value && typeof value === "object") {
    const entries = await Promise.all(Object.entries(value).map(async ([childKey, childValue]) => [childKey, await localizeContentTree(childValue, lang, childKey)] as const));
    return Object.fromEntries(entries) as T;
  }
  return value;
}
