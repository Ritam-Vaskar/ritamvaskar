"use client";
import React from "react";
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
  {
    image: "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/69b12fd1b8c99754ee156ac1_Screenshot%202026-03-11%20142955.png",
    title: "FAKTCHECK",
    shortDescription: "Quiz & Coding Contest Platform",
    description: "A powerful, secure, and scalable platform built to host customized quiz & coding contests with ease.",
    techStack: ["MongoDB", "Express", "React", "Node.js", "Judge0"],
    github: "https://github.com/Ritam-Vaskar/KodingKulture.git",
    liveSite: "https://faktcheck.fedkiit.com/",
  },
  {
    image: "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/69b12fd1c0493ab06357dab0_Screenshot%202026-03-11%20143056.png",
    title: "STAYSYNC",
    shortDescription: "Stay Management Platform For MICE event and Destination Weddings",
    description: "An intelligent stay management platform For MICE event and Destination Weddings featuring AI-powered recommendations, real-time synchronization, and integrated communication tools.",
    techStack: ["MongoDB", "Express", "React", "Node.js", "QdrantDB", "OpenAI", "Redis", "Zustand", "Telegram BOT"],
    github: "https://github.com/Ritam-Vaskar/SyncStay.git",
    liveSite: "https://staysync.fedkiit.com/",
  },
];

const ProjectsPage = () => {
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-slate-300">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore some of the most exciting projects I have worked on, showcasing my skills and passion for web development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
