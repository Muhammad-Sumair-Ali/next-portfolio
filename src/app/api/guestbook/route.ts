import { NextRequest, NextResponse } from "next/server";
import Guestbook from "@/models/guestbook.model";
import { auth } from "../../../../auth";
import { connectDb } from "@/db";

export async function GET() {
  await connectDb();

  
  try {
    const messages = await Guestbook.find().sort({ createdAt: -1 });
    
    const formattedMessages = messages.map(msg => ({
      id: msg._id.toString(),
      name: msg.username || "Anonymous",
      message: msg.message,
      avatar: msg.profileUrl || "",
      date: new Date(msg.createdAt).toLocaleDateString(),
    }));
    
    return NextResponse.json(formattedMessages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ success: false, message: "Error fetching messages" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await connectDb();
  const session = await auth();
  
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  
  try {
    const { message } = await req.json();
    
    if (!message || message.trim().length < 1) {
      return NextResponse.json({ success: false, message: "Message cannot be empty" }, { status: 400 });
    }
    
    const newMessage = await Guestbook.create({
      userId: session.user?.id,
      username: session.user?.name,
      email: session.user?.email,
      profileUrl: session.user?.image,
      message,
      likes: []
    });
    
    return NextResponse.json({ success: true, data: newMessage }, { status: 201 });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json({ success: false, message: "Error saving message" }, { status: 500 });
  }
}

