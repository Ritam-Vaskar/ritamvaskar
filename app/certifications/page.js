"use client";

import React, { useState, useEffect } from "react";
import { Calendar, BadgeCheck, FileBadge, ZoomIn, X } from "lucide-react";
import BlurImage from "../components/BlurImage";

const CertificationsPage = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch("/api/certifications")
      .then((res) => res.json())
      .then((data) => {
        // Sort certificates by issue date (newest first)
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setCertifications(sortedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load certifications:", err);
        setLoading(false);
      });
  }, []);

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

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-slate-600 border-t-slate-300 animate-spin" />
            </div>
          ) : certifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 border border-slate-700 bg-slate-900">
              <div className="text-6xl mb-6">🎓</div>
              <FileBadge className="w-12 h-12 text-slate-500 mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                No Certifications Yet
              </h3>
              <p className="text-gray-400 text-sm sm:text-base max-w-md text-center px-4">
                Certifications will be added here soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {certifications.map((cert) => {
                const imgUrl = cert.image || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80";
                return (
                  <div key={cert._id} className="border border-slate-700 bg-slate-900 hover:border-slate-500 transition-colors flex flex-col group">
                    <button 
                      onClick={() => setSelectedImage(imgUrl)}
                      className="w-full text-left relative overflow-hidden group/img shrink-0"
                    >
                      <BlurImage 
                        src={imgUrl} 
                        alt={cert.title} 
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500" 
                        containerClassName="w-full h-36 sm:h-40 border-b border-slate-700 overflow-hidden" 
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn className="text-white w-8 h-8 drop-shadow-md" />
                      </div>
                    </button>
                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2.5 mb-3">
                        {cert.issuerLogo && (
                          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-800 border border-slate-700 p-1.5 shrink-0">
                            <img src={cert.issuerLogo} alt={cert.issuer} className="w-full h-full object-contain" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-slate-300 text-xs sm:text-sm font-medium truncate">{cert.issuer}</p>
                          <div className="flex items-center gap-1 text-gray-500 text-[10px] sm:text-xs">
                            <Calendar size={10} />
                            <span>Issued {cert.date}</span>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-white font-semibold text-sm sm:text-base leading-snug mb-2 line-clamp-2">{cert.title}</h3>
                      {cert.credentialId && (
                        <p className="text-gray-500 text-[10px] sm:text-xs mb-3">Credential ID: {cert.credentialId}</p>
                      )}
                      <div className="flex flex-wrap gap-1.5 mb-4 flex-1">
                        {cert.skills?.map((skill) => (
                          <span key={skill} className="px-2 py-0.5 bg-slate-800 border border-slate-700 text-gray-400 text-[10px] sm:text-xs">{skill}</span>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-auto">
                        <button onClick={() => setSelectedImage(imgUrl)} className="flex items-center justify-center gap-2 flex-1 py-2 border border-slate-600 text-slate-300 text-xs sm:text-sm font-medium hover:bg-slate-800 transition-colors">
                          <ZoomIn size={14} />
                          View Image
                        </button>
                        {cert.credentialUrl && (
                          <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 flex-1 py-2 border border-slate-600 text-slate-300 text-xs sm:text-sm font-medium hover:bg-slate-800 transition-colors">
                            <BadgeCheck size={14} />
                            Show Credential
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={28} />
          </button>
          <img 
            src={selectedImage} 
            alt="Certificate Full View" 
            className="max-w-full max-h-[90vh] object-contain shadow-2xl cursor-default"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </main>
  );
};

export default CertificationsPage;
