"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CertificationEditor from "../../../../components/CertificationEditor";

export default function EditCertificationPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [cert, setCert] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/verify")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push("/admin");
          return;
        }
        return fetch(`/api/certifications/${id}`);
      })
      .then((res) => {
        if (res && res.ok) return res.json();
        throw new Error("Failed to load");
      })
      .then((data) => {
        setCert(data);
        setLoading(false);
      })
      .catch(() => router.push("/admin/dashboard"));
  }, [id, router]);

  const handleSave = async (data) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/certifications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const error = await res.json();
        alert(error.error || "Failed to update");
        setSaving(false);
      }
    } catch (err) {
      alert("Network error");
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
        <div className="max-w-3xl mx-auto mb-6">
          <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-white mt-4">Edit Certification</h1>
        </div>
        <CertificationEditor initialData={cert} onSave={handleSave} saving={saving} />
      </section>
    </main>
  );
}
