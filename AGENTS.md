# AGENTS.md

## Purpose
This file is the working map for the codebase. It explains how requests flow through the app, where content comes from, and what must be updated when code changes.

## Update Contract (Mandatory)
When any feature code, route, API behavior, CMS schema, or data shape changes, update this file in the same change.

Required actions after each meaningful code change:
1. Update the relevant sections in this file.
2. Add one line to the Change Log at the end.
3. Run `npm run lint`.
4. If routing or build config changed, also run `npm run build`.

## Stack
- Framework: Next.js App Router (`next@15.4`) with React 19.
- Styling: Tailwind + custom CSS variables in `src/app/(app)/globals.css`.
- CMS: Payload 3 with PostgreSQL and S3 storage plugin.
- Data model: Hybrid static JSON content + CMS-managed blog/careers/media.
- Email: Resend in server routes.
- i18n: `lang` cookie is the source of truth; server pages resolve language via `src/lib/language.ts`.

## High-Level Architecture
- Public site lives in route group `src/app/(app)`.
- CMS/admin and generated Payload API routes live in `src/app/(payload)`.
- Most marketing and service content is loaded from JSON in `src/data/*`.
- Industries content is JSON-driven with language files in each `src/data/*_data/industries/<category>/<slug>.json` folder.
- Technologies content is JSON-driven with language files in category-scoped folders under `src/data/*_data/technologies/<category>/<slug>.json` (with category `index.json` for main category pages).
- Blog list and blog detail pages are CMS-driven from Payload `blogs` collection using a single-source blog model (one post per slug), with server-side auto-translation of title/category/rich-text into the selected language from the `lang` cookie.
- Newsletter subscribers are stored in Payload `newsletter-subscribers` (PostgreSQL/Supabase table) and used for update broadcasts.
- Contact and apply forms post to internal API routes, then send email via Resend.
- Footer newsletter form posts to internal `/api/newsletter_subscribe`, stores subscribers, and sends confirmation emails.
- Navbar, footer, contact-page, and get-started-page UI copy are language-aware through `src/lib/localized-content.ts` and per-language JSON data files in `src/data/*_data`.
- Footer is a client component that syncs language from the `lang` cookie and listens to `app-language-change`; newsletter form copy/errors/buttons are language-aware in `src/components/footer_newsletter_form.tsx`.
- Shared language resolver is cached with React `cache()` in `src/lib/language.ts` and reused across pages.
- Centralized SEO metadata and JSON-LD structured data are defined in `src/lib/seo.ts` and injected in `src/app/(app)/layout.tsx`.

## Route Flow
### Public Pages
- `/` -> `src/app/(app)/page.tsx` -> `Header` + server-rendered `home_page/main_page` + streamed home blogs preview (`Suspense`) + `Footer`.
- Home blogs preview route segment (`src/components/home_page/blogs.tsx`) resolves `lang` from cookie and injects localized `home_page.blog_section` heading/subheading before rendering shared blog list.
- `/services` -> `src/app/(app)/services/page.tsx` reads `lang` cookie, loads `services_page.json` from language map.
- `/industries` -> `src/app/(app)/industries/page.tsx` reads `lang` cookie, loads `industries_page.json` hero content, then renders grouped category subsections from `src/data/navbar.json` Industries dropdown columns (`Healthcare`, `Professional`, `Trades`, `Entertainment`, `Agriculture`, `Real Estate`); each sub-industry card is enriched from its detail JSON (`src/data/*_data/industries/<category>/<slug>.json`) for title/description/icon with localized links.
- `/technologies` -> `src/app/(app)/technologies/page.tsx` reads `lang` cookie, loads `technologies_page.json` hero content, then renders grouped category subsections from language-specific navbar data (`src/data/*_data/navbar.json`) Technologies dropdown columns (`Database`, `Frameworks`, `Languages`, `Tools`); each sub-technology card is enriched from its detail JSON (`src/data/*_data/technologies/<category>/<slug>.json`) for title/description/icon with localized links.
- `/blogs` -> `src/app/(app)/blogs/page.jsx` and `components/blogs_page/blogs.tsx` query all published Payload `blogs` and auto-translate blog title/category to the selected language before rendering; blog hero copy and list UI labels resolve by selected language.
- `/blogs/[slug]` -> `src/app/(app)/blogs/[slug]/page.tsx` queries Payload by slug (published only), auto-translates title + lexical rich text + recent-post titles to selected language, and renders translated lexical rich text.
- `/contact` -> `src/app/(app)/contact/page.tsx` resolves `lang` from cookie, injects localized `contact_page.json` content into `src/components/contact_page/contact_page_client.tsx`, and client form posts to `/api/contact_mail`.
- `/get-started` -> `src/app/(app)/get-started/page.tsx` server wrapper (`dynamic = "force-dynamic"`) renders `src/components/get_started/get_started_client.tsx`; client form posts to `/api/apply_mail`, pulls careers and form global settings from Payload REST endpoints, localizes UI copy from `get_started_page.json` by cookie language, and only shows `Job`/`Internship` application types that currently have active programs.
- `/privacy_policies` and `/terms_condition` -> server components reading language-specific JSON by cookie.

