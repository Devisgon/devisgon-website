import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Bot, Workflow, Layers3, Code2, Check, ShieldCheck } from "lucide-react";
import { getDiscoveryCallHref } from "@/lib/discovery-call";
import { featuredWork } from "@/data/featured-work";
import ProjectEnquiry from "./project_enquiry";
import styles from "./conversion_home.module.css";

const services = [
  { icon: Bot, title: "AI & agents", description: "Give your team assistants that work with your knowledge and approved tools, with human oversight where it matters.", href: "/services/ai-agent-development-automation-services", tag: "01 / INTELLIGENCE" },
  { icon: Workflow, title: "Automations", description: "Connect your CRM, forms, documents and approvals. Replace repeated handoffs with a workflow your team can run.", href: "/services/business-process-automation-services", tag: "02 / OPERATIONS" },
  { icon: Layers3, title: "AI-powered apps", description: "Build the first useful version of your AI product. SaaS, MVPs, web and mobile apps, shaped around your users.", href: "/services/ai-software-development-automation-services", tag: "03 / PRODUCTS" },
  { icon: Code2, title: "Web apps & websites", description: "Turn a complex process into a clear application, or give your business a website that helps people take the next step.", href: "/services/web-application-development-services", tag: "04 / DIGITAL" },
];
const steps = [
  ["01", "Find the right starting point.", "Map the users, workflow, integrations and business problem before choosing the technology."],
  ["02", "Make the scope concrete.", "Review the approach, deliverables, budget and tradeoffs before committing to implementation."],
  ["03", "See the work take shape.", "Review working milestones, test real scenarios and refine the product together."],
  ["04", "Launch with a clear handover.", "Agree on deployment, documentation, ownership and the support you need after launch."],
];
const faqs = [
  ["I know the business problem, but not the right technology. Can you help?", "Yes. Start with the workflow or product you want to improve. We review whether automation, AI, a custom application or a simpler integration fits the need before proposing a build."],
  ["Can you work with our existing CRM and business tools?", "We review the APIs, access permissions and limitations of your tools during scoping. Integrations, validation and failure recovery are included in the proposed approach when they are needed."],
  ["Can we start with an MVP or one workflow?", "Yes. A focused first version lets you validate a product or operational workflow before committing to a larger scope. We agree on what the first version must do and what can wait."],
  ["Do you work with US companies remotely?", "Yes. We serve the USA first and work internationally, including Canada, the Netherlands and Europe, Australia, New Zealand and the Gulf. Communication, review checkpoints and delivery responsibilities are agreed during scoping."],
  ["How are pricing and timelines decided?", "They depend on scope, integrations, data, design and operational requirements. Share the problem and any budget or deadline constraints so we can discuss an appropriate delivery plan."],
  ["What happens after launch?", "We agree on deployment, documentation, handover and any ongoing maintenance or support as part of the project scope. You can also ask about improving or repairing an existing application."],
];

