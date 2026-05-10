"use client";

import React, { useState } from "react";
import { Save, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProjectForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    shortDescription: initialData?.shortDescription || "",
    description: initialData?.description || "",
    image: initialData?.image || "",
    techStack: initialData?.techStack?.join(", ") || "",
    github: initialData?.github || "",
    liveSite: initialData?.liveSite || "",
    featured: initialData?.featured || false,
  });

  const handleImageUpload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setFormData((prev) => ({ ...prev, image: "Uploading..." }));

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: reader.result }),
          });

          if (res.ok) {
            const data = await res.json();
            setFormData((prev) => ({ ...prev, image: data.url }));
          } else {
            setFormData((prev) => ({ ...prev, image: "" }));
            alert("Upload failed");
          }
        } catch {
          setFormData((prev) => ({ ...prev, image: "" }));
          alert("Network error");
        }
      };
    };
    fileInput.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      techStack: formData.techStack
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),
    };

    try {
      const url = initialData ? `/api/projects/${initialData._id}` : "/api/projects";
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
        const error = await res.json();
        alert(error.error || "Failed to save project.");
      }
    } catch {
      alert("Network error.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Link href="/admin/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 w-fit">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div className="border border-slate-700 bg-slate-900 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-white mb-6">
          {initialData ? "Edit Project" : "New Project"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
              <input required type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-slate-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Short Description</label>
              <input required type="text" value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-slate-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Full Description</label>
            <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-slate-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Project Image</label>
            <div className="flex gap-2">
              <input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-slate-500" placeholder="Image URL or Upload ->" />
              <button type="button" onClick={handleImageUpload} className="px-3 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white transition-colors shrink-0" aria-label="Upload project image">
                <ImageIcon size={16} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Tech Stack (comma separated)</label>
            <input type="text" value={formData.techStack} onChange={(e) => setFormData({ ...formData, techStack: e.target.value })} className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-slate-500" placeholder="React, Node.js, MongoDB" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">GitHub Repo</label>
              <input type="url" value={formData.github} onChange={(e) => setFormData({ ...formData, github: e.target.value })} className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-slate-500" placeholder="https://github.com/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Live Site</label>
              <input type="url" value={formData.liveSite} onChange={(e) => setFormData({ ...formData, liveSite: e.target.value })} className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-slate-500" placeholder="https://..." />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input id="featured" type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="accent-slate-400" />
            <label htmlFor="featured" className="text-sm text-gray-300">Feature on homepage</label>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-white font-medium hover:bg-slate-600 border border-slate-600 disabled:opacity-50">
              <Save size={18} /> {loading ? "Saving..." : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