### Service Detail Pages
All service detail routes share one rendering pattern:
- Routes:
  - `/services/automations/[slug]`
  - `/services/design/[slug]`
  - `/services/web_and_mobile_development/[slug]`
  - `/services/data_solutions/[slug]`
  - `/services/testing/[slug]`
  - `/services/saas/[slug]`
  - `/services/cloud/[slug]`
- Each route:
  - is a server component,
  - reads `lang` from URL query param (`?lang=`) with cookie fallback (`lang`) then `en`,
  - pulls content from `src/data/loaders/*.ts` map by slug,
  - renders shared section components (`hero`, `introduction`, `key_benefits`, `what_we_do`, `technologies`, `process`, `case_study`, `faq`, `contact`).

### Industry Detail Pages
- Canonical route:
  - `/industries/[category]/[slug]` (served by `src/app/(app)/industries/[...segments]/page.tsx`).
- Legacy compatibility route:
  - `/industries/[slug]` -> server redirect to `/industries/[category]/[slug]` using `src/data/loaders/industries.ts` slug-to-category mapping.
- Route behavior:
  - server component with metadata from `src/lib/seo.ts`,
  - reads `lang` from URL query param (`?lang=`) with cookie fallback (`lang`) then `en`,
  - loads category + slug data from `src/data/loaders/industries.ts` with English fallback if localized file is missing,
  - renders reusable sections from `src/components/industries/*` (`hero`, `friction`, `architecture`, `key_benefits`, optional `carousel`, `case_studies`, `explore`, `conversation`),
  - hero now receives carousel cards and rotates card title/description smoothly via `src/components/industries/hero_rotating_copy.tsx`.

### Technology Detail Pages
- Canonical route:
  - `/technologies/[slug]` (served by `src/app/(app)/technologies/[slug]/page.tsx`).
- Route behavior:
  - server component with metadata from `src/lib/seo.ts`,
  - reads `lang` from URL query param (`?lang=`) with cookie fallback (`lang`) then `en`,
  - loads slug data from `src/data/loaders/technologies.ts` with English fallback if localized file is missing,
  - renders dedicated technology sections from `src/components/technologies/*` (`hero` with left-content/right-image layout, `why_use`, `architecture`, `competitive_edge`, `quote`, `conversation`),
  - technology section styling uses global theme variables (`bg-bg-primary`, `bg-bg-secondary`, `text-t-primary`, `text-t-secondary`, `bg-btn-primary`) with alternating section backgrounds for light/dark parity.

## Data Flow
### Static JSON Content
- Base folders by language in `src/data/*_data`.
- Home/services/privacy/terms pages use language-specific JSON maps in route files.
- Service detail pages use loader files in `src/data/loaders/*.ts` that map `{lang -> {slug -> json}}`.
- Industry main page uses `src/data/*_data/industries_page.json`.
- Industry main page hero content uses `src/data/*_data/industries_page.json`; category sections and sub-industry links are sourced from `src/data/navbar.json` Industries dropdown columns.
- Industry detail pages use `src/data/*_data/industries/<category>/<slug>.json` and `src/data/loaders/industries.ts` filesystem loaders.
- Industry detail `hero_section.background_image` fields now point to slug/category-specific assets under `public/industries/*.webp`.
- Technologies main page uses `src/data/*_data/technologies_page.json`.
- Technologies main page hero content uses `src/data/*_data/technologies_page.json`; category sections and sub-technology links are sourced from language-specific `src/data/*_data/navbar.json` Technologies dropdown columns.
- Technology detail pages use `src/data/*_data/technologies/<category>/<slug>.json` and `src/data/loaders/technologies.ts` filesystem loaders.
- Navbar labels/dropdowns are sourced from `src/data/navbar.json` (English) and `src/data/*_data/navbar.json` (localized variants), resolved by `src/lib/localized-content.ts`.
- Footer copy is sourced from `src/data/*_data/footer.json`.
- Footer column titles and link labels are language-specific in `src/data/*_data/footer.json`; newsletter placeholder/button/validation/success copy is localized in component state maps.
- Contact-page UI copy is sourced from `src/data/*_data/contact_page.json`.
- Get-started page UI copy is sourced from `src/data/*_data/get_started_page.json`.
- Technologies data is organized by main category folders:
  - `technologies/languages/index.json` + language subcategory files (for example `java.json`, `python.json`),
  - `technologies/frameworks/index.json` + framework subcategory files (for example `react.json`, `nestjs.json`),
  - `technologies/database/index.json` + database subcategory files (for example `mongodb.json`, `mysql.json`),
  - `technologies/tools/index.json` + tools subcategory files (for example `n8n.json`, `shopify.json`).