export default function ConversionHome() {
  const call = getDiscoveryCallHref();
  return <div id="main-content" className={styles.page}>
    <section className={styles.hero} aria-labelledby="home-heading">
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.brandDot} /> AI. AUTOMATION. REAL-WORLD PRODUCTS.</p>
          <h1 id="home-heading">AI that works.<br /><span>Products that<br />move you forward.</span></h1>
          <p className={styles.heroDescription}>We build custom AI agents, automate repetitive work, and turn your idea into an AI-powered SaaS, web or mobile app.</p>
          <div className={styles.heroActions}><Link href="#start-project" className={styles.primaryButton}>Start my project<ArrowUpRight size={18} aria-hidden="true" /></Link><Link href="#work" className={styles.textLink}>Explore our work<ArrowRight size={17} aria-hidden="true" /></Link></div>
          <p className={styles.heroCall}>Prefer a conversation? <Link href={call}>Book a discovery call <ArrowUpRight size={14} aria-hidden="true" /></Link></p>
          <div className={styles.heroNotes}><span><Check size={15} aria-hidden="true" /> Clear scope before build</span><span><ShieldCheck size={16} aria-hidden="true" /> Human oversight for AI</span></div>
          <div className={styles.heroSignature}><span>STRATEGY → DESIGN → DEVELOPMENT → LAUNCH</span><p>Built around your business.<br /><strong>From the first question to the next release.</strong></p></div>
        </div>
        <div id="start-project" className={styles.heroEnquiry}><ProjectEnquiry /></div>
      </div>
      <div className={styles.marketStrip}><span className={styles.marketLabel}>REMOTE COLLABORATION. PRACTICAL DELIVERY.</span><p><strong>USA first.</strong> Canada · Netherlands & Europe · Australia · New Zealand · Gulf</p></div>
    </section>
    <section id="work" className={styles.section} aria-labelledby="work-heading">
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>SELECTED PROJECTS / 01</p><h2 id="work-heading">Ideas are good.<br /><span>Working products are better.</span></h2></div><Link href="/our-work" className={styles.textLink}>Explore project scopes<ArrowUpRight size={17} /></Link></div>
      <div className={styles.projectGrid}>{featuredWork.map((project, index) => <Link key={project.slug} href={`/our-work#${project.slug}`} className={`${styles.projectCard} ${index === 0 ? styles.featuredProject : ""}`}><div className={`${styles.projectVisual} ${styles[`projectVisual${index}`]}`}><div className={styles.projectMeta}><span>{project.category}</span><span>{project.number}</span></div><strong>{project.name}</strong><div className={styles.projectTags}>{project.focus.map((tag) => <span key={tag}>{tag}</span>)}</div><div className={styles.projectOrbit} aria-hidden="true" /></div><div className={styles.projectCopy}><span className={styles.projectIndex}>PROJECT OVERVIEW</span><h3>{project.title}</h3><p>{project.description}</p><span className={styles.projectCta}>See what was built<ArrowUpRight size={18} /></span></div></Link>)}</div>
    </section>
    <section className={styles.capabilities} aria-labelledby="services-heading"><div className={styles.section}>
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>WHAT WE DO / 02</p><h2 id="services-heading">One team.<br /><span>From intelligence to interface.</span></h2></div><p className={styles.sectionIntro}>Start with the business problem. We bring together the AI, automation, design and engineering it needs.</p></div>
      <div className={styles.serviceGrid}>{services.map((service) => <Link key={service.href} href={service.href} className={styles.serviceCard}><span className={styles.serviceTag}>{service.tag}</span><service.icon size={30} strokeWidth={1.4} aria-hidden="true" /><h3>{service.title}</h3><p>{service.description}</p><span className={styles.projectCta}>Explore service<ArrowUpRight size={17} /></span></Link>)}</div>
      <div className={styles.supporting}><p>And the expertise to keep it moving.</p><div><Link href="/services/website-development-design-services">Websites</Link><Link href="/services/mobile-app-development-services">Mobile apps</Link><Link href="/services/software-architecture-diagram-documentation-services">Solution architecture</Link><Link href="/services/ui-ux-design-product-design-services">UI / UX</Link><Link href="/services/cicd-pipeline-devops-automation-services">Deployments</Link><Link href="/services/manual-software-testing-qa-services">Testing & fixes</Link><Link href="/services">ML, design, SEO & more<ArrowUpRight size={14} /></Link></div></div>
    </div></section>
    <section className={styles.section} aria-labelledby="delivery-heading">
      <div className={styles.deliveryIntro}><div><p className={styles.eyebrow}>THE WAY WE WORK / 03</p><h2 id="delivery-heading">Big ambition.<br /><span>Clear next steps.</span></h2></div><div><p>You should know what’s being built, why it matters and what happens next. Our delivery starts with clarity and continues with work you can review.</p><Link href="/our-process" className={styles.textLink}>Meet our process<ArrowUpRight size={17} /></Link></div></div>
      <div className={styles.steps}>{steps.map(([number, title, text]) => <div key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
      <div className={styles.resourceNote}><p>Still exploring the idea?</p><div><Link href="/resources">Read the planning guides<ArrowUpRight size={15} /></Link><Link href="/tools/automation-roi">Estimate automation value<ArrowUpRight size={15} /></Link></div></div>
    </section>
    <section className={styles.ctaBand} aria-labelledby="next-heading"><div><p className={styles.eyebrow}>LET’S MAKE YOUR NEXT MOVE COUNT.</p><h2 id="next-heading">What could we<br />build for you?</h2><p>A new product. A connected workflow. A better version of what you already have.</p></div><div className={styles.ctaBandActions}><Link href="#start-project" className={styles.lightButton}>Tell us about your project<ArrowUpRight size={19} /></Link><Link href={call}>Or book a discovery call<ArrowUpRight size={16} /></Link><a href="mailto:info@devisgon.com">info@devisgon.com</a></div></section>
    <section className={`${styles.section} ${styles.faqSection}`} aria-labelledby="faq-heading"><div><p className={styles.eyebrow}>BEFORE WE TALK / 04</p><h2 id="faq-heading">Good questions.<br /><span>Clear answers.</span></h2><p>You don’t need a technical brief.<br />A business problem is a good start.</p></div><div className={styles.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
    <section id="about" className={`${styles.section} ${styles.companySection}`} aria-labelledby="company-heading"><div><p className={styles.eyebrow}>THE PEOPLE BEHIND THE PRODUCT</p><h2 id="company-heading">Technology is our craft.<br /><span>Your business is the focus.</span></h2><p>Devisgon brings AI, automation and software engineering together around practical business needs. We collaborate remotely, with the USA as our primary market, followed by Canada, the Netherlands and Europe, Australia, New Zealand, Qatar, Kuwait, Saudi Arabia and the UAE.</p></div><div className={styles.leadership}><Image src="/home_page/ceo_section/ceo.webp" alt="Zainab Abdullah, CEO of Devisgon" width={112} height={112} sizes="112px" /><div><h3>Zainab Abdullah</h3><span>CEO · Devisgon Pvt. Ltd.</span><p>Making technology practical for the businesses that use it.</p></div></div><div id="team" className={styles.teamNote}><p>Engineers, automation specialists and designers working toward a shared delivery plan.</p><Link href="/get-started" className={styles.textLink}>Careers at Devisgon<ArrowUpRight size={16} /></Link></div></section>
  </div>;
}
