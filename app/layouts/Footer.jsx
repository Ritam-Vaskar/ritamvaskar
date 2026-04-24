"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Phone, MapPin, ArrowUp, Code, Heart } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Skills", href: "/skills" },
    { name: "Projects", href: "/projects" },
    { name: "Certifications", href: "/certifications" },
    { name: "Blog", href: "/blog" },
  ];

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/subscribe/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep(2);
        setMessage("OTP sent! Check your inbox.");
      } else setMessage(data.error || "Failed to send OTP.");
    } catch (error) {
      setMessage("Network error. Try again.");
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/subscribe/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) setStep(3);
      else setMessage(data.error || "Invalid OTP.");
    } catch (error) {
      setMessage("Network error. Try again.");
    }
    setLoading(false);
  };

  return (
    <footer className="w-full bg-slate-900 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Ritam <span className="text-slate-300">Vaskar</span></h3>
            <p className="text-gray-400 text-sm">A passionate full-stack developer dedicated to creating innovative web solutions and bringing creative ideas to life.</p>
            <div className="flex space-x-4">
              <a href="https://github.com/Ritam-Vaskar" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-slate-300 transition-colors"><Github size={20} /></a>
              <a href="https://www.linkedin.com/in/ritam-vaskar-50627527a" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-slate-300 transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-slate-300 transition-colors text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-slate-400" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Contact Info</h3>
            <div className="space-y-3">
              <a href="mailto:ritamvaskar0@gmail.com" className="text-gray-400 hover:text-slate-300 transition-colors text-sm flex items-center gap-2"><Mail size={16} />ritamvaskar0@gmail.com</a>
              <a href="tel:+919609887167" className="text-gray-400 hover:text-slate-300 transition-colors text-sm flex items-center gap-2"><Phone size={16} />+91 9609887167</a>
              <p className="text-gray-400 text-sm flex items-center gap-2"><MapPin size={16} />Raghunathganj, Murshidabad, WB</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Newsletter</h3>
            <p className="text-gray-400 text-sm">Subscribe to stay updated with my latest projects and tech articles.</p>
            {step === 1 && (
              <form onSubmit={handleSendOtp} className="flex flex-col gap-2">
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="px-4 py-2 bg-slate-800 border border-slate-700 focus:outline-none focus:border-slate-500 text-gray-300 text-sm" />
                <button type="submit" disabled={loading} className="px-4 py-2 bg-slate-700 border border-slate-600 text-white text-sm font-medium hover:bg-slate-600 transition-colors disabled:opacity-50">{loading ? "Sending..." : "Subscribe"}</button>
                {message && <p className="text-red-400 text-xs">{message}</p>}
              </form>
            )}
            {step === 2 && (
              <form onSubmit={handleVerifyOtp} className="flex flex-col gap-2">
                <p className="text-slate-400 text-xs">Enter the 6-digit OTP sent to {email}</p>
                <input required type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" className="px-4 py-2 bg-slate-800 border border-slate-700 focus:outline-none focus:border-slate-500 text-gray-300 text-sm font-mono tracking-widest" />
                <button type="submit" disabled={loading} className="px-4 py-2 bg-slate-700 border border-slate-600 text-white text-sm font-medium hover:bg-slate-600 transition-colors disabled:opacity-50">Verify OTP</button>
                {message && <p className="text-yellow-400 text-xs">{message}</p>}
              </form>
            )}
            {step === 3 && (
              <div className="px-4 py-3 bg-green-950/30 border border-green-800/50 text-green-400">
                <p className="text-sm font-medium">Subscribed Successfully!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm flex items-center gap-2"><Code size={16} className="text-slate-300" />Made with <Heart size={16} className="text-red-500" /> by Ritam Vaskar</p>
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} All rights reserved.</p>
          <button onClick={scrollToTop} className="p-2 bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition-colors"><ArrowUp size={20} /></button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
