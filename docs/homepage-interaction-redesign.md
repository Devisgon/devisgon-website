# Homepage redesign: automation people can explore

Research and implementation: 18 November 2026.

## Problem and limits of the evidence

The owner reports that Clarity visitors often stop around the hero. The current homepage was inspected in the browser: it opens with a large text block and the five-step questionnaire, followed by project cards, services, delivery, FAQs and company information. The hero explains automation but does not demonstrate a workflow. The next section is not apparent on many laptop screens.

No private Clarity recordings, device breakdowns or acquisition reports were available for this review. Low scroll depth alone does not establish that the design caused abandonment: intent, traffic quality, loading errors, mobile layout and successful above-fold actions can all affect that observation. This redesign is a testable hypothesis, not a promise of more leads.

## Research and design decisions

| Source reviewed | Relevant pattern or guidance | Application to Devisgon |
| --- | --- | --- |
| [n8n](https://n8n.io/) | The homepage makes agent work concrete through named triggers, decisions, tools and outcomes. | Show a short workflow visitors can run and change: enquiry, invoice or support. Use original illustrations and copy, not a recreation of n8n's UI. |
| [Linear](https://linear.app/) | Product-interface examples explain work in context rather than relying only on abstract claims. | Put an actual interactive example in the opening copy column. Keep the real enquiry form beside it. |
| [Make](https://www.make.com/) | Connected applications and visible processes provide a visual explanation of automation. | Use connected nodes and staged feedback so visitors can follow each handoff. |
| [Stripe](https://stripe.com/) | Concrete interface examples accompany individual product capabilities. | Distinguish services visually and preserve detailed links and real project scope. Do not invent revenue, customer counts or success statistics. |
| [NN/g: Scrolling and Attention](https://www.nngroup.com/articles/scrolling-and-attention/) | Above-fold information receives disproportionate attention; apparent completeness can discourage further exploration. | Keep the proposition and enquiry action immediately visible. Add a clear continuation strip with links to work, capabilities and delivery. |
| [NN/g: Animation for Attention and Comprehension](https://www.nngroup.com/articles/animation-usability/) | Animation should support understanding and direct attention deliberately. | Animate an understandable input-to-output sequence, plus restrained card and icon feedback. No animated headline that delays reading. |
| [NN/g: Scroll-Triggered Text Animations](https://www.nngroup.com/articles/scroll-animations/) | Repeated reveal effects can delay reading and wear out users. | All core content is server-rendered and visible without waiting for a scroll reveal. Normal vertical scrolling remains intact. |
| [web.dev: High-performance CSS animation](https://web.dev/articles/animations-guide) | Transform and opacity are suitable motion properties; costly rendering work should be avoided. | Use small CSS transforms/opacity with a few timed React state changes, not a canvas, WebGL scene or a video download. |
| [web.dev: Reduced motion](https://web.dev/articles/prefers-reduced-motion) | Respect the operating-system motion preference. | Disable decorative movement; the demo returns its result instantly when run with reduced motion enabled. |
| [W3C: Pause, Stop, Hide](https://www.w3.org/WAI/WCAG20/Understanding/pause-stop-hide.html) | Moving or updating content alongside other content needs appropriate user control. | Provide pause/resume/replay. Run the initial sequence once, stop offscreen or when the tab is hidden, and clean up timers. |

These references informed the structure and interaction model. They are not evidence that any specific animation will increase Devisgon's conversion rate. Current reference-page text and Devisgon's rendered layout were inspected; competitor animation performance was not benchmarked.

## Implemented experience

- Preserve Devisgon's purple/magenta branding and light/dark themes. Add a warm, lightly patterned hero canvas and a contrasting workflow illustration.
- Retain the existing headline and metadata. Shorten supporting hero copy and keep the project CTA, discovery call and oversight/scope notes.
- Preserve `ProjectEnquiry`, its fields, validation, API calls, progress steps, original CSS selectors and responsive form styling. It remains the right-hand hero column on desktop and follows the opening copy on mobile. Demo selections never change form answers.
- Add three clearly labelled illustrative workflows. They make no external requests and do not pretend to be live customer integrations. Node movement and completion states explain the handoffs; outcomes include human review.
- Add section navigation, larger project treatments with subtle hover movement, a two-column service gallery with connected icon illustrations, and expandable delivery descriptions.
- Retain real projects, all service destinations, FAQs, company information and lower-page contact routes. Existing images continue to use Next Image, so the separate static-image optimization PR remains compatible.
- New strings use the existing server-side content localization path. Workflow IDs and measurement keys remain fixed across languages.

## Measurement

Existing enquiry and booking tracking is unchanged. New events use the existing analytics preference and never include form answers, contact details or arbitrary URLs:

| Event | Fixed item_id values | Purpose |
| --- | --- | --- |
| `homepage_demo_select` | leads, invoices, support | Which examples visitors choose |
| `homepage_demo_run` | leads, invoices, support | Explicit runs/resumes, excluding autoplay |
| `homepage_section_view` | work, services, process | First time half of a section's heading is visible per mounted homepage |

Clarity receives the same event with the fixed item appended. Section reach is not reading time. Demo interactions are not leads. Compare enquiry starts, completed enquiries and booking clicks before/after, segmented by mobile/desktop and acquisition channel. Inspect sessions that stop at the hero for errors, form friction and visitor intent. Compare equivalent periods and account for traffic changes; the owner's reported small click volume is not enough to attribute changes confidently to a design alone.

## Validation

Focused React/jsdom checks cover demo selection, progression, pause/resume, reduced motion, offscreen cleanup, analytics opt-out, section-event deduplication and observer cleanup. Existing form, consent, navigation and growth checks remain part of verification.

The managed local-preview launcher appends Vite-specific `--host`/`--strictPort` flags to this Next.js project; Next rejects those arguments. Application scripts were not changed to accommodate that preview infrastructure. Browser layout/interaction review therefore uses the Vercel PR preview when available. Production credentials are not available in the workspace.

Local results: all 30 checks passed (12 homepage, 12 navigation, 6 growth), including the unchanged five-step form submission tests. TypeScript validation and production compilation passed. The full production build stops collecting `/api/apply_mail` because `RESEND_API_KEY` is absent here; no environment or unrelated mail handling was changed.
