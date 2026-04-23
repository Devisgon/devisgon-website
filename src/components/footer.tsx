import React from "react";
import FooterNewsletterForm from "@/components/footer_newsletter_form";

interface FooterLink {
  name: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "#about" },
      { name: "Services", href: "/services" },
      { name: "Technologies", href: "/services" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Help",
    links: [
      { name: "Customer Support", href: "/contact" },
      { name: "Terms & Conditions", href: "/terms_condition" },
      { name: "Privacy Policy", href: "/privacy_policies" },
    ],
  },
  {
    title: "Newsletter",
    links: [],
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-bg-primary pt-16 pb-4 px-6 md:px-12 lg:px-20 text-primary">
      <div className="flex flex-col gap-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start lg:gap-8 lg:mt-8">
          <div className="flex flex-col items-start justify-center lg:items-center gap-6">
            <img src="/logo/logo.webp" alt="logo" className="w-60 mx-auto dark:hidden" />
            <img src="/logo/dark_logo.webp" alt="logo" className="w-60 mx-auto hidden dark:block" />

            <div className="flex flex-col gap-6 text-t-primary text-md font-medium opacity-80 text-start">
              <a href="mailto:info@devisgon.com" className="hover:text-[#8B3DFF] hover:border-b-2">
                info@devisgon.com
              </a>
              <a href="tel:03316944411" className="hover:text-[#8B3DFF] hover:border-b-2">
                0331 6944411
              </a>
            </div>
          </div>

          {footerColumns.map((col, index) => (
            <div key={index} className="flex flex-col items-start md:items-center">
              <h3 className="font-bold text-t-primary text-2xl mb-6">{col.title}</h3>

              {col.links.length > 0 && (
                <ul className="flex flex-col gap-4 text-t-secondary text-sm md:text-[20px]">
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <a href={link.href} className="hover:border-b-2 transition-opacity">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {col.title === "Newsletter" && <FooterNewsletterForm />}
            </div>
          ))}
        </div>

        <div className="border-t text-center border-t-[#D1AFEC] dark:border-[#664282] p-2">
          <p className="text-t-primary text-sm">
            Copyright 2025-27, All Rights Reserved by Devisgon
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
