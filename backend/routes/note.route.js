import express from 'express';
import { addNote, editNote, getAllNotes, deleteNote } from '../Controller/note.controller.js';
import { verifyToken } from '../utils/verifyUser.js';




const router = express.Router();

router.post("/add-note", verifyToken, addNote);
router.post("/edit-note/:noteId", verifyToken, editNote);
router.get("/all", verifyToken, getAllNotes);
router.delete("/delete-note/:noteId", verifyToken, deleteNote);



export default router; 