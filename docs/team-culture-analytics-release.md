# Team, culture, services, footer and Clarity

## Content updates

The Company menu's Team link now opens `/team`. It contains leadership profiles, the original eight staff portraits with owner-authorized placeholder names, culture albums and a Join the Team link to `/get-started`. The original navbar design is preserved.

Edit `src/data/company.json` to replace `Team member 01` etc. with the correct names and designations. The CEO photograph is the original asset. A verified CTO portrait was not available in the company or personal-site repositories; the CTO card uses an explicit initials placeholder. Set its `image` to a real local public image path when supplied. Do not assign another staff member's portrait to the CTO.

Culture albums are Mango Day, Iftar Dinner and Devisgon Anniversary, each with its own `/team/culture/<slug>` page. The viewer supports the complete photo grid, previous/next, keyboard arrows, Escape, focus restoration and scroll locking. Album photos are currently empty because no actual event photos were supplied or found. There are no fabricated event photographs. Empty albums stay noindex and are excluded from the sitemap; an album with photos becomes indexable on deployment.

Example real-photo entry to add to an album's `photos` array:

```json
{
  "src": "/culture/mango-day/2026-01.webp",
  "alt": "Devisgon team sharing mangoes at the office",
  "caption": "Mango Day"
}
```

Use real files at the corresponding `public/culture/...` paths and accurate descriptions. Add further albums with a unique lowercase slug, title, category, description and photo array. The Team page and album routes use this single source. Rebuild/deploy after a repository content change.

## New services

- `/services/voice-agent-development-services`: business voice conversations, CRM/calendar actions, testing and human handoff.
- `/services/invoice-automation-services`: invoice intake, extraction, validation, duplicates, approvals and accounting integration.
- `/services/ai-receptionist-services`: focused front-desk FAQs, appointments, enquiry capture and staff escalation.

Each page has distinct content, canonical metadata, FAQs, scoping inputs, deliverables and acceptance criteria. Service links appear in the homepage, services index, enquiry choices, all seven localized navbar catalogues and the footer. New detail-page content falls back to English for languages without a translation. Illustrative delivery scopes do not claim client outcomes.

The footer uses Devisgon's purple/magenta branding, a clear call to action, contact details, Company and Resources/Partners links, a single localized newsletter form and expandable complete expertise directories. Its language synchronization and legal links remain available.

## Clarity and GA4

Clarity project: **yrindogf01**. GA4 remains **G-VYTLPTGT2N**. This uses the owner's manual tag option with Next Script; it does not also install the NPM SDK or duplicate the tag.

The shared public root initializes denied consent defaults before scripts. Both external tags load only after opt-in. Clarity uses `consentv2` with `analytics_Storage: granted` and `ad_Storage: denied` after consent. The consent key is versioned to `devisgon-analytics-consent-v2` so a prior GA4-only choice does not silently enable new session recordings. Withdrawal passes denied signals, clears first-party GA/Clarity cookies and reloads without either script after either has loaded.

The enquiry, contact, application and newsletter forms use explicit Clarity masks, including the homepage review screen. No name/email/phone, project answers, identifiers or friendly names are passed to Clarity custom APIs. Custom events use constant event names or step numbers; they describe enquiry progress and accepted submissions without answer contents. Public page URLs should not contain sensitive personal data.

In Clarity project settings, enable Consent Mode and review masking before using recordings. After merge/deploy, allow analytics on the site and verify `https://www.clarity.ms/tag/yrindogf01` loads once. Open a real recording in the owner's Clarity dashboard to confirm the form/review values are masked. A successful local test or script load does not prove that the Clarity account has processed a recording. Keep GA4's automatic history/form/outbound measurements disabled as documented in the homepage release notes to avoid duplicates.

Official implementation sources:

- [Microsoft Clarity Consent Management](https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-management)
- [Microsoft Clarity ConsentV2 API](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2)
- [Microsoft Clarity client APIs and masking](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api)
- [Twilio: AI to human handoff](https://www.twilio.com/docs/conversations/solution-blueprints/ai-to-human-handoff)
- [Microsoft: invoice data extraction](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/prebuilt/invoice?view=doc-intel-4.0.0)

## Verification

Run lint, TypeScript, `verify:navigation`, `verify:growth`, `verify:homepage` and a production build. The React tests exercise the real gallery and analytics components with framework loading stubbed, including consent-gated tags, exact Clarity consent keys, safe events, Back/retry retention, acceptance-only leads, keyboard gallery navigation and focus/scroll restoration. Built-route smoke checks verify Team, all album routes and the three actual service pages; no real enquiries or newsletter signups are submitted during verification.
