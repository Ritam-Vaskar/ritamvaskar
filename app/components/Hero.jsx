"use client"
import React, { useEffect, useState } from "react";
import HeroContent from "../sections/HeroContent";

const Hero = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const numParticles = 50;
    const newParticles = Array.from({ length: numParticles }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 3,
    }));
    setParticles(newParticles);
  }, []);

  const handleMouseMove = (e) => {
    const root = document.documentElement;
    root.style.setProperty("--mouse-x", `${e.clientX}px`);
    root.style.setProperty("--mouse-y", `${e.clientY}px`);
  };

  return (
    <div
      className="relative flex flex-col h-full w-full overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="rotate-180 absolute top-[-220px] lg:top-[-220px] md:top-[-220px] sm:top-[-400px] xs:top-[-400px] left-0 w-full h-full object-cover z-[-2]"
      >
        <source src="/assets/blackhole.webm" type="video/webm" />
      </video>

      {/* Custom Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="particle absolute rounded-full bg-white opacity-70"
              style={{
                top: `${particle.y}%`,
                left: `${particle.x}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animation: `float ${particle.duration}s ease-in-out infinite`,
                animationDelay: `${particle.delay}s`,
              }}
            ></div>
          ))}

          
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10">
        <HeroContent />
      </div>

      {/* Hover Effect Styles */}
      <style jsx>{`
        .particle {
          transition: transform 0.3s ease-in-out;
        }

        .particle:hover {
          transform: scale(1.5);
          background: rgba(255, 255, 255, 0.9);
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
