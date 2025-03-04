import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/db";
import messageModel from "@/models/message.model";
import { verifyToken } from "@/helpers/auth";

// Handle POST request
export async function POST(req: NextRequest) {
  await connectDb();
  try {
    const { name, email, subject, message, services } = await req.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required!" },
        { status: 400 }
      );
    }

    // Validate email format using regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address!" },
        { status: 400 }
      );
    }

    // Save to database
    const newMessage = await messageModel.create({
      name,
      email,
      subject,
      message,
      services,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
      data: newMessage,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error!" }, { status: 500 });
  }
}

// Handle GET request
export async function GET(req: NextRequest) {
  await connectDb();
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify user from token
    const token = authHeader.split(" ")[1];
    const user = verifyToken(token);

    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Access Denied" }, { status: 403 });
    }

    const messages = await messageModel.find();
    return NextResponse.json(
      { success: true, data: messages },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error!" }, { status: 500 });
  }
}