- Technology detail JSON schema is custom (separate from industries) and includes:
  - `hero_section` (`side_image`, `primary_cta`, `secondary_cta`),
  - `why_use_section` (`paragraphs` + right-column icon cards),
  - `architecture_section` (`image` + numbered `items`),
  - `edge_section` (`metric` cards),
  - `quote_section`,
  - `conversation_section`.
- Technology detail image fields now resolve to technology-scoped static assets under `public/technologies/<tech-folder>/hero.png` and `public/technologies/<tech-folder>/scope.png`.
- Public marketing/detail imagery is now standardized on `.webp`; legacy `.png`/`.svg` assets are removed when unused (with `/services_page/hero_bg.svg` retained for hero overlay backgrounds still referenced in code).
- Industry detail JSON supports `carousel_section` (title, subtitle, cards[title/description]); these cards are used in two places:
  - rotating hero copy (title + description transitions),
  - the post-key-benefits carousel section in `src/components/industries/carousel.tsx`.
- `scripts/translate_services.mjs` recursively translates all JSON files under `src/data/english_data` into each target language folder (including `chinese_data`) while preserving non-translatable fields such as links/slugs/assets.

### CMS Content (Payload)
Defined in `src/payload.config.ts`:
- Collections:
  - `users` (auth enabled)
  - `media` (uploads + alt text)
  - `blogs` (title, slug hook, cover image, author, date, rich text content, status, after-change newsletter notifications on published/create-update)
  - `careers` (title, type, isActive)
  - `newsletter-subscribers` (email, isActive; stores newsletter recipients in DB table)
- Global:
  - `form-settings` (`isGetStartedFormActive`; after-change newsletter notifications when application form opens/closes)
- DB: PostgreSQL adapter with `DATABASE_URL`.
- Upload storage: S3-compatible storage via Payload S3 plugin.

## API Flow
### Public API Routes
- `POST /api/contact_mail`:
  - receives JSON from contact form,
  - enriches request with IP and geo lookup (`api64.ipify.org`, `ipwho.is`),
  - sends HTML email via Resend, optional attachment.
- `POST /api/apply_mail`:
  - similar flow for application form,
  - includes applicant details and CV attachment.
- `POST /api/newsletter_subscribe`:
  - validates and normalizes email,
  - upserts active subscriber into Payload `newsletter-subscribers`,
  - sends subscription confirmation email via Resend.

### Payload-Generated Routes
- REST: `src/app/(payload)/api/[...slug]/route.ts`
- GraphQL: `src/app/(payload)/api/graphql/route.ts`
- GraphQL playground: `src/app/(payload)/api/graphql-playground/route.ts`
- Admin UI: `src/app/(payload)/admin/[[...segments]]/page.tsx`

Note: files under `src/app/(payload)` marked generated should not be manually edited.

## i18n Behavior
- Language selector (`src/components/language_switch_component.tsx`) sets `lang` cookie, dispatches `app-language-change`, and calls `router.refresh()`.
- Language normalization includes locale aliases (for example `zh-CN`, `zh-Hans`, `cn` -> `zh`) in both `src/lib/language.ts` and `src/lib/localized-content.ts`.
- Server pages (home/services/privacy/terms/blog listing) read cookie for language.
- Industries main page reads cookie for language.
- Navbar and footer read localized JSON content using the selected `lang` value.
- Contact page copy is injected from `src/data/*_data/contact_page.json` based on cookie language.
- Get-started page copy is injected from `src/data/*_data/get_started_page.json` based on cookie language.
- Service detail pages resolve language in this order: `?lang=` query -> `lang` cookie -> `en`.
- Industry detail pages resolve language in this order: `?lang=` query -> `lang` cookie -> `en`.
- Client-side i18next payload loading has been removed from root layout to reduce JS parsing and hydration cost.

