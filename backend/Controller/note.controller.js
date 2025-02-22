import Note from '../Models/notes.model.js';
import { errorHndler } from '../utils/error.js';

// Add a new note
export const addNote = async (req, res, next) => {
    const { title, content, tags = [] } = req.body;
    const userId = req.user?.id;

    if (!title || !content) {
        return next(errorHndler(400, "Title and content are required"));
    }

    try {
        const newNote = await Note.create({ title, content, tags, userId });
        res.status(201).json({ success: true, message: "Note added successfully", newNote });
    } catch (error) {
        next(error);
    }
};

// Edit an existing note
export const editNote = async (req, res, next) => {
    const { noteId } = req.params;
    const { title, content, tags, isPinned } = req.body;

    if (!title && !content && tags === undefined && isPinned === undefined) {
        return next(errorHndler(400, "No changes provided"));
    }

    try {
        const note = await Note.findOneAndUpdate(
            { _id: noteId, userId: req.user.id },
            { $set: { title, content, tags, isPinned } },
            { new: true }
        );

        if (!note) {
            return next(errorHndler(404, "Note not found or unauthorized"));
        }

        res.status(200).json({ success: true, message: "Note updated successfully", note });
    } catch (error) {
        next(error);
    }
};

// Get all notes (excluding deleted)
export const getAllNotes = async (req, res, next) => {
    try {
        const notes = await Note.find({ userId: req.user.id, deletedAt: null });
        res.status(200).json({ success: true, message: "All notes fetched", notes });
    } catch (error) {
        next(error);
    }
};

// Get pinned notes
export const getPinnedNotes = async (req, res, next) => {
    try {
        const notes = await Note.find({ userId: req.user.id, deletedAt: null, isPinned: true });
        res.status(200).json({ success: true, message: "Pinned notes fetched", notes });
    } catch (error) {
        next(error);
    }
};

// Get trashed notes
export const trashNotes = async (req, res, next) => {
    try {
        const notes = await Note.find({ userId: req.user.id, deletedAt: { $ne: null } });
        res.status(200).json({ success: true, message: "Trashed notes fetched", notes });
    } catch (error) {
        next(error);
    }
};

// Move note to trash
export const moveToTrash = async (req, res, next) => {
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.noteId, userId: req.user.id },
            { deletedAt: new Date() },
            { new: true }
        );

        if (!note) {
            return next(errorHndler(404, "Note not found or unauthorized"));
        }

        res.status(200).json({ success: true, message: "Note moved to trash", note });
    } catch (error) {
        next(error);
    }
};

// Restore note from trash
export const restoreNote = async (req, res, next) => {
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.noteId, userId: req.user.id },
            { deletedAt: null },
            { new: true }
        );

        if (!note) {
            return next(errorHndler(404, "Note not found or unauthorized"));
        }

        res.status(200).json({ success: true, message: "Note restored", note });
    } catch (error) {
        next(error);
    }
};

// Delete note permanently
export const deleteNote = async (req, res, next) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.noteId, userId: req.user.id });

        if (!note) {
            return next(errorHndler(404, "Note not found or unauthorized"));
        }

        res.status(200).json({ success: true, message: "Note deleted permanently" });
    } catch (error) {
        next(error);
    }
};
