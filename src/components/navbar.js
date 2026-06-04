"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Menu, Moon, Sun, ChevronDown, ChevronLeft } from "lucide-react";
import { getNavbarDataByLang, normalizeLanguage } from "@/lib/localized-content";

// Code-split the flag-heavy language selector so country SVGs are requested only
// after the interactive navbar hydrates, instead of joining every page's first load.
const Switcher = dynamic(() => import("./language_switch_component"), {
  ssr: false,
  loading: () => <div className="h-10 w-11" aria-hidden="true" />,
});

const getCookieValue = (name) => {
  const token = `${name}=`;
  const match = document.cookie.split("; ").find((cookie) => cookie.startsWith(token));
  return match ? decodeURIComponent(match.slice(token.length)) : null;
};

const findNavItemByHref = (links, href) => {
  for (const link of links) {
    if (link.href === href) {
      return link;
    }

    for (const column of link.dropdown?.columns ?? []) {
      const match = findNavItemByHref(column.links ?? [], href);
      if (match) {
        return match;
      }
    }
  }

  return null;
};

const removeNestedNavItemByHref = (link, href) => {
  if (!link.dropdown) {
    return link;
  }

  return {
    ...link,
    dropdown: {
      ...link.dropdown,
      columns: link.dropdown.columns.map((column) => ({
        ...column,
        links: (column.links ?? [])
          .filter((sublink) => sublink.href !== href)
          .map((sublink) => removeNestedNavItemByHref(sublink, href)),
      })),
    },
  };
};

