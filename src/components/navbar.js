"use client";

import data from "../data/navbar.json";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Moon, Sun, Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

  const navLinks = data.navbar;

  // Theme logic
  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme");

    if (
      storedTheme === "dark" ||
      (!storedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Mobile scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  if (!mounted) return null;

  return (
    <header className="fixed top-0 w-full z-50 bg-bg-primary border-b border-border/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col group">
          <span className="text-2xl font-bold text-primary">
            DEVISGON
            <span className="text-secondary group-hover:text-primary">.</span>
          </span>
          <span className="text-[10px] text-muted-foreground tracking-wide">
            Unleashing Innovation
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              {/* Main Link */}
              <Link
                href={link.href}
                className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.name}
                {link.dropdown && (
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                )}
              </Link>

              {/* Dropdown (Left-Aligned) */}
              {link.dropdown && (
                <div
                  className="absolute top-full -left-84 mt-2 w-[600px] bg-bg-primary border border-border rounded-xl shadow-xl
                  opacity-0 invisible group-hover:visible group-hover:opacity-100
                  translate-y-2 group-hover:translate-y-0 transition-all duration-200 z-50"
                >
                  <div className="grid grid-cols-3 gap-8 p-8">
                    {link.dropdown.columns.map((col) => (
                      <div key={col.title}>
                        <h3 className="text-xs font-bold uppercase text-primary mb-3">
                          {col.title}
                        </h3>
                        <ul className="space-y-2">
                          {col.links.map((sublink) => (
                            <li key={sublink.name}>
                              <Link
                                href={sublink.href}
                                className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all inline-block"
                              >
                                {sublink.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun /> : <Moon />}
          </button>
        </nav>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggleTheme} className="p-2" aria-label="Toggle Theme">
            {isDark ? <Sun /> : <Moon />}
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2"
            aria-label="Open Menu"
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-3/4 max-w-sm z-50 transform transition-transform duration-300 md:hidden
          ${mobileOpen ? "translate-x-0" : "translate-x-full"} 
          bg-white text-gray-900 pointer-events-auto`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2"
            aria-label="Close Menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu Links */}
        <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-64px)]">
          {navLinks.map((link) => (
            <div key={link.name} className="border-b pb-3 last:border-0">
              {link.dropdown ? (
                <button
                  className="flex justify-between w-full text-lg font-bold"
                  onClick={() =>
                    setActiveMobileDropdown(
                      activeMobileDropdown === link.name ? null : link.name
                    )
                  }
                >
                  {link.name}
                  <ChevronDown
                    className={`transition-transform ${
                      activeMobileDropdown === link.name ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-lg font-bold"
                >
                  {link.name}
                </Link>
              )}

              {link.dropdown &&
                activeMobileDropdown === link.name &&
                link.dropdown.columns.map((col) => (
                  <div key={col.title} className="pl-4 mt-2">
                    <p className="text-xs uppercase font-semibold">{col.title}</p>
                    <div className="pl-4 space-y-2 mt-2">
                      {col.links.map((sublink) => (
                        <Link
                          key={sublink.name}
                          href={sublink.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-sm"
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </header>
  );
};

export default Navbar;
