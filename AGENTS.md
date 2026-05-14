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
- Public route transitions use `src/app/(app)/loading.tsx`, which renders a centered rolling spinner while App Router pages and sublinks are loading.
- CMS/admin and generated Payload API routes live in `src/app/(payload)`.
- Most marketing and service content is loaded from JSON in `src/data/*`.
- Industries content is JSON-driven with language files in each `src/data/*_data/industries/<category>/<slug>.json` folder, including agriculture, entertainment, food, healthcare, professional, real estate, and trades categories.
- Technologies content is JSON-driven with language files in category-scoped folders under `src/data/*_data/technologies/<category>/<slug>.json` (with category `index.json` for main category pages).
- Partner landing-page content is served from canonical `/partners/<slug>` routes, uses JSON data from `src/data/*_data/others/<slug>.json`, and falls back to English via `src/data/loaders/others.ts`.
- Blog list and blog detail pages are CMS-driven from Payload `blogs` collection using a single-source blog model (one post per slug), with server-side auto-translation of title/category/rich-text into the selected language from the `lang` cookie.
- Newsletter subscribers are stored in Payload `newsletter-subscribers` (PostgreSQL/Supabase table) with email-only subscriber records and used for update broadcasts.
- Contact and apply forms require name, email, and phone, post to internal API routes, then send email via Resend; inquiry forms also pass country and source context when available.
- Footer newsletter form is email-only, posts to internal `/api/newsletter_subscribe`, stores subscribers, and sends confirmation emails.
- Navbar, footer, contact-page, and get-started-page UI copy are language-aware through `src/lib/localized-content.ts` and per-language JSON data files in `src/data/*_data`.
- Theme mode is stored in `localStorage.theme` while an open-tab marker in `sessionStorage.theme-session` clears that local value on fresh sessions; `src/app/(app)/layout.tsx` initializes the class before hydration and `src/components/navbar.js` toggles it, so refresh preserves the theme while reopened tabs default to light.
- Footer is a client component that syncs language from the `lang` cookie and listens to `app-language-change`; it renders logo/contact, Company, About, Newsletter, expandable Services, expandable Industries, expandable Technologies, and expandable Partners sections, with Privacy/Terms links in the bottom legal bar. Newsletter form copy/errors/buttons are language-aware in `src/components/footer_newsletter_form.tsx`.
- Public route transitions show immediate feedback through `src/components/navigation_progress.tsx` for internal link clicks plus the route-level fallback spinner in `src/app/(app)/loading.tsx` for slower App Router segment loads.
- Shared language resolver is cached with React `cache()` in `src/lib/language.ts` and reused across pages.
- Centralized SEO metadata and JSON-LD structured data are defined in `src/lib/seo.ts` and injected in `src/app/(app)/layout.tsx`; the public root layout exports site-wide Metadata API defaults including metadata base, canonical root URL, robots, icons, Open Graph, Twitter card data, and the generated `/opengraph-image` preview.

