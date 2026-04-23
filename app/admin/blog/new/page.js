"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogEditor from "../../../components/BlogEditor";

export default function NewBlogPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/auth/verify")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) router.push("/admin");
        else setChecking(false);
      })
      .catch(() => router.push("/admin"));
  }, [router]);

  const handleSave = async (blogData) => {
    setSaving(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const error = await res.json();
        alert(error.error || "Failed to save blog post");
        setSaving(false);
      }
    } catch (err) {
      alert("Network error. Try again.");
      setSaving(false);
    }
  };

  if (checking) {
    return (
      <main className="min-h-screen pt-[60px] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-slate-600 border-t-slate-300 animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-[60px]">
      <section className="w-full py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto mb-6">
          <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </div>
        <BlogEditor onSave={handleSave} saving={saving} />
      </section>
    </main>
  );
}
