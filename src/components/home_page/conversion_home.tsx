import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Bot, Workflow, Layers3, Code2, Check, ShieldCheck } from "lucide-react";
import { getDiscoveryCallHref } from "@/lib/discovery-call";
import { featuredWork } from "@/data/featured-work";
import ProjectEnquiry from "./project_enquiry";
import styles from "./conversion_home.module.css";
import { conversionHomeUi } from "@/data/conversion-home-ui";
import { localizeContentTree } from "@/lib/content-language";

type HomeCopy = {
  hero_section: { pre_title: string; main_title: string; sub_main_title: string; title: string; description: string; cta_button: { text: string } };
  services_section: { header_title: string; main_title: string; services_list: { title: string }[] };
  expert_services_section: { main_heading: string; core_info_cards: { title: string; content: string }[] };
  working_process: { section_heading: string; main_heading: string; span_heading: string; stepsData: { id: number; title: string }[] };
  ceo_message_section: { title: string; quote: string; author: string; role: string };
};

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
export default async function ConversionHome({ lang, homeCopy }: { lang: string; homeCopy: HomeCopy }) {
  const call = getDiscoveryCallHref();
  const localized = lang !== "en";
  const ui = conversionHomeUi[lang] ?? conversionHomeUi.en;
  const localizedServices = lang === "en" ? services : await Promise.all(services.map(async (service) => ({
    ...service,
    ...await localizeContentTree({ title: service.title, description: service.description, tag: service.tag }, lang),
  })));
  const localizedWork = lang === "en" ? featuredWork : await Promise.all(featuredWork.map(async (project) => ({
    ...project,
    ...await localizeContentTree({ category: project.category, title: project.title, description: project.description, focus: project.focus, detail: project.detail }, lang),
  })));
  const supportingCopy = { title: "And the expertise to keep it moving.", more: "ML, design, SEO & more", focused: "Focused solutions", websites: "Websites", mobile: "Mobile apps", architecture: "Solution architecture", design: "UI / UX", deployment: "Deployments", testing: "Testing & fixes", voice: "Voice agents", invoices: "Invoice automation", receptionist: "AI receptionist" };
  const supporting = lang === "en" ? supportingCopy : await localizeContentTree(supportingCopy, lang);
  return <div id="main-content" className={styles.page}>
    <section className={styles.hero} aria-labelledby="home-heading">
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.brandDot} /> {homeCopy.hero_section.pre_title}</p>
          <h1 id="home-heading">{homeCopy.hero_section.main_title}<br /><span>{homeCopy.hero_section.title}</span></h1>
          <p className={styles.heroDescription}>{ui.heroDescription}</p>
          <div className={styles.heroActions}><Link href="#start-project" className={styles.primaryButton}>{homeCopy.hero_section.cta_button.text}<ArrowUpRight size={18} aria-hidden="true" /></Link><Link href="#work" className={styles.textLink}>{localized ? homeCopy.services_section.header_title : "Explore our work"}<ArrowRight size={17} aria-hidden="true" /></Link></div>
          <p className={styles.heroCall}>{ui.heroCall} <Link href={call}>{ui.discovery} <ArrowUpRight size={14} aria-hidden="true" /></Link></p>
          <div className={styles.heroNotes}><span><Check size={15} aria-hidden="true" /> {ui.scope}</span><span><ShieldCheck size={16} aria-hidden="true" /> {ui.oversight}</span></div>
          {!localized && <div className={styles.heroSignature}><span>STRATEGY → DESIGN → DEVELOPMENT → LAUNCH</span><p>Built around your business.<br /><strong>From the first question to the next release.</strong></p></div>}
        </div>
        <div id="start-project" className={styles.heroEnquiry}><ProjectEnquiry lang={lang} /></div>
      </div>
      <div className={styles.marketStrip}><span className={styles.marketLabel}>{localized ? homeCopy.hero_section.sub_main_title : "REMOTE COLLABORATION. PRACTICAL DELIVERY."}</span><p><strong>{localized ? homeCopy.expert_services_section.core_info_cards[0]?.title : "USA first."}</strong> Canada · Netherlands & Europe · Australia · New Zealand · Gulf</p></div>
    </section>
    <section id="work" className={styles.section} aria-labelledby="work-heading">
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>{ui.workEyebrow} / 01</p><h2 id="work-heading">{ui.workTitle}<br /><span>{ui.workTitleAccent}</span></h2></div><Link href="/our-work" className={styles.textLink}>{ui.workLink}<ArrowUpRight size={17} /></Link></div>
      <div className={styles.projectGrid}>{localizedWork.map((project, index) => <Link key={project.slug} href={`/our-work/${project.slug}`} className={`${styles.projectCard} ${index === 0 ? styles.featuredProject : ""}`}><div className={`${styles.projectVisual} ${styles[`projectVisual${index}`]}`}>{project.heroImageSrc ? <><Image src={project.heroImageSrc} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className={styles.projectHeroImage} /><div className={styles.projectHeroOverlay} aria-hidden="true" /><div className={styles.projectMeta}><span>{project.category}</span><span>{project.number}</span></div>{project.logoIconSrc && <><Image src={project.logoIconSrc} alt="" width={44} height={36} className={`${styles.projectHeroMark} rounded-md bg-white p-1 dark:hidden`} /><Image src={project.logoIconDarkSrc} alt="" width={44} height={36} className={`${styles.projectHeroMark} hidden rounded-md bg-[#101010] p-1 dark:block`} /></>}</> : <><div className={styles.projectMeta}><span>{project.category}</span><span>{project.number}</span></div><strong>{project.name}</strong><div className={styles.projectTags}>{project.focus.map((tag) => <span key={tag}>{tag}</span>)}</div><div className={styles.projectOrbit} aria-hidden="true" /></>}</div><div className={styles.projectCopy}><span className={styles.projectIndex}>{ui.projectOverview}</span>{project.logoSrc && <><Image src={project.logoSrc} alt={`${project.name} logo`} width={214} height={36} className={`${styles.projectBrandLogo} ${styles.projectBrandLogoLight}`} /><Image src={project.logoDarkSrc} alt={`${project.name} logo`} width={214} height={36} className={`${styles.projectBrandLogo} ${styles.projectBrandLogoDark}`} /></>}<h3>{project.title}</h3><p>{project.description}</p><span className={styles.projectCta}>{ui.projectLink}<ArrowUpRight size={18} /></span></div></Link>)}</div>
    </section>
    <section className={styles.capabilities} aria-labelledby="services-heading"><div className={styles.section}>
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>{ui.capabilityEyebrow} / 02</p><h2 id="services-heading">{ui.capabilityTitle}<br /><span>{ui.capabilityAccent}</span></h2></div><p className={styles.sectionIntro}>{ui.capabilityIntro}</p></div>
      <div className={styles.serviceGrid}>{localizedServices.map((service) => <Link key={service.href} href={service.href} className={styles.serviceCard}><span className={styles.serviceTag}>{service.tag}</span><service.icon size={30} strokeWidth={1.4} aria-hidden="true" /><h3>{service.title}</h3><p>{service.description}</p><span className={styles.projectCta}>{ui.explore}<ArrowUpRight size={17} /></span></Link>)}</div>
      <div className={styles.supporting}><p>{supporting.title}</p><div><Link href="/services/website-development-design-services">{supporting.websites}</Link><Link href="/services/mobile-app-development-services">{supporting.mobile}</Link><Link href="/services/software-architecture-diagram-documentation-services">{supporting.architecture}</Link><Link href="/services/ui-ux-design-product-design-services">{supporting.design}</Link><Link href="/services/cicd-pipeline-devops-automation-services">{supporting.deployment}</Link><Link href="/services/manual-software-testing-qa-services">{supporting.testing}</Link><Link href="/services">{supporting.more}<ArrowUpRight size={14} /></Link></div></div><div className={styles.specialists}><span>{supporting.focused}</span><Link href="/services/voice-agent-development-services">{supporting.voice}<ArrowUpRight size={15} /></Link><Link href="/services/invoice-automation-services">{supporting.invoices}<ArrowUpRight size={15} /></Link><Link href="/services/ai-receptionist-services">{supporting.receptionist}<ArrowUpRight size={15} /></Link></div>
    </div></section>
    <section className={styles.section} aria-labelledby="delivery-heading">
      <div className={styles.deliveryIntro}><div><p className={styles.eyebrow}>{ui.deliveryEyebrow} / 03</p><h2 id="delivery-heading">{ui.deliveryTitle}<br /><span>{ui.deliveryAccent}</span></h2></div><div><p>{ui.deliveryCopy}</p><Link href="/our-process" className={styles.textLink}>{ui.meetProcess}<ArrowUpRight size={17} /></Link></div></div>
      <div className={styles.steps}>{(localized ? homeCopy.working_process.stepsData : steps.map(([number, title]) => ({ id: Number(number), title }))).map(({ id, title }) => <div key={id}><span>{String(id).padStart(2, "0")}</span><h3>{title}</h3></div>)}</div>
      <div className={styles.resourceNote}><p>{ui.resources}</p><div><Link href="/resources">{ui.guides}<ArrowUpRight size={15} /></Link><Link href="/tools/automation-roi">{ui.calculator}<ArrowUpRight size={15} /></Link></div></div>
    </section>
    <section className={styles.ctaBand} aria-labelledby="next-heading"><div><p className={styles.eyebrow}>{ui.ctaEyebrow}</p><h2 id="next-heading">{ui.ctaTitle}<br />{ui.ctaAccent}</h2><p>{ui.ctaCopy}</p></div><div className={styles.ctaBandActions}><Link href="#start-project" className={styles.lightButton}>{ui.tellUs}<ArrowUpRight size={19} /></Link><Link href={call}>{ui.callInstead}<ArrowUpRight size={16} /></Link><a href="mailto:info@devisgon.com">info@devisgon.com</a></div></section>
    <section className={`${styles.section} ${styles.faqSection}`} aria-labelledby="faq-heading"><div><p className={styles.eyebrow}>{ui.faqEyebrow} / 04</p><h2 id="faq-heading">{ui.faqTitle}<br /><span>{ui.faqAccent}</span></h2><p>{ui.faqIntro}</p></div><div className={styles.faqList}>{ui.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
    <section id="about" className={`${styles.section} ${styles.companySection}`} aria-labelledby="company-heading"><div><p className={styles.eyebrow}>{ui.companyEyebrow}</p><h2 id="company-heading">{ui.companyTitle}<br /><span>{ui.companyAccent}</span></h2><p>{ui.companyCopy}</p></div><div className={styles.leadership}><Image src="/home_page/ceo_section/ceo.png" alt={`${homeCopy.ceo_message_section.author}, ${homeCopy.ceo_message_section.role}`} width={112} height={112} sizes="112px" /><div><h3>{homeCopy.ceo_message_section.author}</h3><span>{homeCopy.ceo_message_section.role}</span><p>{ui.companyCopy}</p></div></div><div id="team" className={styles.teamNote}><p>{ui.teamCopy}</p><Link href="/team" className={styles.textLink}>{ui.teamLink}<ArrowUpRight size={16} /></Link></div></section>
  </div>;
}
