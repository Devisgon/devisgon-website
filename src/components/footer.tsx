"use client";

import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import FooterNewsletterForm from "@/components/footer_newsletter_form";
import { findNavbarItemByHref, getFooterDataByLang, getNavbarDataByLang, normalizeLanguage } from "@/lib/localized-content";
import { toSectionAnchor } from "@/lib/section-anchor";

interface FooterLink {
  name: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterCategory {
  title: string;
  links: FooterLink[];
}

const getCookieValue = (name: string): string | null => {
  if (typeof document === "undefined") {
    return null;
  }

  const token = `${name}=`;
  const match = document.cookie.split("; ").find((cookie) => cookie.startsWith(token));
  return match ? decodeURIComponent(match.slice(token.length)) : null;
};

const getInitialLanguage = () => normalizeLanguage(getCookieValue("lang"));

const linkClass =
  "cursor-pointer text-sm font-medium text-t-secondary underline-offset-4 transition-colors hover:text-btn-primary hover:underline md:text-base";

const serviceCategoryAnchors = [
  "ai-and-ml-development",
  "workflow-automation",
  "cloud-and-architecture",
  "data-solutions",
  "design-and-analysis",
  "",
  "web-and-saas-development",
];

const getCategoryHref = (
  baseHref: string | undefined,
  category: FooterCategory,
  index: number,
  categoryAnchors?: string[],
) => {
  if (!baseHref) {
    return "#";
  }

  if (categoryAnchors && index in categoryAnchors) {
    return categoryAnchors[index] ? `${baseHref}#${categoryAnchors[index]}` : baseHref;
  }

  return `${baseHref}#${toSectionAnchor(category.title)}`;
};

const FooterStaticColumn = ({ title, links }: FooterColumn) => (
  <div className="flex flex-col items-start">
    <h3 className="mb-5 text-xl font-bold text-t-primary">{title}</h3>
    <ul className="flex flex-col gap-3">
      {links.map((link) => (
        <li key={`${title}-${link.href}-${link.name}`}>
          <a href={link.href} className={linkClass}>
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const FooterCategoryColumn = ({
  title,
  categories,
  baseHref,
  categoryAnchors,
}: {
  title: string;
  categories: FooterCategory[];
  baseHref?: string;
  categoryAnchors?: string[];
}) => {
  const directLinks = categories.length === 1 && !categories[0].title ? categories[0].links : null;

  return (
    <div className="flex flex-col items-start">
      <h3 className="mb-5 text-xl font-bold text-t-primary">{title}</h3>

      {directLinks ? (
        <ul className="flex flex-col gap-3">
          {directLinks.map((link) => (
            <li key={`${title}-${link.href}`}>
              <a href={link.href} className={linkClass}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex flex-col gap-3">
          {categories.map((category, index) => (
            <li key={`${title}-${category.title}`}>
              <a
                href={getCategoryHref(baseHref, category, index, categoryAnchors)}
                className={linkClass}
              >
                {category.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Footer = () => {
  const [currentLang, setCurrentLang] = useState(getInitialLanguage);

  useEffect(() => {
    const syncLanguageFromCookie = () => {
      setCurrentLang(normalizeLanguage(getCookieValue("lang")));
    };

    syncLanguageFromCookie();
    window.addEventListener("app-language-change", syncLanguageFromCookie);
    return () => window.removeEventListener("app-language-change", syncLanguageFromCookie);
  }, []);

  const footerData = useMemo(() => getFooterDataByLang(currentLang), [currentLang]);
  const navbarData = useMemo(() => getNavbarDataByLang(currentLang), [currentLang]);
  const isRTL = currentLang === "ur" || currentLang === "ar";
  const footerColumns = footerData.columns as FooterColumn[];
  const companyColumn = footerColumns.find((column) => column.title.toLowerCase().includes("company")) ?? footerColumns[0];
  const helpColumn = footerColumns.find((column) => column.title.toLowerCase().includes("help")) ?? footerColumns[1];
  const newsletterColumn =
    footerColumns.find((column) => column.title.toLowerCase().includes("newsletter")) ?? footerColumns[2];
  const legalLinks = helpColumn.links.filter((link) => link.href.includes("privacy") || link.href.includes("terms"));
  const servicesNav = findNavbarItemByHref(navbarData, "/services");
  const industriesNav = findNavbarItemByHref(navbarData, "/industries");
  const technologiesNav = findNavbarItemByHref(navbarData, "/technologies");
  const partnersNav = navbarData.navbar.find((item) => item.name.toLowerCase().includes("partner"));
  const aboutNav = navbarData.navbar.find((item) => item.href === "/#about");
  const servicesCategories = servicesNav?.dropdown?.columns ?? [];
  const industriesCategories = industriesNav?.dropdown?.columns ?? [];
  const technologiesCategories = technologiesNav?.dropdown?.columns ?? [];
  const partnersCategories = partnersNav?.dropdown?.columns ?? [];
  const aboutLinks = aboutNav?.dropdown?.columns.flatMap((column) => column.links) ?? [];

  return (
    <footer
      className="bg-bg-primary px-6 pb-4 pt-14 text-primary md:px-12 lg:px-20"
      dir={isRTL ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <div className="flex w-full flex-col gap-10">
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-4">
          <div className="flex flex-col items-start gap-7">
            <div>
              <Image src="/logo/logo.webp" alt="logo" width={240} height={80} className="w-60 h-auto dark:hidden" />
              <Image src="/logo/dark_logo.webp" alt="logo" width={240} height={80} className="hidden w-60 h-auto dark:block" />
            </div>

            <div className="flex flex-col gap-4 text-start text-md font-medium text-t-primary opacity-80">
              <a
                href="mailto:info@devisgon.com"
                className="group flex items-center gap-3 transition-all duration-300 hover:text-[#8B3DFF]"
              >
                <Mail size={20} className="transition-transform group-hover:scale-110" />
                <span className="border-[#8B3DFF] group-hover:border-b-2">info@devisgon.com</span>
              </a>

              <a
                href="tel:03316944411"
                className="group flex items-center gap-3 transition-all duration-300 hover:text-[#8B3DFF]"
              >
                <Phone size={20} className="transition-transform group-hover:scale-110" />
                <span className="border-[#8B3DFF] group-hover:border-b-2">0331 6944411</span>
              </a>
            </div>

          </div>

          <FooterStaticColumn title={companyColumn.title} links={companyColumn.links} />
          {aboutLinks.length > 0 && <FooterStaticColumn title={aboutNav?.name ?? "About"} links={aboutLinks} />}

          <div className="hidden flex-col items-start lg:flex">
            <h3 className="mb-5 text-xl font-bold text-t-primary">{newsletterColumn.title}</h3>
            <FooterNewsletterForm lang={currentLang} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          <FooterCategoryColumn
            title={servicesNav?.name ?? "Services"}
            categories={servicesCategories}
            baseHref="/services"
            categoryAnchors={serviceCategoryAnchors}
          />
          <FooterCategoryColumn
            title={industriesNav?.name ?? "Industries"}
            categories={industriesCategories}
            baseHref="/industries"
          />
          <FooterCategoryColumn
            title={technologiesNav?.name ?? "Technologies"}
            categories={technologiesCategories}
            baseHref="/technologies"
          />
          <FooterCategoryColumn title={partnersNav?.name ?? "Partners"} categories={partnersCategories} />
        </div>

        <div className="flex flex-col items-start lg:hidden">
          <h3 className="mb-5 text-xl font-bold text-t-primary">{newsletterColumn.title}</h3>
          <FooterNewsletterForm lang={currentLang} />
        </div>

        <div className="flex flex-col gap-3 border-t border-t-[#D1AFEC] px-0 py-4 text-sm text-t-primary dark:border-[#664282] md:flex-row md:items-center md:justify-between">
          <p>{footerData.copyright}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
            {legalLinks.map((link) => (
              <a key={`${link.href}-${link.name}`} href={link.href} className={linkClass}>
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
