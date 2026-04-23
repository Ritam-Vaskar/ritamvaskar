"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogEditor from "../../../../components/BlogEditor";

export default function EditBlogPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check auth
    fetch("/api/auth/verify")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push("/admin");
          return;
        }
        // 2. Fetch blog data
        return fetch(`/api/blogs/${id}`);
      })
      .then((res) => {
        if (res && res.ok) return res.json();
        throw new Error("Failed to load blog");
      })
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        router.push("/admin/dashboard");
      });
  }, [id, router]);

  const handleSave = async (blogData) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const error = await res.json();
        alert(error.error || "Failed to update blog post");
        setSaving(false);
      }
    } catch (err) {
      alert("Network error. Try again.");
      setSaving(false);
    }
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
      <section className="w-full py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto mb-6 flex items-center justify-between">
          <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <span className="text-gray-500 text-sm">Editing post: {blog.title}</span>
        </div>
        <BlogEditor initialData={blog} onSave={handleSave} saving={saving} />
      </section>
    </main>
  );
}
