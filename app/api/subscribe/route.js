import { NextResponse } from "next/server";
import connectDB from "../../../utils/mongodb";
import Subscriber from "../../../models/Subscriber";
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
    const admin = verifyAdmin(request);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const subscribers = await Subscriber.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(subscribers);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
