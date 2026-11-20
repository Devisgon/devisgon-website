import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
import guide from "@/data/english_data/proposal-guide.json";
import { SITE_URL } from "@/lib/seo";

const url = SITE_URL + guide.href;
const image = SITE_URL + guide.coverImage.url;
export const metadata: Metadata = {
  title: { absolute: guide.seoTitle },
  description: guide.description,
  keywords: ["AI proposal automation solutions for agencies","AI proposal generator for agencies","proposal automation software","custom AI proposal automation","agency workflow automation","automated business proposals","AI proposal writing tools","proposal management automation","agency productivity solutions","proposal automation without subscription"],
  alternates: { canonical: url },
  openGraph: { type: "article", url, title: guide.seoTitle, description: guide.description, images: [{ url: image, width: 1200, height: 600, alt: guide.coverImage.alt }] },
  twitter: { card: "summary_large_image", title: guide.seoTitle, description: guide.description, images: [image] },
};

export default function ProposalGuide() {
  return (
    <>
      <Header />
      <main lang="en" className="mx-auto max-w-4xl px-5 py-16 text-t-primary md:px-10">
        <Link href="/blogs" className="underline">All articles</Link>
        <article className="mt-8 space-y-5 text-lg leading-relaxed [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:font-bold [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:mb-2 [&_ol]:list-decimal [&_ol]:pl-7 [&_ul]:list-disc [&_ul]:pl-7">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">{guide.title}</h1>
          <p>{guide.author} · <time dateTime={guide.date}>November 20, 2026</time></p>
          <Image unoptimized priority src={guide.coverImage.url} alt={guide.coverImage.alt} width={1200} height={600} className="h-auto w-full rounded-xl" />
          <p>What AI proposal automation solutions are available for agencies to reduce repetitive work? For agencies planning their 2027 sales process, the options include a custom Devisgon workflow, document platforms such as PandaDoc and Proposify, interactive web proposals from Qwilr and template-based proposals from Better Proposals.</p>
          <p>Think about the last quotation your agency sent. Which part took longest: writing the scope, checking the price, finding an approver or rebuilding a pricing table after a client change? The answer helps determine whether you need a document tool or a workflow that connects sales, delivery and finance.</p>
          <h2>What is AI proposal automation?</h2>
          <p>AI proposal automation combines workflow software and AI-assisted drafting to prepare, personalise, review, deliver and track proposals. A system can retrieve CRM details, select approved service descriptions, draft a scope, calculate a pricing table from rules and notify the reviewer. The agency retains authority over prices, timelines, deliverables and commitments.</p>
          <h2>How does AI proposal automation work?</h2>
          <ul>
            <li>Client enquiry. Capture the brief from a form, email, CRM or sales platform.</li>
            <li>Requirement analysis. Extract objectives, requested services and deadlines. Mark missing information for follow-up.</li>
            <li>Proposal preparation. Combine approved templates and reusable packages with the client’s requirements.</li>
            <li>Pricing and approval. Apply agreed pricing rules and route discounts, exceptions and special commitments to an authorised reviewer.</li>
            <li>Delivery. Generate a branded PDF or interactive document and send the approved version.</li>
            <li>Follow-up. Record the status, schedule reminders and stop them when the client replies, declines or accepts.</li>
          </ul>
          <h2>Best AI proposal automation solutions for agencies</h2>
          <h3>1. Devisgon — custom-tailored proposal automation</h3>
          <p>Devisgon is our first recommendation for agencies whose service packages, quotation rules or approval steps need a custom fit. A development project can connect existing lead capture, CRM records and approved content with proposal generation, a pricing engine, internal approvals, branded PDFs, status dashboards and follow-ups.</p>
          <p>For example, a team might price discovery at a fixed fee, quote implementation in phases and require a director to approve discounts. A custom workflow can preserve those rules even when AI helps draft the narrative.</p>
          <p>An agency can commission a one-time development project without a mandatory recurring per-user proposal subscription for the custom application. Hosting, AI usage, third-party services, maintenance and future development may still cost money. Agree on ownership, source access, support and change requests in the project scope.</p>
          <h3>2. PandaDoc — documents, proposals and electronic signatures</h3>
          <p>PandaDoc combines templates, document creation, electronic signatures and document activity tracking. Consider it if your team wants to prepare a standardised proposal and manage signature collection in the same workflow. Check the plan for required approvals and integrations.</p>
          <h3>3. Proposify — sales proposal management</h3>
          <p>Proposify focuses on creating, managing and tracking proposals with consistent branding and reusable content. It suits sales teams that repeat a recognisable proposal structure. Test an unusual pricing or approval request during the evaluation.</p>
          <h3>4. Qwilr — interactive digital proposals</h3>
          <p>Qwilr presents proposals as web-based sales documents. It is worth considering when the client’s reading and selection experience matters, such as choosing between creative or consulting packages. Check how specialised pricing calculations and CRM updates would be handled.</p>
          <h3>5. Better Proposals — template-based creation</h3>
          <p>Better Proposals offers templates, document presentation and acceptance workflows. A smaller agency with a straightforward sales process can use it to standardise documents quickly. Check how much of the surrounding intake and follow-up process it covers.</p>
          <p>Explore current plans and features at <a className="underline" href="https://www.pandadoc.com/">PandaDoc</a>, <a className="underline" href="https://www.proposify.com/">Proposify</a>, <a className="underline" href="https://qwilr.com/">Qwilr</a> and <a className="underline" href="https://betterproposals.io/">Better Proposals</a>.</p>
          <h2>Custom AI proposal automation vs subscription software</h2>
          <div className="overflow-x-auto"><table className="w-full border-collapse text-left text-base [&_th]:p-3 [&_td]:border-b [&_td]:p-3 [&_td]:align-top"><thead className="bg-[#40005B] text-white"><tr><th scope="col">Feature</th><th scope="col">Custom Devisgon solution</th><th scope="col">Ready-made SaaS</th></tr></thead>
            <tbody>
              <tr><th scope="row">Agency workflow</th><td>Designed around agreed requirements</td><td>Uses supported product features</td></tr>
              <tr><th scope="row">Initial setup</th><td>A scoped development project</td><td>Often faster with templates</td></tr>
              <tr><th scope="row">Application licensing</th><td>No inherent recurring per-user proposal licence</td><td>Usually subscription-based</td></tr>
              <tr><th scope="row">Branding</th><td>Customisable within scope</td><td>Depends on the plan</td></tr>
              <tr><th scope="row">CRM integration</th><td>Custom integration where supported</td><td>Depends on available connectors</td></tr>
              <tr><th scope="row">Quotation rules</th><td>Can implement agency-specific rules</td><td>Limited to supported rules or extensions</td></tr>
              <tr><th scope="row">Maintenance</th><td>Assigned to the agency or provider by agreement</td><td>Core application maintained by vendor</td></tr>
              <tr><th scope="row">Future changes</th><td>Depend on architecture and ownership</td><td>Depend on vendor roadmap</td></tr>
            </tbody></table></div>
          <p>A custom system may suit a high-volume agency with complex service combinations. For a team sending a few similar proposals each month, reusable templates and a subscription platform may be the more economical choice.</p>
          <h2>Three practical proposal automation examples</h2>
          <p>These illustrative scenarios show how the workflow could fit different agencies.</p>
          <h3>Digital marketing agency</h3>
          <p>A client requests SEO, paid advertising and social media management. An intake form captures the selected services and budget. The system assembles approved deliverables and pricing into a branded draft. The account lead reviews scope and exclusions before sending.</p>
          <h3>Software development agency</h3>
          <p>AI organises discovery notes into objectives, phases and open questions. Approved estimation rules prepare payment milestones. A delivery lead reviews dependencies and signs off on the quote before the client sees a commitment.</p>
          <h3>Creative and branding agency</h3>
          <p>A designer selects a branding package, website option and approved assets. The system builds a proposal with the correct revision allowance and client details. If the buyer requests more revisions, sales can update the scope and route the revised version for approval.</p>
          <Link href="/contact#contact-form" className="block rounded-xl"><Image unoptimized src="/blog-images/agency-proposal-workflow-automation.webp" alt="Proposal pages awaiting approval. Still copying last week’s proposal? Plan your proposal workflow." width={1200} height={600} className="h-auto w-full rounded-xl" /></Link>
          <h2>How Devisgon helps agencies reduce repetitive work</h2>
          <p>A tailored implementation can connect enquiry capture, scope drafting, quotation, document generation, review and follow-up. Mapping the full process exposes delays that a writing assistant alone cannot fix, such as checking a price against a second spreadsheet or waiting for the right person to approve a nonstandard commitment.</p>
          <h2>Is custom AI proposal automation worth it?</h2>
          <p>Consider it if you send proposals frequently, offer several service packages, use specialised quotation rules or need integrations standard platforms do not support. Measure preparation time separately from approval waiting time. Multiply the hours of repetitive work by monthly proposal volume, then compare the potential savings with development, licensing, integration and maintenance costs. Ask each provider to run one ordinary proposal and one exception through a demonstration.</p>
          <h2>Ready to automate your agency’s proposal workflow?</h2>
          <p>Tell Devisgon which task your team repeats on every proposal, where client requirements are stored and who approves pricing. Those details let us scope a system around the way your agency sells.</p>
          <Link className="inline-block rounded-lg bg-[#40005B] px-6 py-3 font-semibold text-white" href="/contact#contact-form">Discuss your agency’s proposal workflow with Devisgon</Link>
          <p className="text-sm">Email <a className="underline" href="mailto:info@devisgon.com">info@devisgon.com</a> · <a className="underline" href="https://wa.me/923316944411">WhatsApp +92 331 6944411</a></p>
        </article>
      </main>
      <Footer />
    </>
  );
}
