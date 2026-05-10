import { NextResponse } from "next/server";
import connectDB from "../../../utils/mongodb";
import Project from "../../../models/Project";
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

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const limit = searchParams.get("limit");

    const query = featured === "true" ? { featured: true } : {};
    let cursor = Project.find(query).sort({ createdAt: -1 });
    if (limit) cursor = cursor.limit(Number(limit));

    const projects = await cursor.lean();
    const serialized = projects.map((p) => ({ ...p, _id: p._id.toString() }));
    return NextResponse.json(serialized);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const admin = verifyAdmin(request);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const data = await request.json();
    const created = await Project.create(data);
    return NextResponse.json({ ...created.toObject(), _id: created._id.toString() }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
