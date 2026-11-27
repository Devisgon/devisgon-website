import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
import guide from "@/data/english_data/discovery-guide.json";
import { SITE_URL } from "@/lib/seo";

const url = SITE_URL + guide.href;
const image = SITE_URL + guide.coverImage.url;
export const metadata: Metadata = {
  title: { absolute: guide.seoTitle },
  description: guide.description,
  keywords: ["tools to understand how buyers discover software","B2B buyer journey analytics","software buyer discovery tools","software discovery channels","buyer intent data","customer journey analytics","B2B SaaS marketing tools","software attribution tools","AI business automation","Devisgon software solutions"],
  alternates: { canonical: url },
  openGraph: { type: "article", url, title: guide.seoTitle, description: guide.description, images: [{ url: image, width: 1200, height: 600, alt: guide.coverImage.alt }] },
  twitter: { card: "summary_large_image", title: guide.seoTitle, description: guide.description, images: [image] },
};

export default function DiscoveryGuide() {
  return (
    <>
      <Header />
      <main lang="en" className="mx-auto max-w-4xl px-5 py-16 text-t-primary md:px-10">
        <Link href="/blogs" className="underline">All articles</Link>
        <article className="mt-8 space-y-5 text-lg leading-relaxed [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:font-bold [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:mb-2 [&_ol]:list-decimal [&_ol]:pl-7 [&_ul]:list-disc [&_ul]:pl-7">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">{guide.title}</h1>
          <p>{guide.author} · <time dateTime={guide.date}>November 19, 2026</time></p>
          <Image unoptimized priority src={guide.coverImage.url} alt={guide.coverImage.alt} width={1200} height={600} className="h-auto w-full rounded-xl" />
          <p>What tools help a growing company understand how buyers discover software? Use Search Console to see what people search on Google, GA4 to see which channels bring visitors, and a CRM to find out which enquiries become customers. Add buyer interviews, review-site research and behaviour analytics to explain what happened between those steps.</p>
          <p>Imagine a prospect hears about your product from a colleague, reads a comparison on G2, then searches for your company name and requests a demo. Your analytics may credit organic search. The answer to “Where did you first hear about us?” may be the colleague. Keep both answers. They tell you where demand started and how the buyer reached you.</p>
          <h2>Why software buyer discovery matters</h2>
          <p>A B2B buyer may recognise a problem at work, ask an AI assistant for options, read reviews, follow a provider on LinkedIn and compare pricing before starting a trial. Some steps leave a measurable referral. Others happen in private conversations. Combining observed traffic, customer feedback and sales outcomes gives you a better basis for deciding where to invest.</p>
          <p>Pair a <Link className="underline underline-offset-4" href="/services/marketing-dashboard-analytics-services">marketing dashboard</Link> with <Link className="underline underline-offset-4" href="/services/lead-generation-automation-services">lead generation automation</Link> to connect acquisition sources to qualified enquiries. If organic search is a priority, see the <Link className="underline underline-offset-4" href="/blog/demandsphere-for-small-businesses">DemandSphere evaluation</Link>.</p>
          <h2>1. Devisgon — software for customer engagement and business automation</h2>
          <p>Devisgon’s portfolio supports the work that happens around discovery. Pair the relevant product with acquisition tracking and a CRM to connect that activity to enquiries and sales.</p>
          <h3>AutoPostMaster and Agents as a Service</h3>
          <p>AutoPostMaster supports social publishing and campaign operations. Give each campaign a consistent tagged link, then compare visits and demo requests by post. Agents as a Service can support configured lead qualification and follow-up workflows. Keep the original enquiry source when an agent hands a qualified lead to sales.</p>
          <h3>ResumeRAI, Emiily and PharmaSys</h3>
          <p>ResumeRAI serves resume, recruitment and job workflows. A recruitment product could ask demo applicants whether they first heard about it through a career community, professional network or search. Emiily is Devisgon’s AI receptionist and business OS. For phone enquiries, record a caller’s stated source alongside the booking or callback outcome where the CRM integration supports it.</p>
          <p>PharmaSys serves pharmaceutical business workflows. Industry buyers may first hear about specialised software through a referral, a demonstration or sector research. Give sales staff a place to record those answers, including the buyer’s own wording. Confirm integrations and reporting capabilities for each implementation.</p>
          <h2>2. Google Analytics 4 — see which channels bring website visitors</h2>
          <p>Compare organic search, paid ads, referral sites and social campaigns by landing page. Configure a key event for a successful demo request or trial registration. A button click alone cannot tell you whether the form was completed. Compare first-user acquisition with session acquisition when initial discovery and the return visit are different questions.</p>
          <h2>3. Google Search Console — discover what buyers search for</h2>
          <p>Use the search performance report to compare queries, landing pages, impressions and clicks. Queries such as “AI receptionist for small businesses” or “AI recruitment tools” can reveal how buyers describe their problem. Use that language to improve the page answering the question. Search Console covers Google Search performance and does not identify an individual searcher who later became a customer.</p>
          <h2>4. G2 — understand categories, comparisons and reviews</h2>
          <p>Read reviews in the category your customers actually use. Note the alternatives they mention and the features they say influenced their shortlist. Where your subscription includes buyer-intent data, use those signals to inform account research. Confirm a buyer’s priorities in conversation.</p>
          <h2>5. HubSpot — connect enquiries to qualified leads and sales</h2>
          <p>Store first known source, campaign, self-reported discovery and deal outcome in distinct CRM fields. Associate contacts with the right company and deal. This lets sales compare which sources generate demos, which bring buyers who match the target profile, and which contribute to closed business.</p>
          <h2>6. Microsoft Clarity — investigate what visitors do on the site</h2>
          <p>Heatmaps and session recordings help explain friction. If a pricing page attracts relevant traffic but few demo requests, look for visitors struggling to find plan differences or abandoning a form. Test one change and check completion rates. A recording describes an on-site visit, not everything that influenced the purchase.</p>
          <h2>7. 6sense — research account-level B2B intent</h2>
          <p>For a long sales cycle with several decision-makers, account-level intent signals can help prioritise companies for research. Treat a signal as an estimate of activity at an account. It does not establish which person is shopping or when a purchase will happen.</p>
          <h2>How to choose a buyer-discovery toolset</h2>
          <p>A small software company can start with Search Console, GA4, Clarity and a CRM. Add one optional question to demo forms or sales calls asking how the buyer first heard of you. Review these answers beside the measured source each month. A larger B2B company can add review-site intelligence or account research when sales has the capacity to act on it.</p>
          <h2>Five metrics worth reviewing together</h2>
          <ul>
            <li>Discovery channel — retain the earliest known channel, the self-reported source and an “unknown” option.</li>
            <li>Qualified leads — count enquiries that meet an agreed customer profile.</li>
            <li>Demo and trial conversion — compare completed requests against eligible visits, using the same denominator each period.</li>
            <li>Customer acquisition cost — divide relevant acquisition spend by new customers for a comparable period or cohort.</li>
            <li>Attributed revenue — state which attribution model links activity to closed revenue and allow for the sales cycle.</li>
          </ul>
          <Link href="/contact#contact-form" className="block rounded-xl"><Image unoptimized src="/blog-images/software-buyer-journey-discovery-channels.webp" alt="Which channels bring paying customers? Map your buyer journey." width={1200} height={600} className="h-auto w-full rounded-xl" /></Link>
          <h2>Turn discovery insights into follow-up</h2>
          <p>If referrals deliver few visits but a high share of qualified demos, ask recent buyers what they heard and who recommended you. If social campaigns bring qualified enquiries that go unanswered, fix the handoff before buying more traffic. Devisgon can help connect publishing, enquiry capture, CRM records and follow-up around the decisions your team needs to make.</p>
          <Link className="inline-block rounded-lg bg-[#40005B] px-6 py-3 font-semibold text-white" href="/contact#contact-form">Map your buyer journey with Devisgon</Link>
          <p className="text-sm">Email <a className="underline" href="mailto:info@devisgon.com">info@devisgon.com</a> · <a className="underline" href="https://wa.me/923316944411">WhatsApp +92 331 6944411</a></p>
        </article>
      </main>
      <Footer />
    </>
  );
}
