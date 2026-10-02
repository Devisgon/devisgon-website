# Devisgon homepage: research, design decisions and measurement

Reviewed 2 October 2026. Scope: the English homepage, its enquiry flow, the requested Company > Partners grouping, and site-wide GA4. Other language homepage content remains unchanged. The existing navbar design, service catalogue and language controls are preserved.

## Direction

Use Devisgon's exact primary **#40005B** and secondary **#A71A7F**, with restrained light surfaces, oversized editorial typography, an asymmetric project showcase and a strong purple capabilities section. The opening screen pairs a business-focused message with the actual project questionnaire. This replaces the decorative workflow diagram with a useful way to start an enquiry.

AI, automation, agents and AI-powered products lead the page. Web apps and websites follow; supporting services stay discoverable without competing with the opening message. The market statement puts the USA first, followed by Canada, the Netherlands/Europe, Australia, New Zealand and the Gulf.

## Research and application

| Primary source | Finding / observation | Application to Devisgon |
| --- | --- | --- |
| [NN/g: Homepage Design — 5 Fundamental Principles](https://www.nngroup.com/articles/homepage-design-principles/) | Communicate the company's purpose, show relevant examples and guide the next action. Decorative imagery should earn its space. | Concise AI/software message, specific supporting copy, an actionable questionnaire and selected portfolio projects. |
| [NN/g: 4 Principles to Reduce Cognitive Load in Forms](https://www.nngroup.com/articles/4-principles-reduce-cognitive-load/) | Group related questions; explain requirements; provide a clear path and timely guidance. | Five named steps, explicit required labels, one-column contact fields, progress and a review screen. |
| [NN/g: Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/) | Reveal complexity progressively rather than overwhelming the first interaction. | Start with service selection; collect scope, budget/timing and contact information in successive views on the same homepage. |
| [Baymard: Form Design — 6 Best Practices](https://baymard.com/blog/form-design) | Many visible fields can intimidate users. Related steps or disclosures can reduce the initial burden. | Nine service choices first; the remaining qualification fields appear only in their relevant step. |
| [Baymard: Labels Above Fields](https://baymard.com/research-articles/mobile-form-usability-label-position) | Above-field labels allow useful field width on mobile and remain visible while typing. | Persistent labels above each field, mobile input text at 16px, full-width inputs. |
| [Baymard: Required and Optional Fields](https://baymard.com/research-articles/required-optional-form-fields) | Ambiguous requirements cause avoidable confusion. | Mark all requested fields required; provide “Not sure yet” and “Need help estimating” where certainty would be unreasonable. |
| [Clay: agency homepage](https://clay.global/) | Observed: clear expertise, substantial project presentation, service context and FAQ. This is a design reference, not evidence of a conversion lift. | Lead with concrete work; use varied project layouts and clearer service hierarchy. Do not copy Clay's client logos, testimonials or metrics. |
| [Work & Co: homepage](https://www.work.co/) | Observed: concise product/design positioning and an editorial emphasis on actual work. | Large, readable headlines and project scope descriptions before broad company content. |
| [Vercel: AI apps and agents](https://vercel.com/ai) | Observed: AI offerings explained through practical products and use cases. | Describe business knowledge, integrations, approved actions and MVPs instead of generic AI claims. |
| [web.dev: Rakuten performance case study](https://web.dev/case-studies/rakuten) | Performance and business outcomes were assessed using real-user measurements and an A/B experiment. Its numerical results are specific to Rakuten. | Keep most homepage content server-rendered; use CSS visuals and a small interactive enquiry component. Measure actual field performance before claiming an improvement. |
| [Google: consent mode implementation](https://developers.google.com/tag-platform/security/guides/consent) | Set consent defaults before tagging; update consent when the visitor chooses. | Denied defaults in the root layout; load one GA4 tag only after analytics opt-in; advertising consent remains denied. |
| [Google: measuring pageviews](https://developers.google.com/analytics/devguides/collection/ga4/views) | History-based enhanced measurement can send pageviews independently of `send_page_view: false`. | Explicit route pageviews; disable GA4's automatic history pageviews in the stream to avoid duplication. |

Baymard's findings come from ecommerce checkout research. Applying them to a B2B project questionnaire is a usability inference, not a guaranteed conversion result. Agency examples provide design references, not controlled experiments. No traffic, enquiry, meeting or sales volume is promised by this redesign.

## Enquiry flow

1. **Service:** AI/agents, automation, AI-powered app/SaaS, web app, website, mobile app, SEO/marketing, consultancy or other.
2. **Scope:** new/improve/fix/support project type; feature/MVP/full product/enterprise project size; a short description.
3. **Budget and timing:** USD budget range and preferred start/launch timeframe, including realistic uncertainty options.
4. **Contact:** country, complete name, email and phone, all required on this homepage.
5. **Review:** inspect all answers, edit any section and send the project brief.

Answers remain in React state through Back/Edit and failed requests. They are not written to browser storage. A reload clears an unfinished brief. Successful submission clears the answers only after the API accepts it. The server revalidates the complete homepage brief, bounds field sizes, escapes email output and includes service, project type/size, budget, timeline, country and contact details in the enquiry email. Existing contact forms retain their own phone behavior. Honeypot, origin/body checks and optional server-verified Turnstile remain in place. Turnstile requires both deployment keys; it is not claimed active without those keys.

## Analytics configuration and launch check

- Owner-supplied public measurement ID: **G-VYTLPTGT2N** (`src/lib/analytics-config.ts`). Numeric stream ID 15950586727 is not the tagging ID. No GA4 environment variable is needed.
- One root-layout consent initializer; one external Google script after opt-in; one initialization per page lifecycle.
- Pageviews omit URL queries/fragments. Initial referrer is sanitized; internal route changes use the preceding route. GA4 is never given the enquiry answers, name, email, phone, project description or budget.
- Custom events: `inquiry_start`, `inquiry_step` (step number only), `inquiry_error`, `generate_lead` (API-accepted enquiry), `booking_link_click`. A booking-link click is not a completed meeting or closed sale.
- In **GA4 Admin > Data streams > Devisgon > Enhanced measurement**, turn off automatic **Form interactions** and **Outbound clicks** because this site measures its own funnel. Under **Page views > Advanced settings**, turn off **Page changes based on browser history events**. The site already sends route pageviews. This avoids double counting and ambiguous automatic form leads.
- Mark **generate_lead** as a key event. Leave `booking_link_click` separate. Confirm actual booked meetings with Calendly/CRM webhooks and closed clients with CRM records; those connections are a separate task.
- After production deployment, open the website, allow analytics and check **GA4 Realtime** or Tag Assistant for the supplied measurement ID and a pageview. Navigate once and expect one further pageview. Decline on a fresh visit and expect no external GA4 script. Automatic reporting may lag; a build/test cannot prove receipt by the GA4 account.
- Clarity project `yrindogf01` is now supplied and integrated; see `docs/team-culture-analytics-release.md` for consent/masking and account verification. There is no second Google tag or Tag Manager container added.

## Validation

`npm run verify:homepage` exercises the actual React wizard with framework routing/script loading stubbed: Back retention, complete payload, failure retention, acceptance-only lead events, no answer data in analytics, consent gating and single initialization/pageview behavior. `verify:growth` tests the real contact route with a mocked email provider, including required homepage qualification fields and their email output. `verify:navigation` covers every original destination in all seven navbar datasets and correct partner labels. Run lint, TypeScript and the production build before publishing.

## What to measure next

Establish a baseline by source, landing page, market and device. Compare enquiry start rate, drop-off at each step, accepted enquiry rate, qualified lead rate, actual meeting rate and closed-client rate. Required phone/budget questions may reduce raw submissions while improving qualification; test that tradeoff with enough real traffic. Do not infer a design's conversion effect from a screenshot or test completion alone. Review web performance separately with field Core Web Vitals and a production audit.
