"use client";
import React from "react";
import { motion } from "framer-motion";
import ExperienceCard from "../components/ExperienceCard";

const Experience = () => {
  const experiences = [
    {
      company: "FED KIIT",
      title: "Senior Technichal Executive",
      logo: "/assets/fed_logo.png",
      companyBanner: "/api/placeholder/1200/400",
      symbol: "🚀",
      location: "San Francisco, CA",
      duration: "2020 - Present",
      companyUrl: "https://techcorp.com",
      positions: [
        { title: "Senior Software Engineer", duration: "2022 - Present" },
        { title: "Software Engineer", duration: "2020 - 2022" },
      ],
      description:
        "Led development of cloud-native applications and microservices architecture. Mentored junior developers and contributed to technical decision-making.",
      achievements: [
        "Reduced system latency by 40% through optimization of database queries and caching strategies",
        "Led the migration of legacy systems to modern cloud architecture, reducing operational costs by 60%",
        "Implemented CI/CD pipeline reducing deployment time from days to hours",
      ],
      testimonial: {
        text: "An exceptional engineer who combines technical excellence with great leadership skills. Their contributions have been instrumental in our team's success.",
        name: "Sarah Johnson",
        role: "Engineering Director",
        avatar: "/api/placeholder/100/100",
      },
      credential: "https://credential.com/12345",
    },
    {
      company: "InnovateLabs",
      title: "Full Stack Developer",
      logo: "/api/placeholder/200/200",
      companyBanner: "/api/placeholder/1200/400",
      symbol: "💡",
      location: "New York, NY",
      duration: "2018 - 2020",
      companyUrl: "https://innovatelabs.com",
      positions: [{ title: "Full Stack Developer", duration: "2018 - 2020" }],
      description:
        "Developed and maintained full-stack applications using React, Node.js, and AWS.",
      achievements: [
        "Built and launched 3 major client projects with 100% satisfaction rate",
        "Implemented automated testing reducing bug reports by 70%",
        "Created reusable component library used across multiple projects",
      ],
      credential: "https://credential.com/67890",
    },
  ];

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
    <section className="relative min-h-screen w-[100%] py-20 px-4 overflow-hidden flex flex-col items-center">
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
        
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Animated Circles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              border: "1px solid rgba(139, 92, 246, 0.1)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional <span className="text-purple-500">Experience</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A journey through my professional growth and achievements
          </p>
          <motion.div
            className="mt-6 h-1 w-24 mx-auto bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
            whileInView={{ scale: [0, 1] }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <ExperienceCard experience={experience} />
            </motion.div>
          ))}
        </div>

        {/* Bottom Decoration
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10">
            <motion.div
              className="w-8 h-8 rounded-full bg-purple-500"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default Experience;
