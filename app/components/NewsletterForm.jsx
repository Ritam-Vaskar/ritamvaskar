"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: success
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
      } else {
        setMessage(data.error || "Failed to send OTP.");
      }
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

      if (res.ok) {
        setStep(3);
      } else {
        setMessage(data.error || "Invalid OTP.");
      }
    } catch (error) {
      setMessage("Network error. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="border border-slate-700 bg-slate-900/50 p-6 sm:p-8 mt-12 mb-8">
      <div className="flex flex-col md:flex-row gap-6 md:items-center">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="text-slate-400" size={24} />
            <h3 className="text-xl font-bold text-white">Subscribe to the Newsletter</h3>
          </div>
          <p className="text-gray-400 text-sm">
            Get notified every time I publish a new article or tutorial. No spam, ever.
          </p>
        </div>

        <div className="flex-1">
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-slate-500"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 border border-slate-600 sm:border-l-0 text-white font-medium text-sm transition-colors disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Subscribe"}
                </button>
              </div>
              {message && <p className="text-red-400 text-xs mt-1">{message}</p>}
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-2">
              <p className="text-slate-300 text-xs mb-1">Enter the 6-digit OTP sent to {email}</p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-slate-500 tracking-widest font-mono"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 border border-slate-600 sm:border-l-0 text-white font-medium text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
                >
                  Verify <ArrowRight size={14} />
                </button>
              </div>
              {message && <p className="text-yellow-400 text-xs mt-1">{message}</p>}
            </form>
          )}

          {step === 3 && (
            <div className="flex items-center gap-3 p-4 bg-green-950/30 border border-green-800/50 text-green-400">
              <CheckCircle2 size={24} />
              <div>
                <p className="font-medium text-sm">Successfully Subscribed!</p>
                <p className="text-xs opacity-80">You'll receive an email when new posts are published.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
