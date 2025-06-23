import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import mapRoutes from "./routes/map";
import playerRoutes from "./routes/player";

console.log("🚀 Starting server initialization...");

dotenv.config();
console.log("✅ Environment variables loaded");

const app = express();
const port = process.env.PORT || 3001;
console.log(`📡 Server will run on port: ${port}`);

// Middleware
console.log("🔧 Setting up middleware...");
app.use(cors());
console.log("✅ CORS middleware configured");
app.use(express.json());
console.log("✅ JSON parsing middleware configured");

// Connect to MongoDB
console.log("🗄️ Attempting to connect to MongoDB...");
connectDB();

// Routes
console.log("🛣️ Registering API routes...");
app.use("/api", mapRoutes);
console.log("✅ Map routes registered at /api");
app.use("/api", playerRoutes);
console.log("✅ Player routes registered at /api");

app.get("/", (req: Request, res: Response) => {
  console.log("📥 Root endpoint accessed");
  res.json({ message: "Welcome to the TypeScript Backend with MongoDB!" });
});

// Start server
app.listen(port, () => {
  console.log(`🎉 Server is running on port ${port}`);
  console.log(`🌐 Server URL: http://localhost:${port}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   - GET  / (root)`);
  console.log(`   - POST /api/baseMap`);
  console.log(`   - GET  /api/baseMap`);
  console.log(`   - POST /api/player`);
  console.log(`   - GET  /api/player/:recoveryCode`);
  console.log(`   - PUT  /api/player`);
});
