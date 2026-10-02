"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { CulturePhoto } from "@/lib/company-content";
import styles from "@/app/(app)/team/team.module.css";

export default function CultureGallery({ title, photos }: { title: string; photos: CulturePhoto[] }) {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const photo = active === null ? null : photos[active];
  useEffect(() => {
    const element = dialog.current;
    if (active === null) { if (element?.open) element.close(); opener.current?.focus(); return; }
    if (!element?.open) element?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [active]);
  function close() { setActive(null); }
  function navigate(direction: number) { setActive((current) => current === null ? null : (current + direction + photos.length) % photos.length); }
  if (!photos.length) return <div className={styles.emptyAlbum}><Camera size={40} strokeWidth={1.2} /><h2>Photos coming soon.</h2><p>This album will bring our {title.toLowerCase()} moments together.</p></div>;
  return <><p className={styles.photoCount}>{photos.length} photos · Select a photo to open the viewer</p><div className={styles.photoGrid}>{photos.map((item, index) => <button key={item.src} type="button" aria-label={`View photo ${index + 1}: ${item.alt}`} onClick={(event) => { opener.current = event.currentTarget; setActive(index); }}><Image src={item.src} alt={item.alt} width={640} height={480} sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 30vw" />{item.caption && <span>{item.caption}</span>}</button>)}</div><dialog ref={dialog} className={styles.photoDialog} aria-label={`${title} photo viewer`} onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => { if (event.target === event.currentTarget) close(); }} onKeyDown={(event) => { if (event.key === "ArrowLeft") { event.preventDefault(); navigate(-1); } if (event.key === "ArrowRight") { event.preventDefault(); navigate(1); } }}>
    {photo && <div className={styles.viewer}><div className={styles.viewerTop}><span>{title} · {(active ?? 0) + 1} / {photos.length}</span><button type="button" onClick={close} aria-label="Close photo viewer"><X size={23} /></button></div><div className={styles.viewerImage}><Image src={photo.src} alt={photo.alt} width={1600} height={1200} sizes="90vw" /></div><div className={styles.viewerBottom}><button type="button" onClick={() => navigate(-1)} aria-label="Previous photo" disabled={photos.length < 2}><ChevronLeft size={24} /></button><p>{photo.caption || photo.alt}</p><button type="button" onClick={() => navigate(1)} aria-label="Next photo" disabled={photos.length < 2}><ChevronRight size={24} /></button></div></div>}
  </dialog></>;
}
