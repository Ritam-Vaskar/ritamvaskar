import mongoose from "mongoose";

const CertificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    issuerLogo: { type: String, default: "" },
    date: { type: String, required: true },
    credentialId: { type: String, default: "" },
    credentialUrl: { type: String, default: "" },
    image: { type: String, default: "" },
    skills: [{ type: String }],
  },
  { timestamps: true }
);

// Force recreation in Next.js development (clears hot-reload cache)
mongoose.models = {};

export default mongoose.models.Certification || mongoose.model("Certification", CertificationSchema);
