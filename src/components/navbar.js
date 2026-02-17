"use client";
import data from "@/data/navbar.json";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Moon, Sun, Menu, ChevronDown } from "lucide-react";
import { useTranslation } from 'react-i18next';
const Navbar = () => {
    const { t } = useTranslation();

  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
const [activeServiceCategory, setActiveServiceCategory] = useState(null);
const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

  const navLinks = data.navbar;

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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  if (!mounted) return null;

  return (
    <header className="fixed top-0 w-full z-50 bg-[#F7EDFE] dark:bg-[#8457AA]  border-b  backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
         <img
src={isDark ? "/logo/dark_logo.svg" : "/logo/logo.svg"}          alt="logo"
         />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8"> 
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              {/* Main Link */}
              <Link
                href={link.href}
                className="flex items-center gap-1 text-sm font-medium text-[#402060] dark:text-[#FEFCFE]  transition-colors"
              >
                {link.name}
                {link.dropdown && (
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                )}
              </Link>

              {/* Dropdown (Left-Aligned) */}
              {link.dropdown && (
                <div
                  className="absolute top-full -left-[630px] mt-6 text-t-primary w-[900px] bg-bg-primary border border-border rounded-xl shadow-xl
                  opacity-0 invisible group-hover:visible group-hover:opacity-100
                  translate-y-2 group-hover:translate-y-0  transition-all duration-200 z-50"
                >
                  <div className="grid grid-cols-4 gap-6 p-8">
                    {link.dropdown.columns.map((col) => (
                      <div key={col.title}>
                        <h3 className="text-xs font-bold uppercase text-t-primary mb-3">
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

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border-transparent  text-[#402060] dark:text-[#FEFCFE]  hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun /> : <Moon />}
          </button>
        </nav>
         
         {/* mobile view */}
        <div className="md:hidden  flex items-center text-[#402060] dark:text-[#FEFCFE]  gap-2">
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

     <div
  className={`fixed inset-y-0 left-0  w-3/4 max-w-sm z-50 transform transition-transform duration-500 md:hidden
    ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
    
    dark:bg-[#8457AA] text-t-primary bg-[#F7EDFE]`}

>
  <div className="flex justify-between   p-4">
     {/* Logo */}
                     <img src="/logo/logo.svg" alt="logo" className=" dark:hidden " />
            <img src="/logo/dark_logo.svg" alt="logo" className="hidden dark:block " />

  
  </div>

  <div className="px-4 py-12 -mt-8 space-y-6 bg-[#F7EDFE] dark:bg-[#8457AA] overflow-y-auto h-screen">
     <div className="h-[1px] w-3xl -ml-4 -mt-4 bg-black"/>

    {navLinks.map((link) => (
      <div key={link.name} className="pb-3">
        
        {/* MAIN NAV ITEM */}
        {link.dropdown ? (
          <button className="flex justify-between w-full text-xl font-bold" >
            <a href="/services">   {link.name} </a>

            <ChevronDown
               onClick={() => {setActiveMobileDropdown( activeMobileDropdown === link.name ? null : link.name ); setActiveServiceCategory(null);}}
               className={`transition-transform ${ activeMobileDropdown === link.name ? "rotate-180" : ""}`} />
          </button>
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
          <div className="mt-4 space-y-3 ">
            {link.dropdown.columns.map((col) => (
              <div key={col.title}>
                
                <button
                  className="flex justify-between w-full text-1 font-normal"
                  onClick={() =>
                    setActiveServiceCategory(
                      activeServiceCategory === col.title ? null : col.title
                    )
                  }
                >
                  {col.title}
                  <ChevronDown
                    className={`transition-transform ${
                      activeServiceCategory === col.title ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {activeServiceCategory === col.title && (
                  <div className="mt-2 pl-4 space-y-2">
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
  </div>
</div>

      {/* Overlay */}
     {mobileOpen && (
  <div
    className="fixed w-full h-screen inset-0 z-40 md:hidden"
    onClick={() => setMobileOpen(false)}
    onTouchStart={() => setMobileOpen(false)}
  />
)}

    </header>
  );
};

export default Navbar;
