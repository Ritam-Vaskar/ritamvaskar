"use client";
import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full h-[60px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-slate-300/10 backdrop-blur-md z-50 px-10">
      <div className="w-full h-full flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-[#fff]">Ritam Vaskar</div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 text-base font-medium text-white">
          <a href="#home" className="hover:text-[#2A0E61]">Home</a>
          <a href="#project" className="hover:text-[#2A0E61]">Project</a>
          <a href="#education" className="hover:text-[#2A0E61]">Education</a>
          <a href="#contact" className="hover:text-[#2A0E61]">Contact</a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown for Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col space-y-4 text-base font-medium bg-[#2A0E61] text-white shadow-lg rounded-lg p-4 mt-2">
          <a href="#home" className="block hover:text-gray-300">Home</a>
          <a href="#project" className="block hover:text-gray-300">Project</a>
          <a href="#education" className="block hover:text-gray-300">Education</a>
          <a href="#contact" className="block hover:text-gray-300">Contact</a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
