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