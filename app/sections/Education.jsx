"use client";

import React from "react";
import EducationCard from "../components/EducationCard";

const Education = () => {
  const educationData = [
    {
      institution: "KIIT University",
      degree: "B. Tech in Computer Science & Engineering",
      duration: "2023 - 2027",
      location: "Bhubaneswar, India",
      grade: "8.1 GPA",
      gradePercentage: 85,
      description: "4 years Undergraduate Course. Bachelor of Technology in Computer Science & Engineering.",
    },
    {
      institution: "Raghunathganj High School",
      degree: "Higher Secondary Education",
      duration: "2021 - 2023",
      location: "Raghunathganj, India",
      grade: "84%",
      gradePercentage: 84,
      description: "Science Stream. Physics, Chemistry, Mathematics, and Biology.",
    },
    {
      institution: "Sri Ramakrishna Siksha Niketan",
      degree: "Secondary Education",
      duration: "2008 - 2021",
      location: "Raghunathganj, India",
      grade: "97%",
      gradePercentage: 97,
      description: "10 years of Schooling. English, Bengali, Mathematics, Science, Social Science.",
    },
  ];

  return (
    <section className="relative min-h-screen w-full py-14 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl mx-auto">
        <div className="text-center mb-12 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-slate-300">Education</span> Journey
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Exploring the path of continuous learning and academic excellence
          </p>
        </div>

        <div className="relative">
          <div className="space-y-8 sm:space-y-10">
            {educationData.map((edu, index) => (
              <div key={edu.institution} className="relative">
                <div className="w-full">
                  <EducationCard data={edu} index={index} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
