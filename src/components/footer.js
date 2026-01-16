"use client";
import { motion } from "framer-motion";

const footerColumns = [
  {
    title: "Company",
    links: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "#about" },
      { name: "Services", href: "/services" },
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

const Footer = () => {
  return (
    <footer className="bg-bg-primary pt-16 pb-8 px-6 md:px-12 lg:px-20 text-primary">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">

          {/* Logo & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start gap-6"
          >
            <img src="/logo/logo.svg" alt="logo" />

            <div className="flex flex-col gap-3 text-sm md:text-base font-medium opacity-80">
              <a href="mailto:info@devisgon.com" className="hover:text-[#8B3DFF] hover:border-b-2">
                info@devisgon.com
              </a>
              <a href="tel:03316944411" className="hover:text-[#8B3DFF] hover:border-b-2">
                0331 6944411
              </a>
            </div>
          </motion.div>

          {/* Columns */}
          {footerColumns.map((col, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: (index + 1) * 0.15,
              }}
            >
              <h3 className="font-bold text-lg mb-6">{col.title}</h3>

              {col.links.length > 0 && (
                <ul className="flex flex-col gap-4 text-t_secondary text-sm md:text-[15px]">
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <a href={link.href} className="hover:border-b-2 transition-opacity">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {col.title === "Newsletter" && (
                <form className="flex flex-col gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 rounded-lg border border-[#E0D4F5] bg-white text-sm focus:outline-none focus:border-secondary placeholder:text-secondary"
                  />
                  <button
                    type="button"
                    className="w-full py-3 bg-secondary text-white rounded-lg text-sm font-semibold hover:bg-primary transition-colors shadow-md"
                  >
                    Subscribe Now
                  </button>
                </form>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-primary pt-8 text-center">
          <p className="text-t-primary text-sm">
            © Copyright 2025–27, All Rights Reserved by Devigson
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
