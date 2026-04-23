"use client";

import React, { useState } from "react";
import Image from "next/image";
import SocialLinks from "../components/SocialLinks";
import { SparklesIcon } from "@heroicons/react/24/solid";

const AboutMe = () => {
  const [showCvPopup, setShowCvPopup] = useState(false);
  const cvPreviewLink = "https://drive.google.com/file/d/196nGI4ksNCEW7V9lCuSLtrMGE8H5e-Za/preview";

  return (
    <div id="about" className="relative min-h-screen w-full pt-24 pb-8">
      <section className="w-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 z-20 relative gap-10 lg:gap-16">
        <div className="flex flex-col w-full lg:w-1/2 gap-6 text-center lg:text-start">
          <div className="Welcome-box py-3 px-4 border border-slate-600 opacity-[0.9] flex items-center justify-center lg:justify-start mx-auto lg:mx-0">
            <SparklesIcon className="text-slate-300 mr-2 h-5 w-5" />
            <h1 className="Welcome-text text-sm lg:text-base font-semibold">I'm Ritam Vaskar</h1>
          </div>

          <div className="lg:hidden relative w-full h-[260px] flex justify-center items-center">
            <div className="relative w-[220px] h-[220px] border border-slate-700 p-3">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[190px] h-[190px] overflow-hidden border border-slate-700">
                  <Image src="/assets/ritam.jpeg" alt="Ritam Vaskar Avatar" fill className="object-cover" priority />
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold text-white">
            About <span className="text-slate-300">Me</span>
          </h1>

          <p className="text-gray-400 text-sm lg:text-lg leading-relaxed">
            Hello! I'm <span className="font-semibold text-slate-200">Ritam Vaskar</span>, a passionate Full Stack
            Web Developer and tech enthusiast. When I'm not crafting beautiful web experiences, I'm exploring the
            endless possibilities of new technologies. Whether it's debugging complex code or designing smooth user
            interfaces, I enjoy solving problems and turning ideas into reality.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center lg:justify-start">
            <button
              type="button"
              onClick={() => setShowCvPopup(true)}
              className="py-2 px-4 button-primary text-white border border-slate-600"
            >
              Download CV
            </button>
            <SocialLinks />
          </div>
        </div>

        <div className="hidden lg:flex relative w-full lg:w-1/2 h-[320px] sm:h-[380px] lg:h-[400px] justify-center items-center">
          <div className="relative w-[250px] h-[250px] lg:w-[300px] lg:h-[300px] border border-slate-700 p-3">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[220px] h-[220px] lg:w-[260px] lg:h-[260px] overflow-hidden border border-slate-700">
                <Image src="/assets/ritam.jpeg" alt="Ritam Vaskar Avatar" fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      {showCvPopup && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 sm:p-6">
          <div className="w-full max-w-4xl bg-slate-900 border border-slate-700">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
              <h3 className="text-white font-semibold text-sm sm:text-base">Ritam Vaskar - CV</h3>
              <button
                type="button"
                className="text-slate-200 hover:text-white"
                onClick={() => setShowCvPopup(false)}
              >
                Close
              </button>
            </div>
            <div className="h-[70vh] bg-slate-950">
              <iframe
                src={cvPreviewLink}
                title="Ritam Vaskar CV"
                className="w-full h-full"
                allow="autoplay"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutMe;
