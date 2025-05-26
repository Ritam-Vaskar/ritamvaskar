"use client";
import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    image: "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/68344243f121e1425cd909d3_Screenshot%202025-05-26%20155812.png", 
    title: "School Website",
    shortDescription: "Sri Ramakrishna Siksha Niketan",
    description: "Full description of Project 1 with details about the work done.",
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://sriramkrishnasikshaniketan.me/source",
    liveSite: "https://sriramkrishnasikshaniketan.me/",
  },
  {
    image: "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/6834422a58f0ebe311f95408_Screenshot%202025-05-26%20155742.png",
    title: "FED KIIT",
    shortDescription: "A student body of KIIT TBI",
    description: "It's a student body of KIIT TBI who aim to empower the next generation of entrepreneurs to innovate, lead, and transform the future.",
    techStack: ["React", "Mongo & Prisma", "Express", "Node.js", "SCSS"],
    github: "https://github.com/fed-tech/FED-Frontend.git",
    liveSite: "https://www.fedkiit.com/",
  },
  {
    image: "https://cdn.prod.website-files.com/67aa2520eb413205a7dac909/67ae56f9a71598c1249a9e48_Screenshot%202025-02-14%20020231.png",
    title: "K-1000",
    shortDescription: "Website for kiit research Center",
    description: "Embark on a journey of innovation and discovery with KIIT's premier research initiative. Shape the future through groundbreaking research and global collaborations.",
    techStack: ["React", "SCSS", "Framer-Motion", "Vercel"],
    github: "https://github.com/Ritam-Vaskar/k-1000.git",
    liveSite: "https://k-1000.vercel.app/",
  },
  {
    image: "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/6834431153700a9fd2e84f06_Screenshot%202025-05-25%20212045.png",
    title: "SSIB Security Services",
    shortDescription: "Security Services and Management",
    description: "SSIB Security Services is a leading provider of comprehensive security solutions, dedicated to ensuring the safety and protection of individuals and businesses.",
    techStack: ["React", "MongoDB", "Express", "Node.js", "Modular CSS"],
    github: "https://github.com/Ritam-Vaskar/ssib",
    liveSite: "https://ssib.vercel.app/",
  },
];

const ProjectsPage = () => {
  const cardAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const floatingAnimation = {
    animate: {
      y: [0, 15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen  py-12 px-6 relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 blur-lg"
          variants={floatingAnimation}
          animate="animate"
        />
        <motion.div
          className="absolute top-40 left-10 w-16 h-16 rounded-full bg-purple-500/30 blur-sm"
          variants={floatingAnimation}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-40 right-20 w-24 h-24 rounded-full bg-indigo-500/30 blur-sm"
          variants={floatingAnimation}
          animate="animate"
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-12 h-12 rounded-full bg-pink-500/30 blur-sm"
          variants={floatingAnimation}
          animate="animate"
        />
      </div>

      {/* Content Container */}
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-purple-500">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore some of the most exciting projects I’ve worked on, showcasing my skills and passion for web development.
          </p>
          <motion.div
            className="mt-6 h-1 w-24 mx-auto bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
            whileInView={{ scale: [0, 1] }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardAnimation}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
