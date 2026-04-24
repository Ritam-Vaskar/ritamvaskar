"use client";

import React, { useState } from "react";
import { MessageSquare, Send } from "lucide-react";

export default function BlogReviewForm({ blogTitle }) {
  const [formData, setFormData] = useState({ name: "", email: "", content: "" });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, blogTitle }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", content: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="mt-12 p-6 border border-slate-700 bg-slate-900/50 text-center">
        <div className="text-3xl mb-3">🎉</div>
        <h3 className="text-lg font-bold text-white mb-2">Review Submitted!</h3>
        <p className="text-gray-400 text-sm">Thank you for sharing your thoughts. Your review has been sent directly to my inbox.</p>
        <button onClick={() => setStatus("idle")} className="mt-4 text-slate-300 hover:text-white underline text-sm">Write another review</button>
      </div>
    );
  }

  return (
    <div className="mt-12 pt-8 border-t border-slate-700">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="text-slate-400" size={20} />
        <h3 className="text-xl font-bold text-white">Leave a Review</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-xs mb-1.5">Your Name *</label>
            <input 
              required 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-slate-500" 
              placeholder="John Doe" 
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1.5">Your Email *</label>
            <input 
              required 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-slate-500" 
              placeholder="john@example.com" 
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-1.5">Your Review *</label>
          <textarea 
            required 
            rows={4}
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-slate-500 resize-y" 
            placeholder="What did you think of this article?" 
          />
        </div>
        
        {status === "error" && <p className="text-red-400 text-xs">Failed to send review. Please try again.</p>}

        <button 
          type="submit" 
          disabled={status === "loading"}
          className="flex items-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-medium text-sm transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "Sending..." : "Submit Review"}
          {!status.includes("loading") && <Send size={14} />}
        </button>
      </form>
    </div>
  );
}
