"use client";

import { ArrowUpRight, Mail, Phone, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import FooterNewsletterForm from "@/components/footer_newsletter_form";
import { getFooterDataByLang, getNavbarDataByLang, normalizeLanguage } from "@/lib/localized-content";
import { buildNavigation, type NavigationItem } from "@/lib/navigation-model";
import { getDiscoveryCallHref } from "@/lib/discovery-call";
import { servicePriority } from "@/lib/service-priorities";
import { ANALYTICS_PREFERENCES_EVENT } from "@/lib/analytics-config";
import styles from "./footer.module.css";

const copy: Record<string, { eyebrow: string; headline: string; call: string; resources: string; work: string; promise: string; directory: string }> = {
  en: { eyebrow: "YOUR NEXT CHAPTER STARTS WITH A CONVERSATION.", headline: "Let’s build something useful.", call: "Book a discovery call", resources: "Resources", work: "Our work", promise: "AI agents, automations and software built around your business.", directory: "Explore our expertise" },
  ur: { eyebrow: "اگلا قدم ایک گفتگو سے شروع ہوتا ہے۔", headline: "آئیں کچھ مفید بنائیں۔", call: "کال بک کریں", resources: "وسائل", work: "ہمارا کام", promise: "آپ کے کاروبار کے لیے اے آئی، آٹومیشن اور سافٹ ویئر۔", directory: "ہماری مہارت دیکھیں" },
  ar: { eyebrow: "خطوتك التالية تبدأ بمحادثة.", headline: "لنبنِ شيئًا مفيدًا معًا.", call: "احجز مكالمة", resources: "الموارد", work: "أعمالنا", promise: "وكلاء الذكاء الاصطناعي والأتمتة والبرمجيات لأعمالك.", directory: "استكشف خبراتنا" },
  fr: { eyebrow: "VOTRE PROCHAINE ÉTAPE COMMENCE PAR UNE CONVERSATION.", headline: "Créons quelque chose d’utile.", call: "Réserver un appel", resources: "Ressources", work: "Nos projets", promise: "Agents IA, automatisations et logiciels pour votre activité.", directory: "Explorer nos expertises" },
  de: { eyebrow: "IHR NÄCHSTER SCHRITT BEGINNT MIT EINEM GESPRÄCH.", headline: "Lassen Sie uns etwas Nützliches bauen.", call: "Gespräch buchen", resources: "Ressourcen", work: "Unsere Projekte", promise: "KI-Agenten, Automatisierung und Software für Ihr Unternehmen.", directory: "Unsere Kompetenzen entdecken" },
  es: { eyebrow: "TU PRÓXIMO PASO EMPIEZA CON UNA CONVERSACIÓN.", headline: "Construyamos algo útil.", call: "Reservar llamada", resources: "Recursos", work: "Nuestros proyectos", promise: "Agentes de IA, automatizaciones y software para tu negocio.", directory: "Explora nuestra experiencia" },
  zh: { eyebrow: "下一步，从一次交流开始。", headline: "一起打造实用的产品。", call: "预约沟通", resources: "资源", work: "我们的项目", promise: "围绕您的业务构建 AI 智能体、自动化和软件。", directory: "探索我们的专业服务" },
};
function unique(items: NavigationItem[]) { return items.filter((item,index) => items.findIndex((other) => other.href === item.href) === index); }
function FooterLinks({ items }: { items: NavigationItem[] }) {
  return <ul className={styles.links}>{items.map((item) => <li key={item.href}><Link href={item.href === "#about" ? "/#about" : item.href}>{item.name}</Link></li>)}</ul>;
}
export default function Footer() {
  const [language, setLanguage] = useState("en");
  useEffect(() => {
    function sync() {
      const cookie = document.cookie.split(";").map((value) => value.trim()).find((value) => value.startsWith("lang="));
      try { setLanguage(normalizeLanguage(cookie ? decodeURIComponent(cookie.slice(5)) : "en")); } catch { setLanguage("en"); }
    }
    sync(); window.addEventListener("app-language-change",sync);
    return () => window.removeEventListener("app-language-change",sync);
  }, []);
  const data = getFooterDataByLang(language);
  const navigation = getNavbarDataByLang(language).navbar;
  const model = buildNavigation(navigation);
  const processLink = navigation.find((item) => item.href === "/our-process");
  const text = copy[language] ?? copy.en;
  const company = data.columns[0];
  const help = data.columns[1];
  const newsletter = data.columns[2];
  const legal = help.links.filter((item) => /privacy|terms/.test(item.href));
  const companyLinks = unique([...model.company, ...(processLink ? [processLink] : []), ...company.links, ...help.links.filter((item) => !/privacy|terms/.test(item.href))].map((item) => ({ ...item, href: item.href === "#about" ? "/#about" : item.href })));
  const priorities = model.catalogs[0].groups.flatMap((group) => group.links).sort((a,b) => servicePriority(a.href)-servicePriority(b.href)).slice(0,5);
  return <footer className={styles.footer} dir={language === "ar" || language === "ur" ? "rtl" : "ltr"}>
    <div className={styles.inner}>
      <div className={styles.invitation}><div><p>{text.eyebrow}</p><h2>{text.headline}</h2></div><Link href={getDiscoveryCallHref()} className={styles.call}>{text.call}<ArrowUpRight size={18} /></Link></div>
      <div className={styles.mainGrid}>
        <div className={styles.brand}><Link href="/" aria-label="Devisgon home"><Image src="/logo/dark_logo.webp" alt="Devisgon" width={240} height={80} sizes="200px" /></Link><p>{text.promise}</p><a href="mailto:info@devisgon.com"><Mail size={15} />info@devisgon.com</a><a href="tel:+923316944411"><Phone size={15} />+92 331 6944411</a><div className={styles.priorityLinks}>{priorities.map((item) => <Link key={item.href} href={item.href}>{item.name}</Link>)}</div></div>
        <div><h3>{company.title}</h3><FooterLinks items={companyLinks} /></div>
        <div><h3>{text.resources}</h3><FooterLinks items={unique([{ name: text.work, href: "/our-work" }, ...model.resources, { name: "Automation ROI", href: "/tools/automation-roi" }])} /><h3 className={styles.partnerTitle}>{model.partnerHeading}</h3><FooterLinks items={model.partners} /></div>
        <div className={styles.newsletter}><h3>{newsletter.title}</h3><FooterNewsletterForm lang={language} /></div>
      </div>
      <div className={styles.directory}><p>{text.directory}</p><div className={styles.directoryGrid}>{model.catalogs.map((catalog) => <details key={catalog.id}><summary>{catalog.name}<span aria-hidden="true">+</span></summary><Link className={styles.viewAll} href={catalog.href}>{catalog.name}<ArrowUpRight size={13} /></Link>{catalog.groups.map((group) => <div key={group.title} className={styles.catalogGroup}><h4>{group.title}</h4><FooterLinks items={group.links} /></div>)}</details>)}</div></div>
      <div className={styles.legal}><p>© {new Date().getFullYear()} Devisgon Pvt. Ltd.</p><div>{legal.map((item) => <span key={item.href} className={styles.legalItem}><Link href={item.href}>{item.name}</Link>{/privacy/.test(item.href) && <button type="button" className={styles.preferencesButton} aria-label="Analytics preferences" title="Analytics preferences" aria-controls="analytics-preferences-panel" onClick={() => window.dispatchEvent(new window.Event(ANALYTICS_PREFERENCES_EVENT))}><SlidersHorizontal size={15} aria-hidden="true" /></button>}</span>)}</div></div>
    </div>
  </footer>;
}
