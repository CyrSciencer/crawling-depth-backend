import mongoose, { Schema} from 'mongoose';
import {Cell} from './BaseMap';
interface Tool {
    usage: number;
    power: number;
}
interface Resource {stone: number;
    iron?: number;
    silver?: number;
    gold?: number;
    tin?: number;
    zinc?: number;
    crystal?: number;}

interface Inventory {
    resources: Resource;
    tools: {
        pickaxe: Tool;
        axe: Tool;
    equiped: Tool | Resource | null;   
}}
interface ModifiedMap {
    personalID: string; //playerID+mapID
    map: mongoose.Types.ObjectId;//reference to a base map
    modifiedCells: Cell[];
    exitLink: {
        up: mongoose.Types.ObjectId | null; //if not explored, base map, if explored, modified map
        down: mongoose.Types.ObjectId | null; //if not explored, base map, if explored, modified map
        left: mongoose.Types.ObjectId | null; //if not explored, base map, if explored, modified map
        right: mongoose.Types.ObjectId | null; //if not explored, base map, if explored, modified map
    };
}
interface Player {
    inventory: Inventory;
    modifiedMaps: ModifiedMap[];//array of modified maps
    //position on current map.
    position: {
        row: number;
        col: number;
    };
    currentMap: mongoose.Types.ObjectId;//ref to the modified map
    movementPerTurn: Number;
    health: Number;
}

const player = mongoose.model<Player>("Player", new Schema({
    inventory: { type: Object, required: true },
    modifiedMaps: { type: [Object], required: true },
    position: { type: Object, required: true },
    currentMap: { type: mongoose.Schema.Types.ObjectId, ref: 'Map', required: true },
    movementPerTurn: { type: Number, required: true },
    health: { type: Number, required: true },
}));

export default player;


