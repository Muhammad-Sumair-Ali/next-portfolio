import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db";
import Project from "@/models/project.model";
import { auth } from "../../../../../auth";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create a new project
export async function POST(req: NextRequest) {
  await connectDB();
  
  try {
    // Get the current session to verify admin status
    const session = await auth();
    
    // Uncomment this when you're ready to enforce authentication
    // if (!session || !session.user.isAdmin) {
    //   return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    // }
    
    const formData = await req.formData();
    
    // Get form fields
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const tags = formData.get("tags")?.toString()?.split(",").map(tag => tag.trim()) || [];
    const demoLink = formData.get("demoLink") as string || "";
    const githubLink = formData.get("githubLink") as string || "";
    const isPinned = formData.get("isPinned") === "true";
    const image = formData.get("image");
    
    // Validate required fields
    if (!title || !description || !image) {
      return NextResponse.json(
        { error: "Title, description, and image are required" },
        { status: 400 }
      );
    }
    
    // Upload image to Cloudinary
    if (!(image instanceof Blob)) {
      return NextResponse.json({ error: "Invalid image format" }, { status: 400 });
    }
    
    const imageBuffer = await image.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString("base64");
    const imageDataUrl = `data:${image.type};base64,${imageBase64}`;
    
    const uploadResult = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
      cloudinary.uploader.upload(
        imageDataUrl,
        {
          folder: "portfolio_projects",
          transformation: [{ width: 1200, height: 630, crop: "fill" }]
        },
        (error, result) => {
          if (error) reject(error);
          else if (result) resolve(result);
          else reject(new Error("Upload result is undefined"));
        }
      );
    });
    
    // Create new project
    const newProject = await Project.create({
      title,
      description,
      imageUrl: uploadResult.secure_url,
      cloudinaryId: uploadResult.public_id,
      tags,
      isPinned,
      demoLink,
      githubLink,
      createdBy: session?.user?.id || "anonymous",
    });
    
    // Return the created project
    return NextResponse.json({
      success: true,
      message: "Project added successfully",
      project: newProject,
    }, { status: 201 });
    
  } catch (error) {
    console.error("Error adding project:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: "Failed to add project", details: errorMessage },
      { status: 500 }
    );
  }
}

