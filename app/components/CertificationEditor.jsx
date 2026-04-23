"use client";

import React, { useState } from "react";
import { Save, Image as ImageIcon } from "lucide-react";

export default function CertificationEditor({ initialData, onSave, saving }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    issuer: initialData?.issuer || "",
    issuerLogo: initialData?.issuerLogo || "",
    date: initialData?.date || "",
    credentialId: initialData?.credentialId || "",
    credentialUrl: initialData?.credentialUrl || "",
    image: initialData?.image || "",
    skills: initialData?.skills?.join(", ") || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (field) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setFormData((prev) => ({ ...prev, [field]: "Uploading..." }));

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64data = reader.result;
        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64data }),
          });

          if (res.ok) {
            const data = await res.json();
            setFormData((prev) => ({ ...prev, [field]: data.url }));
          } else {
            setFormData((prev) => ({ ...prev, [field]: "" }));
            alert("Upload failed");
          }
        } catch (error) {
          setFormData((prev) => ({ ...prev, [field]: "" }));
          alert("Network error");
        }
      };
    };
    fileInput.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-5 border border-slate-700 bg-slate-900 p-6">
      <div>
        <label className="block text-gray-400 text-xs mb-1.5">Certification Title *</label>
        <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-slate-500" placeholder="e.g. Meta Front-End Developer" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-gray-400 text-xs mb-1.5">Issuer Organization *</label>
          <input required type="text" name="issuer" value={formData.issuer} onChange={handleChange} className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-slate-500" placeholder="e.g. Meta" />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-1.5">Date Issued *</label>
          <input required type="text" name="date" value={formData.date} onChange={handleChange} className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-slate-500" placeholder="e.g. March 2026" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-gray-400 text-xs mb-1.5">Credential ID</label>
          <input type="text" name="credentialId" value={formData.credentialId} onChange={handleChange} className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-slate-500" placeholder="e.g. CERT-12345" />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-1.5">Credential URL</label>
          <input type="url" name="credentialUrl" value={formData.credentialUrl} onChange={handleChange} className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-slate-500" placeholder="https://..." />
        </div>
      </div>

      <div>
        <label className="block text-gray-400 text-xs mb-1.5">Skills Covered (Comma separated)</label>
        <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-slate-500" placeholder="React, JavaScript, CSS" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-gray-400 text-xs mb-1.5">Certificate Cover Image</label>
          <div className="flex gap-2">
            <input type="text" name="image" value={formData.image} onChange={handleChange} className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-slate-500" placeholder="URL or Upload ->" />
            <button type="button" onClick={() => handleImageUpload("image")} className="px-3 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white transition-colors shrink-0">
              <ImageIcon size={16} />
            </button>
          </div>
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-1.5">Issuer Logo URL</label>
          <div className="flex gap-2">
            <input type="text" name="issuerLogo" value={formData.issuerLogo} onChange={handleChange} className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-slate-500" placeholder="URL or Upload ->" />
            <button type="button" onClick={() => handleImageUpload("issuerLogo")} className="px-3 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white transition-colors shrink-0">
              <ImageIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-700 flex justify-end">
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2 bg-slate-700 border border-slate-600 text-white text-sm font-medium hover:bg-slate-600 transition-colors disabled:opacity-50">
          {saving ? <div className="w-4 h-4 border-2 border-slate-500 border-t-white animate-spin" /> : <Save size={16} />}
          {saving ? "Saving..." : "Save Certification"}
        </button>
      </div>
    </form>
  );
}
