import mongoose, { Schema, Document } from 'mongoose';

export interface Cell {
    row: number;
    col: number;
    type: 'floor' | 'wall' | 'exit' | 'unbreakable';
    resources?: {
        stone: number;
        iron?: number;
        silver?: number;
        gold?: number;
        tin?: number;
        zinc?: number;
        crystal?: number;
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
    width: number;
    height: number;
    cells: Cell[];
    exits: Exits;
}
export const baseMap = mongoose.model<Map>("Map", new Schema({
    name: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    cells: [{ type: Object, required: true }],
    exits: { type: Object, required: true },
}));



