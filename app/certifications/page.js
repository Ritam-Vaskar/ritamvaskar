"use client";

import React from "react";
import { Award, ExternalLink, Calendar } from "lucide-react";

const certifications = [
  {
    title: "Coming Soon",
    issuer: "Certifications will be listed here",
    date: "—",
    credentialUrl: "#",
    icon: "🏆",
  },
];

const CertificationsPage = () => {
  return (
    <main className="min-h-screen pt-[60px]">
      <section className="w-full py-14 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              My <span className="text-slate-300">Certifications</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
              Professional certifications and credentials that validate my expertise
            </p>
          </div>

          {/* Placeholder state */}
          <div className="flex flex-col items-center justify-center py-16 border border-slate-700 bg-slate-900">
            <div className="text-6xl mb-6">🏆</div>
            <Award className="w-12 h-12 text-slate-500 mb-4" />
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
              Certifications Coming Soon
            </h3>
            <p className="text-gray-400 text-sm sm:text-base max-w-md text-center px-4">
              I'm currently updating this section with my professional certifications and achievements. Check back soon!
            </p>
          </div>

          {/* Ready-to-use grid structure for when certifications are added */}
          {/* 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert) => (
              <div key={cert.title} className="p-5 border border-slate-700 bg-slate-900 hover:border-slate-500 transition-colors">
                <div className="text-3xl mb-3">{cert.icon}</div>
                <h3 className="text-white font-semibold text-base mb-1">{cert.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{cert.issuer}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                    <Calendar size={12} />
                    <span>{cert.date}</span>
                  </div>
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-300 text-xs hover:text-white transition-colors">
                    <ExternalLink size={12} />
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>
          */}
        </div>
      </section>
    </main>
  );
};

export default CertificationsPage;
