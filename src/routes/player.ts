import express, { Request, Response } from "express";
import PlayerModel from "../models/Player";

const router = express.Router();

router.post("/player", async (req, res) => {
  const newPlayer = new PlayerModel(req.body);
  try {
    await newPlayer.save();
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

router.get("/player/:recoveryCode", async (req, res) => {
  try {
    const foundPlayer = await PlayerModel.findOne({
      recoveryCode: req.params.recoveryCode,
    });
    if (!foundPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.json(foundPlayer);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

router.put("/player", async (req: Request, res: Response) => {
  try {
    const { recoveryCode, ...updateData } = req.body;

    const foundPlayer = await PlayerModel.findOne({ recoveryCode });
    if (!foundPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    // Update the player document with new data
    Object.assign(foundPlayer, updateData);
    await foundPlayer.save();

    res.json(foundPlayer);
  } catch (error) {
    console.error("Error updating player:", error);
    res.status(500).json({ message: (error as Error).message });
  }
});

export default router;
