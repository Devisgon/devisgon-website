import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
import CultureGallery from "@/components/culture_gallery";
import { companyContent, getCultureAlbum } from "@/lib/company-content";
import { getJsonSeoMetadata } from "@/lib/seo";
import { getCachedLanguage } from "@/lib/language";
import { localizeContentTree } from "@/lib/content-language";
import styles from "../../team.module.css";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return companyContent.albums.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params; const album = getCultureAlbum(slug);
  if (!album) return {};
  const lang = await getCachedLanguage();
  const seo = await localizeContentTree({ title: `${album.title} — Team Culture | Devisgon`, description: album.description, robots: album.photos.length ? "index,follow" : "noindex,follow" }, lang);
  return getJsonSeoMetadata(seo, {}, `/team/culture/${album.slug}`);
}
export default async function CultureAlbumPage({ params }: Props) {
  const { slug } = await params; const album = getCultureAlbum(slug); if (!album) notFound();
  const lang = await getCachedLanguage();
  const localizedAlbum = await localizeContentTree(album, lang);
  const copy = await localizeContentTree({ allAlbums: "All culture albums", photosComing: "Photos coming soon.", emptyDescription: `This album will bring our ${album.title.toLowerCase()} moments together.`, photoCount: "photos · Select a photo to open the viewer", viewPhoto: "View photo", close: "Close photo viewer", previous: "Previous photo", next: "Next photo", viewer: "photo viewer" }, lang);
  return <><Header /><div className={styles.page}><section className={styles.hero}><Link href="/team#culture" className={styles.backLink}><ArrowLeft size={16} />{copy.allAlbums}</Link><p className={styles.eyebrow}>{localizedAlbum.category}</p><h1>{localizedAlbum.title}</h1><p>{localizedAlbum.description}</p></section><section className={styles.section} aria-label={`${localizedAlbum.title} photo album`}><CultureGallery title={localizedAlbum.title} photos={localizedAlbum.photos} copy={copy} /></section></div><Footer /></>;
}