## Route Flow
### Public Pages
- `/` -> `src/app/(app)/page.tsx` -> `Header` + server-rendered `home_page/main_page` + streamed home blogs preview (`Suspense`) + `Footer`.
- Home blogs preview route segment (`src/components/home_page/blogs.tsx`) resolves `lang` from cookie and injects localized `home_page.blog_section` heading/subheading before rendering shared blog list.
- Home services carousel (`src/components/home_page/services_section.tsx` + `src/components/animations/ServicesSection.module.css`) is a viewport-aware client island; the curved marquee loops infinitely while visible and pauses when out of view.
- `/services` -> `src/app/(app)/services/page.tsx` reads `lang` cookie, loads `services_page.json` from language map, renders service sections, and ends with a simple CTA band (`src/components/services_page/cta_section.tsx`) using `contact_form` copy plus Book a Consultation/Contact Us links instead of a form.
- Services, Industries, and Technologies main-page hero primary CTAs render as `Book a Meeting` and use `NEXT_PUBLIC_CALENDLY_30_MIN_MEETING` with fallback to `NEXT_PUBLIC_CALENDLY_15_MIN_MEETING`; secondary/other buttons keep their existing links.
- Service detail public URLs are flat lowercase/hyphenated paths (`/services/<slug>`) resolved by `src/app/(app)/services/[slug]/page.tsx`; category-prefixed service URLs redirect to the flat route.
- `/industries` -> `src/app/(app)/industries/page.tsx` reads `lang` cookie, loads `industries_page.json` hero content, then renders grouped category subsections from `src/data/loaders/industries.ts` `INDUSTRY_GROUPS` (`Agriculture`, `Entertainment`, `Food`, `Healthcare`, `Professional`, `Real Estate`, `Trades`); each sub-industry card is enriched from its detail JSON (`src/data/*_data/industries/<category>/<slug>.json`) for title/description/icon with flat localized links, and navbar Food links mirror those slugs.
- `/technologies` -> `src/app/(app)/technologies/page.tsx` reads `lang` cookie, loads `technologies_page.json` hero content, then renders grouped category subsections from language-specific navbar data (`src/data/*_data/navbar.json`) Technologies dropdown columns (`Automation`, `Database`, `Frameworks`, `Languages`, `Tools`); each sub-technology card is enriched from its detail JSON (`src/data/*_data/technologies/<category>/<slug>.json`) for title/description/icon with localized links.
- `/partners/doctorhoster` -> `src/app/(app)/partners/doctorhoster/page.tsx` is force-dynamic, reads `lang` cookie/query, loads Doctor Hosting section-array JSON through `src/data/loaders/others.ts`, and renders `src/components/others/doctorhosting/doctor_hosting_page.tsx` with rotating hero (`src/components/others/hosting_hero_slider.tsx`), meeting + pricing hero CTAs, an inline domain search form that checks common extensions through the internal API and shows an availability/pricing list on the same page, compact equal-height pricing cards, services, CTA, and FAQ sections.
- `/partners/jotform` -> `src/app/(app)/partners/jotform/page.tsx` reads `lang` cookie/query, loads Jotform object JSON through `src/data/loaders/others.ts`, and renders `src/components/others/jotform/jotform_page.tsx` with a Jotform-inspired Devisgon-themed hero, meeting + Jotform login hero CTAs, stats, icon-based feature cards, product-suite cards, pricing cards with expandable AI Agent Limits near the middle of the page, template categories, workflow steps, security cards, FAQ, and external Jotform login CTAs.
- Legacy `/others/dctr_hosting`, `/others/jotform`, `/partners/dctr_hosting`, and `/partners/dctr-hosting` redirects are handled in `next.config.ts`; duplicate App Router redirect folders are intentionally removed.
- `/blogs` -> `src/app/(app)/blogs/page.jsx` and `components/blogs_page/blogs.tsx` query all published Payload `blogs` and auto-translate blog title/category to the selected language before rendering; blog hero copy and list UI labels resolve by selected language.
- `/blogs/[slug]` -> `src/app/(app)/blogs/[slug]/page.tsx` queries Payload by slug (published only), auto-translates title + lexical rich text + recent-post titles to selected language, and renders translated lexical rich text.
- `/contact` -> `src/app/(app)/contact/page.tsx` resolves `lang` from cookie, injects localized `contact_page.json` content into `src/components/contact_page/contact_page_client.tsx`, and client form posts to `/api/contact_mail`; the service dropdown is generated from the localized Services navbar links, includes every service, and the country dropdown uses `src/lib/inquiry-options.ts`.
- `/get-started` -> `src/app/(app)/get-started/page.tsx` server wrapper (`dynamic = "force-dynamic"`) renders `src/components/get_started/get_started_client.tsx`; client form posts to `/api/apply_mail`, pulls careers and form global settings from Payload REST endpoints, localizes UI copy from `get_started_page.json` by cookie language, and only shows `Job`/`Internship` application types that currently have active programs.
- `/privacy-policies` and `/terms-condition` -> server components reading language-specific JSON by cookie; legacy `/privacy_policies` and `/terms_condition` redirects are handled in `next.config.ts`.
- Unmatched public routes render `src/app/(app)/not-found.tsx`, a branded Devisgon 404 page with the shared navbar/footer, professional recovery copy, and quick links to homepage, services, technologies, industries, and contact.

### Service Detail Pages
All service detail pages share one rendering pattern:
- Canonical route:
  - `/services/[slug]` (served by `src/app/(app)/services/[slug]/page.tsx`).
- Legacy compatibility routes:
  - category-prefixed routes such as `/services/automations/[slug]`, `/services/design/[slug]`, `/services/web-and-saas-development/[slug]`, `/services/data-solutions/[slug]`, `/services/testing/[slug]`, `/services/ai-and-ml/[slug]`, and `/services/cloud/[slug]` redirect to `/services/[slug]` through `next.config.ts`.
