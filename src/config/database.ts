import mongoose from "mongoose";
import dotenv from "dotenv";

console.log("🗄️ Database configuration module loaded");

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/crawlingDepths";

console.log(
  `🔗 MongoDB URI configured: ${MONGODB_URI.replace(/\/\/.*@/, "//***:***@")}`
);

export const connectDB = async () => {
  console.log("🔄 Initiating database connection...");
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected successfully");
    console.log(
      `📊 Database: ${mongoose.connection.db?.databaseName || "Unknown"}`
    );
    console.log(`🔌 Connection state: ${mongoose.connection.readyState}`);

    // Log connection events
    mongoose.connection.on("error", (error) => {
      console.error("❌ MongoDB connection error:", error);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("🔌 MongoDB disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("🔄 MongoDB reconnected");
    });
  } catch (error) {
    console.error("💥 MongoDB connection failed:", error);
    console.error("🔍 Error details:", {
      name: (error as Error).name,
      message: (error as Error).message,
      stack: (error as Error).stack,
    });
    process.exit(1);
  }
};
