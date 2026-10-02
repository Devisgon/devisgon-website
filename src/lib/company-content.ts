import content from "@/data/company.json";
export type CulturePhoto = { src: string; alt: string; caption?: string };
export type CultureAlbum = { slug: string; title: string; category: string; description: string; photos: CulturePhoto[] };
export const companyContent = { ...content, albums: content.albums as CultureAlbum[] };
export function getCultureAlbum(slug: string) { return companyContent.albums.find((album) => album.slug === slug); }
