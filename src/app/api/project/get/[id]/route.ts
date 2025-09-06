import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/db";
import Project from "@/models/project.model";

// GET single project by ID
export async function GET(
  req: NextRequest,
) {
  await connectDb();
  try {
    
    // Await params before accessing id
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is Required " },
        { status: 404 }
      );
    }
    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch project",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
