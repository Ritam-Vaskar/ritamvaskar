"use client";

import React, { useState } from "react";

const Skills = () => {
  const [activeTab, setActiveTab] = useState(0);

  const skillDomains = [
    {
      title: "Frontend Development",
      icon: "🎨",
      color: "bg-slate-700",
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
      color: "bg-slate-700",
      skills: [
        { name: "Node.js", image: "/assets/node-js.png", level: 88 },
        { name: "Express.js", image: "/assets/express.png", level: 85 },
        { name: "Flask", image: "https://img.icons8.com/?size=100&id=ewGOClUtmFX4&format=png&color=000000", level: 70 },
        { name: "REST API", image: "https://img.icons8.com/?size=100&id=MX92yo3ozHJD&format=png&color=000000", level: 87 },
      ],
    },
    {
      title: "Programming Languages",
      icon: "💻",
      color: "bg-slate-700",
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
      color: "bg-slate-700",
      skills: [
        { name: "MongoDB", image: "/assets/mongodb.png", level: 85 },
        { name: "SQL", image: "/assets/mysql.png", level: 80 },
        { name: "Prisma", image: "https://img.icons8.com/?size=100&id=zJh5Gyrd6ZKu&format=png&color=000000", level: 80 },
      ],
    },
    {
      title: "Operating System",
      icon: "🐧",
      color: "bg-slate-700",
      skills: [
        { name: "Windows", image: "https://img.icons8.com/?size=100&id=108792&format=png&color=000000", level: 90 },
        { name: "Linux", image: "https://img.icons8.com/?size=100&id=17842&format=png&color=000000", level: 75 },
        { name: "Shell Scripting", image: "https://img.icons8.com/?size=100&id=9MJf0ngDwS8z&format=png&color=000000", level: 78 },
        { name: "Git", image: "/assets/gitwhite.png", level: 88 },
      ],
    },
    {
      title: "SEO & Analytics",
      icon: "📊",
      color: "bg-slate-700",
      skills: [
        { name: "SEO Optimization", image: "https://img.icons8.com/?size=100&id=43625&format=png&color=000000", level: 82 },
        { name: "Google Analytics", image: "https://img.icons8.com/?size=100&id=avtI03bQMwX3&format=png&color=000000", level: 70 },
        { name: "Search Console", image: "https://img.icons8.com/?size=100&id=17949&format=png&color=000000", level: 85 },
      ],
    },
    {
      title: "Data & Web Scraping",
      icon: "🔍",
      color: "bg-slate-700",
      skills: [
        { name: "Python Data Tools", image: "https://img.icons8.com/?size=100&id=xSkewUSqtErH&format=png&color=000000", level: 75 },
        { name: "Web Scraping", image: "https://img.icons8.com/?size=100&id=71257&format=png&color=000000", level: 78 },
        { name: "Data Analysis", image: "https://img.icons8.com/?size=100&id=CLvQeiwFpit4&format=png&color=000000", level: 70 },
      ],
    },
  ];

  return (
    <section className="min-h-screen w-full py-10 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Technical <span className="text-slate-300">Expertise</span>
        </h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto mt-4">
          Mastering diverse technologies across domains to build exceptional digital experiences
        </p>
      </div>

      <div className="mb-8 max-w-7xl mx-auto">
        <div className="flex gap-3 overflow-x-auto pb-4 md:flex-wrap md:justify-center">
          {skillDomains.map((domain, index) => (
            <button
              key={domain.title}
              className={`px-4 py-3 border text-sm md:text-base whitespace-nowrap transition-colors ${
                activeTab === index
                  ? "bg-slate-700 text-white border-slate-500"
                  : "bg-slate-900 text-gray-300 border-slate-700 hover:border-slate-500"
              }`}
              onClick={() => setActiveTab(index)}
            >
              <span className="mr-2">{domain.icon}</span>
              {domain.title}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 p-4 border border-slate-700 bg-slate-900">
          <div className="text-4xl mb-2">{skillDomains[activeTab].icon}</div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{skillDomains[activeTab].title}</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {skillDomains[activeTab].skills.map((skill) => (
            <div key={skill.name} className="p-4 border border-slate-700 bg-slate-900">
              <div className="mb-3">
                <img src={skill.image} alt={skill.name} className="w-10 h-10 md:w-12 md:h-12 mx-auto object-contain" />
              </div>
              <h4 className="text-white font-semibold text-center mb-3 text-sm md:text-base">{skill.name}</h4>
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Level</span>
                  <span className="text-gray-300 font-semibold">{skill.level}%</span>
                </div>
                <div className="w-full bg-slate-700 h-2">
                  <div className={`${skillDomains[activeTab].color} h-2`} style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
