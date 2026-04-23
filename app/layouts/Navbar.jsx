"use client";
import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { X, Menu } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Scroll links only work on home page
  const homeScrollLinks = [
    { label: "Home", to: "home" },
    { label: "Education", to: "education" },
    { label: "Experience", to: "experience" },
  ];

  // Page links always work
  const pageLinks = [
    { label: "Skills", href: "/skills" },
    { label: "Projects", href: "/projects" },
    { label: "Certifications", href: "/certifications" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <div className="w-full h-[60px] fixed top-0 bg-slate-900 border-b border-slate-700 z-50 px-4 sm:px-6 md:px-10">
      <div className="w-full h-full flex items-center justify-between">
        <NextLink href="/" className="text-lg sm:text-xl font-bold text-white flex justify-center gap-2 items-center">
          <img className="w-8 h-8 sm:w-10 sm:h-10 border border-slate-600" src="./favicon.ico" alt="" />
          <span className="hidden sm:inline">Ritam Vaskar</span>
          <span className="sm:hidden">RV</span>
        </NextLink>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center space-x-6 text-sm font-medium text-white">
          {isHome ? (
            homeScrollLinks.map((link) => (
              <ScrollLink
                key={link.to}
                to={link.to}
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-slate-300 transition-colors"
              >
                {link.label}
              </ScrollLink>
            ))
          ) : (
            <NextLink href="/" className="cursor-pointer hover:text-slate-300 transition-colors">
              Home
            </NextLink>
          )}

          {pageLinks.map((link) => (
            <NextLink
              key={link.href}
              href={link.href}
              className={`cursor-pointer transition-colors ${
                pathname === link.href ? "text-slate-300" : "hover:text-slate-300"
              }`}
            >
              {link.label}
            </NextLink>
          ))}

          {isHome ? (
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              className="cursor-pointer px-4 py-1.5 bg-slate-700 border border-slate-600 hover:bg-slate-600 transition-colors"
            >
              Contact
            </ScrollLink>
          ) : (
            <NextLink
              href="/#contact"
              className="cursor-pointer px-4 py-1.5 bg-slate-700 border border-slate-600 hover:bg-slate-600 transition-colors"
            >
              Contact
            </NextLink>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none" aria-label="Toggle Menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-[60px] left-0 w-full bg-slate-900 text-white border-b border-slate-700 p-4 max-h-[calc(100vh-60px)] overflow-y-auto">
          {isHome ? (
            homeScrollLinks.map((link) => (
              <ScrollLink
                key={link.to}
                to={link.to}
                smooth={true}
                duration={500}
                onClick={toggleMenu}
                className="block text-sm font-medium py-3 px-4 text-center border border-slate-700 hover:bg-slate-800 transition-colors mb-2"
              >
                {link.label}
              </ScrollLink>
            ))
          ) : (
            <NextLink
              href="/"
              onClick={toggleMenu}
              className="block text-sm font-medium py-3 px-4 text-center border border-slate-700 hover:bg-slate-800 transition-colors mb-2"
            >
              Home
            </NextLink>
          )}

          {pageLinks.map((link) => (
            <NextLink
              key={link.href}
              href={link.href}
              onClick={toggleMenu}
              className={`block text-sm font-medium py-3 px-4 text-center border border-slate-700 transition-colors mb-2 ${
                pathname === link.href ? "bg-slate-800 text-slate-300" : "hover:bg-slate-800"
              }`}
            >
              {link.label}
            </NextLink>
          ))}

          {isHome ? (
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              onClick={toggleMenu}
              className="block text-sm font-medium py-3 px-4 text-center bg-slate-700 border border-slate-600 hover:bg-slate-600 transition-colors"
            >
              Contact
            </ScrollLink>
          ) : (
            <NextLink
              href="/#contact"
              onClick={toggleMenu}
              className="block text-sm font-medium py-3 px-4 text-center bg-slate-700 border border-slate-600 hover:bg-slate-600 transition-colors"
            >
              Contact
            </NextLink>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
