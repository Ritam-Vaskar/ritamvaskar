"use client";
import React from "react";
import { motion } from "framer-motion";

const Skills = () => {
  const skills = [
    { name: "C/C++", image: "/assets/react.png" },
    { name: "Java", image: "/assets/react.png" },
    { name: "React", image: "/assets/react.png" },
    { name: "Node.js", image: "/assets/node-js.png" },
    { name: "MongoDB", image: "/assets/mongodb.png" },
    { name: "SQL", image: "/assets/mysql.png" },
    { name: "Express.js", image: "/assets/express.png" },
    { name: "JavaScript", image: "/assets/js.png" },
    { name: "Next", image: "/assets/next.png" },
    { name: "CSS & SCSS", image: "/assets/css.png" },
    { name: "HTML", image: "/assets/html.png" },
    { name: "Tailwind CSS", image: "/assets/tailwind.png" },
    { name: "Git", image: "/assets/gitwhite.png" },
    { name: "Framer", image: "/assets/framer.png" },
  ];

  const floatingAnimation = {
    animate: {
      y: ["0px", "-15px", "0px"],
      x: ["0px", "15px", "-15px", "0px"],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const hoverAnimation = {
    whileHover: {
      scale: 1.1,
      rotate: 8,
      transition: { duration: 0.4 },
    },
    whileTap: {
      scale: 0.95,
      rotate: -15,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section className="relative min-h-screen w-full py-12 px-4 overflow-hidden flex flex-col items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-10 left-20 w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 blur-xl"
          variants={floatingAnimation}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-purple-500/30 blur-md"
          variants={floatingAnimation}
          animate="animate"
        />
      </div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          My <span className="text-purple-500">Skills</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          A blend of technology, creativity, and efficiency in every stack I use.
        </p>
        <motion.div
          className="mt-6 h-1 w-24 mx-auto bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </motion.div>

      {/* Skills Grid */}
      <div className="relative grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-8 max-w-6xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="relative w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-4 shadow-lg hover:shadow-xl"
            variants={hoverAnimation}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            <motion.img
              src={skill.image}
              alt={skill.name}
              className="w-full h-full object-contain"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            />
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-purple-500/10 rounded-2xl"
              variants={{
                whileHover: { scale: 1.1, opacity: 0.4 },
              }}
            />
            <h3 className="absolute bottom-2 left-2 text-white text-sm font-medium">
              {skill.name}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
