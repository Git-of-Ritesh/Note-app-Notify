import express from 'express';
import { addNote, editNote, getAllNotes, deleteNote, moveToTrash, restoreNote, trashNotes, getPinnedNotes } from '../Controller/note.controller.js';
import { verifyToken } from '../utils/verifyUser.js';




const router = express.Router();

router.post("/add-note", verifyToken, addNote);
router.post("/edit-note/:noteId", verifyToken, editNote);
router.get("/all", verifyToken, getAllNotes);
router.delete("/delete-note/:noteId", verifyToken, deleteNote);
router.put("/move-to-trash/:noteId", verifyToken, moveToTrash);
router.put("/restore-note/:noteId", verifyToken, restoreNote);
router.get("/trash", verifyToken, trashNotes);
router.get("/pinned", verifyToken, getPinnedNotes);


export default router; 