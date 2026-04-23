"use client";

import React from "react";
import { Github, Linkedin, Facebook, Instagram } from "lucide-react";

const SocialLinks = () => {
  const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com/Ritam-Vaskar", color: "#333" },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/ritam-vaskar-50627527a?fbclid=IwAR1bpBOdCyM2QHdjg2BVPG0GhheUA1E9WBW1Sy7CMyDZDxoFxHBHNCN7ONY",
      color: "#0077B5",
    },
    { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/profile.php?id=100042004065718", color: "#1877F2" },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/ritamvaskar2005/?fbclid=IwAR0okEvLc_S3HqrlIDtaoz6iPxHwb0wXn4JwnFYdyAsdbYr-fe0gLW3Gccg",
      color: "#E4405F",
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          title={social.name}
          className="w-11 h-11 bg-gray-800 border border-slate-700 hover:border-slate-500 transition-colors duration-200 flex items-center justify-center"
        >
          <social.icon size={20} className="text-slate-200" style={{ color: social.color }} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
