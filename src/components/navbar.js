"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Moon, Sun, ChevronDown } from "lucide-react";
import Switcher from "./language_switch_component";
import data from "@/data/navbar.json";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDesktopDropdown, setActiveDesktopDropdown] = useState(null);
  const [activeMobileCategory, setActiveMobileCategory] = useState(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

  const navLinks = data.navbar;

  useEffect(() => {
    const hasDarkClass = document.documentElement.classList.contains("dark");
    setIsDark(hasDarkClass);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header className="fixed top-0 z-50 w-screen border-b bg-[#F7EDFE] backdrop-blur-sm dark:bg-[#8457AA]">
      <div className="mx-auto flex h-16 max-w-screen items-center justify-between px-4 md:px-18">
        <Link href="/" className="shrink-0">
          <Image
            src={isDark ? "/logo/dark_logo.svg" : "/logo/logo.svg"}
            alt="logo"
            width={220}
            height={70}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const columnCount = link.dropdown?.columns?.length ?? 0;
            const normalizedName = link.name.toLowerCase();
            const isServicesDropdown = normalizedName === "services";
            const isIndustriesDropdown = normalizedName === "industries";
            const isFullWidthDropdown = isServicesDropdown || isIndustriesDropdown;
            const isDropdownOpen = activeDesktopDropdown === link.name;

         const dropdownPositionClass = isServicesDropdown
  ? "fixed right-6 top-16 w-[calc(100vw-2rem)]" 
  : isIndustriesDropdown
  ? "fixed left-2 top-16 w-[calc(100vw-2rem)]"
  : "absolute left-0 top-full w-[320px]";
            return (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setActiveDesktopDropdown(link.dropdown ? link.name : null)}
                onMouseLeave={() => setActiveDesktopDropdown((prev) => (prev === link.name ? null : prev))}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-sm font-medium text-[#402060] transition-colors dark:text-[#FEFCFE]"
                >
                  {link.name}
                  {link.dropdown && (
                    <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                  )}
                </Link>

               {link.dropdown && (
  <div
    className={`${dropdownPositionClass} z-50 transition-all duration-200 ${
      isDropdownOpen 
        ? "visible translate-y-0 opacity-100" 
        : "pointer-events-none invisible translate-y-2 opacity-0"
    }`}
  >
    {/* This pt-4 (padding-top) is the "invisible bridge" */}
    <div className="pt-4"> 
      <div className="rounded-xl border border-[#D8B4FE]/30 bg-[#F7EDFE] p-8 shadow-2xl dark:bg-[#402060]">
        <div
          className={`grid gap-8 ${isFullWidthDropdown ? "max-h-[70vh] overflow-y-auto pr-2" : ""}`}
          style={{
            gridTemplateColumns: isFullWidthDropdown
              ? "repeat(auto-fit, minmax(170px, 1fr))"
              : `repeat(${columnCount}, minmax(0, 1fr))`,
          }}
        >
          {link.dropdown.columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold uppercase text-t-primary mb-4">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((sublink) => (
                  <li key={sublink.name}>
                    <Link
                      href={sublink.href}
                      className="block text-sm font-medium text-[#402060] transition-all hover:translate-x-1 hover:text-[#8457AA] dark:text-[#FEFCFE] dark:hover:text-[#D8B4FE]"
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
    </div>
  </div>
)}
              </div>
            );
          })}

          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-[#402060] transition-colors hover:bg-white/50 dark:text-[#FEFCFE] dark:hover:bg-white/10"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <div className="-ml-2">
            <Switcher />
          </div>
        </nav>

        <div className="flex items-center gap-2 text-[#402060] dark:text-[#FEFCFE] md:hidden">
          <button onClick={toggleTheme} className="p-2" aria-label="Toggle Theme">
            {isDark ? <Sun /> : <Moon />}
          </button>

          <button onClick={() => setMobileOpen(true)} className="p-2" aria-label="Open Menu">
            <Menu />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-50 w-3/4 max-w-sm transform bg-[#F7EDFE] text-t-primary transition-transform duration-500 dark:bg-[#8457AA] md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between p-4">
          <img src="/logo/logo.svg" alt="logo" className="dark:hidden" />
          <img src="/logo/dark_logo.svg" alt="logo" className="hidden dark:block" />
        </div>

        <div className="-mt-8 h-screen space-y-6 overflow-y-auto bg-[#F7EDFE] px-4 py-12 dark:bg-[#8457AA]">
          <div className="-ml-4 -mt-4 h-[1px] w-3xl bg-black" />

          {navLinks.map((link) => (
            <div key={link.name} className="pb-3">
              {link.dropdown ? (
                <div className="flex items-center justify-between text-xl font-bold">
                  <Link href={link.href} onClick={() => setMobileOpen(false)}>
                    {link.name}
                  </Link>

                  <button
                    onClick={() => {
                      setActiveMobileDropdown(activeMobileDropdown === link.name ? null : link.name);
                      setActiveMobileCategory(null);
                    }}
                    aria-label={`Toggle ${link.name} dropdown`}
                  >
                    <ChevronDown
                      className={`transition-transform ${
                        activeMobileDropdown === link.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              ) : (
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-xl font-bold"
                >
                  {link.name}
                </Link>
              )}

              {link.dropdown && activeMobileDropdown === link.name && (
                <div className="mt-4 space-y-3">
                  {link.dropdown.columns.map((col) => (
                    <div key={col.title}>
                      <button
                        className="flex w-full justify-between text-base font-normal"
                        onClick={() =>
                          setActiveMobileCategory(activeMobileCategory === col.title ? null : col.title)
                        }
                      >
                        {col.title}
                        <ChevronDown
                          className={`transition-transform ${
                            activeMobileCategory === col.title ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {activeMobileCategory === col.title && (
                        <div className="mt-2 space-y-2 pl-4">
                          {col.links.map((sublink) => (
                            <Link
                              key={sublink.name}
                              href={sublink.href}
                              onClick={() => setMobileOpen(false)}
                              className="block text-sm text-t-primary"
                            >
                              {sublink.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="mr-4">
            <Switcher />
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 h-screen w-full md:hidden"
          onClick={() => setMobileOpen(false)}
          onTouchStart={() => setMobileOpen(false)}
        />
      )}
    </header>
  );
};

export default Navbar;
