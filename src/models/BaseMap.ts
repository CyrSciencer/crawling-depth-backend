import mongoose, { Schema, Document } from "mongoose";

console.log("🗺️ BaseMap model module loaded");

export interface Cell {
  row: number;
  col: number;
  type: "floor" | "wall" | "exit" | "unbreakable" | "chest" | "trap";
  resources?: {
    stone: number;
    iron?: number;
    silver?: number;
    gold?: number;
    tin?: number;
    zinc?: number;
    crystal?: number;
    copper?: number;
  };
}
export interface Exits {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}
export interface Map {
  name: string;

  cells: Cell[];
  exits: Exits;
  chest: boolean;
}

console.log("🏗️ Creating BaseMap mongoose model...");
export const baseMap = mongoose.model<Map>(
  "Map",
  new Schema({
    name: { type: String, required: true },
    cells: [{ type: Object, required: true }],
    exits: { type: Object, required: true },
    chest: { type: Boolean, required: true },
  })
);

console.log("✅ BaseMap model created successfully");
