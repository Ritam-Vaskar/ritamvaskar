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
      companyBanner: "https://cdn.prod.website-files.com/67aa2520eb413205a7dac909/67ae48e9f9239af1b55c496e_WhatsApp%20Image%202024-11-10%20at%2013.26.42_8e6d68b9.jpg",
      symbol: "🚀",
      location: "Bhubaneswar, India",
      duration: "2024 - Present",
      companyUrl: "https://www.fedkiit.com/",
      positions: [
        { title: "Senior Technichal Executive", duration: "Dec 2024 - Present" },
        { title: "Technichal Executive", duration: "Feb 2024 - Dec 2024" },
      ],
      description:
        "Led development of FED KIIT website. Mentored junior developers and contributed to technical decision-making.",
      achievements: [
        "Took a vital role to revamp the website of FEDKIIT and increased the user engagement a lot.",
        "Gain a lot of experience in the field of web development and software engineering.",
        "Worked as a Organizing committee member in the FEDKIIT's Events.",
      ],
      testimonial: {
        text: "You are one of the most hardworking and talented tech guys I know. Your problem-solving skills and dedication to getting things done always stand out.",
        name: "Anurag Prasoon",
        role: "President of FED KIIT",
        avatar: "https://res.cloudinary.com/dm6jd6bhk/image/upload/v1738263837/MemberImages/rw7vxvlbu9d5kg215y3k.jpg",
      },
      credential: "https://www.linkedin.com/posts/fedkiit_introducing-the-all-new-fed-website-all-activity-7233050965287845888-EDqz?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQG05YB92YP5rPxTB6tKNufHojM5Ig5mfE",
    },
    {
      company: "Sri Ramakrishna Siksha Niketan",
      title: "Full Stack Developer",
      logo: "/assets/srsn.png",
      companyBanner: "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/6713bd34be2521c91c45aefb_301128514_562327412349985_3679940258914638492_n.jpg",
      symbol: "💡",
      location: "Remote",
      duration: "Aug 2024 - Dec 2024",
      companyUrl: "https://sriramkrishnasikshaniketan.me/",
      positions: [{ title: "Full Stack Developer", duration: "Aug 2024 - Dec 2024" }],
      description:
        "Developed and maintained full-stack applications using React, Node.js, MongoDB and Express.",
      achievements: [
        "Built and launched the projects with 90% satisfaction rate",
        "Managed over 600 Admissions applications of the school",
        "We're making Alumni Network for the school by this website.",
      ],
      testimonial: {
        text: "Your Work has significantly enhanced our digital presence and communication with the community.",
        name: "S.N. Roy",
        role: "Headmaster of SRSN",
        avatar: "http://res.cloudinary.com/dodpgohuc/image/upload/v1730649954/icflzgjjujzmrqumftry.jpg",
      },
      credential: "https://drive.google.com/file/d/1ACSl8_TUfjyJIW94bTJArOydj8vL86np/view?usp=sharing",
    },

    {
      company: "SSIB Security",
      title: "FreeLance Web Developer",
      logo: "/assets/ssib.png",
      companyBanner: "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/6834404e821734e4ccd6a3bc_481659659_597651189916030_2603637933769140281_n.jpg",
      symbol: "💡",
      location: "Raghunathganj, India (Remote)",
      duration: "May 2025 - June 2025",
      companyUrl: "https://ssib.vercel.app/",
      positions: [{ title: "FreeLance Web Developer", duration: "May 2025 - June 2025" }],
      description:
        "Developed and maintained full-stack applications using React, Node.js, MongoDB and Express.",
      achievements: [
        "Built and launched the projects with 90% satisfaction rate",
        "Managed Security Recruitment and Client Apllications",
        "Digitalized the whole process of Security-Client interaction",
      ],
      testimonial: {
        text: "Your Work digitalized the whole process of Security-Client interaction and made it more efficient.",
        name: "SSIB Security",
        role: "Security Service Provider",
        avatar: "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/6832f233c430f8f88d751a46_WhatsApp_Image_2025-05-24_at_16.34.24_0df7a67d-removebg-preview.png",
      },
      credential: "https://ssib.vercel.app/",
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
