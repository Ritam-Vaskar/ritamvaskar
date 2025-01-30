"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SocialLinks from "../components/SocialLinks";

const slideInFromLeft = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay },
  },
});

const slideInFromRight = (delay) => ({
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay },
  },
});

const AboutMe = () => {
  return (
    <div className="relative min-h-screen w-full">
      
      <section className="w-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 mt-16 z-20 relative">
        {/* Left Section */}
        <motion.div
          className="flex flex-col w-full lg:w-1/2 gap-6 text-center lg:text-start"
          initial="hidden"
          animate="visible"
          variants={slideInFromLeft(0.5)}
        >
          <h1 className="text-3xl lg:text-5xl font-bold text-white">
            About <span className="text-purple-500">Me</span>
          </h1>

          <p className="text-gray-400 text-sm lg:text-lg leading-relaxed">
            Hello! I'm{" "}
            <span className="font-semibold text-purple-500">Ritam Vaskar</span>,
            a passionate Full Stack Web Developer and tech enthusiast. When I'm
            not crafting beautiful web experiences, I'm exploring the endless
            possibilities of new technologies. Whether it's debugging complex
            code or designing smooth user interfaces, I enjoy solving problems
            and turning ideas into reality.
          </p>

          <motion.div
            className="mt-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 px-4 rounded-lg shadow-lg backdrop-blur-sm"
            variants={slideInFromLeft(0.8)}
          >
            Fun Fact: I dream of making tech more accessible, one project at a
            time!
          </motion.div>
        </motion.div>

        {/* Right Section with Animation */}
        <motion.div
          className="relative w-full lg:w-1/2 h-[400px] flex justify-center items-center"
          initial="hidden"
          animate="visible"
          variants={slideInFromRight(0.5)}
        >
          <div className="relative w-[250px] h-[250px] lg:w-[300px] lg:h-[300px]">
            {/* Animated Background Circles */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-indigo-500/30 rounded-full backdrop-blur-sm"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-full backdrop-blur-sm"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Avatar Image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="relative w-[220px] h-[220px] lg:w-[260px] lg:h-[260px] rounded-full overflow-hidden"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.1, // Increase the scale on hover
                  transition: { duration: 0.3 }, // Smooth transition
                }}
              >
                <Image
                  src="/assets/ritam.jpeg"
                  alt="Ritam Vaskar Avatar"
                  fill
                  className="rounded-full object-cover shadow-lg"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
      <SocialLinks />
    </div>
  );
};

export default AboutMe;
