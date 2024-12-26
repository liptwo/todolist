import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
});

const NoteR = mongoose.models.NoteR || mongoose.model("NoteR", NoteSchema);
export default NoteR
