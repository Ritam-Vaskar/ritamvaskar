import { NextResponse } from "next/server";
import connectDB from "../../../utils/mongodb";
import Review from "../../../models/Review";
import { Resend } from "resend";
import jwt from "jsonwebtoken";

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const reviews = await Review.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, email, content, blogTitle } = await request.json();

    if (!name || !email || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save to Database
    await connectDB();
    const newReview = await Review.create({ name, email, content, blogTitle });

    // Send Email
    const { data, error } = await resend.emails.send({
      from: "Portfolio Reviews <noreply@ritamvaskar.tech>",
      to: process.env.ADMIN_EMAIL || "ritamvaskar0@gmail.com",
      subject: `New Blog Review from ${name} on "${blogTitle || "Your Blog"}"`,
      html: `
        <h2>New Blog Review</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Blog Title:</strong> ${blogTitle || "N/A"}</p>
        <hr />
        <p><strong>Review Content:</strong></p>
        <p>${content}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      // Even if email fails, we stored it in the DB, so we shouldn't fail completely.
    }

    return NextResponse.json({ success: true, data: newReview });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
