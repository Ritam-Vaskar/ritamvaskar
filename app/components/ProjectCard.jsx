"use client";
import React, { useState } from "react";

const ProjectCard = ({ project }) => {
  const { image, title, shortDescription, description, techStack, github, liveSite } = project;
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="w-full h-[350px] bg-slate-900 p-6 border border-slate-700">
        <div className="w-full h-40 overflow-hidden border border-slate-700">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-sm text-gray-400 mt-2">{shortDescription}</p>
        </div>

        <div className="flex gap-4 mt-6 justify-between items-center">
          <button className="px-4 py-2 bg-slate-700 text-white font-medium border border-slate-600 hover:bg-slate-600 transition-colors" onClick={() => setModalOpen(true)}>
            Know More
          </button>
          <a href={liveSite} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-slate-700 text-white font-medium border border-slate-600 hover:bg-slate-600 transition-colors">
            Direct Link
          </a>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setModalOpen(false)}>
          <div className="bg-slate-900 border border-slate-700 relative w-full max-w-4xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 z-10 text-gray-300 bg-slate-800 p-2 border border-slate-600" onClick={() => setModalOpen(false)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="h-48 sm:h-56 md:h-64 overflow-hidden border-b border-slate-700">
              <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl text-white font-bold">{title}</h2>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{description}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Technology Stack</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {techStack.map((tech) => (
                    <div key={tech} className="bg-slate-800 border border-slate-700 px-3 py-2 text-center">
                      <span className="text-gray-300 text-sm font-medium">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 px-6 py-3 bg-slate-800 border border-slate-700 text-white font-medium">
                    <span>View Source</span>
                  </a>

                  <a href={liveSite} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 px-6 py-3 bg-slate-700 border border-slate-600 text-white font-medium">
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
