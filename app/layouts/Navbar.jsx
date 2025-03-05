"use client";
import React, { useState } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";

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
          <Link to="home" smooth={true} duration={500} className="cursor-pointer hover:text-[#77c0ff]">Home</Link>
          <Link to="education" smooth={true} duration={500} className="cursor-pointer hover:text-[#77c0ff]">Education</Link>
          <Link to="skills" smooth={true} duration={500} className="cursor-pointer hover:text-[#77c0ff]">Skills</Link>
          <Link to="project" smooth={true} duration={500} className="cursor-pointer hover:text-[#77c0ff]">Project</Link>
          <Link to="contact" smooth={true} duration={500} className="cursor-pointer hover:text-[#77c0ff]">Contact</Link>
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

      {/* Crazy Animated Dropdown for Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="md:hidden absolute top-18 left-0 w-full bg-gradient-to-r from-[#120b2a] via-[#2A0E61] to-[#2A0E61] backdrop-blur-xl text-white shadow-2xl rounded-b-3xl p-6 border-t-4 border-[#fff]/30"
          >
            {['home', 'education', 'skills', 'project', 'contact'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Link
                  to={item}
                  smooth={true}
                  duration={500}
                  onClick={toggleMenu}
                  className="block text-lg font-medium py-3 px-6 text-center bg-white/10 hover:bg-white/20 rounded-xl transition transform hover:scale-105 shadow-lg m-2"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