## Navigation and Slug Source of Truth
- Main nav and service links are in `src/data/navbar.json`.
- Localized navbar labels are mirrored in `src/data/*_data/navbar.json`; `src/lib/localized-content.ts` resolves the active language dataset.
- Dropdown categories (`dropdown.columns`) and subcategory links (`links`) in navbar data are maintained in alphabetical order by display name.
- Industries dropdown links are grouped in `src/data/navbar.json` into six columns (`Healthcare`, `Professional`, `Trades`, `Entertainment`, `Agriculture`, `Real Estate`) with sub-industry links.
- Technologies is a separate top-level navbar item in `src/data/navbar.json` with four dropdown columns (`Languages`, `Frameworks`, `Database`, `Tools`) and per-track technology links.
- Technologies dropdown links in `src/data/navbar.json` point directly to dedicated subcategory routes under `/technologies/[slug]` (for example `java`, `javascript`, `python`, `react`, `nestjs`, `mongodb`, `amazon_dynamodb`, `shopify`, `wordpress`).
- Technologies dropdown columns in `src/data/navbar.json` also drive the grouped sections and card ordering on `/technologies`.
- Footer quick links are in `src/components/footer.tsx` and include core crawl targets (`/`, `/services`, `/blogs`, `/contact`, `/get-started`).
- Service detail loaders must expose keys that match nav slugs.
- Industry category/slug paths in `src/data/*_data/industries/<category>/<slug>.json` must match navbar industries links.
- Sitemap generation (`next-sitemap.config.js`) crawls English service JSON files and nested English industries category JSON files and emits language query variants.

## Environment Variables
Required by runtime code:
- `PAYLOAD_SECRET`
- `DATABASE_URL`
- `S3_BUCKET`
- `S3_ENDPOINT`
- `S3_ACCESS_KEY_ID`
- `S3_SECRET_ACCESS_KEY`
- `RESEND_API_KEY`
- `RESEND_DOMAIN`
- `RESEND_EMAIL_USER`
- `NEXT_PUBLIC_CALENDLY_15_MIN_MEETING`
- `NEXT_PUBLIC_CALENDLY_30_MIN_MEETING`
- `NEXT_PUBLIC_CALENDLY_60_MIN_MEETING`

Optional for blog auto-translation tuning:
- `BLOG_TRANSLATE_ENGINE` (e.g. `google`, `deepl`, `libre`)
- `BLOG_TRANSLATE_KEY` (required for engines that need an API key)
- `BLOG_TRANSLATE_URL` (custom endpoint for self-hosted translation engines)

## Operational Commands
- Dev: `npm run dev`
- Dev (force clean cache once): `npm run dev:clean`
- Lint: `npm run lint`
- Build: `npm run build`
- Start: `npm run start`
- Sitemap postbuild: `npm run postbuild`
- Image conversion (PNG/SVG -> WEBP): `npm run images:webp` (recursive under `public`; CLI script supports `--dir`, `--quality`, `--force`, `--dry-run`)

