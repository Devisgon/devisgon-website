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
            const isWideDropdown = columnCount > 3;

            return (
              <div key={link.name} className="group relative">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-sm font-medium text-[#402060] transition-colors dark:text-[#FEFCFE]"
                >
                  {link.name}
                  {link.dropdown && (
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {link.dropdown && (
                  <div
                    className={`absolute top-full z-50 mt-6 rounded-xl border border-border bg-bg-primary text-t-primary opacity-0 shadow-xl invisible translate-y-2 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${
                      isWideDropdown ? "-right-96 w-[calc(100vw-2rem)]" : "right-0 w-[320px]"
                    }`}
                  >
                    <div
                      className="grid gap-3 p-6"
                      style={{
                        gridTemplateColumns: `repeat(${Math.max(1, Math.min(columnCount, 7))}, minmax(0, 1fr))`,
                      }}
                    >
                      {link.dropdown.columns.map((col) => (
                        <div key={col.title}>
                          <h3 className="mb-4 text-sm font-bold uppercase text-t-primary">{col.title}</h3>
                          <ul className="space-y-2">
                            {col.links.map((sublink) => (
                              <li key={sublink.name}>
                                <Link
                                  href={sublink.href}
                                  className="inline-block text-sm text-muted-foreground transition-all hover:translate-x-1 hover:text-primary"
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
            );
          })}

          <button
            onClick={toggleTheme}
            className="rounded-full border-transparent p-2 text-[#402060] transition-colors hover:bg-muted dark:text-[#FEFCFE]"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun /> : <Moon />}
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

        <div className="h-screen space-y-6 overflow-y-auto bg-[#F7EDFE] px-4 py-12 -mt-8 dark:bg-[#8457AA]">
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
