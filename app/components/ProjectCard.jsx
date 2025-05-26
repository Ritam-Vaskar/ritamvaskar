"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const ProjectCard = ({ project }) => {
  const { image, title, shortDescription, description, techStack, github, liveSite } = project;

  const [isModalOpen, setModalOpen] = useState(false);

  const floatingAnimation = {
    animate: {
      y: ["0px", "-10px", "0px"],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const hoverAnimation = {
    whileHover: {
      scale: 1.1,
      rotate: [0, 1, -1, 0],
      boxShadow: "0px 10px 20px rgba(128, 90, 213, 0.5)",
      transition: { duration: 0.4 },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <>
      {/* Card */}
      <motion.div
        className="relative w-[100%] h-[350px] bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-3xl shadow-lg hover:cursor-pointer"
        variants={hoverAnimation}
        whileHover="whileHover"
      >
        {/* Image */}
        <div className="w-full h-40 rounded-2xl overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            variants={floatingAnimation}
            animate="animate"
          />
        </div>

        {/* Content */}
        <div className="mt-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-sm text-gray-400 mt-2">{shortDescription}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6 justify-between align-center">
          <button
            className="px-4 py-2 bg-purple-500 rounded-lg text-white font-medium hover:scale-105 transition"
            onClick={() => setModalOpen(true)}
          >
            Know More
          </button>
          <a
            href={liveSite}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-indigo-500 rounded-lg text-white font-medium hover:scale-105 transition"
          >
            Direct Link
          </a>
        </div>
      </motion.div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => setModalOpen(false)}
        >
          <motion.div
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700/50 relative w-full max-w-4xl max-h-[90vh] overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white bg-gray-800/80 hover:bg-red-500/80 rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content Container */}
            <div className="overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {/* Header Section */}
              <div className="relative">
                <div className="h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                </div>
                
                {/* Title Overlay */}
                <div className="absolute bottom-4 left-6 right-16">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold drop-shadow-lg">
                    {title}
                  </h2>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 sm:p-8 space-y-8">
                {/* Description */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full"></div>
                    <h3 className="text-xl font-semibold text-white">About This Project</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    {description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                    <h3 className="text-xl font-semibold text-white">Technology Stack</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {techStack.map((tech, index) => (
                      <motion.div
                        key={index}
                        className="bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 text-center"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(139, 92, 246, 0.1)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-gray-300 text-sm font-medium">{tech}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-gray-700/50">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span>View Source</span>
                    </motion.a>
                    
                    <motion.a
                      href={liveSite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>Live Demo</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ProjectCard;