## Change Impact Guide
If you change this, also check this:
- Service slug in JSON -> loader map key + `navbar.json` link + sitemap output.
- Industry category/slug JSON path -> `src/data/loaders/industries.ts` lookup + `navbar.json` grouped industries links + sitemap output.
- Technology slug JSON path (`technologies/<category>/<slug>.json` with category `index.json`) -> `src/data/loaders/technologies.ts` slug-to-category lookup + `navbar.json` Technologies links + sitemap output.
- Service section schema -> shared sub-service components and type files under `src/types/sub_services_page`.
- Industry section schema -> shared industry components under `src/components/industries` + `src/types/industries_page` (including optional `carousel_section` content).
- Changes to `carousel_section.cards` affect both hero rotating copy and the lower carousel cards, so update content with both placements in mind.
- Technology section schema -> dedicated technology components under `src/components/technologies` + `src/types/technologies_page`.
- Theme variable updates in `src/app/(app)/globals.css` also affect `src/components/technologies/*` since technology sections now use global color utility classes end-to-end.
- Blog fields -> `src/collections/Blogs.ts` + blog listing/detail components.
- Newsletter subscriber schema or email flow -> `src/collections/NewsletterSubscribers.ts` + `src/app/(app)/api/newsletter_subscribe/route.ts` + `src/lib/newsletter.ts` + `src/components/footer_newsletter_form.tsx`.
- Blog language behavior -> single-source published queries in `src/components/blogs_page/blogs.tsx` and `src/app/(app)/blogs/[slug]/page.tsx` + server auto-translation helpers in `src/lib/blog-language.ts` + localized blogs-page UI copy/labels in `src/app/(app)/blogs/page.jsx` and `src/components/blogs_page/blogs_ui.tsx`.
- Career/form toggle behavior -> `src/globals/FormSettings.ts`, team section CTA visibility, get-started redirect logic, and dynamic `Job`/`Internship` option visibility driven by active careers.
- Campaign notifications -> hooks in `src/collections/Blogs.ts`, `src/collections/Careers.ts`, and `src/globals/FormSettings.ts` that trigger subscriber broadcasts via Resend.
- Language behavior -> cookie-based server pages + query-param service detail pages + `context/i18n.js`.
- Navbar/footer/contact/get-started localization data -> `src/lib/localized-content.ts` + `src/data/*_data/{navbar,footer,contact_page,get_started_page}.json`.
- API payload fields -> matching form fields in `contact/page.tsx` or `get-started/page.tsx`.
- SEO keywords, page metadata, or JSON-LD sitelinks -> `src/lib/seo.ts` + `src/app/(app)/layout.tsx` + relevant page metadata exports.

## Known Risks and Technical Debt
- `src/data/loaders/digital_design.ts` has Arabic/German imports swapped for `ar` and `de` language maps.
- Several UI strings show encoding artifacts in source files.
- No test suite is present (`*.test.*`/`*.spec.*` not found).
- `eslint.ignoreDuringBuilds` is enabled in `next.config.ts`, so CI should lint explicitly.

