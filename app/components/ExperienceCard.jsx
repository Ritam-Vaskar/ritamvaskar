"use client";
import React, { useState } from "react";
import { ExternalLink, Award, X, Briefcase, Calendar, MapPin } from "lucide-react";

const ExperienceCard = ({ experience }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="relative w-full border border-slate-700 overflow-hidden bg-slate-900">
        <div className="relative p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
            <div className="relative">
              <div className="w-24 h-24 mx-auto bg-slate-800 border border-slate-700 p-4 flex items-center justify-center">
                <img src={experience.logo} alt={experience.company} className="w-16 h-16 object-contain" />
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-2">{experience.title}</h3>
              <div className="flex items-center gap-2 text-slate-300 mb-3">
                <Briefcase size={18} />
                <span>{experience.company}</span>
              </div>

              <div className="space-y-2">
                {experience.positions.map((position, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-slate-300" />
                      <span className="text-sm">{position.title}</span>
                      <span className="text-gray-500 text-sm">{position.duration}</span>
                    </div>
                    {index < experience.positions.length - 1 && <div className="absolute left-1 top-2 w-px h-4 bg-slate-600" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <button className="px-6 py-3 bg-slate-700 text-white border border-slate-600 w-full hover:bg-slate-600 transition-colors" onClick={() => setShowModal(true)}>
                View Details
              </button>
              <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-slate-600 text-slate-300 w-full text-center hover:bg-slate-800 transition-colors">
                Visit Company
              </a>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 h-[90vh] overflow-y-auto modal-content">
            <div className="relative h-48 border-b border-slate-700">
              <img src={experience.companyBanner} alt={experience.company} className="w-full h-full object-cover" />
              <button className="absolute top-4 right-4 text-white bg-slate-800 border border-slate-600 p-1" onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="p-8">
              <div className="flex items-start gap-6">
                <img src={experience.logo} alt={experience.company} className="w-20 h-20 border border-slate-700" />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{experience.title}</h3>
                  <div className="flex flex-wrap gap-4 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Briefcase size={18} />
                      <span>{experience.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={18} />
                      <span>{experience.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={18} />
                      <span>{experience.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-xl font-semibold text-white mb-4">Role Overview</h4>
                <p className="text-gray-300 mb-6">{experience.description}</p>

                <h4 className="text-xl font-semibold text-white mb-4">Key Achievements</h4>
                <ul className="space-y-3">
                  {experience.achievements.map((achievement, index) => (
                    <li key={index} className="flex gap-3 text-gray-300">
                      <Award className="flex-shrink-0 w-6 h-6 text-slate-300" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {experience.testimonial && (
                <div className="mt-8 p-6 bg-slate-800 border border-slate-700">
                  <div className="flex gap-4 items-start">
                    <img src={experience.testimonial.avatar} alt={experience.testimonial.name} className="w-12 h-12 border border-slate-700 object-cover" />
                    <div>
                      <p className="text-gray-300 italic mb-4">"{experience.testimonial.text}"</p>
                      <div>
                        <p className="text-white font-medium">{experience.testimonial.name}</p>
                        <p className="text-gray-400 text-sm">{experience.testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex gap-4 flex-wrap">
                {experience.credential && (
                  <a href={experience.credential} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-white border border-slate-600">
                    <Award size={20} />
                    View Credential
                  </a>
                )}
                <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 border border-slate-600 text-slate-300">
                  <ExternalLink size={20} />
                  Visit Company
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExperienceCard;