- Route behavior:
  - is a server component,
  - reads `lang` from URL query param (`?lang=`) with cookie fallback (`lang`) then `en`,
  - normalizes incoming service slugs to lowercase hyphenated values and redirects uppercase/space/underscore variants to the canonical path,
  - pulls content from `src/lib/service-detail.ts`, which searches the service loader maps by slug, with hyphenated public slugs resolved against existing underscore-backed loader keys and old aliases when needed,
  - renders shared section components (`hero`, `introduction`, `key_benefits`, `what_we_do`, `technologies`, `process`, `case_study`, `faq`, `contact`).
  - the shared `hero` section uses a client video island (`src/components/sub_services_pages/hero_video.tsx`) so hero videos loop while in view and pause when scrolled out of view.
  - the shared `technologies` section renders cards as a continuously moving marquee, pauses on hover, and resolves card links from the top-level Technologies navbar dropdown with safe fallback to `/technologies`.
  - service detail pages end with the shared services CTA band (`src/components/services_page/cta_section.tsx`) using Book a Consultation and Contact Us links instead of rendering a direct inquiry form.

### Industry Detail Pages
- Canonical route:
  - `/industries/[slug]` (served by `src/app/(app)/industries/[slug]/page.tsx`).
- Legacy compatibility route:
  - `/industries/[category]/[slug]` -> redirect to `/industries/[slug]` through `next.config.ts` and `src/app/(app)/industries/[...segments]/page.tsx`.
- Route behavior:
  - server component with metadata from `src/lib/seo.ts`,
  - reads `lang` from URL query param (`?lang=`) with cookie fallback (`lang`) then `en`,
  - resolves category from slug through `src/data/loaders/industries.ts`, then loads category + slug data with English fallback if localized file is missing,
  - renders reusable sections from `src/components/industries/*` (`hero`, `friction`, `architecture`, `key_benefits`, optional `carousel`, `case_studies`, `explore`, `conversation`),
  - hero now receives carousel cards and rotates card title/description smoothly via `src/components/industries/hero_rotating_copy.tsx`,
  - conversation forms submit directly to `/api/contact_mail` with `industryName`, `serviceName`, source page, country, and message fields for Resend inquiry emails.

### Technology Detail Pages
- Canonical route:
  - `/technologies/[slug]` (served by `src/app/(app)/technologies/[slug]/page.tsx`).
- Route behavior:
  - server component with metadata from `src/lib/seo.ts`,
  - reads `lang` from URL query param (`?lang=`) with cookie fallback (`lang`) then `en`,
  - normalizes merged legacy technology slugs (`c`, `cpp`, `javascript`, `typescript`, `nextjs`, `nodejs`) to canonical combined slugs before loading data,
  - loads slug data from `src/data/loaders/technologies.ts` with English fallback if localized file is missing,
  - renders dedicated technology sections from `src/components/technologies/*` (`hero` with left-content/right-image layout, `why_use`, `architecture`, `competitive_edge`, `quote`, `conversation`),
  - technology section styling uses global theme variables (`bg-bg-primary`, `bg-bg-secondary`, `text-t-primary`, `text-t-secondary`, `bg-btn-primary`) with alternating section backgrounds for light/dark parity.

