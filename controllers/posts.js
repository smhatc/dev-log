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
        req.body.author = req.session.user.username;
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
    try {
        const foundPost = await Post.findById(req.params.postId);
        res.render("./posts/show.ejs", { foundPost, });
    } catch (error) {
        console.log(error);
        res.send("Something went wrong.");
    }
});

router.put("/:postId", isSignedIn, upload.single("thumbnail"), async (req, res) => {
    const foundPost = await Post.findById(req.params.postId);
    if (foundPost.author === req.session.user.username) {
        try {
            if (req.file && foundPost.thumbnail?.cloudinary_id) {
                await cloudinary.uploader.destroy(foundPost.thumbnail.cloudinary_id);
                foundPost.thumbnail.url = req.file.path;
                foundPost.thumbnail.cloudinary_id = req.file.filename;
            }
            foundPost.title = req.body.title;
            foundPost.exerpt = req.body.excerpt;
            foundPost.body = req.body.body;
            await foundPost.save();
            return res.redirect(`/${req.params.postId}`);
        } catch (error) {
            console.log(error);
            res.send("Something went wrong.");
        }
    } else {
        return res.send("Not authorized.");
    }
});

router.delete("/:postId", isSignedIn, async (req, res) => {
    try {
        const foundPost = await Post.findById(req.params.postId);
        if (!foundPost.author === req.session.user.username) {
            return res.send("Not authorized.");
        }
        if (foundPost.thumbnail?.cloudinary_id) {
            await cloudinary.uploader.destroy(foundPost.thumbnail.cloudinary_id);
        }
        await foundPost.deleteOne();
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.send("Something went wrong.");
    }
});

router.get("/:postId/edit", isSignedIn, async (req, res) => {
    const foundPost = await Post.findById(req.params.postId);
    if (foundPost.author === req.session.user.username) {
        return res.render("./posts/edit.ejs", { foundPost, });
    } else {
        return res.send("Not authorized.");
    }
});

// EXPORTING ROUTES
module.exports = router;