"use client";
import { Mail, Phone } from 'lucide-react';
import React, { useEffect, useMemo, useState } from "react";
import FooterNewsletterForm from "@/components/footer_newsletter_form";
import { getFooterDataByLang, normalizeLanguage } from "@/lib/localized-content";

interface FooterLink {
  name: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const getCookieValue = (name: string): string | null => {
  const token = `${name}=`;
  const match = document.cookie.split("; ").find((cookie) => cookie.startsWith(token));
  return match ? decodeURIComponent(match.slice(token.length)) : null;
};

const Footer = () => {
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    const syncLanguageFromCookie = () => {
      setCurrentLang(normalizeLanguage(getCookieValue("lang")));
    };

    syncLanguageFromCookie();
    window.addEventListener("app-language-change", syncLanguageFromCookie);
    return () => window.removeEventListener("app-language-change", syncLanguageFromCookie);
  }, []);

  const footerData = useMemo(() => getFooterDataByLang(currentLang), [currentLang]);
  const footerColumns = footerData.columns as FooterColumn[];

  return (
    <footer className="bg-bg-primary pt-16 pb-4 px-6 md:px-12 lg:px-20 text-primary">
      <div className="flex flex-col gap-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start lg:gap-8 lg:mt-8">
          <div className="flex flex-col items-start justify-center lg:items-center gap-6">
            <img src="/logo/logo.webp" alt="logo" className="w-60 mx-auto dark:hidden" />
            <img src="/logo/dark_logo.webp" alt="logo" className="w-60 mx-auto hidden dark:block" />

            <div className="flex flex-col gap-6 text-t-primary text-md font-medium opacity-80 text-start">
  {/* Email Section */}
  <a 
    href="mailto:info@devisgon.com" 
    className="flex items-center gap-3 hover:text-[#8B3DFF] transition-all duration-300 group"
  >
    <Mail size={20} className="group-hover:scale-110 transition-transform" />
    <span className="group-hover:border-b-2 border-[#8B3DFF]">
      info@devisgon.com
    </span>
  </a>

  {/* Call Section */}
  <a 
    href="tel:03316944411" 
    className="flex items-center gap-3 hover:text-[#8B3DFF] transition-all duration-300 group"
  >
    <Phone size={20} className="group-hover:scale-110 transition-transform" />
    <span className="group-hover:border-b-2 border-[#8B3DFF]">
      0331 6944411
    </span>
  </a>
</div>
          </div>

          {footerColumns.map((col, index) => (
            <div key={`${col.title}-${index}`} className="flex flex-col items-start md:items-center">
              <h3 className="font-bold text-t-primary text-2xl mb-6">{col.title}</h3>

              {col.links.length > 0 && (
                <ul className="flex flex-col gap-4 text-t-secondary text-sm md:text-[20px]">
                  {col.links.map((link, i) => (
                    <li key={`${link.name}-${i}`}>
                      <a href={link.href} className="hover:border-b-2 transition-opacity">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {index === footerColumns.length - 1 && <FooterNewsletterForm lang={currentLang} />}
            </div>
          ))}
        </div>

        <div className="border-t text-center border-t-[#D1AFEC] dark:border-[#664282] p-2">
          <p className="text-t-primary text-sm">{footerData.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
