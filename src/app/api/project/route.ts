import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db";
import Project from "@/models/project.model";
import cloudinary from "@/lib/cloudinary"; // Configure Cloudinary

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const image = formData.get("image"); // Uploaded image file

    if (!title || !description || !image) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary
    const arrayBuffer = await (image as File).arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uploadRes = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${buffer.toString("base64")}`
    );

    const newProject = new Project({
      title,
      description,
      imageUrl: uploadRes.secure_url, // Save Cloudinary URL
    });

    await newProject.save();

    return NextResponse.json(
      { message: "Project added successfully", project: newProject },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