## Data Flow
### Static JSON Content
- Base folders by language in `src/data/*_data`.
- Home/services/privacy/terms pages use language-specific JSON maps in route files; `services_page.contact_form` provides the services-page bottom CTA heading/description.
- Service detail pages use `src/lib/service-detail.ts` to search loader files in `src/data/loaders/*.ts` that map `{lang -> {slug -> json}}`; AI/ML content is sourced from `services/ai_and_ml` and Web/SaaS content is sourced from `services/web_and_saas_development`.
- Service detail `hero_section.hero_image` values point to MP4 files in `public/videos`; newly added service videos should use the canonical data filenames rather than upload-time typos or spaces.
- Industry main page uses `src/data/*_data/industries_page.json`.
- Industry main page hero content uses `src/data/*_data/industries_page.json`; category sections and sub-industry links are sourced from `src/data/navbar.json` Industries dropdown columns.
- Industry detail pages use flat public routes plus `src/data/*_data/industries/<category>/<slug>.json` and `src/data/loaders/industries.ts` filesystem loaders.
- Food industry detail pages currently include `bakery`, `juice-bar`, `catering`, `fine-dining`, and `ice-cream-parlor` across all language folders, with matching Food navbar links in `src/data/navbar.json` and localized `src/data/*_data/navbar.json` files.
- Industry detail `hero_section.background_image` fields now point to slug/category-specific assets under `public/industries/*.webp`; new uploaded industry raster images should be converted to WEBP and the original PNG/JPG files removed after references are updated.
- Technologies main page uses `src/data/*_data/technologies_page.json`.
- Technologies main page hero content uses `src/data/*_data/technologies_page.json`; category sections and sub-technology links are sourced from language-specific `src/data/*_data/navbar.json` Technologies dropdown columns.
- Technology detail pages use `src/data/*_data/technologies/<category>/<slug>.json` and `src/data/loaders/technologies.ts` filesystem loaders.
- Technology JSON reads and sitemap crawling strip an optional UTF-8 BOM before parsing so localized/generated files remain loadable.
- Partners landing pages use explicit `/partners/<slug>` routes plus `src/data/*_data/others/<slug>.json` and `src/data/loaders/others.ts`; `/partners/doctorhoster` uses Doctor Hosting section-array JSON, JSON-defined remote hero backgrounds, and local fallback/service images under `public/doctr_hosting`, while `/partners/jotform` uses object-shaped Jotform JSON with translatable `page_copy`, stats, product-suite, template-category, workflow, security, pricing, optional per-plan `agent` AI-agent limits, and FAQ arrays plus external Jotform CDN hero artwork allowed by `next.config.ts` and a company referral login URL.
- Navbar labels/dropdowns are sourced from `src/data/navbar.json` (English) and `src/data/*_data/navbar.json` (localized variants), resolved by `src/lib/localized-content.ts`; the About dropdown links to the CEO section (`/#about`), Team section (`/#team`), and Careers/application flow (`/get-started`).
- Footer copy is sourced from `src/data/*_data/footer.json`, while expandable Services/Industries/Technologies/Partners category labels and sublinks are sourced from the localized navbar data.
- Footer column titles and link labels are language-specific in `src/data/*_data/footer.json`; newsletter placeholder/button/validation/success copy is localized in component state maps.
- Contact-page UI copy is sourced from `src/data/*_data/contact_page.json`.
- Get-started page UI copy is sourced from `src/data/*_data/get_started_page.json`.
- Technologies data is organized by main category folders:
  - `technologies/automation/index.json` + automation tool files (`make.json`, `n8n.json`, `zapier.json`),
  - `technologies/languages/index.json` + language subcategory files (for example `java.json`, `python.json`, `c-cpp.json`, `javascript-typescript.json`),
  - `technologies/frameworks/index.json` + framework subcategory files (for example `react.json`, `nestjs.json`, `nextjs-nodejs.json`),
  - `technologies/database/index.json` + database subcategory files (for example `mongodb.json`, `mysql.json`),
  - `technologies/tools/index.json` + platform tool files (for example `shopify.json`, `wordpress.json`, `jotform.json`).
- Technology detail JSON schema is custom (separate from industries) and includes:
  - `hero_section` (`side_image`, `primary_cta`, `secondary_cta`),
  - `why_use_section` (`paragraphs` + right-column icon cards),
  - `architecture_section` (`image` + numbered `items`),
  - `edge_section` (`metric` cards),
  - `quote_section`,
  - `conversation_section`.
- Technology detail image fields resolve to technology-scoped WEBP static assets under `public/technologies/<tech-folder>/hero.webp` and `public/technologies/<tech-folder>/scope.webp`; JSON slugs may point to legacy folder names such as `my_sql`, `nest_js`, and `amazon` when the public asset folder uses that name.
- Technology detail `hero_section.primary_cta.href` or `secondary_cta.href` may use the sentinel value `book_meeting`, which `src/components/technologies/hero.tsx` resolves to `NEXT_PUBLIC_CALENDLY_30_MIN_MEETING`, then `NEXT_PUBLIC_CALENDLY_15_MIN_MEETING`, then `/contact`.
- Public marketing/detail imagery is now standardized on `.webp`; legacy `.png`/`.svg` assets are removed when unused (with `/services_page/hero_bg.svg` retained for hero overlay backgrounds still referenced in code).
- Industry detail JSON supports `carousel_section` (title, subtitle, cards[title/description]); these cards are used in two places:
  - rotating hero copy (title + description transitions),
  - the post-key-benefits carousel section in `src/components/industries/carousel.tsx`.
- `scripts/translate_services.mjs` recursively translates all JSON files under `src/data/english_data` into each target language folder (including `chinese_data`) while preserving non-translatable fields such as links/slugs/assets; pass one or more paths relative to `english_data` to translate only selected JSON files.

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
  - validates required name, email, and phone fields,
  - accepts optional company, country, service name, industry name, source page/type, budget, timeline, and attachment fields,
  - enriches request with IP and geo lookup (`api64.ipify.org`, `ipwho.is`),
  - sends HTML email via Resend, optional attachment.
- `POST /api/apply_mail`:
  - similar flow for application form,
  - validates required name, email, and phone fields,
  - includes applicant details and CV attachment.
- `POST /api/newsletter_subscribe`:
  - validates and normalizes email,
  - upserts active subscriber into Payload `newsletter-subscribers`,
  - sends subscription confirmation email via Resend.