## Change Log
- 2026-04-17: Initial codebase flow map added.
- 2026-04-17: Converted dynamic service detail pages to server components (query/cookie language resolution) and removed multiple unused imports/variables across routes and components.
- 2026-04-17: Performance pass: moved key hero/service sections to server rendering, deferred below-the-fold home interactive sections, removed repeating animation loops/autoplay, and enabled cached blog listing fetches.
- 2026-04-17: Reduced client bundle bloat by converting icon-heavy service/sub-service sections from framer-motion client components to server-rendered static components; rebuilt successfully and confirmed large First Load JS reduction.
- 2026-04-17: Homepage SSR-first hardening: converted award/process/team sections to server rendering, limited deferred client island to testimonials, removed unnecessary framer usage in testimonials, and changed marquee animation from infinite loop to single run.
- 2026-04-17: Converted footer to SSR markup with isolated client newsletter form island to reduce page-wide hydration cost.
- 2026-04-17: Added cached language resolver (`src/lib/language.ts`) and migrated pages/routes to use it, using cookie as the only language cache source.
- 2026-04-17: Removed global client i18n import from app layout and simplified language switcher to cookie-based refresh flow.
- 2026-04-17: Converted sub-service hero/process sections from client/framer-heavy implementations to server-rendered components and replaced all-icons import with a targeted icon map.
- 2026-04-17: Added centralized SEO metadata config (`src/lib/seo.ts`) and applied page-level metadata to home, services, privacy, terms, contact, and all dynamic service slug routes via `generateMetadata`.
- 2026-04-17: Split contact route into server metadata wrapper (`src/app/(app)/contact/page.tsx`) + client UI component (`src/components/contact_page/contact_page_client.tsx`) to support SEO metadata with no UI change.
- 2026-04-17: Added local SEO keyword targeting (including Okara intent), JSON-LD primary sitelinks schema for Home/Services/Blogs/Contact/Get Started, blogs page metadata, and updated footer quick links for core indexable pages.
- 2026-04-20: Added full industries feature set with reusable components, language-scoped industry JSON data under each `*_data` folder, dynamic `/industries/[slug]` routing, industries main page, navbar industries dropdown links, and sitemap/SEO support.
- 2026-04-20: Updated industries page visual system to full-width section backgrounds with per-section image backdrops and removed rounded card-shell wrappers for a flatter section-first layout.
- 2026-04-20: Fixed industries route/component source encoding by converting new industries TSX files to UTF-8 to resolve Next.js `stream did not contain valid UTF-8` compile errors.
- 2026-04-20: Revised industries styling so only hero sections use image backgrounds while all other sections use solid primary/secondary theme colors with flush section transitions.
- 2026-04-20: Refined industries non-hero sections with split per-section solid color blocks and restored rounded treatment for cards/forms/items while keeping hero-only image backgrounds.
- 2026-04-20: Implemented strict white/color alternating non-hero industries sections and added left-to-right hover fill transitions on industry cards/tiles with matching text color changes.
- 2026-04-20: Replaced hardcoded industries component colors with global theme variable classes and tuned card hover fill animations to smoother duration/easing for consistent themed interaction.
- 2026-04-20: Reordered post-hero industry section theme flow to start with primary color blocks and set contact form container explicitly to white (`bg-btn-secondary`) while keeping hero image sourced from JSON.
- 2026-04-20: Added grouped industries dropdown columns, canonical `/industries/[category]/[slug]` routing with legacy slug redirects, nested industries data loader fallback, recursive industries translation script support, and sitemap crawling for category-based industry URLs.
- 2026-04-20: Corrected desktop navbar mega-dropdown behavior with title-based conditional full-width positioning (separate margins for Services vs Industries) and stable hover-open state management.
- 2026-04-21: Added optional industry detail carousel section (`carousel_section`) rendered after key benefits via new client component and seeded 5-card carousel content in both `travel_services` and `fields` industry JSON files across all language folders.
- 2026-04-21: Hardened local dev startup by updating `npm run dev` to clear `.next` before boot, preventing stale vendor chunk resolution errors such as missing `react-icons` chunk modules.
- 2026-04-21: Seeded `carousel_section` content across all nested industry category JSON files in every language so the industries carousel renders consistently on every industry detail page.
- 2026-04-21: Updated industries hero to rotate smoothly through `carousel_section.cards` title/description and regenerated all category JSON carousel cards with industry-specific website/AI-agent offerings plus conditional receptionist cards for relevant industries.
- 2026-04-21: Refined industries hero rotation so the main hero title and the description panel animate in sync from the same active carousel card.
- 2026-04-21: Added new `real_estate` industry category (`residential`, `commercial`, `property_management`, `architecture_design`) plus new `healthcare/optometry` pages across all language data folders, updated industries listing cards, navbar dropdown links, and industry loader category mapping.
- 2026-04-21: Reworked `/industries` main page to keep the existing hero and render grouped category subsections (category heading + sub-industry cards) based on Industries dropdown columns in `src/data/navbar.json`, with card content mapped from each sub-industry JSON file.
- 2026-04-21: Restyled `/industries` main hero to use image-backed sub-industry-style layout and updated grouped sub-industry cards with centered category headings, wider card sizing, richer descriptions, and per-category/per-link icons.
- 2026-04-21: Fixed `/industries` runtime `undefined.map` failure by hardening listing-card handling, restoring `src/data/english_data/industries_page.json` to expected schema, and sourcing grouped sub-industry cards from `INDUSTRY_GROUPS` + industry detail JSON files.
- 2026-04-21: Unified public-site typography to one font family by removing the global Inter override/import, enforcing Geist via `font-sans` at root layout, and removing the remaining `font-serif` usage from the homepage CEO section.
- 2026-04-21: Changed npm dev workflow to prevent `.next/routes-manifest.json` ENOENT crashes by restoring `npm run dev` to plain `next dev` and keeping cache deletion only in `npm run dev:clean`.
- 2026-04-22: Added a separate top-level `technologies` feature with `/technologies` + `/technologies/[slug]` routes, new multi-language technology JSON datasets (`languages`, `frameworks`, `database`, `tools`), dedicated technology loader/sitemap coverage, and navbar dropdown groups for all requested tech items.
- 2026-04-22: Refactored technologies pages to use dedicated `src/components/technologies/*` sections (including left-content/right-image hero), migrated technology JSON to a custom schema aligned to the provided section designs, and removed technologies dependency on industries section components.
- 2026-04-22: Updated all dedicated technologies sections to use global CSS theme variables (dark/light compatible) and applied alternating section background flow to match services/industries visual rhythm.
- 2026-04-22: Expanded technologies into per-subcategory pages with separate JSON files for every technology slug across all languages, synced dropdown/listing links to those slugs, and replaced technologies card hover/icon behavior with JSON `icon_type` rendering and a distinct spotlight/underline hover effect.
- 2026-04-22: Reorganized technologies JSON into main-category folder structure (`languages`, `frameworks`, `database`, `tools`) with category `index.json` and nested subcategory files in every language folder, and updated technology loaders/sitemap crawling to resolve slugs from the new nested structure.
- 2026-04-23: Wired all technology detail JSON hero/scope image fields to `public/technologies/*` assets across all languages (including slug-to-folder alias mapping) and normalized the `c` folder by adding `hero.png`.
- 2026-04-23: Added root-level WEBP conversion utility (`convert-public-images-to-webp.mjs`) plus `npm run images:webp` to recursively convert `public` PNG/SVG assets into side-by-side `.webp` files.
- 2026-04-23: Completed full public image WEBP rollout (including embedded-SVG and AVIF edge cases), and updated project image references to prefer `.webp` wherever matching assets exist.
- 2026-04-23: Repaired all remaining broken image references in `src` to valid `public` assets (blogs, team, industries hero backgrounds, SaaS/API integration sections) and verified zero missing image paths.
- 2026-04-23: Sorted navbar dropdown categories and subcategory links alphabetically in both `src/data/navbar.json` and `src/data/urdu_data/navbar.json`.
- 2026-04-23: Reworked `/technologies` main page to match `/industries` grouped-category layout by sourcing Technologies dropdown columns from `src/data/navbar.json` and enriching sub-technology cards from detail JSON data.
- 2026-04-24: Updated all industry JSON hero background paths to use slug-specific `.webp` assets from `public/industries` across all language folders.
- 2026-04-24: Removed unused `.png`/`.svg` files from `public` after reference audit, retaining only actively referenced SVG (`/services_page/hero_bg.svg`) and webp-based assets.
- 2026-04-27: Fixed `scripts/translate_services.mjs` to translate the full `english_data/technologies` tree and `technologies_page.json` into all language folders (including Chinese) and regenerated localized technology JSON files.
- 2026-04-27: Added language-aware navbar/footer/contact localization flow (`src/lib/localized-content.ts`), generated localized `navbar.json`, `footer.json`, and `contact_page.json` datasets for all supported languages, wired `/contact` to cookie-resolved content, and updated `scripts/translate_services.mjs` to full `english_data` website translation scope.
- 2026-04-28: Localized `/get-started` page copy via new per-language `get_started_page.json` datasets and updated form logic to only show application types (`Job`/`Internship`) when active programs exist for that type.
- 2026-04-28: Split `/get-started` into a server route wrapper plus `get_started_client` component and set the route to `force-dynamic` to avoid prerender-time runtime errors.
- 2026-04-28: Rolled back schema-level Payload blog localization changes to restore admin/blog stability, while keeping language-aware UI labels on blogs pages.
- 2026-04-28: Added document-level `language` field to Payload blogs and updated blog list/detail queries to serve selected-language posts with English/legacy fallback.
- 2026-04-28: Added blog UI category reset on language change and switched blog slug uniqueness to per-language validation so one translated post per language can share the same slug.
- 2026-04-28: Switched blogs to single-entry publishing with server-side auto-translation by selected language (title/category/rich text/recent titles), removed language-dependent blog filtering, and restored global unique slugs.
- 2026-04-28: Hardened language normalization for locale variants (`zh-CN`, `zh-Hans`, `cn`) and added Chinese translation target fallbacks (`zh-CN` -> `zh` -> `zh-Hans`) to ensure blogs render correctly in Chinese.
- 2026-04-28: Added strict non-English post-processing for blogs in `ur`/`ar`/`zh` to strip leftover Latin-word tokens when translation providers fail, and translated author/byline text on blog list/detail/recent cards to avoid visible English leftovers.
- 2026-04-28: Localized home-page blog hero heading/subheading by cookie language and fully localized footer labels/newsletter form copy (titles, links, placeholders, button, and validation/success messages) across supported languages.
- 2026-04-28: Implemented functional newsletter subscriptions with `/api/newsletter_subscribe`, added `newsletter-subscribers` collection for DB-backed subscriber storage, wired footer form submission, and added Resend broadcast hooks for blog publish/update, career open/update, and get-started form open/close updates.
