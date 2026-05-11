export function toCanonicalSlug(value: string): string {
  return value.replace(/_/g, "-");
}

export function toLegacySlug(value: string): string {
  return value.replace(/-/g, "_");
}

export function getSlugCandidates(value: string): string[] {
  return Array.from(new Set([value, toLegacySlug(value), toCanonicalSlug(value)]));
}
