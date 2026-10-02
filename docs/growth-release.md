# USA-first AI growth release

This change prioritizes AI, automation, agents and AI-powered products, followed by general web apps and websites. The USA is the first acquisition market. Canada, Netherlands/Europe, Australia/New Zealand and Gulf countries follow. Foreign offices and unverified client outcomes are not implied.

## Configuration and release checks

1. Preserve the existing Payload/PostgreSQL/S3 and Resend deployment configuration. `RESEND_DOMAIN` is the complete verified sender address (or supported name/address), not merely a hostname. `RESEND_EMAIL_USER` is the receiving mailbox. No database schema or migration was added. Blog access now requires authentication for mutations and hides drafts from anonymous reads.
2. Use actual Calendly event URLs for the available durations. The contact page removes duplicate URLs and uses `/contact` when booking is unconfigured. A booking-link click is not a confirmed meeting.
3. Optional GA4: supply `NEXT_PUBLIC_GA4_MEASUREMENT_ID` before building. Analytics loads only after visitor opt-in. Disable enhanced-measurement automatic page views from history changes, form interactions and outbound clicks; this implementation sends sanitized page views and its own events. Exclude internal/test traffic. Do not send form details or configure custom dimensions containing them.
4. Optional Turnstile: configure BOTH `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (build time) and `TURNSTILE_SECRET_KEY` (runtime). Register production and preview hostnames in the provider dashboard and use the `inquiry` action. A partial configuration returns 503; invalid/unavailable challenge responses fail closed. Use official test keys only in isolated test deployments. Configure durable rate limits at the hosting edge separately.
5. Review desktop/mobile, light/dark, keyboard and error recovery on the deployed preview. Check home priority offers, a core service, a painter industry page, `/resources`, all three guides, `/tools/automation-roi` and `/contact`. Local browser verification was blocked by the browser service; successful HTTP rendering is not visual verification.
6. With an authorized test destination, check both enquiry forms, attachment limits, provider rejection/retry, a completed booking and actual inbox receipt. Automated verification mocked the email/challenge providers; it did not send live mail or book meetings. Accepted email requests are not proof of inbox delivery.
7. With the actual CMS connection, verify `/blog-sitemap.xml` contains published posts across pagination, excludes drafts and returns 503/no-store on failure. Confirm an authenticated editor can still publish. CMS outage paths were designed to avoid caching a false empty sitemap.
8. After release, fetch `/robots.txt`, `/sitemap.xml` and `/sitemap-0.xml`; check canonical tags, permanent service redirects and new URLs. Submit or recheck the sitemap index in Search Console. Record the real deployment date, not the PR date, in the SEO experiment log. Review settled USA buyer-query results and qualified enquiries monthly.

## Validation

`npm run lint`, `npx tsc --noEmit`, `npm run verify:growth` and `npm run build` were used locally. The six growth checks cover bounded enquiries, mocked provider/challenge failures and acceptance, sitemap filtering, ROI math, industry metadata and repaired-link invariants. Build validation uses dummy provider/storage values, not production credentials. `scripts/growth-checks.test.mjs` requires Node 22.6+ with native TypeScript stripping (validated on Node 24); esbuild is available through the locked dependency tree.

## Remaining growth work

Real approved project evidence, buyer interviews, ongoing original content, relevant distribution, reviewed locale URLs/hreflang, durable enquiry persistence, lead qualification and CRM/booking/attendance/won-client reconciliation remain operational or subsequent implementation work. Optional analytics/Turnstile do not activate without real keys. No ranking, Core Web Vitals, traffic or revenue improvement has been measured from an unreleased branch.

## Rollback

If runtime regressions appear, revert the growth commit and redeploy the prior application. Preserve the blog access restrictions if separating security changes from a content rollback. Do not remove or rewrite live CMS records as part of rollback.
