"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Skills = () => {
  const [activeTab, setActiveTab] = useState(0);

  const skillDomains = [
    {
      title: "Frontend Development",
      icon: "🎨",
      color: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      skills: [
        { name: "React.js", image: "/assets/react.png", level: 90 },
        { name: "Next.js", image: "/assets/next.png", level: 75 },
        { name: "JavaScript", image: "/assets/js.png", level: 80 },
        { name: "HTML", image: "/assets/html.png", level: 95 },
        { name: "CSS & SCSS", image: "/assets/css.png", level: 90 },
        { name: "Tailwind CSS", image: "/assets/tailwind.png", level: 75 },
        { name: "Framer Motion", image: "/assets/framer.png", level: 85 }
      ]
    },
    {
      title: "Backend Development",
      icon: "⚙️",
      color: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      skills: [
        { name: "Node.js", image: "/assets/node-js.png", level: 88 },
        { name: "Express.js", image: "/assets/express.png", level: 85 },
        { name: "Flask", image: "https://img.icons8.com/?size=100&id=ewGOClUtmFX4&format=png&color=000000", level: 70 },
        { name: "REST API", image: "https://img.icons8.com/?size=100&id=MX92yo3ozHJD&format=png&color=000000", level: 87 }
      ]
    },
    {
      title: "Programming Languages",
      icon: "💻",
      color: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/10 to-emerald-500/10",
      skills: [
        { name: "C/C++", image: "https://img.icons8.com/?size=100&id=40669&format=png&color=000000", level: 80 },
        { name: "Java", image: "https://img.icons8.com/?size=100&id=13679&format=png&color=000000", level: 80 },
        { name: "Python", image: "https://img.icons8.com/?size=100&id=13441&format=png&color=000000", level: 75 },
        { name: "JavaScript", image: "/assets/js.png", level: 80 }
      ]
    },
    {
      title: "Database Management",
      icon: "🗄️",
      color: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/10 to-red-500/10",
      skills: [
        { name: "MongoDB", image: "/assets/mongodb.png", level: 85 },
        { name: "SQL", image: "/assets/mysql.png", level: 80 },
        { name: "Prisma", image: "https://img.icons8.com/?size=100&id=zJh5Gyrd6ZKu&format=png&color=000000", level: 80 }
      ]
    },
    {
      title: "Operating System",
      icon: "🐧",
      color: "from-gray-500 to-slate-500",
      bgGradient: "from-gray-500/10 to-slate-500/10",
      skills: [
        { name: "Windows", image: "https://img.icons8.com/?size=100&id=108792&format=png&color=000000", level: 90 },
        { name: "Linux", image: "https://img.icons8.com/?size=100&id=17842&format=png&color=000000", level: 75 },
        { name: "Shell Scripting", image: "https://img.icons8.com/?size=100&id=9MJf0ngDwS8z&format=png&color=000000", level: 78 },
        { name: "Git", image: "/assets/gitwhite.png", level: 88 }
      ]
    },
    {
      title: "SEO & Analytics",
      icon: "📊",
      color: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-500/10 to-purple-500/10",
      skills: [
        { name: "SEO Optimization", image: "https://img.icons8.com/?size=100&id=43625&format=png&color=000000", level: 82 },
        { name: "Google Analytics", image: "https://img.icons8.com/?size=100&id=avtI03bQMwX3&format=png&color=000000", level: 70 },
        { name: "Search Console", image: "https://img.icons8.com/?size=100&id=17949&format=png&color=000000", level: 85 }
      ]
    },
    {
      title: "Data & Web Scraping",
      icon: "🔍",
      color: "from-teal-500 to-green-500",
      bgGradient: "from-teal-500/10 to-green-500/10",
      skills: [
        { name: "Python Data Tools", image: "https://img.icons8.com/?size=100&id=xSkewUSqtErH&format=png&color=000000", level: 75 },
        { name: "Web Scraping", image: "https://img.icons8.com/?size=100&id=71257&format=png&color=000000", level: 78 },
        { name: "Data Analysis", image: "https://img.icons8.com/?size=100&id=CLvQeiwFpit4&format=png&color=000000", level: 70 }
      ]
    }
  ];

  const tabVariants = {
    inactive: { 
      scale: 0.95, 
      opacity: 0.6,
      y: 10
    },
    active: { 
      scale: 1, 
      opacity: 1,
      y: 5,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  const skillCardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }),
    hover: {
      scale: 1.05,
      y: -5,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="relative min-h-screen w-full py-8 sm:py-12 md:py-16 px-3 sm:px-4 overflow-hidden">
      {/* Animated Background - Mobile Optimized */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-2xl sm:blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -25, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-56 sm:w-72 md:w-80 h-56 sm:h-72 md:h-80 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-2xl sm:blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Header - Mobile Optimized */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 sm:mb-12 md:mb-16 px-4"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
          Technical <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Expertise</span>
        </h2>
        <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-2">
          Mastering diverse technologies across domains to build exceptional digital experiences
        </p>
        <motion.div
          className="mt-4 sm:mt-6 md:mt-8 h-1 w-24 sm:w-28 md:w-32 mx-auto bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full"
          whileInView={{ scaleX: [0, 1] }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>

      {/* Tab Navigation - Mobile Optimized */}
      <div className="mb-8 max-w-7xl mx-auto">
        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden">
          <div className="flex gap-3 overflow-x-auto pb-4 px-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {skillDomains.map((domain, index) => (
              <motion.button
                key={index}
                className={`flex-shrink-0 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 backdrop-blur-sm border whitespace-nowrap ${
                  activeTab === index
                    ? `bg-gradient-to-r ${domain.color} text-white shadow-lg border-transparent`
                    : 'bg-gray-800/50 text-gray-300 border-gray-700'
                }`}
                variants={tabVariants}
                animate={activeTab === index ? "active" : "inactive"}
                onClick={() => setActiveTab(index)}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2 text-base">{domain.icon}</span>
                <span className="text-xs">{domain.title}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Desktop: Flex Wrap */}
        <div className="hidden md:flex flex-wrap justify-center gap-3">
          {skillDomains.map((domain, index) => (
            <motion.button
              key={index}
              className={`px-6 py-3 rounded-2xl font-semibold text-base transition-all duration-300 backdrop-blur-sm border ${
                activeTab === index
                  ? `bg-gradient-to-r ${domain.color} text-white shadow-lg border-transparent`
                  : 'bg-gray-800/50 text-gray-300 hover:text-white border-gray-700 hover:border-gray-600'
              }`}
              variants={tabVariants}
              animate={activeTab === index ? "active" : "inactive"}
              onClick={() => setActiveTab(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2 text-lg">{domain.icon}</span>
              {domain.title}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Skills Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Domain Title - Mobile Optimized */}
          <motion.div
            className={`text-center mb-8 p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br ${skillDomains[activeTab].bgGradient} backdrop-blur-sm border border-gray-700/50`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-4xl sm:text-5xl md:text-6xl mb-3 md:mb-4">{skillDomains[activeTab].icon}</div>
            <h3 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r ${skillDomains[activeTab].color} bg-clip-text text-transparent mb-2 md:mb-4`}>
              {skillDomains[activeTab].title}
            </h3>
          </motion.div>

          {/* Skills Grid - Mobile: 2 per row, Desktop: responsive */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {skillDomains[activeTab].skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="relative group"
                variants={skillCardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                custom={index}
              >
                <div className={`relative p-3 sm:p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 shadow-xl backdrop-blur-sm group-hover:border-gray-600 transition-all duration-300`}>
                  {/* Skill Icon - Mobile Optimized */}
                  <div className="relative mb-3 md:mb-4">
                    <div className={`absolute inset-0 bg-gradient-to-br ${skillDomains[activeTab].color} rounded-lg md:rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                    <img
                      src={skill.image}
                      alt={skill.name}
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-16 md:h-16 mx-auto object-contain relative z-10"
                    />
                  </div>

                  {/* Skill Name - Mobile Optimized */}
                  <h4 className="text-white font-semibold text-center mb-2 sm:mb-3 text-xs sm:text-sm md:text-base leading-tight px-1">
                    {skill.name}
                  </h4>

                  {/* Skill Level - Mobile Optimized */}
                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-xs">Level</span>
                      <span className="text-gray-300 text-xs font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2">
                      <motion.div
                        className={`h-1.5 sm:h-2 rounded-full bg-gradient-to-r ${skillDomains[activeTab].color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${skillDomains[activeTab].color} rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Skills;