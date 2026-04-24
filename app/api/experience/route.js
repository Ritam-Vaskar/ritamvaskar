import { NextResponse } from "next/server";
import connectDB from "../../../utils/mongodb";
import Experience from "../../../models/Experience";
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

export async function GET() {
  try {
    await connectDB();
    const experiences = await Experience.find().sort({ createdAt: -1 });
    return NextResponse.json(experiences);
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
    const newExperience = await Experience.create(data);
    return NextResponse.json(newExperience);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
