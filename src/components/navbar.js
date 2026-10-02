"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Menu, X, Moon, Sun, ChevronDown, ArrowUpRight, Search } from "lucide-react";
import { getNavbarDataByLang, normalizeLanguage } from "@/lib/localized-content";
import { buildNavigation } from "@/lib/navigation-model";
import { getDiscoveryCallHref } from "@/lib/discovery-call";
import styles from "./navbar.module.css";

const Switcher = dynamic(() => import("./language_switch_component"), { ssr: false, loading: () => <span className={styles.switcherPlaceholder} /> });
const labels = {
  en: ["Services", "Our work", "How we work", "Resources", "Company", "Book a call", "Explore all", "Search links", "Close navigation"],
  ur: ["خدمات", "ہمارا کام", "ہمارا طریقہ", "وسائل", "کمپنی", "کال بک کریں", "سب دیکھیں", "لنکس تلاش کریں", "نیویگیشن بند کریں"],
  ar: ["الخدمات", "أعمالنا", "كيف نعمل", "الموارد", "الشركة", "احجز مكالمة", "استكشف الكل", "ابحث عن الروابط", "إغلاق التنقل"],
  fr: ["Services", "Nos projets", "Notre méthode", "Ressources", "Entreprise", "Réserver un appel", "Tout explorer", "Rechercher des liens", "Fermer la navigation"],
  de: ["Leistungen", "Projekte", "Unser Prozess", "Ressourcen", "Unternehmen", "Gespräch buchen", "Alle ansehen", "Links suchen", "Navigation schließen"],
  es: ["Servicios", "Proyectos", "Cómo trabajamos", "Recursos", "Empresa", "Reservar llamada", "Explorar todo", "Buscar enlaces", "Cerrar navegación"],
  zh: ["服务", "我们的项目", "工作流程", "资源", "公司", "预约通话", "查看全部", "搜索链接", "关闭导航"],
};
const descriptions = {
  "/services/ai-agent-development-automation-services": "Business tools, knowledge and actions",
  "/services/business-process-automation-services": "Connected workflows and approvals",
  "/services/ai-powered-business-automation-services": "Classification, extraction and drafting",
  "/services/ai-software-development-automation-services": "AI-powered SaaS, web and mobile apps",
  "/services/mvp-development-startup-services": "Validate and launch your first product",
  "/services/web-application-development-services": "Custom platforms for your business",
};

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const [open, setOpen] = useState(null);
  const [catalogId, setCatalogId] = useState("services");
  const [groupIndex, setGroupIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const pathname = usePathname();
  const model = buildNavigation(getNavbarDataByLang(currentLang).navbar);
  const copy = labels[currentLang] ?? labels.en;
  const catalog = model.catalogs.find((item) => item.id === catalogId) ?? model.catalogs[0];
  const group = catalog.groups[groupIndex] ?? catalog.groups[0];
  const links = query.trim() ? catalog.groups.flatMap((item) => item.links).filter((item) => item.name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())) : group?.links ?? [];
  const callHref = getDiscoveryCallHref();

  useEffect(() => {
    const match = document.cookie.split(";").map((value) => value.trim()).find((value) => value.startsWith("lang="));
    try { setCurrentLang(normalizeLanguage(match ? decodeURIComponent(match.slice(5)) : "en")); } catch { setCurrentLang("en"); }
    try {
      if (window.sessionStorage.getItem("theme-session") !== "active") {
        window.localStorage.removeItem("theme");
        window.sessionStorage.setItem("theme-session", "active");
      }
      const dark = window.localStorage.getItem("theme") === "dark";
      document.documentElement.classList.toggle("dark", dark);
      setIsDark(dark);
    } catch { setIsDark(document.documentElement.classList.contains("dark")); }
  }, []);

  useEffect(() => { setOpen(null); setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    const outside = (event) => { if (!headerRef.current?.contains(event.target)) setOpen(null); };
    const escape = (event) => {
      if (event.key === "Escape" && open) { setOpen(null); triggerRef.current?.focus(); }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [open]);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (mobileOpen && !dialog?.open) dialog?.showModal();
    if (!mobileOpen && dialog?.open) dialog?.close();
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const media = window.matchMedia("(min-width: 1100px)");
    const resize = () => { if (media.matches) setMobileOpen(false); };
    media.addEventListener("change", resize);
    return () => { document.body.style.overflow = previous; media.removeEventListener("change", resize); };
  }, [mobileOpen]);

  function toggleTheme() {
    document.documentElement.classList.toggle("dark", !isDark);
    try { window.localStorage.setItem("theme", isDark ? "light" : "dark"); } catch { /* Page-only choice. */ }
    setIsDark(!isDark);
  }
  function togglePanel(name, event) {
    triggerRef.current = event.currentTarget;
    setQuery("");
    setOpen(open === name ? null : name);
  }
  function close() { setOpen(null); setMobileOpen(false); }
  function keyboardOpen(name, event) {
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    triggerRef.current = event.currentTarget;
    setOpen(name);
    requestAnimationFrame(() => headerRef.current?.querySelector("[data-nav-panel] input, [data-nav-panel] a")?.focus());
  }
  function NavLink({ item, description = false }) {
    return <Link href={item.href} onClick={close} className={styles.catalogLink}><span>{item.name}</span>{description && currentLang === "en" && descriptions[item.href] && <small>{descriptions[item.href]}</small>}<ArrowUpRight size={14} aria-hidden="true" /></Link>;
  }
  const trigger = (name, text) => <button type="button" aria-expanded={open === name} aria-controls={`navigation-${name}`} className={`${styles.navTrigger} ${open === name ? styles.active : ""}`} onClick={(event) => togglePanel(name, event)} onKeyDown={(event) => keyboardOpen(name, event)}>{text}<ChevronDown size={14} aria-hidden="true" /></button>;

  return <header ref={headerRef} className={styles.header} onBlur={(event) => { if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setOpen(null); }}>
    <a href="#main-content" className={styles.skipLink} onClick={(event) => { const target = document.querySelector("h1"); if (target) { event.preventDefault(); target.setAttribute("tabindex", "-1"); target.focus(); } }}>Skip to content</a>
    <div className={styles.bar}>
      <Link href="/" aria-label="Devisgon home" onClick={close} className={styles.logo}><Image src={isDark ? "/logo/dark_logo.webp" : "/logo/logo.webp"} alt="Devisgon" width={185} height={59} priority /></Link>
      <nav aria-label="Main navigation" className={styles.desktop}>
        {trigger("services", copy[0])}
        <Link className={styles.navLink} href="/our-work" onClick={close}>{copy[1]}</Link>
        <Link className={styles.navLink} href="/our-process" onClick={close}>{copy[2]}</Link>
        {trigger("resources", copy[3])}
        {trigger("company", copy[4])}
      </nav>
      <div className={styles.actions}>
        <button type="button" aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"} onClick={toggleTheme} className={styles.iconButton}>{isDark ? <Sun size={18} /> : <Moon size={18} />}</button>
        <div className={styles.language} aria-label="Website language"><Switcher /></div>
        <Link href={callHref} className={styles.callButton} onClick={close}>{copy[5]}<ArrowUpRight size={16} aria-hidden="true" /></Link>
        <button type="button" aria-label="Open navigation" aria-haspopup="dialog" aria-expanded={mobileOpen} onClick={() => { setOpen(null); setMobileOpen(true); }} className={styles.mobileToggle}><Menu size={23} /></button>
      </div>
    </div>
    {open && <div data-nav-panel id={`navigation-${open}`} className={`${styles.panel} ${open !== "services" ? styles.smallPanel : ""}`}>
      {open === "services" ? <>
        <div className={styles.panelTop}>
          <div className={styles.catalogTabs}>{model.catalogs.map((item) => <button key={item.id} type="button" aria-pressed={catalogId === item.id} className={catalogId === item.id ? styles.selectedTab : ""} onClick={() => { setCatalogId(item.id); setGroupIndex(0); setQuery(""); }}>{item.name}</button>)}</div>
          <button type="button" className={styles.iconButton} aria-label={copy[8]} onClick={() => { setOpen(null); triggerRef.current?.focus(); }}><X size={19} /></button>
        </div>
        <div className={styles.catalogBody}>
          <div className={styles.categories} aria-label={`${catalog.name} categories`}>
            {catalog.groups.map((item, index) => <button key={item.title} type="button" aria-pressed={groupIndex === index && !query} className={groupIndex === index && !query ? styles.selectedCategory : ""} onClick={() => { setGroupIndex(index); setQuery(""); }}>{item.title}<span>{item.links.length}</span></button>)}
            <Link href={catalog.href} onClick={close} className={styles.viewAll}>{copy[6]} {catalog.name.toLowerCase()}<ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className={styles.catalogContent}>
            <div className={styles.catalogHeading}><p>{query ? copy[7] : group?.title}</p><label className={styles.search}><Search size={16} aria-hidden="true" /><input type="search" aria-label={`${copy[7]}: ${catalog.name}`} placeholder={copy[7]} value={query} onChange={(event) => setQuery(event.target.value)} /></label></div>
            <div className={styles.linkGrid}>{links.map((item) => <NavLink key={item.href} item={item} description />)}{links.length === 0 && <p className={styles.empty}>No matching links. Try another search.</p>}</div>
          </div>
        </div>
        <div className={styles.panelFooter}><span>AI, automation and product engineering</span><Link href="/contact" onClick={close}>Discuss your project <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
      </> : <>
        <div className={styles.simpleHeading}><p>{open === "company" ? copy[4] : copy[3]}</p><button type="button" aria-label={copy[8]} className={styles.iconButton} onClick={() => { setOpen(null); triggerRef.current?.focus(); }}><X size={18} /></button></div>
        <div className={styles.simpleLinks}>{(open === "company" ? model.company : [...model.resources, { name: "Automation ROI calculator", href: "/tools/automation-roi" }]).map((item) => <NavLink key={item.href} item={item} />)}{open === "company" && model.partners.length > 0 && <><h3 className={styles.partnerHeading}>{model.partnerHeading}</h3>{model.partners.map((item) => <NavLink key={item.href} item={item} />)}</>}</div>
      </>}
    </div>}
    <dialog ref={dialogRef} aria-labelledby="mobile-navigation-title" className={styles.mobileDialog} onCancel={() => setMobileOpen(false)} onClose={() => setMobileOpen(false)}>
      <div className={styles.mobileHeading}><h2 id="mobile-navigation-title">Devisgon</h2><button type="button" aria-label={copy[8]} className={styles.iconButton} onClick={() => setMobileOpen(false)}><X size={24} /></button></div>
      <nav aria-label="Mobile navigation" className={styles.mobileNavigation}>
        <Link href="/" onClick={close} className={styles.mobileDirect}>Home</Link>
        <details><summary>{copy[0]}</summary>{model.catalogs.map((item) => <details key={item.id} className={styles.mobileCatalog}><summary>{item.name}</summary><Link href={item.href} onClick={close} className={styles.viewAll}>{copy[6]} {item.name}</Link>{item.groups.map((category) => <details key={category.title} className={styles.mobileCategory}><summary>{category.title}</summary>{category.links.map((link) => <NavLink key={link.href} item={link} />)}</details>)}</details>)}</details>
        <Link href="/our-work" onClick={close} className={styles.mobileDirect}>{copy[1]}</Link>
        <Link href="/our-process" onClick={close} className={styles.mobileDirect}>{copy[2]}</Link>
        <details><summary>{copy[3]}</summary>{[...model.resources, { name: "Automation ROI calculator", href: "/tools/automation-roi" }].map((item) => <NavLink key={item.href} item={item} />)}</details>
        <details><summary>{copy[4]}</summary>{model.company.map((item) => <NavLink key={item.href} item={item} />)}{model.partners.length > 0 && <><h3 className={styles.partnerHeading}>{model.partnerHeading}</h3>{model.partners.map((item) => <NavLink key={item.href} item={item} />)}</>}</details>
      </nav>
      <Link href={callHref} onClick={close} className={styles.mobileCall}>{copy[5]}<ArrowUpRight size={18} aria-hidden="true" /></Link>
    </dialog>
  </header>;
}
