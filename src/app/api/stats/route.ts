import { connectDb } from "@/db";
import guestbookModel from "@/models/guestbook.model";
import messageModel from "@/models/message.model";
import Project from "@/models/project.model";
import ServiceRequest from "@/models/service.model";
import userModel from "@/models/user.model";
import visitorsModel from "@/models/visitors.model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDb();

  try {
    // Basic counts
    const totalUsers = await userModel.countDocuments();
    const totalGuestbook = await guestbookModel.countDocuments();
    const totalProducts = await Project.countDocuments();
    const totalVisitors = await visitorsModel.countDocuments();
    const totalContactMessages = await messageModel.countDocuments();
    const totalServiceRequests = await ServiceRequest.countDocuments();

    // Time-based metrics (for trend charts)
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);
    
    // Get users by registration date (last 30 days)
    const usersByDate = await userModel.aggregate([
      { $match: { createdAt: { $gte: lastMonth } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    // Get visitors by date (last 30 days)
    const visitorsByDate = await visitorsModel.aggregate([
      { $match: { visitDate: { $gte: lastMonth } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$visitDate" } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    // Get projects by category
    const projectsByCategory = await Project.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get service requests by status
    const serviceRequestsByStatus = await ServiceRequest.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    // Get most recent items for quick overview
    const recentUsers = await userModel.find().sort({ createdAt: -1 }).limit(5).select('name email createdAt');
    const recentGuestbooks = await guestbookModel.find().sort({ createdAt: -1 }).limit(5);
    const recentMessages = await messageModel.find().sort({ createdAt: -1 }).limit(5).select('name email subject createdAt');

    // Format data for dashboard
    const adminStats = {
      summary: {
        totalUsers,
        totalGuestbook,
        totalProducts,
        totalVisitors,
        totalContactMessages,
        totalServiceRequests
      },
      charts: {
        userGrowth: usersByDate,
        visitorTrends: visitorsByDate,
        projectCategories: projectsByCategory,
        serviceStatuses: serviceRequestsByStatus
      },
      recent: {
        users: recentUsers,
        guestbooks: recentGuestbooks,
        messages: recentMessages
      }
    };

    return NextResponse.json({ success: true, data: adminStats });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json({ success: false, message: "Server Error" });
  }
}