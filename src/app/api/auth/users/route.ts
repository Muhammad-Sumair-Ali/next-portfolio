import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/helpers/auth";
import { connectDb } from "@/db";

export async function GET(req:NextRequest) {
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

    // Fetch all users
    const users = await userModel.find().select("-password");

    return NextResponse.json({ 
      data: users, 
      message: "Users fetched successfully" 
    });

  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
