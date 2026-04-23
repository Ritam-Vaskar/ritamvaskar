"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut, Clock, Calendar } from "lucide-react";

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/verify")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) router.push("/admin");
        else fetchBlogs();
      })
      .catch(() => router.push("/admin"));
  }, [router]);

  const fetchBlogs = async () => {
    const res = await fetch("/api/blogs");
    const data = await res.json();
    setBlogs(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this blog post? This cannot be undone.")) return;
    setDeleting(id);
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    setBlogs(blogs.filter((b) => b._id !== id));
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
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Blog Dashboard</h1>
              <p className="text-gray-400 text-sm mt-1">{blogs.length} post{blogs.length !== 1 ? "s" : ""}</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin/blog/new"
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 border border-slate-600 text-white text-sm font-medium hover:bg-slate-600 transition-colors"
              >
                <Plus size={16} /> New Post
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 border border-slate-700 text-gray-400 text-sm hover:text-white hover:border-slate-500 transition-colors"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>

          {/* Blog list */}
          {blogs.length === 0 ? (
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
                      {blog.tags?.length > 0 && <span className="truncate">{blog.tags.join(", ")}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => togglePublish(blog)} className="p-2 border border-slate-700 text-gray-400 hover:text-white hover:border-slate-500 transition-colors" title={blog.published ? "Unpublish" : "Publish"}>
                      {blog.published ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <Link href={`/admin/blog/edit/${blog._id}`} className="p-2 border border-slate-700 text-gray-400 hover:text-white hover:border-slate-500 transition-colors" title="Edit">
                      <Edit size={14} />
                    </Link>
                    <button onClick={() => handleDelete(blog._id)} disabled={deleting === blog._id} className="p-2 border border-slate-700 text-gray-400 hover:text-red-400 hover:border-red-700 transition-colors disabled:opacity-50" title="Delete">
                      {deleting === blog._id ? <div className="w-3.5 h-3.5 border border-slate-600 border-t-slate-300 animate-spin" /> : <Trash2 size={14} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