- `POST /api/doctorhoster_domain_search`:
  - receives a domain from the Doctor Hosting page,
  - normalizes the input,
  - fetches a DoctorHoster CSRF token/session server-side,
  - posts `.com`, `.co`, `.net`, `.org`, and `.pk` variants to DoctorHoster's WHMCS `/domain/check` endpoint,
  - returns compact JSON results with availability, status, and pricing for same-page list display.

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
- Public `href` values in localized navbar JSON must mirror canonical `src/data/navbar.json` slugs exactly, even when labels are translated or ordered differently.
- Dropdown categories (`dropdown.columns`) and subcategory links (`links`) in navbar data are maintained in alphabetical order by display name.
- Services dropdown links are grouped by service category labels but point to flat canonical service routes (`/services/<slug>`). The footer reads these same dropdown groups from localized navbar JSON.
- About uses a one-column dropdown in each navbar JSON file with `CEO`, `Team`, and `Careers` links; the dropdown column title is intentionally empty so no main category heading appears above those links.
- Industries dropdown links are grouped in `src/data/navbar.json` into seven columns (`Agriculture`, `Entertainment`, `Food`, `Healthcare`, `Professional`, `Real Estate`, `Trades`) with sub-industry links.
- Technologies is a separate top-level navbar item in `src/data/navbar.json` with five dropdown columns (`Automation`, `Database`, `Frameworks`, `Languages`, `Tools`) and per-track technology links.
- Technologies dropdown links in `src/data/navbar.json` point directly to dedicated subcategory routes under `/technologies/[slug]` (for example `automation`, `c-cpp`, `javascript-typescript`, `nextjs-nodejs`, `java`, `python`, `react`, `nestjs`, `mongodb`, `amazon-dynamodb`, `doctorhosters`, `jotform`, `shopify`, `wordpress`).
- Technologies dropdown columns in `src/data/navbar.json` also drive the grouped sections and card ordering on `/technologies`.
- Partners uses a one-column dropdown with links to `/partners/doctorhoster` and `/partners/jotform`; the dropdown column title is intentionally empty so no main category heading appears above those links.
- Footer quick links and Services/Industries/Technologies/Partners lists are rendered in `src/components/footer.tsx`; category-based lists use `src/data/*_data/navbar.json` dropdown categories and reveal subcategory links after clicking a main category, while single empty-title dropdowns such as Partners render their links directly and Privacy/Terms links render in the bottom legal bar. Footer links and category buttons share pointer cursor plus hover underline styling.
- Service detail loaders must expose keys that resolve from nav slugs through `src/lib/slugs.ts` hyphen/underscore candidates and `src/lib/service-detail.ts` alias candidates.
- Old service URLs under category-prefixed paths such as `/services/ai-and-ml/*`, `/services/automations/*`, `/services/cloud/*`, `/services/data-solutions/*`, `/services/design/*`, `/services/testing/*`, `/services/web-and-saas-development/*`, `/services/saas/*`, `/services/web-and-mobile-development/*`, `/services/web_and_mobile_development/*`, and `/services/data_solutions/*` are handled by redirects in `next.config.ts` instead of duplicate public URLs.
- Industry category/slug paths in `src/data/*_data/industries/<category>/<slug>.json` may remain underscore-backed on disk, but public navbar industries links must use flat hyphenated `/industries/<slug>` paths resolved by `src/data/loaders/industries.ts`.
- Legacy typo-backed industry files such as `landscraping`, `poetry_farm`, `tutoer`, and `elctronics` are resolved through loader aliases to public slugs `landscaping`, `poultry-farm`, `tutor`, and `electronics`.
- Sitemap generation (`next-sitemap.config.js`) crawls English service JSON files into flat `/services/<slug>` URLs and nested English industries category JSON files into flat `/industries/<slug>` URLs, then emits language query variants.

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

Optional for local newsletter testing:
- `NEWSLETTER_DEV_REDIRECT_TO_ADMIN` (`false` by default). When explicitly set to `true` in local/dev, newsletter sends are redirected to `RESEND_EMAIL_USER`; otherwise welcome emails go to the subscribing email and campaigns go to all subscribers.

## Operational Commands
- Dev: `npm run dev`
- Dev (force clean cache once): `npm run dev:clean`
- Lint: `npm run lint`
- Build: `npm run build`
- Start: `npm run start`
- Sitemap postbuild: `npm run postbuild`
- Image conversion (PNG/SVG -> WEBP): `npm run images:webp` (recursive under `public`; CLI script supports `--dir`, `--quality`, `--force`, `--dry-run`)
- Data translation: `node scripts/translate_services.mjs` (all English JSON data) or `node scripts/translate_services.mjs others/dctr_hosting.json technologies/tools/jotform.json` (selected files)

