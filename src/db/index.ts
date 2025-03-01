import mongoose from "mongoose";
let isConnected = false;
const connectDB = async () => {
  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }
  try {
    if (mongoose.connection.readyState >= 1) return;
    const mongoUrl = process.env.MONGODB_URI;
    if (!mongoUrl) {
      throw new Error("MONGO_URL is not defined in the environment variables");
    }
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUrl);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Error connecting to MongoDB");
  }
};

export default connectDB;

