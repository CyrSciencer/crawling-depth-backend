import express, { Request, Response } from "express";
import PlayerModel from "../models/Player";

console.log("👤 Player routes module loaded");

const router = express.Router();

router.post("/player", async (req, res) => {
  console.log("📥 POST /api/player - Creating new player");
  console.log("📋 Request body:", JSON.stringify(req.body, null, 2));

  const newPlayer = new PlayerModel(req.body);
  console.log("🏗️ New player instance created:", newPlayer);

  try {
    console.log("💾 Saving player to database...");
    await newPlayer.save();
    console.log("✅ Player saved successfully:", newPlayer);
    res.status(201).json(newPlayer);
    console.log("📤 Response sent with status 201");
  } catch (error) {
    console.error("❌ Error saving player:", error);
    console.error("🔍 Error details:", {
      name: (error as Error).name,
      message: (error as Error).message,
    });
    res.status(400).json({ message: (error as Error).message });
    console.log("📤 Error response sent with status 400");
  }
});

router.get("/player/:recoveryCode", async (req, res) => {
  console.log("📥 GET /api/player/:recoveryCode - Retrieving player");
  console.log("🔍 Recovery code:", req.params.recoveryCode);

  try {
    console.log("🔎 Searching for player with recovery code...");
    const foundPlayer = await PlayerModel.findOne({
      recoveryCode: req.params.recoveryCode,
    });

    if (!foundPlayer) {
      console.log(
        "⚠️ Player not found with recovery code:",
        req.params.recoveryCode
      );
      return res.status(404).json({ message: "Player not found" });
    }

    console.log("✅ Player found:", foundPlayer);
    res.json(foundPlayer);
    console.log("📤 Response sent with status 200");
  } catch (error) {
    console.error("❌ Error retrieving player:", error);
    console.error("🔍 Error details:", {
      name: (error as Error).name,
      message: (error as Error).message,
    });
    res.status(500).json({ message: (error as Error).message });
    console.log("📤 Error response sent with status 500");
  }
});

router.put("/player", async (req: Request, res: Response) => {
  console.log("📥 PUT /api/player - Updating player");
  console.log("📋 Request body:", JSON.stringify(req.body, null, 2));

  try {
    const { recoveryCode, ...updateData } = req.body;
    console.log("🔍 Recovery code:", recoveryCode);
    console.log("📝 Update data:", updateData);

    console.log("🔎 Searching for player with recovery code...");
    const foundPlayer = await PlayerModel.findOne({ recoveryCode });

    if (!foundPlayer) {
      console.log("⚠️ Player not found with recovery code:", recoveryCode);
      return res.status(404).json({ message: "Player not found" });
    }

    console.log("✅ Player found, updating with new data...");
    console.log("📊 Original player data:", foundPlayer);

    // Update the player document with new data
    Object.assign(foundPlayer, updateData);
    console.log("📝 Updated player data:", foundPlayer);

    console.log("💾 Saving updated player to database...");
    await foundPlayer.save();
    console.log("✅ Player updated successfully");

    res.json(foundPlayer);
    console.log("📤 Response sent with status 200");
  } catch (error) {
    console.error("❌ Error updating player:", error);
    console.error("🔍 Error details:", {
      name: (error as Error).name,
      message: (error as Error).message,
      stack: (error as Error).stack,
    });
    res.status(500).json({ message: (error as Error).message });
    console.log("📤 Error response sent with status 500");
  }
});

export default router;