const getDesktopNavLinks = (links) => {
  const hasTopLevelTechnologies = links.some((link) => link.href === "/technologies");
  const technologiesItem = findNavItemByHref(links, "/technologies");

  if (hasTopLevelTechnologies || !technologiesItem) {
    return links;
  }

  return links.flatMap((link) => {
    const cleanedLink = removeNestedNavItemByHref(link, "/technologies");
    return link.href === "/industries" ? [cleanedLink, technologiesItem] : [cleanedLink];
  });
};

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const [activeDesktopDropdown, setActiveDesktopDropdown] = useState(null);
  const [pinnedDesktopDropdown, setPinnedDesktopDropdown] = useState(null);
  const [activeDesktopNestedDropdown, setActiveDesktopNestedDropdown] = useState(null);
  const [activeMobileCategory, setActiveMobileCategory] = useState(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const [activeMobileNestedDropdown, setActiveMobileNestedDropdown] = useState(null);
  const desktopNavRef = useRef(null);

  const navLinks = getDesktopNavLinks(getNavbarDataByLang(currentLang).navbar);

  useEffect(() => {
    const hasOpenSession = window.sessionStorage.getItem("theme-session") === "active";

    if (!hasOpenSession) {
      window.localStorage.removeItem("theme");
      window.sessionStorage.setItem("theme-session", "active");
    }

    window.sessionStorage.removeItem("theme");

    const nextIsDark = window.localStorage.getItem("theme") === "dark";

    document.documentElement.classList.toggle("dark", nextIsDark);
    setIsDark(nextIsDark);
  }, []);

  useEffect(() => {
    const cookieLang = getCookieValue("lang");
    setCurrentLang(normalizeLanguage(cookieLang));
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (desktopNavRef.current?.contains(event.target)) {
        return;
      }

      setActiveDesktopDropdown(null);
      setPinnedDesktopDropdown(null);
      setActiveDesktopNestedDropdown(null);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveDesktopDropdown(null);
        setPinnedDesktopDropdown(null);
        setActiveDesktopNestedDropdown(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="fixed top-0 z-50 w-screen border-b bg-[#F7EDFE] backdrop-blur-sm dark:bg-[#8457AA]">
      <div className="mx-auto flex h-16 max-w-screen items-center justify-between px-4 md:px-18">
        <Link href="/" className="shrink-0">
          <Image
            src={isDark ? "/logo/dark_logo.webp" : "/logo/logo.webp"}
            alt="logo"
            width={220}
            height={70}
            priority
          />
        </Link>

        <nav ref={desktopNavRef} className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const columnCount = link.dropdown?.columns?.length ?? 0;
            const nestedDesktopItem =
              activeDesktopNestedDropdown?.parentHref === link.href ? activeDesktopNestedDropdown.item : null;
            const activeDropdownItem = nestedDesktopItem ?? link;
            const activeDropdownColumns = activeDropdownItem.dropdown?.columns ?? [];
            const normalizedHref = activeDropdownItem.href.toLowerCase();
            const isServicesDropdown = normalizedHref === "/services";
            const isIndustriesDropdown = normalizedHref === "/industries";
            const isTechnologiesDropdown = normalizedHref === "/technologies";
            const isFullWidthDropdown = isServicesDropdown || isIndustriesDropdown || isTechnologiesDropdown;
            const isDropdownOpen = activeDesktopDropdown === link.href;

         const dropdownPositionClass = isServicesDropdown
  ? "fixed right-6 top-10 w-[calc(100vw-2rem)]" 
  : isIndustriesDropdown
  ? "fixed left-2 top-10 w-[calc(100vw-2rem)]"
  : isTechnologiesDropdown
  ? "fixed left-2 top-10 w-[calc(100vw-2rem)]"
  : "absolute left-0 top-full w-[320px]";
            return (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => {
                  setActiveDesktopDropdown(link.dropdown ? link.href : null);
                  if (activeDesktopNestedDropdown?.parentHref !== link.href) {
                    setActiveDesktopNestedDropdown(null);
                  }
                }}
                onMouseLeave={() => {
                  if (pinnedDesktopDropdown !== link.href) {
                    setActiveDesktopDropdown((prev) => (prev === link.href ? pinnedDesktopDropdown : prev));
                    setActiveDesktopNestedDropdown((prev) =>
                      prev?.parentHref === link.href && pinnedDesktopDropdown !== link.href ? null : prev,
                    );
                  }
                }}
              >
                <Link
                  href={link.href}
                  onClick={(event) => {
                    if (!link.dropdown) {
                      return;
                    }

                    if (event.detail > 1) {
                      return;
                    }

                    event.preventDefault();
                    setPinnedDesktopDropdown(link.href);
                    setActiveDesktopDropdown(link.href);
                    setActiveDesktopNestedDropdown(null);
                  }}
                  data-navbar-dropdown-trigger={link.dropdown ? "true" : undefined}
                  className="flex items-center gap-1 text-sm font-medium text-[#402060] transition-colors dark:text-[#FEFCFE]"
                  aria-expanded={link.dropdown ? isDropdownOpen : undefined}
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
        ? "visible translate-y-3 opacity-100"
        : "pointer-events-none invisible translate-y-2 opacity-0"
    }`}
  >
    {/* This pt-4 (padding-top) is the "invisible bridge" */}
    <div className="pt-4"> 
      <div className="rounded-xl border border-[#D8B4FE]/30 bg-[#F7EDFE] p-8 shadow-2xl dark:bg-[#402060]">
        {nestedDesktopItem && (
          <button
            type="button"
            onClick={() => setActiveDesktopNestedDropdown(null)}
            className="mb-5 inline-flex items-center gap-1 text-sm font-semibold text-[#8457AA] transition-opacity hover:opacity-80 dark:text-[#D8B4FE]"
          >
            <ChevronLeft className="h-4 w-4" />
            {link.name}
          </button>
        )}
          <div
            className={`grid gap-8 ${isFullWidthDropdown ? "max-h-[70vh] overflow-y-auto pr-2" : ""}`}
            style={{
              gridTemplateColumns: isFullWidthDropdown
                ? "repeat(auto-fit, minmax(170px, 1fr))"
                : `repeat(${nestedDesktopItem ? activeDropdownColumns.length : columnCount}, minmax(0, 1fr))`,
            }}
          >
            {activeDropdownColumns.map((col, colIndex) => (
              <div key={col.title || `${link.name}-${colIndex}`}>
                {col.title && (
                  <h3 className="text-sm font-bold uppercase text-t-primary mb-4">
                    {col.title}
                  </h3>
                )}
                <ul className="space-y-3">
                  {col.links.map((sublink) => (
                    <li key={sublink.name}>
                      {sublink.dropdown ? (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveDesktopNestedDropdown({ parentHref: link.href, item: sublink });
                            setActiveDesktopDropdown(link.href);
                            setPinnedDesktopDropdown(link.href);
                          }}
                          className="block text-left text-sm font-medium text-[#402060] transition-all hover:translate-x-1 hover:text-[#8457AA] dark:text-[#FEFCFE] dark:hover:text-[#D8B4FE]"
                        >
                          {sublink.name}
                        </button>
                      ) : (
                        <Link
                          href={sublink.href}
                          onClick={() => {
                            setActiveDesktopDropdown(null);
                            setPinnedDesktopDropdown(null);
                            setActiveDesktopNestedDropdown(null);
                          }}
                          className="block text-sm font-medium text-[#402060] transition-all hover:translate-x-1 hover:text-[#8457AA] dark:text-[#FEFCFE] dark:hover:text-[#D8B4FE]"
                        >
                          {sublink.name}
                        </Link>
                      )}
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
            <Switcher onLanguageChange={(code) => setCurrentLang(normalizeLanguage(code))} />
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
          <Image src="/logo/logo.webp" alt="logo" width={180} height={60} className="h-auto dark:hidden" />
          <Image src="/logo/dark_logo.webp" alt="logo" width={180} height={60} className="hidden h-auto dark:block" />
        </div>

        <div className="-mt-8 h-screen space-y-6 overflow-y-auto bg-[#F7EDFE] px-4 py-12 dark:bg-[#8457AA]">
          <div className="-ml-4 -mt-4 h-[1px] w-3xl bg-black" />

          {navLinks.map((link) => {
            const activeMobileDropdownItem =
              activeMobileNestedDropdown?.parentHref === link.href ? activeMobileNestedDropdown.item : link;
            const activeMobileDropdownColumns = activeMobileDropdownItem.dropdown?.columns ?? [];

            return (
            <div key={link.name} className="pb-3">
              {link.dropdown ? (
                <div className="flex items-center justify-between text-xl font-bold">
                  <Link href={link.href} onClick={() => setMobileOpen(false)}>
                    {link.name}
                  </Link>

                  <button
                    onClick={() => {
                      setActiveMobileDropdown(activeMobileDropdown === link.href ? null : link.href);
                      setActiveMobileCategory(null);
                      setActiveMobileNestedDropdown(null);
                    }}
                    aria-label={`Toggle ${link.name} dropdown`}
                  >
                    <ChevronDown
                      className={`transition-transform ${
                        activeMobileDropdown === link.href ? "rotate-180" : ""
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

              {link.dropdown && activeMobileDropdown === link.href && (
                <div className="mt-4 space-y-3">
                  {activeMobileNestedDropdown?.parentHref === link.href && (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMobileNestedDropdown(null);
                        setActiveMobileCategory(null);
                      }}
                      className="mb-2 inline-flex items-center gap-1 text-sm font-semibold text-btn-primary"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      {link.name}
                    </button>
                  )}

                  {activeMobileDropdownColumns.map((col, colIndex) => (
                    <div key={col.title || `${link.name}-${colIndex}`}>
                      {col.title ? (
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
                      ) : null}

                      {(!col.title || activeMobileCategory === col.title) && (
                        <div className={col.title ? "mt-2 space-y-2 pl-4" : "space-y-2 pl-4"}>
                          {col.links.map((sublink) =>
                            sublink.dropdown ? (
                              <button
                                key={sublink.name}
                                type="button"
                                onClick={() => {
                                  setActiveMobileNestedDropdown({ parentHref: link.href, item: sublink });
                                  setActiveMobileCategory(null);
                                }}
                                className="block text-left text-sm text-t-primary"
                              >
                                {sublink.name}
                              </button>
                            ) : (
                              <Link
                                key={sublink.name}
                                href={sublink.href}
                                onClick={() => setMobileOpen(false)}
                                className="block text-sm text-t-primary"
                              >
                                {sublink.name}
                              </Link>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            );
          })}

          <div className="mr-4">
            <Switcher onLanguageChange={(code) => setCurrentLang(normalizeLanguage(code))} />
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
