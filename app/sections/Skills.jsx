"use client";

import React, { useRef, useEffect, useState } from "react";
import BlurImage from "../components/BlurImage";
import { Skeleton } from "../components/Skeleton";

export const skillDomains = [
  {
    title: "Frontend Development",
    icon: "🎨",
    skills: [
      { name: "React.js", image: "/assets/react.png", level: 90 },
      { name: "Next.js", image: "/assets/next.png", level: 75 },
      { name: "JavaScript", image: "/assets/js.png", level: 80 },
      { name: "HTML", image: "/assets/html.png", level: 95 },
      { name: "CSS & SCSS", image: "/assets/css.png", level: 90 },
      { name: "Tailwind CSS", image: "/assets/tailwind.png", level: 75 },
      { name: "Framer Motion", image: "/assets/framer.png", level: 85 },
    ],
  },
  {
    title: "Backend Development",
    icon: "⚙️",
    skills: [
      { name: "Node.js", image: "/assets/node-js.png", level: 88 },
      { name: "Express.js", image: "/assets/express.png", level: 85 },
      { name: "Flask", image: "https://img.icons8.com/?size=100&id=ewGOClUtmFX4&format=png&color=000000", level: 70 },
      { name: "REST API", image: "https://img.icons8.com/?size=100&id=MX92yo3ozHJD&format=png&color=000000", level: 87 },
    ],
  },
  {
    title: "DevOps",
    icon: "☁️",
    skills: [
      { name: "Git & Github", image: "https://img.icons8.com/?size=100&id=12599&format=png&color=FFFFFF", level: 85 },
      { name: "Docker", image: "https://img.icons8.com/?size=100&id=22813&format=png&color=000000", level: 75 },
      { name: "AWS", image: "https://img.icons8.com/?size=100&id=33039&format=png&color=000000", level: 70 },
      { name: "Azure", image: "https://img.icons8.com/?size=100&id=VLKafOkk3sBX&format=png&color=000000", level: 70 },
    ],
  },
  {
    title: "Programming Languages",
    icon: "💻",
    skills: [
      { name: "C/C++", image: "https://img.icons8.com/?size=100&id=40669&format=png&color=000000", level: 80 },
      { name: "Java", image: "https://img.icons8.com/?size=100&id=13679&format=png&color=000000", level: 80 },
      { name: "Python", image: "https://img.icons8.com/?size=100&id=13441&format=png&color=000000", level: 75 },
      { name: "JavaScript", image: "/assets/js.png", level: 80 },
    ],
  },
  {
    title: "Database Management",
    icon: "🗄️",
    skills: [
      { name: "MongoDB", image: "/assets/mongodb.png", level: 85 },
      { name: "SQL", image: "/assets/mysql.png", level: 80 },
      { name: "Prisma", image: "https://img.icons8.com/?size=100&id=zJh5Gyrd6ZKu&format=png&color=000000", level: 80 },
    ],
  },
  {
    title: "Operating System",
    icon: "🐧",
    skills: [
      { name: "Windows", image: "https://img.icons8.com/?size=100&id=108792&format=png&color=000000", level: 90 },
      { name: "Linux", image: "https://img.icons8.com/?size=100&id=17842&format=png&color=000000", level: 75 },
      { name: "Shell Scripting", image: "https://img.icons8.com/?size=100&id=9MJf0ngDwS8z&format=png&color=000000", level: 78 },
    ],
  },
  {
    title: "AI (Generative & Agentic)",
    icon: "🤖",
    skills: [
      { name: "ChatGPT", image: "https://img.icons8.com/?size=100&id=FBO05Dys9QCg&format=png&color=FFFFFF", level: 85 },
      { name: "Chroma DB", image: "https://img.icons8.com/?size=100&id=13271&format=png&color=FFFFFF", level: 80 },
      { name: "Qdrant DB", image: "https://img.icons8.com/?size=100&id=13271&format=png&color=FFFFFF", level: 75 },
      { name: "Embeddings", image: "https://img.icons8.com/?size=100&id=103328&format=png&color=FFFFFF", level: 85 },
      { name: "RAG", image: "https://img.icons8.com/?size=100&id=51296&format=png&color=FFFFFF", level: 85 },
      { name: "MCP", image: "https://img.icons8.com/?size=100&id=114330&format=png&color=FFFFFF", level: 70 },
      { name: "AI Agents", image: "https://img.icons8.com/?size=100&id=114321&format=png&color=FFFFFF", level: 75 },
      { name: "Prompt Engineering", image: "https://img.icons8.com/?size=100&id=63308&format=png&color=FFFFFF", level: 90 },
    ],
  },
  {
    title: "SEO & Analytics",
    icon: "📊",
    skills: [
      { name: "SEO Optimization", image: "https://img.icons8.com/?size=100&id=43625&format=png&color=000000", level: 82 },
      { name: "Google Analytics", image: "https://img.icons8.com/?size=100&id=avtI03bQMwX3&format=png&color=000000", level: 70 },
      { name: "Search Console", image: "https://img.icons8.com/?size=100&id=17949&format=png&color=000000", level: 85 },
    ],
  },
  {
    title: "Data & Web Scraping",
    icon: "🔍",
    skills: [
      { name: "Python Data Tools", image: "https://img.icons8.com/?size=100&id=xSkewUSqtErH&format=png&color=000000", level: 75 },
      { name: "Web Scraping", image: "https://img.icons8.com/?size=100&id=71257&format=png&color=000000", level: 78 },
      { name: "Data Analysis", image: "https://img.icons8.com/?size=100&id=CLvQeiwFpit4&format=png&color=000000", level: 70 },
    ],
  },
];

// Animated skill bar component
const SkillBar = ({ level }) => {
  const barRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), 200);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={barRef} className="w-full bg-slate-700 h-2">
      <div
        className="h-2 bg-slate-400 transition-all duration-1000 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

const Skills = () => {
  return (
    <section className="w-full py-10 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Technical <span className="text-slate-300">Expertise</span>
        </h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto mt-4">
          Mastering diverse technologies across domains to build exceptional digital experiences
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-10">
        {skillDomains.map((domain) => (
          <div key={domain.title}>
            {/* Domain header */}
            <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-700">
              <span className="text-2xl sm:text-3xl">{domain.icon}</span>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                {domain.title}
              </h3>
              <span className="ml-auto text-xs text-gray-500 border border-slate-700 px-2 py-1 bg-slate-900">
                {domain.skills.length} skills
              </span>
            </div>

            {/* Skills grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 sm:gap-4">
              {domain.skills.map((skill) => (
                <div
                  key={`${domain.title}-${skill.name}`}
                  className="p-3 sm:p-4 border border-slate-700 bg-slate-900 hover:border-slate-500 transition-colors group"
                >
                  <div className="mb-2 sm:mb-3">
                    <BlurImage
                      src={skill.image}
                      alt={skill.name}
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto object-contain"
                      containerClassName="flex justify-center"
                    />
                  </div>
                  <h4 className="text-white font-semibold text-center mb-2 text-xs sm:text-sm">
                    {skill.name}
                  </h4>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] sm:text-xs">
                      <span className="text-gray-500">Level</span>
                      <span className="text-gray-300 font-semibold">{skill.level}%</span>
                    </div>
                    <SkillBar level={skill.level} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
