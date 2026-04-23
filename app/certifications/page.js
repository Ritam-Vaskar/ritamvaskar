"use client";

import React from "react";
import { ExternalLink, Calendar, Building2, BadgeCheck } from "lucide-react";
import BlurImage from "../components/BlurImage";

const certifications = [
  {
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta",
    issuerLogo: "https://img.icons8.com/?size=100&id=118497&format=png&color=000000",
    date: "March 2026",
    credentialId: "CERT-META-FE-2026",
    credentialUrl: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
    skills: ["React", "JavaScript", "HTML/CSS", "UX Design"],
  },
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issuerLogo: "https://img.icons8.com/?size=100&id=33039&format=png&color=000000",
    date: "January 2026",
    credentialId: "AWS-CCP-2026-XYZ",
    credentialUrl: "https://aws.amazon.com/certification/",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    skills: ["Cloud Computing", "AWS", "Security"],
  },
  {
    title: "MongoDB Associate Developer",
    issuer: "MongoDB University",
    issuerLogo: "https://img.icons8.com/?size=100&id=74402&format=png&color=000000",
    date: "December 2025",
    credentialId: "MDB-DEV-2025",
    credentialUrl: "https://university.mongodb.com/certification",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    skills: ["MongoDB", "Aggregation", "Indexing"],
  },
  {
    title: "Google Data Analytics Certificate",
    issuer: "Google",
    issuerLogo: "https://img.icons8.com/?size=100&id=17949&format=png&color=000000",
    date: "October 2025",
    credentialId: "GOOGLE-DA-2025",
    credentialUrl: "https://grow.google/certificates/data-analytics/",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    skills: ["Data Analysis", "SQL", "Tableau"],
  },
  {
    title: "Docker Certified Associate",
    issuer: "Docker, Inc.",
    issuerLogo: "https://img.icons8.com/?size=100&id=cdYUlRaag9G9&format=png&color=000000",
    date: "August 2025",
    credentialId: "DCA-2025-XYZ",
    credentialUrl: "https://www.docker.com/certification/",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80",
    skills: ["Docker", "Containers", "DevOps"],
  },
  {
    title: "HackerRank Problem Solving (Advanced)",
    issuer: "HackerRank",
    issuerLogo: "https://img.icons8.com/?size=100&id=9Kvi1p1F0tUo&format=png&color=000000",
    date: "June 2025",
    credentialId: "HR-PS-ADV-2025",
    credentialUrl: "https://www.hackerrank.com/certificates",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    skills: ["DSA", "Algorithms", "C++"],
  },
];

const CertificationsPage = () => {
  return (
    <main className="min-h-screen pt-[60px]">
      <section className="w-full py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
              My <span className="text-slate-300">Certifications</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
              Professional certifications and credentials that validate my expertise
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {certifications.map((cert) => (
              <div key={cert.credentialId} className="border border-slate-700 bg-slate-900 hover:border-slate-500 transition-colors overflow-hidden group">
                <BlurImage src={cert.image} alt={cert.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" containerClassName="w-full h-36 sm:h-40 border-b border-slate-700 overflow-hidden" />
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-800 border border-slate-700 p-1.5 shrink-0">
                      <img src={cert.issuerLogo} alt={cert.issuer} className="w-full h-full object-contain" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-slate-300 text-xs sm:text-sm font-medium truncate">{cert.issuer}</p>
                      <div className="flex items-center gap-1 text-gray-500 text-[10px] sm:text-xs">
                        <Calendar size={10} />
                        <span>Issued {cert.date}</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-white font-semibold text-sm sm:text-base leading-snug mb-2 line-clamp-2">{cert.title}</h3>
                  <p className="text-gray-500 text-[10px] sm:text-xs mb-3">Credential ID: {cert.credentialId}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="px-2 py-0.5 bg-slate-800 border border-slate-700 text-gray-400 text-[10px] sm:text-xs">{skill}</span>
                    ))}
                  </div>
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-2 border border-slate-600 text-slate-300 text-xs sm:text-sm font-medium hover:bg-slate-800 transition-colors">
                    <BadgeCheck size={14} />
                    Show Credential
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CertificationsPage;
