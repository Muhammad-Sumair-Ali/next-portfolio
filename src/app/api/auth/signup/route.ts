import connectDB from "@/db";
import userModel from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest) {
  await connectDB();
  try {
    const { name, email, password, role } = await req.json();

    // Validate input
    if (!name || !email || !password) {
      return Response.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return Response.json(
        { message: "Email already in use" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    return Response.json( 
      {
        user: newUser,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "Error creating user", error },
      { status: 500 }
    );
  }
}
