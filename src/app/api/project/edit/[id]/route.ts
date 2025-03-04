import {connectDb} from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import Project from "@/models/project.model";
import { verifyToken } from "@/helpers/auth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get a single project
export async function GET(
  req: NextRequest,
) {
  await connectDb();
  try {
    
    // Await params before accessing id
    const url = new URL(req.url);
    const projectId = url.pathname.split('/').pop();
    
    if (!projectId) {
      return NextResponse.json(
        { success: false, error: "Project ID is required" },
        { status: 400 }
      );
    }
    
    const project = await Project.findById(projectId);
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(project);
    
  } catch (error) {
    console.error("Error fetching project:", error);
    const errorMessage = (error as Error).message;
    return NextResponse.json(
      { success: false, error: "Failed to fetch project", details: errorMessage },
      { status: 500 }
    );
  }
}

// Update a project
export async function PUT(req: NextRequest,) {
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
    
    const url = new URL(req.url);
    const projectId = url.pathname.split('/').pop();

    
    if (!projectId) {
      return NextResponse.json(
        { success: false, error: "Project ID is required" },
        { status: 400 }
      );
    }
    
    const project = await Project.findById(projectId);
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }
    
    const formData = await req.formData();
    
    // Get form fields
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const tags = formData.get("tags")?.toString()?.split(",").map(tag => tag.trim()) || [];
    const demoLink = formData.get("demoLink") as string || "";
    const githubLink = formData.get("githubLink") as string || "";
    const isPinned = formData.get("isPinned") === "true";
    const image = formData.get("image");
    
    // Update data object
    const updateData: any = {
      title,
      description,
      tags,
      demoLink,
      githubLink,
      isPinned,
    };
    
    // Upload new image if provided
    if (image instanceof Blob) {
      const imageBuffer = await image.arrayBuffer();
      const imageBase64 = Buffer.from(imageBuffer).toString("base64");
      const imageDataUrl = `data:${image.type};base64,${imageBase64}`;
      
      // Delete existing image if there is one
      if (project.cloudinaryId) {
        await new Promise((resolve, reject) => {
          cloudinary.uploader.destroy(
            project.cloudinaryId,
            (error: Error | undefined, result: any) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
        });
      }
      
      // Upload new image
      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          imageDataUrl,
          {
            folder: "portfolio_projects",
            transformation: [{ width: 1200, height: 630, crop: "fill" }]
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
      });
      
      // Add image data to update object
      updateData.imageUrl = uploadResult.secure_url;
      updateData.cloudinaryId = uploadResult.public_id;
    }
    
    // Update the project
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      updateData,
      { new: true }
    );
    
    return NextResponse.json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject
    });
    
  } catch (error) {
    console.error("Error updating project:", error);
    const errorMessage = (error as Error).message;
    return NextResponse.json(
      { success: false, error: "Failed to update project", details: errorMessage },
      { status: 500 }
    );
  }
}

// Delete a project
export async function DELETE(req: NextRequest,) {
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
    
    // Await params before accessing id
    const url = new URL(req.url);
    const projectId = url.pathname.split('/').pop();
    
    if (!projectId) {
      return NextResponse.json(
        { success: false, error: "Project ID is required" },
        { status: 400 }
      );
    }
    
    const project = await Project.findById(projectId);
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }
    
    // Delete image from Cloudinary if exists
    if (project.cloudinaryId) {
      await new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(
          project.cloudinaryId,
          (error: Error | undefined, result: any) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
      });
    }
    
    // Delete the project
    await Project.findByIdAndDelete(projectId);
    
    return NextResponse.json({
      success: true,
      message: "Project deleted successfully"
    });
    
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete project", details: (error as Error).message },
      { status: 500 }
    );
  }
}

// Update project status (PATCH for partial updates)
export async function PATCH(
  req: NextRequest,
 
) {
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
    
    // Await params before accessing id
    const url = new URL(req.url);
    const projectId = url.pathname.split('/').pop();
    
    if (!projectId) {
      return NextResponse.json(
        { success: false, error: "Project ID is required" },
        { status: 400 }
      );
    }
    
    const project = await Project.findById(projectId);
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }
    
    // Get JSON data for PATCH request
    const data = await req.json();
    
    // Update the project with partial data
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $set: data },
      { new: true }
    );
    
    return NextResponse.json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject
    });
    
  } catch (error) {
    console.error("Error updating project status:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update project", details: (error as Error).message },
      { status: 500 }
    );
  }
}



