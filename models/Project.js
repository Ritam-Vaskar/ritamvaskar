import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    techStack: [{ type: String }],
    github: { type: String, default: "" },
    liveSite: { type: String, default: "" },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

delete mongoose.models.Project;
export default mongoose.model("Project", ProjectSchema);
