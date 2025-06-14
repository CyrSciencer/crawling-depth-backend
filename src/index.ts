import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import mapRoutes from "./routes/map";
import playerRoutes from "./routes/player";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", mapRoutes);
app.use("/api", playerRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the TypeScript Backend with MongoDB!" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
