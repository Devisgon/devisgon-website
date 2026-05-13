export function toCanonicalSlug(value: string): string {
  return value.trim().toLowerCase().replace(/[_\s]+/g, "-").replace(/-+/g, "-");
}

export function toLegacySlug(value: string): string {
  return value.trim().toLowerCase().replace(/[\s-]+/g, "_").replace(/_+/g, "_");
}

export function getSlugCandidates(value: string): string[] {
  return Array.from(new Set([value, toLegacySlug(value), toCanonicalSlug(value)]));
}
