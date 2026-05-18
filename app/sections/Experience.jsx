import React from "react";
import ExperienceCard from "../components/ExperienceCard";
import connectDB from "../../utils/mongodb";
import ExperienceModel from "../../models/Experience";

const Experience = async () => {
  let experiences = [];
  try {
    await connectDB();
    const experiencesData = await ExperienceModel.find()
      .sort({ createdAt: -1 })
      .lean();
    experiences = JSON.parse(JSON.stringify(experiencesData));
  } catch (error) {
    console.error("Failed to fetch experiences:", error);
  }

  return (
    <section className="w-full py-10 px-4 sm:px-6 flex flex-col items-center">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional <span className="text-slate-300">Experience</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">A journey through my professional growth and achievements</p>
        </div>

        {experiences.length === 0 ? (
          <div className="text-center py-16 border border-slate-700 bg-slate-900">
            <p className="text-gray-400">No experiences added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
            {experiences.map((experience, index) => (
              <div key={experience._id} className="h-full">
                <ExperienceCard experience={experience} index={index} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
