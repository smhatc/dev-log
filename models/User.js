const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 128,
    },
}, { timestamps: true, });

const User = mongoose.model("User", userSchema);

module.exports = User;