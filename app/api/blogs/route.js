import { NextResponse } from "next/server";
import connectDB from "../../../utils/mongodb";
import Blog from "../../../models/Blog";
import jwt from "jsonwebtoken";

function verifyAdmin(request) {
  const token = request.cookies.get("admin_token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

function calculateReadTime(content) {
  if (!content) return 1;
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

// GET all blogs (public: only published, admin: all)
export async function GET(request) {
  try {
    await connectDB();
    const admin = verifyAdmin(request);
    const filter = admin ? {} : { published: true };
    const blogs = await Blog.find(filter).sort({ createdAt: -1 }).lean();
    const serialized = blogs.map((b) => ({
      ...b,
      _id: b._id.toString(),
      readTime: calculateReadTime(b.content),
    }));
    return NextResponse.json(serialized);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST create blog (admin only)
export async function POST(request) {
  try {
    const admin = verifyAdmin(request);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const data = await request.json();

    // Ensure slug is generated
    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    }

    data.readTime = calculateReadTime(data.content);

    const blog = await Blog.create(data);
    return NextResponse.json({ ...blog.toObject(), _id: blog._id.toString() }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
