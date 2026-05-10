"use client";
import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { ProjectCardSkeleton } from "../components/Skeleton";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.error) {
          setError(data.error);
          setProjects([]);
        } else {
          setProjects(data);
        }
        setLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setError("Failed to load projects.");
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

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

        {error ? (
          <div className="text-center text-sm text-red-400 border border-red-900/40 bg-red-950/20 py-6">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => <ProjectCardSkeleton key={index} />)
              : projects.map((project) => <ProjectCard key={project._id || project.title} project={project} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
