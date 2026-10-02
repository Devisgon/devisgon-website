import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Bot, Workflow, Layers3, Code2, Check, Globe2, ShieldCheck } from "lucide-react";
import { getDiscoveryCallHref } from "@/lib/discovery-call";
import { featuredWork } from "@/data/featured-work";
import ProjectEnquiry from "./project_enquiry";
import styles from "./conversion_home.module.css";

const services = [
  { icon: Bot, title: "AI agents", description: "Assistants that use your approved knowledge and business tools, with human review where it matters.", href: "/services/ai-agent-development-automation-services", tag: "Knowledge → action" },
  { icon: Workflow, title: "Business automation", description: "Connect forms, CRM, documents and approvals into workflows your team can operate and maintain.", href: "/services/business-process-automation-services", tag: "Less repetitive work" },
  { icon: Layers3, title: "AI-powered apps", description: "Turn your idea into an AI-enabled SaaS, MVP, web or mobile product with a clear path to launch.", href: "/services/ai-software-development-automation-services", tag: "Idea → usable product" },
  { icon: Code2, title: "Web apps & websites", description: "Customer-facing websites and custom business platforms, built around the people who use them.", href: "/services/web-application-development-services", tag: "Built for your business" },
];
const steps = [
  ["01", "Understand the real problem", "We map your workflow, users, constraints and what success should look like."],
  ["02", "Agree on the scope", "You review the proposed approach, deliverables and tradeoffs before implementation."],
  ["03", "Build, review, refine", "Review working milestones and test real scenarios, including failure paths and exceptions."],
  ["04", "Launch with a handover", "Deployment, documentation and an agreed plan for ownership, maintenance and next steps."],
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
  return <main id="main-content" className={styles.page}>
    <section className={styles.hero} aria-labelledby="home-heading">
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span /> AI & AUTOMATION · BUILT FOR BUSINESS</p>
          <h1 id="home-heading">Build AI-powered products.<br /><span>Automate your business workflows.</span></h1>
          <p className={styles.heroDescription}>Custom AI agents, reliable automations, and AI-powered SaaS, web and mobile apps for founders and operations teams.</p>
          <div className={styles.heroActions}><Link href={call} className={styles.primaryButton}>Book a discovery call<ArrowUpRight size={18} aria-hidden="true" /></Link><Link href="#work" className={styles.secondaryButton}>See our work<ArrowRight size={18} aria-hidden="true" /></Link></div>
          <div className={styles.heroNotes}><span><Check size={14} /> Scope before build</span><span><Check size={14} /> Human review where it matters</span></div>
        </div>
        <div className={styles.workflowVisual} aria-label="Illustrative business workflow, from incoming request to approved action">
          <div className={styles.visualTop}><span className={styles.visualDot} /><span>FROM A MANUAL TASK TO A CONNECTED WORKFLOW</span><span className={styles.exampleBadge}>Example</span></div>
          <div className={styles.visualIntro}><Workflow size={24} /><p>Let your tools work together.</p><span>Built around your process</span></div>
          <div className={styles.workflowStep}><span className={styles.stepIcon}><Globe2 size={19} /></span><div><strong>Incoming request</strong><small>Email, form or business tool</small></div><span className={styles.stepNumber}>01</span></div>
          <div className={styles.connector} />
          <div className={`${styles.workflowStep} ${styles.aiStep}`}><span className={styles.stepIcon}><Bot size={19} /></span><div><strong>AI understands the context</strong><small>Classify · retrieve · prepare</small></div><span className={styles.stepNumber}>02</span></div>
          <div className={styles.connector} />
          <div className={styles.workflowStep}><span className={styles.stepIcon}><ShieldCheck size={19} /></span><div><strong>Review and take action</strong><small>Approved actions in your tools</small></div><span className={styles.stepNumber}>03</span></div>
          <div className={styles.visualBottom}><span>Clear rules. Connected systems. Human control.</span><ArrowUpRight size={16} /></div>
        </div>
      </div>
      <div className={styles.marketStrip}><p>Remote delivery for <strong>US founders & operations teams</strong></p><span>AI agents</span><span>Workflow automation</span><span>SaaS & MVPs</span><span>Web & mobile apps</span></div>
    </section>
    <section id="work" className={styles.section} aria-labelledby="work-heading">
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>SELECTED ENGINEERING WORK</p><h2 id="work-heading">From capability to working software.</h2></div><Link href="/our-work" className={styles.textLink}>Explore our work<ArrowUpRight size={17} /></Link></div>
      <p className={styles.sectionIntro}>A selection of AI product and agent engineering projects. See the scope behind the work.</p>
      <div className={styles.projectGrid}>{featuredWork.map((project, index) => <Link href={`/our-work#${project.slug}`} key={project.slug} className={styles.projectCard}><div className={`${styles.projectVisual} ${styles[`projectVisual${index}`]}`}><span>{project.category}</span><strong>{project.name}</strong><div className={styles.projectTags}>{project.focus.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className={styles.projectCopy}><span className={styles.projectIndex}>{project.number} / SELECTED WORK</span><h3>{project.title}</h3><p>{project.description}</p><span className={styles.projectCta}>View project scope<ArrowUpRight size={17} /></span></div></Link>)}</div>
    </section>
    <section className={`${styles.section} ${styles.capabilities}`} aria-labelledby="services-heading">
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>WHAT WE CAN BUILD TOGETHER</p><h2 id="services-heading">Start with your business need.</h2></div><Link href="/services" className={styles.textLink}>All services<ArrowUpRight size={17} /></Link></div>
      <div className={styles.serviceGrid}>{services.map((service) => <Link key={service.href} href={service.href} className={styles.serviceCard}><service.icon size={28} strokeWidth={1.6} /><span className={styles.serviceTag}>{service.tag}</span><h3>{service.title}</h3><p>{service.description}</p><span className={styles.projectCta}>Explore service<ArrowUpRight size={17} /></span></Link>)}</div>
      <div className={styles.supporting}><p>Also here for the work around the product.</p><div><Link href="/services/website-development-design-services">Website development</Link><Link href="/services/mobile-app-development-services">Mobile development</Link><Link href="/services/software-architecture-diagram-documentation-services">Architecture</Link><Link href="/services/ui-ux-design-product-design-services">UI/UX</Link><Link href="/services/cicd-pipeline-devops-automation-services">Deployments</Link><Link href="/services/manual-software-testing-qa-services">Testing & fixes</Link><Link href="/services">Design, ML, SEO & more<ArrowUpRight size={14} /></Link></div></div>
    </section>
    <section className={styles.section} aria-labelledby="delivery-heading">
      <div className={styles.deliveryIntro}><div><p className={styles.eyebrow}>HOW WE WORK</p><h2 id="delivery-heading">Clarity before code.<br />Progress you can review.</h2></div><div><p>A clear scope, working milestones and practical handover help you make informed decisions throughout the project.</p><Link href="/our-process" className={styles.textLink}>Our delivery process<ArrowUpRight size={17} /></Link></div></div>
      <div className={styles.steps}>{steps.map(([number, title, text]) => <div key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
      <div className={styles.resourceNote}><p>Still shaping the idea? Use our planning guides or estimate the value of automating a workflow.</p><div><Link href="/resources">Planning guides<ArrowUpRight size={15} /></Link><Link href="/tools/automation-roi">Automation calculator<ArrowUpRight size={15} /></Link></div></div>
    </section>
    <section className={`${styles.section} ${styles.faqSection}`} aria-labelledby="faq-heading"><div><p className={styles.eyebrow}>BEFORE WE TALK</p><h2 id="faq-heading">A few practical questions.</h2><p>No technical brief yet?<br />Start with the problem you want to solve.</p><Link href={call} className={styles.textLink}>Let’s discuss it<ArrowUpRight size={17} /></Link></div><div className={styles.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
    <section id="start-project" className={`${styles.section} ${styles.contactSection}`} aria-labelledby="project-heading"><div className={styles.contactCopy}><p className={styles.eyebrow}>LET’S BUILD SOMETHING USEFUL</p><h2 id="project-heading">Your next step<br />starts with a conversation.</h2><p>Tell us about your product, workflow or existing application. We’ll discuss the problem and the right next step.</p><Link href={call} className={styles.primaryButton}>Book a discovery call<ArrowUpRight size={18} /></Link><span className={styles.orEmail}>Prefer email? <a href="mailto:info@devisgon.com">info@devisgon.com</a></span></div><ProjectEnquiry /></section>
    <section id="about" className={`${styles.section} ${styles.companySection}`} aria-labelledby="company-heading"><div><p className={styles.eyebrow}>THE PEOPLE BEHIND THE WORK</p><h2 id="company-heading">Practical technology.<br />Thoughtful delivery.</h2><p>Devisgon brings AI, automation and software engineering together around business needs. We work remotely with clients in the USA, Canada, the Netherlands and Europe, Australia, New Zealand, Qatar, Kuwait, Saudi Arabia and the UAE.</p></div><div className={styles.leadership}><Image src="/home_page/ceo_section/ceo.webp" alt="Zainab Abdullah, CEO of Devisgon" width={112} height={112} sizes="112px" /><div><h3>Zainab Abdullah</h3><span>CEO · Devisgon Pvt. Ltd.</span><p>Our focus is making technology practical for the businesses that use it.</p></div></div><div id="team" className={styles.teamNote}><p>Software engineers, automation specialists and designers working toward a shared delivery plan.</p><Link href="/get-started" className={styles.textLink}>Careers at Devisgon<ArrowUpRight size={16} /></Link></div></section>
  </main>;
}
