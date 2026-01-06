"use client";
import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/#about" },
    { name: "Services", href: "/services" },
    { name: "Contact Us", href: "/contact" },
  ];

  const toggleTheme = () => setIsDark(!isDark);
  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  return (
    <header className="w-screen bg-[#F7EDFE]  transition-colors duration-300 fixed top-0 z-50 shadow-sm">
      <div className="px-3 pt-2 md:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex flex-col">
          <span className="text-2xl font-bold tracking-tight text-primary dark:text-primary">
            <span className="text-primary dark:text-primary">D</span>EVISGON.
          </span>
          <span className="text-[10px] text-primary dark:text-secondary tracking-wide">
            Unleashing Innovation, Transforming Businesses
          </span>
        </div>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-primary dark:text-primary hover:text-secondary dark:hover:text-secondary transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-primary dark:text-primary" />
            ) : (
              <Moon className="w-5 h-5 text-primary dark:text-primary" />
            )}
          </button>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-primary dark:text-primary" />
            ) : (
              <Moon className="w-5 h-5 text-primary dark:text-primary" />
            )}
          </button>

          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md hover:bg-muted transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-primary dark:text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary dark:text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="md:hidden fixed top-0 right-0 w-64 h-full bg-[#F7EDFE]  shadow-lg z-40 flex flex-col p-6 gap-6 transition-transform duration-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-primary dark:text-primary hover:text-secondary dark:hover:text-secondary transition-colors duration-200"
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
