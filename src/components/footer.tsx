"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import React from "react";

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
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (value: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Thanks for subscribing!");

    setEmail("");

    // auto hide after 3 seconds
    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  return (
    <footer className="bg-bg-primary pt-16 pb-4 px-6 md:px-12 lg:px-20 text-primary">
      <div className="flex flex-col gap-12 w-full">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start lg:gap-8 lg:mt-8">

          {/* Logo & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start justify-center lg:items-center gap-6"
          >
            <img src="/logo/logo.svg" alt="logo" className="w-60 mx-auto dark:hidden" />
            <img src="/logo/dark_logo.svg" alt="logo" className="w-60 mx-auto hidden dark:block" />

            <div className="flex flex-col gap-6 text-t-primary text-md font-medium opacity-80 text-start">
              <a href="mailto:info@devisgon.com" className="hover:text-[#8B3DFF] hover:border-b-2">
                info@devisgon.com
              </a>
              <a href="tel:03316944411" className="hover:text-[#8B3DFF] hover:border-b-2">
                0331 6944411
              </a>
            </div>
          </motion.div>

          {/* Footer Columns */}
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
              className="flex flex-col items-start md:items-center"
            >
              <h3 className="font-bold text-t-primary text-2xl mb-6">
                {col.title}
              </h3>

              {/* Normal Links */}
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

              {/* Newsletter */}
              {col.title === "Newsletter" && (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6 mt-2 w-full max-w-xs mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEmail(value);

                      if (value && !validateEmail(value)) {
                        setError("Please enter a valid email");
                      } else {
                        setError("");
                      }
                    }}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 rounded-lg border text-black border-[#E0D4F5] bg-white text-sm focus:outline-none focus:border-secondary"
                  />

                  {error && (
                    <p className="text-red-500 text-sm -mt-4">{error}</p>
                  )}

                  {success && (
                    <p className="text-green-600 text-sm -mt-4">
                      {success}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={!!success}
                    className="w-full py-3 bg-[#8145B5] text-white rounded-lg text-sm font-semibold hover:bg-bg-primary hover:text-t-secondary transition-colors shadow-md disabled:opacity-50"
                  >
                    Subscribe Now
                  </button>
                </form>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t text-center border-t-[#D1AFEC] dark:border-[#664282] p-2">
          <p className="text-t-primary text-sm">
            © Copyright 2025–27, All Rights Reserved by Devisgon
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
