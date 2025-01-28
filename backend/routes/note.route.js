import express from 'express';
import { addNote, editNote } from '../Controller/note.controller.js';
import { verifyToken } from '../utils/verifyUser.js';



const router = express.Router();

router.post("/add-note", verifyToken, addNote);
router.post("/edit-note/:noteId", verifyToken, editNote);


export default router; 