"use client";
import React, { useState } from "react";
import { ExternalLink, Award, X, Briefcase, Calendar, MapPin } from "lucide-react";
import BlurImage from "./BlurImage";

const ExperienceCard = ({ experience }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="relative w-full h-full border border-slate-700 overflow-hidden bg-slate-900 flex flex-col justify-between hover:border-slate-500 transition-colors">
        <div className="relative p-6 flex flex-col h-full">
          <div className="flex flex-col gap-6 items-center text-center flex-1">
            <div className="relative">
              <div className="w-20 h-20 mx-auto bg-slate-800 border border-slate-700 p-3 flex items-center justify-center rounded-full">
                <BlurImage
                  src={experience.logo}
                  alt={experience.company}
                  className="w-12 h-12 object-contain"
                  containerClassName="flex items-center justify-center"
                />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">{experience.title}</h3>
              <div className="flex items-center justify-center gap-2 text-slate-300 mb-4">
                <Briefcase size={16} />
                <span>{experience.company}</span>
              </div>

              <div className="space-y-2 mb-6">
                {experience.positions.map((position, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <span className="text-sm text-gray-300">{position.title}</span>
                    <span className="text-xs text-gray-500">{position.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col w-full gap-3 mt-auto">
              <button className="px-4 py-2 bg-slate-700 text-white border border-slate-600 w-full hover:bg-slate-600 transition-colors text-sm" onClick={() => setShowModal(true)}>
                View Details
              </button>
              <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-slate-600 text-slate-300 w-full text-center hover:bg-slate-800 transition-colors text-sm">
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
              <BlurImage
                src={experience.companyBanner}
                alt={experience.company}
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
              <button className="absolute top-4 right-4 text-white bg-slate-800 border border-slate-600 p-1" onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-start gap-4 sm:gap-6">
                <BlurImage
                  src={experience.logo}
                  alt={experience.company}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                  containerClassName="w-16 h-16 sm:w-20 sm:h-20 border border-slate-700 shrink-0"
                />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{experience.title}</h3>
                  <div className="flex flex-wrap gap-3 sm:gap-4 text-gray-300 text-sm">
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} />
                      <span>{experience.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{experience.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{experience.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-4">Role Overview</h4>
                <p className="text-gray-300 mb-6 text-sm sm:text-base">{experience.description}</p>

                <h4 className="text-lg sm:text-xl font-semibold text-white mb-4">Key Achievements</h4>
                <ul className="space-y-3">
                  {experience.achievements.map((achievement, index) => (
                    <li key={index} className="flex gap-3 text-gray-300 text-sm sm:text-base">
                      <Award className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 text-slate-300" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {experience.testimonial && (
                <div className="mt-8 p-4 sm:p-6 bg-slate-800 border border-slate-700">
                  <div className="flex gap-3 sm:gap-4 items-start">
                    <BlurImage
                      src={experience.testimonial.avatar}
                      alt={experience.testimonial.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover"
                      containerClassName="w-10 h-10 sm:w-12 sm:h-12 border border-slate-700 shrink-0"
                    />
                    <div>
                      <p className="text-gray-300 italic mb-3 sm:mb-4 text-sm sm:text-base">"{experience.testimonial.text}"</p>
                      <div>
                        <p className="text-white font-medium text-sm sm:text-base">{experience.testimonial.name}</p>
                        <p className="text-gray-400 text-xs sm:text-sm">{experience.testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex gap-3 sm:gap-4 flex-wrap">
                {experience.credential && (
                  <a href={experience.credential} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-slate-700 text-white border border-slate-600 text-sm">
                    <Award size={18} />
                    View Credential
                  </a>
                )}
                <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 border border-slate-600 text-slate-300 text-sm">
                  <ExternalLink size={18} />
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
