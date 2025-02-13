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

  return (
    <>
      {/* Card */}
      <motion.div
        className="relative w-80 h-[350px] bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-3xl shadow-lg hover:cursor-pointer"
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
        <div className="flex gap-4 mt-6">
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

      {/* Modal */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setModalOpen(false)}
        >
          <motion.div
            className="bg-gray-900 rounded-xl p-8 max-w-lg mx-auto relative h-[90vh] overflow-y-auto"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white bg-red-500 rounded-full p-2"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>
            <img
              src={image}
              alt={title}
              className="w-full h-40 rounded-lg object-cover"
            />
            <h2 className="text-2xl text-white font-bold mt-4">{title}</h2>
            <p className="text-gray-400 mt-2">{description}</p>
            <div className="mt-4">
              <h4 className="text-lg text-purple-500 font-medium">Tech Stack:</h4>
              <ul className="text-gray-400 list-disc pl-6">
                {techStack.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex justify-between">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
              >
                GitHub
              </a>
              <a
                href={liveSite}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
              >
                Live Site
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ProjectCard;
