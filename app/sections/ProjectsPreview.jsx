"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

const featuredProjects = [
  {
    title: "STAYSYNC",
    shortDescription: "AI-powered Stay Management Platform",
    techStack: ["React", "Node.js", "OpenAI", "Redis"],
    liveSite: "https://staysync.fedkiit.com/",
  },
  {
    title: "FAKTCHECK",
    shortDescription: "Quiz & Coding Contest Platform",
    techStack: ["React", "Node.js", "MongoDB", "Judge0"],
    liveSite: "https://faktcheck.fedkiit.com/",
  },
  {
    title: "FED KIIT",
    shortDescription: "Student body of KIIT TBI",
    techStack: ["React", "Prisma", "Express", "SCSS"],
    liveSite: "https://www.fedkiit.com/",
  },
];

const ProjectsPreview = () => {
  return (
    <section className="w-full py-14 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            My <span className="text-slate-300">Projects</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Some highlights from my recent work
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4 mb-8">
          {featuredProjects.map((project) => (
            <div
              key={project.title}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 p-4 sm:p-5 border border-slate-700 bg-slate-900 hover:border-slate-500 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-base sm:text-lg">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-slate-800 border border-slate-700 text-gray-400 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={project.liveSite}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-300 text-xs sm:text-sm hover:text-white transition-colors shrink-0"
              >
                <ExternalLink size={14} />
                Visit
              </a>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 border border-slate-600 text-white text-sm font-medium hover:bg-slate-700 transition-colors group"
          >
            View All Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPreview;
