const mongoose = require("mongoose");

const boardsSchema = new mongoose.Schema({
    boardId : {
        type: Number,
        required: true,
        unique: true,
    },
    name : {
        type: String,
        required: true,
    },
    content: {
        type: String,
    },
    title: {
        type: String,
    },
    img : {
        type: String,
        required: true,
    },
    likes: {
        type: Array,
        default: [],
    }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Board", boardsSchema);