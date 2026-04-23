"use client";
import React, { useState } from "react";
import { Link } from "react-scroll";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="w-full h-[60px] fixed top-0 bg-slate-900 border-b border-slate-700 z-50 px-6 md:px-10">
      <div className="w-full h-full flex items-center justify-between">
        <div className="text-xl font-bold text-white flex justify-center gap-2 items-center">
          <img className="w-10 h-10 border border-slate-600" src="./favicon.ico" alt="" />
          Ritam Vaskar
        </div>

        <div className="hidden md:flex space-x-8 text-base font-medium text-white">
          <Link to="home" smooth={true} duration={500} className="cursor-pointer hover:text-slate-300">Home</Link>
          <Link to="education" smooth={true} duration={500} className="cursor-pointer hover:text-slate-300">Education</Link>
          <Link to="skills" smooth={true} duration={500} className="cursor-pointer hover:text-slate-300">Skills</Link>
          <Link to="project" smooth={true} duration={500} className="cursor-pointer hover:text-slate-300">Project</Link>
          <Link to="contact" smooth={true} duration={500} className="cursor-pointer hover:text-slate-300">Contact</Link>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none focus:ring-2 focus:ring-gray-500" aria-label="Toggle Menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-[60px] left-0 w-full bg-slate-900 text-white border-b border-slate-700 p-4">
          {["home", "education", "skills", "project", "contact"].map((item) => (
            <Link
              key={item}
              to={item}
              smooth={true}
              duration={500}
              onClick={toggleMenu}
              className="block text-base font-medium py-3 px-4 text-center border border-slate-700 hover:bg-slate-800 transition-colors mb-2"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
