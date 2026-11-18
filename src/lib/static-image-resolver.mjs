export function resolveStaticImage(manifest, { src, width }) {
  let key = src;
  if (src.startsWith('/') && !src.startsWith('//') && !/[?#]/.test(src)) {
    try { key = decodeURIComponent(src); } catch { return src; }
  }
  const variants = Object.hasOwn(manifest, key) ? manifest[key] : undefined;
  if (!variants?.length) return src;
  const selected = variants.find(item => item.width >= width) || variants[variants.length - 1];
  return selected.src.startsWith('/') ? selected.src.split('/').map(encodeURIComponent).join('/') : selected.src;
}
export function mediaImageSource(media) {
  if (!media?.url) return '';
  if (!media.updatedAt) return media.url;
  try {
    const url = new URL(media.url, 'https://www.devisgon.com');
    url.searchParams.set('v', media.updatedAt);
    return url.href;
  } catch { return media.url; }
}
