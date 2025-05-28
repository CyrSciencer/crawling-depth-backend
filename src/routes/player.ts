import express from 'express';
import { player } from '../models/Player';

const router = express.Router();

router.post('/player', async (req, res) => {
    const newPlayer = new player(req.body);
    try {
        await newPlayer.save();
        res.status(201).json(newPlayer);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}

