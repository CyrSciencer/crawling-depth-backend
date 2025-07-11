import mongoose, { Schema } from "mongoose";
import { Cell } from "./BaseMap";

console.log("👤 Player model module loaded");

interface Tool {
  charge: number;
  power: number;
  bonus: String;
}
interface consumable {
  impactStat: string;
  impactValue: number;
  quantity: number;
}
interface Resource {
  stone: number;
  iron?: number;
  silver?: number;
  gold?: number;
  tin?: number;
  zinc?: number;
  crystal?: number;
  copper?: number;
}
interface Block {
  stoneBlock?: number;
  ironBlock?: number;
  silverBlock?: number;
  goldBlock?: number;
  tinBlock?: number;
  zincBlock?: number;
  crystalBlock?: number;
}
interface Inventory {
  resources: Resource | null;
  blocks: Block | null;
  consumables: consumable[] | null;
  tools: {
    pickaxe?: Tool;
  } | null;
  equiped:
    | {
        pickaxe?: Tool;
      }
    | {
        block?: Block;
      }
    | null;
}
interface ModifiedMap {
  personalID: string; //playerID+mapID
  map: mongoose.Types.ObjectId; //reference to a base map
  modifiedCells: Cell[];
  exitLink: {
    up: mongoose.Types.ObjectId | null; //if not explored, base map, if explored, modified map
    down: mongoose.Types.ObjectId | null; //if not explored, base map, if explored, modified map
    left: mongoose.Types.ObjectId | null; //if not explored, base map, if explored, modified map
    right: mongoose.Types.ObjectId | null; //if not explored, base map, if explored, modified map
  };
  firstTime: boolean;
}
interface Player {
  inventory: Inventory;
  modifiedMaps: ModifiedMap[]; //array of modified maps
  //position on current map.
  position: {
    row: number;
    col: number;
  };
  currentMap: string; //ref to the modified map (personnal ID)
  movementPerTurn: Number;
  health: Number;
  recoveryCode: Number;
}

console.log("🏗️ Creating Player mongoose model...");
const player = mongoose.model<Player>(
  "Player",
  new Schema({
    inventory: { type: Object, required: true },
    modifiedMaps: { type: [Object], required: true },
    position: { type: Object, required: true },
    currentMap: { type: String, required: true },
    movementPerTurn: { type: Number, required: true },
    health: { type: Number, required: true },
    recoveryCode: { type: Number, required: true },
  })
);

console.log("✅ Player model created successfully");

export default player;
