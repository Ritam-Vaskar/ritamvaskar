"use client";
import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    image: "https://media.licdn.com/dms/image/v2/D5622AQEhsg1HpBFApw/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1730994898703?e=1741219200&v=beta&t=PFvYmvElqjQk192WDxJoH8lxsx1G59pR0QsRMy7e48s",
    title: "Project 1",
    shortDescription: "A brief overview of Project 1.",
    description: "Full description of Project 1 with details about the work done.",
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/your-repo/project1",
    liveSite: "https://your-project1-live-site.com",
  },
  {
    image: "https://media.licdn.com/dms/image/v2/D5622AQHRzllt4Vfp3Q/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1724493731551?e=1741219200&v=beta&t=lu-fva-Tqkc0j3yPm5m5hPRr3UlS4GGppC9kkPov78A",
    title: "Project 2",
    shortDescription: "A brief overview of Project 2.",
    description: "Full description of Project 2 with details about the work done.",
    techStack: ["Vue", "Django", "PostgreSQL"],
    github: "https://github.com/your-repo/project2",
    liveSite: "https://your-project2-live-site.com",
  },
  {
    image: "https://media.licdn.com/dms/image/v2/D5622AQEhsg1HpBFApw/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1730994898703?e=1741219200&v=beta&t=PFvYmvElqjQk192WDxJoH8lxsx1G59pR0QsRMy7e48s",
    title: "Project 1",
    shortDescription: "A brief overview of Project 1.",
    description: "Full description of Project 1 with details about the work done.",
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/your-repo/project1",
    liveSite: "https://your-project1-live-site.com",
  },
  {
    image: "https://media.licdn.com/dms/image/v2/D5622AQHRzllt4Vfp3Q/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1724493731551?e=1741219200&v=beta&t=lu-fva-Tqkc0j3yPm5m5hPRr3UlS4GGppC9kkPov78A",
    title: "Project 2",
    shortDescription: "A brief overview of Project 2.",
    description: "Full description of Project 2 with details about the work done.",
    techStack: ["Vue", "Django", "PostgreSQL"],
    github: "https://github.com/your-repo/project2",
    liveSite: "https://your-project2-live-site.com",
  },
  {
    image: "https://media.licdn.com/dms/image/v2/D5622AQEhsg1HpBFApw/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1730994898703?e=1741219200&v=beta&t=PFvYmvElqjQk192WDxJoH8lxsx1G59pR0QsRMy7e48s",
    title: "Project 1",
    shortDescription: "A brief overview of Project 1.",
    description: "Full description of Project 1 with details about the work done.",
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/your-repo/project1",
    liveSite: "https://your-project1-live-site.com",
  },
  {
    image: "https://media.licdn.com/dms/image/v2/D5622AQHRzllt4Vfp3Q/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1724493731551?e=1741219200&v=beta&t=lu-fva-Tqkc0j3yPm5m5hPRr3UlS4GGppC9kkPov78A",
    title: "Project 2",
    shortDescription: "A brief overview of Project 2.",
    description: "Full description of Project 2 with details about the work done.",
    techStack: ["Vue", "Django", "PostgreSQL"],
    github: "https://github.com/your-repo/project2",
    liveSite: "https://your-project2-live-site.com",
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
