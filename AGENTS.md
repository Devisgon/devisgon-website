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
- Blog list and blog detail pages are CMS-driven from Payload `blogs` collection.
- Contact and apply forms post to internal API routes, then send email via Resend.
- Footer is SSR-first; only the newsletter form is a small client island (`src/components/footer_newsletter_form.tsx`).
- Shared language resolver is cached with React `cache()` in `src/lib/language.ts` and reused across pages.

## Route Flow
### Public Pages
- `/` -> `src/app/(app)/page.tsx` -> `Header` + server-rendered `home_page/main_page` + streamed home blogs preview (`Suspense`) + `Footer`.
- `/services` -> `src/app/(app)/services/page.tsx` reads `lang` cookie, loads `services_page.json` from language map.
- `/blogs` -> `src/app/(app)/blogs/page.jsx` and `components/blogs_page/blogs.tsx` queries Payload `blogs` (published only, locale from cookie).
- `/blogs/[slug]` -> `src/app/(app)/blogs/[slug]/page.tsx` queries Payload by slug and renders lexical rich text.
- `/contact` -> `src/app/(app)/contact/page.tsx` client form posts to `/api/contact_mail`.
- `/get-started` -> `src/app/(app)/get-started/page.tsx` client form posts to `/api/apply_mail`, pulls careers and form global settings from Payload REST endpoints.
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

## Data Flow
### Static JSON Content
- Base folders by language in `src/data/*_data`.
- Home/services/privacy/terms pages use language-specific JSON maps in route files.
- Service detail pages use loader files in `src/data/loaders/*.ts` that map `{lang -> {slug -> json}}`.

### CMS Content (Payload)
Defined in `src/payload.config.ts`:
- Collections:
  - `users` (auth enabled)
  - `media` (uploads + alt text)
  - `blogs` (title, slug hook, cover image, author, date, rich text content, status)
  - `careers` (title, type, isActive)
- Global:
  - `form-settings` (`isGetStartedFormActive`)
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

### Payload-Generated Routes
- REST: `src/app/(payload)/api/[...slug]/route.ts`
- GraphQL: `src/app/(payload)/api/graphql/route.ts`
- GraphQL playground: `src/app/(payload)/api/graphql-playground/route.ts`
- Admin UI: `src/app/(payload)/admin/[[...segments]]/page.tsx`

Note: files under `src/app/(payload)` marked generated should not be manually edited.

## i18n Behavior
- Language selector (`src/components/language_switch_component.tsx`) sets `lang` cookie and calls `router.refresh()`.
- Server pages (home/services/privacy/terms/blog listing) read cookie for language.
- Service detail pages resolve language in this order: `?lang=` query -> `lang` cookie -> `en`.
- Client-side i18next payload loading has been removed from root layout to reduce JS parsing and hydration cost.

## Navigation and Slug Source of Truth
- Main nav and service links are in `src/data/navbar.json`.
- Service detail loaders must expose keys that match nav slugs.
- Sitemap generation (`next-sitemap.config.js`) crawls English service JSON files and emits language query variants.

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

## Operational Commands
- Dev: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`
- Start: `npm run start`
- Sitemap postbuild: `npm run postbuild`

## Change Impact Guide
If you change this, also check this:
- Service slug in JSON -> loader map key + `navbar.json` link + sitemap output.
- Service section schema -> shared sub-service components and type files under `src/types/sub_services_page`.
- Blog fields -> `src/collections/Blogs.ts` + blog listing/detail components.
- Career/form toggle behavior -> `src/globals/FormSettings.ts`, team section CTA visibility, and get-started redirect logic.
- Language behavior -> cookie-based server pages + query-param service detail pages + `context/i18n.js`.
- API payload fields -> matching form fields in `contact/page.tsx` or `get-started/page.tsx`.

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
