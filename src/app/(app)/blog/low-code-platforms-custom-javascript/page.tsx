import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
import guide from "@/data/english_data/low-code-guide.json";
import { SITE_URL } from "@/lib/seo";

const url = SITE_URL + guide.href;
const image = SITE_URL + guide.coverImage.url;
export const metadata: Metadata = {
  title: { absolute: guide.seoTitle },
  description: guide.description,
  keywords: ["low-code platforms with custom JavaScript", "complex business logic", "n8n workflow automation", "Jotform approvals", "low-code internal tools"],
  alternates: { canonical: url },
  openGraph: { type: "article", url, title: guide.seoTitle, description: guide.description, images: [{ url: image, width: 1200, height: 600, alt: guide.coverImage.alt }] },
  twitter: { card: "summary_large_image", title: guide.seoTitle, description: guide.description, images: [image] },
};

export default function LowCodeGuide() {
  return (
    <>
      <Header />
      <main lang="en" className="mx-auto max-w-4xl px-5 py-16 text-t-primary md:px-10">
        <Link href="/blogs" className="underline">All articles</Link>
        <article className="mt-8 space-y-5 text-lg leading-relaxed [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:font-bold [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:mb-2 [&_ol]:list-decimal [&_ol]:pl-7 [&_ul]:list-disc [&_ul]:pl-7">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">{guide.title}</h1>
          <p>{guide.author} · <time dateTime={guide.date}>November 19, 2026</time></p>
          <Image unoptimized priority src={guide.coverImage.url} alt={guide.coverImage.alt} width={1200} height={600} className="h-auto w-full rounded-xl" />
          <p>What low-code platforms let developers write custom JavaScript for complex business logic? Start with n8n for workflows that run across systems. Choose Retool or Appsmith when the code belongs in an internal application. Jotform can pass submissions to an external JavaScript service, while Power Apps supports code through specific developer extensions.</p>
          <p>Consider a discount that depends on the customer’s contract, order volume and shipping region. Someone has to own that calculation, test it and explain the result when an order is held for review. Where that rule should run is a better starting point than counting how many integrations a platform offers.</p>
          <h2>What are low-code platforms with custom JavaScript?</h2>
          <p>Low-code platforms combine visual builders, reusable components and integrations. Developers can add code to transform data, validate inputs, calculate prices or handle exceptions. The important distinction is where the code executes. A dashboard expression can change what an employee sees. A background workflow can process an order even when nobody has the dashboard open.</p>
          <h2>1. n8n — our first choice for JavaScript workflow automation</h2>
          <p><strong>Best for</strong> multi-step operations, API integrations and data transformations. n8n combines visual branching, webhooks and HTTP Request nodes with a Code node that runs JavaScript. Teams can choose cloud or self-hosted deployment.</p>
          <p>Imagine an e-commerce company processing hundreds of orders. A webhook starts a workflow. A Code node validates the order and calculates the contract discount. An HTTP Request node checks inventory. A branch routes exceptions to an employee and sends approved orders to fulfillment. Record the order identifier before retrying a failed fulfillment request so a customer does not receive two shipments.</p>
          <p>Devisgon recommends n8n first when several systems share one process. Keeping calculations in a focused Code node lets office staff follow the sequence while developers maintain the rules. <a className="underline" href="https://docs.n8n.io/code/code-node/">Read the n8n Code node documentation</a>.</p>
          <h2>2. Jotform — forms, data collection and approvals</h2>
          <p><a className="underline" href="https://www.jotform.com/">Jotform</a> is a good fit when the process starts with a customer or employee answering questions. Conditional fields, calculations and approval flows can handle much of the intake experience. For custom JavaScript processing, send submission data through a webhook to n8n or a backend you control.</p>
          <p>For example, a service company can ask about project scope, show questions relevant to the chosen service and display a preliminary estimate. An external workflow can look up contract pricing and prepare a CRM record. If approval is required, keep the record pending until the approval outcome is confirmed. A submission webhook signals receipt of the form.</p>
          <p>Devisgon can connect this intake flow to APIs, databases and downstream systems. <Link className="underline" href="/partners/jotform">Explore Devisgon’s Jotform services</Link> or <a className="underline" href="https://www.jotform.com/help/245-how-to-send-submission-data-via-a-webhook/">see how Jotform sends submissions via webhook</a>.</p>
          <h2>3. Retool — custom internal business applications</h2>
          <p><strong>Best for</strong> dashboards and operations tools that give employees access to business data. Retool supports JavaScript expressions and queries alongside visual components, API connections and database queries.</p>
          <p>A logistics team could bring inventory, orders and delivery alerts into one dashboard. JavaScript can combine query results and present the relevant orders when a dispatcher selects a warehouse. The dispatch action can then call the system that owns the order. <a className="underline" href="https://docs.retool.com/queries/guides/javascript/">Read Retool’s JavaScript guide</a>.</p>
          <h2>4. Appsmith — developer-friendly internal tools</h2>
          <p><strong>Best for</strong> operational interfaces and dashboards built on an open-source low-code platform. Appsmith offers JavaScript bindings and reusable functions alongside widgets, API integrations and database queries.</p>
          <p>For a sales administration panel, bind a table to customer records, filter it by account owner and reuse a function to validate updates. The team can review the selected customer and outstanding work on one screen. <a className="underline" href="https://docs.appsmith.com/core-concepts/writing-code">See how code works in Appsmith</a>.</p>
          <h2>5. Microsoft Power Apps — Microsoft-centered business environments</h2>
          <p><strong>Best for</strong> teams already using Microsoft 365, Dataverse and Power Platform. Canvas apps use Power Fx for everyday formulas. Developers can build custom controls through the Power Apps component framework, where TypeScript code is compiled for the browser. Treat that extension work as a distinct development task.</p>
          <p>An HR team might build an onboarding app in Power Apps, store records in Dataverse and route approvals through Power Automate. A custom control makes sense when a particular interaction exceeds what the standard controls can deliver. <a className="underline" href="https://learn.microsoft.com/en-us/power-apps/developer/component-framework/overview">Explore Microsoft’s component framework</a>.</p>
          <h2>Low-code platform comparison</h2>
          <div className="overflow-x-auto"><table className="w-full border-collapse text-left text-base [&_th]:p-3 [&_td]:border-b [&_td]:p-3">
            <thead className="bg-[#40005B] text-white"><tr><th>Platform</th><th>Where custom logic runs</th><th>Best use case</th></tr></thead>
            <tbody>
              <tr><th scope="row">n8n</th><td>JavaScript in a workflow Code node</td><td>Background automation across systems</td></tr>
              <tr><th scope="row">Jotform</th><td>Built-in form rules, external JavaScript via integration</td><td>Forms and approvals</td></tr>
              <tr><th scope="row">Retool</th><td>JavaScript expressions and queries</td><td>Internal business applications</td></tr>
              <tr><th scope="row">Appsmith</th><td>JavaScript bindings and reusable functions</td><td>Dashboards and operations tools</td></tr>
              <tr><th scope="row">Power Apps</th><td>Power Fx formulas and supported code extensions</td><td>Microsoft business apps</td></tr>
            </tbody>
          </table></div>
          <h2>Why custom JavaScript matters for business logic</h2>
          <p>When pricing rules, approval levels and regional exceptions accumulate, a visual workflow can become difficult to review. Put the calculation in one place and keep a few worked examples with it. A reviewer should be able to see why a particular order received a discount and what would happen if the order crossed the next threshold.</p>
          <h2>Why solution architecture matters</h2>
          <p>Before choosing a platform, trace a single record from intake to completion. Decide which system owns it, who can approve changes, how credentials are managed and where staff can see failed operations. Plan for missing data, duplicate submissions, service outages and growing volumes. A workflow that succeeds on the second attempt should leave one correct record.</p>
          <h2>How Devisgon helps with low-code development</h2>
          <p>Devisgon designs the data flow, selects the platform and implements the integrations. That can mean building an n8n workflow, configuring Jotform approvals, writing custom JavaScript calculations or developing an internal dashboard. The starting point is the operational decision your team needs to make and the data it needs to make it.</p>
          <Link href="/contact#contact-form" className="block rounded-xl focus-visible:outline-2">
            <Image unoptimized src="/blog-images/javascript-workflow-automation-contact.webp" width={1200} height={600} alt="When the workflow needs code. Discuss your automation project using the Devisgon contact form." className="h-auto w-full rounded-xl" />
          </Link>
          <h2>Need a custom low-code solution?</h2>
          <p>Tell Devisgon which systems you use, the rule your current workflow struggles with and what should happen when it succeeds. Those details give us a concrete starting point for your solution architecture.</p>
          <Link className="inline-block rounded-lg bg-[#40005B] px-6 py-3 font-semibold text-white" href="/contact#contact-form">Discuss your automation project with Devisgon</Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
