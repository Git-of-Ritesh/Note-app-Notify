import e from "express";
import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: String,
        required: true,
    }
});

const notes = mongoose.model('Notes', noteSchema);

export default notes;