"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Award, X, Briefcase, Calendar, MapPin } from "lucide-react";

const ExperienceCard = ({ experience }) => {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Custom floating animation for logos
  const floatingAnimation = {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <>
      <motion.div
        className="relative w-full border border-gray-700 rounded-xl overflow-hidden backdrop-blur-lg"
        whileHover={{ scale: 1.02, y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Animated gradient border */}
        <div className="absolute inset-0 " />
        
        <div className="relative p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
            {/* Logo Section */}
            <div className="relative">
              <motion.div
                className="w-24 h-24 mx-auto bg-gray-700 rounded-xl p-4 flex items-center justify-center relative overflow-hidden"
                animate={isHovered ? floatingAnimation : {}}
              >
                {/* Company Logo */}
                <img
                  src={experience.logo}
                  alt={experience.company}
                  className="w-16 h-16 object-contain"
                />
                
                {/* Floating symbols background */}
                <motion.div
                  className="absolute text-4xl opacity-20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  {experience.symbol}
                </motion.div>
              </motion.div>
            </div>

            {/* Content Section */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-2">
                {experience.title}
              </h3>
              <div className="flex items-center gap-2 text-purple-400 mb-3">
                <Briefcase size={18} />
                <span>{experience.company}</span>
              </div>
              
              {/* Timeline with position changes */}
              <div className="space-y-2">
                {experience.positions.map((position, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span className="text-sm">{position.title}</span>
                      <span className="text-gray-500 text-sm">
                        {position.duration}
                      </span>
                    </div>
                    {index < experience.positions.length - 1 && (
                      <div className="absolute left-1 top-2 w-px h-4 bg-purple-500/30" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions Section */}
            <div className="flex flex-col items-center gap-4">
              <motion.button
                className="px-6 py-3 bg-purple-500 text-white rounded-lg w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(true)}
              >
                View Details
              </motion.button>
              <motion.a
                href={experience.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-purple-500/30 text-purple-400 rounded-lg w-full text-center hover:bg-purple-500/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Visit Company
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden h-[90vh] overflow-y-auto modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              {/* Modal Header with Company Banner */}
              <div className="relative h-48">
                <img
                  src={experience.companyBanner}
                  alt={experience.company}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                <button
                  className="absolute top-4 right-4 text-white/80 hover:text-white"
                  onClick={() => setShowModal(false)}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <img
                    src={experience.logo}
                    alt={experience.company}
                    className="w-20 h-20 rounded-xl"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {experience.title}
                    </h3>
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

                {/* Role Description */}
                <div className="mt-8">
                  <h4 className="text-xl font-semibold text-white mb-4">
                    Role Overview
                  </h4>
                  <p className="text-gray-300 mb-6">{experience.description}</p>
                  
                  <h4 className="text-xl font-semibold text-white mb-4">
                    Key Achievements
                  </h4>
                  <ul className="space-y-3">
                    {experience.achievements.map((achievement, index) => (
                      <li key={index} className="flex gap-3 text-gray-300">
                        <Award className="flex-shrink-0 w-6 h-6 text-purple-400" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Testimonial */}
                {experience.testimonial && (
                  <div className="mt-8 p-6 bg-gray-800/50 rounded-xl">
                    <div className="flex gap-4 items-start">
                      <img
                        src={experience.testimonial.avatar}
                        alt={experience.testimonial.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="text-gray-300 italic mb-4">
                          "{experience.testimonial.text}"
                        </p>
                        <div>
                          <p className="text-white font-medium">
                            {experience.testimonial.name}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {experience.testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-8 flex gap-4">
                  {experience.credential && (
                    <motion.a
                      href={experience.credential}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Award size={20} />
                      View Credential
                    </motion.a>
                  )}
                  <motion.a
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={20} />
                    Visit Company
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExperienceCard;