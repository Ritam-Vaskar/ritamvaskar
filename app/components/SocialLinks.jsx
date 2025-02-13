"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Twitter 
} from "lucide-react";

const SocialLinks = () => {
  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/Ritam-Vaskar",
      color: "#333",
      hoverColor: "#2b3137"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/ritam-vaskar-50627527a?fbclid=IwAR1bpBOdCyM2QHdjg2BVPG0GhheUA1E9WBW1Sy7CMyDZDxoFxHBHNCN7ONY",
      color: "#0077B5",
      hoverColor: "#00669c"
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/profile.php?id=100042004065718",
      color: "#1877F2",
      hoverColor: "#1664d9"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/ritamvaskar2005/?fbclid=IwAR0okEvLc_S3HqrlIDtaoz6iPxHwb0wXn4JwnFYdyAsdbYr-fe0gLW3Gccg",
      color: "#E4405F",
      hoverColor: "#d62f4c"
    }
    // {
    //   name: "Twitter",
    //   icon: Twitter,
    //   url: "https://twitter.com/yourusername",
    //   color: "#1DA1F2",
    //   hoverColor: "#1a8cd8"
    // }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  return (
    <div className="w-full py-8 px-4">
      <motion.div 
        className="max-w-3xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Title */}
        <motion.h2 
          className="text-2xl font-bold text-center mb-8 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Connect With <span className="text-purple-500">Me</span>
        </motion.h2>

        {/* Social Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.2,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className={`relative flex flex-col items-center justify-center w-24 h-24 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 shadow-lg hover:shadow-xl transition-all duration-300`}
                whileHover={{
                  backgroundColor: social.hoverColor + "20"
                }}
              >
                <social.icon 
                  size={32} 
                  className={`text-purple-500 group-hover:text-${social.color} transition-colors duration-300`}
                />
                <span className="mt-2 text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                  {social.name}
                </span>
              </motion.div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SocialLinks;