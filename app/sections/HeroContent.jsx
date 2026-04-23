"use client";

import React from "react";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const HeroContent = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center px-6 lg:px-20 mt-[90px] z-[20]">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-10 lg:gap-16">
        <div className="flex flex-col justify-center w-full text-center lg:text-start gap-6">
          <div className="Welcome-box py-3 px-4 border border-slate-600 opacity-[0.9] flex items-center justify-center lg:justify-start">
            <SparklesIcon className="text-slate-300 mr-2 h-5 w-5" />
            <h1 className="Welcome-text text-sm lg:text-base font-semibold">I'm Ritam Vaskar</h1>
          </div>

          <div className="flex flex-col gap-4 text-4xl lg:text-5xl text-white font-medium">
            Welcome <span className="text-slate-200 leading-[50px] lg:leading-[50px] font-semibold">To My Universe</span>
          </div>

          <p className="text-sm lg:text-[17px] lg:leading-normal text-justify text-gray-300 my-4 lg:my-1 max-w-[600px] mx-auto lg:mx-0">
            I'm a cosmic explorer in the vast universe of code, I navigate the galaxies of Full Stack Development,
            crafting stellar web experiences that shine across the digital cosmos. 🚀 From debugging black holes of
            complex code to designing smooth, nebula-like user interfaces, I thrive on solving challenges and bringing
            ideas to life like constellations forming in the night sky. ✨ Fueled by curiosity and the infinite
            possibilities of technology, I chart new frontiers, always seeking the next innovation among the stars. 🌌💻
          </p>

          <a
            className="py-2 px-4 button-primary text-center text-white cursor-pointer max-w-[200px] mx-auto lg:mx-0"
            href="https://drive.google.com/file/d/196nGI4ksNCEW7V9lCuSLtrMGE8H5e-Za/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CV
          </a>
        </div>

        <div className="relative w-full h-full flex justify-center items-center">
          <div className="relative w-[250px] h-[300px] lg:w-[400px] lg:h-[460px]">
            <Image
              src="/assets/mainIconsdark.svg"
              alt="icons"
              height={600}
              width={600}
              priority
              className="transition-opacity duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
