// SETUP
const express = require("express");
const router = express.Router();
const isSignedIn = require("../middleware/is-signed-in.js");
const Post = require("../models/Post.js");
const upload = require("../config/multer.js");
const cloudinary = require("../config/cloudinary.js");

// ROUTES
router.get("/", async (req, res) => {
    const foundPosts = await Post.find();
    res.render("./posts/index.ejs", { foundPosts, });
});

router.post("/", isSignedIn, upload.single("thumbnail"), async (req, res) => {
    try {
        req.body.author = req.session.user._id;
        req.body.thumbnail = {
            url: req.file.path,
            cloudinary_id: req.file.filename,
        };
        await Post.create(req.body);
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.send("Something went wrong.");
    }
});

router.get("/new", isSignedIn, (req, res) => {
    res.render("./posts/new.ejs");
});

router.get("/:postId", async (req, res) => {
    res.send("Hello, world!");
});

router.put("/:postId", async (req, res) => {
    res.send("Hello, world!");
});

router.delete("/:postId", async (req, res) => {
    res.send("Hello, world!");
});

router.get("/:postId/edit", (req, res) => {
    res.send("Hello, world!");
});

// EXPORTING ROUTES
module.exports = router;