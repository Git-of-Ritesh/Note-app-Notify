import express from 'express';
import * as noteController from '../Controller/note.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Define routes with token verification
router.use(verifyToken);

// CRUD operations
router.post('/add-note', noteController.addNote);
router.post('/edit-note/:noteId', noteController.editNote);
router.delete('/delete-note/:noteId', noteController.deleteNote);

// Note status updates
router.put('/move-to-trash/:noteId', noteController.moveToTrash);
router.put('/restore-note/:noteId', noteController.restoreNote);

// Get notes
router.get('/all', noteController.getAllNotes);
router.get('/trash', noteController.trashNotes);
router.get('/pinned', noteController.getPinnedNotes);

export default router;
