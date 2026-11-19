import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Bot, Workflow, Layers3, Code2, Plus } from "lucide-react";
import { getDiscoveryCallHref } from "@/lib/discovery-call";
import { featuredWork } from "@/data/featured-work";
import ProjectEnquiry from "./project_enquiry";
import ProjectEnquiryCta from "./project_enquiry_cta";
import FlowRoute from "./flow_route";
import { Suspense, type ReactNode } from "react";
import flow from "./flow.module.css";
import ProjectShowcase from "./project_showcase";
import SignalRibbon from "./signal_ribbon";
import HomepageEngagement from "./homepage_engagement";
import styles from "./conversion_home.module.css";
import { conversionHomeUi } from "@/data/conversion-home-ui";
import { localizeContentTree } from "@/lib/content-language";

type HomeCopy = {
  hero_section: { pre_title: string; main_title: string; sub_main_title: string; title: string; description: string; cta_button: { text: string } };
  blog_section: { header_title: string };
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
export default async function ConversionHome({ lang, homeCopy, children }: { lang: string; homeCopy: HomeCopy; children?: ReactNode }) {
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
  const experienceCopy = {
    opening: "Put work", accent: "in motion.", capabilityLink: "Explore the capability",
    description: "We build AI agents, connect the tools your team already uses, and turn the way you work into software.",
    scroll: "Meet the work behind the words", projects: "Selected work", capabilities: "What we build", process: "How it comes together",
    instruction: "Open a step to see what happens.",
  };
  const [experience, deliverySteps] = await Promise.all([
    localizeContentTree(experienceCopy, lang),
    localizeContentTree(steps.map(([number, title, description]) => ({ number, title, description })), lang),
  ]);
  return <div id="main-content" className={`${styles.page} ${flow.journey}`}>
    <HomepageEngagement />
    <FlowRoute label={experience.scroll} stages={[
      { id: "opening", label: homeCopy.hero_section.cta_button.text },
      { id: "work", label: experience.projects },
      { id: "capabilities", label: experience.capabilities },
      { id: "delivery", label: experience.process },
      { id: "questions", label: ui.faqEyebrow },
      { id: "about", label: ui.teamLink },
      { id: "journal", label: homeCopy.blog_section.header_title },
      { id: "next", label: ui.tellUs },
    ]} />
    <section data-flow-stop id="opening" className={styles.hero} aria-labelledby="home-heading">

      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.brandDot} /> {homeCopy.hero_section.pre_title}</p>
          <h1 id="home-heading">{experience.opening}<br /><span>{experience.accent}</span></h1>
          <p className={styles.heroDescription}>{experience.description}</p>
          <div className={styles.heroActions}><ProjectEnquiryCta label={homeCopy.hero_section.cta_button.text} /><Link href="#work" className={styles.textLink}>{localized ? homeCopy.services_section.header_title : "Explore our work"}<ArrowRight size={17} aria-hidden="true" /></Link></div>
          <div className={flow.sculpture} aria-hidden="true">
            <Image priority unoptimized style={{ filter: "url(#devisgon-woven-tone)" }} src="/home_page/flow/woven-signal.webp" width={1079} height={900} alt="" />
          </div>
        </div>
        <div id="start-project" className={styles.heroEnquiry}><ProjectEnquiry lang={lang} /></div>
      </div>
      <div className={styles.marketStrip}><span className={styles.marketLabel}>{localized ? homeCopy.hero_section.sub_main_title : "REMOTE COLLABORATION. PRACTICAL DELIVERY."}</span><p><strong>{localized ? homeCopy.expert_services_section.core_info_cards[0]?.title : "USA first."}</strong> Canada · Netherlands & Europe · Australia · New Zealand · Gulf</p></div>
    </section>
    <section data-flow-stop id="work" className={styles.section} aria-labelledby="work-heading">
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>{ui.workEyebrow} / 01</p><h2 id="work-heading" data-home-section="work">{ui.workTitle}<br /><span>{ui.workTitleAccent}</span></h2></div><Link href="/our-work" className={styles.textLink}>{ui.workLink}<ArrowUpRight size={17} /></Link></div>
      <ProjectShowcase names={localizedWork.map(project => project.name)} label={experience.projects} routes={localizedWork.map(project => {
        const capability = project.slug === "memyselfi-ai" ? 2 : project.slug === "taskera-ai" ? 1 : 0;
        return { href: `#capability-${capability}`, label: `${experience.capabilityLink} · ${localizedServices[capability].title}` };
      })}>{localizedWork.map((project, index) => <Link key={project.slug} href={`/our-work/${project.slug}`} className={`${styles.projectCard} ${styles.featuredProject}`}><div className={`${styles.projectVisual} ${styles[`projectVisual${index}`]}`}>{project.heroImageSrc ? <><Image src={project.heroImageSrc} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className={styles.projectHeroImage} /><div className={styles.projectHeroOverlay} aria-hidden="true" /><div className={styles.projectMeta}><span>{project.category}</span><span>{project.number}</span></div>{project.logoIconSrc && <><Image src={project.logoIconSrc} alt="" width={44} height={36} className={`${styles.projectHeroMark} rounded-md bg-white p-1 dark:hidden`} /><Image src={project.logoIconDarkSrc} alt="" width={44} height={36} className={`${styles.projectHeroMark} hidden rounded-md bg-[#101010] p-1 dark:block`} /></>}</> : <><div className={styles.projectMeta}><span>{project.category}</span><span>{project.number}</span></div><strong>{project.name}</strong><div className={styles.projectTags}>{project.focus.map((tag) => <span key={tag}>{tag}</span>)}</div><div className={styles.projectArtwork} aria-hidden="true"><SignalRibbon variant={index} /></div></>}</div><div className={styles.projectCopy}><span className={styles.projectIndex}>{ui.projectOverview}</span>{project.logoSrc && <><Image src={project.logoSrc} alt={`${project.name} logo`} width={214} height={36} className={`${styles.projectBrandLogo} ${styles.projectBrandLogoLight}`} /><Image src={project.logoDarkSrc} alt={`${project.name} logo`} width={214} height={36} className={`${styles.projectBrandLogo} ${styles.projectBrandLogoDark}`} /></>}<h3>{project.title}</h3><p>{project.description}</p><span className={styles.projectCta}>{ui.projectLink}<ArrowUpRight size={18} /></span></div></Link>)}</ProjectShowcase>
    </section>
    <section data-flow-stop id="capabilities" className={styles.capabilities} aria-labelledby="services-heading"><div className={styles.section}>
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>{ui.capabilityEyebrow} / 02</p><h2 id="services-heading" data-home-section="services">{ui.capabilityTitle}<br /><span>{ui.capabilityAccent}</span></h2></div><p className={styles.sectionIntro}>{ui.capabilityIntro}</p></div>
      <div className={styles.serviceGrid}>{localizedServices.map((service, index) => <Link id={`capability-${index}`} key={service.href} href={service.href} className={styles.serviceCard}><span className={styles.serviceTag}>{service.tag}</span><service.icon size={40} strokeWidth={1.25} aria-hidden="true" /><h3>{service.title}</h3><p>{service.description}</p><span className={styles.projectCta}>{ui.explore}<ArrowUpRight size={17} /></span></Link>)}</div>
      <div className={styles.supporting}><p>{supporting.title}</p><div><Link href="/services/website-development-design-services">{supporting.websites}</Link><Link href="/services/mobile-app-development-services">{supporting.mobile}</Link><Link href="/services/software-architecture-diagram-documentation-services">{supporting.architecture}</Link><Link href="/services/ui-ux-design-product-design-services">{supporting.design}</Link><Link href="/services/cicd-pipeline-devops-automation-services">{supporting.deployment}</Link><Link href="/services/manual-software-testing-qa-services">{supporting.testing}</Link><Link href="/services">{supporting.more}<ArrowUpRight size={14} /></Link></div></div><div className={styles.specialists}><span>{supporting.focused}</span><Link href="/services/voice-agent-development-services">{supporting.voice}<ArrowUpRight size={15} /></Link><Link href="/services/invoice-automation-services">{supporting.invoices}<ArrowUpRight size={15} /></Link><Link href="/services/ai-receptionist-services">{supporting.receptionist}<ArrowUpRight size={15} /></Link></div>
    </div></section>
    <section data-flow-stop id="delivery" className={`${styles.section} ${styles.deliverySection}`} aria-labelledby="delivery-heading">
      <div className={styles.deliveryIntro}><div><p className={styles.eyebrow}>{ui.deliveryEyebrow} / 03</p><h2 id="delivery-heading" data-home-section="process">{ui.deliveryTitle}<br /><span>{ui.deliveryAccent}</span></h2></div><div><p>{ui.deliveryCopy}</p><Link href="/our-process" className={styles.textLink}>{ui.meetProcess}<ArrowUpRight size={17} /></Link></div></div>
      <p className={styles.stepHint}>{experience.instruction}</p>
      <div className={styles.steps}>{deliverySteps.map((step, index) => <details key={step.number} open={index === 0}><summary><span>{step.number}</span><h3>{localized ? homeCopy.working_process.stepsData[index]?.title ?? step.title : step.title}</h3><Plus size={20} aria-hidden="true" /></summary><p>{step.description}</p></details>)}</div>
      <div className={styles.resourceNote}><p>{ui.resources}</p><div><Link href="/resources">{ui.guides}<ArrowUpRight size={15} /></Link><Link href="/tools/automation-roi">{ui.calculator}<ArrowUpRight size={15} /></Link></div></div>
    </section>

    <section data-flow-stop id="questions" className={`${styles.section} ${styles.faqSection}`} aria-labelledby="faq-heading"><div><p className={styles.eyebrow}>{ui.faqEyebrow} / 04</p><h2 id="faq-heading">{ui.faqTitle}<br /><span>{ui.faqAccent}</span></h2><p>{ui.faqIntro}</p></div><div className={styles.faqList}>{ui.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
    <section data-flow-stop id="about" className={`${styles.section} ${styles.companySection}`} aria-labelledby="company-heading"><div><p className={styles.eyebrow}>{ui.companyEyebrow}</p><h2 id="company-heading">{ui.companyTitle}<br /><span>{ui.companyAccent}</span></h2><p>{ui.companyCopy}</p></div><div className={styles.leadership}><Image src="/home_page/ceo_section/ceo.png" alt={`${homeCopy.ceo_message_section.author}, ${homeCopy.ceo_message_section.role}`} width={112} height={112} sizes="112px" /><div><h3>{homeCopy.ceo_message_section.author}</h3><span>{homeCopy.ceo_message_section.role}</span><p>{ui.teamCopy}</p></div></div><div id="team" className={styles.teamNote}><Link href="/team" className={styles.textLink}>{ui.teamLink}<ArrowUpRight size={16} /></Link></div></section>
    <div id="journal" className={flow.journal} data-flow-stop><Suspense fallback={null}>{children}</Suspense></div>
    <section data-flow-stop id="next" className={styles.ctaBand} aria-labelledby="next-heading"><div className={flow.returnArt} aria-hidden="true"><Image unoptimized style={{ filter: "url(#devisgon-woven-tone)" }} src="/home_page/flow/woven-signal.webp" width={1079} height={900} alt="" /></div><div><p className={styles.eyebrow}>{ui.ctaEyebrow}</p><h2 id="next-heading">{ui.ctaTitle}<br />{ui.ctaAccent}</h2><p>{ui.ctaCopy}</p></div><div className={styles.ctaBandActions}><Link href="#start-project" className={styles.lightButton}>{ui.tellUs}<ArrowUpRight size={19} /></Link><Link href={call}>{ui.callInstead}<ArrowUpRight size={16} /></Link><a href="mailto:info@devisgon.com">info@devisgon.com</a></div></section>
  </div>;
}
