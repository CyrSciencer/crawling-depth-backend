import express from "express";
import { baseMap } from "../models/BaseMap";

const router = express.Router();

router.post("/baseMap", async (req, res) => {
  const newBaseMap = new baseMap(req.body);
  try {
    await newBaseMap.save();
    console.log(newBaseMap);
    res.status(201).json(newBaseMap);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

router.get("/baseMap", async (req, res) => {
  try {
    const foundBaseMaps = await baseMap.find({
      name: { $regex: new RegExp(req.body.exitForm, "i") },
    });

    if (foundBaseMaps.length === 0) {
      return res.status(404).json({ message: "No maps found" });
    }

    const randomIndex = Math.floor(Math.random() * foundBaseMaps.length);
    const selectedMap = foundBaseMaps[randomIndex];

    console.log({ selectedMap });
    res.status(200).json(selectedMap);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

export default router;
