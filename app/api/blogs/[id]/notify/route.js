import { NextResponse } from "next/server";
import connectDB from "../../../../../utils/mongodb";
import Blog from "../../../../../models/Blog";
import Subscriber from "../../../../../models/Subscriber";
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

export async function POST(request, { params }) {
  try {
    const admin = verifyAdmin(request);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const { id } = await params;
    
    const blog = await Blog.findById(id);
    if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

    // Fetch all verified subscribers
    const subscribers = await Subscriber.find({ verified: true });
    
    if (subscribers.length === 0) {
      return NextResponse.json({ success: true, message: "No verified subscribers to notify." });
    }

    const emails = subscribers.map(sub => sub.email);

    // Send broadcast email via Resend
    // Note: Free Resend tier limits to 100 emails/day, using bcc or batch is recommended.
    // For simplicity, we'll send a single email with multiple bcc or to.
    const { error } = await resend.emails.send({
      from: "Portfolio Updates <noreply@ritamvaskar.tech>",
      to: "subscribers@ritamvaskar.tech", // Dummy 'to', real recipients in 'bcc'
      bcc: emails,
      subject: `New Post: ${blog.title}`,
      html: `
        <h2>New Article Published!</h2>
        <p>I just published a new article: <strong>${blog.title}</strong></p>
        <p><em>${blog.excerpt}</em></p>
        <br/>
        <a href="https://ritamvaskar.tech/blog/${blog._id}/${blog.slug}" style="display:inline-block;padding:10px 20px;background:#334155;color:white;text-decoration:none;border-radius:4px;">Read the full article</a>
        <br/><br/>
        <p style="font-size:12px;color:#64748b;">You are receiving this because you subscribed to the newsletter.</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: `Notified ${emails.length} subscribers!` });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
