"use client";
import React from "react";
import HeroContent from "../sections/HeroContent";

const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full overflow-hidden">
      <div className="relative z-10">
        <HeroContent />
      </div>
    </div>
  );
};

export default Hero;
