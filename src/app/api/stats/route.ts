
import { connectDb } from "@/db";
import guestbookModel from "@/models/guestbook.model";
import messageModel from "@/models/message.model";
import Project from "@/models/project.model";
import ServiceRequest from "@/models/service.model";
import userModel from "@/models/user.model";
import visitorsModel from "@/models/visitors.model";
import { NextResponse } from "next/server";

export default async function GET() {
  await connectDb(); 

  try {
    const totalUsers = await userModel.find();
    const totalOrders = await guestbookModel.find()
    const totalProducts = await Project.find();
    const totalVisitors = await visitorsModel.find();
    const totalContactMessages = await messageModel.find();
    const totalServiceRequests = await ServiceRequest.find();



    const adminStats = {
      users: totalUsers,
      orders: totalOrders,
      products: totalProducts,
      Visitors: totalVisitors,
      contacts: totalContactMessages,
      services: totalServiceRequests
    };

    return NextResponse.json({ success: true, data: adminStats });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json({ success: false, message: "Server Error" });
  }
}
