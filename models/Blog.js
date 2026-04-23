import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, default: "" },
    author: { type: String, default: "Ritam Vaskar" },
    tags: [{ type: String }],
    readTime: { type: Number, default: 5 },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Auto-generate slug from title if not provided
BlogSchema.pre("validate", function () {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  // Calculate read time from content (~200 words per minute)
  if (this.content && !this.readTime) {
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.max(1, Math.ceil(wordCount / 200));
  }
});

// Force recreation in Next.js development (clears hot-reload cache)
mongoose.models = {};
export default mongoose.model("Blog", BlogSchema);
