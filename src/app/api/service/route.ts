
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { connectDb } from "@/db";
import ServiceRequest from "@/models/service.model";
import { verifyToken } from "@/helpers/auth";

interface ServiceRequest {
  name: string;
  email: string;
  serviceType: string;
  message: string;
  userId: string;
  createdAt: Date;
  status: "pending" | "in-progress" | "completed" | "cancelled";
}

export async function POST(req: NextRequest) {
    try {
      await connectDb()
    // Get the current user session
    const session = await auth();
    
    // Check if the user is authenticated
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You must be logged in to request a service" }, 
        { status: 401 }
      );
    }

    // Get request data
    const { name, email, serviceType, message } = await req.json();
    
    // Validate required fields
    if (!name || !email || !serviceType || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    
       const newService = await ServiceRequest.create({
        name,
        email,
        serviceType,
        message,
        userId: session.user.id, 
        createdAt: new Date(),
        status: "pending"
       });


    return NextResponse.json({
      success: true,
      message: "Service request submitted successfully",
      fromData: newService
    }, { status: 201 });
    
  } catch (error) {
    console.error("Error submitting service request:", error);
    return NextResponse.json(
      { error: "Failed to submit service request" },
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest) {
  try {
    await connectDb()
    // Get the current user session

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
    const userRequests = await ServiceRequest.find()
    
    return NextResponse.json({
      success: true,
      requests: userRequests
    });
    
  } catch (error) {
    console.error("Error retrieving service requests:", error);
    return NextResponse.json(
      { error: "Failed to retrieve service requests" },
      { status: 500 }
    );
  }
}