import mongoose from "mongoose";

const mongoUrl = process.env.MONGODB_URI as string;

if (!mongoUrl) {
  throw new Error("MONGO_URL environment variable is not set.");
}

export async function connectDb() {
  if (mongoose.connection.readyState === 1) {
    console.log(" Using existing database connection");
    return;
  }

  try {
    await mongoose.connect(mongoUrl, {
      connectTimeoutMS: 10000, 
      socketTimeoutMS: 45000,  
    });

    console.log("Connected to MongoDB");

  } catch (error) {
    console.error(" Failed to connect to MongoDB:", error);
    throw new Error("Database connection error");
  }
}
