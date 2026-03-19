import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI ??
  "mongodb+srv://Kibet:Langat28@cluster0.th0twgs.mongodb.net/checkered-flag?retryWrites=true&w=majority&appName=Cluster0";

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