## Change Impact Guide
If you change this, also check this:
- Service slug in JSON -> loader alias resolution + `navbar.json` link + sitemap output; public service URLs should use lowercase hyphenated `/services/<slug>` paths, not category-prefixed paths, spaces, capitals, or underscores.
- Industry category/slug JSON path -> `src/data/loaders/industries.ts` lookup + `navbar.json` grouped industries links + sitemap output; public industry URLs should use lowercase hyphenated `/industries/<slug>` paths, not category-prefixed paths, spaces, capitals, or underscores.
- Technology slug JSON path (`technologies/<category>/<slug>.json` with category `index.json`) -> `src/data/loaders/technologies.ts` slug-to-category lookup + alias map + `navbar.json` Technologies links + sitemap output; public technology URLs should use hyphens, not underscores, and merged technologies should use the canonical combined slugs.
- Partners landing JSON path (`others/<slug>.json`) -> explicit `src/app/(app)/partners/<slug>/page.tsx` route + `next.config.ts` legacy redirects + component folder under `src/components/others/*` + `src/data/loaders/others.ts` + `navbar.json` Partners dropdown links + sitemap output.
- Service section schema -> shared sub-service components and type files under `src/types/sub_services_page`.
- Industry section schema -> shared industry components under `src/components/industries` + `src/types/industries_page` (including optional `carousel_section` content).
- Changes to `carousel_section.cards` affect both hero rotating copy and the lower carousel cards, so update content with both placements in mind.
- Technology section schema -> dedicated technology components under `src/components/technologies` + `src/types/technologies_page`.
- Theme variable updates in `src/app/(app)/globals.css` also affect `src/components/technologies/*` since technology sections now use global color utility classes end-to-end.
- Service detail technologies marquee styling lives in `src/app/(app)/globals.css`; changes to service technology card behavior should also check `src/components/sub_services_pages/technalogies.tsx`.
- Home services curved carousel behavior lives in `src/components/home_page/services_section.tsx` and `src/components/animations/ServicesSection.module.css`.
- Blog fields -> `src/collections/Blogs.ts` + blog listing/detail components.
- Newsletter subscriber schema or email flow -> `src/collections/NewsletterSubscribers.ts` + `src/app/(app)/api/newsletter_subscribe/route.ts` + `src/lib/newsletter.ts` + `src/components/footer_newsletter_form.tsx`; newsletter forms stay email-only, while contact/apply/lead forms require name, email, and phone.
- Blog language behavior -> single-source published queries in `src/components/blogs_page/blogs.tsx` and `src/app/(app)/blogs/[slug]/page.tsx` + server auto-translation helpers in `src/lib/blog-language.ts` + localized blogs-page UI copy/labels in `src/app/(app)/blogs/page.jsx` and `src/components/blogs_page/blogs_ui.tsx`.
- Career/form toggle behavior -> `src/globals/FormSettings.ts`, team section CTA visibility, get-started redirect logic, and dynamic `Job`/`Internship` option visibility driven by active careers.
- Campaign notifications -> hooks in `src/collections/Blogs.ts`, `src/collections/Careers.ts`, and `src/globals/FormSettings.ts` that trigger subscriber broadcasts via Resend.
- Language behavior -> cookie-based server pages + query-param service detail pages + `context/i18n.js`.
- Navbar/footer/contact/get-started localization data -> `src/lib/localized-content.ts` + `src/data/*_data/{navbar,footer,contact_page,get_started_page}.json`.
- API payload fields -> matching form fields in `contact/page.tsx` or `get-started/page.tsx`.
- Contact/inquiry payload fields -> `src/app/(app)/api/contact_mail/route.ts`, `src/components/contact_page/contact_page_client.tsx`, `src/components/direct_inquiry_form.tsx`, and `src/lib/inquiry-options.ts`.
- DoctorHoster domain search behavior -> `src/components/others/doctorhosting/doctor_hosting_page.tsx` + `src/app/(app)/api/doctorhoster_domain_search/route.ts`.
- Jotform pricing fields -> `src/data/*_data/others/jotform.json`, `src/types/others_page/index.ts`, and pricing renderer `src/components/others/jotform/jotform_pricing.tsx`; per-plan `agent` arrays render in an expandable AI Agent Limits panel when present.
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
- 2026-04-28: Added newsletter campaign diagnostics (recipient counts, per-recipient resend rejection logs, and admin summary email to `RESEND_EMAIL_USER`) to make blog/career/form broadcast delivery issues observable in production logs and inbox.
- 2026-04-28: Added localhost-safe newsletter delivery mode that redirects dev sends to `RESEND_EMAIL_USER` (toggle via `NEWSLETTER_DEV_REDIRECT_TO_ADMIN`) for both subscribe welcome emails and campaign broadcasts.
- 2026-04-28: Changed newsletter delivery default to direct-send mode (welcome -> subscriber email, campaigns -> all subscriber emails), with admin redirect available only when `NEWSLETTER_DEV_REDIRECT_TO_ADMIN=true`.
- 2026-05-05: Added localized About navbar dropdown links for CEO, Team, and Careers, and anchored the home Team section for direct dropdown navigation.
- 2026-05-05: Made name, email, and phone required across public forms, added contact/application API validation, and expanded newsletter subscribers with required name/phone fields.
- 2026-05-05: Added JSON-driven `/others/dctr_hosting` Doctor Hosting landing page with themed pricing cards, Other navbar dropdown link, local hosting imagery, and sitemap coverage for `others` JSON files.
- 2026-05-05: Updated `/others/dctr_hosting` hero to rotate through JSON slider artwork and refined hosting pricing cards with compact equal-height five-across desktop layouts.
- 2026-05-05: Removed Doctor Hosting hero side artwork so the carousel now blinks/fades between JSON background images only.
- 2026-05-05: Restored newsletter subscriptions to email-only UI/API/Payload records while keeping name/email/phone required on non-newsletter public forms.
- 2026-05-05: Converted the shared service-detail technologies section into a seamless multi-copy hover-paused marquee with card links resolved from the Technologies navbar dropdown.
- 2026-05-05: Converted newly added Doctor Hosting and industry raster assets to WEBP, removed their PNG/JPG originals, added the expanded industry category links to localized navbars, and generated localized JSON for the new industry detail pages.
- 2026-05-06: Added localized Food industry detail JSON and navbar links for juice bars, catering, fine dining, and frozen desserts, and expanded `INDUSTRY_GROUPS.food` so listing and legacy industry routing recognize the new slugs.
- 2026-05-06: Converted service and industry inquiry areas into direct Resend-backed forms, added service/industry/source/country context to contact emails, expanded the contact service dropdown from navbar data, and added `$50k+` budget options.
- 2026-05-06: Adjusted the shared service/industry direct inquiry form layout so name/email render on the first row and phone/country render on the second row.
- 2026-05-06: Verified meeting links use Calendly env variables and added fallback behavior so 30/60-minute meeting buttons use `NEXT_PUBLIC_CALENDLY_15_MIN_MEETING` when their specific env keys are absent.
- 2026-05-06: Reworked footer into a two-row, four-column layout with logo/contact, Company, About, and Newsletter on the top row, and Services, Industries, Technologies, and Help on the bottom row.
- 2026-05-06: Adjusted mobile footer ordering so the newsletter section renders at the bottom while desktop keeps the four-column top-row newsletter placement.
- 2026-05-06: Changed Services, Industries, and Technologies main-page hero primary CTAs to `Book a Meeting` using the 30-minute Calendly env link with 15-minute fallback.
- 2026-05-06: Restored About and Other dropdown links while removing only their dropdown column headings, and updated navbar rendering to skip empty dropdown titles.
- 2026-05-06: Added temporary local theme persistence so dark/light mode is stored in `localStorage` during the open tab, survives refresh, and resets to light on a fresh tab/session.
- 2026-05-06: Replaced the home award counter animation `any` type with typed Framer Motion animation controls so lint validation passes.
- 2026-05-06: Switched the temporary theme store from `sessionStorage.theme` to `localStorage.theme` with a session marker that clears the saved value on fresh site sessions.
- 2026-05-07: Added localized `/others/jotform` landing-page data, Jotform-specific rendering on the shared Other route, Devisgon referral login CTAs, and Other dropdown links across all navbar language files.
- 2026-05-07: Expanded `/others/jotform` with localized stats, product-suite, template-category, workflow, security, and FAQ sections, and changed repeated CTA labels to generic Jotform actions while keeping the referral URL.
- 2026-05-07: Updated `/others/jotform` feature cards to use code icons instead of JSON image icons and removed the lower integrations logo strip from the page and localized data.
- 2026-05-07: Split Doctor Hosting and Jotform into explicit `/others/dctr_hosting` and `/others/jotform` routes with separate component folders, removed the dynamic Other slug page, moved Jotform pricing closer to the page middle, and tuned Jotform typography/icon colors to the site theme.
- 2026-05-07: Added Jotform as a Technologies tool detail page, added Jotform to Technologies tool dropdowns, fixed DoctorHoster technology slug resolution, and standardized Doctor Hosting/Jotform hero CTAs around Book a Meeting plus landing/action links.
- 2026-05-08: Added selected-file support to `scripts/translate_services.mjs` and generated localized Doctor Hosting and Jotform technology JSON files across all supported language folders, including Chinese.
- 2026-05-08: Reworked Doctor Hosting domain search to stay on the Devisgon page by calling an internal DoctorHoster lookup proxy and rendering availability/pricing inline.
- 2026-05-08: Changed Doctor Hosting domain search results from a single status card to a same-page list of common extensions with available/not-available states and pricing.
- 2026-05-09: Renamed the DoctorHoster technology slug to `doctorhosters`, updated localized technology navbar links, and changed the Other nav/footer grouping to Partners.
- 2026-05-09: Hardened the technology JSON loader to strip UTF-8 BOM markers before parsing renamed/localized technology files.
- 2026-05-11: Moved partner landing page URLs to canonical `/partners/dctr_hosting` and `/partners/jotform`, updated nav/CTA/sitemap paths, and kept legacy `/others/*` redirects.
- 2026-05-11: Updated sitemap JSON parsing to strip optional UTF-8 BOMs, matching runtime technology loaders.
- 2026-05-11: Canonicalized public links and JSON slugs to hyphenated URL segments, added legacy underscore redirects, and updated service/industry/technology loaders plus sitemap output to resolve hyphenated slugs.
- 2026-05-11: Removed the footer Help column, kept Services/Industries/Technologies/Partners as the bottom footer grid, and moved Privacy/Terms links into the right side of the bottom legal bar.
- 2026-05-11: Updated footer dropdown rendering so the Partners list displays its direct links from the empty-title Partners dropdown instead of a blank category control.
- 2026-05-11: Added shared footer link hover underline and pointer cursor styling across links and expandable category buttons.
- 2026-05-11: Changed shared service-detail hero videos to loop through a viewport-aware client island that plays only while the hero video is in view and pauses when out of view.
- 2026-05-11: Synced navbar/page JSON slugs to canonical public URLs and added industry loader aliases for typo-backed legacy filenames.
- 2026-05-11: Replaced corrupted Urdu navbar labels with clean Urdu translations while keeping hrefs synced to the canonical navbar.
- 2026-05-11: Replaced corrupted Urdu footer labels and copyright with clean Urdu translations and no placeholder text.
- 2026-05-11: Updated footer language initialization to read the `lang` cookie immediately on the client and render Urdu/Arabic footers in RTL direction.
- 2026-05-11: Added a public App Router loading spinner for service, industry, technology, partner, and other route transitions.
- 2026-05-11: Added a global client-side navigation progress indicator so internal navbar/footer/button link clicks show immediate loading feedback before the next page appears.
- 2026-05-12: Added Jotform pricing support for optional per-plan AI agent limits via expandable AI Agent Limits panels on each pricing card.
- 2026-05-12: Updated the homepage services curved carousel to loop infinitely while visible and pause when scrolled out of view.
- 2026-05-13: Regrouped service detail routes around `/services/ai-and-ml/*` and `/services/web-and-saas-development/*`, synced loaders/nav/footer data, removed duplicate App Router service folders, and added legacy redirects.
- 2026-05-13: Replaced the `/services` bottom direct inquiry form with a CTA band using the existing services-page CTA copy and consultation/contact links.
- 2026-05-13: Replaced service detail page bottom direct inquiry forms with the same services CTA band.
- 2026-05-13: Removed duplicate legacy App Router redirect folders, moved those redirects into `next.config.ts`, and restored footer Partners links by standardizing partner links on `/partners/doctorhoster` and `/partners/jotform`.
- 2026-05-13: Flattened service detail URLs to lowercase hyphenated `/services/<slug>` routes, updated service navigation/sitemaps, and redirected category-prefixed service URLs.
- 2026-05-13: Flattened industry detail URLs to lowercase hyphenated `/industries/<slug>` routes, updated industry navigation/sitemaps, and redirected category-prefixed industry URLs.
- 2026-05-13: Merged C/C++, JavaScript/TypeScript, and Next.js/Node.js technology detail files into combined canonical slugs and moved Make, n8n, and Zapier into a separate Automation technology category.
- 2026-05-13: Added a branded public 404 page with Devisgon-themed recovery copy, shared navigation/footer, and quick links back to core site sections.
- 2026-05-13: Expanded the public root Metadata API defaults with site-wide Open Graph/Twitter cards, robots, icons, canonical metadata, and a generated Devisgon Open Graph image.
- 2026-05-14: Repaired technology detail image references for Amazon, MySQL, NestJS, and GraphQL across localized JSON data and generated WEBP assets for the uploaded GraphQL images.
- 2026-05-14: Normalized newly uploaded service hero videos for CI/CD pipelines, cloud security, database management, DevOps consulting, and graphic design to the canonical filenames already referenced by localized service data.
