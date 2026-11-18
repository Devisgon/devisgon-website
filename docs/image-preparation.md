# Static image preparation

Run `npm ci` and `npm run build`. The prebuild hook prepares WebP derivatives with Sharp before Next compiles. Use `npm run images:prepare` for an independent run and `npm run verify:images` for validation. Development commands run preparation too. Do not override the deployment build command with bare `next build`.

Images are processed sequentially in four batches: home/portfolio, technologies, services, and remaining public images. Widths are 160, 320, 480, 800, 1200 and 1600 pixels, capped at source width, quality 82. Aspect ratios and transparency are preserved; images are not enlarged. Small files (12 KB or less) and animations remain original. Original files are retained; generated assets and the JSON manifest are ignored by Git and regenerated during builds. Content hashes allow immutable caching and reuse within the build workspace.

The custom Next image loader retains responsive srcsets, explicit dimensions and lazy loading while selecting static files instead of `/_next/image`. Unknown sources fall back directly, without runtime optimization. Existing `unoptimized` images also remain direct. Static file bandwidth and build usage still count toward hosting limits; this does not promise unlimited free traffic or reset already consumed quota.

The build reads public production CMS media, with timeouts, a 20 MB download cap and no writes. Existing large SVG covers are rasterized to responsive WebP. The original CMS files remain unchanged. Covers include the media updatedAt value in their source key, so uploads replaced after deployment fall back to their current direct URL until the next build. CMS failures warn and leave direct fallback available. Future supported raster uploads are resized inside 1600 × 1600 and encoded as WebP by Payload. SVG uploads are not resized by Payload; their covers are prepared on the next deployment.

Per-image input bytes, derivative bytes and warnings are written to `.image-report/results.json`. Unreadable legacy source files are preserved with a warning rather than blocking every image. The known unsupported `all_services/mobile_design/wwg.avif` has no source-code reference.

## Measured results

All 336 local raster images were attempted: 335 processed and one unsupported, unreferenced AVIF preserved. Six public CMS covers were processed. Across the 341 readable sources, 274 have responsive variants and 67 small/animated files remain direct. Total original bytes are 73,478,070; choosing the largest prepared variant for each source totals 20,427,002 bytes (72.2% smaller). This is an inventory comparison, not actual visitor bandwidth. See `image-optimization-results.md` for every source.

The CEO portrait is 1,949,564 bytes originally, 82,868 bytes at its native 1122 px width, or 53,176 bytes at 800 px. Portrait and CMS-cover outputs were visually inspected.

## Validation

`npm run lint` passes. All 34 checks pass (6 image, 6 growth, 12 navigation, 10 homepage). Production compilation and TypeScript validation pass. The complete `npm run build` stops while collecting `/api/apply_mail` page data because this workspace lacks `RESEND_API_KEY`; validate the Vercel preview with the project's existing environment variables before merging. No production credentials or CMS records were changed.
