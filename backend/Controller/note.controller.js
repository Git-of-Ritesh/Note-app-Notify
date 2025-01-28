import notes from '../Models/notes.model.js';
import  { errorHndler } from '../utils/error.js';

export const addNote = async (req, res, next) => {
    const { title, content } = req.body;

    const { id } = req.user;

    if(!title || !content){
        return next(errorHndler(400, "Title and Content are required"));
    }

    try{
        const newNote = new notes({
            title,
            content,
            userId : id,
        });

        await newNote.save();

        res.status(201).json({
            success: true,
            message: "Note added successfully",
            newNote,
        });
    }catch(error){
        return next(error);
    }
}

export const editNote = async (req, res, next) => {
    const note = await notes.findById(req.params.noteId);

    if(!note){
        return next(errorHndler(404, "Note not found"));
    }

    if(req.user.id !== note.userId){
        return next(errorHndler(403, "You are not authorized to edit this note"));
    }

    const { title, content } = req.body;

    if(!title && !content){
        return next(errorHndler(400, "No changes made"));
    }

    try{
        if(title){
            note.title = title;
        }
        if(content){
            note.content = content;
        }

        await note.save();

        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            note,
        });

    }catch(error){
        return next(error);
    }
}
