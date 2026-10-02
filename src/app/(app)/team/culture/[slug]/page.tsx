import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
import CultureGallery from "@/components/culture_gallery";
import { companyContent, getCultureAlbum } from "@/lib/company-content";
import { getJsonSeoMetadata } from "@/lib/seo";
import styles from "../../team.module.css";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return companyContent.albums.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params; const album = getCultureAlbum(slug);
  if (!album) return {};
  return getJsonSeoMetadata({ title: `${album.title} — Team Culture | Devisgon`, description: album.description, robots: album.photos.length ? "index,follow" : "noindex,follow" }, {}, `/team/culture/${album.slug}`);
}
export default async function CultureAlbumPage({ params }: Props) {
  const { slug } = await params; const album = getCultureAlbum(slug); if (!album) notFound();
  return <><Header /><div className={styles.page}><section className={styles.hero}><Link href="/team#culture" className={styles.backLink}><ArrowLeft size={16} />All culture albums</Link><p className={styles.eyebrow}>{album.category}</p><h1>{album.title}</h1><p>{album.description}</p></section><section className={styles.section} aria-label={`${album.title} photo album`}><CultureGallery title={album.title} photos={album.photos} /></section></div><Footer /></>;
}
