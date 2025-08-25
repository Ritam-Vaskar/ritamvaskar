"use client";

import React from "react";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";

const HeroContent = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center px-6 lg:px-20 mt-[90px] z-[20]">
      <motion.div
        initial="hidden"
        animate="visible"
        transition="ease-in-out"
        className="flex flex-col lg:flex-row items-center justify-between w-full gap-10 lg:gap-16"
      >
        {/* Left Section */}
        <div className="flex flex-col justify-center w-full text-center lg:text-start gap-6">
          {/* Welcome Box */}
          <motion.div
            className="Welcome-box py-3 px-4 border border-[#7042f88b] opacity-[0.9] flex items-center justify-center lg:justify-start"
            variants={slideInFromTop(0.5)}
          >
            <SparklesIcon className="text-[#b49bff] mr-2 h-5 w-5" />
            <h1 className="Welcome-text text-sm lg:text-base font-semibold">
              I'm Ritam Vaskar
            </h1>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            variants={slideInFromLeft(0.5)}
            className="flex flex-col gap-4 text-4xl lg:text-5xl text-white font-medium"
          >
            Welcome{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 leading-[50px] lg:leading-[50px] font-semibold">
              To My Universe
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={slideInFromLeft(0.8)}
            className="text-sm lg:text-[17px] lg:leading-normal text-justify text-gray-400 my-4 lg:my-1 max-w-[600px] mx-auto lg:mx-0"
          >
            I'm a cosmic explorer in the vast universe of code, I navigate the
            galaxies of Full Stack Development, crafting stellar web experiences
            that shine across the digital cosmos. 🚀 From debugging black holes
            of complex code to designing smooth, nebula-like user interfaces, I
            thrive on solving challenges and bringing ideas to life like
            constellations forming in the night sky. ✨ Fueled by curiosity and
            the infinite possibilities of technology, I chart new frontiers,
            always seeking the next innovation among the stars. 🌌💻
          </motion.p>

          {/* Call-to-Action Button */}
          <motion.a
            className="py-2 px-4 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px] mx-auto lg:mx-0 bg-gradient-to-r from-purple-600 to-indigo-500 hover:shadow-lg hover:scale-105 transition-transform duration-300"
            variants={slideInFromTop(0.5)}
            href="https://drive.google.com/file/d/1MNuzQynCwMfXprPhPKgaoeKa6jCKQsge/view?usp=drive_link"
            target="_blank" // Opens in a new tab
            rel="noopener noreferrer" // Security best practice
          >
            Download CV
          </motion.a>
        </div>

        {/* Right Section (Animated Image) */}
        <motion.div
          className="relative w-full h-full flex justify-center items-center"
          variants={slideInFromRight(0.5)}
        >
          <motion.div
            className="group relative w-[250px] h-[300px] lg:w-[400px] lg:h-[460px] cursor-pointer"
            whileHover={{
              scale: 1.1,
              rotate: 10,
              transition: { duration: 0.5 },
            }}
          >
            <Image
              src="/assets/mainIconsdark.svg"
              alt="icons"
              height={600}
              width={600}
              priority
              className="rounded-xl transition-shadow duration-300"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroContent;
