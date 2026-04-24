"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut, Clock, Calendar } from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("blogs");
  const [blogs, setBlogs] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/verify")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) router.push("/admin");
        else fetchAllData();
      })
      .catch(() => router.push("/admin"));
  }, [router]);

  const fetchAllData = async () => {
    setLoading(true);
    const [blogsRes, certsRes] = await Promise.all([
      fetch("/api/blogs"),
      fetch("/api/certifications")
    ]);
    const blogsData = await blogsRes.json();
    const certsData = await certsRes.json();
    
    // Sort certifications by issue date
    const sortedCerts = certsData.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    setBlogs(blogsData);
    setCertifications(sortedCerts);
    setLoading(false);
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm("Delete this blog post? This cannot be undone.")) return;
    setDeleting(id);
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    setBlogs(blogs.filter((b) => b._id !== id));
    setDeleting(null);
  };

  const handleDeleteCert = async (id) => {
    if (!confirm("Delete this certification? This cannot be undone.")) return;
    setDeleting(id);
    await fetch(`/api/certifications/${id}`, { method: "DELETE" });
    setCertifications(certifications.filter((c) => c._id !== id));
    setDeleting(null);
  };

  const togglePublish = async (blog) => {
    const res = await fetch(`/api/blogs/${blog._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !blog.published }),
    });
    const updated = await res.json();
    setBlogs(blogs.map((b) => (b._id === blog._id ? updated : b)));
  };

  const handleLogout = async () => {
    await fetch("/api/auth/verify", { method: "DELETE" });
    router.push("/admin");
  };

  if (loading) {
    return (
      <main className="min-h-screen pt-[60px] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-slate-600 border-t-slate-300 animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-[60px]">
      <section className="w-full py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <div className="flex gap-3">
              <Link
                href={activeTab === "blogs" ? "/admin/blog/new" : "/admin/certification/new"}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 border border-slate-600 text-white text-sm font-medium hover:bg-slate-600 transition-colors"
              >
                <Plus size={16} /> New {activeTab === "blogs" ? "Post" : "Certification"}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 border border-slate-700 text-gray-400 text-sm hover:text-white hover:border-slate-500 transition-colors"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-700 mb-6">
            <button
              onClick={() => setActiveTab("blogs")}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "blogs" ? "border-slate-300 text-white" : "border-transparent text-gray-500 hover:text-gray-300"}`}
            >
              Blogs ({blogs.length})
            </button>
            <button
              onClick={() => setActiveTab("certifications")}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "certifications" ? "border-slate-300 text-white" : "border-transparent text-gray-500 hover:text-gray-300"}`}
            >
              Certifications ({certifications.length})
            </button>
          </div>

          {/* Content */}
          {activeTab === "blogs" ? (
            blogs.length === 0 ? (
              <div className="text-center py-16 border border-slate-700 bg-slate-900">
                <p className="text-gray-400 mb-4">No blog posts yet</p>
                <Link href="/admin/blog/new" className="text-slate-300 hover:text-white underline text-sm">
                  Create your first post →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {blogs.map((blog) => (
                  <div key={blog._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border border-slate-700 bg-slate-900 hover:border-slate-600 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-semibold text-sm sm:text-base truncate">{blog.title}</h3>
                        <span className={`px-1.5 py-0.5 text-[10px] border shrink-0 ${blog.published ? "border-green-700 text-green-400 bg-green-950/30" : "border-yellow-700 text-yellow-400 bg-yellow-950/30"}`}>
                          {blog.published ? "Published" : "Draft"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-500 text-xs">
                        <span className="flex items-center gap-1"><Clock size={11} />{blog.readTime} min</span>
                        <span className="flex items-center gap-1"><Calendar size={11} />{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => togglePublish(blog)} className="p-2 border border-slate-700 text-gray-400 hover:text-white hover:border-slate-500 transition-colors" title={blog.published ? "Unpublish" : "Publish"}>
                        {blog.published ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <Link href={`/admin/blog/edit/${blog._id}`} className="p-2 border border-slate-700 text-gray-400 hover:text-white hover:border-slate-500 transition-colors" title="Edit">
                        <Edit size={14} />
                      </Link>
                      <button onClick={() => handleDeleteBlog(blog._id)} disabled={deleting === blog._id} className="p-2 border border-slate-700 text-gray-400 hover:text-red-400 hover:border-red-700 transition-colors disabled:opacity-50" title="Delete">
                        {deleting === blog._id ? <div className="w-3.5 h-3.5 border border-slate-600 border-t-slate-300 animate-spin" /> : <Trash2 size={14} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            certifications.length === 0 ? (
              <div className="text-center py-16 border border-slate-700 bg-slate-900">
                <p className="text-gray-400 mb-4">No certifications yet</p>
                <Link href="/admin/certification/new" className="text-slate-300 hover:text-white underline text-sm">
                  Add your first certification →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border border-slate-700 bg-slate-900 hover:border-slate-600 transition-colors">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {cert.issuerLogo && (
                        <div className="w-10 h-10 bg-slate-800 p-1 shrink-0 border border-slate-700">
                          <img src={cert.issuerLogo} alt={cert.issuer} className="w-full h-full object-contain" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <h3 className="text-white font-semibold text-sm sm:text-base truncate">{cert.title}</h3>
                        <p className="text-gray-400 text-xs truncate">{cert.issuer} • {cert.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Link href={`/admin/certification/edit/${cert._id}`} className="p-2 border border-slate-700 text-gray-400 hover:text-white hover:border-slate-500 transition-colors" title="Edit">
                        <Edit size={14} />
                      </Link>
                      <button onClick={() => handleDeleteCert(cert._id)} disabled={deleting === cert._id} className="p-2 border border-slate-700 text-gray-400 hover:text-red-400 hover:border-red-700 transition-colors disabled:opacity-50" title="Delete">
                        {deleting === cert._id ? <div className="w-3.5 h-3.5 border border-slate-600 border-t-slate-300 animate-spin" /> : <Trash2 size={14} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
}
