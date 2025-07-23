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
        minlength: 3,
        maxlength: 20,
    },
    excerpt: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    author: {
        type: String,
        ref: "User",
        required: true,
    },
    body: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 10000,
    },
}, { timestamps: true, });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;