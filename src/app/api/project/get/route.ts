import { NextRequest, NextResponse } from "next/server";
import {connectDb} from "@/db";
import Project from "@/models/project.model";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Get all projects
export async function GET(req: NextRequest) {
  await connectDb();
  try {
    
    const { searchParams } = new URL(req.url);
    const pinnedOnly = searchParams.get("pinned") === "true";
    const tag = searchParams.get("tag");
    
    // Build query object
    let query: any = {};
    
    if (pinnedOnly) {
      query.isPinned = true;
    }
    
    if (tag) {
      query.tags = { $in: [tag] };
    }
    
    // Fetch projects with query
    const projects = await Project.find(query).sort({ isPinned: -1, createdAt: -1 });
    
    // Return the projects
    return NextResponse.json(projects);
    
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}