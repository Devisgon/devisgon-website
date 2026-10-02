import Link from "next/link";

const offers = [
  { title: "Custom AI agents", path: "/services/ai-agent-development-automation-services", text: "Connect business tools, retrieve approved knowledge and prepare actions with human review where it matters." },
  { title: "Business automation", path: "/services/business-process-automation-services", text: "Connect forms, CRM, documents and approvals with clear rules, failure recovery and operational visibility." },
  { title: "AI-powered automation", path: "/services/ai-powered-business-automation-services", text: "Add classification, extraction and drafting to workflows while keeping validation and exceptions under your control." },
  { title: "AI-powered apps", path: "/services/ai-software-development-automation-services", text: "Build AI-enabled SaaS, MVPs, web apps and mobile products with usable interfaces and production foundations." },
];

export default function PriorityOffers() {
  return (
    <section aria-labelledby="core-services-heading" className="bg-bg-primary px-6 py-16 text-t-primary">
      <div className="mx-auto max-w-6xl">
        <h2 id="core-services-heading" className="text-3xl font-bold">AI and automation built around your business</h2>
        <p className="mt-4 max-w-3xl text-t-secondary">For founders and operations teams in the USA first, followed by Canada, the Netherlands and Europe, Australia, New Zealand, Qatar, Kuwait, Saudi Arabia and the UAE. Work with our team remotely to define the scope and next step.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {offers.map((offer) => <Link key={offer.path} href={offer.path} className="rounded-2xl border border-primary p-6 transition-colors hover:bg-bg-secondary focus-visible:outline focus-visible:outline-2">
            <h3 className="text-xl font-semibold">{offer.title}</h3><p className="mt-3 text-t-secondary">{offer.text}</p><span className="mt-4 inline-block underline">Explore the service</span>
          </Link>)}
        </div>
        <p className="mt-8 text-t-secondary">Also building <Link className="underline" href="/services/web-application-development-services">custom web applications</Link> and <Link className="underline" href="/services/website-development-design-services">business websites</Link>, supported by mobile engineering, architecture, design and deployment.</p>
        <div className="mt-6 flex flex-wrap gap-5"><Link href="/contact" className="font-semibold underline">Discuss your project</Link><Link href="/resources" className="underline">Planning guides</Link><Link href="/tools/automation-roi" className="underline">Estimate automation value</Link></div>
      </div>
    </section>
  );
}
