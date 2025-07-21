const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    thumbnail: {
        url: {
            type: String,
            required: true,
        },
        cloudinary_id: {
            type: String,
            required: true,
        },
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
    },
    excerpt: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    body: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
    },
}, { timestamps: true, });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;