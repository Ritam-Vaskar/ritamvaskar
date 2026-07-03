"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Calendar, FileBadge } from "lucide-react";

import BlurImage from "../components/BlurImage";
import { Skeleton } from "../components/Skeleton";

const getCertificationSortValue = (cert) => {
  const dateValue = Date.parse(cert?.date || "");
  if (!Number.isNaN(dateValue)) return dateValue;

  const createdAtValue = Date.parse(cert?.createdAt || "");
  return Number.isNaN(createdAtValue) ? 0 : createdAtValue;
};

const CertificationsPreview = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/certifications")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;

        const list = Array.isArray(data) ? data : [];
        const sorted = [...list].sort((a, b) => getCertificationSortValue(b) - getCertificationSortValue(a));
        setCertifications(sorted.slice(0, 3));
        setLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setCertifications([]);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="w-full py-14 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            Latest <span className="text-slate-300">Certifications</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            A few recent credentials that reflect my ongoing learning and verification of skills
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4 mb-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="p-4 sm:p-5 border border-slate-700 bg-slate-900 space-y-3">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-16 h-16 shrink-0" />
                  <div className="flex-1 space-y-2 min-w-0">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-14" />
                </div>
              </div>
            ))
          ) : certifications.length === 0 ? (
            <div className="text-center py-16 border border-slate-700 bg-slate-900">
              <FileBadge className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-gray-400">No certifications yet</p>
            </div>
          ) : (
            certifications.map((cert) => {
              const imageUrl = cert.image || cert.issuerLogo || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80";

              return (
                <div
                  key={cert._id || cert.title}
                  className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5 border border-slate-700 bg-slate-900 hover:border-slate-500 transition-colors"
                >
                  <div className="w-full sm:w-28 h-40 sm:h-28 shrink-0 border border-slate-700 overflow-hidden bg-slate-800">
                    <BlurImage
                      src={imageUrl}
                      alt={cert.title}
                      className="w-full h-full object-cover"
                      containerClassName="w-full h-full"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="min-w-0">
                        <h3 className="text-white font-semibold text-base sm:text-lg leading-snug line-clamp-2">
                          {cert.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-gray-500 text-xs sm:text-sm mt-1">
                          <Calendar size={12} />
                          <span>Issued {cert.date}</span>
                        </div>
                      </div>

                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 text-xs sm:text-sm hover:text-white transition-colors shrink-0"
                        >
                          <BadgeCheck size={14} />
                          Verify
                        </a>
                      )}
                    </div>

                    <p className="text-gray-400 text-xs sm:text-sm mb-3">
                      {cert.issuer}
                      {cert.credentialId ? ` • Credential ID: ${cert.credentialId}` : ""}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(cert.skills || []).slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 bg-slate-800 border border-slate-700 text-gray-400 text-[10px] sm:text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex sm:hidden items-center gap-1.5 text-slate-300 text-xs hover:text-white transition-colors mb-1"
                      >
                        <BadgeCheck size={14} />
                        Verify Credential
                      </a>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="text-center">
          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 border border-slate-600 text-white text-sm font-medium hover:bg-slate-700 transition-colors group"
          >
            Show More Certifications
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CertificationsPreview;