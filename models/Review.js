import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    content: { type: String, required: true },
    blogTitle: { type: String, required: true },
  },
  { timestamps: true }
);

delete mongoose.models.Review;
export default mongoose.model("Review", ReviewSchema);
