"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { WorkImageSlot } from "@/data/featured-work";

type Props = {
  images: WorkImageSlot[];
  labels: {
    openAlbum: string;
    openFullImage: string;
    closeAlbum: string;
    imagePending: string;
  };
};

export default function ProjectGallery({ images, labels }: Props) {
  const [activeAlbum, setActiveAlbum] = useState<WorkImageSlot | null>(null);

  useEffect(() => {
    if (!activeAlbum) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveAlbum(null);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeAlbum]);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        {images.map((image) => (
          <figure key={image.title} className="overflow-hidden rounded-2xl border border-[#D1AFEC]/70">
            {image.albumImages?.length ? (
              <button
                type="button"
                onClick={() => setActiveAlbum(image)}
                aria-haspopup="dialog"
                aria-label={labels.openAlbum + ": " + image.title}
                className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#A71A7F]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#15121a]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="flex items-center justify-between gap-3 border-t border-[#D1AFEC]/50 p-4 text-sm font-medium">
                  <span>{image.title}</span>
                  <span className="text-xs text-t-secondary">{labels.openAlbum} ↗</span>
                </figcaption>
              </button>
            ) : image.src ? (
              <a href={image.src} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#15121a]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="flex items-center justify-between gap-3 border-t border-[#D1AFEC]/50 p-4 text-sm font-medium">
                  <span>{image.title}</span>
                  <span className="text-xs text-t-secondary">{labels.openFullImage} ↗</span>
                </figcaption>
              </a>
            ) : (
              <>
                <div className="flex aspect-[16/10] items-center justify-center bg-[#F7F0FC] p-6 text-center dark:bg-[#281731]">
                  <div>
                    <p className="font-semibold">{image.title}</p>
                    <p className="mt-2 text-sm text-t-secondary">{labels.imagePending}</p>
                    <code className="mt-3 block break-all text-xs">{image.uploadPath}</code>
                  </div>
                </div>
                <figcaption className="border-t border-[#D1AFEC]/50 p-4 text-sm font-medium">{image.title}</figcaption>
              </>
            )}
          </figure>
        ))}
      </div>

      {activeAlbum?.albumImages?.length ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
          <button
            type="button"
            aria-label={labels.closeAlbum}
            onClick={() => setActiveAlbum(null)}
            className="absolute inset-0 z-0 h-full w-full cursor-default bg-black/75 backdrop-blur-sm"
          />
          <section
            role="dialog"
            aria-modal="true"
            aria-label={activeAlbum.title}
            className="relative z-10 flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-[#D1AFEC]/50 bg-bg-primary shadow-2xl"
          >
            <header className="flex items-center justify-between gap-4 border-b border-[#D1AFEC]/40 px-5 py-4 sm:px-7">
              <div>
                <h3 className="text-xl font-semibold sm:text-2xl">{activeAlbum.title}</h3>
                <p className="mt-1 text-sm text-t-secondary">{activeAlbum.albumImages.length} images</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveAlbum(null)}
                className="shrink-0 rounded-lg border border-[#D1AFEC]/60 px-4 py-2 text-sm font-medium hover:bg-[#F7F0FC] dark:hover:bg-[#281731]"
              >
                {labels.closeAlbum}
              </button>
            </header>

            <div className="overflow-y-auto p-4 sm:p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                {activeAlbum.albumImages.map((image) => (
                  <figure key={image.src} className="overflow-hidden rounded-xl border border-[#D1AFEC]/50">
                    <a
                      href={image.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={labels.openFullImage + ": " + image.title}
                      className="group block"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#15121a]">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      </div>
                      <figcaption className="flex items-center justify-between gap-3 border-t border-[#D1AFEC]/40 p-3 text-sm">
                        <span>{image.title}</span>
                        <span className="shrink-0 text-xs text-t-secondary">{labels.openFullImage} ↗</span>
                      </figcaption>
                    </a>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
