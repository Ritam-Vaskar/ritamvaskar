import { NextResponse } from "next/server";
import connectDB from "../../../../utils/mongodb";
import Certification from "../../../../models/Certification";
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

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const cert = await Certification.findById(id).lean();
    if (!cert) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ...cert, _id: cert._id.toString() });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const admin = verifyAdmin(request);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const { id } = await params;
    const data = await request.json();

    const cert = await Certification.findByIdAndUpdate(id, data, { new: true }).lean();
    if (!cert) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ...cert, _id: cert._id.toString() });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const admin = verifyAdmin(request);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const { id } = await params;
    const cert = await Certification.findByIdAndDelete(id);
    if (!cert) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
