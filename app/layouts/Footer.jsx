"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  ArrowUp,
  Code,
  Heart
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <motion.footer 
      className="relative w-full bg-gray-900/50 backdrop-blur-lg border-t border-purple-500/20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl font-bold text-white">
              Ritam <span className="text-purple-500">Vaskar</span>
            </h3>
            <p className="text-gray-400 text-sm">
              A passionate full-stack developer dedicated to creating innovative web solutions
              and bringing creative ideas to life.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/Ritam-Vaskar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-500 transition-colors"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/ritam-vaskar-50627527a"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-500 transition-colors"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <motion.li key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-purple-500 transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-purple-500 rounded-full" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Contact Info</h3>
            <div className="space-y-3">
              <motion.a
                href="mailto:your.email@example.com"
                className="text-gray-400 hover:text-purple-500 transition-colors text-sm flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                <Mail size={16} />
                your.email@example.com
              </motion.a>
              <motion.a
                href="tel:+1234567890"
                className="text-gray-400 hover:text-purple-500 transition-colors text-sm flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                <Phone size={16} />
                +123 456 7890
              </motion.a>
              <motion.p
                className="text-gray-400 text-sm flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                <MapPin size={16} />
                Your Location, City, Country
              </motion.p>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Newsletter</h3>
            <p className="text-gray-400 text-sm">
              Subscribe to stay updated with my latest projects and tech articles.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800/50 border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-500 text-gray-300 text-sm transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div 
        variants={itemVariants}
        className="border-t border-purple-500/20 py-4 backdrop-blur-lg"
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm flex items-center gap-2">
            <Code size={16} className="text-purple-500" />
            Made with 
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
                transition: { duration: 1, repeat: Infinity }
              }}
            >
              <Heart size={16} className="text-red-500" />
            </motion.span>
            by Ritam Vaskar
          </p>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-purple-500/20 rounded-full hover:bg-purple-500/30 transition-colors"
          >
            <ArrowUp size={20} className="text-purple-500" />
          </motion.button>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;