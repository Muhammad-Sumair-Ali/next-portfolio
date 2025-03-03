
import connectDB from "@/db";
import userModel from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export async function POST(req:NextRequest) {
  await connectDB();
  try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return Response.json({ message: "All fields are required" }, { status: 400 });
    }

    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return Response.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // Generate token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET as string, { expiresIn: "7d" });

    return Response.json({ message: "Login successful", token, user: { id: user._id, name: user.name, role: user.role } }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error logging in", error }, { status: 500 });
  }
}
