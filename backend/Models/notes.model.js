import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxlength: [100, "Title cannot exceed 100 characters"],
    },
    content: {
        type: String,
        required: [true, "Content is required"],
        trim: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    isPinned: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
    userId: {
        type: String,
        ref: "User",
        required: [true, "User ID is required"],
    },
});

// Add indexes for faster queries
noteSchema.index({ userId: 1 });
noteSchema.index({ isPinned: 1 });
noteSchema.index({ deletedAt: 1 });

const Note = mongoose.model("Note", noteSchema);

export default Note;
