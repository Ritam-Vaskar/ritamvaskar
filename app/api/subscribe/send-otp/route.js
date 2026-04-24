import { NextResponse } from "next/server";
import connectDB from "../../../../utils/mongodb";
import Subscriber from "../../../../models/Subscriber";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
}

export async function POST(request) {
  try {
    await connectDB();
    const { email } = await request.json();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      if (subscriber.verified) {
        return NextResponse.json({ error: "Email is already subscribed" }, { status: 400 });
      }
      subscriber.otp = otp;
      subscriber.otpExpires = otpExpires;
      await subscriber.save();
    } else {
      subscriber = await Subscriber.create({ email, otp, otpExpires });
    }

    const { error } = await resend.emails.send({
      from: "Portfolio Newsletter <noreply@ritamvaskar.tech>",
      to: email,
      subject: "Verify your Newsletter Subscription",
      html: `
        <h2>Verify your email</h2>
        <p>Your OTP code to subscribe to the newsletter is: <strong>${otp}</strong></p>
        <p>This code will expire in 10 minutes.</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "OTP sent" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
