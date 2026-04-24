"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function ExperienceForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company: initialData?.company || "",
    title: initialData?.title || "",
    logo: initialData?.logo || "",
    companyBanner: initialData?.companyBanner || "",
    symbol: initialData?.symbol || "🚀",
    location: initialData?.location || "",
    duration: initialData?.duration || "",
    companyUrl: initialData?.companyUrl || "",
    description: initialData?.description || "",
    credential: initialData?.credential || "",
    achievements: initialData?.achievements || [""],
    positions: initialData?.positions || [{ title: "", duration: "" }],
    testimonial: {
      text: initialData?.testimonial?.text || "",
      name: initialData?.testimonial?.name || "",
      role: initialData?.testimonial?.role || "",
      avatar: initialData?.testimonial?.avatar || "",
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Filter out empty achievements and positions
    const payload = {
      ...formData,
      achievements: formData.achievements.filter(a => a.trim() !== ""),
      positions: formData.positions.filter(p => p.title.trim() !== "")
    };

    try {
      const url = initialData ? `/api/experience/${initialData._id}` : "/api/experience";
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        alert("Failed to save experience.");
      }
    } catch (error) {
      alert("Network error.");
    }
    setLoading(false);
  };

  const handleTestimonialChange = (e) => {
    setFormData({
      ...formData,
      testimonial: { ...formData.testimonial, [e.target.name]: e.target.value }
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Link href="/admin/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 w-fit">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div className="border border-slate-700 bg-slate-900 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-white mb-6">
          {initialData ? "Edit Experience" : "New Experience"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white border-b border-slate-700 pb-2">Basic Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Company</label>
                <input required type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-slate-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-slate-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Duration</label>
                <input type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-slate-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-slate-500" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-slate-500" />
            </div>
          </div>

          {/* Media & Links */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white border-b border-slate-700 pb-2">Media & Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Logo URL</label>
                <input type="text" value={formData.logo} onChange={e => setFormData({...formData, logo: e.target.value})} className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-slate-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Banner Image URL</label>
                <input type="text" value={formData.companyBanner} onChange={e => setFormData({...formData, companyBanner: e.target.value})} className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-slate-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Company Website</label>
                <input type="text" value={formData.companyUrl} onChange={e => setFormData({...formData, companyUrl: e.target.value})} className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-slate-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Credential/Certificate Link</label>
                <input type="text" value={formData.credential} onChange={e => setFormData({...formData, credential: e.target.value})} className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-slate-500" />
              </div>
            </div>
          </div>

          {/* Positions */}
          <div className="space-y-4">
            <div className="flex justify-between items-end border-b border-slate-700 pb-2">
              <h2 className="text-xl font-semibold text-white">Positions (Timeline)</h2>
              <button type="button" onClick={() => setFormData({...formData, positions: [...formData.positions, {title: "", duration: ""}]})} className="text-xs flex items-center gap-1 text-blue-400 hover:text-blue-300"><Plus size={14}/> Add Position</button>
            </div>
            {formData.positions.map((pos, index) => (
              <div key={index} className="flex gap-2 items-start">
                <input type="text" placeholder="Job Title" value={pos.title} onChange={e => { const p = [...formData.positions]; p[index].title = e.target.value; setFormData({...formData, positions: p}); }} className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-slate-500 text-sm" />
                <input type="text" placeholder="Duration (e.g. Jan 2024 - Present)" value={pos.duration} onChange={e => { const p = [...formData.positions]; p[index].duration = e.target.value; setFormData({...formData, positions: p}); }} className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-slate-500 text-sm" />
                <button type="button" onClick={() => { const p = [...formData.positions]; p.splice(index, 1); setFormData({...formData, positions: p}); }} className="p-2 text-gray-500 hover:text-red-400"><Trash2 size={18}/></button>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="space-y-4">
            <div className="flex justify-between items-end border-b border-slate-700 pb-2">
              <h2 className="text-xl font-semibold text-white">Achievements</h2>
              <button type="button" onClick={() => setFormData({...formData, achievements: [...formData.achievements, ""]})} className="text-xs flex items-center gap-1 text-blue-400 hover:text-blue-300"><Plus size={14}/> Add Item</button>
            </div>
            {formData.achievements.map((ach, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input type="text" value={ach} onChange={e => { const a = [...formData.achievements]; a[index] = e.target.value; setFormData({...formData, achievements: a}); }} className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-slate-500 text-sm" />
                <button type="button" onClick={() => { const a = [...formData.achievements]; a.splice(index, 1); setFormData({...formData, achievements: a}); }} className="p-2 text-gray-500 hover:text-red-400"><Trash2 size={18}/></button>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white border-b border-slate-700 pb-2">Testimonial (Optional)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Person Name</label>
                <input name="name" type="text" value={formData.testimonial.name} onChange={handleTestimonialChange} className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-slate-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Role / Subtitle</label>
                <input name="role" type="text" value={formData.testimonial.role} onChange={handleTestimonialChange} className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-slate-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">Avatar Image URL</label>
                <input name="avatar" type="text" value={formData.testimonial.avatar} onChange={handleTestimonialChange} className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-slate-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">Quote</label>
                <textarea name="text" rows={2} value={formData.testimonial.text} onChange={handleTestimonialChange} className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-slate-500" />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-white font-medium hover:bg-slate-600 border border-slate-600 disabled:opacity-50">
              <Save size={18} /> {loading ? "Saving..." : "Save Experience"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
