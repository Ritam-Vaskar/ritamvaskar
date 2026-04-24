import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    title: { type: String, required: true },
    logo: { type: String },
    companyBanner: { type: String },
    symbol: { type: String },
    location: { type: String },
    duration: { type: String },
    companyUrl: { type: String },
    positions: [
      {
        title: { type: String },
        duration: { type: String },
      }
    ],
    description: { type: String },
    achievements: [{ type: String }],
    testimonial: {
      text: { type: String },
      name: { type: String },
      role: { type: String },
      avatar: { type: String },
    },
    credential: { type: String },
  },
  { timestamps: true }
);

delete mongoose.models.Experience;
export default mongoose.model("Experience", ExperienceSchema);
