import express from 'express';
import { addNote } from '../Controller/note.controller.js';
import { verifyToken } from '../utils/verifyUser.js';



const router = express.Router();

router.post("/add-note", verifyToken, addNote);


export default router; 