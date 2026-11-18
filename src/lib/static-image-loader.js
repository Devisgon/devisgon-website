'use client';
import manifest from '../generated/image-manifest.json';
import { resolveStaticImage } from './static-image-resolver.mjs';
export default function staticImageLoader(props) {
  return resolveStaticImage(manifest, props);
}
