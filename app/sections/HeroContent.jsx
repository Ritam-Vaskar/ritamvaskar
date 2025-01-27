"use client";

import React from "react";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motion";

const HeroContent = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center px-6 lg:px-20 mt-[70px] z-[20]">
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
            <h1 className="Welcome-text text-sm lg:text-base font-semibold">I'm Ritam Vaskar</h1>
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
            className="text-sm lg:text-lg text-gray-400 my-4 lg:my-1 max-w-[600px] mx-auto lg:mx-0"
          >
            I'm a B. Tech CSE student by day, a Full Stack Web Developer by night, and a Coding Enthusiast 24/7. My hobbies include breaking code just to fix it again and sneaking a taste of every new tech like it's dessert at a buffet. Basically, I debug for fun and devour tech trends for breakfast!
          </motion.p>

          {/* Call-to-Action Button */}
          <motion.div
            className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px] mx-auto lg:mx-0 bg-gradient-to-r from-purple-600 to-indigo-500 hover:shadow-lg hover:scale-105 transition-transform duration-300"
            variants={slideInFromTop(0.5)}
          >
            Learn More!
          </motion.div>
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
