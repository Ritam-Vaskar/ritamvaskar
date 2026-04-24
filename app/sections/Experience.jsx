import React from "react";
import ExperienceCard from "../components/ExperienceCard";
import connectDB from "../../utils/mongodb";
import ExperienceModel from "../../models/Experience";

const Experience = async () => {
  await connectDB();
  // Fetch experiences from DB and sort by chronological order or creation
  const experiencesData = await ExperienceModel.find().lean();
  
  // Sort them manually or if there's a logic, right now just map them
  const experiences = JSON.parse(JSON.stringify(experiencesData));

  return (
    <section className="w-full py-10 px-4 sm:px-6 flex flex-col items-center">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional <span className="text-slate-300">Experience</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">A journey through my professional growth and achievements</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          {experiences.map((experience, index) => (
            <div key={experience.company} className="h-full">
              <ExperienceCard experience={experience} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
