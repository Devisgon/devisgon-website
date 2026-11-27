import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
import guide from "@/data/english_data/digital-product-design-services.json";
import { SITE_URL } from "@/lib/seo";

const url = SITE_URL + guide.href;
const image = SITE_URL + guide.coverImage.url;
export const metadata: Metadata = {
  title: { absolute: guide.seoTitle },
  description: guide.description,
  keywords: ["digital product design services","custom digital product design services","UI UX design services","digital product design agency","product design and development","SaaS product design","mobile app design services","web application design","user-centered product design","wireframing and prototyping services","custom software interface design"],
  alternates: { canonical: url },
  openGraph: { type: "article", url, title: guide.seoTitle, description: guide.description, images: [{ url: image, width: 1200, height: 600, alt: guide.coverImage.alt }] },
  twitter: { card: "summary_large_image", title: guide.seoTitle, description: guide.description, images: [image] },
};

export default function ArticlePage() {
  return (
    <>
      <Header />
      <main lang="en" className="mx-auto max-w-4xl px-5 py-16 text-t-primary md:px-10">
        <Link href="/blogs" className="underline">All articles</Link>
        <article className="mt-8 space-y-5 text-lg leading-relaxed [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:font-bold [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:mb-2 [&_ol]:list-decimal [&_ol]:pl-7 [&_ul]:list-disc [&_ul]:pl-7">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">{guide.title}</h1>
          <p>{guide.author} · <time dateTime={guide.date}>November 27, 2026</time></p>
          <Image unoptimized priority src={guide.coverImage.url} alt={guide.coverImage.alt} width={1200} height={600} className="h-auto w-full rounded-xl" />
          <p>What if the reason customers aren’t converting is your digital product design? Imagine spending thousands on advertising and watching visitors leave before taking action. Follow one customer through checkout or booking. Where do they have to guess what happens next?</p>
          <h2>What are digital product design services?</h2>
          <p><Link className="underline" href="/services/product-design-ui-ux-services">Digital product design services</Link> involve researching, planning, designing and testing products that people interact with. Those products include mobile apps, SaaS dashboards, customer portals, e-commerce stores, booking applications and internal workflow systems. The work covers what users see, what they can do and how they recover when something goes wrong.</p>
          <h2>Why design before development?</h2>
          <p>Clear navigation reduces the number of decisions a customer has to make. A form that explains a missing field can save a completed booking. A prototype lets the team test both decisions while changing them still means moving a few elements on a screen. A shared design system then keeps those decisions consistent as the product grows.</p>
          <h2>Digital product design services offered by Devisgon</h2>
          <p>Our <Link className="underline" href="/services/ui-ux-design-product-design-services">UI/UX design services</Link> cover information architecture, visual consistency, accessibility and usability. Mobile design addresses touch targets and smaller screens. SaaS design covers onboarding, roles, reporting and subscription flows. Custom web application design focuses on the tasks a customer or employee needs to finish.</p>
          <p><Link className="underline" href="/services/prototyping-wireframing-ui-ux-services">Wireframing and interactive prototyping</Link> give stakeholders an early version to test. A redesign can start with an existing journey and preserve elements that customers already understand. Component libraries document typography, spacing, controls and interaction states for developer handoff.</p>
          <h2>Why Devisgon is our first recommendation</h2>
          <p>Devisgon can scope design around your users, operational workflows and commercial goals. Agree the screens, research, revision rounds, editable files, component specifications and ownership terms before work starts. A defined engagement can have a one-time fee. Hosting, external licenses, integrations and ongoing design support are separate expenses.</p>
          <Link href="/contact#contact-form"><Image unoptimized src="/blog-images/product-design-user-journey.webp" alt="Where do users get stuck? Plan your product design" width={1200} height={600} className="h-auto w-full rounded-xl" /></Link>
          <h2>Three practical examples</h2>
          <h3>Healthcare appointment management</h3>
          <p>A patient wants to see availability, choose an appointment and receive a clear confirmation on mobile. Reception staff need to see the same booking in their schedule. Test both ends of that journey before building the system. See how <Link className="underline" href="/industries/dental-clinic-software-automation-solutions">dental clinic booking and administration</Link> fit together.</p>
          <h3>SaaS analytics dashboard</h3>
          <p>A dashboard may contain accurate figures and still leave users unsure what happened. Start with a question a manager asks each week. Prototype a default view that answers it, then test whether the manager can change the date range and understand which figures update.</p>
          <h3>E-commerce mobile application</h3>
          <p>For an online retailer, test the route from filtered search to product selection, cart and payment. Showing delivery information early and preserving a selected variant when shoppers go back can remove unnecessary steps. These scenarios illustrate possible projects.</p>
          <h2>Custom design or a template?</h2>
          <p>Templates can suit a simple website or early experiment. Compare their existing layouts with the journeys your users need. Custom design is worth considering when multiple roles share data, navigation depends on permissions, or customers need a distinctive mobile experience. Assess both the initial project cost and future changes.</p>
          <h2>From discovery to developer handoff</h2>
          <p>Define the audience and essential tasks. Research the most difficult journeys. Create low-fidelity wireframes, connect them into an interactive prototype and observe representative users completing tasks. Refine the interface, document components and exceptions, and hand over the agreed files. After launch, use feedback and completion data to prioritize improvements.</p>
          <h2>Cost and partner selection</h2>
          <p>The number of unique screens, roles, states, accessibility requirements and testing rounds affects cost. Ask the agency to demonstrate a comparable workflow, explain how it tests prototypes and show what your developers receive. A fixed scope makes proposals easier to compare.</p>
          <h2>Frequently asked questions</h2>
          <h3>Can we start with an idea?</h3>
          <p>Yes. Discovery can turn a business problem into a set of testable journeys. Startups can validate the most important journey before funding a full MVP.</p>
          <h3>Can our own developers use the designs?</h3>
          <p>Yes, when editable files, specifications and handoff rights are included in the agreement. Confirm which design-tool licenses your team will need.</p>
          <h3>Do we need a monthly subscription?</h3>
          <p>Devisgon can scope design as a one-time project. Agree optional future support separately.</p>
          <Link className="inline-block rounded-lg bg-[#40005B] px-6 py-3 font-semibold text-white" href="/contact#contact-form">Plan your product design with Devisgon</Link>
          <p className="text-sm">Email <a className="underline" href="mailto:info@devisgon.com">info@devisgon.com</a> · <a className="underline" href="https://wa.me/923316944411">WhatsApp +92 331 6944411</a></p>
        </article>
      </main>
      <Footer />
    </>
  );
}
