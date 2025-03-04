import mongoose from "mongoose";
let isConnected = false;


const mongoUrl = process.env.MONGODB_URI;
const connectDB = async () => {
  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }
  try {
    if (mongoose.connection.readyState >= 1) return;
    if (!mongoUrl) {
      throw new Error("MONGO_URL is not defined in the environment variables");
    } 
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUrl, {
      dbName: "portfolio",
      connectTimeoutMS: 10000, // Increase connection timeout
      socketTimeoutMS: 45000,  // Prevent timeouts during operations
      serverSelectionTimeoutMS: 10000, // Wait time for server selection
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    if (error instanceof Error) {
      console.error("MongoDB connection error details:", {
        message: error.message,
        code: (error as any).code,
        stack: error.stack
      });
    } else {
      console.error("MongoDB connection error details:", error);
    }
    throw new Error(`MongoDB connection failed: ${(error as Error).message}`);
  }
}

export default connectDB;

