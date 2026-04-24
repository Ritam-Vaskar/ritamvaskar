import mongoose from "mongoose";

const SubscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    verified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpires: { type: Date },
  },
  { timestamps: true }
);

delete mongoose.models.Subscriber;
export default mongoose.model("Subscriber", SubscriberSchema);
