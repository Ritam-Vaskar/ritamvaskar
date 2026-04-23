import { NextResponse } from "next/server";
import connectDB from "../../../utils/mongodb";
import Certification from "../../../models/Certification";
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
    const certifications = await Certification.find({}).sort({ createdAt: -1 }).lean();
    const serialized = certifications.map((c) => ({ ...c, _id: c._id.toString() }));
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
    const cert = await Certification.create(data);
    return NextResponse.json({ ...cert.toObject(), _id: cert._id.toString() }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
