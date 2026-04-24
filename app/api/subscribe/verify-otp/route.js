import { NextResponse } from "next/server";
import connectDB from "../../../../utils/mongodb";
import Subscriber from "../../../../models/Subscriber";

export async function POST(request) {
  try {
    await connectDB();
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
    }

    const subscriber = await Subscriber.findOne({ email });

    if (!subscriber) {
      return NextResponse.json({ error: "Subscriber not found" }, { status: 404 });
    }

    if (subscriber.verified) {
      return NextResponse.json({ error: "Already verified" }, { status: 400 });
    }

    if (subscriber.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    if (new Date() > new Date(subscriber.otpExpires)) {
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
    }

    subscriber.verified = true;
    subscriber.otp = undefined;
    subscriber.otpExpires = undefined;
    await subscriber.save();

    return NextResponse.json({ success: true, message: "Subscription confirmed!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
